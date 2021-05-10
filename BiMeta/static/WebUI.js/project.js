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
                '"  onclick="removeXmlFiles(id)">Delete</button</td><td><button type="button" class="showFileButton" choosefile="' +
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
            listFiles(result.listOfXmlFile);
            // console.log('BBB')
            // console.log(result.listOfXmlFile)
        },
    });
});

function removeXmlFiles(id) {
    console.log(id);
    $.ajax({
        url: "",
        type: "POST",
        data: {
            method: "removeXmlFiles",
            removeXmlFile: id,
        },
        success: function (result) {
            dataNode.innerHTML =""
            listFiles(result);
            console.log(result);
        },
    });
}

function review(filename) {
    console.log('day la xml file :',filename)
    $.ajax({
        url: "",
        type: "POST",
        data: {
            method: "showdata",
            xml: filename,
        },
        success: function (result) {
            // console.log('day la result',result)
            // console.log('day la result.xml',result.fileXml)
            readyOverview(result.overviewData,result.fileXml);
            // console.log('day la result.xml',result.xml)
            pieChart(result.barGraphData);
        },
    });
}