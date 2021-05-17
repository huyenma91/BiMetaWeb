let charts = {};

$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


dataNode = document.getElementById("myTable");
noNode = document.getElementById("nodata");
function listFiles(dataFiles) {
    if (dataFiles.length == 0) {
        noNode.style.display = "block";
        // dataNode.style.display = "none";
    } else if (dataFiles.length > 0) {
        noNode.style.display = "none";
        // dataNode.style.display = "table";
        // dataNode.innerHTML =
        //     '<tr><td>No.</td><td>Your files</td><td colspan="2">Options</td></tr>';
        for (var x in dataFiles) {
            var stt = parseInt(x) + 1;
            dataNode.innerHTML +=
                "<tr><td>" +
                stt +
                ": " +
                "</td><td>" +
                dataFiles[x] +
                '</td><td><button type="button" class="showFileButton" id="' +
                dataFiles[x] +
                '"  onclick="removeJsonFiles(id)">Delete</button</td><td><button type="button" class="showFileButton" choosefile="' +
                dataFiles[x] +
                '" onclick="review(this.getAttribute(' +"'choosefile'" +'))">Show</button></td></tr>';
        }
    }
}

$(document).ready(function () {
    $.ajax({
        url: "",
        type: "POST",
        data: {
            method: "showdata",
        },
        success: function (result) {
            listFiles(result.listOfJsonFile);
        },
    });
});

function removeJsonFiles(id) {
    console.log(id);
    $.ajax({
        url: "",
        type: "POST",
        data: {
            method: "removeJsonFiles",
            removeJsonFile: id,
        },
        success: function (result) {
            dataNode.innerHTML =""
            listFiles(result);
            console.log(result);
        },
    });
}

function review(filename) {
    $.ajax({
        url: "",
        type: "POST",
        data: {
            method: "showdata",
            json: filename,
        },
        success: function (result) {
            readyOverview(result.overviewData,result.fileJson,result.params,result.time);
            paramtable(result.params)
            let keys = Object.keys(charts);
            for (let i = 0; i < keys.length; i++ ) {
                if (charts[keys[i]]) charts[keys[i]].dispose();
            }
            charts['eval'] = evalChart(result.fmeasure,result.recall,result.precision)
            charts['ready'] = readyChart(result.barGraphData);
            charts['pie'] = pieChart(result.barGraphData);
        },
    });
}