import { expect } from 'chai'

import server from '../../../__mocks__/utils/server.mock'
import BlueprintFactory from '../../../__mocks__/factories/blueprint.factory'

const ENDPOINT = '/blueprints'

describe('POST ' + ENDPOINT, () => {
  describe('Create', () => {
    it('should create a blueprint', done => {
      server
        .post(ENDPOINT)
        .send(BlueprintFactory.generate())
        .end((err, res) => {
          const { body, status } = res

          expect(err).to.be.null
          expect(status).to.equal(201)
          expect(body).to.haveOwnProperty('_id')
          expect(body).to.haveOwnProperty('updatedAt')
          done()
        })
    })
  })
})
