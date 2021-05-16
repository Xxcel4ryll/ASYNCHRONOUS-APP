const express = require("express");
const Axios = require("axios");
const app = express();

start();
async function start() {
  for (let i = 0; i < 3; i++) {
    await doSomething()
      .then(async (data) => {
        console.log(data);
        return await actLater();
        // returns promise data to the next chain .then
      })
      .then(async (data) => {
        console.log(data);
        await runLast();
      })
      .catch((err) => console.log(err.message));
  }
}

function doSomething() {
  const response = new Promise((resolve, reject) => {
    resolve("show first");
  });
  return response;
}

function actLater() {
  const response = new Promise((resolve, reject) => {
    Axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    })
      .then((data) => {
        resolve(data.data.userId);
        // runLast();
      })
      .catch((err) => reject(err.message));
  });
  return response;
}

function runLast() {
  const response = new Promise((resolve, reject) => {
    console.log("display last");
    resolve();
  });
  return response;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
