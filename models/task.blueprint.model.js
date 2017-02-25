import mongoose from 'mongoose'
import q from 'q'
import {completedTaskSchema, CompletedTask} from '../models/task.completed.model.js'

mongoose.Promise = q.Promise

const blueprintSchema = new mongoose.Schema(
  {
    title           : { type: String },
    active          : { type: Boolean, default: true },
    type            : { type: String, enum: ['continuous', 'singular'] },
    completed       : [completedTaskSchema],
    createdAt       : { type: Date, default: Date.now },
    updatedAt       : { type: Date, default: Date.now }
  },
  {
    collection: 'task.blueprints'
  }
)
blueprintSchema.methods = {
  complete: function(cb){
    this.completed.push(new CompletedTask())
    return this
  }
}

blueprintSchema.statics = {
  get: function(blueprintID){
    return this.findOne({_id : blueprintID})
  },
  doesExist: function(blueprintID){
    return this
      .count({_id : blueprintID})
      .then(count => count ? true : false)
  }
}

export default mongoose.model('BlueprintTask', blueprintSchema)