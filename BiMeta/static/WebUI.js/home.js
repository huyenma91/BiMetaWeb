var continent = document.getElementById("continent").value;
console.log(continent)

$('#continent').change( async function(){
    continent = $('#continent').val();
    console.log(continent)
    await lollipopChart(globalData,Object.values(Region[continent]));
})

console.log("region :",Region[continent])

var globalData;
// async function getData() {
//     let data = (await fetch('https://api.covid19api.com/summary')).json()
//     return data;
// }
fetch('https://api.covid19api.com/summary')
  .then(response => response.json())
  .then(data => {
    globalData = data  
    lollipopChart(data,Object.values(Region[continent]));
  }
);
// getData().then(data => globalData = data).then(console.log('asdasd', globalData))


console.log('asdasd', globalData)
