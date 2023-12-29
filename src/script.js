import { Weather } from "../obj/Weather";
import { WeatherDetails } from "../function/fetchWeather";
import "./style.css";
import { table } from "../function/makeTable";
import { bodyContent } from "../function/loader";

const body = document.querySelector("body");
body.classList.add("content");
const contentBody = document.querySelector(".content");

const contentForm = document.createElement("div");
const contentTable = document.createElement("div");

contentTable.classList.add("content-table");
contentForm.classList.add("content-form");


const info = new Weather("hull", "uk", "2023-12-24", "2023-12-25");
const elements = [
  "address",
  "temp",
  "tempmin",
  "tempmax",
  "conditions",
  "description",
];
//const weatherContent = WeatherDetails().callWeatherAPI(info, elements);

//console.log(weatherContent

const tableData = table()
  .parseCSV(`address,tempmax,tempmin,temp,conditions,description
hull uk,14.1,11.7,13,"Rain, Overcast",Cloudy skies throughout the day with early morning rain.
hull uk,11.4,8.6,9.8,"Rain, Overcast",Cloudy skies throughout the day with a chance of rain.`);

const tableBody = table().createTable(tableData.data);
contentTable.appendChild(tableBody);
contentForm.appendChild(bodyContent().render());
//body.appendChild(tableBody);
body.appendChild(contentForm);

const submitBtn = document.querySelector(".submit-button");

submitBtn.onclick = function (event) {
  event.preventDefault()
  displayTable();
  body.appendChild(contentTable);
};

function displayTable() {
  contentBody.style.gridTemplateColumns = "[start]1fr[start-end] 3fr [end]";
}
//console.log(tableData.data)
