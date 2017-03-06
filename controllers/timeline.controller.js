import BlueprintTask from '../models/task.blueprint.model.js'

export {
  getTimeline
}

function getTimeline(req, res){
  function getClosestMonday(d = new Date().setHours(0,0,0,0)) {
    d = new Date(d)
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  const monday = getClosestMonday()

  console.log("monday", monday)

  /*const findQuery = [
      {$unwind: "$completed" },
      {$match: {"completed.completedAt": {$gt: monday} } },
      {$group: {_id: "$_id", completed: {$push: "$completed"} } }
  ];*/

  BlueprintTask
    .aggregate([
      {$unwind: '$completed'},
      {$match: {"completed.completedAt": { $gt: monday }}}
    ])
    .then(x => res.json(x))

    /*
     * This code snipper finds all tasks that were completed today.
     * Returns whole object (including complete history of completed tasks)
     */
    /*.find({'completed.completedAt' : {$gte : midnight}})
    .slice('completed', -1)
    .lean()
    .then(x => res.json(x))*/

    /*.aggregate(
      {$unwind: "$completed" },
      {$match: {"completed.completedAt": {$gt: midnight} } },
      {$group: {_id: "$_id", completed: {$push: "$completed"} } }
    )
    .then(x => res.json(x))*/
}