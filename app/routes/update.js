import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    this.set('userName', '');
    return params.found;
  },

  setupController(controller, model) {
    controller.set('notFound', model);
  },
});
