import { expect } from 'chai'
import moment from 'moment'

import server from '../../../__mocks__/utils/server.mock'
import Blueprint from '../../../source/models/task.blueprint.model'
import CompletedTask from '../../../source/models/task.completed.model'
import BlueprintFactory from '../../../__mocks__/factories/blueprint.factory'
import CompletedTaskFactory from '../../../__mocks__/factories/completed-task.factory'

const ENDPOINT = '/timeline'

let testBlueprint
let testBlueprint2
let testBlueprint3

let testCompletedTask
let testCompletedTask2
let testCompletedTask3

describe('POST ' + ENDPOINT, () => {
  before(async () => {
    const monday = moment().isoWeekday(1).day('Monday')
    const wednesday = moment().isoWeekday(1).day('Wednesday')

    await Blueprint.remove()
    await CompletedTask.remove()

    testBlueprint = await Blueprint.create(BlueprintFactory.generate())
    testBlueprint2 = await Blueprint.create(BlueprintFactory.generate())
    testBlueprint3 = await Blueprint.create(BlueprintFactory.generate())

    testCompletedTask = await CompletedTask.create(CompletedTaskFactory.generate({
      completedAt: monday
    }))
    testCompletedTask2 = await CompletedTask.create(CompletedTaskFactory.generate({
      completedAt: wednesday
    }))
    testCompletedTask3 = await CompletedTask.create(CompletedTaskFactory.generate({
      completedAt: wednesday
    }))

    testBlueprint.completed.push(testCompletedTask)
    testBlueprint2.completed.push(testCompletedTask2)
    testBlueprint3.completed.push(testCompletedTask3)

    testBlueprint.save()
    testBlueprint2.save()
    testBlueprint3.save()
  })

  describe('Create', () => {
    it('should retrieve correct timeline for current week', done => {
      server
        .get(ENDPOINT)
        .end((err, res) => {
          const { body, status } = res

          expect(err).to.be.null
          expect(status).to.equal(200)

          expect(body[0].title).to.equal(testBlueprint3.title)
          expect(body[1].title).to.equal(testBlueprint2.title)
          expect(body[2].title).to.equal(testBlueprint.title)

          expect(body[0].completed[0]._id).to.equal(testCompletedTask3._id.toString())
          expect(body[1].completed[0]._id).to.equal(testCompletedTask2._id.toString())
          expect(body[2].completed[0]._id).to.equal(testCompletedTask._id.toString())

          expect( new Date(body[0].completed[0].completedAt).toString() )
            .to.equal( new Date(testCompletedTask3.completedAt).toString() )
          expect( new Date(body[1].completed[0].completedAt).toString() )
            .to.equal( new Date(testCompletedTask2.completedAt).toString() )
          expect( new Date(body[2].completed[0].completedAt).toString() )
            .to.equal( new Date(testCompletedTask.completedAt).toString() )

          done()
        })
    })
  })
})
