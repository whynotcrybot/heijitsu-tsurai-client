import BlueprintTask from '../models/task.blueprint.model.js'

export function getTimeline (req, res) {
  //todo: understand and rewrite this function
  function getClosestMonday(d = new Date().setHours(0,0,0,0)) {
    d = new Date(d)
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  const monday = getClosestMonday()

  BlueprintTask
    .aggregate([
      {$unwind : '$completed'},
      {$match  : {'completed.completedAt': { $gt: monday }}},
      {$group  : {
        _id       : '$_id',
        title     : { $first: '$title' },
        completed : { $push: '$completed' }
      }}
    ])
    .then(tasks => res.json(tasks))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}
