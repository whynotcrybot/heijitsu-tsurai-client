import mongoose from 'mongoose'

const CompletedTaskSchema = new mongoose.Schema({
  completedAt: { type: Date, default: Date.now }
})

let CompletedTask

try {
  CompletedTask = mongoose.model('CompletedTask')
} catch (e) {
  CompletedTask = mongoose.model('CompletedTask', CompletedTaskSchema)
}

export default CompletedTask
