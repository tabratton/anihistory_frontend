import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import Component from '@glimmer/component'
import { action, computed } from '@ember/object'
import { compareAsc, compareDesc } from 'date-fns'

import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

export default class AmchartChart extends Component {

  chart

  get sortedData() {
    let data;
    if (this.args.sort === 'asc') {
      data = this.args.data.sort((a, b) => compareAsc(b.start_day, a.start_day))
    } else {
      data = this.args.data.sort((a, b) => compareDesc(b.start_day, a.start_day))
    }

    return data
  }

  @action
  createChartAction() {
    this.createChart()
  }

  @computed('args.{data,lang,sort}')
  get _observerHack() {
    this.createChart()
    return true
  }

  createChart() {
    if (this.chart) {
      this.chart.dispose()
    }

    this.chart = am4core.create('chartdiv', am4charts.XYChart)

    this.chart.data = this.sortedData
    this.chart.paddingRight = 30
    this.chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd'

    const categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = this.args.lang
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.renderer.inversed = true
    categoryAxis.renderer.fontSize = 12
    categoryAxis.renderer.labels.template.disabled = true
    categoryAxis.cursorTooltipEnabled = false

    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd'
    dateAxis.renderer.minGridDistance = 70
    dateAxis.baseInterval = { count: 1, timeUnit: 'day' }
    dateAxis.tooltipDateFormat = 'yyyy-MM-dd'
    dateAxis.renderer.fontSize = 12

    const series1 = this.chart.series.push(new am4charts.ColumnSeries())
    series1.columns.template.width = am4core.percent(80)
    series1.columns.template.tooltipText = `{${this.args.lang}}: {openDateX} - {dateX}`

    series1.dataFields.openDateX = 'start_day'
    series1.dataFields.dateX = 'end_day'
    series1.dataFields.categoryY = this.args.lang
    series1.columns.template.propertyFields.fill = 'color'
    series1.columns.template.propertyFields.stroke = 'color'

    this.chart.cursor = new am4charts.XYCursor()
    this.chart.cursor.lineX.strokeDasharray = ''
    this.chart.cursor.lineY.disabled = true
    this.chart.cursor.behavior = 'zoomXY'

    this.chart.scrollbarX = new am4core.Scrollbar()
    this.chart.scrollbarY = new am4core.Scrollbar()
  }
}
