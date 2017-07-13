import faker from 'faker'

import BaseFactory from './base.factory'

class BlueprintFactory extends BaseFactory {
  /**
   * Create a blueprint
   *
   * @public
   * @param {Object} attrs of blueprint
   * @returns {Object} a fake blueprint
   */
  generate (attrs) {
    return {
      title: faker.lorem.words(6),
      ...attrs
    }
  }
}

export default new BlueprintFactory()
