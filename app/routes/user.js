import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import * as am4core from "@amcharts/amcharts4/core";
import parse from "date-fns/parse";
import subDays from "date-fns/sub_days";
import isEqual from "date-fns/is_equal";
import addDays from "date-fns/add_days";

export default Route.extend({

  ajax: service(),

  model(params) {
    return this.get('ajax').request(`https://rust.swigglemeister.com/users/${params.user_name}`)
      .then(({ data }) => {
        let colorSet = new am4core.ColorSet();
        data.forEach(e => {
          if (e.start_day) {
            e.start_day = parse(e.start_day);
          } else if (e.end_day) {
            e.start_day = subDays(parse(e.end_day), 1);
          } else {
            e.start_day = new Date()
          }

          e.english = e.english ? e.english : e['user_title'];
          e.romaji = e.romaji ? e.romaji : e['user_title'];
          e.native = e.native ? e.native : e['user_title'];

          e.end_day = e.end_day ? parse(e.end_day) : new Date();
          if (isEqual(e.start_day, e.end_day)) {
            e.end_day = addDays(e.end_day, 1);
          }
          e.color = colorSet.next();
        });
        return data;
    });
  },

  setupController(controller, model) {
    controller.set('model', model);
  }
});
