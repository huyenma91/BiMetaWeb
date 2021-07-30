// function lollipopChart(lollipopData,arrayCode) {
  function lollipopChart(lollipopData) {
    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("lollipopdiv", am4charts.XYChart);
    
    var data = [];
    // var value = 120;
    console.log(lollipopData)
    var names = ["cases",
  "todayCases",
  "deaths",
  "todayDeaths",
  "recovered",
  "todayRecovered"
  ]
  var value = [lollipopData["cases"],lollipopData["todayCases"],lollipopData["todayDeaths"],lollipopData["recovered"],lollipopData["todayRecovered"]]
  // console.log(valueTest)

  for (var i = 0; i < names.length; i++) {
    // value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
    data.push({ category: names[i], value: value[i] });
  }
    // var names = lollipopData["Countries"];
    
    // for (var i = 0; i < names.length; i++) {
    //   if (arrayCode.includes(names[i]["CountryCode"])) {
    //     data.push({ category: names[i]["Country"], value: names[i]["TotalConfirmed"] });
    //   }
    // }
    
    // console.log("da vao lollipop")
    // console.log("data :", data)

    chart.data = data;
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.location = 0.5;
    
    categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
        return -target.maxRight / 2;
    })
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;
    
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "category";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 1;
    series.strokeDashArray = "1,3";
    series.columns.template.width = 0.01;
    series.tooltip.pointerOrientation = "horizontal";
    
    var bullet = series.bullets.create(am4charts.CircleBullet);
    
    chart.cursor = new am4charts.XYCursor();
    
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    
    
    }; // end am4core.ready()