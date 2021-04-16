let btn = document.getElementById("btn");
let table = document.getElementById("tbody");
let str = ``;

let getData = function () {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.covid19api.com/summary", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      //   console.log(data);
      str = `
        <td>${data.Global.NewConfirmed}</td><td>${data.Global.TotalConfirmed}</td><td>${data.Global.NewDeaths}</td>
        <td>${data.Global.TotalDeaths}</td>
        </tr>`;

      table.innerHTML = str;
      console.log(data);
      let countries = data.countries;
    } else {
      console.log("Error Occurred");
    }
  };
  xhr.send();
};
getData();

let refresh = document.getElementById("refresh");
let Refresh = () => {
  clear();
};
let clear = () => {
  str = ``;
  table.innerHTML = str;
  getData();
};
refresh.addEventListener("click", Refresh);
// country data

let cTable = document.getElementById("cbody");
/*
Country: "Zimbabwe"
CountryCode: "ZW"
Date: "2021-04-13T02:28:22.158Z"
ID: "fefdbe36-dac2-42b3-b5d7-69f1c0c7f5a8"
NewConfirmed: 19
NewDeaths: 4
NewRecovered: 28
*/
let ctr = ``;
let countryData = () => {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.covid19api.com/summary", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);

      let countries = data.Countries;
      console.log(countries);
      for (c of countries) {
        ctr += `
        <tr><td>${c.Country}</td><td>${c.NewConfirmed}</td><td>${c.NewDeaths}</td><td>${c.NewRecovered}</td><tr>`;
      }
      cTable.innerHTML = ctr;
    } else {
      console.log("Error Occurred");
    }
  };
  xhr.send();
};

countryData();
// cbtn.addEventListener("click", countryData);

let rcountry = document.getElementById("crefresh");

let Crefresh = () => {
  ctr = ``;
  cTable.innerHTML = ctr;
  countryData();
};

rcountry.addEventListener("click", Crefresh);
