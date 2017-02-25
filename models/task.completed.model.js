import mongoose from 'mongoose'
import q from 'q'

mongoose.Promise = q.Promise

const completedTaskSchema = new mongoose.Schema(
  {
    completedAt : { type: Date, default: Date.now }
  }
)
completedTaskSchema.statics = {
  findAll: function(){
    return this
      .find()
      .populate('_blueprint')
  },
  get: function(completedID){
    return this
      .findOne({_id : completedID})
      .populate('_blueprint')
  },
  add: function(blueprintID){
    return this.create({_blueprint : blueprintID})
  }
}
const CompletedTask = mongoose.model('CompletedTask', completedTaskSchema)

export {
  completedTaskSchema,
  CompletedTask
}