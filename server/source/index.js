import express from 'express'
import mongoose from 'mongoose'

import applyMiddlewares from './config/middlewares'

import TaskBlueprint from './routes/task.blueprint.route'
import Timeline from './routes/timeline.route'

const app = express()
applyMiddlewares(app)

app.use('/', TaskBlueprint)
app.use('/', Timeline)

mongoose.connect('mongodb://mongo/heijitsu-tsurai')

app.listen(3000, () => {
  console.log('server is ready on 3000')
})
