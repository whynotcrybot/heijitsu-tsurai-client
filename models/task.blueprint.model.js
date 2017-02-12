import mongoose from 'mongoose'
mongoose.Promise = require('q').Promise

const schema = new mongoose.Schema(
  {
    title				: String,
    active    	: Boolean,
    type        : String
  },
  {
    collection: 'task.blueprints'
  }
)
schema.statics = {
  findAll: function(){
    return this.find()
  },
  doesExist: function(id){
    return this.count({_id : id})
      .then(() => true)
      .catch(() => false)
  }
}

export default mongoose.model('BlueprintTask', schema)