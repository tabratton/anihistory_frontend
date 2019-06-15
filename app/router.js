import EmberRouter from '@ember/routing/router'
import config from './config/environment'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('index', { path: '/' })
  this.route('user', { path: 'user/:user_name' })
  this.route('update', { path: 'update/:found' })
})

export default Router
