import mongoose from 'mongoose'
import q from 'q'

import CompletedTask from '../models/task.completed.model.js'

mongoose.Promise = q.Promise

const blueprintSchema = new mongoose.Schema(
  {
    title           : { type: String },
    active          : { type: Boolean },
    type            : { type: String, enum: ['continuous', 'singular'] },
    createdAt       : { type: Date, default: Date.now },
    updatedAt       : { type: Date, default: Date.now }
    //DO NOT ADD LAST COMPLETED AT!
  },
  {
    collection: 'task.blueprints'
  }
)
blueprintSchema.statics = {
  findAvailable: function(){
    this
      .find()
      .lean()
      .distinct('_id')
      .then(ids => ids.filter( id => {
        CompletedTask
          .getByBlueprint(id)
      }))


    return this.find()
  },
  get: function(blueprintID){
    return this.findOne({_id : blueprintID})
  },
  delete: function(blueprintID){
    return this.findOneAndRemove({_id : blueprintID})
  },
  doesExist: function(blueprintID){
    return this
      .count({_id : blueprintID})
      .then(count => count ? true : false)
  },
  isActive: function(blueprintID){
    return this
      .findOne({_id : blueprintID})
      .select({active: true})
      .then(task => console.log("task", task))
  }
}

export default mongoose.model('BlueprintTask', blueprintSchema)