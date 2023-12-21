import { Weather } from "../obj/Weather";
import { WeatherDetails } from "../function/fetchWeather";
import "./style.css";
import { table } from "../function/makeTable";

const body = document.querySelector("body");
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

//console.log(weatherContent)

const tableData = table()
  .parseCSV(`address,tempmax,tempmin,temp,conditions,description
hull uk,14.1,11.7,13,"Rain, Overcast",Cloudy skies throughout the day with early morning rain.
hull uk,11.4,8.6,9.8,"Rain, Overcast",Cloudy skies throughout the day with a chance of rain.`);

const tableBody = table().createTable(tableData.data);

body.appendChild(tableBody);
//console.log(tableData.data)
