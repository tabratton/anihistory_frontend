import Route from '@ember/routing/route'

export default Route.extend({
  model(params) {
    return params.found
  },

  setupController(controller, model) {
    controller.set('found', model === 'true')
  },
})
