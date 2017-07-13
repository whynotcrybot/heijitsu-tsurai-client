import moment from 'moment'
import BlueprintTask from '../models/task.blueprint.model.js'

export function getTimeline (req, res) {
  const monday = moment().set({
    day: 'Monday',
    hour: 0,
    minute: 0,
    second: 0
  })
  .toDate()

  BlueprintTask
    .aggregate([
      {$unwind: '$completed'},
      {$lookup: {
        from: 'completedtasks',
        localField: 'completed',
        foreignField: '_id',
        as: 'completed'
      }},
      {$unwind: '$completed'},
      {$match: {'completed.completedAt': { $gt: monday }}},
      {$group: {
        _id: '$_id',
        title: { $first: '$title' },
        completed: { $push: '$completed' }
      }}
    ])
    .then(tasks => res.json(tasks))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}
