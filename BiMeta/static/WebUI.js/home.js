function changeSystemButton(flag){
  console.log('da vo thay doi nut')
  if (flag == 'Logined'){
      document.getElementById("link1").innerHTML="Start System";
      document.getElementById("link2").innerHTML="Start System";
      document.getElementById("link3").innerHTML="Start System";
      $(".redirectSystemButton").attr("href","system/")
  }

  else{
      document.getElementById("link1").innerHTML="Login";
      document.getElementById("link2").innerHTML="Login";
      document.getElementById("link3").innerHTML="Login";
      $(".redirectSystemButton").attr("href","login/")
  }
}

$.ajax({
  url: "/",
  type: "POST",
  data: {
      method:'checkSession'
  },
  success: function (result) {
      changeSystemButton(result)
  }
})

// var continent = document.getElementById("continent").value;

// $('#continent').change(async function(){
//     continent = $('#continent').val();
//     console.log(continent)
//     await lollipopChart(globalData,Object.values(Region[continent]));
// })

var globalData;
// async function getData() {
//     let data = (await fetch('https://api.covid19api.com/summary')).json()
//     return data;
// }
fetch('https://corona.lmao.ninja/v2/countries/vn')
  .then(response => response.json())
  .then(data => {
    globalData = data  
    // lollipopChart(data,Object.values(Region[continent]));
    lollipopChart(data);
  }
);
// getData().then(data => globalData = data).then(console.log('asdasd', globalData))

