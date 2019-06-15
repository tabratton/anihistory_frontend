import Route from '@ember/routing/route'

export default class UpdateRoute extends Route {
  model(params) {
    return params.found
  }

  setupController(controller, model) {
    controller.set('found', model === 'true')
  }
}
