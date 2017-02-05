import express from 'express'
import tasks from './routes/tasks'

const app = express()
app.use('/', tasks)

app.listen(8090, () => {
  console.log('server is ready on 8090')
})