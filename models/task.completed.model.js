import mongoose from 'mongoose'
mongoose.Promise = require('q').Promise

const schema = new mongoose.Schema(
  {
    _blueprint  : { type: mongoose.Schema.Types.ObjectId, ref: 'TaskBlueprint' }
  },
  {
    collection: 'task.completed'
  }
)
schema.statics = {
  findAll: function(){
    return this.find()
  },
  add: function(blueprint){
    return this
      .create({_blueprint : blueprint})
  }
}

export default mongoose.model('CompletedTask', schema)