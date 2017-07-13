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
  // type: {
  //   type: String,
  //   enum: ['repeating', 'singular']
  // },
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
  },

  wasCompletedToday () {
    if (!this.completed.length) return false

    const lastCompletedTask = this.completed[this.completed.length - 1]
    const lastCompletedAt = lastCompletedTask.completedAt.toDateString()
    const currentDate = new Date().toDateString()

    return (lastCompletedAt === currentDate)
  }
}

BlueprintTaskSchema.statics = {
  async findAll () {
    return this.find()
      .populate('completed')
  },
  async findAvailable () {
    const blueprints = await this.find({active: true})
      .slice('completed', -1)
      .populate('completed')

    return blueprints.filter(bp => !bp.wasCompletedToday())
  }
}

let BlueprintTask

try {
  BlueprintTask = mongoose.model('BlueprintTask')
} catch (e) {
  BlueprintTask = mongoose.model('BlueprintTask', BlueprintTaskSchema)
}

export default BlueprintTask
