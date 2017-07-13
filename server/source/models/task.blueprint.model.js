import mongoose, { Schema } from 'mongoose'
import CompletedTask from '../models/task.completed.model.js'

const BlueprintTaskSchema = new Schema({
  title: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enum: ['repeating', 'singular']
  },
  completed: [{
    type: Schema.Types.ObjectId,
    ref: 'CompletedTask'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

BlueprintTaskSchema.methods = {
  async complete () {
    try {
      this.completed.push(await new CompletedTask().save())
      return this.save()
    } catch (err) {
      return err
    }
  }
}

BlueprintTaskSchema.statics = {
  doesExist: function (blueprintID) {
    return this
      .count({_id: blueprintID})
      .then(count => count ? true : false)
  },

  findAvailable: function () {
    return this.find({active: true})
      .slice('completed', -1)
      .lean()
  }
}

let BlueprintTask

try {
  BlueprintTask = mongoose.model('BlueprintTask')
} catch (e) {
  BlueprintTask = mongoose.model('BlueprintTask', BlueprintTaskSchema)
}

export default BlueprintTask
