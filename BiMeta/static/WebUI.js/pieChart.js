function pieChart(pieGraphData) {

    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.createFromConfig({legend:{}},"piediv", am4charts.PieChart);
    chart.legend.scrollable = true;
    
    // Add data
    chart.data = pieGraphData;
    
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "number";
    pieSeries.dataFields.category = "species";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%"
    
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    // chart.hiddenState.properties.radius = am4core.percent(0);
    chart.responsive.enabled = true;
    
    
    }; // end am4core.ready()