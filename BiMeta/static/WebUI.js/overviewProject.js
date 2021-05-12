function readyOverview(overviewData,fileXml,params){
    document.getElementById('overview').style.padding="20px"
    document.getElementById('overview').innerHTML="";
    document.getElementById('overview').innerHTML+=`<p><b>File name : </b><u>${fileXml}</u></p>`;
    document.getElementById('overview').innerHTML+=`<p>Date&Time : ${overviewData.Time}</p>`;
    document.getElementById('overview').innerHTML+=`<p>Time estimate: ${overviewData.Training}</p>`;
    document.getElementById('overview').innerHTML+=`<b>Perform evaluation : </b>`;
    document.getElementById('overview').innerHTML+=`<ul><li>F-measure : ${overviewData.Fmeasure}</li>`;
    document.getElementById('overview').innerHTML+=`<li>Recall : ${overviewData.Recall}</li>`;
    document.getElementById('overview').innerHTML+=`<li>Precision : ${overviewData.Precision}</li></ul>`;
    document.getElementById('overview').innerHTML+=`<b>Parameters : </b>`;
    document.getElementById('overview').innerHTML+=`<ul><li>K-mer size : ${params.kmer}</li>`;
    document.getElementById('overview').innerHTML+=`<li>Length of Q-mer : ${params.lofqmer}</li>`;
    document.getElementById('overview').innerHTML+=`<li>Number of share reads : ${params.sharereads}</li>`;
    document.getElementById('overview').innerHTML+=`<li>Maximum component size : ${params.maxcomp}</li></ul>`;
    document.getElementById('overview').innerHTML+=`<b>K-clusters : </b>`;
    document.getElementById('overview').innerHTML+=`<p>Number of cluster : ${params.kNumber}</p>`;
}

function paramtable(params){
    document.getElementById("kmer_cell").innerHTML=`${params.kmer}`;
    document.getElementById("lofqmer_cell").innerHTML=`${params.lofqmer}`;
    document.getElementById("sharereads_cell").innerHTML=`${params.sharereads}`;
    document.getElementById("maxcomp_cell").innerHTML=`${params.maxcomp}`;
}