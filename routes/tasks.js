import express from 'express'

const router = express.Router()

router.get('/tasks', (x,y) => getAllTasks(x,y))
router.get('/tasks/completed', (x,y) => getAllCompletedTasks(x,y))
router.get('/task/:id', (x,y) => getSpecificTask(x,y))
router.get('/task/completed/:id', (x,y) => getSpecificCompletedTask(x,y))

router.post('/task', (x,y) => createNewTask(x,y))
router.post('/task/completed/:id', (x,y) => createNewCompletedTask(x,y))

router.delete('/task/:id', (x,y) => deleteSpecificTask(x,y))
router.delete('/task/completed/:id', (x,y) => deleteSpecificCompletedTask(x,y))

function getAllTasks(req, res){
    res.send('list of tasks for today or specific day')
}
function getAllCompletedTasks(req, res){
  res.send('list of completed tasks for today or specific day')
}
function getSpecificTask(req, res){
  res.send('info about specific task')
}
function getSpecificCompletedTask(req, res){
  res.send('info about specific task that is completed')
}

function createNewTask(req, res){
  res.send('create new task')
}
function createNewCompletedTask(req, res){
  res.send('complete a specific task')
}

function deleteSpecificTask(req, res){
  res.send('delete a specific task')
}
function deleteSpecificCompletedTask(req, res){
  res.send('uncomplete a specific task')
}

export default router