import mongoose, { Schema } from 'mongoose'
import moment from 'moment'

import CompletedTask from '../models/task.completed.model.js'

const BlueprintTaskSchema = new Schema({
  title: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
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
  },

  async uncomplete () {
    try {
      this.completed.pop()

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
  async findBlueprint (id) {
    return this.findById(id)
      .populate('completed')
  },

  async findAllBlueprints () {
    return this.find()
      .populate('completed')
  },

  async findAvailableBlueprints () {
    const blueprints = await this.find({active: true})
      .slice('completed', -1)
      .populate('completed')

    return blueprints.filter(bp => !bp.wasCompletedToday())
  },

  async getTimeline () {
    const monday = moment()
      .isoWeekday(1)
      .set({
        day: 'Monday',
        hour: 0,
        minute: 0,
        second: 0
      })
      .toDate()

    return this.aggregate([
      {$unwind: '$completed'},
      {$lookup: {
        from: 'completedtasks',
        localField: 'completed',
        foreignField: '_id',
        as: 'completed'
      }},
      {$unwind: '$completed'},
      {$match: {'completed.completedAt': {$gt: monday}}},
      {$group: {
        _id: '$_id',
        title: { $first: '$title' },
        completed: { $push: '$completed' }
      }}
    ])
  }
}

let BlueprintTask

try {
  BlueprintTask = mongoose.model('BlueprintTask')
} catch (e) {
  BlueprintTask = mongoose.model('BlueprintTask', BlueprintTaskSchema)
}

export default BlueprintTask
