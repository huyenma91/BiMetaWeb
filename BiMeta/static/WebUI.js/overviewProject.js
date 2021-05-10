function readyOverview(overviewData,fileXml){
    document.getElementById('overview').style.padding="20px"
    document.getElementById('overview').innerHTML="";
    document.getElementById('overview').innerHTML+=`<p>File name : ${fileXml}</p>`;
    document.getElementById('overview').innerHTML+=`<p>F-measure : ${overviewData[0].Fmeasure}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Recall : ${overviewData[0].Recall}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Precision : ${overviewData[0].Precision}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Date start : ${overviewData[0].Time}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Time : ${overviewData[0].Training}</p>`;
}