import { Weather } from "../obj/Weather";
import { getStartDate, getEndDate } from "@easepick/range-plugin";
import { WeatherDetails } from "../function/fetchWeather";
import "./style.css";
import { table } from "../function/makeTable";
import { bodyContent } from "../function/loader";
import { weatherInfo } from "../function/WeatherInfo";
import { daysOfWeek } from "../function/daysOfWeek";
import { landingPage, weatherPage } from "../loader/load";
import selectize from "@selectize/selectize";
import chosen from "chosen-js"

const body = document.querySelector("body");

body.append(landingPage());

const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const landingPageDiv = document.querySelector(".landing-page-div");

searchBtn.onclick = function () {
  const location = searchBar ? searchBar.value : "";

  landingPageDiv.style.display = "none";
  body.append(weatherPage());

  const { submitBtn, countryNameField, countryOption, dateInfo, weatherOptions } =
    init();
  //countryNameField.value = location ? location : "";

  submitBtn.onclick = function (event) {
    event.preventDefault();
    let weatherValues = [];
    let dateValues = [];

    dateValues.push(dateInfo.getStartDate().format("YYYY-MM-DD"));
    dateValues.push(dateInfo.getEndDate().format("YYYY-MM-DD"));

    weatherOptions.forEach((item) => {
      weatherValues.push(item.value);
    });
    console.log(countryNameField.value);
    console.log(countryOption.value);
    console.log(dateValues);
    console.log(weatherValues);

    weatherInfo(json);
  };
};

