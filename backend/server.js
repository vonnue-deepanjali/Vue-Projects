import http from "http";
import fs from "fs";

const FILE_PATH = "./tasks.json";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method === "GET" && req.url === "/tasks") {
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
  if (req.method === "POST" && req.url === "/tasks") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const newTask = JSON.parse(body);
        if (!newTask.name || !newTask.estimatedTime) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Task name and estimatedTime are required" }));
          return;
        }
        const generatedId = Date.now() + "-" + newTask.name.replace(/\s+/g, "").toLowerCase();

        fs.readFile(FILE_PATH, "utf8", (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end("Failed to read tasks");
            return;
          }

          const tasks = data ? JSON.parse(data) : [];
          const taskToSave = {
            id: generatedId,
            name: newTask.name,
            estimatedTime: newTask.estimatedTime,
            completed: false,
          };

          tasks.push(taskToSave);
          fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8", (err) => {
            if (err) {
              res.writeHead(500);
              res.end("Failed to write task");
            } else {
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Task saved", task: taskToSave }));
            }
          });
        });
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
  }

  
  if (req.method === "PUT" && req.url.startsWith("/tasks/")) {
    const taskId = req.url.split("/")[2]; 
    let body = "";
  
    req.on("data", (chunk) => {
      body += chunk;
    });
  
    req.on("end", () => {
      try {
        const updatedTask = JSON.parse(body);
  
        fs.readFile(FILE_PATH, "utf8", (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end("Failed to read tasks");
            return;
          }
  
          let tasks = data ? JSON.parse(data) : [];
          const index = tasks.findIndex((t) => t.id === taskId);
  
          if (index === -1) {
            res.writeHead(404);
            res.end("Task not found");
            return;
          }
  
          tasks[index] = updatedTask;
  
          fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8", (err) => {
            if (err) {
              res.writeHead(500);
              res.end("Failed to update task");
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Task updated", task: updatedTask }));
            }
          });
        });
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }
    });
  }

  
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
