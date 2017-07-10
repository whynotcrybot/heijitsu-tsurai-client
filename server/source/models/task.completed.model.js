import mongoose from 'mongoose'

const completedTaskSchema = new mongoose.Schema(
  {
    completedAt : { type: Date, default: Date.now }
  }
)

const CompletedTask = mongoose.model('CompletedTask', completedTaskSchema)

export {
  completedTaskSchema,
  CompletedTask
}
