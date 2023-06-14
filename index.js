const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // formから投稿されたデータの中身を解析
const activities = require("./activities.json");

// GETリクエスト（読み込み）
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// POSTリクエスト（作成）
app.post("/autumn", function (req, res) {
  fs.writeFile(__dirname + "/data.txt", req.body.activity, function () {
    res.send("投稿完了");
  });
});

// <form>タグはPUTリクエストとDELETEリクエストに対応していないが、POSTリクエストで対応できる
// PUTリクエスト（修正）
app.post("/update", function (req, res) {
  activities[0].activity = req.body.updatedActivity;
  res.send(activities);
});

//DELETEリクエスト
app.post("/delete", function (req, res) {
  activities.splice(req.body.number, 1); // splice(削除したい配列の番号, 削除する個数)
  res.send(activities);
});

const port = process.env.POST || 5000;

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
