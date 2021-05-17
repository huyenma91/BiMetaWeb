function readyOverview(overviewData){
    document.getElementById('overview').style.padding="20px"
    document.getElementById('overview').innerHTML="";
    document.getElementById('overview').innerHTML+=`<p>File name : ${processedFile}</p>`;
    document.getElementById('overview').innerHTML+=`<p>F-measure : ${overviewData.Fmeasure}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Recall : ${overviewData.Recall}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Precision : ${overviewData.Precision}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Date start : ${overviewData.Time}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Time : ${overviewData.Execution}</p>`;
}