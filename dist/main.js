/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

.content{
    height: 100vh;
    display: flex;
    flex-direction: column;
    grid-template-columns: [start]1fr [start-end]0fr [end];
    grid-auto-rows: auto;
    justify-items: center;
    align-items: center;

}

.content-table{
    padding: 10px;
    margin: 10px;
    grid-column: start-end/end;
}

.content-form{
    padding: 10px;
    /* display: flex; */
}
table{
    padding: 10px;
    margin: 0 auto;
    border: 1px solid #ff0000;
    font-size: 1rem;
    border-collapse: collapse;
    width: 80%;
}

th{
    font-size: 1.45rem;
    padding: 5px;
}
th::first-letter{
    text-transform: capitalize;
}


td{
    font-size: 1.2rem;
    width: 15%;
    height: fit-content;
    padding: 5px;
    text-align: center;
    border: 2px solid #cccc;
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
    
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":";AACA;IACI,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,sBAAsB;IACtB,gBAAgB;IAChB,yCAAyC;;AAE7C;;AAEA;IACI,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,sDAAsD;IACtD,oBAAoB;IACpB,qBAAqB;IACrB,mBAAmB;;AAEvB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;AACA;IACI,aAAa;IACb,cAAc;IACd,yBAAyB;IACzB,eAAe;IACf,yBAAyB;IACzB,UAAU;AACd;;AAEA;IACI,kBAAkB;IAClB,YAAY;AAChB;AACA;IACI,0BAA0B;AAC9B;;;AAGA;IACI,iBAAiB;IACjB,UAAU;IACV,mBAAmB;IACnB,YAAY;IACZ,kBAAkB;IAClB,uBAAuB;AAC3B;;;;AAIA;IACI,cAAc;IACd,UAAU;IACV,aAAa;;IAEb,kBAAkB;IAClB,qBAAqB;IACrB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,SAAS;IACT,cAAc;IACd,uBAAuB;IACvB,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,sBAAsB;IACtB,uBAAuB;AAC3B;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,kBAAkB;IAClB,YAAY;AAChB;;AAEA;;GAEG;;AAEH;IACI,iBAAiB;AACrB;AACA;IACI,kBAAkB;IAClB,yBAAyB;;AAE7B;;;AAGA;IACI,aAAa;IACb,eAAe;IACf,OAAO;AACX;;;AAGA;IACI,aAAa;IACb,QAAQ;AACZ;AACA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,gBAAgB;IAChB,gCAAgC;IAChC,YAAY;IACZ,SAAS;IACT,kBAAkB;IAClB,mBAAmB;;AAEvB","sourcesContent":["\n*{\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    box-sizing: border-box;\n    background: none;\n    font-family: Arial, Helvetica, sans-serif;\n\n}\n\n.content{\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    grid-template-columns: [start]1fr [start-end]0fr [end];\n    grid-auto-rows: auto;\n    justify-items: center;\n    align-items: center;\n\n}\n\n.content-table{\n    padding: 10px;\n    margin: 10px;\n    grid-column: start-end/end;\n}\n\n.content-form{\n    padding: 10px;\n    /* display: flex; */\n}\ntable{\n    padding: 10px;\n    margin: 0 auto;\n    border: 1px solid #ff0000;\n    font-size: 1rem;\n    border-collapse: collapse;\n    width: 80%;\n}\n\nth{\n    font-size: 1.45rem;\n    padding: 5px;\n}\nth::first-letter{\n    text-transform: capitalize;\n}\n\n\ntd{\n    font-size: 1.2rem;\n    width: 15%;\n    height: fit-content;\n    padding: 5px;\n    text-align: center;\n    border: 2px solid #cccc;\n}\n\n\n\nform {\n    margin: 0 auto;\n    width: 90%;\n    display: flex;\n    \n    text-align: center;\n    align-content: center;\n    align-items: center;\n    gap: 15px;\n}\n\n.form-div, .date-div{\n    display: flex;\n    gap: 15px;\n    margin: 0 auto;\n    justify-content: center;\n    align-self:flex-start ;\n    flex-wrap: wrap;\n}\n\n.form-div{\n    flex-direction: column;\n    align-items: flex-start;\n}\n\n.form-div input, .form-div select{\n    width: 90%;\n}\n\n.form-div input, .form-div select, .date-div input{\n    font-size: 1.65em;\n    border-radius: 10px;\n    text-align: center;\n    padding: 8px;\n}\n\n/* select option[disabled]:first-child {\n    display: none;\n} */\n\nlegend, .weather-options-div div label{\n    font-size: 1.55em;\n}\n.form-div select{\n    width: fit-content;\n    background-color: #efefef;\n    \n}\n\n\n.weather-options-div{\n    display: flex;\n    flex-wrap: wrap;\n    gap:8px;\n}\n\n\n.weather-options-div div{\n    display: flex;\n    gap: 5px;\n}\n.submit-button{\n    padding: 10px 22px;\n    border-radius: 10px;\n    font-size: 1.5em;\n    background-color: cornflowerblue;\n    color: white;\n    border: 0;\n    width: fit-content;\n    height: fit-content;\n    \n}"],"sourceRoot":""}]);
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






const body = document.querySelector("body");
const content = document.createElement("div");

content.classList.add("content");
const contentBody = document.querySelector(".content");

const contentForm = document.createElement("div");
const contentTable = document.createElement("div");

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
contentTable.appendChild(tableBody);
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
  let weatherValues = [];
  let dateValues = [];

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
  event.preventDefault();
  displayTable();
  content.appendChild(contentTable);
};

function displayTable() {
  content.style.gridTemplateColumns = "[start]1fr[start-end] 3fr [end]";
}
//console.log(tableData.data)


/*{"queryCost":1,"latitude":53.7432,"longitude":-0.34565,"resolvedAddress":"Hull, England, United Kingdom","address":"hull uk","timezone":"Europe/London","tzoffset":0.0,"days":[{"datetime":"2024-01-02","tempmax":48.8,"tempmin":44.7,"temp":46.9,"icon":"rain"},{"datetime":"2024-01-03","tempmax":46.1,"tempmin":41.3,"temp":43.9,"icon":"rain"},{"datetime":"2024-01-04","tempmax":44.9,"tempmin":36.6,"temp":41.2,"icon":"partly-cloudy-day"},{"datetime":"2024-01-05","tempmax":38.9,"tempmin":32.3,"temp":35.9,"icon":"cloudy"},{"datetime":"2024-01-06","tempmax":39.3,"tempmin":36.8,"temp":38.4,"icon":"cloudy"},{"datetime":"2024-01-07","tempmax":39.8,"tempmin":33.0,"temp":37.0,"icon":"partly-cloudy-day"}]}` */
// /*{"queryCost":1,"latitude":53.7432,"longitude":-0.34565,"resolvedAddress":"Hull, England, United Kingdom","address":"hull uk","timezone":"Europe/London","tzoffset":0.0,"days":[{"datetime":"2024-01-02","datetimeEpoch":1704153600,"tempmax":48.8,"tempmin":44.7,"temp":46.9,"feelslikemax":45.9,"feelslikemin":38.7,"feelslike":42.1,"dew":44.7,"humidity":91.9,"precip":0.657,"precipprob":100.0,"precipcover":58.33,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":25.5,"windspeed":17.6,"winddir":211.3,"pressure":981.2,"cloudcover":83.5,"visibility":5.1,"solarradiation":2.0,"solarenergy":0.1,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:18:52","sunriseEpoch":1704183532,"sunset":"15:51:48","sunsetEpoch":1704210708,"moonphase":0.71,"conditions":"Rain, Partially cloudy","description":"Partly cloudy throughout the day with a chance of rain throughout the day.","icon":"rain","stations":["EGXV","D8791","EGXS","EGNJ"],"source":"comb"},{"datetime":"2024-01-03","datetimeEpoch":1704240000,"tempmax":46.1,"tempmin":41.3,"temp":43.9,"feelslikemax":43.1,"feelslikemin":37.0,"feelslike":39.8,"dew":41.9,"humidity":92.8,"precip":0.104,"precipprob":96.8,"precipcover":33.33,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":18.6,"windspeed":11.2,"winddir":239.6,"pressure":987.6,"cloudcover":80.4,"visibility":13.3,"solarradiation":10.0,"solarenergy":0.8,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:18:38","sunriseEpoch":1704269918,"sunset":"15:52:59","sunsetEpoch":1704297179,"moonphase":0.74,"conditions":"Rain, Partially cloudy","description":"Partly cloudy throughout the day with early morning rain.","icon":"rain","stations":null,"source":"fcst"},{"datetime":"2024-01-04","datetimeEpoch":1704326400,"tempmax":44.9,"tempmin":36.6,"temp":41.2,"feelslikemax":41.3,"feelslikemin":36.6,"feelslike":38.3,"dew":39.6,"humidity":94.3,"precip":0.0,"precipprob":22.6,"precipcover":0.0,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":13.6,"windspeed":8.3,"winddir":227.8,"pressure":999.1,"cloudcover":66.4,"visibility":15.0,"solarradiation":22.1,"solarenergy":1.9,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:18:20","sunriseEpoch":1704356300,"sunset":"15:54:13","sunsetEpoch":1704383653,"moonphase":0.75,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-05","datetimeEpoch":1704412800,"tempmax":38.9,"tempmin":32.3,"temp":35.9,"feelslikemax":38.9,"feelslikemin":29.1,"feelslike":34.3,"dew":35.7,"humidity":98.0,"precip":0.095,"precipprob":19.4,"precipcover":20.83,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":8.7,"windspeed":4.7,"winddir":276.0,"pressure":1004.8,"cloudcover":96.9,"visibility":15.0,"solarradiation":23.8,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:17:59","sunriseEpoch":1704442679,"sunset":"15:55:29","sunsetEpoch":1704470129,"moonphase":0.81,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-06","datetimeEpoch":1704499200,"tempmax":39.3,"tempmin":36.8,"temp":38.4,"feelslikemax":39.3,"feelslikemin":36.3,"feelslike":38.0,"dew":37.2,"humidity":95.1,"precip":0.02,"precipprob":16.1,"precipcover":16.67,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":7.2,"windspeed":4.0,"winddir":232.6,"pressure":1018.5,"cloudcover":93.2,"visibility":13.8,"solarradiation":28.1,"solarenergy":2.4,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:17:35","sunriseEpoch":1704529055,"sunset":"15:56:48","sunsetEpoch":1704556608,"moonphase":0.84,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-07","datetimeEpoch":1704585600,"tempmax":39.8,"tempmin":33.0,"temp":37.0,"feelslikemax":38.2,"feelslikemin":26.0,"feelslike":33.7,"dew":31.7,"humidity":81.6,"precip":0.004,"precipprob":25.8,"precipcover":4.17,"preciptype":["rain","snow"],"snow":0.0,"snowdepth":0.0,"windgust":22.5,"windspeed":9.7,"winddir":344.5,"pressure":1029.7,"cloudcover":51.8,"visibility":15.0,"solarradiation":47.2,"solarenergy":4.1,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:17:06","sunriseEpoch":1704615426,"sunset":"15:58:10","sunsetEpoch":1704643090,"moonphase":0.87,"conditions":"Partially cloudy","description":"Clearing in the afternoon.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-08","datetimeEpoch":1704672000,"tempmax":42.5,"tempmin":37.1,"temp":39.8,"feelslikemax":36.9,"feelslikemin":31.9,"feelslike":34.0,"dew":32.8,"humidity":75.8,"precip":0.091,"precipprob":29.0,"precipcover":20.83,"preciptype":["rain"],"snow":0.1,"snowdepth":0.0,"windgust":28.9,"windspeed":16.3,"winddir":50.8,"pressure":1036.5,"cloudcover":59.8,"visibility":15.0,"solarradiation":22.6,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:16:34","sunriseEpoch":1704701794,"sunset":"15:59:35","sunsetEpoch":1704729575,"moonphase":0.9,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"},{"datetime":"2024-01-09","datetimeEpoch":1704758400,"tempmax":41.8,"tempmin":37.1,"temp":39.7,"feelslikemax":39.4,"feelslikemin":32.9,"feelslike":36.4,"dew":32.0,"humidity":74.1,"precip":0.004,"precipprob":29.0,"precipcover":4.17,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":12.3,"windspeed":6.9,"winddir":22.5,"pressure":1038.2,"cloudcover":78.0,"visibility":15.0,"solarradiation":23.3,"solarenergy":2.1,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:15:59","sunriseEpoch":1704788159,"sunset":"16:01:01","sunsetEpoch":1704816061,"moonphase":0.94,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","stations":null,"source":"fcst"},{"datetime":"2024-01-10","datetimeEpoch":1704844800,"tempmax":43.8,"tempmin":39.6,"temp":42.2,"feelslikemax":39.6,"feelslikemin":35.2,"feelslike":37.8,"dew":36.8,"humidity":81.2,"precip":0.024,"precipprob":9.7,"precipcover":20.83,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":18.6,"windspeed":8.9,"winddir":51.6,"pressure":1035.4,"cloudcover":97.9,"visibility":15.0,"solarradiation":9.6,"solarenergy":0.6,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:15:20","sunriseEpoch":1704874520,"sunset":"16:02:31","sunsetEpoch":1704902551,"moonphase":0.97,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-11","datetimeEpoch":1704931200,"tempmax":43.1,"tempmin":41.4,"temp":41.9,"feelslikemax":37.7,"feelslikemin":36.0,"feelslike":36.7,"dew":35.0,"humidity":76.4,"precip":0.012,"precipprob":6.5,"precipcover":12.5,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":17.2,"windspeed":10.1,"winddir":76.9,"pressure":1028.8,"cloudcover":100.0,"visibility":15.0,"solarradiation":12.0,"solarenergy":1.2,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:14:38","sunriseEpoch":1704960878,"sunset":"16:04:02","sunsetEpoch":1704989042,"moonphase":0.0,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-12","datetimeEpoch":1705017600,"tempmax":41.6,"tempmin":35.3,"temp":39.5,"feelslikemax":38.8,"feelslikemin":31.1,"feelslike":36.3,"dew":33.5,"humidity":79.3,"precip":0.0,"precipprob":22.6,"precipcover":0.0,"preciptype":null,"snow":0.0,"snowdepth":0.0,"windgust":9.8,"windspeed":5.4,"winddir":159.5,"pressure":1013.2,"cloudcover":92.2,"visibility":15.0,"solarradiation":36.9,"solarenergy":3.3,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:13:52","sunriseEpoch":1705047232,"sunset":"16:05:36","sunsetEpoch":1705075536,"moonphase":0.04,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-13","datetimeEpoch":1705104000,"tempmax":40.9,"tempmin":35.1,"temp":38.7,"feelslikemax":37.1,"feelslikemin":30.8,"feelslike":34.3,"dew":34.7,"humidity":85.6,"precip":0.036,"precipprob":22.6,"precipcover":16.67,"preciptype":["rain"],"snow":0.0,"snowdepth":0.0,"windgust":24.8,"windspeed":15.9,"winddir":22.0,"pressure":996.7,"cloudcover":100.0,"visibility":14.9,"solarradiation":7.8,"solarenergy":0.6,"uvindex":0.0,"severerisk":10.0,"sunrise":"08:13:03","sunriseEpoch":1705133583,"sunset":"16:07:12","sunsetEpoch":1705162032,"moonphase":0.07,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-14","datetimeEpoch":1705190400,"tempmax":40.0,"tempmin":31.7,"temp":35.5,"feelslikemax":31.7,"feelslikemin":23.0,"feelslike":27.1,"dew":27.7,"humidity":73.3,"precip":0.02,"precipprob":22.6,"precipcover":16.67,"preciptype":["rain","snow"],"snow":0.0,"snowdepth":0.0,"windgust":31.3,"windspeed":15.9,"winddir":309.4,"pressure":998.5,"cloudcover":90.1,"visibility":14.3,"solarradiation":31.5,"solarenergy":2.7,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:12:11","sunriseEpoch":1705219931,"sunset":"16:08:50","sunsetEpoch":1705248530,"moonphase":0.11,"conditions":"Overcast","description":"Cloudy skies throughout the day.","icon":"cloudy","stations":null,"source":"fcst"},{"datetime":"2024-01-15","datetimeEpoch":1705276800,"tempmax":36.2,"tempmin":30.8,"temp":33.0,"feelslikemax":25.6,"feelslikemin":19.0,"feelslike":22.0,"dew":26.2,"humidity":76.4,"precip":0.198,"precipprob":29.0,"precipcover":29.17,"preciptype":["rain","snow"],"snow":0.8,"snowdepth":0.2,"windgust":41.8,"windspeed":24.6,"winddir":310.1,"pressure":1005.9,"cloudcover":69.3,"visibility":8.5,"solarradiation":35.0,"solarenergy":3.0,"uvindex":1.0,"severerisk":10.0,"sunrise":"08:11:16","sunriseEpoch":1705306276,"sunset":"16:10:30","sunsetEpoch":1705335030,"moonphase":0.14,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"},{"datetime":"2024-01-16","datetimeEpoch":1705363200,"tempmax":34.1,"tempmin":29.2,"temp":31.8,"feelslikemax":24.9,"feelslikemin":19.7,"feelslike":21.9,"dew":26.2,"humidity":79.6,"precip":0.067,"precipprob":19.4,"precipcover":20.83,"preciptype":["rain","snow"],"snow":0.2,"snowdepth":0.7,"windgust":35.6,"windspeed":17.2,"winddir":309.1,"pressure":1013.6,"cloudcover":55.8,"visibility":13.8,"solarradiation":40.0,"solarenergy":3.5,"uvindex":2.0,"severerisk":10.0,"sunrise":"08:10:17","sunriseEpoch":1705392617,"sunset":"16:12:11","sunsetEpoch":1705421531,"moonphase":0.18,"conditions":"Partially cloudy","description":"Partly cloudy throughout the day.","icon":"snow","stations":null,"source":"fcst"}],"stations":{"EGXV":{"distance":15165.0,"latitude":53.87,"longitude":-0.43,"useCount":0,"id":"EGXV","name":"EGXV","quality":50,"contribution":0.0},"D8791":{"distance":2996.0,"latitude":53.74,"longitude":-0.391,"useCount":0,"id":"D8791","name":"DW8791 Hull UK","quality":0,"contribution":0.0},"EGXS":{"distance":43931.0,"latitude":53.48,"longitude":0.15,"useCount":0,"id":"EGXS","name":"EGXS","quality":49,"contribution":0.0},"EGNJ":{"distance":18170.0,"latitude":53.58,"longitude":-0.35,"useCount":0,"id":"EGNJ","name":"EGNJ","quality":50,"contribution":0.0}}} */

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SEFBNEgsU0FBUyxnSUFBZ0kiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Z1bmN0aW9uL2ZldGNoV2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Z1bmN0aW9uL2xvYWRlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL2Z1bmN0aW9uL21ha2VUYWJsZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvcGFwYXBhcnNlL3BhcGFwYXJzZS5taW4uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL29iai9XZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXZWF0aGVyIH0gZnJvbSBcIi4uL29iai9XZWF0aGVyXCI7XG5cbmV4cG9ydCBjb25zdCBXZWF0aGVyRGV0YWlscyA9ICgpID0+IHtcbiAgZnVuY3Rpb24gYnVpbGRBcGlVUkwod2VhdGhlckluZm8sIGVsZW1lbnRzKSB7XG4gICAgbGV0IHVybEVuZCA9IGAmaW5jbHVkZT1kYXlzJmtleT1HR0xZRTZGODQyTTZTQzRHVkhWWFJaRjRSJmNvbnRlbnRUeXBlPWpzb25gO1xuICAgIGxldCBtYWluVXJsID0gYGh0dHBzOi8vd2VhdGhlci52aXN1YWxjcm9zc2luZy5jb20vVmlzdWFsQ3Jvc3NpbmdXZWJTZXJ2aWNlcy9yZXN0L3NlcnZpY2VzL3RpbWVsaW5lLyR7d2VhdGhlckluZm8uZ2V0Q2l0eSgpfSUyMCR7d2VhdGhlckluZm8uZ2V0Q291bnRyeSgpfS8ke3dlYXRoZXJJbmZvLmdldFN0YXJ0RGF0ZSgpfWA7XG5cbiAgICBtYWluVXJsID0gd2VhdGhlckluZm8uZ2V0RW5kRGF0ZSgpXG4gICAgICA/IGAke21haW5Vcmx9LyR7d2VhdGhlckluZm8uZ2V0RW5kRGF0ZSgpfT9gXG4gICAgICA6IGAke21haW5Vcmx9P2A7XG5cbiAgICBtYWluVXJsICs9IGB1bml0R3JvdXA9bWV0cmljJmVsZW1lbnRzPWRhdGV0aW1lJTJDcmVzb2x2ZWRBZGRyZXNzJTJDdGVtcG1heCUyQ3RlbXBtaW4lMkN0ZW1wJTJDaWNvbmA7XG5cbiAgICBsZXQgbmV3VXJsID0gZWxlbWVudHNcbiAgICAgID8gYWRkRWxlbWVudHMoYCR7bWFpblVybH0lMmAsIGVsZW1lbnRzKVxuICAgICAgOiBgJHttYWluVXJsfSZgO1xuXG4gICAgcmV0dXJuIGAke25ld1VybH0ke3VybEVuZH1gO1xuICB9XG4gIGFzeW5jIGZ1bmN0aW9uIGNhbGxXZWF0aGVyQVBJKGluZm8sIGVsZW1lbnRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybCA9IGF3YWl0IGJ1aWxkQXBpVVJMKGluZm8sIGVsZW1lbnRzKTtcbiAgICAgIC8vcmV0dXJuIHVybDtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRWxlbWVudHMoc3RyaW5nLCBlbGVtZW50cykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpICE9PSBlbGVtZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHN0cmluZyArPSBgJHtlbGVtZW50c1tpXX0lMkNgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nICs9IGAke2VsZW1lbnRzW2ldfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICByZXR1cm4geyBjYWxsV2VhdGhlckFQSSB9O1xufTtcblxuLy9odHRwczovL3dlYXRoZXIudmlzdWFsY3Jvc3NpbmcuY29tL1Zpc3VhbENyb3NzaW5nV2ViU2VydmljZXMvcmVzdC9zZXJ2aWNlcy90aW1lbGluZS9odWxsJTIwdWs/dW5pdEdyb3VwPXVzJmluY2x1ZGU9ZGF5cyZrZXk9Qk5BWDJHQlVFREY5WENVNkU3NFNVNFQzNiZjb250ZW50VHlwZT1jc3ZcbiIsImV4cG9ydCBjb25zdCBib2R5Q29udGVudCA9ICgpID0+IHtcbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGNvbnN0IGZvcm1EZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgY29uc3QgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybURpdi5jbGFzc0xpc3QuYWRkKFwiZm9ybS1kaXZcIik7XG4gICAgY29uc3QgZm9ybVRleHRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QuYWRkKFwic3VibWl0LWJ1dHRvblwiKTtcbiAgICBzdWJtaXRCdG4ub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuICAgIGZvcm1UZXh0Qm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIGZvcm1UZXh0Qm94LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiRW50ZXIgTG9jYXRpb24gSGVyZVwiKTtcbiAgICBmb3JtVGV4dEJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvdW50cnktZmllbGRcIik7XG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChmb3JtVGV4dEJveCk7XG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChjcmVhdGVDb3VudHJ5RHJvcERvd24oKSk7XG4gICAgZm9ybURldGFpbHMuYXBwZW5kQ2hpbGQoZm9ybURpdik7XG4gICAgZm9ybURldGFpbHMuYXBwZW5kQ2hpbGQoY3JlYXRlRGF0ZXMoKSk7XG4gICAgZm9ybURldGFpbHMuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlck9wdGlvbnMoKSk7XG4gICAgZm9ybURldGFpbHMuYXBwZW5kQ2hpbGQoc3VibWl0QnRuKTtcblxuICAgIHJldHVybiBmb3JtRGV0YWlscztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZURhdGVzKCkge1xuICAgIGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRhdGVEaXYuY2xhc3NMaXN0LmFkZChcImRhdGUtZGl2XCIpO1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBlbmREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG4gICAgc3RhcnREYXRlLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJzdGFydC1kYXRlXCIpO1xuICAgIHN0YXJ0RGF0ZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcbiAgICBzdGFydERhdGUuc2V0QXR0cmlidXRlKFxuICAgICAgXCJtaW5cIixcbiAgICAgIGAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTApfWAsXG4gICAgKTtcbiAgICBzdGFydERhdGUudmFsdWUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEwKTtcbiAgICBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEwKTtcbiAgICBzdGFydERhdGUucmVxdWlyZWQgPSB0cnVlXG5cbiAgICBlbmREYXRlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xuICAgIGVuZERhdGUuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsICdTZWxlY3QgRW5kIERhdGUnKVxuICAgIGVuZERhdGUuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImVuZC1kYXRlXCIpO1xuICAgIHN0YXJ0RGF0ZS5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGVuZERhdGUuc2V0QXR0cmlidXRlKFwibWluXCIsIHN0YXJ0RGF0ZS52YWx1ZSk7XG4gICAgfTtcblxuICAgIGRhdGVEaXYuYXBwZW5kQ2hpbGQoc3RhcnREYXRlKTtcbiAgICBkYXRlRGl2LmFwcGVuZENoaWxkKGVuZERhdGUpO1xuXG4gICAgcmV0dXJuIGRhdGVEaXY7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDb3VudHJ5RHJvcERvd24oKSB7XG4gICAgY29uc3QgZHJvcERvd25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGNvdW50cnlDb2RlID0gW1xuICAgICAgeyBjb3VudHJ5OiBcIlVuaXRlZCBLaW5nZG9tXCIsIGNvZGU6IFwiR0JcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIkF1c3RyYWxpYVwiLCBjb2RlOiBcIkFVXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJDYW5hZGFcIiwgY29kZTogXCJDQVwiIH0sXG4gICAgICB7IGNvdW50cnk6IFwiTmlnZXJpYVwiLCBjb2RlOiBcIk5HXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJHZXJtYW55XCIsIGNvZGU6IFwiREVcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIlVuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYVwiLCBjb2RlOiBcIlVTXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJTb3V0aCBBZnJpY2FcIiwgY29kZTogXCJaQVwiIH0sXG4gICAgXTtcblxuICAgIGNvbnN0IHNvcnRlZExpc3RlZCA9IGNvdW50cnlDb2RlLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmNvdW50cnkgPCBiLmNvdW50cnkpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmNvdW50cnkgPiBiLmNvdW50cnkpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG5cbiAgICBzb3J0ZWRMaXN0ZWQudW5zaGlmdCh7IGNvdW50cnk6IFwiU2VsZWN0IENvdW50cnlcIiwgY29kZTogXCJcIiB9LClcbiAgICBcbiAgICBjb25zdCBkcm9wRG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgY29uc3QgZHJvcERvd25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpO1xuICAgIC8vZHJvcERvd25OYW1lLmxhYmVsID0gXCJTZWxlY3QgQ291bnRyeVwiO1xuICAgIC8vZHJvcERvd24uYXBwZW5kQ2hpbGQoZHJvcERvd25OYW1lKTtcblxuICAgIHNvcnRlZExpc3RlZC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBkcm9wZG93bkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgZHJvcGRvd25JdGVtLnZhbHVlID0gaXRlbS5jb2RlO1xuICAgICAgZHJvcGRvd25JdGVtLnRleHRDb250ZW50ID0gaXRlbS5jb3VudHJ5O1xuICAgICAgaWYgKGl0ZW0uY291bnRyeSA9PT0gJ1NlbGVjdCBDb3VudHJ5Jykge1xuICAgICAgICBkcm9wZG93bkl0ZW0uc2VsZWN0ZWQgPSB0cnVlXG4gICAgICAgIC8vZHJvcGRvd25JdGVtLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBkcm9wRG93bi5hcHBlbmRDaGlsZChkcm9wZG93bkl0ZW0pO1xuICAgIH0pO1xuXG4gICAgZHJvcERvd25EaXYuYXBwZW5kQ2hpbGQoZHJvcERvd24pO1xuICAgIHJldHVybiBkcm9wRG93bkRpdjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVdlYXRoZXJPcHRpb25zKCkge1xuICAgIGNvbnN0IHdlYXRoZXJIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGVnZW5kXCIpO1xuICAgIHdlYXRoZXJIZWFkZXIudGV4dENvbnRlbnQgPSBcIkNob29zZSB0aGUgV2VhdGhlciBEZXRhaWxzOlwiO1xuXG4gICAgY29uc3Qgd2VhdGhlck9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgY29uc3Qgd2VhdGhlck9wdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdlYXRoZXJPcHRpb25zRGl2LmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXItb3B0aW9ucy1kaXYnKVxuXG4gICAgd2VhdGhlck9wdGlvbnMuYXBwZW5kQ2hpbGQod2VhdGhlckhlYWRlcik7XG4gICAgY29uc3QgZGVmYXVsdFdlYXRoZXJPcHRpb25zID0gW1xuICAgICAgLy8gXCJhZGRyZXNzXCIsXG4gICAgICAvLyBcInRlbXBcIixcbiAgICAgIC8vIFwidGVtcG1pblwiLFxuICAgICAgLy8gXCJ0ZW1wbWF4XCIsXG4gICAgICAvLyBcImNvbmRpdGlvbnNcIixcbiAgICAgIC8vIFwiZGVzY3JpcHRpb25cIixcbiAgICBdO1xuXG4gICAgZGVmYXVsdFdlYXRoZXJPcHRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcblxuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGNvbnN0IG9wdGlvbnNMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICAgICAgb3B0aW9uc0xhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBpdGVtKTtcbiAgICAgIGNvbnN0IG9wdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgb3B0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgb3B0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIndlYXRoZXItb3B0aW9uc1wiKTtcbiAgICAgIG9wdGlvbklucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGAke2l0ZW19YCk7XG4gICAgICBvcHRpb25JbnB1dC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIC8vb3B0aW9uc0xhYmVsLmFwcGVuZENoaWxkKG9wdGlvbklucHV0KTtcbiAgICAgIG9wdGlvbnNMYWJlbC50ZXh0Q29udGVudCA9IGNhcGl0YWxpemVGaXJzdExldHRlcihpdGVtKTtcblxuICAgICAgb3B0aW9uc0xhYmVsLm9uY2xpY2sgPSBzZWxlY3RJdGVtXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQob3B0aW9uSW5wdXQpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKG9wdGlvbnNMYWJlbClcblxuICAgICAgd2VhdGhlck9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQoZGl2KVxuICAgIH0pO1xuICAgIGNvbnN0IHdlYXRoZXJPcHRpb25zT3RoZXIgPSBbXG4gICAgICBcImZlZWxzbGlrZW1heFwiLFxuICAgICAgXCJmZWVsc2xpa2VtaW5cIixcbiAgICAgIFwid2luZGd1c3RcIixcbiAgICAgIFwid2luZHNwZWVkXCIsXG4gICAgICBcIndpbmRkaXJcIixcbiAgICBdO1xuXG4gICAgd2VhdGhlck9wdGlvbnNPdGhlci5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgb3B0aW9uc0xhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBpdGVtKTtcbiAgICAgIGNvbnN0IG9wdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgb3B0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgICAgb3B0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIndlYXRoZXItb3B0aW9uc1wiKTtcbiAgICAgIG9wdGlvbklucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGAke2l0ZW19YCk7XG5cbiAgICAgIC8vb3B0aW9uc0xhYmVsLmFwcGVuZENoaWxkKG9wdGlvbklucHV0KTtcbiAgICAgIG9wdGlvbnNMYWJlbC50ZXh0Q29udGVudCA9IGNhcGl0YWxpemVGaXJzdExldHRlcihpdGVtKTtcblxuICAgICAgb3B0aW9uc0xhYmVsLm9uY2xpY2sgPSBzZWxlY3RJdGVtXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQob3B0aW9uSW5wdXQpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKG9wdGlvbnNMYWJlbCk7XG5cbiAgICAgIHdlYXRoZXJPcHRpb25zRGl2LmFwcGVuZENoaWxkKGRpdilcbiAgICB9KTtcblxuICAgIHdlYXRoZXJPcHRpb25zLmFwcGVuZENoaWxkKHdlYXRoZXJPcHRpb25zRGl2KVxuXG4gICAgcmV0dXJuIHdlYXRoZXJPcHRpb25zO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gY3JlYXRlXG5cbiAgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHdvcmQpIHtcbiAgICByZXR1cm4gd29yZC5yZXBsYWNlKGAke3dvcmRbMF19YCwgYCR7d29yZFswXS50b1VwcGVyQ2FzZSgpfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0SXRlbShldmVudCkge1xuICAgIGxldCBzaWJsaW5nQ2hlY2tCb3ggPSBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZ1xuXG4gICAgaWYgKHNpYmxpbmdDaGVja0JveC5jaGVja2VkKSB7XG4gICAgICBzaWJsaW5nQ2hlY2tCb3guY2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNpYmxpbmdDaGVja0JveC5jaGVja2VkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IHJlbmRlciB9O1xufTtcbiIsImltcG9ydCBQYXBhIGZyb20gXCJwYXBhcGFyc2VcIjtcblxuZXhwb3J0IGNvbnN0IHRhYmxlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIGRlbGltaXRlcjogXCJcIiwgLy8gYXV0by1kZXRlY3RcbiAgICAgIG5ld2xpbmU6IFwiXCIsIC8vIGF1dG8tZGV0ZWN0XG4gICAgICBxdW90ZUNoYXI6ICdcIicsXG4gICAgICBlc2NhcGVDaGFyOiAnXCInLFxuICAgICAgaGVhZGVyOiBmYWxzZSxcbiAgICAgIHRyYW5zZm9ybUhlYWRlcjogdW5kZWZpbmVkLFxuICAgICAgZHluYW1pY1R5cGluZzogZmFsc2UsXG4gICAgICBwcmV2aWV3OiAwLFxuICAgICAgZW5jb2Rpbmc6IFwiXCIsXG4gICAgICB3b3JrZXI6IGZhbHNlLFxuICAgICAgY29tbWVudHM6IGZhbHNlLFxuICAgICAgc3RlcDogdW5kZWZpbmVkLFxuICAgICAgY29tcGxldGU6IHVuZGVmaW5lZCxcbiAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICBkb3dubG9hZDogZmFsc2UsXG4gICAgICBkb3dubG9hZFJlcXVlc3RIZWFkZXJzOiB1bmRlZmluZWQsXG4gICAgICBkb3dubG9hZFJlcXVlc3RCb2R5OiB1bmRlZmluZWQsXG4gICAgICBza2lwRW1wdHlMaW5lczogZmFsc2UsXG4gICAgICBjaHVuazogdW5kZWZpbmVkLFxuICAgICAgY2h1bmtTaXplOiB1bmRlZmluZWQsXG4gICAgICBmYXN0TW9kZTogdW5kZWZpbmVkLFxuICAgICAgYmVmb3JlRmlyc3RDaHVuazogdW5kZWZpbmVkLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB1bmRlZmluZWQsXG4gICAgICB0cmFuc2Zvcm06IHVuZGVmaW5lZCxcbiAgICAgIGRlbGltaXRlcnNUb0d1ZXNzOiBbXCIsXCIsIFwiXFx0XCIsIFwifFwiLCBcIjtcIiwgUGFwYS5SRUNPUkRfU0VQLCBQYXBhLlVOSVRfU0VQXSxcbiAgICAgIHNraXBGaXJzdE5MaW5lczogMCxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHBhcnNlQ1NWKGl0ZW0pIHtcbiAgICAgIHJldHVybiBQYXBhLnBhcnNlKGl0ZW0sIGNvbmZpZylcbiAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhYmxlKHRhYmxlSXRlbSkge1xuICAgICAgICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICAgICAgICBsZXQgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgICAgICAgbGV0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG5cbiAgICAgICAgbGV0IHRhYmxlSGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgdGFibGVJdGVtWzBdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBsZXQgdGhlYWRlclJvd0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgICAgICAgICBsZXQgdGhlYWRlclJvd1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtpdGVtfWApXG5cbiAgICAgICAgICAgIHRoZWFkZXJSb3dJdGVtLmFwcGVuZENoaWxkKHRoZWFkZXJSb3dUZXh0KTtcbiAgICAgICAgICAgIHRhYmxlSGVhZGVyUm93LmFwcGVuZENoaWxkKHRoZWFkZXJSb3dJdGVtKTtcbiAgICAgICAgfSlcblxuICAgICAgICB0YWJsZUhlYWQuYXBwZW5kQ2hpbGQodGFibGVIZWFkZXJSb3cpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGFibGVJdGVtLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGxldCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGFibGVJdGVtW2ldLmxlbmd0aDsgeCsrKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFibGVEYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgICB0YWJsZURhdGEudGV4dENvbnRlbnQgPSB0YWJsZUl0ZW1baV1beF07XG5cbiAgICAgICAgICAgICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZCh0YWJsZURhdGEpXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KVxuICAgICAgICB9XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlSGVhZClcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGFibGVCb2R5KVxuXG4gICAgICAgIHJldHVybiB0YWJsZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2VDU1YsXG4gICAgICAgIGNyZWF0ZVRhYmxlXG4gICAgfVxufTtcblxuY29uc3QgY29udGVudEJvZHkgPSAoKSA9PiB7XG4gICAgXG4gICAgXG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgXG4qe1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuXG59XG5cbi5jb250ZW50e1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogW3N0YXJ0XTFmciBbc3RhcnQtZW5kXTBmciBbZW5kXTtcbiAgICBncmlkLWF1dG8tcm93czogYXV0bztcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxufVxuXG4uY29udGVudC10YWJsZXtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBncmlkLWNvbHVtbjogc3RhcnQtZW5kL2VuZDtcbn1cblxuLmNvbnRlbnQtZm9ybXtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIC8qIGRpc3BsYXk6IGZsZXg7ICovXG59XG50YWJsZXtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZjAwMDA7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgd2lkdGg6IDgwJTtcbn1cblxudGh7XG4gICAgZm9udC1zaXplOiAxLjQ1cmVtO1xuICAgIHBhZGRpbmc6IDVweDtcbn1cbnRoOjpmaXJzdC1sZXR0ZXJ7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cblxudGR7XG4gICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgd2lkdGg6IDE1JTtcbiAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYm9yZGVyOiAycHggc29saWQgI2NjY2M7XG59XG5cblxuXG5mb3JtIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICB3aWR0aDogOTAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMTVweDtcbn1cblxuLmZvcm0tZGl2LCAuZGF0ZS1kaXZ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDE1cHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24tc2VsZjpmbGV4LXN0YXJ0IDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5mb3JtLWRpdntcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xufVxuXG4uZm9ybS1kaXYgaW5wdXQsIC5mb3JtLWRpdiBzZWxlY3R7XG4gICAgd2lkdGg6IDkwJTtcbn1cblxuLmZvcm0tZGl2IGlucHV0LCAuZm9ybS1kaXYgc2VsZWN0LCAuZGF0ZS1kaXYgaW5wdXR7XG4gICAgZm9udC1zaXplOiAxLjY1ZW07XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogOHB4O1xufVxuXG4vKiBzZWxlY3Qgb3B0aW9uW2Rpc2FibGVkXTpmaXJzdC1jaGlsZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbn0gKi9cblxubGVnZW5kLCAud2VhdGhlci1vcHRpb25zLWRpdiBkaXYgbGFiZWx7XG4gICAgZm9udC1zaXplOiAxLjU1ZW07XG59XG4uZm9ybS1kaXYgc2VsZWN0e1xuICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xuICAgIFxufVxuXG5cbi53ZWF0aGVyLW9wdGlvbnMtZGl2e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDo4cHg7XG59XG5cblxuLndlYXRoZXItb3B0aW9ucy1kaXYgZGl2e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiA1cHg7XG59XG4uc3VibWl0LWJ1dHRvbntcbiAgICBwYWRkaW5nOiAxMHB4IDIycHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBmb250LXNpemU6IDEuNWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXI6IDA7XG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XG4gICAgXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFDQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIseUNBQXlDOztBQUU3Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHNEQUFzRDtJQUN0RCxvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLG1CQUFtQjs7QUFFdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGFBQWE7SUFDYixjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsVUFBVTtBQUNkOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7QUFDaEI7QUFDQTtJQUNJLDBCQUEwQjtBQUM5Qjs7O0FBR0E7SUFDSSxpQkFBaUI7SUFDakIsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHVCQUF1QjtBQUMzQjs7OztBQUlBO0lBQ0ksY0FBYztJQUNkLFVBQVU7SUFDVixhQUFhOztJQUViLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixTQUFTO0lBQ1QsY0FBYztJQUNkLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBOztHQUVHOztBQUVIO0lBQ0ksaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCOztBQUU3Qjs7O0FBR0E7SUFDSSxhQUFhO0lBQ2IsZUFBZTtJQUNmLE9BQU87QUFDWDs7O0FBR0E7SUFDSSxhQUFhO0lBQ2IsUUFBUTtBQUNaO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixnQ0FBZ0M7SUFDaEMsWUFBWTtJQUNaLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsbUJBQW1COztBQUV2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJcXG4qe1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcblxcbn1cXG5cXG4uY29udGVudHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBbc3RhcnRdMWZyIFtzdGFydC1lbmRdMGZyIFtlbmRdO1xcbiAgICBncmlkLWF1dG8tcm93czogYXV0bztcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbn1cXG5cXG4uY29udGVudC10YWJsZXtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBncmlkLWNvbHVtbjogc3RhcnQtZW5kL2VuZDtcXG59XFxuXFxuLmNvbnRlbnQtZm9ybXtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgLyogZGlzcGxheTogZmxleDsgKi9cXG59XFxudGFibGV7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZmYwMDAwO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICAgIHdpZHRoOiA4MCU7XFxufVxcblxcbnRoe1xcbiAgICBmb250LXNpemU6IDEuNDVyZW07XFxuICAgIHBhZGRpbmc6IDVweDtcXG59XFxudGg6OmZpcnN0LWxldHRlcntcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcblxcblxcbnRke1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgd2lkdGg6IDE1JTtcXG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNjY2NjO1xcbn1cXG5cXG5cXG5cXG5mb3JtIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIFxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4uZm9ybS1kaXYsIC5kYXRlLWRpdntcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAxNXB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLXNlbGY6ZmxleC1zdGFydCA7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuXFxuLmZvcm0tZGl2e1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmZvcm0tZGl2IGlucHV0LCAuZm9ybS1kaXYgc2VsZWN0e1xcbiAgICB3aWR0aDogOTAlO1xcbn1cXG5cXG4uZm9ybS1kaXYgaW5wdXQsIC5mb3JtLWRpdiBzZWxlY3QsIC5kYXRlLWRpdiBpbnB1dHtcXG4gICAgZm9udC1zaXplOiAxLjY1ZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG4vKiBzZWxlY3Qgb3B0aW9uW2Rpc2FibGVkXTpmaXJzdC1jaGlsZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufSAqL1xcblxcbmxlZ2VuZCwgLndlYXRoZXItb3B0aW9ucy1kaXYgZGl2IGxhYmVse1xcbiAgICBmb250LXNpemU6IDEuNTVlbTtcXG59XFxuLmZvcm0tZGl2IHNlbGVjdHtcXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xcbiAgICBcXG59XFxuXFxuXFxuLndlYXRoZXItb3B0aW9ucy1kaXZ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgZ2FwOjhweDtcXG59XFxuXFxuXFxuLndlYXRoZXItb3B0aW9ucy1kaXYgZGl2e1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDVweDtcXG59XFxuLnN1Ym1pdC1idXR0b257XFxuICAgIHBhZGRpbmc6IDEwcHggMjJweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZm9udC1zaXplOiAxLjVlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29ybmZsb3dlcmJsdWU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICAgIFxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8qIEBsaWNlbnNlXG5QYXBhIFBhcnNlXG52NS40LjFcbmh0dHBzOi8vZ2l0aHViLmNvbS9taG9sdC9QYXBhUGFyc2VcbkxpY2Vuc2U6IE1JVFxuKi9cbiFmdW5jdGlvbihlLHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dCgpOmUuUGFwYT10KCl9KHRoaXMsZnVuY3Rpb24gcygpe1widXNlIHN0cmljdFwiO3ZhciBmPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dm9pZCAwIT09Zj9mOnt9O3ZhciBuPSFmLmRvY3VtZW50JiYhIWYucG9zdE1lc3NhZ2Usbz1mLklTX1BBUEFfV09SS0VSfHwhMSxhPXt9LHU9MCxiPXtwYXJzZTpmdW5jdGlvbihlLHQpe3ZhciByPSh0PXR8fHt9KS5keW5hbWljVHlwaW5nfHwhMTtKKHIpJiYodC5keW5hbWljVHlwaW5nRnVuY3Rpb249cixyPXt9KTtpZih0LmR5bmFtaWNUeXBpbmc9cix0LnRyYW5zZm9ybT0hIUoodC50cmFuc2Zvcm0pJiZ0LnRyYW5zZm9ybSx0LndvcmtlciYmYi5XT1JLRVJTX1NVUFBPUlRFRCl7dmFyIGk9ZnVuY3Rpb24oKXtpZighYi5XT1JLRVJTX1NVUFBPUlRFRClyZXR1cm4hMTt2YXIgZT0ocj1mLlVSTHx8Zi53ZWJraXRVUkx8fG51bGwsaT1zLnRvU3RyaW5nKCksYi5CTE9CX1VSTHx8KGIuQkxPQl9VUkw9ci5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1widmFyIGdsb2JhbCA9IChmdW5jdGlvbigpIHsgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gc2VsZjsgfSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHdpbmRvdzsgfSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGdsb2JhbDsgfSByZXR1cm4ge307IH0pKCk7IGdsb2JhbC5JU19QQVBBX1dPUktFUj10cnVlOyBcIixcIihcIixpLFwiKSgpO1wiXSx7dHlwZTpcInRleHQvamF2YXNjcmlwdFwifSkpKSksdD1uZXcgZi5Xb3JrZXIoZSk7dmFyIHIsaTtyZXR1cm4gdC5vbm1lc3NhZ2U9Xyx0LmlkPXUrKyxhW3QuaWRdPXR9KCk7cmV0dXJuIGkudXNlclN0ZXA9dC5zdGVwLGkudXNlckNodW5rPXQuY2h1bmssaS51c2VyQ29tcGxldGU9dC5jb21wbGV0ZSxpLnVzZXJFcnJvcj10LmVycm9yLHQuc3RlcD1KKHQuc3RlcCksdC5jaHVuaz1KKHQuY2h1bmspLHQuY29tcGxldGU9Sih0LmNvbXBsZXRlKSx0LmVycm9yPUoodC5lcnJvciksZGVsZXRlIHQud29ya2VyLHZvaWQgaS5wb3N0TWVzc2FnZSh7aW5wdXQ6ZSxjb25maWc6dCx3b3JrZXJJZDppLmlkfSl9dmFyIG49bnVsbDtiLk5PREVfU1RSRUFNX0lOUFVULFwic3RyaW5nXCI9PXR5cGVvZiBlPyhlPWZ1bmN0aW9uKGUpe2lmKDY1Mjc5PT09ZS5jaGFyQ29kZUF0KDApKXJldHVybiBlLnNsaWNlKDEpO3JldHVybiBlfShlKSxuPXQuZG93bmxvYWQ/bmV3IGwodCk6bmV3IHAodCkpOiEwPT09ZS5yZWFkYWJsZSYmSihlLnJlYWQpJiZKKGUub24pP249bmV3IGcodCk6KGYuRmlsZSYmZSBpbnN0YW5jZW9mIEZpbGV8fGUgaW5zdGFuY2VvZiBPYmplY3QpJiYobj1uZXcgYyh0KSk7cmV0dXJuIG4uc3RyZWFtKGUpfSx1bnBhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIG49ITEsXz0hMCxtPVwiLFwiLHk9XCJcXHJcXG5cIixzPSdcIicsYT1zK3Mscj0hMSxpPW51bGwsbz0hMTshZnVuY3Rpb24oKXtpZihcIm9iamVjdFwiIT10eXBlb2YgdClyZXR1cm47XCJzdHJpbmdcIiE9dHlwZW9mIHQuZGVsaW1pdGVyfHxiLkJBRF9ERUxJTUlURVJTLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4tMSE9PXQuZGVsaW1pdGVyLmluZGV4T2YoZSl9KS5sZW5ndGh8fChtPXQuZGVsaW1pdGVyKTsoXCJib29sZWFuXCI9PXR5cGVvZiB0LnF1b3Rlc3x8XCJmdW5jdGlvblwiPT10eXBlb2YgdC5xdW90ZXN8fEFycmF5LmlzQXJyYXkodC5xdW90ZXMpKSYmKG49dC5xdW90ZXMpO1wiYm9vbGVhblwiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lcyYmXCJzdHJpbmdcIiE9dHlwZW9mIHQuc2tpcEVtcHR5TGluZXN8fChyPXQuc2tpcEVtcHR5TGluZXMpO1wic3RyaW5nXCI9PXR5cGVvZiB0Lm5ld2xpbmUmJih5PXQubmV3bGluZSk7XCJzdHJpbmdcIj09dHlwZW9mIHQucXVvdGVDaGFyJiYocz10LnF1b3RlQ2hhcik7XCJib29sZWFuXCI9PXR5cGVvZiB0LmhlYWRlciYmKF89dC5oZWFkZXIpO2lmKEFycmF5LmlzQXJyYXkodC5jb2x1bW5zKSl7aWYoMD09PXQuY29sdW1ucy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiT3B0aW9uIGNvbHVtbnMgaXMgZW1wdHlcIik7aT10LmNvbHVtbnN9dm9pZCAwIT09dC5lc2NhcGVDaGFyJiYoYT10LmVzY2FwZUNoYXIrcyk7KFwiYm9vbGVhblwiPT10eXBlb2YgdC5lc2NhcGVGb3JtdWxhZXx8dC5lc2NhcGVGb3JtdWxhZSBpbnN0YW5jZW9mIFJlZ0V4cCkmJihvPXQuZXNjYXBlRm9ybXVsYWUgaW5zdGFuY2VvZiBSZWdFeHA/dC5lc2NhcGVGb3JtdWxhZTovXls9K1xcLUBcXHRcXHJdLiokLyl9KCk7dmFyIHU9bmV3IFJlZ0V4cChRKHMpLFwiZ1wiKTtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSk7aWYoQXJyYXkuaXNBcnJheShlKSl7aWYoIWUubGVuZ3RofHxBcnJheS5pc0FycmF5KGVbMF0pKXJldHVybiBoKG51bGwsZSxyKTtpZihcIm9iamVjdFwiPT10eXBlb2YgZVswXSlyZXR1cm4gaChpfHxPYmplY3Qua2V5cyhlWzBdKSxlLHIpfWVsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGUpcmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGUuZGF0YSYmKGUuZGF0YT1KU09OLnBhcnNlKGUuZGF0YSkpLEFycmF5LmlzQXJyYXkoZS5kYXRhKSYmKGUuZmllbGRzfHwoZS5maWVsZHM9ZS5tZXRhJiZlLm1ldGEuZmllbGRzfHxpKSxlLmZpZWxkc3x8KGUuZmllbGRzPUFycmF5LmlzQXJyYXkoZS5kYXRhWzBdKT9lLmZpZWxkczpcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdP09iamVjdC5rZXlzKGUuZGF0YVswXSk6W10pLEFycmF5LmlzQXJyYXkoZS5kYXRhWzBdKXx8XCJvYmplY3RcIj09dHlwZW9mIGUuZGF0YVswXXx8KGUuZGF0YT1bZS5kYXRhXSkpLGgoZS5maWVsZHN8fFtdLGUuZGF0YXx8W10scik7dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHNlcmlhbGl6ZSB1bnJlY29nbml6ZWQgaW5wdXRcIik7ZnVuY3Rpb24gaChlLHQscil7dmFyIGk9XCJcIjtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSksXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PUpTT04ucGFyc2UodCkpO3ZhciBuPUFycmF5LmlzQXJyYXkoZSkmJjA8ZS5sZW5ndGgscz0hQXJyYXkuaXNBcnJheSh0WzBdKTtpZihuJiZfKXtmb3IodmFyIGE9MDthPGUubGVuZ3RoO2ErKykwPGEmJihpKz1tKSxpKz12KGVbYV0sYSk7MDx0Lmxlbmd0aCYmKGkrPXkpfWZvcih2YXIgbz0wO288dC5sZW5ndGg7bysrKXt2YXIgdT1uP2UubGVuZ3RoOnRbb10ubGVuZ3RoLGg9ITEsZj1uPzA9PT1PYmplY3Qua2V5cyh0W29dKS5sZW5ndGg6MD09PXRbb10ubGVuZ3RoO2lmKHImJiFuJiYoaD1cImdyZWVkeVwiPT09cj9cIlwiPT09dFtvXS5qb2luKFwiXCIpLnRyaW0oKToxPT09dFtvXS5sZW5ndGgmJjA9PT10W29dWzBdLmxlbmd0aCksXCJncmVlZHlcIj09PXImJm4pe2Zvcih2YXIgZD1bXSxsPTA7bDx1O2wrKyl7dmFyIGM9cz9lW2xdOmw7ZC5wdXNoKHRbb11bY10pfWg9XCJcIj09PWQuam9pbihcIlwiKS50cmltKCl9aWYoIWgpe2Zvcih2YXIgcD0wO3A8dTtwKyspezA8cCYmIWYmJihpKz1tKTt2YXIgZz1uJiZzP2VbcF06cDtpKz12KHRbb11bZ10scCl9bzx0Lmxlbmd0aC0xJiYoIXJ8fDA8dSYmIWYpJiYoaSs9eSl9fXJldHVybiBpfWZ1bmN0aW9uIHYoZSx0KXtpZihudWxsPT1lKXJldHVyblwiXCI7aWYoZS5jb25zdHJ1Y3Rvcj09PURhdGUpcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpLnNsaWNlKDEsMjUpO3ZhciByPSExO28mJlwic3RyaW5nXCI9PXR5cGVvZiBlJiZvLnRlc3QoZSkmJihlPVwiJ1wiK2Uscj0hMCk7dmFyIGk9ZS50b1N0cmluZygpLnJlcGxhY2UodSxhKTtyZXR1cm4ocj1yfHwhMD09PW58fFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oZSx0KXx8QXJyYXkuaXNBcnJheShuKSYmblt0XXx8ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKylpZigtMTxlLmluZGV4T2YodFtyXSkpcmV0dXJuITA7cmV0dXJuITF9KGksYi5CQURfREVMSU1JVEVSUyl8fC0xPGkuaW5kZXhPZihtKXx8XCIgXCI9PT1pLmNoYXJBdCgwKXx8XCIgXCI9PT1pLmNoYXJBdChpLmxlbmd0aC0xKSk/cytpK3M6aX19fTtpZihiLlJFQ09SRF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMCksYi5VTklUX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMxKSxiLkJZVEVfT1JERVJfTUFSSz1cIlxcdWZlZmZcIixiLkJBRF9ERUxJTUlURVJTPVtcIlxcclwiLFwiXFxuXCIsJ1wiJyxiLkJZVEVfT1JERVJfTUFSS10sYi5XT1JLRVJTX1NVUFBPUlRFRD0hbiYmISFmLldvcmtlcixiLk5PREVfU1RSRUFNX0lOUFVUPTEsYi5Mb2NhbENodW5rU2l6ZT0xMDQ4NTc2MCxiLlJlbW90ZUNodW5rU2l6ZT01MjQyODgwLGIuRGVmYXVsdERlbGltaXRlcj1cIixcIixiLlBhcnNlcj1FLGIuUGFyc2VySGFuZGxlPXIsYi5OZXR3b3JrU3RyZWFtZXI9bCxiLkZpbGVTdHJlYW1lcj1jLGIuU3RyaW5nU3RyZWFtZXI9cCxiLlJlYWRhYmxlU3RyZWFtU3RyZWFtZXI9ZyxmLmpRdWVyeSl7dmFyIGQ9Zi5qUXVlcnk7ZC5mbi5wYXJzZT1mdW5jdGlvbihvKXt2YXIgcj1vLmNvbmZpZ3x8e30sdT1bXTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKCEoXCJJTlBVVFwiPT09ZCh0aGlzKS5wcm9wKFwidGFnTmFtZVwiKS50b1VwcGVyQ2FzZSgpJiZcImZpbGVcIj09PWQodGhpcykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSYmZi5GaWxlUmVhZGVyKXx8IXRoaXMuZmlsZXN8fDA9PT10aGlzLmZpbGVzLmxlbmd0aClyZXR1cm4hMDtmb3IodmFyIHQ9MDt0PHRoaXMuZmlsZXMubGVuZ3RoO3QrKyl1LnB1c2goe2ZpbGU6dGhpcy5maWxlc1t0XSxpbnB1dEVsZW06dGhpcyxpbnN0YW5jZUNvbmZpZzpkLmV4dGVuZCh7fSxyKX0pfSksZSgpLHRoaXM7ZnVuY3Rpb24gZSgpe2lmKDAhPT11Lmxlbmd0aCl7dmFyIGUsdCxyLGksbj11WzBdO2lmKEooby5iZWZvcmUpKXt2YXIgcz1vLmJlZm9yZShuLmZpbGUsbi5pbnB1dEVsZW0pO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBzKXtpZihcImFib3J0XCI9PT1zLmFjdGlvbilyZXR1cm4gZT1cIkFib3J0RXJyb3JcIix0PW4uZmlsZSxyPW4uaW5wdXRFbGVtLGk9cy5yZWFzb24sdm9pZChKKG8uZXJyb3IpJiZvLmVycm9yKHtuYW1lOmV9LHQscixpKSk7aWYoXCJza2lwXCI9PT1zLmFjdGlvbilyZXR1cm4gdm9pZCBoKCk7XCJvYmplY3RcIj09dHlwZW9mIHMuY29uZmlnJiYobi5pbnN0YW5jZUNvbmZpZz1kLmV4dGVuZChuLmluc3RhbmNlQ29uZmlnLHMuY29uZmlnKSl9ZWxzZSBpZihcInNraXBcIj09PXMpcmV0dXJuIHZvaWQgaCgpfXZhciBhPW4uaW5zdGFuY2VDb25maWcuY29tcGxldGU7bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZT1mdW5jdGlvbihlKXtKKGEpJiZhKGUsbi5maWxlLG4uaW5wdXRFbGVtKSxoKCl9LGIucGFyc2Uobi5maWxlLG4uaW5zdGFuY2VDb25maWcpfWVsc2UgSihvLmNvbXBsZXRlKSYmby5jb21wbGV0ZSgpfWZ1bmN0aW9uIGgoKXt1LnNwbGljZSgwLDEpLGUoKX19fWZ1bmN0aW9uIGgoZSl7dGhpcy5faGFuZGxlPW51bGwsdGhpcy5fZmluaXNoZWQ9ITEsdGhpcy5fY29tcGxldGVkPSExLHRoaXMuX2hhbHRlZD0hMSx0aGlzLl9pbnB1dD1udWxsLHRoaXMuX2Jhc2VJbmRleD0wLHRoaXMuX3BhcnRpYWxMaW5lPVwiXCIsdGhpcy5fcm93Q291bnQ9MCx0aGlzLl9zdGFydD0wLHRoaXMuX25leHRDaHVuaz1udWxsLHRoaXMuaXNGaXJzdENodW5rPSEwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX0sZnVuY3Rpb24oZSl7dmFyIHQ9dyhlKTt0LmNodW5rU2l6ZT1wYXJzZUludCh0LmNodW5rU2l6ZSksZS5zdGVwfHxlLmNodW5rfHwodC5jaHVua1NpemU9bnVsbCk7dGhpcy5faGFuZGxlPW5ldyByKHQpLCh0aGlzLl9oYW5kbGUuc3RyZWFtZXI9dGhpcykuX2NvbmZpZz10fS5jYWxsKHRoaXMsZSksdGhpcy5wYXJzZUNodW5rPWZ1bmN0aW9uKGUsdCl7aWYodGhpcy5pc0ZpcnN0Q2h1bmsmJkoodGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmspKXt2YXIgcj10aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuayhlKTt2b2lkIDAhPT1yJiYoZT1yKX10aGlzLmlzRmlyc3RDaHVuaz0hMSx0aGlzLl9oYWx0ZWQ9ITE7dmFyIGk9dGhpcy5fcGFydGlhbExpbmUrZTt0aGlzLl9wYXJ0aWFsTGluZT1cIlwiO3ZhciBuPXRoaXMuX2hhbmRsZS5wYXJzZShpLHRoaXMuX2Jhc2VJbmRleCwhdGhpcy5fZmluaXNoZWQpO2lmKCF0aGlzLl9oYW5kbGUucGF1c2VkKCkmJiF0aGlzLl9oYW5kbGUuYWJvcnRlZCgpKXt2YXIgcz1uLm1ldGEuY3Vyc29yO3RoaXMuX2ZpbmlzaGVkfHwodGhpcy5fcGFydGlhbExpbmU9aS5zdWJzdHJpbmcocy10aGlzLl9iYXNlSW5kZXgpLHRoaXMuX2Jhc2VJbmRleD1zKSxuJiZuLmRhdGEmJih0aGlzLl9yb3dDb3VudCs9bi5kYXRhLmxlbmd0aCk7dmFyIGE9dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiZ0aGlzLl9yb3dDb3VudD49dGhpcy5fY29uZmlnLnByZXZpZXc7aWYobylmLnBvc3RNZXNzYWdlKHtyZXN1bHRzOm4sd29ya2VySWQ6Yi5XT1JLRVJfSUQsZmluaXNoZWQ6YX0pO2Vsc2UgaWYoSih0aGlzLl9jb25maWcuY2h1bmspJiYhdCl7aWYodGhpcy5fY29uZmlnLmNodW5rKG4sdGhpcy5faGFuZGxlKSx0aGlzLl9oYW5kbGUucGF1c2VkKCl8fHRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpcmV0dXJuIHZvaWQodGhpcy5faGFsdGVkPSEwKTtuPXZvaWQgMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9dm9pZCAwfXJldHVybiB0aGlzLl9jb25maWcuc3RlcHx8dGhpcy5fY29uZmlnLmNodW5rfHwodGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGE9dGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGEuY29uY2F0KG4uZGF0YSksdGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycz10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzLmNvbmNhdChuLmVycm9ycyksdGhpcy5fY29tcGxldGVSZXN1bHRzLm1ldGE9bi5tZXRhKSx0aGlzLl9jb21wbGV0ZWR8fCFhfHwhSih0aGlzLl9jb25maWcuY29tcGxldGUpfHxuJiZuLm1ldGEuYWJvcnRlZHx8KHRoaXMuX2NvbmZpZy5jb21wbGV0ZSh0aGlzLl9jb21wbGV0ZVJlc3VsdHMsdGhpcy5faW5wdXQpLHRoaXMuX2NvbXBsZXRlZD0hMCksYXx8biYmbi5tZXRhLnBhdXNlZHx8dGhpcy5fbmV4dENodW5rKCksbn10aGlzLl9oYWx0ZWQ9ITB9LHRoaXMuX3NlbmRFcnJvcj1mdW5jdGlvbihlKXtKKHRoaXMuX2NvbmZpZy5lcnJvcik/dGhpcy5fY29uZmlnLmVycm9yKGUpOm8mJnRoaXMuX2NvbmZpZy5lcnJvciYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQsZXJyb3I6ZSxmaW5pc2hlZDohMX0pfX1mdW5jdGlvbiBsKGUpe3ZhciBpOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLlJlbW90ZUNodW5rU2l6ZSksaC5jYWxsKHRoaXMsZSksdGhpcy5fbmV4dENodW5rPW4/ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKSx0aGlzLl9jaHVua0xvYWRlZCgpfTpmdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXtpZih0aGlzLl9maW5pc2hlZCl0aGlzLl9jaHVua0xvYWRlZCgpO2Vsc2V7aWYoaT1uZXcgWE1MSHR0cFJlcXVlc3QsdGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyYmKGkud2l0aENyZWRlbnRpYWxzPXRoaXMuX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpLG58fChpLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLGkub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpLGkub3Blbih0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0Qm9keT9cIlBPU1RcIjpcIkdFVFwiLHRoaXMuX2lucHV0LCFuKSx0aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycyl7dmFyIGU9dGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEhlYWRlcnM7Zm9yKHZhciB0IGluIGUpaS5zZXRSZXF1ZXN0SGVhZGVyKHQsZVt0XSl9aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIHI9dGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZS0xO2kuc2V0UmVxdWVzdEhlYWRlcihcIlJhbmdlXCIsXCJieXRlcz1cIit0aGlzLl9zdGFydCtcIi1cIityKX10cnl7aS5zZW5kKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5KX1jYXRjaChlKXt0aGlzLl9jaHVua0Vycm9yKGUubWVzc2FnZSl9biYmMD09PWkuc3RhdHVzJiZ0aGlzLl9jaHVua0Vycm9yKCl9fSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbigpezQ9PT1pLnJlYWR5U3RhdGUmJihpLnN0YXR1czwyMDB8fDQwMDw9aS5zdGF0dXM/dGhpcy5fY2h1bmtFcnJvcigpOih0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZT90aGlzLl9jb25maWcuY2h1bmtTaXplOmkucmVzcG9uc2VUZXh0Lmxlbmd0aCx0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+PWZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVJhbmdlXCIpO2lmKG51bGw9PT10KXJldHVybi0xO3JldHVybiBwYXJzZUludCh0LnN1YnN0cmluZyh0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKSl9KGkpLHRoaXMucGFyc2VDaHVuayhpLnJlc3BvbnNlVGV4dCkpKX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbihlKXt2YXIgdD1pLnN0YXR1c1RleHR8fGU7dGhpcy5fc2VuZEVycm9yKG5ldyBFcnJvcih0KSl9fWZ1bmN0aW9uIGMoZSl7dmFyIGksbjsoZT1lfHx7fSkuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Yi5Mb2NhbENodW5rU2l6ZSksaC5jYWxsKHRoaXMsZSk7dmFyIHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSxuPWUuc2xpY2V8fGUud2Via2l0U2xpY2V8fGUubW96U2xpY2Uscz8oKGk9bmV3IEZpbGVSZWFkZXIpLm9ubG9hZD12KHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLGkub25lcnJvcj12KHRoaXMuX2NodW5rRXJyb3IsdGhpcykpOmk9bmV3IEZpbGVSZWFkZXJTeW5jLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJiEodGhpcy5fcm93Q291bnQ8dGhpcy5fY29uZmlnLnByZXZpZXcpfHx0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5faW5wdXQ7aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIHQ9TWF0aC5taW4odGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9pbnB1dC5zaXplKTtlPW4uY2FsbChlLHRoaXMuX3N0YXJ0LHQpfXZhciByPWkucmVhZEFzVGV4dChlLHRoaXMuX2NvbmZpZy5lbmNvZGluZyk7c3x8dGhpcy5fY2h1bmtMb2FkZWQoe3RhcmdldDp7cmVzdWx0OnJ9fSl9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49dGhpcy5faW5wdXQuc2l6ZSx0aGlzLnBhcnNlQ2h1bmsoZS50YXJnZXQucmVzdWx0KX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbigpe3RoaXMuX3NlbmRFcnJvcihpLmVycm9yKX19ZnVuY3Rpb24gcChlKXt2YXIgcjtoLmNhbGwodGhpcyxlPWV8fHt9KSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXtyZXR1cm4gcj1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXtpZighdGhpcy5fZmluaXNoZWQpe3ZhciBlLHQ9dGhpcy5fY29uZmlnLmNodW5rU2l6ZTtyZXR1cm4gdD8oZT1yLnN1YnN0cmluZygwLHQpLHI9ci5zdWJzdHJpbmcodCkpOihlPXIscj1cIlwiKSx0aGlzLl9maW5pc2hlZD0hcix0aGlzLnBhcnNlQ2h1bmsoZSl9fX1mdW5jdGlvbiBnKGUpe2guY2FsbCh0aGlzLGU9ZXx8e30pO3ZhciB0PVtdLHI9ITAsaT0hMTt0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7aC5wcm90b3R5cGUucGF1c2UuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnBhdXNlKCl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7aC5wcm90b3R5cGUucmVzdW1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLl9pbnB1dC5yZXN1bWUoKX0sdGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSx0aGlzLl9pbnB1dC5vbihcImRhdGFcIix0aGlzLl9zdHJlYW1EYXRhKSx0aGlzLl9pbnB1dC5vbihcImVuZFwiLHRoaXMuX3N0cmVhbUVuZCksdGhpcy5faW5wdXQub24oXCJlcnJvclwiLHRoaXMuX3N0cmVhbUVycm9yKX0sdGhpcy5fY2hlY2tJc0ZpbmlzaGVkPWZ1bmN0aW9uKCl7aSYmMT09PXQubGVuZ3RoJiYodGhpcy5fZmluaXNoZWQ9ITApfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0Lmxlbmd0aD90aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKTpyPSEwfSx0aGlzLl9zdHJlYW1EYXRhPXYoZnVuY3Rpb24oZSl7dHJ5e3QucHVzaChcInN0cmluZ1wiPT10eXBlb2YgZT9lOmUudG9TdHJpbmcodGhpcy5fY29uZmlnLmVuY29kaW5nKSksciYmKHI9ITEsdGhpcy5fY2hlY2tJc0ZpbmlzaGVkKCksdGhpcy5wYXJzZUNodW5rKHQuc2hpZnQoKSkpfWNhdGNoKGUpe3RoaXMuX3N0cmVhbUVycm9yKGUpfX0sdGhpcyksdGhpcy5fc3RyZWFtRXJyb3I9dihmdW5jdGlvbihlKXt0aGlzLl9zdHJlYW1DbGVhblVwKCksdGhpcy5fc2VuZEVycm9yKGUpfSx0aGlzKSx0aGlzLl9zdHJlYW1FbmQ9dihmdW5jdGlvbigpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSxpPSEwLHRoaXMuX3N0cmVhbURhdGEoXCJcIil9LHRoaXMpLHRoaXMuX3N0cmVhbUNsZWFuVXA9dihmdW5jdGlvbigpe3RoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzKX1mdW5jdGlvbiByKG0pe3ZhciBhLG8sdSxpPU1hdGgucG93KDIsNTMpLG49LWkscz0vXlxccyotPyhcXGQrXFwuP3xcXC5cXGQrfFxcZCtcXC5cXGQrKShbZUVdWy0rXT9cXGQrKT9cXHMqJC8saD0vXigoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGRcXC5cXGQrKFsrLV1bMC0yXVxcZDpbMC01XVxcZHxaKSl8KFxcZHs0fS1bMDFdXFxkLVswLTNdXFxkVFswLTJdXFxkOlswLTVdXFxkOlswLTVdXFxkKFsrLV1bMC0yXVxcZDpbMC01XVxcZHxaKSl8KFxcZHs0fS1bMDFdXFxkLVswLTNdXFxkVFswLTJdXFxkOlswLTVdXFxkKFsrLV1bMC0yXVxcZDpbMC01XVxcZHxaKSkpJC8sdD10aGlzLHI9MCxmPTAsZD0hMSxlPSExLGw9W10sYz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX07aWYoSihtLnN0ZXApKXt2YXIgcD1tLnN0ZXA7bS5zdGVwPWZ1bmN0aW9uKGUpe2lmKGM9ZSxfKCkpZygpO2Vsc2V7aWYoZygpLDA9PT1jLmRhdGEubGVuZ3RoKXJldHVybjtyKz1lLmRhdGEubGVuZ3RoLG0ucHJldmlldyYmcj5tLnByZXZpZXc/by5hYm9ydCgpOihjLmRhdGE9Yy5kYXRhWzBdLHAoYyx0KSl9fX1mdW5jdGlvbiB5KGUpe3JldHVyblwiZ3JlZWR5XCI9PT1tLnNraXBFbXB0eUxpbmVzP1wiXCI9PT1lLmpvaW4oXCJcIikudHJpbSgpOjE9PT1lLmxlbmd0aCYmMD09PWVbMF0ubGVuZ3RofWZ1bmN0aW9uIGcoKXtyZXR1cm4gYyYmdSYmKGsoXCJEZWxpbWl0ZXJcIixcIlVuZGV0ZWN0YWJsZURlbGltaXRlclwiLFwiVW5hYmxlIHRvIGF1dG8tZGV0ZWN0IGRlbGltaXRpbmcgY2hhcmFjdGVyOyBkZWZhdWx0ZWQgdG8gJ1wiK2IuRGVmYXVsdERlbGltaXRlcitcIidcIiksdT0hMSksbS5za2lwRW1wdHlMaW5lcyYmKGMuZGF0YT1jLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiF5KGUpfSkpLF8oKSYmZnVuY3Rpb24oKXtpZighYylyZXR1cm47ZnVuY3Rpb24gZShlLHQpe0oobS50cmFuc2Zvcm1IZWFkZXIpJiYoZT1tLnRyYW5zZm9ybUhlYWRlcihlLHQpKSxsLnB1c2goZSl9aWYoQXJyYXkuaXNBcnJheShjLmRhdGFbMF0pKXtmb3IodmFyIHQ9MDtfKCkmJnQ8Yy5kYXRhLmxlbmd0aDt0KyspYy5kYXRhW3RdLmZvckVhY2goZSk7Yy5kYXRhLnNwbGljZSgwLDEpfWVsc2UgYy5kYXRhLmZvckVhY2goZSl9KCksZnVuY3Rpb24oKXtpZighY3x8IW0uaGVhZGVyJiYhbS5keW5hbWljVHlwaW5nJiYhbS50cmFuc2Zvcm0pcmV0dXJuIGM7ZnVuY3Rpb24gZShlLHQpe3ZhciByLGk9bS5oZWFkZXI/e306W107Zm9yKHI9MDtyPGUubGVuZ3RoO3IrKyl7dmFyIG49cixzPWVbcl07bS5oZWFkZXImJihuPXI+PWwubGVuZ3RoP1wiX19wYXJzZWRfZXh0cmFcIjpsW3JdKSxtLnRyYW5zZm9ybSYmKHM9bS50cmFuc2Zvcm0ocyxuKSkscz12KG4scyksXCJfX3BhcnNlZF9leHRyYVwiPT09bj8oaVtuXT1pW25dfHxbXSxpW25dLnB1c2gocykpOmlbbl09c31yZXR1cm4gbS5oZWFkZXImJihyPmwubGVuZ3RoP2soXCJGaWVsZE1pc21hdGNoXCIsXCJUb29NYW55RmllbGRzXCIsXCJUb28gbWFueSBmaWVsZHM6IGV4cGVjdGVkIFwiK2wubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK3IsZit0KTpyPGwubGVuZ3RoJiZrKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vRmV3RmllbGRzXCIsXCJUb28gZmV3IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrcixmK3QpKSxpfXZhciB0PTE7IWMuZGF0YS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoYy5kYXRhWzBdKT8oYy5kYXRhPWMuZGF0YS5tYXAoZSksdD1jLmRhdGEubGVuZ3RoKTpjLmRhdGE9ZShjLmRhdGEsMCk7bS5oZWFkZXImJmMubWV0YSYmKGMubWV0YS5maWVsZHM9bCk7cmV0dXJuIGYrPXQsY30oKX1mdW5jdGlvbiBfKCl7cmV0dXJuIG0uaGVhZGVyJiYwPT09bC5sZW5ndGh9ZnVuY3Rpb24gdihlLHQpe3JldHVybiByPWUsbS5keW5hbWljVHlwaW5nRnVuY3Rpb24mJnZvaWQgMD09PW0uZHluYW1pY1R5cGluZ1tyXSYmKG0uZHluYW1pY1R5cGluZ1tyXT1tLmR5bmFtaWNUeXBpbmdGdW5jdGlvbihyKSksITA9PT0obS5keW5hbWljVHlwaW5nW3JdfHxtLmR5bmFtaWNUeXBpbmcpP1widHJ1ZVwiPT09dHx8XCJUUlVFXCI9PT10fHxcImZhbHNlXCIhPT10JiZcIkZBTFNFXCIhPT10JiYoZnVuY3Rpb24oZSl7aWYocy50ZXN0KGUpKXt2YXIgdD1wYXJzZUZsb2F0KGUpO2lmKG48dCYmdDxpKXJldHVybiEwfXJldHVybiExfSh0KT9wYXJzZUZsb2F0KHQpOmgudGVzdCh0KT9uZXcgRGF0ZSh0KTpcIlwiPT09dD9udWxsOnQpOnQ7dmFyIHJ9ZnVuY3Rpb24gayhlLHQscixpKXt2YXIgbj17dHlwZTplLGNvZGU6dCxtZXNzYWdlOnJ9O3ZvaWQgMCE9PWkmJihuLnJvdz1pKSxjLmVycm9ycy5wdXNoKG4pfXRoaXMucGFyc2U9ZnVuY3Rpb24oZSx0LHIpe3ZhciBpPW0ucXVvdGVDaGFyfHwnXCInO2lmKG0ubmV3bGluZXx8KG0ubmV3bGluZT1mdW5jdGlvbihlLHQpe2U9ZS5zdWJzdHJpbmcoMCwxMDQ4NTc2KTt2YXIgcj1uZXcgUmVnRXhwKFEodCkrXCIoW15dKj8pXCIrUSh0KSxcImdtXCIpLGk9KGU9ZS5yZXBsYWNlKHIsXCJcIikpLnNwbGl0KFwiXFxyXCIpLG49ZS5zcGxpdChcIlxcblwiKSxzPTE8bi5sZW5ndGgmJm5bMF0ubGVuZ3RoPGlbMF0ubGVuZ3RoO2lmKDE9PT1pLmxlbmd0aHx8cylyZXR1cm5cIlxcblwiO2Zvcih2YXIgYT0wLG89MDtvPGkubGVuZ3RoO28rKylcIlxcblwiPT09aVtvXVswXSYmYSsrO3JldHVybiBhPj1pLmxlbmd0aC8yP1wiXFxyXFxuXCI6XCJcXHJcIn0oZSxpKSksdT0hMSxtLmRlbGltaXRlcilKKG0uZGVsaW1pdGVyKSYmKG0uZGVsaW1pdGVyPW0uZGVsaW1pdGVyKGUpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIpO2Vsc2V7dmFyIG49ZnVuY3Rpb24oZSx0LHIsaSxuKXt2YXIgcyxhLG8sdTtuPW58fFtcIixcIixcIlxcdFwiLFwifFwiLFwiO1wiLGIuUkVDT1JEX1NFUCxiLlVOSVRfU0VQXTtmb3IodmFyIGg9MDtoPG4ubGVuZ3RoO2grKyl7dmFyIGY9bltoXSxkPTAsbD0wLGM9MDtvPXZvaWQgMDtmb3IodmFyIHA9bmV3IEUoe2NvbW1lbnRzOmksZGVsaW1pdGVyOmYsbmV3bGluZTp0LHByZXZpZXc6MTB9KS5wYXJzZShlKSxnPTA7ZzxwLmRhdGEubGVuZ3RoO2crKylpZihyJiZ5KHAuZGF0YVtnXSkpYysrO2Vsc2V7dmFyIF89cC5kYXRhW2ddLmxlbmd0aDtsKz1fLHZvaWQgMCE9PW8/MDxfJiYoZCs9TWF0aC5hYnMoXy1vKSxvPV8pOm89X30wPHAuZGF0YS5sZW5ndGgmJihsLz1wLmRhdGEubGVuZ3RoLWMpLCh2b2lkIDA9PT1hfHxkPD1hKSYmKHZvaWQgMD09PXV8fHU8bCkmJjEuOTk8bCYmKGE9ZCxzPWYsdT1sKX1yZXR1cm57c3VjY2Vzc2Z1bDohIShtLmRlbGltaXRlcj1zKSxiZXN0RGVsaW1pdGVyOnN9fShlLG0ubmV3bGluZSxtLnNraXBFbXB0eUxpbmVzLG0uY29tbWVudHMsbS5kZWxpbWl0ZXJzVG9HdWVzcyk7bi5zdWNjZXNzZnVsP20uZGVsaW1pdGVyPW4uYmVzdERlbGltaXRlcjoodT0hMCxtLmRlbGltaXRlcj1iLkRlZmF1bHREZWxpbWl0ZXIpLGMubWV0YS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXJ9dmFyIHM9dyhtKTtyZXR1cm4gbS5wcmV2aWV3JiZtLmhlYWRlciYmcy5wcmV2aWV3KyssYT1lLG89bmV3IEUocyksYz1vLnBhcnNlKGEsdCxyKSxnKCksZD97bWV0YTp7cGF1c2VkOiEwfX06Y3x8e21ldGE6e3BhdXNlZDohMX19fSx0aGlzLnBhdXNlZD1mdW5jdGlvbigpe3JldHVybiBkfSx0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7ZD0hMCxvLmFib3J0KCksYT1KKG0uY2h1bmspP1wiXCI6YS5zdWJzdHJpbmcoby5nZXRDaGFySW5kZXgoKSl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dC5zdHJlYW1lci5faGFsdGVkPyhkPSExLHQuc3RyZWFtZXIucGFyc2VDaHVuayhhLCEwKSk6c2V0VGltZW91dCh0LnJlc3VtZSwzKX0sdGhpcy5hYm9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGV9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtlPSEwLG8uYWJvcnQoKSxjLm1ldGEuYWJvcnRlZD0hMCxKKG0uY29tcGxldGUpJiZtLmNvbXBsZXRlKGMpLGE9XCJcIn19ZnVuY3Rpb24gUShlKXtyZXR1cm4gZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZyxcIlxcXFwkJlwiKX1mdW5jdGlvbiBFKGope3ZhciB6LE09KGo9anx8e30pLmRlbGltaXRlcixQPWoubmV3bGluZSxVPWouY29tbWVudHMscT1qLnN0ZXAsTj1qLnByZXZpZXcsQj1qLmZhc3RNb2RlLEs9ej12b2lkIDA9PT1qLnF1b3RlQ2hhcnx8bnVsbD09PWoucXVvdGVDaGFyPydcIic6ai5xdW90ZUNoYXI7aWYodm9pZCAwIT09ai5lc2NhcGVDaGFyJiYoSz1qLmVzY2FwZUNoYXIpLChcInN0cmluZ1wiIT10eXBlb2YgTXx8LTE8Yi5CQURfREVMSU1JVEVSUy5pbmRleE9mKE0pKSYmKE09XCIsXCIpLFU9PT1NKXRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgY2hhcmFjdGVyIHNhbWUgYXMgZGVsaW1pdGVyXCIpOyEwPT09VT9VPVwiI1wiOihcInN0cmluZ1wiIT10eXBlb2YgVXx8LTE8Yi5CQURfREVMSU1JVEVSUy5pbmRleE9mKFUpKSYmKFU9ITEpLFwiXFxuXCIhPT1QJiZcIlxcclwiIT09UCYmXCJcXHJcXG5cIiE9PVAmJihQPVwiXFxuXCIpO3ZhciBXPTAsSD0hMTt0aGlzLnBhcnNlPWZ1bmN0aW9uKGksdCxyKXtpZihcInN0cmluZ1wiIT10eXBlb2YgaSl0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dCBtdXN0IGJlIGEgc3RyaW5nXCIpO3ZhciBuPWkubGVuZ3RoLGU9TS5sZW5ndGgscz1QLmxlbmd0aCxhPVUubGVuZ3RoLG89SihxKSx1PVtdLGg9W10sZj1bXSxkPVc9MDtpZighaSlyZXR1cm4gTCgpO2lmKGouaGVhZGVyJiYhdCl7dmFyIGw9aS5zcGxpdChQKVswXS5zcGxpdChNKSxjPVtdLHA9e30sZz0hMTtmb3IodmFyIF8gaW4gbCl7dmFyIG09bFtfXTtKKGoudHJhbnNmb3JtSGVhZGVyKSYmKG09ai50cmFuc2Zvcm1IZWFkZXIobSxfKSk7dmFyIHk9bSx2PXBbbV18fDA7Zm9yKDA8diYmKGc9ITAseT1tK1wiX1wiK3YpLHBbbV09disxO2MuaW5jbHVkZXMoeSk7KXk9eStcIl9cIit2O2MucHVzaCh5KX1pZihnKXt2YXIgaz1pLnNwbGl0KFApO2tbMF09Yy5qb2luKE0pLGk9ay5qb2luKFApfX1pZihCfHwhMSE9PUImJi0xPT09aS5pbmRleE9mKHopKXtmb3IodmFyIGI9aS5zcGxpdChQKSxFPTA7RTxiLmxlbmd0aDtFKyspe2lmKGY9YltFXSxXKz1mLmxlbmd0aCxFIT09Yi5sZW5ndGgtMSlXKz1QLmxlbmd0aDtlbHNlIGlmKHIpcmV0dXJuIEwoKTtpZighVXx8Zi5zdWJzdHJpbmcoMCxhKSE9PVUpe2lmKG8pe2lmKHU9W10sSShmLnNwbGl0KE0pKSxGKCksSClyZXR1cm4gTCgpfWVsc2UgSShmLnNwbGl0KE0pKTtpZihOJiZOPD1FKXJldHVybiB1PXUuc2xpY2UoMCxOKSxMKCEwKX19cmV0dXJuIEwoKX1mb3IodmFyIHc9aS5pbmRleE9mKE0sVyksUj1pLmluZGV4T2YoUCxXKSxDPW5ldyBSZWdFeHAoUShLKStRKHopLFwiZ1wiKSxTPWkuaW5kZXhPZih6LFcpOzspaWYoaVtXXSE9PXopaWYoVSYmMD09PWYubGVuZ3RoJiZpLnN1YnN0cmluZyhXLFcrYSk9PT1VKXtpZigtMT09PVIpcmV0dXJuIEwoKTtXPVIrcyxSPWkuaW5kZXhPZihQLFcpLHc9aS5pbmRleE9mKE0sVyl9ZWxzZSBpZigtMSE9PXcmJih3PFJ8fC0xPT09UikpZi5wdXNoKGkuc3Vic3RyaW5nKFcsdykpLFc9dytlLHc9aS5pbmRleE9mKE0sVyk7ZWxzZXtpZigtMT09PVIpYnJlYWs7aWYoZi5wdXNoKGkuc3Vic3RyaW5nKFcsUikpLEQoUitzKSxvJiYoRigpLEgpKXJldHVybiBMKCk7aWYoTiYmdS5sZW5ndGg+PU4pcmV0dXJuIEwoITApfWVsc2UgZm9yKFM9VyxXKys7Oyl7aWYoLTE9PT0oUz1pLmluZGV4T2YoeixTKzEpKSlyZXR1cm4gcnx8aC5wdXNoKHt0eXBlOlwiUXVvdGVzXCIsY29kZTpcIk1pc3NpbmdRdW90ZXNcIixtZXNzYWdlOlwiUXVvdGVkIGZpZWxkIHVudGVybWluYXRlZFwiLHJvdzp1Lmxlbmd0aCxpbmRleDpXfSksVCgpO2lmKFM9PT1uLTEpcmV0dXJuIFQoaS5zdWJzdHJpbmcoVyxTKS5yZXBsYWNlKEMseikpO2lmKHohPT1LfHxpW1MrMV0hPT1LKXtpZih6PT09S3x8MD09PVN8fGlbUy0xXSE9PUspey0xIT09dyYmdzxTKzEmJih3PWkuaW5kZXhPZihNLFMrMSkpLC0xIT09UiYmUjxTKzEmJihSPWkuaW5kZXhPZihQLFMrMSkpO3ZhciBPPUEoLTE9PT1SP3c6TWF0aC5taW4odyxSKSk7aWYoaS5zdWJzdHIoUysxK08sZSk9PT1NKXtmLnB1c2goaS5zdWJzdHJpbmcoVyxTKS5yZXBsYWNlKEMseikpLGlbVz1TKzErTytlXSE9PXomJihTPWkuaW5kZXhPZih6LFcpKSx3PWkuaW5kZXhPZihNLFcpLFI9aS5pbmRleE9mKFAsVyk7YnJlYWt9dmFyIHg9QShSKTtpZihpLnN1YnN0cmluZyhTKzEreCxTKzEreCtzKT09PVApe2lmKGYucHVzaChpLnN1YnN0cmluZyhXLFMpLnJlcGxhY2UoQyx6KSksRChTKzEreCtzKSx3PWkuaW5kZXhPZihNLFcpLFM9aS5pbmRleE9mKHosVyksbyYmKEYoKSxIKSlyZXR1cm4gTCgpO2lmKE4mJnUubGVuZ3RoPj1OKXJldHVybiBMKCEwKTticmVha31oLnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiSW52YWxpZFF1b3Rlc1wiLG1lc3NhZ2U6XCJUcmFpbGluZyBxdW90ZSBvbiBxdW90ZWQgZmllbGQgaXMgbWFsZm9ybWVkXCIscm93OnUubGVuZ3RoLGluZGV4Old9KSxTKyt9fWVsc2UgUysrfXJldHVybiBUKCk7ZnVuY3Rpb24gSShlKXt1LnB1c2goZSksZD1XfWZ1bmN0aW9uIEEoZSl7dmFyIHQ9MDtpZigtMSE9PWUpe3ZhciByPWkuc3Vic3RyaW5nKFMrMSxlKTtyJiZcIlwiPT09ci50cmltKCkmJih0PXIubGVuZ3RoKX1yZXR1cm4gdH1mdW5jdGlvbiBUKGUpe3JldHVybiByfHwodm9pZCAwPT09ZSYmKGU9aS5zdWJzdHJpbmcoVykpLGYucHVzaChlKSxXPW4sSShmKSxvJiZGKCkpLEwoKX1mdW5jdGlvbiBEKGUpe1c9ZSxJKGYpLGY9W10sUj1pLmluZGV4T2YoUCxXKX1mdW5jdGlvbiBMKGUpe3JldHVybntkYXRhOnUsZXJyb3JzOmgsbWV0YTp7ZGVsaW1pdGVyOk0sbGluZWJyZWFrOlAsYWJvcnRlZDpILHRydW5jYXRlZDohIWUsY3Vyc29yOmQrKHR8fDApfX19ZnVuY3Rpb24gRigpe3EoTCgpKSx1PVtdLGg9W119fSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7SD0hMH0sdGhpcy5nZXRDaGFySW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gV319ZnVuY3Rpb24gXyhlKXt2YXIgdD1lLmRhdGEscj1hW3Qud29ya2VySWRdLGk9ITE7aWYodC5lcnJvcilyLnVzZXJFcnJvcih0LmVycm9yLHQuZmlsZSk7ZWxzZSBpZih0LnJlc3VsdHMmJnQucmVzdWx0cy5kYXRhKXt2YXIgbj17YWJvcnQ6ZnVuY3Rpb24oKXtpPSEwLG0odC53b3JrZXJJZCx7ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7YWJvcnRlZDohMH19KX0scGF1c2U6eSxyZXN1bWU6eX07aWYoSihyLnVzZXJTdGVwKSl7Zm9yKHZhciBzPTA7czx0LnJlc3VsdHMuZGF0YS5sZW5ndGgmJihyLnVzZXJTdGVwKHtkYXRhOnQucmVzdWx0cy5kYXRhW3NdLGVycm9yczp0LnJlc3VsdHMuZXJyb3JzLG1ldGE6dC5yZXN1bHRzLm1ldGF9LG4pLCFpKTtzKyspO2RlbGV0ZSB0LnJlc3VsdHN9ZWxzZSBKKHIudXNlckNodW5rKSYmKHIudXNlckNodW5rKHQucmVzdWx0cyxuLHQuZmlsZSksZGVsZXRlIHQucmVzdWx0cyl9dC5maW5pc2hlZCYmIWkmJm0odC53b3JrZXJJZCx0LnJlc3VsdHMpfWZ1bmN0aW9uIG0oZSx0KXt2YXIgcj1hW2VdO0ooci51c2VyQ29tcGxldGUpJiZyLnVzZXJDb21wbGV0ZSh0KSxyLnRlcm1pbmF0ZSgpLGRlbGV0ZSBhW2VdfWZ1bmN0aW9uIHkoKXt0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpfWZ1bmN0aW9uIHcoZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGV8fG51bGw9PT1lKXJldHVybiBlO3ZhciB0PUFycmF5LmlzQXJyYXkoZSk/W106e307Zm9yKHZhciByIGluIGUpdFtyXT13KGVbcl0pO3JldHVybiB0fWZ1bmN0aW9uIHYoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtlLmFwcGx5KHQsYXJndW1lbnRzKX19ZnVuY3Rpb24gSihlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlfXJldHVybiBvJiYoZi5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRhO3ZvaWQgMD09PWIuV09SS0VSX0lEJiZ0JiYoYi5XT1JLRVJfSUQ9dC53b3JrZXJJZCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQuaW5wdXQpZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czpiLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpLGZpbmlzaGVkOiEwfSk7ZWxzZSBpZihmLkZpbGUmJnQuaW5wdXQgaW5zdGFuY2VvZiBGaWxlfHx0LmlucHV0IGluc3RhbmNlb2YgT2JqZWN0KXt2YXIgcj1iLnBhcnNlKHQuaW5wdXQsdC5jb25maWcpO3ImJmYucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOmIuV09SS0VSX0lELHJlc3VsdHM6cixmaW5pc2hlZDohMH0pfX0pLChsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGgucHJvdG90eXBlKSkuY29uc3RydWN0b3I9bCwoYy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShoLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPWMsKHAucHJvdG90eXBlPU9iamVjdC5jcmVhdGUocC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1wLChnLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGgucHJvdG90eXBlKSkuY29uc3RydWN0b3I9ZyxifSk7IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJleHBvcnQgY2xhc3MgV2VhdGhlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNpdHksXG4gICAgY291bnRyeSxcbiAgICBzdGFydERhdGUsXG4gICAgZW5kRGF0ZSxcbiAgICAvLyBjb3VudHJ5LFxuICAgIC8vIG1heFRlbXAsXG4gICAgLy8gbWluVGVtcCxcbiAgICAvLyBhdmdUZW1wLFxuICAgIC8vIGRlc2NyaXB0aW9uLFxuICApIHtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgIHRoaXMuZW5kRGF0ZSA9IGVuZERhdGU7XG4gICAgdGhpcy5jb3VudHJ5ID0gY291bnRyeTtcbiAgICAvLyB0aGlzLm1heFRlbXAgPSBtYXhUZW1wO1xuICAgIC8vIHRoaXMubWluVGVtcCA9IG1pblRlbXA7XG4gICAgLy8gdGhpcy5hdmdUZW1wID0gYXZnVGVtcDtcbiAgICAvLyB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbiAgZ2V0Q2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5jaXR5O1xuICB9XG5cbiAgZ2V0U3RhcnREYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0RGF0ZTtcbiAgfVxuXG4gIGdldEVuZERhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5kRGF0ZTtcbiAgfVxuICBnZXRDb3VudHJ5KCkge1xuICAgIHJldHVybiB0aGlzLmNvdW50cnk7XG4gIH1cblxuICAvLyBnZXRNYXhUZW1wKCkge1xuICAvLyAgIHJldHVybiB0aGlzLm1heFRlbXA7XG4gIC8vIH1cblxuICAvLyBnZXRNaW5UZW1wKCkge1xuICAvLyAgIHJldHVybiB0aGlzLm1pblRlbXA7XG4gIC8vIH1cbiAgLy8gZ2V0QXZnVGVtcCgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5hdmdUZW1wO1xuICAvLyB9XG5cbiAgLy8gZ2V0RGVzY3JpcHRpb24oKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IFdlYXRoZXIgfSBmcm9tIFwiLi4vb2JqL1dlYXRoZXJcIjtcbmltcG9ydCB7IFdlYXRoZXJEZXRhaWxzIH0gZnJvbSBcIi4uL2Z1bmN0aW9uL2ZldGNoV2VhdGhlclwiO1xuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IHRhYmxlIH0gZnJvbSBcIi4uL2Z1bmN0aW9uL21ha2VUYWJsZVwiO1xuaW1wb3J0IHsgYm9keUNvbnRlbnQgfSBmcm9tIFwiLi4vZnVuY3Rpb24vbG9hZGVyXCI7XG5cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5jb250ZW50LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50XCIpO1xuY29uc3QgY29udGVudEJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG5cbmNvbnN0IGNvbnRlbnRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmNvbnN0IGNvbnRlbnRUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbi8vY29udGVudFRhYmxlLmNsYXNzTGlzdC5hZGQoXCJjb250ZW50LXRhYmxlXCIpO1xuY29udGVudEZvcm0uY2xhc3NMaXN0LmFkZChcImNvbnRlbnQtZm9ybVwiKTtcblxuY29uc3QgaW5mbyA9IG5ldyBXZWF0aGVyKFwiaHVsbFwiLCBcInVrXCIsIFwiMjAyMy0xMi0yNFwiLCBcIjIwMjMtMTItMjVcIik7XG5jb25zdCBlbGVtZW50cyA9IFtcbiAgXCJhZGRyZXNzXCIsXG4gIFwidGVtcFwiLFxuICBcInRlbXBtaW5cIixcbiAgXCJ0ZW1wbWF4XCIsXG4gIFwiY29uZGl0aW9uc1wiLFxuICBcImRlc2NyaXB0aW9uXCIsXG5dO1xuLy9jb25zdCB3ZWF0aGVyQ29udGVudCA9IFdlYXRoZXJEZXRhaWxzKCkuY2FsbFdlYXRoZXJBUEkoaW5mbywgZWxlbWVudHMpO1xuXG4vL2NvbnNvbGUubG9nKHdlYXRoZXJDb250ZW50XG5cbmNvbnN0IHRhYmxlRGF0YSA9IHRhYmxlKClcbiAgLnBhcnNlQ1NWKGBhZGRyZXNzLHRlbXBtYXgsdGVtcG1pbix0ZW1wLGNvbmRpdGlvbnMsZGVzY3JpcHRpb25cbmh1bGwgdWssMTQuMSwxMS43LDEzLFwiUmFpbiwgT3ZlcmNhc3RcIixDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5IHdpdGggZWFybHkgbW9ybmluZyByYWluLlxuaHVsbCB1aywxMS40LDguNiw5LjgsXCJSYWluLCBPdmVyY2FzdFwiLENsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkgd2l0aCBhIGNoYW5jZSBvZiByYWluLmApO1xuXG5jb25zdCB0YWJsZUJvZHkgPSB0YWJsZSgpLmNyZWF0ZVRhYmxlKHRhYmxlRGF0YS5kYXRhKTtcbmNvbnRlbnRUYWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuY29udGVudEZvcm0uYXBwZW5kQ2hpbGQoYm9keUNvbnRlbnQoKS5yZW5kZXIoKSk7XG4vL2JvZHkuYXBwZW5kQ2hpbGQodGFibGVCb2R5KTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudEZvcm0pO1xuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnV0dG9uXCIpO1xuY29uc3QgY291bnRyeU5hbWVGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeS1maWVsZFwiKTtcbmNvbnN0IGNvdW50cnlPcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VsZWN0XCIpO1xuY29uc3QgZGF0ZXNPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZSA9XCJkYXRlXCJdJyk7XG5jb25zdCB3ZWF0aGVyT3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dFtuYW1lID1cIndlYXRoZXItb3B0aW9uc1wiXTpjaGVja2VkJyxcbik7XG5cbnN1Ym1pdEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGxldCB3ZWF0aGVyVmFsdWVzID0gW107XG4gIGxldCBkYXRlVmFsdWVzID0gW107XG5cbiAgZGF0ZXNPcHRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBkYXRlVmFsdWVzLnB1c2goaXRlbS52YWx1ZSk7XG4gIH0pO1xuXG4gIHdlYXRoZXJPcHRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICB3ZWF0aGVyVmFsdWVzLnB1c2goaXRlbS52YWx1ZSk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhjb3VudHJ5TmFtZUZpZWxkLnZhbHVlKTtcbiAgY29uc29sZS5sb2coY291bnRyeU9wdGlvbi52YWx1ZSk7XG4gIGNvbnNvbGUubG9nKGRhdGVWYWx1ZXMpO1xuICBjb25zb2xlLmxvZyh3ZWF0aGVyVmFsdWVzKTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgZGlzcGxheVRhYmxlKCk7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudFRhYmxlKTtcbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYWJsZSgpIHtcbiAgY29udGVudC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJbc3RhcnRdMWZyW3N0YXJ0LWVuZF0gM2ZyIFtlbmRdXCI7XG59XG4vL2NvbnNvbGUubG9nKHRhYmxlRGF0YS5kYXRhKVxuXG5cbi8qe1wicXVlcnlDb3N0XCI6MSxcImxhdGl0dWRlXCI6NTMuNzQzMixcImxvbmdpdHVkZVwiOi0wLjM0NTY1LFwicmVzb2x2ZWRBZGRyZXNzXCI6XCJIdWxsLCBFbmdsYW5kLCBVbml0ZWQgS2luZ2RvbVwiLFwiYWRkcmVzc1wiOlwiaHVsbCB1a1wiLFwidGltZXpvbmVcIjpcIkV1cm9wZS9Mb25kb25cIixcInR6b2Zmc2V0XCI6MC4wLFwiZGF5c1wiOlt7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wMlwiLFwidGVtcG1heFwiOjQ4LjgsXCJ0ZW1wbWluXCI6NDQuNyxcInRlbXBcIjo0Ni45LFwiaWNvblwiOlwicmFpblwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wM1wiLFwidGVtcG1heFwiOjQ2LjEsXCJ0ZW1wbWluXCI6NDEuMyxcInRlbXBcIjo0My45LFwiaWNvblwiOlwicmFpblwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNFwiLFwidGVtcG1heFwiOjQ0LjksXCJ0ZW1wbWluXCI6MzYuNixcInRlbXBcIjo0MS4yLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDVcIixcInRlbXBtYXhcIjozOC45LFwidGVtcG1pblwiOjMyLjMsXCJ0ZW1wXCI6MzUuOSxcImljb25cIjpcImNsb3VkeVwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNlwiLFwidGVtcG1heFwiOjM5LjMsXCJ0ZW1wbWluXCI6MzYuOCxcInRlbXBcIjozOC40LFwiaWNvblwiOlwiY2xvdWR5XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTA3XCIsXCJ0ZW1wbWF4XCI6MzkuOCxcInRlbXBtaW5cIjozMy4wLFwidGVtcFwiOjM3LjAsXCJpY29uXCI6XCJwYXJ0bHktY2xvdWR5LWRheVwifV19YCAqL1xuLy8gLyp7XCJxdWVyeUNvc3RcIjoxLFwibGF0aXR1ZGVcIjo1My43NDMyLFwibG9uZ2l0dWRlXCI6LTAuMzQ1NjUsXCJyZXNvbHZlZEFkZHJlc3NcIjpcIkh1bGwsIEVuZ2xhbmQsIFVuaXRlZCBLaW5nZG9tXCIsXCJhZGRyZXNzXCI6XCJodWxsIHVrXCIsXCJ0aW1lem9uZVwiOlwiRXVyb3BlL0xvbmRvblwiLFwidHpvZmZzZXRcIjowLjAsXCJkYXlzXCI6W3tcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTAyXCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNDE1MzYwMCxcInRlbXBtYXhcIjo0OC44LFwidGVtcG1pblwiOjQ0LjcsXCJ0ZW1wXCI6NDYuOSxcImZlZWxzbGlrZW1heFwiOjQ1LjksXCJmZWVsc2xpa2VtaW5cIjozOC43LFwiZmVlbHNsaWtlXCI6NDIuMSxcImRld1wiOjQ0LjcsXCJodW1pZGl0eVwiOjkxLjksXCJwcmVjaXBcIjowLjY1NyxcInByZWNpcHByb2JcIjoxMDAuMCxcInByZWNpcGNvdmVyXCI6NTguMzMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjI1LjUsXCJ3aW5kc3BlZWRcIjoxNy42LFwid2luZGRpclwiOjIxMS4zLFwicHJlc3N1cmVcIjo5ODEuMixcImNsb3VkY292ZXJcIjo4My41LFwidmlzaWJpbGl0eVwiOjUuMSxcInNvbGFycmFkaWF0aW9uXCI6Mi4wLFwic29sYXJlbmVyZ3lcIjowLjEsXCJ1dmluZGV4XCI6MC4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxODo1MlwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDE4MzUzMixcInN1bnNldFwiOlwiMTU6NTE6NDhcIixcInN1bnNldEVwb2NoXCI6MTcwNDIxMDcwOCxcIm1vb25waGFzZVwiOjAuNzEsXCJjb25kaXRpb25zXCI6XCJSYWluLCBQYXJ0aWFsbHkgY2xvdWR5XCIsXCJkZXNjcmlwdGlvblwiOlwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkgd2l0aCBhIGNoYW5jZSBvZiByYWluIHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcInJhaW5cIixcInN0YXRpb25zXCI6W1wiRUdYVlwiLFwiRDg3OTFcIixcIkVHWFNcIixcIkVHTkpcIl0sXCJzb3VyY2VcIjpcImNvbWJcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDNcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0MjQwMDAwLFwidGVtcG1heFwiOjQ2LjEsXCJ0ZW1wbWluXCI6NDEuMyxcInRlbXBcIjo0My45LFwiZmVlbHNsaWtlbWF4XCI6NDMuMSxcImZlZWxzbGlrZW1pblwiOjM3LjAsXCJmZWVsc2xpa2VcIjozOS44LFwiZGV3XCI6NDEuOSxcImh1bWlkaXR5XCI6OTIuOCxcInByZWNpcFwiOjAuMTA0LFwicHJlY2lwcHJvYlwiOjk2LjgsXCJwcmVjaXBjb3ZlclwiOjMzLjMzLFwicHJlY2lwdHlwZVwiOltcInJhaW5cIl0sXCJzbm93XCI6MC4wLFwic25vd2RlcHRoXCI6MC4wLFwid2luZGd1c3RcIjoxOC42LFwid2luZHNwZWVkXCI6MTEuMixcIndpbmRkaXJcIjoyMzkuNixcInByZXNzdXJlXCI6OTg3LjYsXCJjbG91ZGNvdmVyXCI6ODAuNCxcInZpc2liaWxpdHlcIjoxMy4zLFwic29sYXJyYWRpYXRpb25cIjoxMC4wLFwic29sYXJlbmVyZ3lcIjowLjgsXCJ1dmluZGV4XCI6MS4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxODozOFwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDI2OTkxOCxcInN1bnNldFwiOlwiMTU6NTI6NTlcIixcInN1bnNldEVwb2NoXCI6MTcwNDI5NzE3OSxcIm1vb25waGFzZVwiOjAuNzQsXCJjb25kaXRpb25zXCI6XCJSYWluLCBQYXJ0aWFsbHkgY2xvdWR5XCIsXCJkZXNjcmlwdGlvblwiOlwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkgd2l0aCBlYXJseSBtb3JuaW5nIHJhaW4uXCIsXCJpY29uXCI6XCJyYWluXCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDRcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0MzI2NDAwLFwidGVtcG1heFwiOjQ0LjksXCJ0ZW1wbWluXCI6MzYuNixcInRlbXBcIjo0MS4yLFwiZmVlbHNsaWtlbWF4XCI6NDEuMyxcImZlZWxzbGlrZW1pblwiOjM2LjYsXCJmZWVsc2xpa2VcIjozOC4zLFwiZGV3XCI6MzkuNixcImh1bWlkaXR5XCI6OTQuMyxcInByZWNpcFwiOjAuMCxcInByZWNpcHByb2JcIjoyMi42LFwicHJlY2lwY292ZXJcIjowLjAsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjEzLjYsXCJ3aW5kc3BlZWRcIjo4LjMsXCJ3aW5kZGlyXCI6MjI3LjgsXCJwcmVzc3VyZVwiOjk5OS4xLFwiY2xvdWRjb3ZlclwiOjY2LjQsXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MjIuMSxcInNvbGFyZW5lcmd5XCI6MS45LFwidXZpbmRleFwiOjIuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTg6MjBcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQzNTYzMDAsXCJzdW5zZXRcIjpcIjE1OjU0OjEzXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQzODM2NTMsXCJtb29ucGhhc2VcIjowLjc1LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNVwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ0MTI4MDAsXCJ0ZW1wbWF4XCI6MzguOSxcInRlbXBtaW5cIjozMi4zLFwidGVtcFwiOjM1LjksXCJmZWVsc2xpa2VtYXhcIjozOC45LFwiZmVlbHNsaWtlbWluXCI6MjkuMSxcImZlZWxzbGlrZVwiOjM0LjMsXCJkZXdcIjozNS43LFwiaHVtaWRpdHlcIjo5OC4wLFwicHJlY2lwXCI6MC4wOTUsXCJwcmVjaXBwcm9iXCI6MTkuNCxcInByZWNpcGNvdmVyXCI6MjAuODMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjguNyxcIndpbmRzcGVlZFwiOjQuNyxcIndpbmRkaXJcIjoyNzYuMCxcInByZXNzdXJlXCI6MTAwNC44LFwiY2xvdWRjb3ZlclwiOjk2LjksXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MjMuOCxcInNvbGFyZW5lcmd5XCI6Mi4xLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTc6NTlcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ0NDI2NzksXCJzdW5zZXRcIjpcIjE1OjU1OjI5XCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ0NzAxMjksXCJtb29ucGhhc2VcIjowLjgxLFwiY29uZGl0aW9uc1wiOlwiT3ZlcmNhc3RcIixcImRlc2NyaXB0aW9uXCI6XCJDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwiY2xvdWR5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDZcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0NDk5MjAwLFwidGVtcG1heFwiOjM5LjMsXCJ0ZW1wbWluXCI6MzYuOCxcInRlbXBcIjozOC40LFwiZmVlbHNsaWtlbWF4XCI6MzkuMyxcImZlZWxzbGlrZW1pblwiOjM2LjMsXCJmZWVsc2xpa2VcIjozOC4wLFwiZGV3XCI6MzcuMixcImh1bWlkaXR5XCI6OTUuMSxcInByZWNpcFwiOjAuMDIsXCJwcmVjaXBwcm9iXCI6MTYuMSxcInByZWNpcGNvdmVyXCI6MTYuNjcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjcuMixcIndpbmRzcGVlZFwiOjQuMCxcIndpbmRkaXJcIjoyMzIuNixcInByZXNzdXJlXCI6MTAxOC41LFwiY2xvdWRjb3ZlclwiOjkzLjIsXCJ2aXNpYmlsaXR5XCI6MTMuOCxcInNvbGFycmFkaWF0aW9uXCI6MjguMSxcInNvbGFyZW5lcmd5XCI6Mi40LFwidXZpbmRleFwiOjIuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTc6MzVcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ1MjkwNTUsXCJzdW5zZXRcIjpcIjE1OjU2OjQ4XCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ1NTY2MDgsXCJtb29ucGhhc2VcIjowLjg0LFwiY29uZGl0aW9uc1wiOlwiT3ZlcmNhc3RcIixcImRlc2NyaXB0aW9uXCI6XCJDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwiY2xvdWR5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDdcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0NTg1NjAwLFwidGVtcG1heFwiOjM5LjgsXCJ0ZW1wbWluXCI6MzMuMCxcInRlbXBcIjozNy4wLFwiZmVlbHNsaWtlbWF4XCI6MzguMixcImZlZWxzbGlrZW1pblwiOjI2LjAsXCJmZWVsc2xpa2VcIjozMy43LFwiZGV3XCI6MzEuNyxcImh1bWlkaXR5XCI6ODEuNixcInByZWNpcFwiOjAuMDA0LFwicHJlY2lwcHJvYlwiOjI1LjgsXCJwcmVjaXBjb3ZlclwiOjQuMTcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiLFwic25vd1wiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjIyLjUsXCJ3aW5kc3BlZWRcIjo5LjcsXCJ3aW5kZGlyXCI6MzQ0LjUsXCJwcmVzc3VyZVwiOjEwMjkuNyxcImNsb3VkY292ZXJcIjo1MS44LFwidmlzaWJpbGl0eVwiOjE1LjAsXCJzb2xhcnJhZGlhdGlvblwiOjQ3LjIsXCJzb2xhcmVuZXJneVwiOjQuMSxcInV2aW5kZXhcIjoyLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE3OjA2XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0NjE1NDI2LFwic3Vuc2V0XCI6XCIxNTo1ODoxMFwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0NjQzMDkwLFwibW9vbnBoYXNlXCI6MC44NyxcImNvbmRpdGlvbnNcIjpcIlBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJDbGVhcmluZyBpbiB0aGUgYWZ0ZXJub29uLlwiLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wOFwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ2NzIwMDAsXCJ0ZW1wbWF4XCI6NDIuNSxcInRlbXBtaW5cIjozNy4xLFwidGVtcFwiOjM5LjgsXCJmZWVsc2xpa2VtYXhcIjozNi45LFwiZmVlbHNsaWtlbWluXCI6MzEuOSxcImZlZWxzbGlrZVwiOjM0LjAsXCJkZXdcIjozMi44LFwiaHVtaWRpdHlcIjo3NS44LFwicHJlY2lwXCI6MC4wOTEsXCJwcmVjaXBwcm9iXCI6MjkuMCxcInByZWNpcGNvdmVyXCI6MjAuODMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjEsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjI4LjksXCJ3aW5kc3BlZWRcIjoxNi4zLFwid2luZGRpclwiOjUwLjgsXCJwcmVzc3VyZVwiOjEwMzYuNSxcImNsb3VkY292ZXJcIjo1OS44LFwidmlzaWJpbGl0eVwiOjE1LjAsXCJzb2xhcnJhZGlhdGlvblwiOjIyLjYsXCJzb2xhcmVuZXJneVwiOjIuMSxcInV2aW5kZXhcIjoxLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE2OjM0XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0NzAxNzk0LFwic3Vuc2V0XCI6XCIxNTo1OTozNVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0NzI5NTc1LFwibW9vbnBoYXNlXCI6MC45LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwic25vd1wiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTA5XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNDc1ODQwMCxcInRlbXBtYXhcIjo0MS44LFwidGVtcG1pblwiOjM3LjEsXCJ0ZW1wXCI6MzkuNyxcImZlZWxzbGlrZW1heFwiOjM5LjQsXCJmZWVsc2xpa2VtaW5cIjozMi45LFwiZmVlbHNsaWtlXCI6MzYuNCxcImRld1wiOjMyLjAsXCJodW1pZGl0eVwiOjc0LjEsXCJwcmVjaXBcIjowLjAwNCxcInByZWNpcHByb2JcIjoyOS4wLFwicHJlY2lwY292ZXJcIjo0LjE3LFwicHJlY2lwdHlwZVwiOltcInJhaW5cIl0sXCJzbm93XCI6MC4wLFwic25vd2RlcHRoXCI6MC4wLFwid2luZGd1c3RcIjoxMi4zLFwid2luZHNwZWVkXCI6Ni45LFwid2luZGRpclwiOjIyLjUsXCJwcmVzc3VyZVwiOjEwMzguMixcImNsb3VkY292ZXJcIjo3OC4wLFwidmlzaWJpbGl0eVwiOjE1LjAsXCJzb2xhcnJhZGlhdGlvblwiOjIzLjMsXCJzb2xhcmVuZXJneVwiOjIuMSxcInV2aW5kZXhcIjoxLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE1OjU5XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0Nzg4MTU5LFwic3Vuc2V0XCI6XCIxNjowMTowMVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0ODE2MDYxLFwibW9vbnBoYXNlXCI6MC45NCxcImNvbmRpdGlvbnNcIjpcIlBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJQYXJ0bHkgY2xvdWR5IHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcInBhcnRseS1jbG91ZHktZGF5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMTBcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0ODQ0ODAwLFwidGVtcG1heFwiOjQzLjgsXCJ0ZW1wbWluXCI6MzkuNixcInRlbXBcIjo0Mi4yLFwiZmVlbHNsaWtlbWF4XCI6MzkuNixcImZlZWxzbGlrZW1pblwiOjM1LjIsXCJmZWVsc2xpa2VcIjozNy44LFwiZGV3XCI6MzYuOCxcImh1bWlkaXR5XCI6ODEuMixcInByZWNpcFwiOjAuMDI0LFwicHJlY2lwcHJvYlwiOjkuNyxcInByZWNpcGNvdmVyXCI6MjAuODMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjE4LjYsXCJ3aW5kc3BlZWRcIjo4LjksXCJ3aW5kZGlyXCI6NTEuNixcInByZXNzdXJlXCI6MTAzNS40LFwiY2xvdWRjb3ZlclwiOjk3LjksXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6OS42LFwic29sYXJlbmVyZ3lcIjowLjYsXCJ1dmluZGV4XCI6MC4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxNToyMFwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDg3NDUyMCxcInN1bnNldFwiOlwiMTY6MDI6MzFcIixcInN1bnNldEVwb2NoXCI6MTcwNDkwMjU1MSxcIm1vb25waGFzZVwiOjAuOTcsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xMVwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ5MzEyMDAsXCJ0ZW1wbWF4XCI6NDMuMSxcInRlbXBtaW5cIjo0MS40LFwidGVtcFwiOjQxLjksXCJmZWVsc2xpa2VtYXhcIjozNy43LFwiZmVlbHNsaWtlbWluXCI6MzYuMCxcImZlZWxzbGlrZVwiOjM2LjcsXCJkZXdcIjozNS4wLFwiaHVtaWRpdHlcIjo3Ni40LFwicHJlY2lwXCI6MC4wMTIsXCJwcmVjaXBwcm9iXCI6Ni41LFwicHJlY2lwY292ZXJcIjoxMi41LFwicHJlY2lwdHlwZVwiOltcInJhaW5cIl0sXCJzbm93XCI6MC4wLFwic25vd2RlcHRoXCI6MC4wLFwid2luZGd1c3RcIjoxNy4yLFwid2luZHNwZWVkXCI6MTAuMSxcIndpbmRkaXJcIjo3Ni45LFwicHJlc3N1cmVcIjoxMDI4LjgsXCJjbG91ZGNvdmVyXCI6MTAwLjAsXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MTIuMCxcInNvbGFyZW5lcmd5XCI6MS4yLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTQ6MzhcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ5NjA4NzgsXCJzdW5zZXRcIjpcIjE2OjA0OjAyXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ5ODkwNDIsXCJtb29ucGhhc2VcIjowLjAsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xMlwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDUwMTc2MDAsXCJ0ZW1wbWF4XCI6NDEuNixcInRlbXBtaW5cIjozNS4zLFwidGVtcFwiOjM5LjUsXCJmZWVsc2xpa2VtYXhcIjozOC44LFwiZmVlbHNsaWtlbWluXCI6MzEuMSxcImZlZWxzbGlrZVwiOjM2LjMsXCJkZXdcIjozMy41LFwiaHVtaWRpdHlcIjo3OS4zLFwicHJlY2lwXCI6MC4wLFwicHJlY2lwcHJvYlwiOjIyLjYsXCJwcmVjaXBjb3ZlclwiOjAuMCxcInByZWNpcHR5cGVcIjpudWxsLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6OS44LFwid2luZHNwZWVkXCI6NS40LFwid2luZGRpclwiOjE1OS41LFwicHJlc3N1cmVcIjoxMDEzLjIsXCJjbG91ZGNvdmVyXCI6OTIuMixcInZpc2liaWxpdHlcIjoxNS4wLFwic29sYXJyYWRpYXRpb25cIjozNi45LFwic29sYXJlbmVyZ3lcIjozLjMsXCJ1dmluZGV4XCI6Mi4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxMzo1MlwiLFwic3VucmlzZUVwb2NoXCI6MTcwNTA0NzIzMixcInN1bnNldFwiOlwiMTY6MDU6MzZcIixcInN1bnNldEVwb2NoXCI6MTcwNTA3NTUzNixcIm1vb25waGFzZVwiOjAuMDQsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xM1wiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDUxMDQwMDAsXCJ0ZW1wbWF4XCI6NDAuOSxcInRlbXBtaW5cIjozNS4xLFwidGVtcFwiOjM4LjcsXCJmZWVsc2xpa2VtYXhcIjozNy4xLFwiZmVlbHNsaWtlbWluXCI6MzAuOCxcImZlZWxzbGlrZVwiOjM0LjMsXCJkZXdcIjozNC43LFwiaHVtaWRpdHlcIjo4NS42LFwicHJlY2lwXCI6MC4wMzYsXCJwcmVjaXBwcm9iXCI6MjIuNixcInByZWNpcGNvdmVyXCI6MTYuNjcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjI0LjgsXCJ3aW5kc3BlZWRcIjoxNS45LFwid2luZGRpclwiOjIyLjAsXCJwcmVzc3VyZVwiOjk5Ni43LFwiY2xvdWRjb3ZlclwiOjEwMC4wLFwidmlzaWJpbGl0eVwiOjE0LjksXCJzb2xhcnJhZGlhdGlvblwiOjcuOCxcInNvbGFyZW5lcmd5XCI6MC42LFwidXZpbmRleFwiOjAuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTM6MDNcIixcInN1bnJpc2VFcG9jaFwiOjE3MDUxMzM1ODMsXCJzdW5zZXRcIjpcIjE2OjA3OjEyXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDUxNjIwMzIsXCJtb29ucGhhc2VcIjowLjA3LFwiY29uZGl0aW9uc1wiOlwiT3ZlcmNhc3RcIixcImRlc2NyaXB0aW9uXCI6XCJDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwiY2xvdWR5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMTRcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA1MTkwNDAwLFwidGVtcG1heFwiOjQwLjAsXCJ0ZW1wbWluXCI6MzEuNyxcInRlbXBcIjozNS41LFwiZmVlbHNsaWtlbWF4XCI6MzEuNyxcImZlZWxzbGlrZW1pblwiOjIzLjAsXCJmZWVsc2xpa2VcIjoyNy4xLFwiZGV3XCI6MjcuNyxcImh1bWlkaXR5XCI6NzMuMyxcInByZWNpcFwiOjAuMDIsXCJwcmVjaXBwcm9iXCI6MjIuNixcInByZWNpcGNvdmVyXCI6MTYuNjcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiLFwic25vd1wiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjMxLjMsXCJ3aW5kc3BlZWRcIjoxNS45LFwid2luZGRpclwiOjMwOS40LFwicHJlc3N1cmVcIjo5OTguNSxcImNsb3VkY292ZXJcIjo5MC4xLFwidmlzaWJpbGl0eVwiOjE0LjMsXCJzb2xhcnJhZGlhdGlvblwiOjMxLjUsXCJzb2xhcmVuZXJneVwiOjIuNyxcInV2aW5kZXhcIjoxLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjEyOjExXCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA1MjE5OTMxLFwic3Vuc2V0XCI6XCIxNjowODo1MFwiLFwic3Vuc2V0RXBvY2hcIjoxNzA1MjQ4NTMwLFwibW9vbnBoYXNlXCI6MC4xMSxcImNvbmRpdGlvbnNcIjpcIk92ZXJjYXN0XCIsXCJkZXNjcmlwdGlvblwiOlwiQ2xvdWR5IHNraWVzIHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcImNsb3VkeVwiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTE1XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNTI3NjgwMCxcInRlbXBtYXhcIjozNi4yLFwidGVtcG1pblwiOjMwLjgsXCJ0ZW1wXCI6MzMuMCxcImZlZWxzbGlrZW1heFwiOjI1LjYsXCJmZWVsc2xpa2VtaW5cIjoxOS4wLFwiZmVlbHNsaWtlXCI6MjIuMCxcImRld1wiOjI2LjIsXCJodW1pZGl0eVwiOjc2LjQsXCJwcmVjaXBcIjowLjE5OCxcInByZWNpcHByb2JcIjoyOS4wLFwicHJlY2lwY292ZXJcIjoyOS4xNyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCIsXCJzbm93XCJdLFwic25vd1wiOjAuOCxcInNub3dkZXB0aFwiOjAuMixcIndpbmRndXN0XCI6NDEuOCxcIndpbmRzcGVlZFwiOjI0LjYsXCJ3aW5kZGlyXCI6MzEwLjEsXCJwcmVzc3VyZVwiOjEwMDUuOSxcImNsb3VkY292ZXJcIjo2OS4zLFwidmlzaWJpbGl0eVwiOjguNSxcInNvbGFycmFkaWF0aW9uXCI6MzUuMCxcInNvbGFyZW5lcmd5XCI6My4wLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTE6MTZcIixcInN1bnJpc2VFcG9jaFwiOjE3MDUzMDYyNzYsXCJzdW5zZXRcIjpcIjE2OjEwOjMwXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDUzMzUwMzAsXCJtb29ucGhhc2VcIjowLjE0LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwic25vd1wiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTE2XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNTM2MzIwMCxcInRlbXBtYXhcIjozNC4xLFwidGVtcG1pblwiOjI5LjIsXCJ0ZW1wXCI6MzEuOCxcImZlZWxzbGlrZW1heFwiOjI0LjksXCJmZWVsc2xpa2VtaW5cIjoxOS43LFwiZmVlbHNsaWtlXCI6MjEuOSxcImRld1wiOjI2LjIsXCJodW1pZGl0eVwiOjc5LjYsXCJwcmVjaXBcIjowLjA2NyxcInByZWNpcHByb2JcIjoxOS40LFwicHJlY2lwY292ZXJcIjoyMC44MyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCIsXCJzbm93XCJdLFwic25vd1wiOjAuMixcInNub3dkZXB0aFwiOjAuNyxcIndpbmRndXN0XCI6MzUuNixcIndpbmRzcGVlZFwiOjE3LjIsXCJ3aW5kZGlyXCI6MzA5LjEsXCJwcmVzc3VyZVwiOjEwMTMuNixcImNsb3VkY292ZXJcIjo1NS44LFwidmlzaWJpbGl0eVwiOjEzLjgsXCJzb2xhcnJhZGlhdGlvblwiOjQwLjAsXCJzb2xhcmVuZXJneVwiOjMuNSxcInV2aW5kZXhcIjoyLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjEwOjE3XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA1MzkyNjE3LFwic3Vuc2V0XCI6XCIxNjoxMjoxMVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA1NDIxNTMxLFwibW9vbnBoYXNlXCI6MC4xOCxcImNvbmRpdGlvbnNcIjpcIlBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJQYXJ0bHkgY2xvdWR5IHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcInNub3dcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifV0sXCJzdGF0aW9uc1wiOntcIkVHWFZcIjp7XCJkaXN0YW5jZVwiOjE1MTY1LjAsXCJsYXRpdHVkZVwiOjUzLjg3LFwibG9uZ2l0dWRlXCI6LTAuNDMsXCJ1c2VDb3VudFwiOjAsXCJpZFwiOlwiRUdYVlwiLFwibmFtZVwiOlwiRUdYVlwiLFwicXVhbGl0eVwiOjUwLFwiY29udHJpYnV0aW9uXCI6MC4wfSxcIkQ4NzkxXCI6e1wiZGlzdGFuY2VcIjoyOTk2LjAsXCJsYXRpdHVkZVwiOjUzLjc0LFwibG9uZ2l0dWRlXCI6LTAuMzkxLFwidXNlQ291bnRcIjowLFwiaWRcIjpcIkQ4NzkxXCIsXCJuYW1lXCI6XCJEVzg3OTEgSHVsbCBVS1wiLFwicXVhbGl0eVwiOjAsXCJjb250cmlidXRpb25cIjowLjB9LFwiRUdYU1wiOntcImRpc3RhbmNlXCI6NDM5MzEuMCxcImxhdGl0dWRlXCI6NTMuNDgsXCJsb25naXR1ZGVcIjowLjE1LFwidXNlQ291bnRcIjowLFwiaWRcIjpcIkVHWFNcIixcIm5hbWVcIjpcIkVHWFNcIixcInF1YWxpdHlcIjo0OSxcImNvbnRyaWJ1dGlvblwiOjAuMH0sXCJFR05KXCI6e1wiZGlzdGFuY2VcIjoxODE3MC4wLFwibGF0aXR1ZGVcIjo1My41OCxcImxvbmdpdHVkZVwiOi0wLjM1LFwidXNlQ291bnRcIjowLFwiaWRcIjpcIkVHTkpcIixcIm5hbWVcIjpcIkVHTkpcIixcInF1YWxpdHlcIjo1MCxcImNvbnRyaWJ1dGlvblwiOjAuMH19fSAqL1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9