import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import TaskBlueprint from './routes/task.blueprint.route'

dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use('/', TaskBlueprint)

mongoose.connect('mongodb://localhost/heijitu-tsurai');

app.listen(8090, () => {
  console.log('server is ready on 8090')
})