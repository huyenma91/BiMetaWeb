$(".kmer").on("input", function insertKmer(evt) {
  let kmerPattern = new RegExp(/^[1-9]+[0-9]*$/);
  let kmerValue = evt.target.value;
  let ok = kmerPattern.test(kmerValue);
  console.log("kmer value :", kmerValue);
  console.log("ok :", ok);
  if (!ok) {
    evt.target.className = "kmer invalid";
    document.querySelector("#startButton").className =
      "submit_button bold submit_disable";
    document.getElementById("startButton").disabled = "true";
  } else {
    evt.target.className = "kmer";
    document.querySelector("#startButton").className = "submit_button bold";
    document.getElementById("startButton").removeAttribute("disabled");
  }
});
$(".kmer").after(
  '<div class="col error-message">Please input a positive number !</div>'
);

$(".lofqmer").on("input", function insertLofqmer(evt) {
  let lofqmerPattern = new RegExp(/^[1-9]+[0-9]*$/);
  let lofqmerValue = evt.target.value;
  let ok = lofqmerPattern.test(lofqmerValue);
  console.log("lofqmer value :", lofqmerValue);
  console.log("ok :", ok);
  if (!ok) {
    evt.target.className = "lofqmer invalid";
    document.querySelector("#startButton").className =
      "submit_button bold submit_disable";
    document.getElementById("startButton").disabled = "true";
  } else {
    evt.target.className = "lofqmer";
    document.querySelector("#startButton").className = "submit_button bold";
    document.getElementById("startButton").removeAttribute("disabled");
  }
});
$(".lofqmer").after(
  '<div class="col error-message">Please input a positive number !</div>'
);

$(".sharereads").on("input", function insertSharereads(evt) {
  let sharereadsPattern = new RegExp(/^[1-9]+[0-9]*$/);
  let sharereadsValue = evt.target.value;
  let ok = sharereadsPattern.test(sharereadsValue);
  console.log("sharereads value :", sharereadsValue);
  console.log("ok :", ok);
  if (!ok) {
    evt.target.className = "sharereads invalid";
    document.querySelector("#startButton").className =
      "submit_button bold submit_disable";
    document.getElementById("startButton").disabled = "true";
  } else {
    evt.target.className = "sharereads";
    document.querySelector("#startButton").className = "submit_button bold";
    document.getElementById("startButton").removeAttribute("disabled");
  }
});
$(".sharereads").after(
  '<div class="col error-message">Please input a positive number !</div>'
);

$(".maxcomp").on("input", function insertMaxcomp(evt) {
  let maxcompPattern = new RegExp(/^[1-9]+[0-9]*$/);
  let maxcompValue = evt.target.value;
  let ok = maxcompPattern.test(maxcompValue);
  console.log("maxcomp value :", maxcompValue);
  console.log("ok :", ok);
  if (!ok) {
    evt.target.className = "maxcomp invalid";
    document.querySelector("#startButton").className =
      "submit_button bold submit_disable";
    document.getElementById("startButton").disabled = "true";
  } else {
    evt.target.className = "maxcomp";
    document.querySelector("#startButton").className = "submit_button bold";
    document.getElementById("startButton").removeAttribute("disabled");
  }
});
$(".maxcomp").after(
  '<div class="col error-message">Please input a positive number !</div>'
);

//kNumber regex
$(".kNumber").on("input", function insertkNumber(evt) {
  let kNumberPattern = new RegExp(/^[1-9]+[0-9]*$/);
  let kNumberValue = evt.target.value;
  let ok = kNumberPattern.test(kNumberValue);
  console.log("ok :", ok);
  let kNumberFlag = $("#kOption").val();
  $("#kOption").on("change", function () {
    kNumberFlag = $("#kOption").val();
  });
  if (!ok && kNumberFlag == "Yes") {
    console.log("ok :", ok);
    evt.target.className = "kNumber invalid";
    document.querySelector("#startButton").className =
      "submit_button bold submit_disable";
    document.getElementById("startButton").disabled = "true";
  }
  //   else if (!ok && kNumberFlag == "No") {
  //     console.log("ok :", ok);
  //     evt.target.className = "kNumber";
  //     document.querySelector("#startButton").className = "submit_button bold";
  //     document.getElementById("startButton").removeAttribute("disabled");}
  else {
    console.log("ok :", ok);
    evt.target.className = "kNumber";
    document.querySelector("#startButton").className = "submit_button bold";
    document.getElementById("startButton").removeAttribute("disabled");
  }
});
$(".kNumber").after(
  '<div class="col error-message">Please input a positive number !</div>'
);

$("#kOption").on("change", function (evt) {
  kNumberFlag = $("#kOption").val();
  evt.target.className = "kNumber";
  document.querySelector("#startButton").className = "submit_button bold";
  document.getElementById("startButton").removeAttribute("disabled");
});
