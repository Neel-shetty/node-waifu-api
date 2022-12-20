const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();

// specify the file path and the data to write to the file
const filePath = "C:/Users/neeln/Desktop/temp.txt";

// write the data to the file
async function writeData(links) {
  fs.appendFileSync(filePath, links, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Data written to file");
    }
  });
}

function getImages() {
  axios
    .get("https://api.waifu.im/search/?is_nsfw=true&included_tags=ero")
    .then((data) => {
      const links = data.data.images[0].url;
      if (links) {
        console.log("🚀 ~ file: index.js:26 ~ .then ~ links", links);
        const formattedLink = `"${links}",`;
        writeData(formattedLink);
        console.log(
          "🚀 ~ file: index.js:28 ~ .then ~ formattedLink",
          formattedLink
        );
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

app.get("/", (req, res) => {
  res.send("Hello World--");
  for (let i = 0; i < 100; i++) {
    setTimeout(getImages, 300);
  }
});

app.listen(4000);
