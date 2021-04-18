var data = JSON.parse("{{data|escapejs}}");
// var dataNode = document.getElementById('alldata');
// dataNode.innerHTML += "{{data|escapejs}}";
dataNode = document.getElementById('neatdata');
for (var x in data) {
    dataNode.innerHTML += x + ' : ' + data[x] + '<br>';
}


function doTheInsert() {
    var newRow = document.getElementById('myTable').insertRow();
    // newRow = "<td>New row text</td><td>New row 2nd cell</td>"; <-- won't work
    newRow.innerHTML = "<td>New row text</td><td>New row 2nd cell</td>";
}

$('#file').bind('change', function() {
    var fileName = '';
    fileName = $(this)[0].files[0].name;
    $('#file-selected').html(fileName);
})
var kmer, lofqmer, sharereads, maxcomp, numtasks, getFile = null;
var exGraph, exFile;
var getFileFlag = false;

function getValue(event) {
    // event.preventDefault();
    kmer = document.getElementById("kmer").value;
    lofqmer = document.getElementById("lofqmer").value;
    sharereads = document.getElementById("sharereads").value;
    maxcomp = document.getElementById("maxcomp").value;
    exGraph = document.getElementById("exGraph").value;
    exFile = document.getElementById("exFile").value;
    var getFile = document.getElementById("file").files[0];
    console.log(getFile)
    if (kmer && lofqmer && sharereads && maxcomp && getFile != undefined) {
        onFormSubmit(event);
    } else if (!kmer) {
        alert('Fill kmer');
    } else if (!lofqmer) {
        alert('Fill length of Q-mer');
    } else if (!sharereads) {
        alert('Fill sharereads');
    } else if (!maxcomp) {
        alert('Fill maxcomp');
    } else if (!getFile) {
        alert("Please upload a file");
    } else {
        console.log(kmer)
        console.log(lofqmer)
        console.log(sharereads)
        console.log(maxcomp)
        console.log(exGraph)
        console.log(exFile)
    }
}
document.getElementById("progress-text").innerHTML = "Uploaded : " + 0 / 1000000 + "/" + 0 / 1000000 + " MB";

function onFormSubmit(event) {
    var formData = new FormData();
    var getFile1 = document.getElementById("file").files[0];
    formData.append("file", getFile1);
    console.log(formData);

    var http = new XMLHttpRequest()
    http.open("POST", "", true)
    http.upload.addEventListener("progress", function(ev) {
        if (ev.lengthComputable) {
            var percentage = (ev.loaded / ev.total * 100 | 0);
            console.log("Uploaded : " + ev.loaded);
            console.log("Total : " + ev.total);
            console.log(percentage);
            if (percentage == 100) {
                document.getElementById("stop-div").style["display"] = "none";
                document.getElementById("progress-div").style["display"] = "none";
                document.getElementById("progress-text").innerHTML = "Uploaded : " + ev.loaded / 1000000 + "/" + ev.total / 1000000 + " MB";
            } else {
                document.getElementById("stop-div").style["display"] = "block";
                document.getElementById("progress-div").style["display"] = "block";
                document.getElementById("progress-bar").style["width"] = "" + percentage + "%";
                document.getElementById("progress-bar").innerHTML = "" + percentage + "%";
                document.getElementById("progress-text").innerHTML = "Uploaded : " + ev.loaded / 1000000 + "/" + ev.total / 1000000 + " MB";
            }
        }

    });

    var params = 'kmer=' + kmer + '&lofqmer=' + lofqmer + '&sharereads=' + sharereads + '&maxcomp=' + maxcomp + '&exGraph=' + exGraph + '&exFile=' + exFile;
    var xhr = new XMLHttpRequest()
    xhr.open('POST', "", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() { //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
            // alert(xhr.responseText);
        }
    }
    xhr.send(params);
    http.send(formData);
    document.getElementById("stop_button").addEventListener("click", function() {
        xhr.abort();
        http.abort();
        document.getElementById("stop-div").style["display"] = "none";
        document.getElementById("progress-div").style["display"] = "none";
        document.getElementById("progress-text").innerHTML = "Uploaded : " + 0 / 1000000 + "/" + 0 / 1000000 + " MB";
    });
}