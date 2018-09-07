import Component from '@ember/component';
import { observer } from '@ember/object';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
import parse from 'date-fns/parse';
import compareAsc from 'date-fns/compare_asc';
import compareDesc from 'date-fns/compare_desc';
import isEqual from 'date-fns/is_equal';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);

export default Component.extend({

  sortingOptions: null,
  selectedSort: 'Oldest on Top',
  chart: null,

  init() {
    this._super(...arguments);
    this.data = this.model.data;
    this.sortingOptions = ['Oldest on Top', 'Newest on Top'];
    this.preProcessData();
    this.sortData('asc');
  },

  // Throw this in route when data is queried
  preProcessData() {
    let colorSet = new am4core.ColorSet();
    this.data.forEach(e => {
      if (e.start_day) {
        e.start_day = parse(e.start_day);
      } else if (e.end_day) {
        e.start_day = subDays(parse(e.end_day), 1);
      } else {
        e.start_day = new Date()
      }

      e.end_day = e.end_day ? parse(e.end_day) : new Date();
      if (isEqual(e.start_day, e.end_day)) {
        e.end_day = addDays(e.end_day, 1);
      }
      e.color = colorSet.next();
    });
  },

  sortingObserver: observer('selectedSort', function() {
    this.selectedSort === 'Oldest on Top' ? this.sortData('asc') : this.sortData('desc');
  }),

  sortData(sortingMethod) {
    if (sortingMethod === 'asc') {
      this.data.sort((a, b) => compareAsc(a.start_day, b.start_day));
    } else {
      this.data.sort((a, b) => compareDesc(a.start_day, b.start_day));
    }
    if (this.chart) {
      this.chart.invalidateData();
    }
  },

  createChart(data) {
    this.chart = am4core.create('chartdiv', am4charts.XYChart);

    this.chart.data = data;
    this.chart.paddingRight = 30;
    this.chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'user_title';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.fontSize = 12;

    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd';
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: 'day' };
    dateAxis.tooltipDateFormat = 'yyyy-MM-dd';
    dateAxis.renderer.fontSize = 12;

    let series1 = this.chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = '{user_title}: {openDateX} - {dateX}';
    series1.dataFields.openDateX = 'start_day';
    series1.dataFields.dateX = 'end_day';
    series1.dataFields.categoryY = 'user_title';
    series1.columns.template.propertyFields.fill = 'color';
    series1.columns.template.propertyFields.stroke = 'color';

    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.lineX.strokeDasharray = '';
    this.chart.cursor.lineY.strokeDasharray = '';
    this.chart.cursor.behavior = 'zoomXY';

    this.chart.scrollbarX = new am4core.Scrollbar();
    this.chart.scrollbarY = new am4core.Scrollbar();
  },

  didInsertElement() {
    this._super(...arguments);
    this.createChart(this.data);
  },

  willDestroyElement() {
    if (this.chart) {
      this.chart.dispose();
    }
    this._super(...arguments);
  },
});
