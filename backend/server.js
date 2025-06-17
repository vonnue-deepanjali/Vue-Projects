const http = require("http");
const fs = require("fs");

const FILE_PATH = "./tasks.json";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/task") {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Failed to read tasks");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data || "[]");
      }
    });
  }

  if (req.method === "POST" && req.url === "/task") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const newTask = JSON.parse(body);

      fs.readFile(FILE_PATH, "utf8", (err, data) => {
        const tasks = data ? JSON.parse(data) : [];
        tasks.push(newTask);

        fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8", (err) => {
          if (err) {
            req.writeHead(500);
            req.end("Failed to write task");
          } else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "task saved" }));
          }
        });
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});