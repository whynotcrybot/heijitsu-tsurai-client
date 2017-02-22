import mongoose from 'mongoose'
import q from 'q'

mongoose.Promise = q.Promise

const blueprintSchema = new mongoose.Schema(
  {
    title           : { type: String },
    active          : { type: Boolean },
    type            : { type: String },
    createdAt       : { type: Date, default: Date.now },
    updatedAt       : { type: Date, default: Date.now }
  },
  {
    collection: 'task.blueprints'
  }
)
blueprintSchema.statics = {
  findAll: function(){
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
  }
}

export default mongoose.model('BlueprintTask', blueprintSchema)