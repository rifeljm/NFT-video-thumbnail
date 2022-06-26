import got from "got";
import express from "express";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const port = 80;

console.log("??????????????", ffmpegPath);

app.get("/", (req, res) => {
  // const proc = ffmpeg(got.stream("https://u3pm.com/a.mkv"))
  const proc = ffmpeg("/app/content/a.mkv")
    // setup event handlers
    .on("filenames", function (filenames) {
      console.log("screenshots are " + filenames.join(", "));
    })
    .on("end", function () {
      console.log("screenshots were saved");
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message);
    })
    // take 2 screenshots at predefined timemarks and size
    .takeScreenshots({ count: 2, timemarks: ["00:00:02.000", "6"], width: "320" }, "/app/xxx");
  res.send("Hello World and some...!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default () => {};