const init = () => {
  const weatherOptionsDropdownBtn = document.querySelector('.dropdown-btn')
  const weatherDropdownList = document.querySelector('.weather-dropdown-list') 


  weatherOptionsDropdownBtn.onclick = function (event) {
    event.preventDefault()
    weatherDropdownList.classList.toggle('active-day')
  }
  // $(function () {
  //   $(".weather-options").selectize();
  //   //$('.weather-options').select2()
    
  // })
  

  //weather
  const content = {
    submitBtn : document.querySelector(".submit-button"),
    countryNameField : document.querySelector("#country-field"),
    countryOption  : document.querySelector("select"),
    weatherOptions : document.querySelectorAll(
    'input[name ="weather-options"]:checked',
    ),
    dateInfo: bodyContent().dateRangePicker("date-range")

  }
  return content
  ;
};
const json = JSON.parse(
  `{"queryCost":1,"latitude":53.7432,"longitude":-0.34565,"resolvedAddress":"Hull, England, United Kingdom","address":"hull uk","timezone":"Europe/London","tzoffset":0.0,"days":[{"datetime":"2024-01-02","datetimeEpoch":1704153600,"tempmax":48.8,"tempmin":44.7,"temp":46.9,"feelslikemax":45.9,"feelslikemin":38.7,"feelslike":42.1,"dew":44.7,"humidity":91.9,"precip":0.657,"precipprob":100.0,"precipcover":58.33,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":25.5,"windspeed":17.6,"winddir":211.3,"pressure":981.2,"cloudcover":83.5,"visibility":5.1,"solarradiation":2.0,"solarenergy":0.1,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:18:52","sunriseEpoch":1704183532,"sunset":"15:51:48","sunsetEpoch":1704210708,"moonphase":0.71,"conditions":"Rain, Partially cloudy","description":"Partly cloudy throughout the day with a chance of rain throughout the day.","icon":"rain","stations":["EGXV","D8791","EGXS","EGNJ"],"source":"comb"},{"datetime":"2024-01-03","datetimeEpoch":1704240000,"tempmax":46.1,"tempmin":41.3,"temp":43.9,"feelslikemax":43.1,"feelslikemin":37.0,"feelslike":39.8,"dew":41.9,"humidity":92.8,"precip":0.104,"precipprob":96.8,"precipcover":33.33,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":18.6,"windspeed":11.2,"winddir":239.6,"pressure":987.6,"cloudcover":80.4,"visibility":13.3,"solarradiation":10.0,"solarenergy":0.8,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:18:38","sunriseEpoch":1704269918,"sunset":"15:52:59","sunsetEpoch":1704297179,"moonphase":0.74,"conditions":"Rain, Partially cloudy","description":"Partly cloudy throughout the day with early morning rain.","icon":"rain","stations":null,"source":"fcst"},{"datetime":"2024-01-04","datetimeEpoch":1704326400,"tempmax":44.9,"tempmin":36.6,"temp":41.2,"feelslikemax":41.3,"feelslikemin":36.6,"feelslike":38.3,"dew":39.6,"humidity":94.3,"precip":0.0,"precipprob":22.6,"precipcover":0.0,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":13.6,"windspeed":8.3,"winddir":227.8,"pressure":999.1,"cloudcover":66.4,"visibility":15.0,"solarradiation":22.1,"solarenergy":1.9,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:18:20","sunriseEpoch":1704356300,"sunset":"15:54:13","sunsetEpoch":1704383653,"moonphase":0.75,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-05","datetimeEpoch":1704412800,"tempmax":38.9,"tempmin":32.3,"temp":35.9,"feelslikemax":38.9,"feelslikemin":29.1,"feelslike":34.3,"dew":35.7,"humidity":98.0,"precip":0.095,"precipprob":19.4,"precipcover":20.83,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":8.7,"windspeed":4.7,"winddir":276.0,"pressure":1004.8,"cloudcover":96.9,"visibility":15.0,"solarradiation":23.8,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:17:59","sunriseEpoch":1704442679,"sunset":"15:55:29","sunsetEpoch":1704470129,"moonphase":0.81,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-06","datetimeEpoch":1704499200,"tempmax":39.3,"tempmin":36.8,"temp":38.4,"feelslikemax":39.3,"feelslikemin":36.3,"feelslike":38.0,"dew":37.2,"humidity":95.1,"precip":0.02,"precipprob":16.1,"precipcover":16.67,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":7.2,"windspeed":4.0,"winddir":232.6,"pressure":1018.5,"cloudcover":93.2,"visibility":13.8,"solarradiation":28.1,"solarenergy":2.4,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:17:35","sunriseEpoch":1704529055,"sunset":"15:56:48","sunsetEpoch":1704556608,"moonphase":0.84,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-07","datetimeEpoch":1704585600,"tempmax":39.8,"tempmin":33.0,"temp":37.0,"feelslikemax":38.2,"feelslikemin":26.0,"feelslike":33.7,"dew":31.7,"humidity":81.6,"precip":0.004,"precipprob":25.8,"precipcover":4.17,"preciptype":["rain","snow"],"snow":0.0,"snowdepth":0.0,"windgust":22.5,"windspeed":9.7,"winddir":344.5,"pressure":1029.7,"cloudcover":51.8,"visibility":15.0,"solarradiation":47.2,"solarenergy":4.1,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:17:06","sunriseEpoch":1704615426,"sunset":"15:58:10","sunsetEpoch":1704643090,"moonphase":0.87,"conditions":"Partially cloudy","description":"Clearing in the afternoon.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-08","datetimeEpoch":1704672000,"tempmax":42.5,"tempmin":37.1,"temp":39.8,"feelslikemax":36.9,"feelslikemin":31.9,"feelslike":34.0,"dew":32.8,"humidity":75.8,"precip":0.091,"precipprob":29.0,"precipcover":20.83,"preciptype":["rain"],"snow":0.1,"snowdepth":0.0,"windgust":28.9,"windspeed":16.3,"winddir":50.8,"pressure":1036.5,"cloudcover":59.8,"visibility":15.0,"solarradiation":22.6,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:16:34","sunriseEpoch":1704701794,"sunset":"15:59:35","sunsetEpoch":1704729575,"moonphase":0.9,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"},{"datetime":"2024-01-09","datetimeEpoch":1704758400,"tempmax":41.8,"tempmin":37.1,"temp":39.7,"feelslikemax":39.4,"feelslikemin":32.9,"feelslike":36.4,"dew":32.0,"humidity":74.1,"precip":0.004,"precipprob":29.0,"precipcover":4.17,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":12.3,"windspeed":6.9,"winddir":22.5,"pressure":1038.2,"cloudcover":78.0,"visibility":15.0,"solarradiation":23.3,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:15:59","sunriseEpoch":1704788159,"sunset":"16:01:01","sunsetEpoch":1704816061,"moonphase":0.94,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-10","datetimeEpoch":1704844800,"tempmax":43.8,"tempmin":39.6,"temp":42.2,"feelslikemax":39.6,"feelslikemin":35.2,"feelslike":37.8,"dew":36.8,"humidity":81.2,"precip":0.024,"precipprob":9.7,"precipcover":20.83,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":18.6,"windspeed":8.9,"winddir":51.6,"pressure":1035.4,"cloudcover":97.9,"visibility":15.0,"solarradiation":9.6,"solarenergy":0.6,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:15:20","sunriseEpoch":1704874520,"sunset":"16:02:31","sunsetEpoch":1704902551,"moonphase":0.97,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-11","datetimeEpoch":1704931200,"tempmax":43.1,"tempmin":41.4,"temp":41.9,"feelslikemax":37.7,"feelslikemin":36.0,"feelslike":36.7,"dew":35.0,"humidity":76.4,"precip":0.012,"precipprob":6.5,"precipcover":12.5,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":17.2,"windspeed":10.1,"winddir":76.9,"pressure":1028.8,"cloudcover":100.0,"visibility":15.0,"solarradiation":12.0,"solarenergy":1.2,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:14:38","sunriseEpoch":1704960878,"sunset":"16:04:02","sunsetEpoch":1704989042,"moonphase":0.0,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-12","datetimeEpoch":1705017600,"tempmax":41.6,"tempmin":35.3,"temp":39.5,"feelslikemax":38.8,"feelslikemin":31.1,"feelslike":36.3,"dew":33.5,"humidity":79.3,"precip":0.0,"precipprob":22.6,"precipcover":0.0,"preciptype":null,"snow":0.0,"snowdepth":0.0,"windgust":9.8,"windspeed":5.4,"winddir":159.5,"pressure":1013.2,"cloudcover":92.2,"visibility":15.0,"solarradiation":36.9,"solarenergy":3.3,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:13:52","sunriseEpoch":1705047232,"sunset":"16:05:36","sunsetEpoch":1705075536,"moonphase":0.04,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-13","datetimeEpoch":1705104000,"tempmax":40.9,"tempmin":35.1,"temp":38.7,"feelslikemax":37.1,"feelslikemin":30.8,"feelslike":34.3,"dew":34.7,"humidity":85.6,"precip":0.036,"precipprob":22.6,"precipcover":16.67,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":24.8,"windspeed":15.9,"winddir":22.0,"pressure":996.7,"cloudcover":100.0,"visibility":14.9,"solarradiation":7.8,"solarenergy":0.6,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:13:03","sunriseEpoch":1705133583,"sunset":"16:07:12","sunsetEpoch":1705162032,"moonphase":0.07,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-14","datetimeEpoch":1705190400,"tempmax":40.0,"tempmin":31.7,"temp":35.5,"feelslikemax":31.7,"feelslikemin":23.0,"feelslike":27.1,"dew":27.7,"humidity":73.3,"precip":0.02,"precipprob":22.6,"precipcover":16.67,"preciptype":["rain","snow"],"snow":0.0,"snowdepth":0.0,"windgust":31.3,"windspeed":15.9,"winddir":309.4,"pressure":998.5,"cloudcover":90.1,"visibility":14.3,"solarradiation":31.5,"solarenergy":2.7,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:12:11","sunriseEpoch":1705219931,"sunset":"16:08:50","sunsetEpoch":1705248530,"moonphase":0.11,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-15","datetimeEpoch":1705276800,"tempmax":36.2,"tempmin":30.8,"temp":33.0,"feelslikemax":25.6,"feelslikemin":19.0,"feelslike":22.0,"dew":26.2,"humidity":76.4,"precip":0.198,"precipprob":29.0,"precipcover":29.17,"preciptype":["rain","snow"],"snow":0.8,"snowdepth":0.2,"windgust":41.8,"windspeed":24.6,"winddir":310.1,"pressure":1005.9,"cloudcover":69.3,"visibility":8.5,"solarradiation":35.0,"solarenergy":3.0,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:11:16","sunriseEpoch":1705306276,"sunset":"16:10:30","sunsetEpoch":1705335030,"moonphase":0.14,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"},{"datetime":"2024-01-16","datetimeEpoch":1705363200,"tempmax":34.1,"tempmin":29.2,"temp":31.8,"feelslikemax":24.9,"feelslikemin":19.7,"feelslike":21.9,"dew":26.2,"humidity":79.6,"precip":0.067,"precipprob":19.4,"precipcover":20.83,"preciptype":["rain","snow"],"snow":0.2,"snowdepth":0.7,"windgust":35.6,"windspeed":17.2,"winddir":309.1,"pressure":1013.6,"cloudcover":55.8,"visibility":13.8,"solarradiation":40.0,"solarenergy":3.5,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:10:17","sunriseEpoch":1705392617,"sunset":"16:12:11","sunsetEpoch":1705421531,"moonphase":0.18,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"}],"stations":{"EGXV":{"distance":15165.0,"latitude":53.87,"longitude":-0.43,"useCount":0,"id":"EGXV","name":"EGXV","quality":50,"contribution":0.0},"D8791":{"distance":2996.0,"latitude":53.74,"longitude":-0.391,"useCount":0,"id":"D8791","name":"DW8791 Hull UK","quality":0,"contribution":0.0},"EGXS":{"distance":43931.0,"latitude":53.48,"longitude":0.15,"useCount":0,"id":"EGXS","name":"EGXS","quality":49,"contribution":0.0},"EGNJ":{"distance":18170.0,"latitude":53.58,"longitude":-0.35,"useCount":0,"id":"EGNJ","name":"EGNJ","quality":50,"contribution":0.0}}}`,
);

/*{"queryCost":1,"latitude":53.7432,"longitude":-0.34565,"resolvedAddress":"Hull, England, United Kingdom","address":"hull uk","timezone":"Europe/London","tzoffset":0.0,"days":[{"datetime":"2024-01-02","tempmax":48.8,"tempmin":44.7,"temp":46.9,"icon":"rain"},{"datetime":"2024-01-03","tempmax":46.1,"tempmin":41.3,"temp":43.9,"icon":"rain"},{"datetime":"2024-01-04","tempmax":44.9,"tempmin":36.6,"temp":41.2,"icon":"partly-cloudy-day"},{"datetime":"2024-01-05","tempmax":38.9,"tempmin":32.3,"temp":35.9,"icon":"cloudy"},{"datetime":"2024-01-06","tempmax":39.3,"tempmin":36.8,"temp":38.4,"icon":"cloudy"},{"datetime":"2024-01-07","tempmax":39.8,"tempmin":33.0,"temp":37.0,"icon":"partly-cloudy-day"}]} */
