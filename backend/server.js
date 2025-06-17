const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const PORT = 3000
const FILE_PATH = './tasks.json'

app.use(cors())
app.use(express.json())

app.get('/tasks', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file')
    res.json(JSON.parse(data || '[]'))
  })
})

app.post('/tasks', (req, res) => {
  const newTask = req.body
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    const tasks = data ? JSON.parse(data) : []
    tasks.push(newTask)

    fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), err => {
      if (err) return res.status(500).send('Error writing file')
      res.status(201).json({ message: 'Task saved' })
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
