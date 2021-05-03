function pieChart(pieGraphData) {

    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.createFromConfig({legend:{}},"piediv", am4charts.PieChart);
    chart.legend.scrollable = true;
    
    // Add data
    chart.data = [
        {
            "species": 1,
            "number": 500,
            "code": "15668172",
            "name": "\"Methanocaldococcus jannaschii DSM 2661 chromosome\" (392b1054a4bf536ea1cc349545ace50120973c3a)",
            "color": "#ED1C24"
        },
        {
            "species": 2,
            "number": 781,
            "code": "134045046",
            "name": "\"Methanococcus maripaludis C5 chromosome\" (6c8ee4fd8ba70ca081406766eff61a612fc74b49)",
            "color":"#F1D302"
        }
    ];
    chart.colors.list = [
        am4core.color("#845EC2"),
        am4core.color("#D65DB1"),
        am4core.color("#FF6F91"),
        am4core.color("#FF9671"),
        am4core.color("#FFC75F"),
        am4core.color("#F9F871")
      ];
    
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "number";
    pieSeries.dataFields.category = "species";
    // pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%"
    pieSeries.slices.template.propertyFields.fill = 'color'

    // pieSeries.slices.template.adapter.add("fill", function (fill, target) {
    //     return chart.colors.getIndex(target.dataItem.index);
    //   });
    
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    // chart.hiddenState.properties.radius = am4core.percent(0);
    chart.responsive.enabled = true;
    
    
    }; // end am4core.ready()