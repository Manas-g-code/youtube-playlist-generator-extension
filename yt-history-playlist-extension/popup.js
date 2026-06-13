// document.getElementById("scan").addEventListener("click", async () => {

//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.tabs.sendMessage(tab.id, {
//     action: "scanHistory"
//   }).catch(err => console.log(err));

// });


// document.getElementById("stop").addEventListener("click", async () => {

//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.tabs.sendMessage(tab.id, {
//     action: "stopFetching"
//   }).catch(err => console.log(err));

// });

function showToast(text){

const toast = document.getElementById("toast")

toast.innerText = text
toast.classList.add("show")

setTimeout(()=>{
toast.classList.remove("show")
},3000)

}

document.getElementById("scan").addEventListener("click", async () => {

const scrollCount = document.getElementById("scrollCount").value
const filters = document.getElementById("filters").value
const playlistName = document.getElementById("playlistName").value

let [tab] = await chrome.tabs.query({
active:true,
currentWindow:true
})

chrome.tabs.sendMessage(tab.id,{
action:"scanHistory",
scrollCount:scrollCount,
filters:filters,
playlistName:playlistName
})

showToast("Scanning started...")

})

document.getElementById("stop").addEventListener("click", async () => {

let [tab] = await chrome.tabs.query({
active:true,
currentWindow:true
})

chrome.tabs.sendMessage(tab.id,{
action:"stopFetching"
})

showToast("Scan stopped")

})

// const playlistName = document.getElementById("playlistName").value

// chrome.tabs.sendMessage(tab.id,{
//   action:"scanHistory",
//   playlistName: playlistName,
//   scrollCount: scrollCount,
//   filters: filters
// })

chrome.runtime.onMessage.addListener((msg)=>{

  if(msg.type==="scanStarted"){
    showToast("Scanning history...");
  }

  if(msg.type==="scanProgress"){
    document.getElementById("totalVideos").innerText = msg.total;
  }

  if(msg.type==="scanFinished"){

    document.getElementById("totalVideos").innerText = msg.total;
    document.getElementById("filteredVideos").innerText = msg.filtered;

    showToast("Scan finished");
  }

  if(msg.type==="playlistCreated"){
    showToast("Playlist created successfully 🎵");
  }

});