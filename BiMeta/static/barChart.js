function readyChart(barGraphData) {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  
  chart.data = barGraphData;
  
  // chart.padding(40, 40, 40, 40);
  
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "species";
  categoryAxis.renderer.minGridDistance = 10;
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.grid.template.disabled = true;
  
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.extraMax = 0.1;
  //valueAxis.rangeChangeEasing = am4core.ease.linear;
  //valueAxis.rangeChangeDuration = 1500;
  
  var series = chart.series.push(new am4charts.ColumnSeries());

  series.tooltip.label.interactionsEnabled = true;
  series.tooltip.keepTargetHover = true;
  series.columns.template.tooltipHTML = "<b>Species name :{name}</b><br><b>Quantity :{number}</b>"

  series.dataFields.categoryX = "species";
  series.dataFields.valueY = "number";
  // series.tooltipText = "{valueY.value}"
  series.columns.template.strokeOpacity = 0;
  series.columns.template.column.cornerRadiusTopRight = 10;
  series.columns.template.column.cornerRadiusTopLeft = 10;
  //series.interpolationDuration = 1500;
  //series.interpolationEasing = am4core.ease.linear;
  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.verticalCenter = "bottom";
  labelBullet.label.dy = -10;
  labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
  
  chart.zoomOutButton.disabled = true;
  
  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
  series.columns.template.adapter.add("fill", function (fill, target) {
   return chart.colors.getIndex(target.dataItem.index);
  });
  
  // setInterval(function () {
  //  am4core.array.each(chart.data, function (item) {
  //    item.number += Math.round(Math.random() * 2 - 1);
  //    item.number = Math.abs(item.number);
  //  })
  //  chart.invalidateRawData();
  // }, 2000)
  
  categoryAxis.sortBySeries = series;
  
  }; // end am4core.ready()
  