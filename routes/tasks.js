import express from 'express'

const router = express.Router()

//  Get all tasks
router.get('/tasks', (req, res) => {
  res.send('list of tasks for today or specific day')
})

//  Get all completed tasks
router.get('/tasks/completed', (req, res) => {
  res.send('list of completed tasks for today or specific day')
})

//  Get specific task
router.get('/task/:id', (req, res) => {
  res.send('info about specific task')
})

//  Get specific completed task
router.get('/task/completed/:id', (req, res) => {
  res.send('info about specific task that is completed')
})

//  Create new task
router.post('/task', (req, res) => {
  res.send('create new task')
})

//  Create new completed task
router.post('/task/completed/:id', (req, res) => {
  res.send('complete a specific task')
})

//  Delete a specific task
router.delete('/task/:id', (req, res) => {
  res.send('delete a specific task')
})

//  Delete a specific completed task
router.delete('/task/completed/:id', (req, res) => {
  res.send('uncomplete a specific task')
})

export default router