/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/img sync \\.(png)$":
/*!************************************************!*\
  !*** ./assets/img/ sync nonrecursive \.(png)$ ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./clear-day.png": "./assets/img/clear-day.png",
	"./clear-night.png": "./assets/img/clear-night.png",
	"./cloudy.png": "./assets/img/cloudy.png",
	"./fog.png": "./assets/img/fog.png",
	"./hail.png": "./assets/img/hail.png",
	"./partly-cloudy-day.png": "./assets/img/partly-cloudy-day.png",
	"./partly-cloudy-night.png": "./assets/img/partly-cloudy-night.png",
	"./rain-snow-showers-day.png": "./assets/img/rain-snow-showers-day.png",
	"./rain-snow-showers-night.png": "./assets/img/rain-snow-showers-night.png",
	"./rain-snow.png": "./assets/img/rain-snow.png",
	"./rain.png": "./assets/img/rain.png",
	"./showers-day.png": "./assets/img/showers-day.png",
	"./showers-night.png": "./assets/img/showers-night.png",
	"./sleet.png": "./assets/img/sleet.png",
	"./snow-showers-day.png": "./assets/img/snow-showers-day.png",
	"./snow-showers-night.png": "./assets/img/snow-showers-night.png",
	"./snow.png": "./assets/img/snow.png",
	"./thunder-rain.png": "./assets/img/thunder-rain.png",
	"./thunder-showers-day.png": "./assets/img/thunder-showers-day.png",
	"./thunder-showers-night.png": "./assets/img/thunder-showers-night.png",
	"./thunder.png": "./assets/img/thunder.png",
	"./wind.png": "./assets/img/wind.png"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./assets/img sync \\.(png)$";

/***/ }),

/***/ "./function/WeatherInfo.js":
/*!*********************************!*\
  !*** ./function/WeatherInfo.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   weatherInfo: () => (/* binding */ weatherInfo)
/* harmony export */ });
/* harmony import */ var _daysOfWeek__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./daysOfWeek */ "./function/daysOfWeek.js");


const weatherInfo = (info) => {
  const contentWeatherInfo = document.querySelector(".content-weather-info");
  const content = document.querySelector(".content");

  const weekdays = getDaysOfWeek(info.days);
  render(weekdays);
  (0,_daysOfWeek__WEBPACK_IMPORTED_MODULE_0__.daysOfWeek)().createDays(info);


  let active = document.querySelector(".active");
  const days = document.querySelectorAll(".day");
  let activeDay = document.querySelector('.active-day')
  const weekdayBtn = document.querySelectorAll('.weekday-btn')
  const dayContentExtra = activeDay.querySelector('.day-content-extra')
  const viewMoreBtn = document.querySelector('.view-more-btn')

  if (viewMoreBtn /*&& dayContentExtra*/) {
    viewMoreBtn.onclick = function () {
      console.log(dayContentExtra)
      if (dayContentExtra.style.display.includes('none')) {
        dayContentExtra.style.display = 'block' 
      }
    }
  }

  weekdayBtn.forEach(btn => {
    btn.onclick = function (event) {
      switchActive(event)
      showWeatherInfo(event)
    }
  })

  function getDaysOfWeek(elements) {
    let days = [];
    const dOfw = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    elements.forEach((item) => {
      const date = new Date(item.datetime).getDay();
      days.push(dOfw[date]);
    });
    return days;
  }

  function render(array) {
    try {
      if (contentWeatherInfo && contentWeatherInfo.hasChildNodes()) {
        contentWeatherInfo.replaceChildren();
      }
      const elements = getDaysOfWeek(array);
      const daysDiv = document.createElement("div");
      daysDiv.classList.add("weekday-div");

      for (let i = 0; i < array.length; i++) {
        const dayBtn = document.createElement("button");
        dayBtn.textContent = `${array[i]}`;
        dayBtn.classList.add("weekday-btn");
        dayBtn.dataset.key = i;
        // dayBtn.onclick = function (event) {
        //   switchActive(event);
        // };
        //console.day
        if (i === 0) {
          dayBtn.classList.add("active");
          //showWeatherInfo(dayBtn)
        }
        daysDiv.appendChild(dayBtn);
      }

      if (contentWeatherInfo) {
        contentWeatherInfo.append(daysDiv);
      } else {
        const weatherContentInfo = document.createElement("div");
        weatherContentInfo.classList.add("content-weather-info");

        weatherContentInfo.appendChild(daysDiv);
        content.appendChild(weatherContentInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function switchActive(event) {
    if (event.target.classList.contains("active")) {
    } else {
      active.classList.remove("active");
      event.target.classList.add("active");
      active = event.target;
      //showWeatherInfo(active)
    }
  }

   function showWeatherInfo(element) {
     const keyNo = element.target.dataset.key;
     if (keyNo !== activeDay.dataset.tag) {
       days.forEach((item) => {
         if (item.dataset.tag === keyNo) {
           activeDay.classList.remove('active-day')
           item.classList.add('active-day')
           activeDay = item
         }
       });
     }
     
    
  }
};


/***/ }),

/***/ "./function/daysOfWeek.js":
/*!********************************!*\
  !*** ./function/daysOfWeek.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   daysOfWeek: () => (/* binding */ daysOfWeek)
/* harmony export */ });
const daysOfWeek = () => {
  const contentWeatherInfo = document.querySelector(".content-weather-info");

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(__webpack_require__("./assets/img sync \\.(png)$"));

  function createDays(weatherInfo) {
    const daysContentDiv = document.createElement("div");
    const locationHeader = document.createElement("h2");
    locationHeader.textContent = weatherInfo.resolvedAddress;
    daysContentDiv.classList.add('weekday-weather')
    daysContentDiv.appendChild(locationHeader);
    const dayContent = document.createElement('div')
    dayContent.classList.add('weekday-weather-content')
    const days = weatherInfo.days;
    for (let i = 0; i < days.length; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add('day')
      dayInfo(days[i], dayDiv);
      dayDiv.dataset.tag = i;
      if (i ===0) {
        dayDiv.classList.add('active-day')
      }
      dayContent.appendChild(dayDiv);
    }
    daysContentDiv.appendChild(dayContent)
    contentWeatherInfo.appendChild(daysContentDiv);
  }

  function dayInfo(day, div) {
    const headDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const dateTime = document.createElement("h3");
    dateTime.textContent = day.datetime;
    delete day.datetime;
    const temp = document.createElement("h1");
    temp.textContent = day.temp;
    delete day.temp;
    const icon = document.createElement("img");
    icon.src = images[`${day.icon}.png`];
    delete day.icon;
    contentDiv.classList.add('day-content-items')
    contentDiv.append(temp, icon);
    headDiv.append(dateTime, contentDiv);
    headDiv.classList.add('day-content')
    div.append(headDiv);
    if (day) {
      const viewMoreBtn = document.createElement("button");
      viewMoreBtn.classList.add('view-more-btn')
      viewMoreBtn.textContent = "View More";
      const moreDiv = document.createElement("div");
      moreDiv.classList.add('day-content-extra')
      Object.entries(day).forEach(([key, value]) => {
        const extra = document.createElement("h3");
        extra.textContent = `${key}: ${value}`;

        moreDiv.appendChild(extra);
      });
      headDiv.append(viewMoreBtn);
      div.append(moreDiv);
    }
  }

  return { createDays };
};


/***/ }),

/***/ "./function/fetchWeather.js":
/*!**********************************!*\
  !*** ./function/fetchWeather.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WeatherDetails: () => (/* binding */ WeatherDetails)
/* harmony export */ });
/* harmony import */ var _obj_Weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../obj/Weather */ "./obj/Weather.js");


