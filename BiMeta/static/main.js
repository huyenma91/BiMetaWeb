  dataNode = document.getElementById('neatdata');
  noNode = document.getElementById('nodata');

  function listFiles(dataFiles) {
      if (dataFiles.length == 0){
          noNode.style.display="block";
          dataNode.style.display="none";
      }
      else if(dataFiles.length > 0){
          noNode.style.display="none";
          dataNode.style.display="table";
          dataNode.innerHTML = '<tr><td>No.</td><td>Your files</td><td colspan="2">Options</td></tr>';
          for (var x in dataFiles) {
          var stt = parseInt(x) +1;
          dataNode.innerHTML +='<tr><td>'+stt+': '+'</td><td>'+ dataFiles[x] + '</td><td><button type="button" class="showFileButton" id="'+dataFiles[x]+'"  onclick="removeFiles(id)">Delete</button</td><td><button type="button" class="showFileButton" choosefile="'+ dataFiles[x] +'" onclick="chooseFileForProcess(this.getAttribute('+"'choosefile'"+'))">Choose</button></td></tr>';
          }
      }
      
  }
  $(document).ready(function() {
  $.ajax({
      url: "",
      type: "POST",
      data: {
          method:'showdata'
      },
      success: function(result) {
          console.log(result)
          listFiles(result.listOfInputFile);
      }
  })
  });
  // listFiles(data);
 
  function listOutputFiles(ouputDataFiles) {
      outputdataNode = document.getElementById('outputData');
      outputdataNode.innerHTML = "";
      for (var x in ouputDataFiles) {
          outputdataNode.innerHTML +='<a href="/download/'+ouputDataFiles[x]+'">'+ouputDataFiles[x]+'</a><br>';
      }
  }
  document.getElementById("loader").style.display="none";

  $('#file').bind('change', function() {
      var fileName = '';
      fileName = $(this)[0].files[0].name;
      $('#file-selected').html(fileName);
  })
  var kmer, lofqmer, sharereads, maxcomp, numtasks, getFile = null;
  var exGraph, exFile;
  var getFileFlag = false;
  var outputFlag = false;
  var request1,request2,request3,request4;


  function getValue(event) {
      console.log("event ne: "+ event);
      kmer = document.getElementById("kmer").value;
      lofqmer = document.getElementById("lofqmer").value;
      sharereads = document.getElementById("sharereads").value;
      maxcomp = document.getElementById("maxcomp").value;
      exGraph = document.getElementById("exGraph").value;
      exFile = document.getElementById("exFile").value;
      var getFile = document.getElementById("file").files[0];
      if ((kmer!= undefined && kmer!="") && ((lofqmer!= undefined &&lofqmer!="")) && ((sharereads!= undefined &&sharereads!="")) && ((maxcomp!= undefined && maxcomp!="")) && (getFile!=undefined||getFileFlag==true)) {
          onFormSubmit(event);
          document.getElementById("startButton").disabled=true;
          $('#startButton').addClass("submit_disable");
          document.getElementById("loader").style.display="block";
          getFileFlag = false;
          request1 = $.ajax({
                      url: "",
                      type: "POST",
                      data: {
                          method:'removeFileOutput'
                      },
                      success: function(result) {
                      }
                  })
      } else if (!kmer) {
          alert('Fill kmer');
      } else if (!lofqmer) {
          alert('Fill length of Q-mer');
      } else if (!sharereads) {
          alert('Fill sharereads');
      } else if (!maxcomp) {
          alert('Fill maxcomp');
      } else if (!getFile && getFileFlag==false) {
          alert("Please upload a file");
      } else {
          // console.log(kmer)
          // console.log(lofqmer)
          // console.log(sharereads)
          // console.log(maxcomp)
          // console.log(exGraph)
          // console.log(exFile)
      }
  }
  document.getElementById("progress-text").innerHTML = "Uploaded : " + 0 / 1000000 + "/" + 0 / 1000000 + " MB";

  function onFormSubmit(event) {

      var formData = new FormData();
      var getFile1 = document.getElementById("file").files[0];
      // console.log(getFile1);
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
      console.log(http.readyState)
      http.onreadystatechange = function() { //Call a function when the state changes.
          console.log("state",http.readyState)
          console.log("http.status",http.status)
          console.log(http.response)
          if (http.readyState == 4 && http.status == 200) {
              console.log('return ne`' + http.response);
              if(http.response != null ){
                  document.getElementById("startButton").disabled=false;
                  $('#startButton').removeClass("submit_disable");
                  document.getElementById("loader").style.display="none";
                  document.getElementById("file-selected").innerHTML=""
              }
                  request2 = $.ajax({
                  url: "",
                  type: "POST",
                  data: {
                      method:'showdata'
                  },
                  success: function(result) {
                      console.log(result)
                      listFiles(result.listOfInputFile);
                      listOutputFiles(result.listOfOutputFile);
                      readyChart(result.barGraphData);
                      readyOverview(result.overviewData);
                  }
              })
          }
      }

      var params = 'method=passParamters'+'&kmer=' + kmer + '&lofqmer=' + lofqmer + '&sharereads=' + sharereads + '&maxcomp=' + maxcomp + '&exGraph=' + exGraph + '&exFile=' + exFile ;
      var xhr = new XMLHttpRequest()
      xhr.open('POST', "", true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() { //Call a function when the state changes.
          if (xhr.readyState == 4 && xhr.status == 200) {
              // alert(xhr.responseText);
              
          }
      }
      xhr.send(params);
      if (getFile1 != undefined&& getFile1!="") {
          http.send(formData);
          document.getElementById("file").value="";
      }   
      else{
          var fileChoose = null;
          fileChoose = document.getElementById("file-selected");
          console.log('fileChoose :',fileChoose);
          if (fileChoose!=null && fileChoose!=''){
              console.log("ten file: ",fileChoose.textContent)
                  request3 = $.ajax({
                  url: "",
                  type: "POST",
                  data: {
                      method:'chooseFile',
                      fileChoose: fileChoose.textContent
                  },
                  success: function(result) {
                      document.getElementById("startButton").disabled=false;
                      $('#startButton').removeClass("submit_disable");
                      document.getElementById("loader").style.display="none";
                      document.getElementById("file-selected").innerHTML="";
                      request4 = $.ajax({
                      url: "",
                      type: "POST",
                      data: {
                      method:'showdata',
                      },
                      success: function(result) {
                          listOutputFiles(result.listOfOutputFile);
                          readyChart(result.barGraphData);
                          readyOverview(result.overviewData);
                          }
                      })
                  },
              })
          }
      }
      document.getElementById("stop_button").addEventListener("click", function() {
          xhr.abort();
          http.abort();
          document.getElementById("stop-div").style["display"] = "none";
          document.getElementById("progress-div").style["display"] = "none";
          document.getElementById("progress-text").innerHTML = "Uploaded : " + 0 / 1000000 + "/" + 0 / 1000000 + " MB";
          document.getElementById("startButton").disabled=false;
          $('#startButton').removeClass("submit_disable");
          document.getElementById("loader").style.display="none";
          document.getElementById("file-selected").innerHTML=""

      });
  }
  function clearValue(){
      document.getElementById("kmer").value="";
      document.getElementById("lofqmer").value="";
      document.getElementById("sharereads").value="";
      document.getElementById("maxcomp").value="";
      document.getElementById("file").value="";
      document.getElementById("file-selected").innerHTML= "";
      getFileFlag = false; 
  }


  function removeFiles(id){
      console.log(id);
      $.ajax({
          url: "",
          type: "POST",
          data: {
              method:'removeFilename',
              removeFilename: id
          },
          success: function(result) {
              listFiles(result);
              console.log(result);
          }
      })
      
  }

  function chooseFileForProcess(filename){
      document.getElementById("file-selected").innerHTML = "";
      document.getElementById("file-selected").innerHTML =filename ;       
      getFileFlag = true; 
  }

  function downloadFileForProcess(filename){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
          if (http.readyState == 4 && http.status == 200){

          }
      }
  }

var dataGlobal;
$("#popupGraph").click(function() {
    $('#chartdiv').css('z-index', '-99999');
    $("#chartdiv").toggleClass("chartdiv toggleClass");
    console.log($("#chartdiv:animated").length)
    setTimeout(function(){console.log('asdasdas');$('#chartdiv').css('z-index', '1000');}, 100)
})
  