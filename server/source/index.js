import express from 'express'

import './config/database'

import applyMiddlewares from './config/middlewares'
import constants from './config/constants'

import TaskBlueprint from './routes/task.blueprint.route'
import Timeline from './routes/timeline.route'

const app = express()
applyMiddlewares(app)

app.use('/', TaskBlueprint)
app.use('/', Timeline)

// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) {
  app.listen(constants.PORT, err => {
    if (err) console.error('Error occured')
    else {
      console.log(
        `
          Listening on port: ${constants.PORT}
          Environment: ${process.env.NODE_ENV}
        `,
      )
    }
  })
}

export default app
