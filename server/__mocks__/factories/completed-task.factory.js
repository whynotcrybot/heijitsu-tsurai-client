import faker from 'faker'

import BaseFactory from './base.factory'

class CompletedTaskFactory extends BaseFactory {
  /**
   * Create a completed task
   *
   * @public
   * @param {Object} attrs of completed task
   * @returns {Object} a fake completed task
   */
  generate (attrs) {
    return {
      ...attrs
    }
  }
}

export default new CompletedTaskFactory()
