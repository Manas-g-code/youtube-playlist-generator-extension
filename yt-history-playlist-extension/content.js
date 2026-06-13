console.log("Content script loaded successfully");

let stopScrolling = false;
let playlistName = "Generated Playlist";
let maxScrolls = 10;
let userFilters = [];

function sleep(ms){
  return new Promise(r => setTimeout(r, ms));
}

async function autoScroll(){

  const MAX_SCROLLS = maxScrolls;

  let scrollCount = 0;
  let lastHeight = 0;

  while(!stopScrolling && scrollCount < MAX_SCROLLS){

    window.scrollTo(0, document.documentElement.scrollHeight);

    await sleep(1500);

    let newHeight = document.documentElement.scrollHeight;

    if(newHeight === lastHeight){
      console.log("No more videos loading");
      break;
    }

    lastHeight = newHeight;

    scrollCount++;

    console.log("Scroll:", scrollCount);
  }

  console.log("Scrolling finished at:", scrollCount);
}

chrome.runtime.onMessage.addListener(async (request) => {

  console.log("Message received:", request.action);

  if(request.action === "stopFetching"){
    stopScrolling = true;
    console.log("Stop signal received");
    return;
  }

  if(request.action === "scanHistory"){

    maxScrolls = Number(request.scrollCount) || 10;
    console.log("User scroll limit:", maxScrolls);

    userFilters = request.filters
  ? request.filters.split(",").map(f => f.trim().toLowerCase())
  : [];

  console.log("User Filters:",userFilters)

     playlistName = request.playlistName || "Generated Playlist"

    stopScrolling = false;
    
    chrome.runtime.sendMessage({
      type:"scanStarted"
    });

    console.log("Starting auto scroll...");

    await autoScroll();

    if(stopScrolling){
      console.log("Scan stopped early. Processing collected data...");
    }else{
      console.log("Finished scrolling history");
    }

    await sleep(2000);

    let elements = document.querySelectorAll("a.yt-lockup-metadata-view-model__title");

    console.log([...elements].slice(0,5).map(e => e.innerText));

    // const keywords = [
    //   "punjabi",
    //   "haryanvi",
    //   "sidhu",
    //   "moosewala",
    //   "diljit",
    //   "aujla",
    //   "karan aujla",
    //   "parmish",
    //   "gurnam",
    //   "ammy virk",
    //   "desi"
    // ];

    let videos = [];
    let seen = new Set();

    console.log("Videos detected:", elements.length);

    chrome.runtime.sendMessage({
      type:"scanProgress",
      total: elements.length
    });

    elements.forEach(el => {

      const title = el.textContent.trim();
      const url = el.href;

      if(!url.includes("watch?v=")) return;

      const videoId = new URL(url).searchParams.get("v");

      if(!videoId) return;

      const titleLower = title.toLowerCase();

      const isSong = userFilters.some(word => titleLower.includes(word));

      if(isSong && !seen.has(videoId)){
        seen.add(videoId);

        videos.push({
          title: title,
          id: videoId
        });
      }

    });

    console.log("Filtered Videos detected:", videos.length);

    chrome.runtime.sendMessage({
      type:"scanFinished",
      total:elements.length,
      filtered:videos.length
    })

    fetch("http://localhost:5000/create-playlist", {
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    playlistName: playlistName,
    videos: videos.slice(0,150).map(v => v.id)
  })
})
    .then(res => res.json())
    .then(data => {
      console.log("Playlist created:", data);
      chrome.runtime.sendMessage({
        type:"playlistCreated",
        playlistId:data.playlistId
      })
    })
    .catch(err => {
      console.error("Playlist creation failed:", err);
    });

  }

});