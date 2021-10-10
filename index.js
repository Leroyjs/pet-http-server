const express = require("express");

const app = express();

const LIMIT = 20;
const DELAY = 1000;
const PORT = 3000;

let connections = [];

const options = {
  era: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  timezone: "UTC",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

app.get("/date", (req, res, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  connections.push(res);
});

let tick = 0;

run();

function run() {
  const date = new Date().toUTCString();
  console.log(date);
  if (++tick > LIMIT) {
    connections.map((res) => {
      res.write(date + " END\n");
      res.end();
    });
    connections = [];
    tick = 0;
  }
  connections.map((res, i) => {
    res.write(`Hello ${i}, time and date ${date}\n`);
  });
  setTimeout(run, DELAY);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\n`);
});