const WeatherDetails = () => {
  function buildApiURL(weatherInfo, elements) {
    let urlEnd = `&include=days&key=GGLYE6F842M6SC4GVHVXRZF4R&contentType=json`;
    let mainUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherInfo.getCity()}%20${weatherInfo.getCountry()}/${weatherInfo.getStartDate()}`;

    mainUrl = weatherInfo.getEndDate()
      ? `${mainUrl}/${weatherInfo.getEndDate()}?`
      : `${mainUrl}?`;

    mainUrl += `unitGroup=metric&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cicon`;

    let newUrl = elements
      ? addElements(`${mainUrl}%2`, elements)
      : `${mainUrl}&`;

    return `${newUrl}${urlEnd}`;
  }
  async function callWeatherAPI(info, elements) {
    try {
      const url = await buildApiURL(info, elements);
      //return url;
      const response = await fetch(url);
      if (response.status === 200) return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  }

  function addElements(string, elements) {
    for (let i = 0; i < elements.length; i++) {
      if (i !== elements.length - 1) {
        string += `${elements[i]}%2C`;
      } else {
        string += `${elements[i]}`;
      }
    }
    return string;
  }

  return { callWeatherAPI };
};

//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hull%20uk?unitGroup=us&include=days&key=BNAX2GBUEDF9XCU6E74SU4T36&contentType=csv


/***/ }),

/***/ "./function/loader.js":
/*!****************************!*\
  !*** ./function/loader.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bodyContent: () => (/* binding */ bodyContent)
/* harmony export */ });
const bodyContent = () => {
  function render() {
    const formDetails = document.createElement("form");
    const formDiv = document.createElement("div");
    formDiv.classList.add("form-div");
    const formTextBox = document.createElement("input");
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.classList.add("submit-button");
    submitBtn.onclick = function (event) {
      event.preventDefault();
    };
    formTextBox.setAttribute("type", "text");
    formTextBox.setAttribute("placeholder", "Enter Location Here");
    formTextBox.setAttribute("id", "country-field");
    formDiv.appendChild(formTextBox);
    formDiv.appendChild(createCountryDropDown());
    formDetails.appendChild(formDiv);
    formDetails.appendChild(createDates());
    formDetails.appendChild(createWeatherOptions());
    formDetails.appendChild(submitBtn);

    return formDetails;
  }

  function createDates() {
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date-div");
    const startDate = document.createElement("input");
    const endDate = document.createElement("input");

    startDate.setAttribute("name", "start-date");
    startDate.setAttribute("type", "date");
    startDate.setAttribute(
      "min",
      `${new Date().toISOString().substring(0, 10)}`,
    );
    startDate.value = new Date().toISOString().substring(0, 10);
    new Date().toISOString().substring(0, 10);
    startDate.required = true

    endDate.setAttribute("type", "date");
    endDate.setAttribute('placeholder', 'Select End Date')
    endDate.setAttribute("name", "end-date");
    startDate.onchange = function () {
      endDate.setAttribute("min", startDate.value);
    };

    dateDiv.appendChild(startDate);
    dateDiv.appendChild(endDate);

    return dateDiv;
  }

  function createCountryDropDown() {
    const dropDownDiv = document.createElement("div");
    const countryCode = [
      { country: "United Kingdom", code: "GB" },
      { country: "Australia", code: "AU" },
      { country: "Canada", code: "CA" },
      { country: "Nigeria", code: "NG" },
      { country: "Germany", code: "DE" },
      { country: "United States of America", code: "US" },
      { country: "South Africa", code: "ZA" },
    ];

    const sortedListed = countryCode.sort((a, b) => {
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      return 0;
    });

    sortedListed.unshift({ country: "Select Country", code: "" },)
    
    const dropDown = document.createElement("select");
    const dropDownName = document.createElement("optgroup");
    //dropDownName.label = "Select Country";
    //dropDown.appendChild(dropDownName);

    sortedListed.forEach((item) => {
      const dropdownItem = document.createElement("option");
      dropdownItem.value = item.code;
      dropdownItem.textContent = item.country;
      if (item.country === 'Select Country') {
        dropdownItem.selected = true
        //dropdownItem.disabled = true
      }

      dropDown.appendChild(dropdownItem);
    });

    dropDownDiv.appendChild(dropDown);
    return dropDownDiv;
  }

  function createWeatherOptions() {
    const weatherHeader = document.createElement("legend");
    weatherHeader.textContent = "Choose the Weather Details:";

    const weatherOptions = document.createElement("div");

    const weatherOptionsDiv = document.createElement('div')
    weatherOptionsDiv.classList.add('weather-options-div')

    weatherOptions.appendChild(weatherHeader);
    const defaultWeatherOptions = [
      // "address",
      // "temp",
      // "tempmin",
      // "tempmax",
      // "conditions",
      // "description",
    ];

    defaultWeatherOptions.forEach((item) => {

      const div = document.createElement('div')
      const optionsLabel = document.createElement("label");

      optionsLabel.setAttribute("for", item);
      const optionInput = document.createElement("input");
      optionInput.setAttribute("type", "checkbox");
      optionInput.setAttribute("name", "weather-options");
      optionInput.setAttribute("value", `${item}`);
      optionInput.checked = true;
      //optionsLabel.appendChild(optionInput);
      optionsLabel.textContent = capitalizeFirstLetter(item);

      optionsLabel.onclick = selectItem
      div.appendChild(optionInput);
      div.appendChild(optionsLabel)

      weatherOptionsDiv.appendChild(div)
    });
    const weatherOptionsOther = [
      "feelslikemax",
      "feelslikemin",
      "windgust",
      "windspeed",
      "winddir",
    ];

    weatherOptionsOther.forEach((item) => {
      const optionsLabel = document.createElement("label");
      const div = document.createElement("div");
      optionsLabel.setAttribute("for", item);
      const optionInput = document.createElement("input");
      optionInput.setAttribute("type", "checkbox");
      optionInput.setAttribute("name", "weather-options");
      optionInput.setAttribute("value", `${item}`);

      //optionsLabel.appendChild(optionInput);
      optionsLabel.textContent = capitalizeFirstLetter(item);

      optionsLabel.onclick = selectItem
      div.appendChild(optionInput);
      div.appendChild(optionsLabel);

      weatherOptionsDiv.appendChild(div)
    });

    weatherOptions.appendChild(weatherOptionsDiv)

    return weatherOptions;
  }

  // function create

  function capitalizeFirstLetter(word) {
    return word.replace(`${word[0]}`, `${word[0].toUpperCase()}`);
  }

  function selectItem(event) {
    let siblingCheckBox = event.target.previousElementSibling

    if (siblingCheckBox.checked) {
      siblingCheckBox.checked = false;
    }
    else {
      siblingCheckBox.checked = true
    }
  }

  return { render };
};


/***/ }),

/***/ "./function/makeTable.js":
/*!*******************************!*\
  !*** ./function/makeTable.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   table: () => (/* binding */ table)
/* harmony export */ });
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_0__);


const table = () => {
    const config = {
      delimiter: "", // auto-detect
      newline: "", // auto-detect
      quoteChar: '"',
      escapeChar: '"',
      header: false,
      transformHeader: undefined,
      dynamicTyping: false,
      preview: 0,
      encoding: "",
      worker: false,
      comments: false,
      step: undefined,
      complete: undefined,
      error: undefined,
      download: false,
      downloadRequestHeaders: undefined,
      downloadRequestBody: undefined,
      skipEmptyLines: false,
      chunk: undefined,
      chunkSize: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined,
      transform: undefined,
      delimitersToGuess: [",", "\t", "|", ";", (papaparse__WEBPACK_IMPORTED_MODULE_0___default().RECORD_SEP), (papaparse__WEBPACK_IMPORTED_MODULE_0___default().UNIT_SEP)],
      skipFirstNLines: 0,
    };
    function parseCSV(item) {
      return papaparse__WEBPACK_IMPORTED_MODULE_0___default().parse(item, config)
  }
    function createTable(tableItem) {
        let table = document.createElement('table');
        let tableHead = document.createElement('thead');
        let tableBody = document.createElement('tbody');

        let tableHeaderRow = document.createElement('tr');
        tableItem[0].forEach(item => {
            let theaderRowItem = document.createElement('th')
            let theaderRowText = document.createTextNode(`${item}`)

            theaderRowItem.appendChild(theaderRowText);
            tableHeaderRow.appendChild(theaderRowItem);
        })

        tableHead.appendChild(tableHeaderRow);

        for (let i = 1; i < tableItem.length; i++){
            let tableRow = document.createElement('tr');

            for (let x = 0; x < tableItem[i].length; x++){
                let tableData = document.createElement('td');
                tableData.textContent = tableItem[i][x];

                tableRow.appendChild(tableData)
            } 
            tableBody.appendChild(tableRow)
        }
        table.appendChild(tableHead)
        table.appendChild(tableBody)

        return table;
    }
    
    return {
        parseCSV,
        createTable
    }
};

const contentBody = () => {
    
    
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
*{
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    background: none;
    font-family: Arial, Helvetica, sans-serif;

}

*> button{
    cursor: pointer;
}
body{
    background-color: aqua;
    display: flex;
    align-items: center;
    height: 100vh;
}

.content{
    height: 70%;
    width: 90%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center;     */
    background-color: #efefef;
}

.content-form{
    margin: 20px 8px;
    padding: 10px;
    border-bottom: 5px solid #cccccc;
    /* display: flex; */
}

form {
    margin: 0 auto;
    width: 90%;
    display: flex;
    
    text-align: center;
    align-content: center;
    align-items: center;
    gap: 15px;
}

.form-div, .date-div{
    display: flex;
    gap: 15px;
    margin: 0 auto;
    justify-content: center;
    align-self:flex-start ;
    flex-wrap: wrap;
}

.form-div{
    flex-direction: column;
    align-items: flex-start;
}

.form-div input, .form-div select{
    width: 90%;
}

.form-div input, .form-div select, .date-div input{
    font-size: 1.65em;
    border-radius: 10px;
    text-align: center;
    padding: 8px;
}

/* select option[disabled]:first-child {
    display: none;
} */

legend, .weather-options-div div label{
    font-size: 1.55em;
}
.form-div select{
    width: fit-content;
    background-color: #efefef;
    
}


.weather-options-div{
    display: flex;
    flex-wrap: wrap;
    gap:8px;
}


.weather-options-div div{
    display: flex;
    gap: 5px;
}
.submit-button{
    padding: 10px 22px;
    border-radius: 10px;
    font-size: 1.5em;
    background-color: cornflowerblue;
    color: white;
    border: 0;
    width: fit-content;
    height: fit-content;
    
}
.content-weather-info{
    width: 100%;
    /* margin: 20px 8px; */
    flex: 1;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
}

.weekday-div{
    margin: 15px auto;
    width: 80%;
    gap: 5px;
    display: grid;
    grid-auto-columns: 1fr;
    /* display: flex;
    justify-content: space-evenly; */
}

.weekday-btn{
    padding: 8px 15px;
    grid-row: 1;
    color:cornflowerblue ;
    border-radius: 10px;
    border: 2px solid cornflowerblue;
    font-weight: 800;
    font-size: 1.80em;
}

.active, .weekday-btn:hover{
    color: white;
    background-color: cornflowerblue;
}

.weekday-weather{
    text-align: center;
    font-weight: lighter;
    margin: 5px 5px;
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
}
.weekday-weather > h2{
    margin: 20px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 2em;
}

.weekday-weather-content{
    display: flex;
    margin: 20px 0;
    justify-content: center;
    width: 100%;
}

.day{
    display: none;
    width: 80%;
}
.active-day{
    display: block;
    
}
.day-content, .day-content-items{
    display: flex;
    align-items: center;
}

.day-content{
    justify-content: space-between;
}

.day-content h3{
    font-size: 1.70em;
}

.day-content-items img{
    width: 5em;
    height: 5em;
}

.day-content-items> h1{
    font-size: 4em;
}

.day-content-items > h1::after{
    content: "\\00B0"
}

.view-more-btn{
    border: 0;
    font-weight: 300
}

.view-more-btn::after{
    content: " +";
    font-size: larger;
    font-weight: 600;
}

.view-more-btn:hover{
    text-decoration: underline;
}

.day-content-extra{
    display: none;
}

.active-extra-content{
    display: block;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":";AACA;IACI,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,sBAAsB;IACtB,gBAAgB;IAChB,yCAAyC;;AAE7C;;AAEA;IACI,eAAe;AACnB;AACA;IACI,sBAAsB;IACtB,aAAa;IACb,mBAAmB;IACnB,aAAa;AACjB;;AAEA;IACI,WAAW;IACX,UAAU;IACV,iBAAiB;IACjB,aAAa;IACb,sBAAsB;IACtB,6BAA6B;IAC7B,6BAA6B;IAC7B,yBAAyB;AAC7B;;AAEA;IACI,gBAAgB;IAChB,aAAa;IACb,gCAAgC;IAChC,mBAAmB;AACvB;;AAEA;IACI,cAAc;IACd,UAAU;IACV,aAAa;;IAEb,kBAAkB;IAClB,qBAAqB;IACrB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,SAAS;IACT,cAAc;IACd,uBAAuB;IACvB,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,sBAAsB;IACtB,uBAAuB;AAC3B;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,kBAAkB;IAClB,YAAY;AAChB;;AAEA;;GAEG;;AAEH;IACI,iBAAiB;AACrB;AACA;IACI,kBAAkB;IAClB,yBAAyB;;AAE7B;;;AAGA;IACI,aAAa;IACb,eAAe;IACf,OAAO;AACX;;;AAGA;IACI,aAAa;IACb,QAAQ;AACZ;AACA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,gBAAgB;IAChB,gCAAgC;IAChC,YAAY;IACZ,SAAS;IACT,kBAAkB;IAClB,mBAAmB;;AAEvB;AACA;IACI,WAAW;IACX,sBAAsB;IACtB,OAAO;IACP,aAAa;IACb,sBAAsB;IACtB,mCAAmC;AACvC;;AAEA;IACI,iBAAiB;IACjB,UAAU;IACV,QAAQ;IACR,aAAa;IACb,sBAAsB;IACtB;oCACgC;AACpC;;AAEA;IACI,iBAAiB;IACjB,WAAW;IACX,qBAAqB;IACrB,mBAAmB;IACnB,gCAAgC;IAChC,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,YAAY;IACZ,gCAAgC;AACpC;;AAEA;IACI,kBAAkB;IAClB,oBAAoB;IACpB,eAAe;IACf,aAAa;IACb,OAAO;IACP,aAAa;IACb,sBAAsB;IACtB,6BAA6B;AACjC;AACA;IACI,cAAc;IACd,aAAa;IACb,uBAAuB;IACvB,eAAe;IACf,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,cAAc;IACd,uBAAuB;IACvB,WAAW;AACf;;AAEA;IACI,aAAa;IACb,UAAU;AACd;AACA;IACI,cAAc;;AAElB;AACA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,UAAU;IACV,WAAW;AACf;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI;AACJ;;AAEA;IACI,SAAS;IACT;AACJ;;AAEA;IACI,aAAa;IACb,iBAAiB;IACjB,gBAAgB;AACpB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,cAAc;AAClB","sourcesContent":["\n*{\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    box-sizing: border-box;\n    background: none;\n    font-family: Arial, Helvetica, sans-serif;\n\n}\n\n*> button{\n    cursor: pointer;\n}\nbody{\n    background-color: aqua;\n    display: flex;\n    align-items: center;\n    height: 100vh;\n}\n\n.content{\n    height: 70%;\n    width: 90%;\n    margin: 10px auto;\n    display: flex;\n    flex-direction: column;\n    /* justify-content: center; */\n    /* align-items: center;     */\n    background-color: #efefef;\n}\n\n.content-form{\n    margin: 20px 8px;\n    padding: 10px;\n    border-bottom: 5px solid #cccccc;\n    /* display: flex; */\n}\n\nform {\n    margin: 0 auto;\n    width: 90%;\n    display: flex;\n    \n    text-align: center;\n    align-content: center;\n    align-items: center;\n    gap: 15px;\n}\n\n.form-div, .date-div{\n    display: flex;\n    gap: 15px;\n    margin: 0 auto;\n    justify-content: center;\n    align-self:flex-start ;\n    flex-wrap: wrap;\n}\n\n.form-div{\n    flex-direction: column;\n    align-items: flex-start;\n}\n\n.form-div input, .form-div select{\n    width: 90%;\n}\n\n.form-div input, .form-div select, .date-div input{\n    font-size: 1.65em;\n    border-radius: 10px;\n    text-align: center;\n    padding: 8px;\n}\n\n/* select option[disabled]:first-child {\n    display: none;\n} */\n\nlegend, .weather-options-div div label{\n    font-size: 1.55em;\n}\n.form-div select{\n    width: fit-content;\n    background-color: #efefef;\n    \n}\n\n\n.weather-options-div{\n    display: flex;\n    flex-wrap: wrap;\n    gap:8px;\n}\n\n\n.weather-options-div div{\n    display: flex;\n    gap: 5px;\n}\n.submit-button{\n    padding: 10px 22px;\n    border-radius: 10px;\n    font-size: 1.5em;\n    background-color: cornflowerblue;\n    color: white;\n    border: 0;\n    width: fit-content;\n    height: fit-content;\n    \n}\n.content-weather-info{\n    width: 100%;\n    /* margin: 20px 8px; */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    /* justify-content: space-evenly; */\n}\n\n.weekday-div{\n    margin: 15px auto;\n    width: 80%;\n    gap: 5px;\n    display: grid;\n    grid-auto-columns: 1fr;\n    /* display: flex;\n    justify-content: space-evenly; */\n}\n\n.weekday-btn{\n    padding: 8px 15px;\n    grid-row: 1;\n    color:cornflowerblue ;\n    border-radius: 10px;\n    border: 2px solid cornflowerblue;\n    font-weight: 800;\n    font-size: 1.80em;\n}\n\n.active, .weekday-btn:hover{\n    color: white;\n    background-color: cornflowerblue;\n}\n\n.weekday-weather{\n    text-align: center;\n    font-weight: lighter;\n    margin: 5px 5px;\n    padding: 10px;\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    /* justify-content: center; */\n}\n.weekday-weather > h2{\n    margin: 20px 0;\n    display: flex;\n    justify-content: center;\n    flex-wrap: wrap;\n    font-size: 2em;\n}\n\n.weekday-weather-content{\n    display: flex;\n    margin: 20px 0;\n    justify-content: center;\n    width: 100%;\n}\n\n.day{\n    display: none;\n    width: 80%;\n}\n.active-day{\n    display: block;\n    \n}\n.day-content, .day-content-items{\n    display: flex;\n    align-items: center;\n}\n\n.day-content{\n    justify-content: space-between;\n}\n\n.day-content h3{\n    font-size: 1.70em;\n}\n\n.day-content-items img{\n    width: 5em;\n    height: 5em;\n}\n\n.day-content-items> h1{\n    font-size: 4em;\n}\n\n.day-content-items > h1::after{\n    content: \"\\00B0\"\n}\n\n.view-more-btn{\n    border: 0;\n    font-weight: 300\n}\n\n.view-more-btn::after{\n    content: \" +\";\n    font-size: larger;\n    font-weight: 600;\n}\n\n.view-more-btn:hover{\n    text-decoration: underline;\n}\n\n.day-content-extra{\n    display: none;\n}\n\n.active-extra-content{\n    display: block;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/papaparse/papaparse.min.js":
/*!*************************************************!*\
  !*** ./node_modules/papaparse/papaparse.min.js ***!
  \*************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/
!function(e,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(this,function s(){"use strict";var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=f.IS_PAPA_WORKER||!1,a={},u=0,b={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;J(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!J(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var i=function(){if(!b.WORKERS_SUPPORTED)return!1;var e=(r=f.URL||f.webkitURL||null,i=s.toString(),b.BLOB_URL||(b.BLOB_URL=r.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",i,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var r,i;return t.onmessage=_,t.id=u++,a[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=J(t.step),t.chunk=J(t.chunk),t.complete=J(t.complete),t.error=J(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?(e=function(e){if(65279===e.charCodeAt(0))return e.slice(1);return e}(e),n=t.download?new l(t):new p(t)):!0===e.readable&&J(e.read)&&J(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,r=!1,i=null,o=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(_=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");i=t.columns}void 0!==t.escapeChar&&(a=t.escapeChar+s);("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(o=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}();var u=new RegExp(Q(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return h(null,e,r);if("object"==typeof e[0])return h(i||Object.keys(e[0]),e,r)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||i),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),h(e.fields||[],e.data||[],r);throw new Error("Unable to serialize unrecognized input");function h(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y)}for(var o=0;o<t.length;o++){var u=n?e.length:t[o].length,h=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(h="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<u;l++){var c=s?e[l]:l;d.push(t[o][c])}h=""===d.join("").trim()}if(!h){for(var p=0;p<u;p++){0<p&&!f&&(i+=m);var g=n&&s?e[p]:p;i+=v(t[o][g],p)}o<t.length-1&&(!r||0<u&&!f)&&(i+=y)}}return i}function v(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var r=!1;o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=!0);var i=e.toString().replace(u,a);return(r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=E,b.ParserHandle=r,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},u=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)u.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)})}),e(),this;function e(){if(0!==u.length){var e,t,r,i,n=u[0];if(J(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(J(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void h();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void h()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){J(a)&&a(e,n.file,n.inputElem),h()},b.parse(n.file,n.instanceConfig)}else J(o.complete)&&o.complete()}function h(){u.splice(0,1),e()}}}function h(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&J(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r)}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(J(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!J(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){J(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1})}}function l(e){var i;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),h.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r)}try{i.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}n&&0===i.status&&this._chunkError()}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:i.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t))}}function c(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),h.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(i.error)}}function p(e){var r;h.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=r.substring(0,t),r=r.substring(t)):(e=r,r=""),this._finished=!r,this.parseChunk(e)}}}function g(e){h.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=v(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=v(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=v(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=v(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function r(m){var a,o,u,i=Math.pow(2,53),n=-i,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,h=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,t=this,r=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(J(m.step)){var p=m.step;m.step=function(e){if(c=e,_())g();else{if(g(),0===c.data.length)return;r+=e.data.length,m.preview&&r>m.preview?o.abort():(c.data=c.data[0],p(c,t))}}}function y(e){return"greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){return c&&u&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),u=!1),m.skipEmptyLines&&(c.data=c.data.filter(function(e){return!y(e)})),_()&&function(){if(!c)return;function e(e,t){J(m.transformHeader)&&(e=m.transformHeader(e,t)),l.push(e)}if(Array.isArray(c.data[0])){for(var t=0;_()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1)}else c.data.forEach(e)}(),function(){if(!c||!m.header&&!m.dynamicTyping&&!m.transform)return c;function e(e,t){var r,i=m.header?{}:[];for(r=0;r<e.length;r++){var n=r,s=e[r];m.header&&(n=r>=l.length?"__parsed_extra":l[r]),m.transform&&(s=m.transform(s,n)),s=v(n,s),"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s}return m.header&&(r>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+r,f+t):r<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+r,f+t)),i}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);m.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function _(){return m.header&&0===l.length}function v(e,t){return r=e,m.dynamicTypingFunction&&void 0===m.dynamicTyping[r]&&(m.dynamicTyping[r]=m.dynamicTypingFunction(r)),!0===(m.dynamicTyping[r]||m.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<i)return!0}return!1}(t)?parseFloat(t):h.test(t)?new Date(t):""===t?null:t):t;var r}function k(e,t,r,i){var n={type:e,code:t,message:r};void 0!==i&&(n.row=i),c.errors.push(n)}this.parse=function(e,t,r){var i=m.quoteChar||'"';if(m.newline||(m.newline=function(e,t){e=e.substring(0,1048576);var r=new RegExp(Q(t)+"([^]*?)"+Q(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),u=!1,m.delimiter)J(m.delimiter)&&(m.delimiter=m.delimiter(e),c.meta.delimiter=m.delimiter);else{var n=function(e,t,r,i,n){var s,a,o,u;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var h=0;h<n.length;h++){var f=n[h],d=0,l=0,c=0;o=void 0;for(var p=new E({comments:i,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(r&&y(p.data[g]))c++;else{var _=p.data[g].length;l+=_,void 0!==o?0<_&&(d+=Math.abs(_-o),o=_):o=_}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===u||u<l)&&1.99<l&&(a=d,s=f,u=l)}return{successful:!!(m.delimiter=s),bestDelimiter:s}}(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess);n.successful?m.delimiter=n.bestDelimiter:(u=!0,m.delimiter=b.DefaultDelimiter),c.meta.delimiter=m.delimiter}var s=w(m);return m.preview&&m.header&&s.preview++,a=e,o=new E(s),c=o.parse(a,t,r),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=J(m.chunk)?"":a.substring(o.getCharIndex())},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(t.resume,3)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,J(m.complete)&&m.complete(c),a=""}}function Q(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(j){var z,M=(j=j||{}).delimiter,P=j.newline,U=j.comments,q=j.step,N=j.preview,B=j.fastMode,K=z=void 0===j.quoteChar||null===j.quoteChar?'"':j.quoteChar;if(void 0!==j.escapeChar&&(K=j.escapeChar),("string"!=typeof M||-1<b.BAD_DELIMITERS.indexOf(M))&&(M=","),U===M)throw new Error("Comment character same as delimiter");!0===U?U="#":("string"!=typeof U||-1<b.BAD_DELIMITERS.indexOf(U))&&(U=!1),"\n"!==P&&"\r"!==P&&"\r\n"!==P&&(P="\n");var W=0,H=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=M.length,s=P.length,a=U.length,o=J(q),u=[],h=[],f=[],d=W=0;if(!i)return L();if(j.header&&!t){var l=i.split(P)[0].split(M),c=[],p={},g=!1;for(var _ in l){var m=l[_];J(j.transformHeader)&&(m=j.transformHeader(m,_));var y=m,v=p[m]||0;for(0<v&&(g=!0,y=m+"_"+v),p[m]=v+1;c.includes(y);)y=y+"_"+v;c.push(y)}if(g){var k=i.split(P);k[0]=c.join(M),i=k.join(P)}}if(B||!1!==B&&-1===i.indexOf(z)){for(var b=i.split(P),E=0;E<b.length;E++){if(f=b[E],W+=f.length,E!==b.length-1)W+=P.length;else if(r)return L();if(!U||f.substring(0,a)!==U){if(o){if(u=[],I(f.split(M)),F(),H)return L()}else I(f.split(M));if(N&&N<=E)return u=u.slice(0,N),L(!0)}}return L()}for(var w=i.indexOf(M,W),R=i.indexOf(P,W),C=new RegExp(Q(K)+Q(z),"g"),S=i.indexOf(z,W);;)if(i[W]!==z)if(U&&0===f.length&&i.substring(W,W+a)===U){if(-1===R)return L();W=R+s,R=i.indexOf(P,W),w=i.indexOf(M,W)}else if(-1!==w&&(w<R||-1===R))f.push(i.substring(W,w)),W=w+e,w=i.indexOf(M,W);else{if(-1===R)break;if(f.push(i.substring(W,R)),D(R+s),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0)}else for(S=W,W++;;){if(-1===(S=i.indexOf(z,S+1)))return r||h.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:u.length,index:W}),T();if(S===n-1)return T(i.substring(W,S).replace(C,z));if(z!==K||i[S+1]!==K){if(z===K||0===S||i[S-1]!==K){-1!==w&&w<S+1&&(w=i.indexOf(M,S+1)),-1!==R&&R<S+1&&(R=i.indexOf(P,S+1));var O=A(-1===R?w:Math.min(w,R));if(i.substr(S+1+O,e)===M){f.push(i.substring(W,S).replace(C,z)),i[W=S+1+O+e]!==z&&(S=i.indexOf(z,W)),w=i.indexOf(M,W),R=i.indexOf(P,W);break}var x=A(R);if(i.substring(S+1+x,S+1+x+s)===P){if(f.push(i.substring(W,S).replace(C,z)),D(S+1+x+s),w=i.indexOf(M,W),S=i.indexOf(z,W),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0);break}h.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:u.length,index:W}),S++}}else S++}return T();function I(e){u.push(e),d=W}function A(e){var t=0;if(-1!==e){var r=i.substring(S+1,e);r&&""===r.trim()&&(t=r.length)}return t}function T(e){return r||(void 0===e&&(e=i.substring(W)),f.push(e),W=n,I(f),o&&F()),L()}function D(e){W=e,I(f),f=[],R=i.indexOf(P,W)}function L(e){return{data:u,errors:h,meta:{delimiter:M,linebreak:P,aborted:H,truncated:!!e,cursor:d+(t||0)}}}function F(){q(L()),u=[],h=[]}},this.abort=function(){H=!0},this.getCharIndex=function(){return W}}function _(e){var t=e.data,r=a[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,m(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:y,resume:y};if(J(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results}else J(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&m(t.workerId,t.results)}function m(e,t){var r=a[e];J(r.userComplete)&&r.userComplete(t),r.terminate(),delete a[e]}function y(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=w(e[r]);return t}function v(e,t){return function(){e.apply(t,arguments)}}function J(e){return"function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=b.parse(t.input,t.config);r&&f.postMessage({workerId:b.WORKER_ID,results:r,finished:!0})}}),(l.prototype=Object.create(h.prototype)).constructor=l,(c.prototype=Object.create(h.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(h.prototype)).constructor=g,b});

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./obj/Weather.js":
/*!************************!*\
  !*** ./obj/Weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Weather: () => (/* binding */ Weather)
/* harmony export */ });
class Weather {
  constructor(
    city,
    country,
    startDate,
    endDate,
    // country,
    // maxTemp,
    // minTemp,
    // avgTemp,
    // description,
  ) {
    this.city = city;
    this.startDate = startDate;
    this.endDate = endDate;
    this.country = country;
    // this.maxTemp = maxTemp;
    // this.minTemp = minTemp;
    // this.avgTemp = avgTemp;
    // this.description = description;
  }
  getCity() {
    return this.city;
  }

  getStartDate() {
    return this.startDate;
  }

  getEndDate() {
    return this.endDate;
  }
  getCountry() {
    return this.country;
  }

  // getMaxTemp() {
  //   return this.maxTemp;
  // }

  // getMinTemp() {
  //   return this.minTemp;
  // }
  // getAvgTemp() {
  //   return this.avgTemp;
  // }

  // getDescription() {
  //   return this.description;
  // }
}


/***/ }),

/***/ "./assets/img/clear-day.png":
/*!**********************************!*\
  !*** ./assets/img/clear-day.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6abc76a126f3e678efd9.png";

/***/ }),

/***/ "./assets/img/clear-night.png":
/*!************************************!*\
  !*** ./assets/img/clear-night.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "54092aef0d33c702bbcc.png";

/***/ }),

/***/ "./assets/img/cloudy.png":
/*!*******************************!*\
  !*** ./assets/img/cloudy.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "801ac19d2316874dba42.png";

/***/ }),

/***/ "./assets/img/fog.png":
/*!****************************!*\
  !*** ./assets/img/fog.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "09708f75bdfc5eefb261.png";

/***/ }),

/***/ "./assets/img/hail.png":
/*!*****************************!*\
  !*** ./assets/img/hail.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0bde84e60b6d789197c0.png";

/***/ }),

/***/ "./assets/img/partly-cloudy-day.png":
/*!******************************************!*\
  !*** ./assets/img/partly-cloudy-day.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8c5fd930e8d231a5ac37.png";

/***/ }),

/***/ "./assets/img/partly-cloudy-night.png":
/*!********************************************!*\
  !*** ./assets/img/partly-cloudy-night.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "40f7baa014eccbb9d34a.png";

/***/ }),

/***/ "./assets/img/rain-snow-showers-day.png":
/*!**********************************************!*\
  !*** ./assets/img/rain-snow-showers-day.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1bea534019cee130d0fc.png";

/***/ }),

/***/ "./assets/img/rain-snow-showers-night.png":
/*!************************************************!*\
  !*** ./assets/img/rain-snow-showers-night.png ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2dbf703c22d4bf734eee.png";

/***/ }),

/***/ "./assets/img/rain-snow.png":
/*!**********************************!*\
  !*** ./assets/img/rain-snow.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ee44b5bec59f82b2af9c.png";

/***/ }),

/***/ "./assets/img/rain.png":
/*!*****************************!*\
  !*** ./assets/img/rain.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9342afc23a23998534e1.png";

/***/ }),

/***/ "./assets/img/showers-day.png":
/*!************************************!*\
  !*** ./assets/img/showers-day.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6dc13840bece2726b28b.png";

/***/ }),

/***/ "./assets/img/showers-night.png":
/*!**************************************!*\
  !*** ./assets/img/showers-night.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cb6923e028094d80bc52.png";

/***/ }),

/***/ "./assets/img/sleet.png":
/*!******************************!*\
  !*** ./assets/img/sleet.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a95fabc083ff6508fe4a.png";

/***/ }),

/***/ "./assets/img/snow-showers-day.png":
/*!*****************************************!*\
  !*** ./assets/img/snow-showers-day.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8145c2956550b9e6c035.png";

/***/ }),

/***/ "./assets/img/snow-showers-night.png":
/*!*******************************************!*\
  !*** ./assets/img/snow-showers-night.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "748b3d02c590d0a30350.png";

/***/ }),

/***/ "./assets/img/snow.png":
/*!*****************************!*\
  !*** ./assets/img/snow.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7d21cd3c3c3002f14bb0.png";

/***/ }),

/***/ "./assets/img/thunder-rain.png":
/*!*************************************!*\
  !*** ./assets/img/thunder-rain.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1fcfa7f2d613ce323cc2.png";

/***/ }),

/***/ "./assets/img/thunder-showers-day.png":
/*!********************************************!*\
  !*** ./assets/img/thunder-showers-day.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cb7a4471c75498a16d94.png";

/***/ }),

/***/ "./assets/img/thunder-showers-night.png":
/*!**********************************************!*\
  !*** ./assets/img/thunder-showers-night.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a5b8165799603dc3a6e4.png";

/***/ }),

/***/ "./assets/img/thunder.png":
/*!********************************!*\
  !*** ./assets/img/thunder.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "16964eb313f6281f3343.png";

/***/ }),

/***/ "./assets/img/wind.png":
/*!*****************************!*\
  !*** ./assets/img/wind.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3c8f6e6128e44cf111de.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _obj_Weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../obj/Weather */ "./obj/Weather.js");
/* harmony import */ var _function_fetchWeather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/fetchWeather */ "./function/fetchWeather.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _function_makeTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../function/makeTable */ "./function/makeTable.js");
/* harmony import */ var _function_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../function/loader */ "./function/loader.js");
/* harmony import */ var _function_WeatherInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../function/WeatherInfo */ "./function/WeatherInfo.js");
/* harmony import */ var _function_daysOfWeek__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../function/daysOfWeek */ "./function/daysOfWeek.js");








const body = document.querySelector("body");
const content = document.createElement("div");

content.classList.add("content");
const contentBody = document.querySelector(".content");

const contentForm = document.createElement("div");
//const contentTable = document.createElement("div");

//contentTable.classList.add("content-table");
contentForm.classList.add("content-form");

const info = new _obj_Weather__WEBPACK_IMPORTED_MODULE_0__.Weather("hull", "uk", "2023-12-24", "2023-12-25");
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

const tableData = (0,_function_makeTable__WEBPACK_IMPORTED_MODULE_3__.table)()
  .parseCSV(`address,tempmax,tempmin,temp,conditions,description
hull uk,14.1,11.7,13,"Rain, Overcast",Cloudy skies throughout the day with early morning rain.
hull uk,11.4,8.6,9.8,"Rain, Overcast",Cloudy skies throughout the day with a chance of rain.`);

const tableBody = (0,_function_makeTable__WEBPACK_IMPORTED_MODULE_3__.table)().createTable(tableData.data);
//contentTable.appendChild(tableBody);
contentForm.appendChild((0,_function_loader__WEBPACK_IMPORTED_MODULE_4__.bodyContent)().render());
//body.appendChild(tableBody);
content.appendChild(contentForm);
body.appendChild(content);

const submitBtn = document.querySelector(".submit-button");
const countryNameField = document.querySelector("#country-field");
const countryOption = document.querySelector("select");
const datesOptions = document.querySelectorAll('input[type ="date"]');
const weatherOptions = document.querySelectorAll(
  'input[name ="weather-options"]:checked',
);



submitBtn.onclick = function (event) {
  event.preventDefault();
  let weatherValues = [];
  let dateValues = [];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  
  datesOptions.forEach((item) => {
    dateValues.push(item.value);
  });

  weatherOptions.forEach((item) => {
    weatherValues.push(item.value);
  });
  console.log(countryNameField.value);
  console.log(countryOption.value);
  console.log(dateValues);
  console.log(weatherValues);
  //console.log(images['snow.png'])
  (0,_function_WeatherInfo__WEBPACK_IMPORTED_MODULE_5__.weatherInfo)(json)
  //daysOfWeek().createDays(json)
  // displayTable();
  // content.appendChild(contentTable);
};

// function displayTable() {
//   content.style.gridTemplateColumns = "[start]1fr[start-end] 3fr [end]";
// }
//console.log(tableData.data)

const json = JSON.parse(`{"queryCost":1,"latitude":53.7432,"longitude":-0.34565,"resolvedAddress":"Hull, England, United Kingdom","address":"hull uk","timezone":"Europe/London","tzoffset":0.0,"days":[{"datetime":"2024-01-02","tempmax":48.8,"tempmin":44.7,"temp":46.9,"icon":"rain"},{"datetime":"2024-01-03","tempmax":46.1,"tempmin":41.3,"temp":43.9,"icon":"rain"},{"datetime":"2024-01-04","tempmax":44.9,"tempmin":36.6,"temp":41.2,"icon":"partly-cloudy-day"},{"datetime":"2024-01-05","tempmax":38.9,"tempmin":32.3,"temp":35.9,"icon":"cloudy"},{"datetime":"2024-01-06","tempmax":39.3,"tempmin":36.8,"temp":38.4,"icon":"cloudy"},{"datetime":"2024-01-07","tempmax":39.8,"tempmin":33.0,"temp":37.0,"icon":"partly-cloudy-day"}]}`)
// /*{"queryCost":1,"latitude":53.7432,"longitude":-0.34565,"resolvedAddress":"Hull, England, United Kingdom","address":"hull uk","timezone":"Europe/London","tzoffset":0.0,"days":[{"datetime":"2024-01-02","datetimeEpoch":1704153600,"tempmax":48.8,"tempmin":44.7,"temp":46.9,"feelslikemax":45.9,"feelslikemin":38.7,"feelslike":42.1,"dew":44.7,"humidity":91.9,"precip":0.657,"precipprob":100.0,"precipcover":58.33,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":25.5,"windspeed":17.6,"winddir":211.3,"pressure":981.2,"cloudcover":83.5,"visibility":5.1,"solarradiation":2.0,"solarenergy":0.1,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:18:52","sunriseEpoch":1704183532,"sunset":"15:51:48","sunsetEpoch":1704210708,"moonphase":0.71,"conditions":"Rain, Partially cloudy","description":"Partly cloudy throughout the day with a chance of rain throughout the day.","icon":"rain","stations":["EGXV","D8791","EGXS","EGNJ"],"source":"comb"},{"datetime":"2024-01-03","datetimeEpoch":1704240000,"tempmax":46.1,"tempmin":41.3,"temp":43.9,"feelslikemax":43.1,"feelslikemin":37.0,"feelslike":39.8,"dew":41.9,"humidity":92.8,"precip":0.104,"precipprob":96.8,"precipcover":33.33,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":18.6,"windspeed":11.2,"winddir":239.6,"pressure":987.6,"cloudcover":80.4,"visibility":13.3,"solarradiation":10.0,"solarenergy":0.8,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:18:38","sunriseEpoch":1704269918,"sunset":"15:52:59","sunsetEpoch":1704297179,"moonphase":0.74,"conditions":"Rain, Partially cloudy","description":"Partly cloudy throughout the day with early morning rain.","icon":"rain","stations":null,"source":"fcst"},{"datetime":"2024-01-04","datetimeEpoch":1704326400,"tempmax":44.9,"tempmin":36.6,"temp":41.2,"feelslikemax":41.3,"feelslikemin":36.6,"feelslike":38.3,"dew":39.6,"humidity":94.3,"precip":0.0,"precipprob":22.6,"precipcover":0.0,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":13.6,"windspeed":8.3,"winddir":227.8,"pressure":999.1,"cloudcover":66.4,"visibility":15.0,"solarradiation":22.1,"solarenergy":1.9,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:18:20","sunriseEpoch":1704356300,"sunset":"15:54:13","sunsetEpoch":1704383653,"moonphase":0.75,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-05","datetimeEpoch":1704412800,"tempmax":38.9,"tempmin":32.3,"temp":35.9,"feelslikemax":38.9,"feelslikemin":29.1,"feelslike":34.3,"dew":35.7,"humidity":98.0,"precip":0.095,"precipprob":19.4,"precipcover":20.83,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":8.7,"windspeed":4.7,"winddir":276.0,"pressure":1004.8,"cloudcover":96.9,"visibility":15.0,"solarradiation":23.8,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:17:59","sunriseEpoch":1704442679,"sunset":"15:55:29","sunsetEpoch":1704470129,"moonphase":0.81,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-06","datetimeEpoch":1704499200,"tempmax":39.3,"tempmin":36.8,"temp":38.4,"feelslikemax":39.3,"feelslikemin":36.3,"feelslike":38.0,"dew":37.2,"humidity":95.1,"precip":0.02,"precipprob":16.1,"precipcover":16.67,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":7.2,"windspeed":4.0,"winddir":232.6,"pressure":1018.5,"cloudcover":93.2,"visibility":13.8,"solarradiation":28.1,"solarenergy":2.4,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:17:35","sunriseEpoch":1704529055,"sunset":"15:56:48","sunsetEpoch":1704556608,"moonphase":0.84,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-07","datetimeEpoch":1704585600,"tempmax":39.8,"tempmin":33.0,"temp":37.0,"feelslikemax":38.2,"feelslikemin":26.0,"feelslike":33.7,"dew":31.7,"humidity":81.6,"precip":0.004,"precipprob":25.8,"precipcover":4.17,"preciptype":["rain","snow"],"snow":0.0,"snowdepth":0.0,"windgust":22.5,"windspeed":9.7,"winddir":344.5,"pressure":1029.7,"cloudcover":51.8,"visibility":15.0,"solarradiation":47.2,"solarenergy":4.1,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:17:06","sunriseEpoch":1704615426,"sunset":"15:58:10","sunsetEpoch":1704643090,"moonphase":0.87,"conditions":"Partially cloudy","description":"Clearing in the afternoon.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-08","datetimeEpoch":1704672000,"tempmax":42.5,"tempmin":37.1,"temp":39.8,"feelslikemax":36.9,"feelslikemin":31.9,"feelslike":34.0,"dew":32.8,"humidity":75.8,"precip":0.091,"precipprob":29.0,"precipcover":20.83,"preciptype":["rain"],"snow":0.1,"snowdepth":0.0,"windgust":28.9,"windspeed":16.3,"winddir":50.8,"pressure":1036.5,"cloudcover":59.8,"visibility":15.0,"solarradiation":22.6,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:16:34","sunriseEpoch":1704701794,"sunset":"15:59:35","sunsetEpoch":1704729575,"moonphase":0.9,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"},{"datetime":"2024-01-09","datetimeEpoch":1704758400,"tempmax":41.8,"tempmin":37.1,"temp":39.7,"feelslikemax":39.4,"feelslikemin":32.9,"feelslike":36.4,"dew":32.0,"humidity":74.1,"precip":0.004,"precipprob":29.0,"precipcover":4.17,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":12.3,"windspeed":6.9,"winddir":22.5,"pressure":1038.2,"cloudcover":78.0,"visibility":15.0,"solarradiation":23.3,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:15:59","sunriseEpoch":1704788159,"sunset":"16:01:01","sunsetEpoch":1704816061,"moonphase":0.94,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-10","datetimeEpoch":1704844800,"tempmax":43.8,"tempmin":39.6,"temp":42.2,"feelslikemax":39.6,"feelslikemin":35.2,"feelslike":37.8,"dew":36.8,"humidity":81.2,"precip":0.024,"precipprob":9.7,"precipcover":20.83,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":18.6,"windspeed":8.9,"winddir":51.6,"pressure":1035.4,"cloudcover":97.9,"visibility":15.0,"solarradiation":9.6,"solarenergy":0.6,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:15:20","sunriseEpoch":1704874520,"sunset":"16:02:31","sunsetEpoch":1704902551,"moonphase":0.97,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-11","datetimeEpoch":1704931200,"tempmax":43.1,"tempmin":41.4,"temp":41.9,"feelslikemax":37.7,"feelslikemin":36.0,"feelslike":36.7,"dew":35.0,"humidity":76.4,"precip":0.012,"precipprob":6.5,"precipcover":12.5,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":17.2,"windspeed":10.1,"winddir":76.9,"pressure":1028.8,"cloudcover":100.0,"visibility":15.0,"solarradiation":12.0,"solarenergy":1.2,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:14:38","sunriseEpoch":1704960878,"sunset":"16:04:02","sunsetEpoch":1704989042,"moonphase":0.0,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-12","datetimeEpoch":1705017600,"tempmax":41.6,"tempmin":35.3,"temp":39.5,"feelslikemax":38.8,"feelslikemin":31.1,"feelslike":36.3,"dew":33.5,"humidity":79.3,"precip":0.0,"precipprob":22.6,"precipcover":0.0,"preciptype":null,"snow":0.0,"snowdepth":0.0,"windgust":9.8,"windspeed":5.4,"winddir":159.5,"pressure":1013.2,"cloudcover":92.2,"visibility":15.0,"solarradiation":36.9,"solarenergy":3.3,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:13:52","sunriseEpoch":1705047232,"sunset":"16:05:36","sunsetEpoch":1705075536,"moonphase":0.04,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-13","datetimeEpoch":1705104000,"tempmax":40.9,"tempmin":35.1,"temp":38.7,"feelslikemax":37.1,"feelslikemin":30.8,"feelslike":34.3,"dew":34.7,"humidity":85.6,"precip":0.036,"precipprob":22.6,"precipcover":16.67,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":24.8,"windspeed":15.9,"winddir":22.0,"pressure":996.7,"cloudcover":100.0,"visibility":14.9,"solarradiation":7.8,"solarenergy":0.6,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:13:03","sunriseEpoch":1705133583,"sunset":"16:07:12","sunsetEpoch":1705162032,"moonphase":0.07,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-14","datetimeEpoch":1705190400,"tempmax":40.0,"tempmin":31.7,"temp":35.5,"feelslikemax":31.7,"feelslikemin":23.0,"feelslike":27.1,"dew":27.7,"humidity":73.3,"precip":0.02,"precipprob":22.6,"precipcover":16.67,"preciptype":["rain","snow"],"snow":0.0,"snowdepth":0.0,"windgust":31.3,"windspeed":15.9,"winddir":309.4,"pressure":998.5,"cloudcover":90.1,"visibility":14.3,"solarradiation":31.5,"solarenergy":2.7,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:12:11","sunriseEpoch":1705219931,"sunset":"16:08:50","sunsetEpoch":1705248530,"moonphase":0.11,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-15","datetimeEpoch":1705276800,"tempmax":36.2,"tempmin":30.8,"temp":33.0,"feelslikemax":25.6,"feelslikemin":19.0,"feelslike":22.0,"dew":26.2,"humidity":76.4,"precip":0.198,"precipprob":29.0,"precipcover":29.17,"preciptype":["rain","snow"],"snow":0.8,"snowdepth":0.2,"windgust":41.8,"windspeed":24.6,"winddir":310.1,"pressure":1005.9,"cloudcover":69.3,"visibility":8.5,"solarradiation":35.0,"solarenergy":3.0,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:11:16","sunriseEpoch":1705306276,"sunset":"16:10:30","sunsetEpoch":1705335030,"moonphase":0.14,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"},{"datetime":"2024-01-16","datetimeEpoch":1705363200,"tempmax":34.1,"tempmin":29.2,"temp":31.8,"feelslikemax":24.9,"feelslikemin":19.7,"feelslike":21.9,"dew":26.2,"humidity":79.6,"precip":0.067,"precipprob":19.4,"precipcover":20.83,"preciptype":["rain","snow"],"snow":0.2,"snowdepth":0.7,"windgust":35.6,"windspeed":17.2,"winddir":309.1,"pressure":1013.6,"cloudcover":55.8,"visibility":13.8,"solarradiation":40.0,"solarenergy":3.5,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:10:17","sunriseEpoch":1705392617,"sunset":"16:12:11","sunsetEpoch":1705421531,"moonphase":0.18,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"}],"stations":{"EGXV":{"distance":15165.0,"latitude":53.87,"longitude":-0.43,"useCount":0,"id":"EGXV","name":"EGXV","quality":50,"contribution":0.0},"D8791":{"distance":2996.0,"latitude":53.74,"longitude":-0.391,"useCount":0,"id":"D8791","name":"DW8791 Hull UK","quality":0,"contribution":0.0},"EGXS":{"distance":43931.0,"latitude":53.48,"longitude":0.15,"useCount":0,"id":"EGXS","name":"EGXS","quality":49,"contribution":0.0},"EGNJ":{"distance":18170.0,"latitude":53.58,"longitude":-0.35,"useCount":0,"id":"EGNJ","name":"EGNJ","quality":50,"contribution":0.0}}} */

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNDMEM7O0FBRW5DO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSx1REFBVTs7O0FBR1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSE87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMkJBQTJCLGtEQUFtRDs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLElBQUksSUFBSSxNQUFNOztBQUU3QztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEV5Qzs7QUFFbEM7QUFDUDtBQUNBO0FBQ0EseUdBQXlHLHNCQUFzQixLQUFLLHlCQUF5QixHQUFHLDJCQUEyQjs7QUFFM0w7QUFDQSxXQUFXLFFBQVEsR0FBRyx5QkFBeUI7QUFDL0MsV0FBVyxRQUFROztBQUVuQjs7QUFFQTtBQUNBLHVCQUF1QixRQUFRO0FBQy9CLFdBQVcsUUFBUTs7QUFFbkIsY0FBYyxPQUFPLEVBQUUsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0EscUJBQXFCLFlBQVk7QUFDakMsUUFBUTtBQUNSLHFCQUFxQixZQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUywwQ0FBMEM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVDQUF1QztBQUMvQyxRQUFRLGtDQUFrQztBQUMxQyxRQUFRLCtCQUErQjtBQUN2QyxRQUFRLGdDQUFnQztBQUN4QyxRQUFRLGdDQUFnQztBQUN4QyxRQUFRLGlEQUFpRDtBQUN6RCxRQUFRLHFDQUFxQztBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsMkJBQTJCLHFDQUFxQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxLQUFLO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsS0FBSzs7QUFFaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwyQkFBMkIsUUFBUSxNQUFNLHNCQUFzQjtBQUMvRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEw2Qjs7QUFFdEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxHQUFHLDZEQUFlLEVBQUUsMkRBQWE7QUFDN0U7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzREFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxLQUFLOztBQUVqRTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQSx3QkFBd0Isc0JBQXNCO0FBQzlDOztBQUVBLDRCQUE0Qix5QkFBeUI7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RUE7QUFDMEc7QUFDakI7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUMsT0FBTyw0RUFBNEUsS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsY0FBYyxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxjQUFjLFFBQVEsS0FBSyxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGNBQWMsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxVQUFVLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLDhCQUE4QixnQkFBZ0IsaUJBQWlCLHVCQUF1Qiw2QkFBNkIsdUJBQXVCLGdEQUFnRCxLQUFLLGNBQWMsc0JBQXNCLEdBQUcsT0FBTyw2QkFBNkIsb0JBQW9CLDBCQUEwQixvQkFBb0IsR0FBRyxhQUFhLGtCQUFrQixpQkFBaUIsd0JBQXdCLG9CQUFvQiw2QkFBNkIsa0NBQWtDLG9DQUFvQyxrQ0FBa0MsR0FBRyxrQkFBa0IsdUJBQXVCLG9CQUFvQix1Q0FBdUMsd0JBQXdCLEtBQUssVUFBVSxxQkFBcUIsaUJBQWlCLG9CQUFvQiwrQkFBK0IsNEJBQTRCLDBCQUEwQixnQkFBZ0IsR0FBRyx5QkFBeUIsb0JBQW9CLGdCQUFnQixxQkFBcUIsOEJBQThCLDZCQUE2QixzQkFBc0IsR0FBRyxjQUFjLDZCQUE2Qiw4QkFBOEIsR0FBRyxzQ0FBc0MsaUJBQWlCLEdBQUcsdURBQXVELHdCQUF3QiwwQkFBMEIseUJBQXlCLG1CQUFtQixHQUFHLDRDQUE0QyxvQkFBb0IsSUFBSSw2Q0FBNkMsd0JBQXdCLEdBQUcsbUJBQW1CLHlCQUF5QixnQ0FBZ0MsU0FBUywyQkFBMkIsb0JBQW9CLHNCQUFzQixjQUFjLEdBQUcsK0JBQStCLG9CQUFvQixlQUFlLEdBQUcsaUJBQWlCLHlCQUF5QiwwQkFBMEIsdUJBQXVCLHVDQUF1QyxtQkFBbUIsZ0JBQWdCLHlCQUF5QiwwQkFBMEIsU0FBUyx3QkFBd0Isa0JBQWtCLDJCQUEyQixnQkFBZ0Isb0JBQW9CLDZCQUE2Qix3Q0FBd0MsS0FBSyxpQkFBaUIsd0JBQXdCLGlCQUFpQixlQUFlLG9CQUFvQiw2QkFBNkIsdUJBQXVCLHFDQUFxQyxLQUFLLGlCQUFpQix3QkFBd0Isa0JBQWtCLDRCQUE0QiwwQkFBMEIsdUNBQXVDLHVCQUF1Qix3QkFBd0IsR0FBRyxnQ0FBZ0MsbUJBQW1CLHVDQUF1QyxHQUFHLHFCQUFxQix5QkFBeUIsMkJBQTJCLHNCQUFzQixvQkFBb0IsY0FBYyxvQkFBb0IsNkJBQTZCLGtDQUFrQyxLQUFLLHdCQUF3QixxQkFBcUIsb0JBQW9CLDhCQUE4QixzQkFBc0IscUJBQXFCLEdBQUcsNkJBQTZCLG9CQUFvQixxQkFBcUIsOEJBQThCLGtCQUFrQixHQUFHLFNBQVMsb0JBQW9CLGlCQUFpQixHQUFHLGNBQWMscUJBQXFCLFNBQVMsbUNBQW1DLG9CQUFvQiwwQkFBMEIsR0FBRyxpQkFBaUIscUNBQXFDLEdBQUcsb0JBQW9CLHdCQUF3QixHQUFHLDJCQUEyQixpQkFBaUIsa0JBQWtCLEdBQUcsMkJBQTJCLHFCQUFxQixHQUFHLG1DQUFtQyw0QkFBNEIsbUJBQW1CLGdCQUFnQix5QkFBeUIsMEJBQTBCLHNCQUFzQix3QkFBd0IsdUJBQXVCLEdBQUcseUJBQXlCLGlDQUFpQyxHQUFHLHVCQUF1QixvQkFBb0IsR0FBRywwQkFBMEIscUJBQXFCLEdBQUcsbUJBQW1CO0FBQzloTDtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7QUN4TzFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFxQyxDQUFDLGlDQUFPLEVBQUUsb0NBQUMsQ0FBQztBQUFBO0FBQUE7QUFBQSxrR0FBQyxDQUFDLENBQWtGLENBQUMsbUJBQW1CLGFBQWEsc0ZBQXNGLDhEQUE4RCxRQUFRLG9CQUFvQixjQUFjLG9CQUFvQixxQ0FBcUMsRUFBRSw4RkFBOEYsaUJBQWlCLGlDQUFpQyxpSUFBaUksbUNBQW1DLGVBQWUscUNBQXFDLGlCQUFpQixxQ0FBcUMsaUJBQWlCLFlBQVksS0FBSyw0QkFBNEIsYUFBYSxJQUFJLHVCQUF1Qix1QkFBdUIsUUFBUSx3Q0FBd0MsR0FBRywrTUFBK00sK0JBQStCLEVBQUUsV0FBVyxzREFBc0QsNkNBQTZDLFNBQVMsa0pBQWtKLG1CQUFtQix1QkFBdUIsMERBQTBELFlBQVksNkJBQTZCLGtFQUFrRSxrQ0FBa0MsMEJBQTBCLGlHQUFpRyw0RkFBNEYsMENBQTBDLDhDQUE4Qyx5Q0FBeUMsNkJBQTZCLG1FQUFtRSxZQUFZLDBDQUEwQyxvSkFBb0osR0FBRywyQkFBMkIsc0NBQXNDLHFCQUFxQixxREFBcUQsNERBQTRELDhXQUE4VywwREFBMEQsa0JBQWtCLFNBQVMsNEVBQTRFLDBEQUEwRCxTQUFTLFlBQVksV0FBVyw2QkFBNkIsbUJBQW1CLFlBQVksV0FBVyxLQUFLLG1GQUFtRiwwR0FBMEcsaUJBQWlCLElBQUksS0FBSyxlQUFlLGdCQUFnQix5QkFBeUIsT0FBTyxZQUFZLElBQUksS0FBSyxnQkFBZ0Isa0JBQWtCLGdCQUFnQixxQ0FBcUMsU0FBUyxnQkFBZ0Isb0JBQW9CLDZEQUE2RCxTQUFTLGlEQUFpRCxnQ0FBZ0Msd0ZBQXdGLFlBQVksV0FBVyxtQ0FBbUMsU0FBUyxpR0FBaUcsc1pBQXNaLGVBQWUsdUJBQXVCLGtCQUFrQixNQUFNLDZCQUE2Qiw4SkFBOEosWUFBWSxvQkFBb0IsWUFBWSw0REFBNEQsSUFBSSxFQUFFLFdBQVcsYUFBYSxpQkFBaUIsbUJBQW1CLGdCQUFnQixtQ0FBbUMsdUJBQXVCLHdHQUF3RyxPQUFPLFNBQVMscUNBQXFDLGtGQUFrRixtQ0FBbUMsZ0NBQWdDLHNDQUFzQyxrQ0FBa0Msa0NBQWtDLGlDQUFpQyxhQUFhLG9CQUFvQixjQUFjLCtOQUErTiwwQkFBMEIsYUFBYSxXQUFXLHNFQUFzRSw2REFBNkQsNENBQTRDLHdEQUF3RCx1Q0FBdUMsa0JBQWtCLHFDQUFxQywwQkFBMEIscUJBQXFCLDREQUE0RCxvREFBb0Qsb0JBQW9CLGdJQUFnSSxpRkFBaUYsb0JBQW9CLDBDQUEwQyxFQUFFLG1DQUFtQyxpSEFBaUgsc0NBQXNDLDRaQUE0WixnQkFBZ0IsNkJBQTZCLGtGQUFrRix5Q0FBeUMsR0FBRyxjQUFjLE1BQU0sUUFBUSx5RkFBeUYsc0NBQXNDLFlBQVksa0JBQWtCLHlCQUF5QixnQ0FBZ0MsNEJBQTRCLHNDQUFzQyxLQUFLLDRSQUE0UiwwQ0FBMEMsMENBQTBDLDJCQUEyQiwyQ0FBMkMsdURBQXVELElBQUkseUNBQXlDLFNBQVMsNEJBQTRCLHFDQUFxQyw4QkFBOEIscU5BQXFOLDJDQUEyQyxxQkFBcUIsbURBQW1ELHNDQUFzQyw4QkFBOEIsc0JBQXNCLCtCQUErQixjQUFjLFFBQVEsUUFBUSwyREFBMkQscUNBQXFDLHdCQUF3QixxTEFBcUwsNEJBQTRCLGdHQUFnRyw0QkFBNEIsa0JBQWtCLDJCQUEyQixvRUFBb0UsMEJBQTBCLDRDQUE0QyxzQkFBc0IsUUFBUSxVQUFVLEVBQUUsK0JBQStCLDJJQUEySSw2QkFBNkIsMEJBQTBCLGNBQWMsTUFBTSxtQkFBbUIsMEJBQTBCLDZCQUE2Qiw0QkFBNEIsb0JBQW9CLCtCQUErQixpR0FBaUcsY0FBYyxtQkFBbUIsRUFBRSxtQkFBbUIsc0JBQXNCLDREQUE0RCx3QkFBd0IsOERBQThELHlCQUF5QixzSUFBc0ksa0NBQWtDLHFDQUFxQyw0QkFBNEIsaUVBQWlFLGdDQUFnQyxJQUFJLDRIQUE0SCxTQUFTLHNCQUFzQix1Q0FBdUMseUNBQXlDLG9DQUFvQyxnREFBZ0Qsd0NBQXdDLDRKQUE0SixPQUFPLGNBQWMsOEZBQThGLEVBQUUseUVBQXlFLEVBQUUsb0VBQW9FLEVBQUUsNEZBQTRGLDJCQUEyQixjQUFjLGFBQWEsbUJBQW1CLGVBQWUsS0FBSyxnQ0FBZ0MsOEVBQThFLGNBQWMsdUZBQXVGLGFBQWEsaUdBQWlHLGtHQUFrRyxZQUFZLG1CQUFtQixhQUFhLGdCQUFnQiwyREFBMkQsNkJBQTZCLFlBQVkscUJBQXFCLHlCQUF5QixtQkFBbUIsdUJBQXVCLGNBQWMsMERBQTBELGdCQUFnQixtQkFBbUIsSUFBSSxRQUFRLFdBQVcsS0FBSyxlQUFlLG9KQUFvSixvUEFBb1AsUUFBUSxtR0FBbUcsb0NBQW9DLGNBQWMsR0FBRyxhQUFhLDhCQUE4QixnQkFBZ0IsMk5BQTJOLGNBQWMsb0JBQW9CLHFCQUFxQixTQUFTLHlEQUF5RCxNQUFNLG9CQUFvQixPQUFPLHlCQUF5Qix1Q0FBdUMsMkJBQTJCLHVCQUF1Qix1Q0FBdUMseUJBQXlCLG1JQUFtSSw4QkFBOEIsZ0JBQWdCLFdBQVcsd0JBQXdCLGlDQUFpQyxrR0FBa0csS0FBSywwQkFBMEIsWUFBWSxxQkFBcUIsMkJBQTJCLFlBQVksV0FBVyxLQUFLLHVCQUF1QixTQUFTLGlCQUFpQiw0Q0FBNEMsZUFBZSxnQkFBZ0IsMkJBQTJCLEtBQUssdUJBQXVCLGdEQUFnRCxtR0FBbUcsT0FBTyw4Q0FBOEMsOERBQThELDRHQUE0RyxXQUFXLCtFQUErRSxNQUFNLFdBQVcsS0FBSyxNQUFNLFlBQVksd0JBQXdCLFNBQVMsdUJBQXVCLDZEQUE2RCx3QkFBd0IsNkVBQTZFLHlCQUF5QixTQUFTLHVCQUF1QixvRUFBb0UsY0FBYywyQkFBMkIsb0JBQW9CLGNBQWMsZ0JBQWdCLG9JQUFvSSxzS0FBc0ssbUhBQW1ILGFBQWEsMkJBQTJCLGdFQUFnRSw0RUFBNEUsaUJBQWlCLGlCQUFpQixzQ0FBc0MsTUFBTSxnQkFBZ0IsV0FBVyxpREFBaUQsa0JBQWtCLG1DQUFtQyxjQUFjLFdBQVcsVUFBVSxNQUFNLGlCQUFpQiw0QkFBNEIsaUNBQWlDLHlCQUF5QixXQUFXLEtBQUssaURBQWlELHFCQUFxQiw2QkFBNkIsTUFBTSx1Q0FBdUMsbUJBQW1CLHdDQUF3QyxXQUFXLHdGQUF3Rix5REFBeUQscUJBQXFCLHdDQUF3Qyw4RUFBOEUsS0FBSyxnQkFBZ0IseURBQXlELCtCQUErQixrQkFBa0IsRUFBRSwrQ0FBK0MsNEZBQTRGLE1BQU0sbURBQW1ELHNCQUFzQiw2QkFBNkIsd0VBQXdFLGdDQUFnQywwQkFBMEIsNkdBQTZHLE1BQU0sV0FBVyxtQ0FBbUMsNEdBQTRHLCtCQUErQixNQUFNLFFBQVEsOEdBQThHLE9BQU8sU0FBUyxXQUFXLGNBQWMsY0FBYyxjQUFjLFFBQVEsV0FBVyx5QkFBeUIsK0JBQStCLFNBQVMsY0FBYyx5RUFBeUUsY0FBYywrQkFBK0IsY0FBYyxPQUFPLHNCQUFzQixrRUFBa0UsYUFBYSxrQkFBa0IsdUJBQXVCLEtBQUssOEJBQThCLFVBQVUsY0FBYyxrQ0FBa0MsdUNBQXVDLG1DQUFtQyxPQUFPLGlCQUFpQixtQkFBbUIsd0JBQXdCLFlBQVksRUFBRSxtQkFBbUIsa0JBQWtCLFlBQVksc0NBQXNDLG1FQUFtRSxRQUFRLEtBQUssaUJBQWlCLHdFQUF3RSx3Q0FBd0MsZ0JBQWdCLFdBQVcsK0RBQStELGFBQWEsb0NBQW9DLGNBQWMseUNBQXlDLDZCQUE2Qiw0QkFBNEIsU0FBUyxnQkFBZ0Isa0JBQWtCLHNCQUFzQixjQUFjLDJCQUEyQixtQ0FBbUMsYUFBYSxrREFBa0QsMkNBQTJDLG1FQUFtRSxFQUFFLG9FQUFvRSxnQ0FBZ0Msa0JBQWtCLDJDQUEyQyxHQUFHLGdPQUFnTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMMTdsQixNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSxzRkFBTyxVQUFVLHNGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNiTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNsREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXlDO0FBQ2lCO0FBQ3JDO0FBQ3lCO0FBQ0c7QUFDSztBQUNGOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixpREFBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLDBEQUFLO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsMERBQUs7QUFDdkI7QUFDQSx3QkFBd0IsNkRBQVc7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGtFQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLCtLQUErSyxnRkFBZ0YsRUFBRSxnRkFBZ0YsRUFBRSw2RkFBNkYsRUFBRSxrRkFBa0YsRUFBRSxrRkFBa0YsRUFBRSw2RkFBNkYsRUFBRTtBQUNudEIsTUFBTSwrS0FBK0ssMHZCQUEwdkIsRUFBRSxndEJBQWd0QixFQUFFLDByQkFBMHJCLEVBQUUsMHFCQUEwcUIsRUFBRSx5cUJBQXlxQixFQUFFLDhyQkFBOHJCLEVBQUUsaXJCQUFpckIsRUFBRSw2ckJBQTZyQixFQUFFLHdxQkFBd3FCLEVBQUUseXFCQUF5cUIsRUFBRSxrcUJBQWtxQixFQUFFLDBxQkFBMHFCLEVBQUUsaXJCQUFpckIsRUFBRSx5ckJBQXlyQixFQUFFLDByQkFBMHJCLGNBQWMsUUFBUSw2SEFBNkgsVUFBVSx1SUFBdUksU0FBUyw0SEFBNEgsU0FBUyxnSUFBZ0kiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Fzc2V0cy9pbWcvIHN5bmMgbm9ucmVjdXJzaXZlIFxcLihwbmcpJCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Z1bmN0aW9uL1dlYXRoZXJJbmZvLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vZnVuY3Rpb24vZGF5c09mV2Vlay5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Z1bmN0aW9uL2ZldGNoV2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Z1bmN0aW9uL2xvYWRlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Z1bmN0aW9uL21ha2VUYWJsZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvcGFwYXBhcnNlL3BhcGFwYXJzZS5taW4uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL29iai9XZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBtYXAgPSB7XG5cdFwiLi9jbGVhci1kYXkucG5nXCI6IFwiLi9hc3NldHMvaW1nL2NsZWFyLWRheS5wbmdcIixcblx0XCIuL2NsZWFyLW5pZ2h0LnBuZ1wiOiBcIi4vYXNzZXRzL2ltZy9jbGVhci1uaWdodC5wbmdcIixcblx0XCIuL2Nsb3VkeS5wbmdcIjogXCIuL2Fzc2V0cy9pbWcvY2xvdWR5LnBuZ1wiLFxuXHRcIi4vZm9nLnBuZ1wiOiBcIi4vYXNzZXRzL2ltZy9mb2cucG5nXCIsXG5cdFwiLi9oYWlsLnBuZ1wiOiBcIi4vYXNzZXRzL2ltZy9oYWlsLnBuZ1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1kYXkucG5nXCI6IFwiLi9hc3NldHMvaW1nL3BhcnRseS1jbG91ZHktZGF5LnBuZ1wiLFxuXHRcIi4vcGFydGx5LWNsb3VkeS1uaWdodC5wbmdcIjogXCIuL2Fzc2V0cy9pbWcvcGFydGx5LWNsb3VkeS1uaWdodC5wbmdcIixcblx0XCIuL3JhaW4tc25vdy1zaG93ZXJzLWRheS5wbmdcIjogXCIuL2Fzc2V0cy9pbWcvcmFpbi1zbm93LXNob3dlcnMtZGF5LnBuZ1wiLFxuXHRcIi4vcmFpbi1zbm93LXNob3dlcnMtbmlnaHQucG5nXCI6IFwiLi9hc3NldHMvaW1nL3JhaW4tc25vdy1zaG93ZXJzLW5pZ2h0LnBuZ1wiLFxuXHRcIi4vcmFpbi1zbm93LnBuZ1wiOiBcIi4vYXNzZXRzL2ltZy9yYWluLXNub3cucG5nXCIsXG5cdFwiLi9yYWluLnBuZ1wiOiBcIi4vYXNzZXRzL2ltZy9yYWluLnBuZ1wiLFxuXHRcIi4vc2hvd2Vycy1kYXkucG5nXCI6IFwiLi9hc3NldHMvaW1nL3Nob3dlcnMtZGF5LnBuZ1wiLFxuXHRcIi4vc2hvd2Vycy1uaWdodC5wbmdcIjogXCIuL2Fzc2V0cy9pbWcvc2hvd2Vycy1uaWdodC5wbmdcIixcblx0XCIuL3NsZWV0LnBuZ1wiOiBcIi4vYXNzZXRzL2ltZy9zbGVldC5wbmdcIixcblx0XCIuL3Nub3ctc2hvd2Vycy1kYXkucG5nXCI6IFwiLi9hc3NldHMvaW1nL3Nub3ctc2hvd2Vycy1kYXkucG5nXCIsXG5cdFwiLi9zbm93LXNob3dlcnMtbmlnaHQucG5nXCI6IFwiLi9hc3NldHMvaW1nL3Nub3ctc2hvd2Vycy1uaWdodC5wbmdcIixcblx0XCIuL3Nub3cucG5nXCI6IFwiLi9hc3NldHMvaW1nL3Nub3cucG5nXCIsXG5cdFwiLi90aHVuZGVyLXJhaW4ucG5nXCI6IFwiLi9hc3NldHMvaW1nL3RodW5kZXItcmFpbi5wbmdcIixcblx0XCIuL3RodW5kZXItc2hvd2Vycy1kYXkucG5nXCI6IFwiLi9hc3NldHMvaW1nL3RodW5kZXItc2hvd2Vycy1kYXkucG5nXCIsXG5cdFwiLi90aHVuZGVyLXNob3dlcnMtbmlnaHQucG5nXCI6IFwiLi9hc3NldHMvaW1nL3RodW5kZXItc2hvd2Vycy1uaWdodC5wbmdcIixcblx0XCIuL3RodW5kZXIucG5nXCI6IFwiLi9hc3NldHMvaW1nL3RodW5kZXIucG5nXCIsXG5cdFwiLi93aW5kLnBuZ1wiOiBcIi4vYXNzZXRzL2ltZy93aW5kLnBuZ1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL2Fzc2V0cy9pbWcgc3luYyBcXFxcLihwbmcpJFwiOyIsImltcG9ydCB7IGRheXNPZldlZWsgfSBmcm9tIFwiLi9kYXlzT2ZXZWVrXCI7XG5cbmV4cG9ydCBjb25zdCB3ZWF0aGVySW5mbyA9IChpbmZvKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnRXZWF0aGVySW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudC13ZWF0aGVyLWluZm9cIik7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG5cbiAgY29uc3Qgd2Vla2RheXMgPSBnZXREYXlzT2ZXZWVrKGluZm8uZGF5cyk7XG4gIHJlbmRlcih3ZWVrZGF5cyk7XG4gIGRheXNPZldlZWsoKS5jcmVhdGVEYXlzKGluZm8pO1xuXG5cbiAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWN0aXZlXCIpO1xuICBjb25zdCBkYXlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYXlcIik7XG4gIGxldCBhY3RpdmVEYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLWRheScpXG4gIGNvbnN0IHdlZWtkYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud2Vla2RheS1idG4nKVxuICBjb25zdCBkYXlDb250ZW50RXh0cmEgPSBhY3RpdmVEYXkucXVlcnlTZWxlY3RvcignLmRheS1jb250ZW50LWV4dHJhJylcbiAgY29uc3Qgdmlld01vcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlldy1tb3JlLWJ0bicpXG5cbiAgaWYgKHZpZXdNb3JlQnRuIC8qJiYgZGF5Q29udGVudEV4dHJhKi8pIHtcbiAgICB2aWV3TW9yZUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coZGF5Q29udGVudEV4dHJhKVxuICAgICAgaWYgKGRheUNvbnRlbnRFeHRyYS5zdHlsZS5kaXNwbGF5LmluY2x1ZGVzKCdub25lJykpIHtcbiAgICAgICAgZGF5Q29udGVudEV4dHJhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snIFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdlZWtkYXlCdG4uZm9yRWFjaChidG4gPT4ge1xuICAgIGJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBzd2l0Y2hBY3RpdmUoZXZlbnQpXG4gICAgICBzaG93V2VhdGhlckluZm8oZXZlbnQpXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldERheXNPZldlZWsoZWxlbWVudHMpIHtcbiAgICBsZXQgZGF5cyA9IFtdO1xuICAgIGNvbnN0IGRPZncgPSBbXG4gICAgICBcIlN1bmRheVwiLFxuICAgICAgXCJNb25kYXlcIixcbiAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgXCJXZWRuZXNkYXlcIixcbiAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgIFwiRnJpZGF5XCIsXG4gICAgICBcIlNhdHVyZGF5XCIsXG4gICAgXTtcblxuICAgIGVsZW1lbnRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShpdGVtLmRhdGV0aW1lKS5nZXREYXkoKTtcbiAgICAgIGRheXMucHVzaChkT2Z3W2RhdGVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGF5cztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcihhcnJheSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoY29udGVudFdlYXRoZXJJbmZvICYmIGNvbnRlbnRXZWF0aGVySW5mby5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgY29udGVudFdlYXRoZXJJbmZvLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgfVxuICAgICAgY29uc3QgZWxlbWVudHMgPSBnZXREYXlzT2ZXZWVrKGFycmF5KTtcbiAgICAgIGNvbnN0IGRheXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGF5c0Rpdi5jbGFzc0xpc3QuYWRkKFwid2Vla2RheS1kaXZcIik7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGF5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZGF5QnRuLnRleHRDb250ZW50ID0gYCR7YXJyYXlbaV19YDtcbiAgICAgICAgZGF5QnRuLmNsYXNzTGlzdC5hZGQoXCJ3ZWVrZGF5LWJ0blwiKTtcbiAgICAgICAgZGF5QnRuLmRhdGFzZXQua2V5ID0gaTtcbiAgICAgICAgLy8gZGF5QnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gICBzd2l0Y2hBY3RpdmUoZXZlbnQpO1xuICAgICAgICAvLyB9O1xuICAgICAgICAvL2NvbnNvbGUuZGF5XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgZGF5QnRuLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgLy9zaG93V2VhdGhlckluZm8oZGF5QnRuKVxuICAgICAgICB9XG4gICAgICAgIGRheXNEaXYuYXBwZW5kQ2hpbGQoZGF5QnRuKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRlbnRXZWF0aGVySW5mbykge1xuICAgICAgICBjb250ZW50V2VhdGhlckluZm8uYXBwZW5kKGRheXNEaXYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd2VhdGhlckNvbnRlbnRJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgd2VhdGhlckNvbnRlbnRJbmZvLmNsYXNzTGlzdC5hZGQoXCJjb250ZW50LXdlYXRoZXItaW5mb1wiKTtcblxuICAgICAgICB3ZWF0aGVyQ29udGVudEluZm8uYXBwZW5kQ2hpbGQoZGF5c0Rpdik7XG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQod2VhdGhlckNvbnRlbnRJbmZvKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN3aXRjaEFjdGl2ZShldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICBhY3RpdmUgPSBldmVudC50YXJnZXQ7XG4gICAgICAvL3Nob3dXZWF0aGVySW5mbyhhY3RpdmUpXG4gICAgfVxuICB9XG5cbiAgIGZ1bmN0aW9uIHNob3dXZWF0aGVySW5mbyhlbGVtZW50KSB7XG4gICAgIGNvbnN0IGtleU5vID0gZWxlbWVudC50YXJnZXQuZGF0YXNldC5rZXk7XG4gICAgIGlmIChrZXlObyAhPT0gYWN0aXZlRGF5LmRhdGFzZXQudGFnKSB7XG4gICAgICAgZGF5cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICBpZiAoaXRlbS5kYXRhc2V0LnRhZyA9PT0ga2V5Tm8pIHtcbiAgICAgICAgICAgYWN0aXZlRGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1kYXknKVxuICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1kYXknKVxuICAgICAgICAgICBhY3RpdmVEYXkgPSBpdGVtXG4gICAgICAgICB9XG4gICAgICAgfSk7XG4gICAgIH1cbiAgICAgXG4gICAgXG4gIH1cbn07XG4iLCJleHBvcnQgY29uc3QgZGF5c09mV2VlayA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudFdlYXRoZXJJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50LXdlYXRoZXItaW5mb1wiKTtcblxuICBmdW5jdGlvbiBpbXBvcnRBbGwocikge1xuICAgIGxldCBpbWFnZXMgPSB7fTtcbiAgICByLmtleXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBpbWFnZXNbaXRlbS5yZXBsYWNlKFwiLi9cIiwgXCJcIildID0gcihpdGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW1hZ2VzO1xuICB9XG4gIGNvbnN0IGltYWdlcyA9IGltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoXCIuLi9hc3NldHMvaW1nXCIsIGZhbHNlLCAvXFwuKHBuZykkLykpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZURheXMod2VhdGhlckluZm8pIHtcbiAgICBjb25zdCBkYXlzQ29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbG9jYXRpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbG9jYXRpb25IZWFkZXIudGV4dENvbnRlbnQgPSB3ZWF0aGVySW5mby5yZXNvbHZlZEFkZHJlc3M7XG4gICAgZGF5c0NvbnRlbnREaXYuY2xhc3NMaXN0LmFkZCgnd2Vla2RheS13ZWF0aGVyJylcbiAgICBkYXlzQ29udGVudERpdi5hcHBlbmRDaGlsZChsb2NhdGlvbkhlYWRlcik7XG4gICAgY29uc3QgZGF5Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGF5Q29udGVudC5jbGFzc0xpc3QuYWRkKCd3ZWVrZGF5LXdlYXRoZXItY29udGVudCcpXG4gICAgY29uc3QgZGF5cyA9IHdlYXRoZXJJbmZvLmRheXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBkYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGF5RGl2LmNsYXNzTGlzdC5hZGQoJ2RheScpXG4gICAgICBkYXlJbmZvKGRheXNbaV0sIGRheURpdik7XG4gICAgICBkYXlEaXYuZGF0YXNldC50YWcgPSBpO1xuICAgICAgaWYgKGkgPT09MCkge1xuICAgICAgICBkYXlEaXYuY2xhc3NMaXN0LmFkZCgnYWN0aXZlLWRheScpXG4gICAgICB9XG4gICAgICBkYXlDb250ZW50LmFwcGVuZENoaWxkKGRheURpdik7XG4gICAgfVxuICAgIGRheXNDb250ZW50RGl2LmFwcGVuZENoaWxkKGRheUNvbnRlbnQpXG4gICAgY29udGVudFdlYXRoZXJJbmZvLmFwcGVuZENoaWxkKGRheXNDb250ZW50RGl2KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRheUluZm8oZGF5LCBkaXYpIHtcbiAgICBjb25zdCBoZWFkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBkYXRlVGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBkYXRlVGltZS50ZXh0Q29udGVudCA9IGRheS5kYXRldGltZTtcbiAgICBkZWxldGUgZGF5LmRhdGV0aW1lO1xuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGRheS50ZW1wO1xuICAgIGRlbGV0ZSBkYXkudGVtcDtcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBpY29uLnNyYyA9IGltYWdlc1tgJHtkYXkuaWNvbn0ucG5nYF07XG4gICAgZGVsZXRlIGRheS5pY29uO1xuICAgIGNvbnRlbnREaXYuY2xhc3NMaXN0LmFkZCgnZGF5LWNvbnRlbnQtaXRlbXMnKVxuICAgIGNvbnRlbnREaXYuYXBwZW5kKHRlbXAsIGljb24pO1xuICAgIGhlYWREaXYuYXBwZW5kKGRhdGVUaW1lLCBjb250ZW50RGl2KTtcbiAgICBoZWFkRGl2LmNsYXNzTGlzdC5hZGQoJ2RheS1jb250ZW50JylcbiAgICBkaXYuYXBwZW5kKGhlYWREaXYpO1xuICAgIGlmIChkYXkpIHtcbiAgICAgIGNvbnN0IHZpZXdNb3JlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHZpZXdNb3JlQnRuLmNsYXNzTGlzdC5hZGQoJ3ZpZXctbW9yZS1idG4nKVxuICAgICAgdmlld01vcmVCdG4udGV4dENvbnRlbnQgPSBcIlZpZXcgTW9yZVwiO1xuICAgICAgY29uc3QgbW9yZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBtb3JlRGl2LmNsYXNzTGlzdC5hZGQoJ2RheS1jb250ZW50LWV4dHJhJylcbiAgICAgIE9iamVjdC5lbnRyaWVzKGRheSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4dHJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICBleHRyYS50ZXh0Q29udGVudCA9IGAke2tleX06ICR7dmFsdWV9YDtcblxuICAgICAgICBtb3JlRGl2LmFwcGVuZENoaWxkKGV4dHJhKTtcbiAgICAgIH0pO1xuICAgICAgaGVhZERpdi5hcHBlbmQodmlld01vcmVCdG4pO1xuICAgICAgZGl2LmFwcGVuZChtb3JlRGl2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBjcmVhdGVEYXlzIH07XG59O1xuIiwiaW1wb3J0IHsgV2VhdGhlciB9IGZyb20gXCIuLi9vYmovV2VhdGhlclwiO1xuXG5leHBvcnQgY29uc3QgV2VhdGhlckRldGFpbHMgPSAoKSA9PiB7XG4gIGZ1bmN0aW9uIGJ1aWxkQXBpVVJMKHdlYXRoZXJJbmZvLCBlbGVtZW50cykge1xuICAgIGxldCB1cmxFbmQgPSBgJmluY2x1ZGU9ZGF5cyZrZXk9R0dMWUU2Rjg0Mk02U0M0R1ZIVlhSWkY0UiZjb250ZW50VHlwZT1qc29uYDtcbiAgICBsZXQgbWFpblVybCA9IGBodHRwczovL3dlYXRoZXIudmlzdWFsY3Jvc3NpbmcuY29tL1Zpc3VhbENyb3NzaW5nV2ViU2VydmljZXMvcmVzdC9zZXJ2aWNlcy90aW1lbGluZS8ke3dlYXRoZXJJbmZvLmdldENpdHkoKX0lMjAke3dlYXRoZXJJbmZvLmdldENvdW50cnkoKX0vJHt3ZWF0aGVySW5mby5nZXRTdGFydERhdGUoKX1gO1xuXG4gICAgbWFpblVybCA9IHdlYXRoZXJJbmZvLmdldEVuZERhdGUoKVxuICAgICAgPyBgJHttYWluVXJsfS8ke3dlYXRoZXJJbmZvLmdldEVuZERhdGUoKX0/YFxuICAgICAgOiBgJHttYWluVXJsfT9gO1xuXG4gICAgbWFpblVybCArPSBgdW5pdEdyb3VwPW1ldHJpYyZlbGVtZW50cz1kYXRldGltZSUyQ3Jlc29sdmVkQWRkcmVzcyUyQ3RlbXBtYXglMkN0ZW1wbWluJTJDdGVtcCUyQ2ljb25gO1xuXG4gICAgbGV0IG5ld1VybCA9IGVsZW1lbnRzXG4gICAgICA/IGFkZEVsZW1lbnRzKGAke21haW5Vcmx9JTJgLCBlbGVtZW50cylcbiAgICAgIDogYCR7bWFpblVybH0mYDtcblxuICAgIHJldHVybiBgJHtuZXdVcmx9JHt1cmxFbmR9YDtcbiAgfVxuICBhc3luYyBmdW5jdGlvbiBjYWxsV2VhdGhlckFQSShpbmZvLCBlbGVtZW50cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBhd2FpdCBidWlsZEFwaVVSTChpbmZvLCBlbGVtZW50cyk7XG4gICAgICAvL3JldHVybiB1cmw7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEVsZW1lbnRzKHN0cmluZywgZWxlbWVudHMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaSAhPT0gZWxlbWVudHMubGVuZ3RoIC0gMSkge1xuICAgICAgICBzdHJpbmcgKz0gYCR7ZWxlbWVudHNbaV19JTJDYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmluZyArPSBgJHtlbGVtZW50c1tpXX1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgcmV0dXJuIHsgY2FsbFdlYXRoZXJBUEkgfTtcbn07XG5cbi8vaHR0cHM6Ly93ZWF0aGVyLnZpc3VhbGNyb3NzaW5nLmNvbS9WaXN1YWxDcm9zc2luZ1dlYlNlcnZpY2VzL3Jlc3Qvc2VydmljZXMvdGltZWxpbmUvaHVsbCUyMHVrP3VuaXRHcm91cD11cyZpbmNsdWRlPWRheXMma2V5PUJOQVgyR0JVRURGOVhDVTZFNzRTVTRUMzYmY29udGVudFR5cGU9Y3N2XG4iLCJleHBvcnQgY29uc3QgYm9keUNvbnRlbnQgPSAoKSA9PiB7XG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBjb25zdCBmb3JtRGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGZvcm1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1EaXYuY2xhc3NMaXN0LmFkZChcImZvcm0tZGl2XCIpO1xuICAgIGNvbnN0IGZvcm1UZXh0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LmFkZChcInN1Ym1pdC1idXR0b25cIik7XG4gICAgc3VibWl0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcbiAgICBmb3JtVGV4dEJveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBmb3JtVGV4dEJveC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIkVudGVyIExvY2F0aW9uIEhlcmVcIik7XG4gICAgZm9ybVRleHRCb3guc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb3VudHJ5LWZpZWxkXCIpO1xuICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoZm9ybVRleHRCb3gpO1xuICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoY3JlYXRlQ291bnRyeURyb3BEb3duKCkpO1xuICAgIGZvcm1EZXRhaWxzLmFwcGVuZENoaWxkKGZvcm1EaXYpO1xuICAgIGZvcm1EZXRhaWxzLmFwcGVuZENoaWxkKGNyZWF0ZURhdGVzKCkpO1xuICAgIGZvcm1EZXRhaWxzLmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJPcHRpb25zKCkpO1xuICAgIGZvcm1EZXRhaWxzLmFwcGVuZENoaWxkKHN1Ym1pdEJ0bik7XG5cbiAgICByZXR1cm4gZm9ybURldGFpbHM7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVEYXRlcygpIHtcbiAgICBjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkYXRlRGl2LmNsYXNzTGlzdC5hZGQoXCJkYXRlLWRpdlwiKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29uc3QgZW5kRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICAgIHN0YXJ0RGF0ZS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwic3RhcnQtZGF0ZVwiKTtcbiAgICBzdGFydERhdGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gICAgc3RhcnREYXRlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwibWluXCIsXG4gICAgICBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEwKX1gLFxuICAgICk7XG4gICAgc3RhcnREYXRlLnZhbHVlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMCk7XG4gICAgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMCk7XG4gICAgc3RhcnREYXRlLnJlcXVpcmVkID0gdHJ1ZVxuXG4gICAgZW5kRGF0ZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcbiAgICBlbmREYXRlLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnU2VsZWN0IEVuZCBEYXRlJylcbiAgICBlbmREYXRlLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJlbmQtZGF0ZVwiKTtcbiAgICBzdGFydERhdGUub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBlbmREYXRlLnNldEF0dHJpYnV0ZShcIm1pblwiLCBzdGFydERhdGUudmFsdWUpO1xuICAgIH07XG5cbiAgICBkYXRlRGl2LmFwcGVuZENoaWxkKHN0YXJ0RGF0ZSk7XG4gICAgZGF0ZURpdi5hcHBlbmRDaGlsZChlbmREYXRlKTtcblxuICAgIHJldHVybiBkYXRlRGl2O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ291bnRyeURyb3BEb3duKCkge1xuICAgIGNvbnN0IGRyb3BEb3duRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBjb3VudHJ5Q29kZSA9IFtcbiAgICAgIHsgY291bnRyeTogXCJVbml0ZWQgS2luZ2RvbVwiLCBjb2RlOiBcIkdCXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJBdXN0cmFsaWFcIiwgY29kZTogXCJBVVwiIH0sXG4gICAgICB7IGNvdW50cnk6IFwiQ2FuYWRhXCIsIGNvZGU6IFwiQ0FcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIk5pZ2VyaWFcIiwgY29kZTogXCJOR1wiIH0sXG4gICAgICB7IGNvdW50cnk6IFwiR2VybWFueVwiLCBjb2RlOiBcIkRFXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2FcIiwgY29kZTogXCJVU1wiIH0sXG4gICAgICB7IGNvdW50cnk6IFwiU291dGggQWZyaWNhXCIsIGNvZGU6IFwiWkFcIiB9LFxuICAgIF07XG5cbiAgICBjb25zdCBzb3J0ZWRMaXN0ZWQgPSBjb3VudHJ5Q29kZS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBpZiAoYS5jb3VudHJ5IDwgYi5jb3VudHJ5KSByZXR1cm4gLTE7XG4gICAgICBpZiAoYS5jb3VudHJ5ID4gYi5jb3VudHJ5KSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuXG4gICAgc29ydGVkTGlzdGVkLnVuc2hpZnQoeyBjb3VudHJ5OiBcIlNlbGVjdCBDb3VudHJ5XCIsIGNvZGU6IFwiXCIgfSwpXG4gICAgXG4gICAgY29uc3QgZHJvcERvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIGNvbnN0IGRyb3BEb3duTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcbiAgICAvL2Ryb3BEb3duTmFtZS5sYWJlbCA9IFwiU2VsZWN0IENvdW50cnlcIjtcbiAgICAvL2Ryb3BEb3duLmFwcGVuZENoaWxkKGRyb3BEb3duTmFtZSk7XG5cbiAgICBzb3J0ZWRMaXN0ZWQuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZHJvcGRvd25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIGRyb3Bkb3duSXRlbS52YWx1ZSA9IGl0ZW0uY29kZTtcbiAgICAgIGRyb3Bkb3duSXRlbS50ZXh0Q29udGVudCA9IGl0ZW0uY291bnRyeTtcbiAgICAgIGlmIChpdGVtLmNvdW50cnkgPT09ICdTZWxlY3QgQ291bnRyeScpIHtcbiAgICAgICAgZHJvcGRvd25JdGVtLnNlbGVjdGVkID0gdHJ1ZVxuICAgICAgICAvL2Ryb3Bkb3duSXRlbS5kaXNhYmxlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgZHJvcERvd24uYXBwZW5kQ2hpbGQoZHJvcGRvd25JdGVtKTtcbiAgICB9KTtcblxuICAgIGRyb3BEb3duRGl2LmFwcGVuZENoaWxkKGRyb3BEb3duKTtcbiAgICByZXR1cm4gZHJvcERvd25EaXY7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVXZWF0aGVyT3B0aW9ucygpIHtcbiAgICBjb25zdCB3ZWF0aGVySGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiKTtcbiAgICB3ZWF0aGVySGVhZGVyLnRleHRDb250ZW50ID0gXCJDaG9vc2UgdGhlIFdlYXRoZXIgRGV0YWlsczpcIjtcblxuICAgIGNvbnN0IHdlYXRoZXJPcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIGNvbnN0IHdlYXRoZXJPcHRpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3ZWF0aGVyT3B0aW9uc0Rpdi5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyLW9wdGlvbnMtZGl2JylcblxuICAgIHdlYXRoZXJPcHRpb25zLmFwcGVuZENoaWxkKHdlYXRoZXJIZWFkZXIpO1xuICAgIGNvbnN0IGRlZmF1bHRXZWF0aGVyT3B0aW9ucyA9IFtcbiAgICAgIC8vIFwiYWRkcmVzc1wiLFxuICAgICAgLy8gXCJ0ZW1wXCIsXG4gICAgICAvLyBcInRlbXBtaW5cIixcbiAgICAgIC8vIFwidGVtcG1heFwiLFxuICAgICAgLy8gXCJjb25kaXRpb25zXCIsXG4gICAgICAvLyBcImRlc2NyaXB0aW9uXCIsXG4gICAgXTtcblxuICAgIGRlZmF1bHRXZWF0aGVyT3B0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG5cbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBjb25zdCBvcHRpb25zTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cbiAgICAgIG9wdGlvbnNMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgaXRlbSk7XG4gICAgICBjb25zdCBvcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIG9wdGlvbklucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICAgIG9wdGlvbklucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ3ZWF0aGVyLW9wdGlvbnNcIik7XG4gICAgICBvcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgJHtpdGVtfWApO1xuICAgICAgb3B0aW9uSW5wdXQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAvL29wdGlvbnNMYWJlbC5hcHBlbmRDaGlsZChvcHRpb25JbnB1dCk7XG4gICAgICBvcHRpb25zTGFiZWwudGV4dENvbnRlbnQgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoaXRlbSk7XG5cbiAgICAgIG9wdGlvbnNMYWJlbC5vbmNsaWNrID0gc2VsZWN0SXRlbVxuICAgICAgZGl2LmFwcGVuZENoaWxkKG9wdGlvbklucHV0KTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25zTGFiZWwpXG5cbiAgICAgIHdlYXRoZXJPcHRpb25zRGl2LmFwcGVuZENoaWxkKGRpdilcbiAgICB9KTtcbiAgICBjb25zdCB3ZWF0aGVyT3B0aW9uc090aGVyID0gW1xuICAgICAgXCJmZWVsc2xpa2VtYXhcIixcbiAgICAgIFwiZmVlbHNsaWtlbWluXCIsXG4gICAgICBcIndpbmRndXN0XCIsXG4gICAgICBcIndpbmRzcGVlZFwiLFxuICAgICAgXCJ3aW5kZGlyXCIsXG4gICAgXTtcblxuICAgIHdlYXRoZXJPcHRpb25zT3RoZXIuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uc0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG9wdGlvbnNMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgaXRlbSk7XG4gICAgICBjb25zdCBvcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIG9wdGlvbklucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICAgIG9wdGlvbklucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ3ZWF0aGVyLW9wdGlvbnNcIik7XG4gICAgICBvcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgJHtpdGVtfWApO1xuXG4gICAgICAvL29wdGlvbnNMYWJlbC5hcHBlbmRDaGlsZChvcHRpb25JbnB1dCk7XG4gICAgICBvcHRpb25zTGFiZWwudGV4dENvbnRlbnQgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoaXRlbSk7XG5cbiAgICAgIG9wdGlvbnNMYWJlbC5vbmNsaWNrID0gc2VsZWN0SXRlbVxuICAgICAgZGl2LmFwcGVuZENoaWxkKG9wdGlvbklucHV0KTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25zTGFiZWwpO1xuXG4gICAgICB3ZWF0aGVyT3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChkaXYpXG4gICAgfSk7XG5cbiAgICB3ZWF0aGVyT3B0aW9ucy5hcHBlbmRDaGlsZCh3ZWF0aGVyT3B0aW9uc0RpdilcblxuICAgIHJldHVybiB3ZWF0aGVyT3B0aW9ucztcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGNyZWF0ZVxuXG4gIGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcih3b3JkKSB7XG4gICAgcmV0dXJuIHdvcmQucmVwbGFjZShgJHt3b3JkWzBdfWAsIGAke3dvcmRbMF0udG9VcHBlckNhc2UoKX1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEl0ZW0oZXZlbnQpIHtcbiAgICBsZXQgc2libGluZ0NoZWNrQm94ID0gZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmdcblxuICAgIGlmIChzaWJsaW5nQ2hlY2tCb3guY2hlY2tlZCkge1xuICAgICAgc2libGluZ0NoZWNrQm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaWJsaW5nQ2hlY2tCb3guY2hlY2tlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyByZW5kZXIgfTtcbn07XG4iLCJpbXBvcnQgUGFwYSBmcm9tIFwicGFwYXBhcnNlXCI7XG5cbmV4cG9ydCBjb25zdCB0YWJsZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBkZWxpbWl0ZXI6IFwiXCIsIC8vIGF1dG8tZGV0ZWN0XG4gICAgICBuZXdsaW5lOiBcIlwiLCAvLyBhdXRvLWRldGVjdFxuICAgICAgcXVvdGVDaGFyOiAnXCInLFxuICAgICAgZXNjYXBlQ2hhcjogJ1wiJyxcbiAgICAgIGhlYWRlcjogZmFsc2UsXG4gICAgICB0cmFuc2Zvcm1IZWFkZXI6IHVuZGVmaW5lZCxcbiAgICAgIGR5bmFtaWNUeXBpbmc6IGZhbHNlLFxuICAgICAgcHJldmlldzogMCxcbiAgICAgIGVuY29kaW5nOiBcIlwiLFxuICAgICAgd29ya2VyOiBmYWxzZSxcbiAgICAgIGNvbW1lbnRzOiBmYWxzZSxcbiAgICAgIHN0ZXA6IHVuZGVmaW5lZCxcbiAgICAgIGNvbXBsZXRlOiB1bmRlZmluZWQsXG4gICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgZG93bmxvYWQ6IGZhbHNlLFxuICAgICAgZG93bmxvYWRSZXF1ZXN0SGVhZGVyczogdW5kZWZpbmVkLFxuICAgICAgZG93bmxvYWRSZXF1ZXN0Qm9keTogdW5kZWZpbmVkLFxuICAgICAgc2tpcEVtcHR5TGluZXM6IGZhbHNlLFxuICAgICAgY2h1bms6IHVuZGVmaW5lZCxcbiAgICAgIGNodW5rU2l6ZTogdW5kZWZpbmVkLFxuICAgICAgZmFzdE1vZGU6IHVuZGVmaW5lZCxcbiAgICAgIGJlZm9yZUZpcnN0Q2h1bms6IHVuZGVmaW5lZCxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdW5kZWZpbmVkLFxuICAgICAgdHJhbnNmb3JtOiB1bmRlZmluZWQsXG4gICAgICBkZWxpbWl0ZXJzVG9HdWVzczogW1wiLFwiLCBcIlxcdFwiLCBcInxcIiwgXCI7XCIsIFBhcGEuUkVDT1JEX1NFUCwgUGFwYS5VTklUX1NFUF0sXG4gICAgICBza2lwRmlyc3ROTGluZXM6IDAsXG4gICAgfTtcbiAgICBmdW5jdGlvbiBwYXJzZUNTVihpdGVtKSB7XG4gICAgICByZXR1cm4gUGFwYS5wYXJzZShpdGVtLCBjb25maWcpXG4gIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVUYWJsZSh0YWJsZUl0ZW0pIHtcbiAgICAgICAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgbGV0IHRhYmxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJyk7XG4gICAgICAgIGxldCB0YWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuXG4gICAgICAgIGxldCB0YWJsZUhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgIHRhYmxlSXRlbVswXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IHRoZWFkZXJSb3dJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgICAgICAgICAgbGV0IHRoZWFkZXJSb3dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7aXRlbX1gKVxuXG4gICAgICAgICAgICB0aGVhZGVyUm93SXRlbS5hcHBlbmRDaGlsZCh0aGVhZGVyUm93VGV4dCk7XG4gICAgICAgICAgICB0YWJsZUhlYWRlclJvdy5hcHBlbmRDaGlsZCh0aGVhZGVyUm93SXRlbSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGFibGVIZWFkLmFwcGVuZENoaWxkKHRhYmxlSGVhZGVyUm93KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRhYmxlSXRlbS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgdGFibGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRhYmxlSXRlbVtpXS5sZW5ndGg7IHgrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHRhYmxlRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICAgICAgdGFibGVEYXRhLnRleHRDb250ZW50ID0gdGFibGVJdGVtW2ldW3hdO1xuXG4gICAgICAgICAgICAgICAgdGFibGVSb3cuYXBwZW5kQ2hpbGQodGFibGVEYXRhKVxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZCh0YWJsZVJvdylcbiAgICAgICAgfVxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUhlYWQpXG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlQm9keSlcblxuICAgICAgICByZXR1cm4gdGFibGU7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHBhcnNlQ1NWLFxuICAgICAgICBjcmVhdGVUYWJsZVxuICAgIH1cbn07XG5cbmNvbnN0IGNvbnRlbnRCb2R5ID0gKCkgPT4ge1xuICAgIFxuICAgIFxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYFxuKntcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcblxufVxuXG4qPiBidXR0b257XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuYm9keXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xufVxuXG4uY29udGVudHtcbiAgICBoZWlnaHQ6IDcwJTtcbiAgICB3aWR0aDogOTAlO1xuICAgIG1hcmdpbjogMTBweCBhdXRvO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgKi9cbiAgICAvKiBhbGlnbi1pdGVtczogY2VudGVyOyAgICAgKi9cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuXG4uY29udGVudC1mb3Jte1xuICAgIG1hcmdpbjogMjBweCA4cHg7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgI2NjY2NjYztcbiAgICAvKiBkaXNwbGF5OiBmbGV4OyAqL1xufVxuXG5mb3JtIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICB3aWR0aDogOTAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMTVweDtcbn1cblxuLmZvcm0tZGl2LCAuZGF0ZS1kaXZ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDE1cHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24tc2VsZjpmbGV4LXN0YXJ0IDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5mb3JtLWRpdntcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xufVxuXG4uZm9ybS1kaXYgaW5wdXQsIC5mb3JtLWRpdiBzZWxlY3R7XG4gICAgd2lkdGg6IDkwJTtcbn1cblxuLmZvcm0tZGl2IGlucHV0LCAuZm9ybS1kaXYgc2VsZWN0LCAuZGF0ZS1kaXYgaW5wdXR7XG4gICAgZm9udC1zaXplOiAxLjY1ZW07XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogOHB4O1xufVxuXG4vKiBzZWxlY3Qgb3B0aW9uW2Rpc2FibGVkXTpmaXJzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbn0gKi9cblxubGVnZW5kLCAud2VhdGhlci1vcHRpb25zLWRpdiBkaXYgbGFiZWx7XG4gICAgZm9udC1zaXplOiAxLjU1ZW07XG59XG4uZm9ybS1kaXYgc2VsZWN0e1xuICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xuICAgIFxufVxuXG5cbi53ZWF0aGVyLW9wdGlvbnMtZGl2e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDo4cHg7XG59XG5cblxuLndlYXRoZXItb3B0aW9ucy1kaXYgZGl2e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiA1cHg7XG59XG4uc3VibWl0LWJ1dHRvbntcbiAgICBwYWRkaW5nOiAxMHB4IDIycHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBmb250LXNpemU6IDEuNWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXI6IDA7XG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XG4gICAgXG59XG4uY29udGVudC13ZWF0aGVyLWluZm97XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLyogbWFyZ2luOiAyMHB4IDhweDsgKi9cbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTsgKi9cbn1cblxuLndlZWtkYXktZGl2e1xuICAgIG1hcmdpbjogMTVweCBhdXRvO1xuICAgIHdpZHRoOiA4MCU7XG4gICAgZ2FwOiA1cHg7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLWF1dG8tY29sdW1uczogMWZyO1xuICAgIC8qIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7ICovXG59XG5cbi53ZWVrZGF5LWJ0bntcbiAgICBwYWRkaW5nOiA4cHggMTVweDtcbiAgICBncmlkLXJvdzogMTtcbiAgICBjb2xvcjpjb3JuZmxvd2VyYmx1ZSA7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCBjb3JuZmxvd2VyYmx1ZTtcbiAgICBmb250LXdlaWdodDogODAwO1xuICAgIGZvbnQtc2l6ZTogMS44MGVtO1xufVxuXG4uYWN0aXZlLCAud2Vla2RheS1idG46aG92ZXJ7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xufVxuXG4ud2Vla2RheS13ZWF0aGVye1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICBtYXJnaW46IDVweCA1cHg7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgKi9cbn1cbi53ZWVrZGF5LXdlYXRoZXIgPiBoMntcbiAgICBtYXJnaW46IDIwcHggMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBmb250LXNpemU6IDJlbTtcbn1cblxuLndlZWtkYXktd2VhdGhlci1jb250ZW50e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWFyZ2luOiAyMHB4IDA7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbi5kYXl7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICB3aWR0aDogODAlO1xufVxuLmFjdGl2ZS1kYXl7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgXG59XG4uZGF5LWNvbnRlbnQsIC5kYXktY29udGVudC1pdGVtc3tcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5kYXktY29udGVudHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5kYXktY29udGVudCBoM3tcbiAgICBmb250LXNpemU6IDEuNzBlbTtcbn1cblxuLmRheS1jb250ZW50LWl0ZW1zIGltZ3tcbiAgICB3aWR0aDogNWVtO1xuICAgIGhlaWdodDogNWVtO1xufVxuXG4uZGF5LWNvbnRlbnQtaXRlbXM+IGgxe1xuICAgIGZvbnQtc2l6ZTogNGVtO1xufVxuXG4uZGF5LWNvbnRlbnQtaXRlbXMgPiBoMTo6YWZ0ZXJ7XG4gICAgY29udGVudDogXCJcXFxcMDBCMFwiXG59XG5cbi52aWV3LW1vcmUtYnRue1xuICAgIGJvcmRlcjogMDtcbiAgICBmb250LXdlaWdodDogMzAwXG59XG5cbi52aWV3LW1vcmUtYnRuOjphZnRlcntcbiAgICBjb250ZW50OiBcIiArXCI7XG4gICAgZm9udC1zaXplOiBsYXJnZXI7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnZpZXctbW9yZS1idG46aG92ZXJ7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5kYXktY29udGVudC1leHRyYXtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4uYWN0aXZlLWV4dHJhLWNvbnRlbnR7XG4gICAgZGlzcGxheTogYmxvY2s7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFDQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIseUNBQXlDOztBQUU3Qzs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLDZCQUE2QjtJQUM3Qiw2QkFBNkI7SUFDN0IseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixnQ0FBZ0M7SUFDaEMsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFVBQVU7SUFDVixhQUFhOztJQUViLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixTQUFTO0lBQ1QsY0FBYztJQUNkLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBOztHQUVHOztBQUVIO0lBQ0ksaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCOztBQUU3Qjs7O0FBR0E7SUFDSSxhQUFhO0lBQ2IsZUFBZTtJQUNmLE9BQU87QUFDWDs7O0FBR0E7SUFDSSxhQUFhO0lBQ2IsUUFBUTtBQUNaO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixnQ0FBZ0M7SUFDaEMsWUFBWTtJQUNaLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsbUJBQW1COztBQUV2QjtBQUNBO0lBQ0ksV0FBVztJQUNYLHNCQUFzQjtJQUN0QixPQUFPO0lBQ1AsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQ0FBbUM7QUFDdkM7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFFBQVE7SUFDUixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCO29DQUNnQztBQUNwQzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixhQUFhO0lBQ2IsT0FBTztJQUNQLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsNkJBQTZCO0FBQ2pDO0FBQ0E7SUFDSSxjQUFjO0lBQ2QsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixjQUFjO0lBQ2QsdUJBQXVCO0lBQ3ZCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7SUFDYixVQUFVO0FBQ2Q7QUFDQTtJQUNJLGNBQWM7O0FBRWxCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksU0FBUztJQUNUO0FBQ0o7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcbip7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuXFxufVxcblxcbio+IGJ1dHRvbntcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5ib2R5e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uY29udGVudHtcXG4gICAgaGVpZ2h0OiA3MCU7XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIG1hcmdpbjogMTBweCBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgKi9cXG4gICAgLyogYWxpZ24taXRlbXM6IGNlbnRlcjsgICAgICovXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XFxufVxcblxcbi5jb250ZW50LWZvcm17XFxuICAgIG1hcmdpbjogMjBweCA4cHg7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjY2NjY2NjO1xcbiAgICAvKiBkaXNwbGF5OiBmbGV4OyAqL1xcbn1cXG5cXG5mb3JtIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIFxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4uZm9ybS1kaXYsIC5kYXRlLWRpdntcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAxNXB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLXNlbGY6ZmxleC1zdGFydCA7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmZvcm0tZGl2e1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmZvcm0tZGl2IGlucHV0LCAuZm9ybS1kaXYgc2VsZWN0e1xcbiAgICB3aWR0aDogOTAlO1xcbn1cXG5cXG4uZm9ybS1kaXYgaW5wdXQsIC5mb3JtLWRpdiBzZWxlY3QsIC5kYXRlLWRpdiBpbnB1dHtcXG4gICAgZm9udC1zaXplOiAxLjY1ZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG4vKiBzZWxlY3Qgb3B0aW9uW2Rpc2FibGVkXTpmaXJzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufSAqL1xcblxcbmxlZ2VuZCwgLndlYXRoZXItb3B0aW9ucy1kaXYgZGl2IGxhYmVse1xcbiAgICBmb250LXNpemU6IDEuNTVlbTtcXG59XFxuLmZvcm0tZGl2IHNlbGVjdHtcXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xcbiAgICBcXG59XFxuXFxuXFxuLndlYXRoZXItb3B0aW9ucy1kaXZ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgZ2FwOjhweDtcXG59XFxuXFxuXFxuLndlYXRoZXItb3B0aW9ucy1kaXYgZGl2e1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDVweDtcXG59XFxuLnN1Ym1pdC1idXR0b257XFxuICAgIHBhZGRpbmc6IDEwcHggMjJweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29ybmZsb3dlcmJsdWU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICAgIFxcbn1cXG4uY29udGVudC13ZWF0aGVyLWluZm97XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICAvKiBtYXJnaW46IDIwcHggOHB4OyAqL1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTsgKi9cXG59XFxuXFxuLndlZWtkYXktZGl2e1xcbiAgICBtYXJnaW46IDE1cHggYXV0bztcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgZ2FwOiA1cHg7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtYXV0by1jb2x1bW5zOiAxZnI7XFxuICAgIC8qIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5OyAqL1xcbn1cXG5cXG4ud2Vla2RheS1idG57XFxuICAgIHBhZGRpbmc6IDhweCAxNXB4O1xcbiAgICBncmlkLXJvdzogMTtcXG4gICAgY29sb3I6Y29ybmZsb3dlcmJsdWUgO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBjb3JuZmxvd2VyYmx1ZTtcXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gICAgZm9udC1zaXplOiAxLjgwZW07XFxufVxcblxcbi5hY3RpdmUsIC53ZWVrZGF5LWJ0bjpob3ZlcntcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcXG59XFxuXFxuLndlZWtkYXktd2VhdGhlcntcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcXG4gICAgbWFyZ2luOiA1cHggNXB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgKi9cXG59XFxuLndlZWtkYXktd2VhdGhlciA+IGgye1xcbiAgICBtYXJnaW46IDIwcHggMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgZm9udC1zaXplOiAyZW07XFxufVxcblxcbi53ZWVrZGF5LXdlYXRoZXItY29udGVudHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWFyZ2luOiAyMHB4IDA7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmRheXtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgd2lkdGg6IDgwJTtcXG59XFxuLmFjdGl2ZS1kYXl7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBcXG59XFxuLmRheS1jb250ZW50LCAuZGF5LWNvbnRlbnQtaXRlbXN7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5kYXktY29udGVudHtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uZGF5LWNvbnRlbnQgaDN7XFxuICAgIGZvbnQtc2l6ZTogMS43MGVtO1xcbn1cXG5cXG4uZGF5LWNvbnRlbnQtaXRlbXMgaW1ne1xcbiAgICB3aWR0aDogNWVtO1xcbiAgICBoZWlnaHQ6IDVlbTtcXG59XFxuXFxuLmRheS1jb250ZW50LWl0ZW1zPiBoMXtcXG4gICAgZm9udC1zaXplOiA0ZW07XFxufVxcblxcbi5kYXktY29udGVudC1pdGVtcyA+IGgxOjphZnRlcntcXG4gICAgY29udGVudDogXFxcIlxcXFwwMEIwXFxcIlxcbn1cXG5cXG4udmlldy1tb3JlLWJ0bntcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBmb250LXdlaWdodDogMzAwXFxufVxcblxcbi52aWV3LW1vcmUtYnRuOjphZnRlcntcXG4gICAgY29udGVudDogXFxcIiArXFxcIjtcXG4gICAgZm9udC1zaXplOiBsYXJnZXI7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxufVxcblxcbi52aWV3LW1vcmUtYnRuOmhvdmVye1xcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLmRheS1jb250ZW50LWV4dHJhe1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uYWN0aXZlLWV4dHJhLWNvbnRlbnR7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8qIEBsaWNlbnNlXG5QYXBhIFBhcnNlXG52NS40LjFcbmh0dHBzOi8vZ2l0aHViLmNvbS9taG9sdC9QYXBhUGFyc2VcbkxpY2Vuc2U6IE1JVFxuKi9cbiFmdW5jdGlvbihlLHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dCgpOmUuUGFwYT10KCl9KHRoaXMsZnVuY3Rpb24gcygpe1widXNlIHN0cmljdFwiO3ZhciBmPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dm9pZCAwIT09Zj9mOnt9O3ZhciBuPSFmLmRvY3VtZW50JiYhIWYucG9zdE1lc3NhZ2Usbz1mLklTX1BBUEFfV09SS0VSfHwhMSxhPXt9LHU9MCxiPXtwYXJzZTpmdW5jdGlvbihlLHQpe3ZhciByPSh0PXR8fHt9KS5keW5hbWljVHlwaW5nfHwhMTtKKHIpJiYodC5keW5hbWljVHlwaW5nRnVuY3Rpb249cixyPXt9KTtpZih0LmR5bmFtaWNUeXBpbmc9cix0LnRyYW5zZm9ybT0hIUoodC50cmFuc2Zvcm0pJiZ0LnRyYW5zZm9ybSx0LndvcmtlciYmYi5XT1JLRVJTX1NVUFBPUlRFRCl7dmFyIGk9ZnVuY3Rpb24oKXtpZighYi5XT1JLRVJTX1NVUFBPUlRFRClyZXR1cm4hMTt2YXIgZT0ocj1mLlVSTHx8Zi53ZWJraXRVUkx8fG51bGwsaT1zLnRvU3RyaW5nKCksYi5CTE9CX1VSTHx8KGIuQkxPQl9VUkw9ci5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1widmFyIGdsb2JhbCA9IChmdW5jdGlvbigpIHsgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gc2VsZjsgfSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHdpbmRvdzsgfSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGdsb2JhbDsgfSByZXR1cm4ge307IH0pKCk7IGdsb2JhbC5JU19QQVBBX1dPUktFUj10cnVlOyBcIixcIihcIixpLFwiKSgpO1wiXSx7dHlwZTpcInRleHQvamF2YXNjcmlwdFwifSkpKSksdD1uZXcgZi5Xb3JrZXIoZSk7dmFyIHIsaTtyZXR1cm4gdC5vbm1lc3NhZ2U9Xyx0LmlkPXUrKyxhW3QuaWRdPXR9KCk7cmV0dXJuIGkudXNlclN0ZXA9dC5zdGVwLGkudXNlckNodW5rPXQuY2h1bmssaS51c2VyQ29tcGxldGU9dC5jb21wbGV0ZSxpLnVzZXJFcnJvcj10LmVycm9yLHQuc3RlcD1KKHQuc3RlcCksdC5jaHVuaz1KKHQuY2h1bmspLHQuY29tcGxldGU9Sih0LmNvbXBsZXRlKSx0LmVycm9yPUoodC5lcnJvciksZGVsZXRlIHQud29ya2VyLHZvaWQgaS5wb3N0TWVzc2FnZSh7aW5wdXQ6ZSxjb25maWc6dCx3b3JrZXJJZDppLmlkfSl9dmFyIG49bnVsbDtiLk5PREVfU1RSRUFNX0lOUFVULFwic3RyaW5nXCI9PXR5cGVvZiBlPyhlPWZ1bmN0aW9uKGUpe2lmKDY1Mjc5PT09ZS5jaGFyQ29kZUF0KDApKXJldHVybiBlLnNsaWNlKDEpO3JldHVybiBlfShlKSxuPXQuZG93bmxvYWQ/bmV3IGwodCk6bmV3IHAodCkpOiEwPT09ZS5yZWFkYWJsZSYmSihlLnJlYWQpJiZKKGUub24pP249bmV3IGcodCk6KGYuRmlsZSYmZSBpbnN0YW5jZW9mIEZpbGV8fGUgaW5zdGFuY2VvZiBPYmplY3QpJiYobj1uZXcgYyh0KSk7cmV0dXJuIG4uc3RyZWFtKGUpfSx1bnBhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIG49ITEsXz0hMCxtPVwiLFwiLHk9XCJcXHJcXG5cIixzPSdcIicsYT1zK3Mscj0hMSxpPW51bGwsbz0hMTshZnVuY3Rpb24oKXtpZihcIm9iamVjdFwiIT10eXBlb2YgdClyZXR1cm47XCJzdHJpbmdcIiE9dHlwZW9mIHQuZGVsaW1pdGVyfHxiLkJBRF9ERUxJTUlURVJTLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4tMSE9PXQuZGVsaW1pdGVyLmluZGV4T2YoZSl9KS5sZW5ndGh8fChtPXQuZGVsaW1pdGVyKTsoXCJib29sZWFuXCI9PXR5cGVvZiB0LnF1b3Rlc3x8XCJmdW5jdGlvblwiPT10eXBlb2YgdC5xdW90ZXN8fEFycmF5LmlzQXJyYXkodC5xdW90ZXMpKSYmKG49dC5xdW90ZXMpO1wiYm9vbGVhblwiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lcyYmXCJzdHJpbmdcIiE9dHlwZW9mIHQuc2tpcEVtcHR5TGluZXN8fChyPXQuc2tpcEVtcHR5TGluZXMpO1wic3RyaW5nXCI9PXR5cGVvZiB0Lm5ld2xpbmUmJih5PXQubmV3bGluZSk7XCJzdHJpbmdcIj09dHlwZW9mIHQucXVvdGVDaGFyJiYocz10LnF1b3RlQ2hhcik7XCJib29sZWFuXCI9PXR5cGVvZiB0LmhlYWRlciYmKF89dC5oZWFkZXIpO2lmKEFycmF5LmlzQXJyYXkodC5jb2x1bW5zKSl7aWYoMD09PXQuY29sdW1ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiT3B0aW9uIGNvbHVtbnMgaXMgZW1wdHlcIik7aT10LmNvbHVtbnN9dm9pZCAwIT09dC5lc2NhcGVDaGFyJiYoYT10LmVzY2FwZUNoYXIrcyk7KFwiYm9vbGVhblwiPT10eXBlb2YgdC5lc2NhcGVGb3JtdWxhZXx8dC5lc2NhcGVGb3JtdWxhZSBpbnN0YW5jZW9mIFJlZ0V4cCkmJihvPXQuZXNjYXBlRm9ybXVsYWUgaW5zdGFuY2VvZiBSZWdFeHA/dC5lc2NhcGVGb3JtdWxhZTovXls9K1xcLUBcXHRcXHJdLiokLyl9KCk7dmFyIHU9bmV3IFJlZ0V4cChRKHMpLFwiZ1wiKTtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSk7aWYoQXJyYXkuaXNBcnJheShlKSl7aWYoIWUubGVuZ3RofHxBcnJheS5pc0FycmF5KGVbMF0pKXJldHVybiBoKG51bGwsZSxyKTtpZihcIm9iamVjdFwiPT10eXBlb2YgZVswXSlyZXR1cm4gaChpfHxPYmplY3Qua2V5cyhlWzBdKSxlLHIpfWVsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGUpcmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGUuZGF0YSYmKGUuZGF0YT1KU09OLnBhcnNlKGUuZGF0YSkpLEFycmF5LmlzQXJyYXkoZS5kYXRhKSYmKGUuZmllbGRzfHwoZS5maWVsZHM9ZS5tZXRhJiZlLm1ldGEuZmllbGRzfHxpKSxlLmZpZWxkc3x8KGUuZmllbGRzPUFycmF5LmlzQXJyYXkoZS5kYXRhWzBdKT9lLmZpZWxkczpcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdP09iamVjdC5rZXlzKGUuZGF0YVswXSk6W10pLEFycmF5LmlzQXJyYXkoZS5kYXRhWzBdKXx8XCJvYmplY3RcIj09dHlwZW9mIGUuZGF0YVswXXx8KGUuZGF0YT1bZS5kYXRhXSkpLGgoZS5maWVsZHN8fFtdLGUuZGF0YXx8W10scik7dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHNlcmlhbGl6ZSB1bnJlY29nbml6ZWQgaW5wdXRcIik7ZnVuY3Rpb24gaChlLHQscil7dmFyIGk9XCJcIjtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSksXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PUpTT04ucGFyc2UodCkpO3ZhciBuPUFycmF5LmlzQXJyYXkoZSkmJjA8ZS5sZW5ndGgscz0hQXJyYXkuaXNBcnJheSh0WzBdKTtpZihuJiZfKXtmb3IodmFyIGE9MDthPGUubGVuZ3RoO2ErKykwPGEmJihpKz1tKSxpKz12KGVbYV0sYSk7MDx0Lmxlbmd0aCYmKGkrPXkpfWZvcih2YXIgbz0wO288dC5sZW5ndGg7bysrKXt2YXIgdT1uP2UubGVuZ3RoOnRbb10ubGVuZ3RoLGg9ITEsZj1uPzA9PT1PYmplY3Qua2V5cyh0W29dKS5sZW5ndGg6MD09PXRbb10ubGVuZ3RoO2lmKHImJiFuJiYoaD1cImdyZWVkeVwiPT09cj9cIlwiPT09dFtvXS5qb2luKFwiXCIpLnRyaW0oKToxPT09dFtvXS5sZW5ndGgmJjA9PT10W29dWzBdLmxlbmd0aCksXCJncmVlZHlcIj09PXImJm4pe2Zvcih2YXIgZD1bXSxsPTA7bDx1O2wrKyl7dmFyIGM9cz9lW2xdOmw7ZC5wdXNoKHRbb11bY10pfWg9XCJcIj09PWQuam9pbihcIlwiKS50cmltKCl9aWYoIWgpe2Zvcih2YXIgcD0wO3A8dTtwKyspezA8cCYmIWYmJihpKz1tKTt2YXIgZz1uJiZzP2VbcF06cDtpKz12KHRbb11bZ10scCl9bzx0Lmxlbmd0aC0xJiYoIXJ8fDA8dSYmIWYpJiYoaSs9eSl9fXJldHVybiBpfWZ1bmN0aW9uIHYoZSx0KXtpZihudWxsPT1lKXJldHVyblwiXCI7aWYoZS5jb25zdHJ1Y3Rvcj09PURhdGUpcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpLnNsaWNlKDEsMjUpO3ZhciByPSExO28mJlwic3RyaW5nXCI9PXR5cGVvZiBlJiZvLnRlc3QoZSkmJihlPVwiJ1wiK2Uscj0hMCk7dmFyIGk9ZS50b1N0cmluZygpLnJlcGxhY2UodSxhKTtyZXR1cm4ocj1yfHwhMD09PW58fFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oZSx0KXx8QXJyYXkuaXNBcnJheShuKSYmblt0XXx8ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKylpZigtMTxlLmluZGV4T2YodFtyXSkpcmV0dXJuITA7cmV0dXJuITF9KGksYi5CQURfREVMSU1JVEVSUyl8fC0xPGkuaW5kZXhPZihtKXx8XCIgXCI9PT1pLmNoYXJBdCgwKXx8XCIgXCI9PT1pLmNoYXJBdChpLmxlbmd0aC0xKSk/cytpK3M6aX19fTtpZihiLlJFQ09SRF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMCksYi5VTklUX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMxKSxiLkJZVEVfT1JERVJfTUFSSz1cIlxcdWZlZmZcIixiLkJBRF9ERUxJTUlURVJTPVtcIlxcclwiLFwiXFxuXCIsJ1wiJyxiLkJZVEVfT1JERVJfTUFSS10sYi5XT1JLRVJTX1NVUFBPUlRFRD0hbiYmISFmLldvcmtlcixiLk5PREVfU1RSRUFNX0lOUFVUPTEsYi5Mb2NhbENodW5rU2l6ZT0xMDQ4NTc2MCxiLlJlbW90ZUNodW5rU2l6ZT01MjQyODgwLGIuRGVmYXVsdERlbGltaXRlcj1cIixcIixiLlBhcnNlcj1FLGIuUGFyc2VySGFuZGxlPXIsYi5OZXR3b3JrU3RyZWFtZXI9bCxiLkZpbGVTdHJlYW1lcj1jLGIuU3RyaW5nU3RyZWFtZXI9cCxiLlJlYWRhYmxlU3RyZWFtU3RyZWFtZXI9ZyxmLmpRdWVyeSl7dmFyIGQ9Zi5qUXVlcnk7ZC5mbi5wYXJzZT1mdW5jdGlvbihvKXt2YXIgcj1vLmNvbmZpZ3x8e30sdT1bXTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKCEoXCJJTlBVVFwiPT09ZCh0aGlzKS5wcm9wKFwidGFnTmFtZVwiKS50b1VwcGVyQ2FzZSgpJiZcImZpbGVcIj09PWQodGhpcykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSYmZi5GaWxlUmVhZGVyKXx8IXRoaXMuZmlsZXN8fDA9PT10aGlzLmZpbGVzLmxlbmd0aClyZXR1cm4hMDtmb3IodmFyIHQ9MDt0PHRoaXMuZmlsZXMubGVuZ3RoO3QrKyl1LnB1c2goe2ZpbGU6dGhpcy5maWxlc1t0XSxpbnB1dEVsZW06dGhpcyxpbnN0YW5jZUNvbmZpZzpkLmV4dGVuZCh7fSxyKX0pfSksZSgpLHRoaXM7ZnVuY3Rpb24gZSgpe2lmKDAhPT11Lmxlbmd0aCl7dmFyIGUsdCxyLGksbj11WzBdO2lmKEooby5iZWZvcmUpKXt2YXIgcz1vLmJlZm9yZShuLmZpbGUsbi5pbnB1dEVsZW0pO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBzKXtpZihcImFib3J0XCI9PT1zLmFjdGlvbilyZXR1cm4gZT1cIkFib3J0RXJyb3JcIix0PW4uZmlsZSxyPW4uaW5wdXRFbGVtLGk9cy5yZWFzb24sdm9pZChKKG8uZXJyb3IpJiZvLmVycm9yKHtuYW1lOmV9LHQscixpKSk7aWYoXCJza2lwXCI9PT1zLmFjdGlvbilyZXR1cm4gdm9pZCBoKCk7XCJvYmplY3RcIj09dHlwZW9mIHMuY29uZmlnJiYobi5pbnN0YW5jZUNvbmZpZz1kLmV4dGVuZChuLmluc3RhbmNlQ29uZmlnLHMuY29uZmlnKSl9ZWxzZSBpZihcInNraXBcIj09PXMpcmV0dXJuIHZvaWQgaCgpfXZhciBhPW4uaW5zdGFuY2VDb25maWcuY29tcGxldGU7bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZT1mdW5jdGlvbihlKXtKKGEpJiZhKGUsbi5maWxlLG4uaW5wdXRFbGVtKSxoKCl9LGIucGFyc2Uobi5maWxlLG4uaW5zdGFuY2VDb25maWcpfWVsc2UgSihvLmNvbXBsZXRlKSYmby5jb21wbGV0ZSgpfWZ1bmN0aW9uIGgoKXt1LnNwbGljZSgwLDEpLGUoKX19fWZ1bmN0aW9uIGgoZSl7dGhpcy5faGFuZGxlPW51bGwsdGhpcy5fZmluaXNoZWQ9ITEsdGhpcy5fY29tcGxldGVkPSExLHRoaXMuX2hhbHRlZD0hMSx0aGlzLl9pbnB1dD1udWxsLHRoaXMuX2Jhc2VJbmRleD0wLHRoaXMuX3BhcnRpYWxMaW5lPVwiXCIsdGhpcy5fcm93Q291bnQ9MCx0aGlzLl9zdGFydD0wLHRoaXMuX25leHRDaHVuaz1udWxsLHRoaXMuaXNGaXJzdENodW5rPSEwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX0sZnVuY3Rpb24oZSl7dmFyIHQ9dyhlKTt0LmNodW5rU2l6ZT1wYXJzZUludCh0LmNodW5rU2l6ZSksZS5zdGVwfHxlLmNodW5rfHwodC5jaHVua1NpemU9bnVsbCk7dGhpcy5faGFuZGxlPW5ldyByKHQpLCh0aGlzLl9oYW5kbGUuc3RyZWFtZXI9dGhpcykuX2NvbmZpZz10fS5jYWxsKHRoaXMsZSksdGhpcy5wYXJzZUNodW5rPWZ1bmN0aW9uKGUsdCl7aWYodGhpcy5pc0ZpcnN0Q2h1bmsmJkoodGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmspKXt2YXIgcj10aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuayhlKTt2b2lkIDAhPT1yJiYoZT1yKX10aGlzLmlzRmlyc3RDaHVuaz0hMSx0aGlzLl9oYWx0ZWQ9ITE7dmFyIGk9dGhpcy5fcGFydGlhbExpbmUrZTt0aGlzLl9wYXJ0aWFsTGluZT1cIlwiO3ZhciBuPXRoaXMuX2hhbmRsZS5wYXJzZShpLHRoaXMuX2Jhc2VJbmRleCwhdGhpcy5fZmluaXNoZWQpO2lmKCF0aGlzLl9oYW5kbGUucGF1c2VkKCkmJiF0aGlzLl9oYW5kbGUuYWJvcnRlZCgpKXt2YXIgcz1uLm1ldGEuY3Vyc29yO3RoaXMuX2ZpbmlzaGVkfHwodGhpcy5fcGFydGlhbExpbmU9aS5zdWJzdHJpbmcocy10aGlzLl9iYXNlSW5kZXgpLHRoaXMuX2Jhc2VJbmRleD1zKSxuJiZuLmRhdGEmJih0aGlzLl9yb3dDb3VudCs9bi5kYXRhLmxlbmd0aCk7dmFyIGE9dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiZ0aGlzLl9yb3dDb3VudD49dGhpcy5fY29uZmlnLnByZXZpZXc7aWYobylmLnBvc3RNZXNzYWdlKHtyZXN1bHRzOm4sd29ya2VySWQ6Yi5XT1JLRVJfSUQsZmluaXNoZWQ6YX0pO2Vsc2UgaWYoSih0aGlzLl9jb25maWcuY2h1bmspJiYhdCl7aWYodGhpcy5fY29uZmlnLmNodW5rKG4sdGhpcy5faGFuZGxlKSx0aGlzLl9oYW5kbGUucGF1c2VkKCl8fHRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpcmV0dXJuIHZvaWQodGhpcy5faGFsdGVkPSEwKTtuPXZvaWQgMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9dm9pZCAwfXJldHVybiB0aGlzLl9jb25maWcuc3RlcHx8dGhpcy5fY29uZmlnLmNodW5rfHwodGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGE9dGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGEuY29uY2F0KG4uZGF0YSksdGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycz10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzLmNvbmNhdChuLmVycm9ycyksdGhpcy5fY29tcGxldGVSZXN1bHRzLm1ldGE9bi5tZXRhKSx0aGlzLl9jb21wbGV0ZWR8fCFhfHwhSih0aGlzLl9jb25maWcuY29tcGxldGUpfHxuJiZuLm1ldGEuYWJvcnRlZHx8KHRoaXMuX2NvbmZpZy5jb21wbGV0ZSh0aGlzLl9jb21wbGV0ZVJlc3VsdHMsdGhpcy5faW5wdXQpLHRoaXMuX2NvbXBsZXRlZD0hMCksYXx8biYmbi5tZXRhLnBhdXNlZHx8dGhpcy5fbmV4dENodW5rKCksbn10aGlzLl9oYWx0ZWQ9ITB9LHRoaXMuX3NlbmRFcnJvcj1mdW5jdGlvbihlKXtKKHRoaXMuX2NvbmZpZy5lcnJvcik/dGhpcy5fY29uZmlnLmVycm9yKGUpOm8mJnRoaXMuX2NvbmZpZy5lcnJvciYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQsZXJyb3I6ZSxmaW5pc2hlZDohMX0pfX1mdW5jdGlvbiBsKGUpe3ZhciBpOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLlJlbW90ZUNodW5rU2l6ZSksaC5jYWxsKHRoaXMsZSksdGhpcy5fbmV4dENodW5rPW4/ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKSx0aGlzLl9jaHVua0xvYWRlZCgpfTpmdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXtpZih0aGlzLl9maW5pc2hlZCl0aGlzLl9jaHVua0xvYWRlZCgpO2Vsc2V7aWYoaT1uZXcgWE1MSHR0cFJlcXVlc3QsdGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyYmKGkud2l0aENyZWRlbnRpYWxzPXRoaXMuX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpLG58fChpLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLGkub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpLGkub3Blbih0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0Qm9keT9cIlBPU1RcIjpcIkdFVFwiLHRoaXMuX2lucHV0LCFuKSx0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycyl7dmFyIGU9dGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEhlYWRlcnM7Zm9yKHZhciB0IGluIGUpaS5zZXRSZXF1ZXN0SGVhZGVyKHQsZVt0XSl9aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIHI9dGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZS0xO2kuc2V0UmVxdWVzdEhlYWRlcihcIlJhbmdlXCIsXCJieXRlcz1cIit0aGlzLl9zdGFydCtcIi1cIityKX10cnl7aS5zZW5kKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5KX1jYXRjaChlKXt0aGlzLl9jaHVua0Vycm9yKGUubWVzc2FnZSl9biYmMD09PWkuc3RhdHVzJiZ0aGlzLl9jaHVua0Vycm9yKCl9fSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbigpezQ9PT1pLnJlYWR5U3RhdGUmJihpLnN0YXR1czwyMDB8fDQwMDw9aS5zdGF0dXM/dGhpcy5fY2h1bmtFcnJvcigpOih0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZT90aGlzLl9jb25maWcuY2h1bmtTaXplOmkucmVzcG9uc2VUZXh0Lmxlbmd0aCx0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+PWZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVJhbmdlXCIpO2lmKG51bGw9PT10KXJldHVybi0xO3JldHVybiBwYXJzZUludCh0LnN1YnN0cmluZyh0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKSl9KGkpLHRoaXMucGFyc2VDaHVuayhpLnJlc3BvbnNlVGV4dCkpKX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbihlKXt2YXIgdD1pLnN0YXR1c1RleHR8fGU7dGhpcy5fc2VuZEVycm9yKG5ldyBFcnJvcih0KSl9fWZ1bmN0aW9uIGMoZSl7dmFyIGksbjsoZT1lfHx7fSkuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Yi5Mb2NhbENodW5rU2l6ZSksaC5jYWxsKHRoaXMsZSk7dmFyIHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSxuPWUuc2xpY2V8fGUud2Via2l0U2xpY2V8fGUubW96U2xpY2Uscz8oKGk9bmV3IEZpbGVSZWFkZXIpLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLGkub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpOmk9bmV3IEZpbGVSZWFkZXJTeW5jLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJiEodGhpcy5fcm93Q291bnQ8dGhpcy5fY29uZmlnLnByZXZpZXcpfHx0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5faW5wdXQ7aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIHQ9TWF0aC5taW4odGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9pbnB1dC5zaXplKTtlPW4uY2FsbChlLHRoaXMuX3N0YXJ0LHQpfXZhciByPWkucmVhZEFzVGV4dChlLHRoaXMuX2NvbmZpZy5lbmNvZGluZyk7c3x8dGhpcy5fY2h1bmtMb2FkZWQoe3RhcmdldDp7cmVzdWx0OnJ9fSl9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49dGhpcy5faW5wdXQuc2l6ZSx0aGlzLnBhcnNlQ2h1bmsoZS50YXJnZXQucmVzdWx0KX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbigpe3RoaXMuX3NlbmRFcnJvcihpLmVycm9yKX19ZnVuY3Rpb24gcChlKXt2YXIgcjtoLmNhbGwodGhpcyxlPWV8fHt9KSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXtyZXR1cm4gcj1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXtpZighdGhpcy5fZmluaXNoZWQpe3ZhciBlLHQ9dGhpcy5fY29uZmlnLmNodW5rU2l6ZTtyZXR1cm4gdD8oZT1yLnN1YnN0cmluZygwLHQpLHI9ci5zdWJzdHJpbmcodCkpOihlPXIscj1cIlwiKSx0aGlzLl9maW5pc2hlZD0hcix0aGlzLnBhcnNlQ2h1bmsoZSl9fX1mdW5jdGlvbiBnKGUpe2guY2FsbCh0aGlzLGU9ZXx8e30pO3ZhciB0PVtdLHI9ITAsaT0hMTt0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7aC5wcm90b3R5cGUucGF1c2UuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnBhdXNlKCl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7aC5wcm90b3R5cGUucmVzdW1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLl9pbnB1dC5yZXN1bWUoKX0sdGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSx0aGlzLl9pbnB1dC5vbihcImRhdGFcIix0aGlzLl9zdHJlYW1EYXRhKSx0aGlzLl9pbnB1dC5vbihcImVuZFwiLHRoaXMuX3N0cmVhbUVuZCksdGhpcy5faW5wdXQub24oXCJlcnJvclwiLHRoaXMuX3N0cmVhbUVycm9yKX0sdGhpcy5fY2hlY2tJc0ZpbmlzaGVkPWZ1bmN0aW9uKCl7aSYmMT09PXQubGVuZ3RoJiYodGhpcy5fZmluaXNoZWQ9ITApfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0Lmxlbmd0aD90aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKTpyPSEwfSx0aGlzLl9zdHJlYW1EYXRhPXYoZnVuY3Rpb24oZSl7dHJ5e3QucHVzaChcInN0cmluZ1wiPT10eXBlb2YgZT9lOmUudG9TdHJpbmcodGhpcy5fY29uZmlnLmVuY29kaW5nKSksciYmKHI9ITEsdGhpcy5fY2hlY2tJc0ZpbmlzaGVkKCksdGhpcy5wYXJzZUNodW5rKHQuc2hpZnQoKSkpfWNhdGNoKGUpe3RoaXMuX3N0cmVhbUVycm9yKGUpfX0sdGhpcyksdGhpcy5fc3RyZWFtRXJyb3I9dihmdW5jdGlvbihlKXt0aGlzLl9zdHJlYW1DbGVhblVwKCksdGhpcy5fc2VuZEVycm9yKGUpfSx0aGlzKSx0aGlzLl9zdHJlYW1FbmQ9dihmdW5jdGlvbigpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSxpPSEwLHRoaXMuX3N0cmVhbURhdGEoXCJcIil9LHRoaXMpLHRoaXMuX3N0cmVhbUNsZWFuVXA9dihmdW5jdGlvbigpe3RoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzKX1mdW5jdGlvbiByKG0pe3ZhciBhLG8sdSxpPU1hdGgucG93KDIsNTMpLG49LWkscz0vXlxccyotPyhcXGQrXFwuP3xcXC5cXGQrfFxcZCtcXC5cXGQrKShbZUVdWy0rXT9cXGQrKT9cXHMqJC8saD0vXigoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGRcXC5cXGQrKFsrLV1bMC0yXVxcZDpbMC01XVxcZHxaKSl8KFxcZHs0fS1bMDFdXFxkLVswLTNdXFxkVFswLTJdXFxkOlswLTVdXFxkOlswLTVdXFxkKFsrLV1bMC0yXVxcZDpbMC01XVxcZHxaKSl8KFxcZHs0fS1bMDFdXFxkLVswLTNdXFxkVFswLTJdXFxkOlswLTVdXFxkKFsrLV1bMC0yXVxcZDpbMC01XVxcZHxaKSkpJC8sdD10aGlzLHI9MCxmPTAsZD0hMSxlPSExLGw9W10sYz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX07aWYoSihtLnN0ZXApKXt2YXIgcD1tLnN0ZXA7bS5zdGVwPWZ1bmN0aW9uKGUpe2lmKGM9ZSxfKCkpZygpO2Vsc2V7aWYoZygpLDA9PT1jLmRhdGEubGVuZ3RoKXJldHVybjtyKz1lLmRhdGEubGVuZ3RoLG0ucHJldmlldyYmcj5tLnByZXZpZXc/by5hYm9ydCgpOihjLmRhdGE9Yy5kYXRhWzBdLHAoYyx0KSl9fX1mdW5jdGlvbiB5KGUpe3JldHVyblwiZ3JlZWR5XCI9PT1tLnNraXBFbXB0eUxpbmVzP1wiXCI9PT1lLmpvaW4oXCJcIikudHJpbSgpOjE9PT1lLmxlbmd0aCYmMD09PWVbMF0ubGVuZ3RofWZ1bmN0aW9uIGcoKXtyZXR1cm4gYyYmdSYmKGsoXCJEZWxpbWl0ZXJcIixcIlVuZGV0ZWN0YWJsZURlbGltaXRlclwiLFwiVW5hYmxlIHRvIGF1dG8tZGV0ZWN0IGRlbGltaXRpbmcgY2hhcmFjdGVyOyBkZWZhdWx0ZWQgdG8gJ1wiK2IuRGVmYXVsdERlbGltaXRlcitcIidcIiksdT0hMSksbS5za2lwRW1wdHlMaW5lcyYmKGMuZGF0YT1jLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiF5KGUpfSkpLF8oKSYmZnVuY3Rpb24oKXtpZighYylyZXR1cm47ZnVuY3Rpb24gZShlLHQpe0oobS50cmFuc2Zvcm1IZWFkZXIpJiYoZT1tLnRyYW5zZm9ybUhlYWRlcihlLHQpKSxsLnB1c2goZSl9aWYoQXJyYXkuaXNBcnJheShjLmRhdGFbMF0pKXtmb3IodmFyIHQ9MDtfKCkmJnQ8Yy5kYXRhLmxlbmd0aDt0KyspYy5kYXRhW3RdLmZvckVhY2goZSk7Yy5kYXRhLnNwbGljZSgwLDEpfWVsc2UgYy5kYXRhLmZvckVhY2goZSl9KCksZnVuY3Rpb24oKXtpZighY3x8IW0uaGVhZGVyJiYhbS5keW5hbWljVHlwaW5nJiYhbS50cmFuc2Zvcm0pcmV0dXJuIGM7ZnVuY3Rpb24gZShlLHQpe3ZhciByLGk9bS5oZWFkZXI/e306W107Zm9yKHI9MDtyPGUubGVuZ3RoO3IrKyl7dmFyIG49cixzPWVbcl07bS5oZWFkZXImJihuPXI+PWwubGVuZ3RoP1wiX19wYXJzZWRfZXh0cmFcIjpsW3JdKSxtLnRyYW5zZm9ybSYmKHM9bS50cmFuc2Zvcm0ocyxuKSkscz12KG4scyksXCJfX3BhcnNlZF9leHRyYVwiPT09bj8oaVtuXT1pW25dfHxbXSxpW25dLnB1c2gocykpOmlbbl09c31yZXR1cm4gbS5oZWFkZXImJihyPmwubGVuZ3RoP2soXCJGaWVsZE1pc21hdGNoXCIsXCJUb29NYW55RmllbGRzXCIsXCJUb28gbWFueSBmaWVsZHM6IGV4cGVjdGVkIFwiK2wubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK3IsZit0KTpyPGwubGVuZ3RoJiZrKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vRmV3RmllbGRzXCIsXCJUb28gZmV3IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrcixmK3QpKSxpfXZhciB0PTE7IWMuZGF0YS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoYy5kYXRhWzBdKT8oYy5kYXRhPWMuZGF0YS5tYXAoZSksdD1jLmRhdGEubGVuZ3RoKTpjLmRhdGE9ZShjLmRhdGEsMCk7bS5oZWFkZXImJmMubWV0YSYmKGMubWV0YS5maWVsZHM9bCk7cmV0dXJuIGYrPXQsY30oKX1mdW5jdGlvbiBfKCl7cmV0dXJuIG0uaGVhZGVyJiYwPT09bC5sZW5ndGh9ZnVuY3Rpb24gdihlLHQpe3JldHVybiByPWUsbS5keW5hbWljVHlwaW5nRnVuY3Rpb24mJnZvaWQgMD09PW0uZHluYW1pY1R5cGluZ1tyXSYmKG0uZHluYW1pY1R5cGluZ1tyXT1tLmR5bmFtaWNUeXBpbmdGdW5jdGlvbihyKSksITA9PT0obS5keW5hbWljVHlwaW5nW3JdfHxtLmR5bmFtaWNUeXBpbmcpP1widHJ1ZVwiPT09dHx8XCJUUlVFXCI9PT10fHxcImZhbHNlXCIhPT10JiZcIkZBTFNFXCIhPT10JiYoZnVuY3Rpb24oZSl7aWYocy50ZXN0KGUpKXt2YXIgdD1wYXJzZUZsb2F0KGUpO2lmKG48dCYmdDxpKXJldHVybiEwfXJldHVybiExfSh0KT9wYXJzZUZsb2F0KHQpOmgudGVzdCh0KT9uZXcgRGF0ZSh0KTpcIlwiPT09dD9udWxsOnQpOnQ7dmFyIHJ9ZnVuY3Rpb24gayhlLHQscixpKXt2YXIgbj17dHlwZTplLGNvZGU6dCxtZXNzYWdlOnJ9O3ZvaWQgMCE9PWkmJihuLnJvdz1pKSxjLmVycm9ycy5wdXNoKG4pfXRoaXMucGFyc2U9ZnVuY3Rpb24oZSx0LHIpe3ZhciBpPW0ucXVvdGVDaGFyfHwnXCInO2lmKG0ubmV3bGluZXx8KG0ubmV3bGluZT1mdW5jdGlvbihlLHQpe2U9ZS5zdWJzdHJpbmcoMCwxMDQ4NTc2KTt2YXIgcj1uZXcgUmVnRXhwKFEodCkrXCIoW15dKj8pXCIrUSh0KSxcImdtXCIpLGk9KGU9ZS5yZXBsYWNlKHIsXCJcIikpLnNwbGl0KFwiXFxyXCIpLG49ZS5zcGxpdChcIlxcblwiKSxzPTE8bi5sZW5ndGgmJm5bMF0ubGVuZ3RoPGlbMF0ubGVuZ3RoO2lmKDE9PT1pLmxlbmd0aHx8cylyZXR1cm5cIlxcblwiO2Zvcih2YXIgYT0wLG89MDtvPGkubGVuZ3RoO28rKylcIlxcblwiPT09aVtvXVswXSYmYSsrO3JldHVybiBhPj1pLmxlbmd0aC8yP1wiXFxyXFxuXCI6XCJcXHJcIn0oZSxpKSksdT0hMSxtLmRlbGltaXRlcilKKG0uZGVsaW1pdGVyKSYmKG0uZGVsaW1pdGVyPW0uZGVsaW1pdGVyKGUpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIpO2Vsc2V7dmFyIG49ZnVuY3Rpb24oZSx0LHIsaSxuKXt2YXIgcyxhLG8sdTtuPW58fFtcIixcIixcIlxcdFwiLFwifFwiLFwiO1wiLGIuUkVDT1JEX1NFUCxiLlVOSVRfU0VQXTtmb3IodmFyIGg9MDtoPG4ubGVuZ3RoO2grKyl7dmFyIGY9bltoXSxkPTAsbD0wLGM9MDtvPXZvaWQgMDtmb3IodmFyIHA9bmV3IEUoe2NvbW1lbnRzOmksZGVsaW1pdGVyOmYsbmV3bGluZTp0LHByZXZpZXc6MTB9KS5wYXJzZShlKSxnPTA7ZzxwLmRhdGEubGVuZ3RoO2crKylpZihyJiZ5KHAuZGF0YVtnXSkpYysrO2Vsc2V7dmFyIF89cC5kYXRhW2ddLmxlbmd0aDtsKz1fLHZvaWQgMCE9PW8/MDxfJiYoZCs9TWF0aC5hYnMoXy1vKSxvPV8pOm89X30wPHAuZGF0YS5sZW5ndGgmJihsLz1wLmRhdGEubGVuZ3RoLWMpLCh2b2lkIDA9PT1hfHxkPD1hKSYmKHZvaWQgMD09PXV8fHU8bCkmJjEuOTk8bCYmKGE9ZCxzPWYsdT1sKX1yZXR1cm57c3VjY2Vzc2Z1bDohIShtLmRlbGltaXRlcj1zKSxiZXN0RGVsaW1pdGVyOnN9fShlLG0ubmV3bGluZSxtLnNraXBFbXB0eUxpbmVzLG0uY29tbWVudHMsbS5kZWxpbWl0ZXJzVG9HdWVzcyk7bi5zdWNjZXNzZnVsP20uZGVsaW1pdGVyPW4uYmVzdERlbGltaXRlcjoodT0hMCxtLmRlbGltaXRlcj1iLkRlZmF1bHREZWxpbWl0ZXIpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXJ9dmFyIHM9dyhtKTtyZXR1cm4gbS5wcmV2aWV3JiZtLmhlYWRlciYmcy5wcmV2aWV3KyssYT1lLG89bmV3IEUocyksYz1vLnBhcnNlKGEsdCxyKSxnKCksZD97bWV0YTp7cGF1c2VkOiEwfX06Y3x8e21ldGE6e3BhdXNlZDohMX19fSx0aGlzLnBhdXNlZD1mdW5jdGlvbigpe3JldHVybiBkfSx0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7ZD0hMCxvLmFib3J0KCksYT1KKG0uY2h1bmspP1wiXCI6YS5zdWJzdHJpbmcoby5nZXRDaGFySW5kZXgoKSl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dC5zdHJlYW1lci5faGFsdGVkPyhkPSExLHQuc3RyZWFtZXIucGFyc2VDaHVuayhhLCEwKSk6c2V0VGltZW91dCh0LnJlc3VtZSwzKX0sdGhpcy5hYm9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGV9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtlPSEwLG8uYWJvcnQoKSxjLm1ldGEuYWJvcnRlZD0hMCxKKG0uY29tcGxldGUpJiZtLmNvbXBsZXRlKGMpLGE9XCJcIn19ZnVuY3Rpb24gUShlKXtyZXR1cm4gZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZyxcIlxcXFwkJlwiKX1mdW5jdGlvbiBFKGope3ZhciB6LE09KGo9anx8e30pLmRlbGltaXRlcixQPWoubmV3bGluZSxVPWouY29tbWVudHMscT1qLnN0ZXAsTj1qLnByZXZpZXcsQj1qLmZhc3RNb2RlLEs9ej12b2lkIDA9PT1qLnF1b3RlQ2hhcnx8bnVsbD09PWoucXVvdGVDaGFyPydcIic6ai5xdW90ZUNoYXI7aWYodm9pZCAwIT09ai5lc2NhcGVDaGFyJiYoSz1qLmVzY2FwZUNoYXIpLChcInN0cmluZ1wiIT10eXBlb2YgTXx8LTE8Yi5CQURfREVMSU1JVEVSUy5pbmRleE9mKE0pKSYmKE09XCIsXCIpLFU9PT1NKXRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgY2hhcmFjdGVyIHNhbWUgYXMgZGVsaW1pdGVyXCIpOyEwPT09VT9VPVwiI1wiOihcInN0cmluZ1wiIT10eXBlb2YgVXx8LTE8Yi5CQURfREVMSU1JVEVSUy5pbmRleE9mKFUpKSYmKFU9ITEpLFwiXFxuXCIhPT1QJiZcIlxcclwiIT09UCYmXCJcXHJcXG5cIiE9PVAmJihQPVwiXFxuXCIpO3ZhciBXPTAsSD0hMTt0aGlzLnBhcnNlPWZ1bmN0aW9uKGksdCxyKXtpZihcInN0cmluZ1wiIT10eXBlb2YgaSl0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dCBtdXN0IGJlIGEgc3RyaW5nXCIpO3ZhciBuPWkubGVuZ3RoLGU9TS5sZW5ndGgscz1QLmxlbmd0aCxhPVUubGVuZ3RoLG89SihxKSx1PVtdLGg9W10sZj1bXSxkPVc9MDtpZighaSlyZXR1cm4gTCgpO2lmKGouaGVhZGVyJiYhdCl7dmFyIGw9aS5zcGxpdChQKVswXS5zcGxpdChNKSxjPVtdLHA9e30sZz0hMTtmb3IodmFyIF8gaW4gbCl7dmFyIG09bFtfXTtKKGoudHJhbnNmb3JtSGVhZGVyKSYmKG09ai50cmFuc2Zvcm1IZWFkZXIobSxfKSk7dmFyIHk9bSx2PXBbbV18fDA7Zm9yKDA8diYmKGc9ITAseT1tK1wiX1wiK3YpLHBbbV09disxO2MuaW5jbHVkZXMoeSk7KXk9eStcIl9cIit2O2MucHVzaCh5KX1pZihnKXt2YXIgaz1pLnNwbGl0KFApO2tbMF09Yy5qb2luKE0pLGk9ay5qb2luKFApfX1pZihCfHwhMSE9PUImJi0xPT09aS5pbmRleE9mKHopKXtmb3IodmFyIGI9aS5zcGxpdChQKSxFPTA7RTxiLmxlbmd0aDtFKyspe2lmKGY9YltFXSxXKz1mLmxlbmd0aCxFIT09Yi5sZW5ndGgtMSlXKz1QLmxlbmd0aDtlbHNlIGlmKHIpcmV0dXJuIEwoKTtpZighVXx8Zi5zdWJzdHJpbmcoMCxhKSE9PVUpe2lmKG8pe2lmKHU9W10sSShmLnNwbGl0KE0pKSxGKCksSClyZXR1cm4gTCgpfWVsc2UgSShmLnNwbGl0KE0pKTtpZihOJiZOPD1FKXJldHVybiB1PXUuc2xpY2UoMCxOKSxMKCEwKX19cmV0dXJuIEwoKX1mb3IodmFyIHc9aS5pbmRleE9mKE0sVyksUj1pLmluZGV4T2YoUCxXKSxDPW5ldyBSZWdFeHAoUShLKStRKHopLFwiZ1wiKSxTPWkuaW5kZXhPZih6LFcpOzspaWYoaVtXXSE9PXopaWYoVSYmMD09PWYubGVuZ3RoJiZpLnN1YnN0cmluZyhXLFcrYSk9PT1VKXtpZigtMT09PVIpcmV0dXJuIEwoKTtXPVIrcyxSPWkuaW5kZXhPZihQLFcpLHc9aS5pbmRleE9mKE0sVyl9ZWxzZSBpZigtMSE9PXcmJih3PFJ8fC0xPT09UikpZi5wdXNoKGkuc3Vic3RyaW5nKFcsdykpLFc9dytlLHc9aS5pbmRleE9mKE0sVyk7ZWxzZXtpZigtMT09PVIpYnJlYWs7aWYoZi5wdXNoKGkuc3Vic3RyaW5nKFcsUikpLEQoUitzKSxvJiYoRigpLEgpKXJldHVybiBMKCk7aWYoTiYmdS5sZW5ndGg+PU4pcmV0dXJuIEwoITApfWVsc2UgZm9yKFM9VyxXKys7Oyl7aWYoLTE9PT0oUz1pLmluZGV4T2YoeixTKzEpKSlyZXR1cm4gcnx8aC5wdXNoKHt0eXBlOlwiUXVvdGVzXCIsY29kZTpcIk1pc3NpbmdRdW90ZXNcIixtZXNzYWdlOlwiUXVvdGVkIGZpZWxkIHVudGVybWluYXRlZFwiLHJvdzp1Lmxlbmd0aCxpbmRleDpXfSksVCgpO2lmKFM9PT1uLTEpcmV0dXJuIFQoaS5zdWJzdHJpbmcoVyxTKS5yZXBsYWNlKEMseikpO2lmKHohPT1LfHxpW1MrMV0hPT1LKXtpZih6PT09S3x8MD09PVN8fGlbUy0xXSE9PUspey0xIT09dyYmdzxTKzEmJih3PWkuaW5kZXhPZihNLFMrMSkpLC0xIT09UiYmUjxTKzEmJihSPWkuaW5kZXhPZihQLFMrMSkpO3ZhciBPPUEoLTE9PT1SP3c6TWF0aC5taW4odyxSKSk7aWYoaS5zdWJzdHIoUysxK08sZSk9PT1NKXtmLnB1c2goaS5zdWJzdHJpbmcoVyxTKS5yZXBsYWNlKEMseikpLGlbVz1TKzErTytlXSE9PXomJihTPWkuaW5kZXhPZih6LFcpKSx3PWkuaW5kZXhPZihNLFcpLFI9aS5pbmRleE9mKFAsVyk7YnJlYWt9dmFyIHg9QShSKTtpZihpLnN1YnN0cmluZyhTKzEreCxTKzEreCtzKT09PVApe2lmKGYucHVzaChpLnN1YnN0cmluZyhXLFMpLnJlcGxhY2UoQyx6KSksRChTKzEreCtzKSx3PWkuaW5kZXhPZihNLFcpLFM9aS5pbmRleE9mKHosVyksbyYmKEYoKSxIKSlyZXR1cm4gTCgpO2lmKE4mJnUubGVuZ3RoPj1OKXJldHVybiBMKCEwKTticmVha31oLnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiSW52YWxpZFF1b3Rlc1wiLG1lc3NhZ2U6XCJUcmFpbGluZyBxdW90ZSBvbiBxdW90ZWQgZmllbGQgaXMgbWFsZm9ybWVkXCIscm93OnUubGVuZ3RoLGluZGV4Old9KSxTKyt9fWVsc2UgUysrfXJldHVybiBUKCk7ZnVuY3Rpb24gSShlKXt1LnB1c2goZSksZD1XfWZ1bmN0aW9uIEEoZSl7dmFyIHQ9MDtpZigtMSE9PWUpe3ZhciByPWkuc3Vic3RyaW5nKFMrMSxlKTtyJiZcIlwiPT09ci50cmltKCkmJih0PXIubGVuZ3RoKX1yZXR1cm4gdH1mdW5jdGlvbiBUKGUpe3JldHVybiByfHwodm9pZCAwPT09ZSYmKGU9aS5zdWJzdHJpbmcoVykpLGYucHVzaChlKSxXPW4sSShmKSxvJiZGKCkpLEwoKX1mdW5jdGlvbiBEKGUpe1c9ZSxJKGYpLGY9W10sUj1pLmluZGV4T2YoUCxXKX1mdW5jdGlvbiBMKGUpe3JldHVybntkYXRhOnUsZXJyb3JzOmgsbWV0YTp7ZGVsaW1pdGVyOk0sbGluZWJyZWFrOlAsYWJvcnRlZDpILHRydW5jYXRlZDohIWUsY3Vyc29yOmQrKHR8fDApfX19ZnVuY3Rpb24gRigpe3EoTCgpKSx1PVtdLGg9W119fSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7SD0hMH0sdGhpcy5nZXRDaGFySW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gV319ZnVuY3Rpb24gXyhlKXt2YXIgdD1lLmRhdGEscj1hW3Qud29ya2VySWRdLGk9ITE7aWYodC5lcnJvcilyLnVzZXJFcnJvcih0LmVycm9yLHQuZmlsZSk7ZWxzZSBpZih0LnJlc3VsdHMmJnQucmVzdWx0cy5kYXRhKXt2YXIgbj17YWJvcnQ6ZnVuY3Rpb24oKXtpPSEwLG0odC53b3JrZXJJZCx7ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7YWJvcnRlZDohMH19KX0scGF1c2U6eSxyZXN1bWU6eX07aWYoSihyLnVzZXJTdGVwKSl7Zm9yKHZhciBzPTA7czx0LnJlc3VsdHMuZGF0YS5sZW5ndGgmJihyLnVzZXJTdGVwKHtkYXRhOnQucmVzdWx0cy5kYXRhW3NdLGVycm9yczp0LnJlc3VsdHMuZXJyb3JzLG1ldGE6dC5yZXN1bHRzLm1ldGF9LG4pLCFpKTtzKyspO2RlbGV0ZSB0LnJlc3VsdHN9ZWxzZSBKKHIudXNlckNodW5rKSYmKHIudXNlckNodW5rKHQucmVzdWx0cyxuLHQuZmlsZSksZGVsZXRlIHQucmVzdWx0cyl9dC5maW5pc2hlZCYmIWkmJm0odC53b3JrZXJJZCx0LnJlc3VsdHMpfWZ1bmN0aW9uIG0oZSx0KXt2YXIgcj1hW2VdO0ooci51c2VyQ29tcGxldGUpJiZyLnVzZXJDb21wbGV0ZSh0KSxyLnRlcm1pbmF0ZSgpLGRlbGV0ZSBhW2VdfWZ1bmN0aW9uIHkoKXt0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpfWZ1bmN0aW9uIHcoZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lKXJldHVybiBlO3ZhciB0PUFycmF5LmlzQXJyYXkoZSk/W106e307Zm9yKHZhciByIGluIGUpdFtyXT13KGVbcl0pO3JldHVybiB0fWZ1bmN0aW9uIHYoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtlLmFwcGx5KHQsYXJndW1lbnRzKX19ZnVuY3Rpb24gSihlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlfXJldHVybiBvJiYoZi5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRhO3ZvaWQgMD09PWIuV09SS0VSX0lEJiZ0JiYoYi5XT1JLRVJfSUQ9dC53b3JrZXJJZCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQuaW5wdXQpZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czpiLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpLGZpbmlzaGVkOiEwfSk7ZWxzZSBpZihmLkZpbGUmJnQuaW5wdXQgaW5zdGFuY2VvZiBGaWxlfHx0LmlucHV0IGluc3RhbmNlb2YgT2JqZWN0KXt2YXIgcj1iLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpO3ImJmYucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOmIuV09SS0VSX0lELHJlc3VsdHM6cixmaW5pc2hlZDohMH0pfX0pLChsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGgucHJvdG90eXBlKSkuY29uc3RydWN0b3I9bCwoYy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShoLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPWMsKHAucHJvdG90eXBlPU9iamVjdC5jcmVhdGUocC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1wLChnLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGgucHJvdG90eXBlKSkuY29uc3RydWN0b3I9ZyxifSk7IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJleHBvcnQgY2xhc3MgV2VhdGhlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNpdHksXG4gICAgY291bnRyeSxcbiAgICBzdGFydERhdGUsXG4gICAgZW5kRGF0ZSxcbiAgICAvLyBjb3VudHJ5LFxuICAgIC8vIG1heFRlbXAsXG4gICAgLy8gbWluVGVtcCxcbiAgICAvLyBhdmdUZW1wLFxuICAgIC8vIGRlc2NyaXB0aW9uLFxuICApIHtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgIHRoaXMuZW5kRGF0ZSA9IGVuZERhdGU7XG4gICAgdGhpcy5jb3VudHJ5ID0gY291bnRyeTtcbiAgICAvLyB0aGlzLm1heFRlbXAgPSBtYXhUZW1wO1xuICAgIC8vIHRoaXMubWluVGVtcCA9IG1pblRlbXA7XG4gICAgLy8gdGhpcy5hdmdUZW1wID0gYXZnVGVtcDtcbiAgICAvLyB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbiAgZ2V0Q2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5jaXR5O1xuICB9XG5cbiAgZ2V0U3RhcnREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0RGF0ZTtcbiAgfVxuXG4gIGdldEVuZERhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5kRGF0ZTtcbiAgfVxuICBnZXRDb3VudHJ5KCkge1xuICAgIHJldHVybiB0aGlzLmNvdW50cnk7XG4gIH1cblxuICAvLyBnZXRNYXhUZW1wKCkge1xuICAvLyAgIHJldHVybiB0aGlzLm1heFRlbXA7XG4gIC8vIH1cblxuICAvLyBnZXRNaW5UZW1wKCkge1xuICAvLyAgIHJldHVybiB0aGlzLm1pblRlbXA7XG4gIC8vIH1cbiAgLy8gZ2V0QXZnVGVtcCgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5hdmdUZW1wO1xuICAvLyB9XG5cbiAgLy8gZ2V0RGVzY3JpcHRpb24oKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgV2VhdGhlciB9IGZyb20gXCIuLi9vYmovV2VhdGhlclwiO1xuaW1wb3J0IHsgV2VhdGhlckRldGFpbHMgfSBmcm9tIFwiLi4vZnVuY3Rpb24vZmV0Y2hXZWF0aGVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgdGFibGUgfSBmcm9tIFwiLi4vZnVuY3Rpb24vbWFrZVRhYmxlXCI7XG5pbXBvcnQgeyBib2R5Q29udGVudCB9IGZyb20gXCIuLi9mdW5jdGlvbi9sb2FkZXJcIjtcbmltcG9ydCB7IHdlYXRoZXJJbmZvIH0gZnJvbSBcIi4uL2Z1bmN0aW9uL1dlYXRoZXJJbmZvXCI7XG5pbXBvcnQgeyBkYXlzT2ZXZWVrIH0gZnJvbSBcIi4uL2Z1bmN0aW9uL2RheXNPZldlZWtcIjtcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbmNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XG5jb25zdCBjb250ZW50Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcblxuY29uc3QgY29udGVudEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy9jb25zdCBjb250ZW50VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4vL2NvbnRlbnRUYWJsZS5jbGFzc0xpc3QuYWRkKFwiY29udGVudC10YWJsZVwiKTtcbmNvbnRlbnRGb3JtLmNsYXNzTGlzdC5hZGQoXCJjb250ZW50LWZvcm1cIik7XG5cbmNvbnN0IGluZm8gPSBuZXcgV2VhdGhlcihcImh1bGxcIiwgXCJ1a1wiLCBcIjIwMjMtMTItMjRcIiwgXCIyMDIzLTEyLTI1XCIpO1xuY29uc3QgZWxlbWVudHMgPSBbXG4gIFwiYWRkcmVzc1wiLFxuICBcInRlbXBcIixcbiAgXCJ0ZW1wbWluXCIsXG4gIFwidGVtcG1heFwiLFxuICBcImNvbmRpdGlvbnNcIixcbiAgXCJkZXNjcmlwdGlvblwiLFxuXTtcbi8vY29uc3Qgd2VhdGhlckNvbnRlbnQgPSBXZWF0aGVyRGV0YWlscygpLmNhbGxXZWF0aGVyQVBJKGluZm8sIGVsZW1lbnRzKTtcblxuLy9jb25zb2xlLmxvZyh3ZWF0aGVyQ29udGVudFxuXG5jb25zdCB0YWJsZURhdGEgPSB0YWJsZSgpXG4gIC5wYXJzZUNTVihgYWRkcmVzcyx0ZW1wbWF4LHRlbXBtaW4sdGVtcCxjb25kaXRpb25zLGRlc2NyaXB0aW9uXG5odWxsIHVrLDE0LjEsMTEuNywxMyxcIlJhaW4sIE92ZXJjYXN0XCIsQ2xvdWR5IHNraWVzIHRocm91Z2hvdXQgdGhlIGRheSB3aXRoIGVhcmx5IG1vcm5pbmcgcmFpbi5cbmh1bGwgdWssMTEuNCw4LjYsOS44LFwiUmFpbiwgT3ZlcmNhc3RcIixDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5IHdpdGggYSBjaGFuY2Ugb2YgcmFpbi5gKTtcblxuY29uc3QgdGFibGVCb2R5ID0gdGFibGUoKS5jcmVhdGVUYWJsZSh0YWJsZURhdGEuZGF0YSk7XG4vL2NvbnRlbnRUYWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuY29udGVudEZvcm0uYXBwZW5kQ2hpbGQoYm9keUNvbnRlbnQoKS5yZW5kZXIoKSk7XG4vL2JvZHkuYXBwZW5kQ2hpbGQodGFibGVCb2R5KTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudEZvcm0pO1xuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnV0dG9uXCIpO1xuY29uc3QgY291bnRyeU5hbWVGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeS1maWVsZFwiKTtcbmNvbnN0IGNvdW50cnlPcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VsZWN0XCIpO1xuY29uc3QgZGF0ZXNPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZSA9XCJkYXRlXCJdJyk7XG5jb25zdCB3ZWF0aGVyT3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dFtuYW1lID1cIndlYXRoZXItb3B0aW9uc1wiXTpjaGVja2VkJyxcbik7XG5cblxuXG5zdWJtaXRCdG4ub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgd2VhdGhlclZhbHVlcyA9IFtdO1xuICBsZXQgZGF0ZVZhbHVlcyA9IFtdO1xuICBjb25zdCB3ZWVrZGF5cyA9IFtcbiAgICBcIlN1bmRheVwiLFxuICAgIFwiTW9uZGF5XCIsXG4gICAgXCJUdWVzZGF5XCIsXG4gICAgXCJXZWRuZXNkYXlcIixcbiAgICBcIlRodXJzZGF5XCIsXG4gICAgXCJGcmlkYXlcIixcbiAgICBcIlNhdHVyZGF5XCIsXG4gIF07XG5cbiAgXG4gIGRhdGVzT3B0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgZGF0ZVZhbHVlcy5wdXNoKGl0ZW0udmFsdWUpO1xuICB9KTtcblxuICB3ZWF0aGVyT3B0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgd2VhdGhlclZhbHVlcy5wdXNoKGl0ZW0udmFsdWUpO1xuICB9KTtcbiAgY29uc29sZS5sb2coY291bnRyeU5hbWVGaWVsZC52YWx1ZSk7XG4gIGNvbnNvbGUubG9nKGNvdW50cnlPcHRpb24udmFsdWUpO1xuICBjb25zb2xlLmxvZyhkYXRlVmFsdWVzKTtcbiAgY29uc29sZS5sb2cod2VhdGhlclZhbHVlcyk7XG4gIC8vY29uc29sZS5sb2coaW1hZ2VzWydzbm93LnBuZyddKVxuICB3ZWF0aGVySW5mbyhqc29uKVxuICAvL2RheXNPZldlZWsoKS5jcmVhdGVEYXlzKGpzb24pXG4gIC8vIGRpc3BsYXlUYWJsZSgpO1xuICAvLyBjb250ZW50LmFwcGVuZENoaWxkKGNvbnRlbnRUYWJsZSk7XG59O1xuXG4vLyBmdW5jdGlvbiBkaXNwbGF5VGFibGUoKSB7XG4vLyAgIGNvbnRlbnQuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwiW3N0YXJ0XTFmcltzdGFydC1lbmRdIDNmciBbZW5kXVwiO1xuLy8gfVxuLy9jb25zb2xlLmxvZyh0YWJsZURhdGEuZGF0YSlcblxuY29uc3QganNvbiA9IEpTT04ucGFyc2UoYHtcInF1ZXJ5Q29zdFwiOjEsXCJsYXRpdHVkZVwiOjUzLjc0MzIsXCJsb25naXR1ZGVcIjotMC4zNDU2NSxcInJlc29sdmVkQWRkcmVzc1wiOlwiSHVsbCwgRW5nbGFuZCwgVW5pdGVkIEtpbmdkb21cIixcImFkZHJlc3NcIjpcImh1bGwgdWtcIixcInRpbWV6b25lXCI6XCJFdXJvcGUvTG9uZG9uXCIsXCJ0em9mZnNldFwiOjAuMCxcImRheXNcIjpbe1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDJcIixcInRlbXBtYXhcIjo0OC44LFwidGVtcG1pblwiOjQ0LjcsXCJ0ZW1wXCI6NDYuOSxcImljb25cIjpcInJhaW5cIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDNcIixcInRlbXBtYXhcIjo0Ni4xLFwidGVtcG1pblwiOjQxLjMsXCJ0ZW1wXCI6NDMuOSxcImljb25cIjpcInJhaW5cIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDRcIixcInRlbXBtYXhcIjo0NC45LFwidGVtcG1pblwiOjM2LjYsXCJ0ZW1wXCI6NDEuMixcImljb25cIjpcInBhcnRseS1jbG91ZHktZGF5XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTA1XCIsXCJ0ZW1wbWF4XCI6MzguOSxcInRlbXBtaW5cIjozMi4zLFwidGVtcFwiOjM1LjksXCJpY29uXCI6XCJjbG91ZHlcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDZcIixcInRlbXBtYXhcIjozOS4zLFwidGVtcG1pblwiOjM2LjgsXCJ0ZW1wXCI6MzguNCxcImljb25cIjpcImNsb3VkeVwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wN1wiLFwidGVtcG1heFwiOjM5LjgsXCJ0ZW1wbWluXCI6MzMuMCxcInRlbXBcIjozNy4wLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIn1dfWApXG4vLyAvKntcInF1ZXJ5Q29zdFwiOjEsXCJsYXRpdHVkZVwiOjUzLjc0MzIsXCJsb25naXR1ZGVcIjotMC4zNDU2NSxcInJlc29sdmVkQWRkcmVzc1wiOlwiSHVsbCwgRW5nbGFuZCwgVW5pdGVkIEtpbmdkb21cIixcImFkZHJlc3NcIjpcImh1bGwgdWtcIixcInRpbWV6b25lXCI6XCJFdXJvcGUvTG9uZG9uXCIsXCJ0em9mZnNldFwiOjAuMCxcImRheXNcIjpbe1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDJcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0MTUzNjAwLFwidGVtcG1heFwiOjQ4LjgsXCJ0ZW1wbWluXCI6NDQuNyxcInRlbXBcIjo0Ni45LFwiZmVlbHNsaWtlbWF4XCI6NDUuOSxcImZlZWxzbGlrZW1pblwiOjM4LjcsXCJmZWVsc2xpa2VcIjo0Mi4xLFwiZGV3XCI6NDQuNyxcImh1bWlkaXR5XCI6OTEuOSxcInByZWNpcFwiOjAuNjU3LFwicHJlY2lwcHJvYlwiOjEwMC4wLFwicHJlY2lwY292ZXJcIjo1OC4zMyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6MjUuNSxcIndpbmRzcGVlZFwiOjE3LjYsXCJ3aW5kZGlyXCI6MjExLjMsXCJwcmVzc3VyZVwiOjk4MS4yLFwiY2xvdWRjb3ZlclwiOjgzLjUsXCJ2aXNpYmlsaXR5XCI6NS4xLFwic29sYXJyYWRpYXRpb25cIjoyLjAsXCJzb2xhcmVuZXJneVwiOjAuMSxcInV2aW5kZXhcIjowLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE4OjUyXCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0MTgzNTMyLFwic3Vuc2V0XCI6XCIxNTo1MTo0OFwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0MjEwNzA4LFwibW9vbnBoYXNlXCI6MC43MSxcImNvbmRpdGlvbnNcIjpcIlJhaW4sIFBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJQYXJ0bHkgY2xvdWR5IHRocm91Z2hvdXQgdGhlIGRheSB3aXRoIGEgY2hhbmNlIG9mIHJhaW4gdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwicmFpblwiLFwic3RhdGlvbnNcIjpbXCJFR1hWXCIsXCJEODc5MVwiLFwiRUdYU1wiLFwiRUdOSlwiXSxcInNvdXJjZVwiOlwiY29tYlwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wM1wiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQyNDAwMDAsXCJ0ZW1wbWF4XCI6NDYuMSxcInRlbXBtaW5cIjo0MS4zLFwidGVtcFwiOjQzLjksXCJmZWVsc2xpa2VtYXhcIjo0My4xLFwiZmVlbHNsaWtlbWluXCI6MzcuMCxcImZlZWxzbGlrZVwiOjM5LjgsXCJkZXdcIjo0MS45LFwiaHVtaWRpdHlcIjo5Mi44LFwicHJlY2lwXCI6MC4xMDQsXCJwcmVjaXBwcm9iXCI6OTYuOCxcInByZWNpcGNvdmVyXCI6MzMuMzMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjE4LjYsXCJ3aW5kc3BlZWRcIjoxMS4yLFwid2luZGRpclwiOjIzOS42LFwicHJlc3N1cmVcIjo5ODcuNixcImNsb3VkY292ZXJcIjo4MC40LFwidmlzaWJpbGl0eVwiOjEzLjMsXCJzb2xhcnJhZGlhdGlvblwiOjEwLjAsXCJzb2xhcmVuZXJneVwiOjAuOCxcInV2aW5kZXhcIjoxLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE4OjM4XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0MjY5OTE4LFwic3Vuc2V0XCI6XCIxNTo1Mjo1OVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0Mjk3MTc5LFwibW9vbnBoYXNlXCI6MC43NCxcImNvbmRpdGlvbnNcIjpcIlJhaW4sIFBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJQYXJ0bHkgY2xvdWR5IHRocm91Z2hvdXQgdGhlIGRheSB3aXRoIGVhcmx5IG1vcm5pbmcgcmFpbi5cIixcImljb25cIjpcInJhaW5cIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNFwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQzMjY0MDAsXCJ0ZW1wbWF4XCI6NDQuOSxcInRlbXBtaW5cIjozNi42LFwidGVtcFwiOjQxLjIsXCJmZWVsc2xpa2VtYXhcIjo0MS4zLFwiZmVlbHNsaWtlbWluXCI6MzYuNixcImZlZWxzbGlrZVwiOjM4LjMsXCJkZXdcIjozOS42LFwiaHVtaWRpdHlcIjo5NC4zLFwicHJlY2lwXCI6MC4wLFwicHJlY2lwcHJvYlwiOjIyLjYsXCJwcmVjaXBjb3ZlclwiOjAuMCxcInByZWNpcHR5cGVcIjpbXCJyYWluXCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6MTMuNixcIndpbmRzcGVlZFwiOjguMyxcIndpbmRkaXJcIjoyMjcuOCxcInByZXNzdXJlXCI6OTk5LjEsXCJjbG91ZGNvdmVyXCI6NjYuNCxcInZpc2liaWxpdHlcIjoxNS4wLFwic29sYXJyYWRpYXRpb25cIjoyMi4xLFwic29sYXJlbmVyZ3lcIjoxLjksXCJ1dmluZGV4XCI6Mi4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxODoyMFwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDM1NjMwMCxcInN1bnNldFwiOlwiMTU6NTQ6MTNcIixcInN1bnNldEVwb2NoXCI6MTcwNDM4MzY1MyxcIm1vb25waGFzZVwiOjAuNzUsXCJjb25kaXRpb25zXCI6XCJQYXJ0aWFsbHkgY2xvdWR5XCIsXCJkZXNjcmlwdGlvblwiOlwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJwYXJ0bHktY2xvdWR5LWRheVwiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTA1XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNDQxMjgwMCxcInRlbXBtYXhcIjozOC45LFwidGVtcG1pblwiOjMyLjMsXCJ0ZW1wXCI6MzUuOSxcImZlZWxzbGlrZW1heFwiOjM4LjksXCJmZWVsc2xpa2VtaW5cIjoyOS4xLFwiZmVlbHNsaWtlXCI6MzQuMyxcImRld1wiOjM1LjcsXCJodW1pZGl0eVwiOjk4LjAsXCJwcmVjaXBcIjowLjA5NSxcInByZWNpcHByb2JcIjoxOS40LFwicHJlY2lwY292ZXJcIjoyMC44MyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6OC43LFwid2luZHNwZWVkXCI6NC43LFwid2luZGRpclwiOjI3Ni4wLFwicHJlc3N1cmVcIjoxMDA0LjgsXCJjbG91ZGNvdmVyXCI6OTYuOSxcInZpc2liaWxpdHlcIjoxNS4wLFwic29sYXJyYWRpYXRpb25cIjoyMy44LFwic29sYXJlbmVyZ3lcIjoyLjEsXCJ1dmluZGV4XCI6MS4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxNzo1OVwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDQ0MjY3OSxcInN1bnNldFwiOlwiMTU6NTU6MjlcIixcInN1bnNldEVwb2NoXCI6MTcwNDQ3MDEyOSxcIm1vb25waGFzZVwiOjAuODEsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNlwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ0OTkyMDAsXCJ0ZW1wbWF4XCI6MzkuMyxcInRlbXBtaW5cIjozNi44LFwidGVtcFwiOjM4LjQsXCJmZWVsc2xpa2VtYXhcIjozOS4zLFwiZmVlbHNsaWtlbWluXCI6MzYuMyxcImZlZWxzbGlrZVwiOjM4LjAsXCJkZXdcIjozNy4yLFwiaHVtaWRpdHlcIjo5NS4xLFwicHJlY2lwXCI6MC4wMixcInByZWNpcHByb2JcIjoxNi4xLFwicHJlY2lwY292ZXJcIjoxNi42NyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6Ny4yLFwid2luZHNwZWVkXCI6NC4wLFwid2luZGRpclwiOjIzMi42LFwicHJlc3N1cmVcIjoxMDE4LjUsXCJjbG91ZGNvdmVyXCI6OTMuMixcInZpc2liaWxpdHlcIjoxMy44LFwic29sYXJyYWRpYXRpb25cIjoyOC4xLFwic29sYXJlbmVyZ3lcIjoyLjQsXCJ1dmluZGV4XCI6Mi4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxNzozNVwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDUyOTA1NSxcInN1bnNldFwiOlwiMTU6NTY6NDhcIixcInN1bnNldEVwb2NoXCI6MTcwNDU1NjYwOCxcIm1vb25waGFzZVwiOjAuODQsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wN1wiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ1ODU2MDAsXCJ0ZW1wbWF4XCI6MzkuOCxcInRlbXBtaW5cIjozMy4wLFwidGVtcFwiOjM3LjAsXCJmZWVsc2xpa2VtYXhcIjozOC4yLFwiZmVlbHNsaWtlbWluXCI6MjYuMCxcImZlZWxzbGlrZVwiOjMzLjcsXCJkZXdcIjozMS43LFwiaHVtaWRpdHlcIjo4MS42LFwicHJlY2lwXCI6MC4wMDQsXCJwcmVjaXBwcm9iXCI6MjUuOCxcInByZWNpcGNvdmVyXCI6NC4xNyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCIsXCJzbm93XCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6MjIuNSxcIndpbmRzcGVlZFwiOjkuNyxcIndpbmRkaXJcIjozNDQuNSxcInByZXNzdXJlXCI6MTAyOS43LFwiY2xvdWRjb3ZlclwiOjUxLjgsXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6NDcuMixcInNvbGFyZW5lcmd5XCI6NC4xLFwidXZpbmRleFwiOjIuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTc6MDZcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ2MTU0MjYsXCJzdW5zZXRcIjpcIjE1OjU4OjEwXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ2NDMwOTAsXCJtb29ucGhhc2VcIjowLjg3LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIkNsZWFyaW5nIGluIHRoZSBhZnRlcm5vb24uXCIsXCJpY29uXCI6XCJwYXJ0bHktY2xvdWR5LWRheVwiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTA4XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNDY3MjAwMCxcInRlbXBtYXhcIjo0Mi41LFwidGVtcG1pblwiOjM3LjEsXCJ0ZW1wXCI6MzkuOCxcImZlZWxzbGlrZW1heFwiOjM2LjksXCJmZWVsc2xpa2VtaW5cIjozMS45LFwiZmVlbHNsaWtlXCI6MzQuMCxcImRld1wiOjMyLjgsXCJodW1pZGl0eVwiOjc1LjgsXCJwcmVjaXBcIjowLjA5MSxcInByZWNpcHByb2JcIjoyOS4wLFwicHJlY2lwY292ZXJcIjoyMC44MyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCJdLFwic25vd1wiOjAuMSxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6MjguOSxcIndpbmRzcGVlZFwiOjE2LjMsXCJ3aW5kZGlyXCI6NTAuOCxcInByZXNzdXJlXCI6MTAzNi41LFwiY2xvdWRjb3ZlclwiOjU5LjgsXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MjIuNixcInNvbGFyZW5lcmd5XCI6Mi4xLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTY6MzRcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ3MDE3OTQsXCJzdW5zZXRcIjpcIjE1OjU5OjM1XCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ3Mjk1NzUsXCJtb29ucGhhc2VcIjowLjksXCJjb25kaXRpb25zXCI6XCJQYXJ0aWFsbHkgY2xvdWR5XCIsXCJkZXNjcmlwdGlvblwiOlwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJzbm93XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDlcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0NzU4NDAwLFwidGVtcG1heFwiOjQxLjgsXCJ0ZW1wbWluXCI6MzcuMSxcInRlbXBcIjozOS43LFwiZmVlbHNsaWtlbWF4XCI6MzkuNCxcImZlZWxzbGlrZW1pblwiOjMyLjksXCJmZWVsc2xpa2VcIjozNi40LFwiZGV3XCI6MzIuMCxcImh1bWlkaXR5XCI6NzQuMSxcInByZWNpcFwiOjAuMDA0LFwicHJlY2lwcHJvYlwiOjI5LjAsXCJwcmVjaXBjb3ZlclwiOjQuMTcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjEyLjMsXCJ3aW5kc3BlZWRcIjo2LjksXCJ3aW5kZGlyXCI6MjIuNSxcInByZXNzdXJlXCI6MTAzOC4yLFwiY2xvdWRjb3ZlclwiOjc4LjAsXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MjMuMyxcInNvbGFyZW5lcmd5XCI6Mi4xLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTU6NTlcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ3ODgxNTksXCJzdW5zZXRcIjpcIjE2OjAxOjAxXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ4MTYwNjEsXCJtb29ucGhhc2VcIjowLjk0LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xMFwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ4NDQ4MDAsXCJ0ZW1wbWF4XCI6NDMuOCxcInRlbXBtaW5cIjozOS42LFwidGVtcFwiOjQyLjIsXCJmZWVsc2xpa2VtYXhcIjozOS42LFwiZmVlbHNsaWtlbWluXCI6MzUuMixcImZlZWxzbGlrZVwiOjM3LjgsXCJkZXdcIjozNi44LFwiaHVtaWRpdHlcIjo4MS4yLFwicHJlY2lwXCI6MC4wMjQsXCJwcmVjaXBwcm9iXCI6OS43LFwicHJlY2lwY292ZXJcIjoyMC44MyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6MTguNixcIndpbmRzcGVlZFwiOjguOSxcIndpbmRkaXJcIjo1MS42LFwicHJlc3N1cmVcIjoxMDM1LjQsXCJjbG91ZGNvdmVyXCI6OTcuOSxcInZpc2liaWxpdHlcIjoxNS4wLFwic29sYXJyYWRpYXRpb25cIjo5LjYsXCJzb2xhcmVuZXJneVwiOjAuNixcInV2aW5kZXhcIjowLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE1OjIwXCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0ODc0NTIwLFwic3Vuc2V0XCI6XCIxNjowMjozMVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0OTAyNTUxLFwibW9vbnBoYXNlXCI6MC45NyxcImNvbmRpdGlvbnNcIjpcIk92ZXJjYXN0XCIsXCJkZXNjcmlwdGlvblwiOlwiQ2xvdWR5IHNraWVzIHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcImNsb3VkeVwiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTExXCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNDkzMTIwMCxcInRlbXBtYXhcIjo0My4xLFwidGVtcG1pblwiOjQxLjQsXCJ0ZW1wXCI6NDEuOSxcImZlZWxzbGlrZW1heFwiOjM3LjcsXCJmZWVsc2xpa2VtaW5cIjozNi4wLFwiZmVlbHNsaWtlXCI6MzYuNyxcImRld1wiOjM1LjAsXCJodW1pZGl0eVwiOjc2LjQsXCJwcmVjaXBcIjowLjAxMixcInByZWNpcHByb2JcIjo2LjUsXCJwcmVjaXBjb3ZlclwiOjEyLjUsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjE3LjIsXCJ3aW5kc3BlZWRcIjoxMC4xLFwid2luZGRpclwiOjc2LjksXCJwcmVzc3VyZVwiOjEwMjguOCxcImNsb3VkY292ZXJcIjoxMDAuMCxcInZpc2liaWxpdHlcIjoxNS4wLFwic29sYXJyYWRpYXRpb25cIjoxMi4wLFwic29sYXJlbmVyZ3lcIjoxLjIsXCJ1dmluZGV4XCI6MS4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxNDozOFwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDk2MDg3OCxcInN1bnNldFwiOlwiMTY6MDQ6MDJcIixcInN1bnNldEVwb2NoXCI6MTcwNDk4OTA0MixcIm1vb25waGFzZVwiOjAuMCxcImNvbmRpdGlvbnNcIjpcIk92ZXJjYXN0XCIsXCJkZXNjcmlwdGlvblwiOlwiQ2xvdWR5IHNraWVzIHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcImNsb3VkeVwiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTEyXCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNTAxNzYwMCxcInRlbXBtYXhcIjo0MS42LFwidGVtcG1pblwiOjM1LjMsXCJ0ZW1wXCI6MzkuNSxcImZlZWxzbGlrZW1heFwiOjM4LjgsXCJmZWVsc2xpa2VtaW5cIjozMS4xLFwiZmVlbHNsaWtlXCI6MzYuMyxcImRld1wiOjMzLjUsXCJodW1pZGl0eVwiOjc5LjMsXCJwcmVjaXBcIjowLjAsXCJwcmVjaXBwcm9iXCI6MjIuNixcInByZWNpcGNvdmVyXCI6MC4wLFwicHJlY2lwdHlwZVwiOm51bGwsXCJzbm93XCI6MC4wLFwic25vd2RlcHRoXCI6MC4wLFwid2luZGd1c3RcIjo5LjgsXCJ3aW5kc3BlZWRcIjo1LjQsXCJ3aW5kZGlyXCI6MTU5LjUsXCJwcmVzc3VyZVwiOjEwMTMuMixcImNsb3VkY292ZXJcIjo5Mi4yLFwidmlzaWJpbGl0eVwiOjE1LjAsXCJzb2xhcnJhZGlhdGlvblwiOjM2LjksXCJzb2xhcmVuZXJneVwiOjMuMyxcInV2aW5kZXhcIjoyLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjEzOjUyXCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA1MDQ3MjMyLFwic3Vuc2V0XCI6XCIxNjowNTozNlwiLFwic3Vuc2V0RXBvY2hcIjoxNzA1MDc1NTM2LFwibW9vbnBoYXNlXCI6MC4wNCxcImNvbmRpdGlvbnNcIjpcIk92ZXJjYXN0XCIsXCJkZXNjcmlwdGlvblwiOlwiQ2xvdWR5IHNraWVzIHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcImNsb3VkeVwiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTEzXCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNTEwNDAwMCxcInRlbXBtYXhcIjo0MC45LFwidGVtcG1pblwiOjM1LjEsXCJ0ZW1wXCI6MzguNyxcImZlZWxzbGlrZW1heFwiOjM3LjEsXCJmZWVsc2xpa2VtaW5cIjozMC44LFwiZmVlbHNsaWtlXCI6MzQuMyxcImRld1wiOjM0LjcsXCJodW1pZGl0eVwiOjg1LjYsXCJwcmVjaXBcIjowLjAzNixcInByZWNpcHByb2JcIjoyMi42LFwicHJlY2lwY292ZXJcIjoxNi42NyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6MjQuOCxcIndpbmRzcGVlZFwiOjE1LjksXCJ3aW5kZGlyXCI6MjIuMCxcInByZXNzdXJlXCI6OTk2LjcsXCJjbG91ZGNvdmVyXCI6MTAwLjAsXCJ2aXNpYmlsaXR5XCI6MTQuOSxcInNvbGFycmFkaWF0aW9uXCI6Ny44LFwic29sYXJlbmVyZ3lcIjowLjYsXCJ1dmluZGV4XCI6MC4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxMzowM1wiLFwic3VucmlzZUVwb2NoXCI6MTcwNTEzMzU4MyxcInN1bnNldFwiOlwiMTY6MDc6MTJcIixcInN1bnNldEVwb2NoXCI6MTcwNTE2MjAzMixcIm1vb25waGFzZVwiOjAuMDcsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xNFwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDUxOTA0MDAsXCJ0ZW1wbWF4XCI6NDAuMCxcInRlbXBtaW5cIjozMS43LFwidGVtcFwiOjM1LjUsXCJmZWVsc2xpa2VtYXhcIjozMS43LFwiZmVlbHNsaWtlbWluXCI6MjMuMCxcImZlZWxzbGlrZVwiOjI3LjEsXCJkZXdcIjoyNy43LFwiaHVtaWRpdHlcIjo3My4zLFwicHJlY2lwXCI6MC4wMixcInByZWNpcHByb2JcIjoyMi42LFwicHJlY2lwY292ZXJcIjoxNi42NyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCIsXCJzbm93XCJdLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6MzEuMyxcIndpbmRzcGVlZFwiOjE1LjksXCJ3aW5kZGlyXCI6MzA5LjQsXCJwcmVzc3VyZVwiOjk5OC41LFwiY2xvdWRjb3ZlclwiOjkwLjEsXCJ2aXNpYmlsaXR5XCI6MTQuMyxcInNvbGFycmFkaWF0aW9uXCI6MzEuNSxcInNvbGFyZW5lcmd5XCI6Mi43LFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTI6MTFcIixcInN1bnJpc2VFcG9jaFwiOjE3MDUyMTk5MzEsXCJzdW5zZXRcIjpcIjE2OjA4OjUwXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDUyNDg1MzAsXCJtb29ucGhhc2VcIjowLjExLFwiY29uZGl0aW9uc1wiOlwiT3ZlcmNhc3RcIixcImRlc2NyaXB0aW9uXCI6XCJDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwiY2xvdWR5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMTVcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA1Mjc2ODAwLFwidGVtcG1heFwiOjM2LjIsXCJ0ZW1wbWluXCI6MzAuOCxcInRlbXBcIjozMy4wLFwiZmVlbHNsaWtlbWF4XCI6MjUuNixcImZlZWxzbGlrZW1pblwiOjE5LjAsXCJmZWVsc2xpa2VcIjoyMi4wLFwiZGV3XCI6MjYuMixcImh1bWlkaXR5XCI6NzYuNCxcInByZWNpcFwiOjAuMTk4LFwicHJlY2lwcHJvYlwiOjI5LjAsXCJwcmVjaXBjb3ZlclwiOjI5LjE3LFwicHJlY2lwdHlwZVwiOltcInJhaW5cIixcInNub3dcIl0sXCJzbm93XCI6MC44LFwic25vd2RlcHRoXCI6MC4yLFwid2luZGd1c3RcIjo0MS44LFwid2luZHNwZWVkXCI6MjQuNixcIndpbmRkaXJcIjozMTAuMSxcInByZXNzdXJlXCI6MTAwNS45LFwiY2xvdWRjb3ZlclwiOjY5LjMsXCJ2aXNpYmlsaXR5XCI6OC41LFwic29sYXJyYWRpYXRpb25cIjozNS4wLFwic29sYXJlbmVyZ3lcIjozLjAsXCJ1dmluZGV4XCI6MS4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxMToxNlwiLFwic3VucmlzZUVwb2NoXCI6MTcwNTMwNjI3NixcInN1bnNldFwiOlwiMTY6MTA6MzBcIixcInN1bnNldEVwb2NoXCI6MTcwNTMzNTAzMCxcIm1vb25waGFzZVwiOjAuMTQsXCJjb25kaXRpb25zXCI6XCJQYXJ0aWFsbHkgY2xvdWR5XCIsXCJkZXNjcmlwdGlvblwiOlwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJzbm93XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMTZcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA1MzYzMjAwLFwidGVtcG1heFwiOjM0LjEsXCJ0ZW1wbWluXCI6MjkuMixcInRlbXBcIjozMS44LFwiZmVlbHNsaWtlbWF4XCI6MjQuOSxcImZlZWxzbGlrZW1pblwiOjE5LjcsXCJmZWVsc2xpa2VcIjoyMS45LFwiZGV3XCI6MjYuMixcImh1bWlkaXR5XCI6NzkuNixcInByZWNpcFwiOjAuMDY3LFwicHJlY2lwcHJvYlwiOjE5LjQsXCJwcmVjaXBjb3ZlclwiOjIwLjgzLFwicHJlY2lwdHlwZVwiOltcInJhaW5cIixcInNub3dcIl0sXCJzbm93XCI6MC4yLFwic25vd2RlcHRoXCI6MC43LFwid2luZGd1c3RcIjozNS42LFwid2luZHNwZWVkXCI6MTcuMixcIndpbmRkaXJcIjozMDkuMSxcInByZXNzdXJlXCI6MTAxMy42LFwiY2xvdWRjb3ZlclwiOjU1LjgsXCJ2aXNpYmlsaXR5XCI6MTMuOCxcInNvbGFycmFkaWF0aW9uXCI6NDAuMCxcInNvbGFyZW5lcmd5XCI6My41LFwidXZpbmRleFwiOjIuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTA6MTdcIixcInN1bnJpc2VFcG9jaFwiOjE3MDUzOTI2MTcsXCJzdW5zZXRcIjpcIjE2OjEyOjExXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDU0MjE1MzEsXCJtb29ucGhhc2VcIjowLjE4LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwic25vd1wiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9XSxcInN0YXRpb25zXCI6e1wiRUdYVlwiOntcImRpc3RhbmNlXCI6MTUxNjUuMCxcImxhdGl0dWRlXCI6NTMuODcsXCJsb25naXR1ZGVcIjotMC40MyxcInVzZUNvdW50XCI6MCxcImlkXCI6XCJFR1hWXCIsXCJuYW1lXCI6XCJFR1hWXCIsXCJxdWFsaXR5XCI6NTAsXCJjb250cmlidXRpb25cIjowLjB9LFwiRDg3OTFcIjp7XCJkaXN0YW5jZVwiOjI5OTYuMCxcImxhdGl0dWRlXCI6NTMuNzQsXCJsb25naXR1ZGVcIjotMC4zOTEsXCJ1c2VDb3VudFwiOjAsXCJpZFwiOlwiRDg3OTFcIixcIm5hbWVcIjpcIkRXODc5MSBIdWxsIFVLXCIsXCJxdWFsaXR5XCI6MCxcImNvbnRyaWJ1dGlvblwiOjAuMH0sXCJFR1hTXCI6e1wiZGlzdGFuY2VcIjo0MzkzMS4wLFwibGF0aXR1ZGVcIjo1My40OCxcImxvbmdpdHVkZVwiOjAuMTUsXCJ1c2VDb3VudFwiOjAsXCJpZFwiOlwiRUdYU1wiLFwibmFtZVwiOlwiRUdYU1wiLFwicXVhbGl0eVwiOjQ5LFwiY29udHJpYnV0aW9uXCI6MC4wfSxcIkVHTkpcIjp7XCJkaXN0YW5jZVwiOjE4MTcwLjAsXCJsYXRpdHVkZVwiOjUzLjU4LFwibG9uZ2l0dWRlXCI6LTAuMzUsXCJ1c2VDb3VudFwiOjAsXCJpZFwiOlwiRUdOSlwiLFwibmFtZVwiOlwiRUdOSlwiLFwicXVhbGl0eVwiOjUwLFwiY29udHJpYnV0aW9uXCI6MC4wfX19ICovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=