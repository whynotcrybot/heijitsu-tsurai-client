import mongoose from 'mongoose'
import q from 'q'

mongoose.Promise = q.Promise

const completedSchema = new mongoose.Schema(
  {
    _blueprint : { type: mongoose.Schema.Types.ObjectId, ref: 'BlueprintTask' },
    createdAt  : { type: Date, default: Date.now }
  },
  {
    collection: 'task.completed'
  }
)
completedSchema.statics = {
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

export default mongoose.model('CompletedTask', completedSchema)