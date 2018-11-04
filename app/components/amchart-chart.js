import Component from '@ember/component';
import { observer } from '@ember/object';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { compareAsc, compareDesc } from 'date-fns';

import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export default Component.extend({

  chart: null,

  init() {
    this._super(...arguments);
    this.sortData();
  },

  sortData() {
    if (this.sort === 'asc') {
      this.data.sort((a, b) => compareAsc(b.start_day, a.start_day));
    } else {
      this.data.sort((a, b) => compareDesc(b.start_day, a.start_day));
    }

    if (this.chart) {
      this.chart.invalidateData();
    }
  },

  dataObserver: observer('data', function() {
    this.chart.dispose();
    this.sortData(this.sort);
    this.createChart();
  }),

  sortObserver: observer('sort', function() {
    this.sortData();
  }),

  langObserver: observer('lang', function() {
    this.createChart();
  }),

  createChart() {
    if (this.chart) {
      this.chart.dispose();
    }

    this.chart = am4core.create('chartdiv', am4charts.XYChart);

    this.chart.data = this.data;
    this.chart.paddingRight = 30;
    this.chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    const categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = this.lang;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.fontSize = 12;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.cursorTooltipEnabled = false;

    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd';
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: 'day' };
    dateAxis.tooltipDateFormat = 'yyyy-MM-dd';
    dateAxis.renderer.fontSize = 12;

    const series1 = this.chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = `{${this.lang}}: {openDateX} - {dateX}`;

    series1.dataFields.openDateX = 'start_day';
    series1.dataFields.dateX = 'end_day';
    series1.dataFields.categoryY = this.lang;
    series1.columns.template.propertyFields.fill = 'color';
    series1.columns.template.propertyFields.stroke = 'color';

    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.lineX.strokeDasharray = '';
    this.chart.cursor.lineY.disabled = true;
    this.chart.cursor.behavior = 'zoomXY';

    this.chart.scrollbarX = new am4core.Scrollbar();
    this.chart.scrollbarY = new am4core.Scrollbar();
  },

  didInsertElement() {
    this._super(...arguments);
    this.createChart();
  },

  willDestroyElement() {
    if (this.chart) {
      this.chart.dispose();
    }

    this._super(...arguments);
  },
});
