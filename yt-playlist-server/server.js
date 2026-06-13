const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const CLIENT_ID = env.CLIENT_ID;
const CLIENT_SECRET = env.CLIENT_SECRET;
const REDIRECT_URI = env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/youtube"
];

app.get("/", (req, res) => {
  res.send("YouTube Playlist Server Running");
});

app.get("/auth", (req, res) => {

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

  res.redirect(url);

});

let tokens;

app.get("/oauth2callback", async (req, res) => {

  const code = req.query.code;

  try{
    const { tokens: t } = await oauth2Client.getToken(code);

    tokens = t;

    oauth2Client.setCredentials(tokens);

    res.send("Authentication successful! You can close this tab.");
  }
  catch(err){
    console.log(err);
    res.status(500).send("OAuth failed");
  }

});


app.post("/create-playlist", async (req, res) => {

  if (!tokens) {
    return res.status(401).send("User not authenticated");
  }

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client
  });

  const { videos, playlistName } = req.body;

  const limitedVideos = videos.slice(0, 150);
  

  try {

    const playlistResponse = await youtube.playlists.insert({
      part: ["snippet","status"],
      requestBody: {
        snippet: {
          title: playlistName || "Generated Playlist",
          description: "Auto generated playlist"
        },
        status: {
          privacyStatus: "private"
        }
      }
    });

    const playlistId = playlistResponse.data.id;

    for (let videoId of limitedVideos) {

      await youtube.playlistItems.insert({
        part: ["snippet"],
        requestBody: {
          snippet: {
            playlistId: playlistId,
            resourceId: {
              kind: "youtube#video",
              videoId: videoId
            }
          }
        }
      });

    }

    res.json({
      message: "Playlist created successfully",
      playlistId: playlistId
    });

  } catch(err) {
    console.error(err);
    res.status(500).send("Error creating playlist");
  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});