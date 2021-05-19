function readyOverview(overviewData,time){
    document.getElementById('overview').style.padding="20px"
    document.getElementById('overview').innerHTML="";
    document.getElementById('overview').innerHTML+=`<p>File name : ${processedFile}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Run at : ${time}</p>`;
    document.getElementById('overview').innerHTML+=`<b>Perform evaluation : </b>`;
    document.getElementById('overview').innerHTML+=`<ul><li>F-measure : ${overviewData.Fmeasure}</li>`;
    document.getElementById('overview').innerHTML+=`<li>Recall : ${overviewData.Recall}</li>`;
    document.getElementById('overview').innerHTML+=`<li>Precision : ${overviewData.Precision}</li></ul>`;
    document.getElementById('overview').innerHTML+=`<b>Time steps: : </b>`;
    document.getElementById('overview').innerHTML+=`<ul><li>Step_1_1 : ${overviewData.Step_1_1} sec</li>`;
    document.getElementById('overview').innerHTML+=`<li>Step_1_2 : ${overviewData.Step_1_2} sec</li>`;
    document.getElementById('overview').innerHTML+=`<li>Step_1_3 : ${overviewData.Step_1_3} sec</li>`;
    document.getElementById('overview').innerHTML+=`<li>Step_2_1 : ${overviewData.Step_2_1} sec</li>`;
    document.getElementById('overview').innerHTML+=`<li>Step_2_2 : ${overviewData.Step_2_2} sec</li></ul>`;
    document.getElementById('overview').innerHTML+=`<p>Time estimate: ${overviewData.Execution}</p>`;
}
