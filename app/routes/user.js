import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import * as am4core from '@amcharts/amcharts4/core'
import {
  addDays,
  isEqual,
  parseISO,
  subDays
} from 'date-fns'
import fetch from 'fetch';

import am4themes_kelly from '@amcharts/amcharts4/themes/kelly'

export default class UserRoute extends Route {

  @service router

  model(params) {
    return fetch(`https://rust.swigglemeister.com/users/${params.user_name}`)
      .then(response => response.json())
      .then(({ users = {} }) => {
        const data = users.list || []
        const colorSet = new am4core.ColorSet()
        am4themes_kelly(colorSet)
        data.forEach(e => {
          if (e.start_day) {
            e.start_day = parseISO(e.start_day)
          } else if (e.end_day) {
            e.start_day = subDays(parseISO(e.end_day), 1)
          } else {
            e.start_day = new Date()
          }

          e.english = e.english ? e.english : e['user_title']
          e.romaji = e.romaji ? e.romaji : e['user_title']
          e.native = e.native ? e.native : e['user_title']
          e.user = e['user_title']

          e.end_day = e.end_day ? parseISO(e.end_day) : new Date()
          if (isEqual(e.start_day, e.end_day)) {
            e.end_day = addDays(e.end_day, 1)
          }
          e.color = colorSet.next()
        })

        return data
      })
  }

  afterModel(model) {
    if (!model && this.router.currentRouteName === 'update') {
      this.transitionTo('update', 'false')
    }
  }

  setupController(controller, model) {
    if (model) {
      controller.set('model', model)
    } else {
      this.transitionTo('update', 'false')
    }
  }
}
