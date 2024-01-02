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
      if (response.status === 200) return response.text();
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

contentTable.classList.add("content-table");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVMsZ0lBQWdJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9mdW5jdGlvbi9mZXRjaFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9mdW5jdGlvbi9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9mdW5jdGlvbi9tYWtlVGFibGUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3BhcGFwYXJzZS9wYXBhcGFyc2UubWluLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9vYmovV2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2VhdGhlciB9IGZyb20gXCIuLi9vYmovV2VhdGhlclwiO1xuXG5leHBvcnQgY29uc3QgV2VhdGhlckRldGFpbHMgPSAoKSA9PiB7XG4gIGZ1bmN0aW9uIGJ1aWxkQXBpVVJMKHdlYXRoZXJJbmZvLCBlbGVtZW50cykge1xuICAgIGxldCB1cmxFbmQgPSBgJmluY2x1ZGU9ZGF5cyZrZXk9R0dMWUU2Rjg0Mk02U0M0R1ZIVlhSWkY0UiZjb250ZW50VHlwZT1qc29uYDtcbiAgICBsZXQgbWFpblVybCA9IGBodHRwczovL3dlYXRoZXIudmlzdWFsY3Jvc3NpbmcuY29tL1Zpc3VhbENyb3NzaW5nV2ViU2VydmljZXMvcmVzdC9zZXJ2aWNlcy90aW1lbGluZS8ke3dlYXRoZXJJbmZvLmdldENpdHkoKX0lMjAke3dlYXRoZXJJbmZvLmdldENvdW50cnkoKX0vJHt3ZWF0aGVySW5mby5nZXRTdGFydERhdGUoKX1gO1xuXG4gICAgbWFpblVybCA9IHdlYXRoZXJJbmZvLmdldEVuZERhdGUoKVxuICAgICAgPyBgJHttYWluVXJsfS8ke3dlYXRoZXJJbmZvLmdldEVuZERhdGUoKX0/YFxuICAgICAgOiBgJHttYWluVXJsfT9gO1xuXG4gICAgbWFpblVybCArPSBgdW5pdEdyb3VwPW1ldHJpYyZlbGVtZW50cz1kYXRldGltZSUyQ3Jlc29sdmVkQWRkcmVzcyUyQ3RlbXBtYXglMkN0ZW1wbWluJTJDdGVtcCUyQ2ljb25gO1xuXG4gICAgbGV0IG5ld1VybCA9IGVsZW1lbnRzXG4gICAgICA/IGFkZEVsZW1lbnRzKGAke21haW5Vcmx9JTJgLCBlbGVtZW50cylcbiAgICAgIDogYCR7bWFpblVybH0mYDtcblxuICAgIHJldHVybiBgJHtuZXdVcmx9JHt1cmxFbmR9YDtcbiAgfVxuICBhc3luYyBmdW5jdGlvbiBjYWxsV2VhdGhlckFQSShpbmZvLCBlbGVtZW50cykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cmwgPSBhd2FpdCBidWlsZEFwaVVSTChpbmZvLCBlbGVtZW50cyk7XG4gICAgICAvL3JldHVybiB1cmw7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRFbGVtZW50cyhzdHJpbmcsIGVsZW1lbnRzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgIT09IGVsZW1lbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc3RyaW5nICs9IGAke2VsZW1lbnRzW2ldfSUyQ2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJpbmcgKz0gYCR7ZWxlbWVudHNbaV19YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHJldHVybiB7IGNhbGxXZWF0aGVyQVBJIH07XG59O1xuXG4vL2h0dHBzOi8vd2VhdGhlci52aXN1YWxjcm9zc2luZy5jb20vVmlzdWFsQ3Jvc3NpbmdXZWJTZXJ2aWNlcy9yZXN0L3NlcnZpY2VzL3RpbWVsaW5lL2h1bGwlMjB1az91bml0R3JvdXA9dXMmaW5jbHVkZT1kYXlzJmtleT1CTkFYMkdCVUVERjlYQ1U2RTc0U1U0VDM2JmNvbnRlbnRUeXBlPWNzdlxuIiwiZXhwb3J0IGNvbnN0IGJvZHlDb250ZW50ID0gKCkgPT4ge1xuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgY29uc3QgZm9ybURldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBjb25zdCBmb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtRGl2LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWRpdlwiKTtcbiAgICBjb25zdCBmb3JtVGV4dEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG4gICAgc3VibWl0QnRuLmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gICAgZm9ybVRleHRCb3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgZm9ybVRleHRCb3guc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJFbnRlciBMb2NhdGlvbiBIZXJlXCIpO1xuICAgIGZvcm1UZXh0Qm94LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY291bnRyeS1maWVsZFwiKTtcbiAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGZvcm1UZXh0Qm94KTtcbiAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGNyZWF0ZUNvdW50cnlEcm9wRG93bigpKTtcbiAgICBmb3JtRGV0YWlscy5hcHBlbmRDaGlsZChmb3JtRGl2KTtcbiAgICBmb3JtRGV0YWlscy5hcHBlbmRDaGlsZChjcmVhdGVEYXRlcygpKTtcbiAgICBmb3JtRGV0YWlscy5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyT3B0aW9ucygpKTtcbiAgICBmb3JtRGV0YWlscy5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xuXG4gICAgcmV0dXJuIGZvcm1EZXRhaWxzO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRGF0ZXMoKSB7XG4gICAgY29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGF0ZURpdi5jbGFzc0xpc3QuYWRkKFwiZGF0ZS1kaXZcIik7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbnN0IGVuZERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cbiAgICBzdGFydERhdGUuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInN0YXJ0LWRhdGVcIik7XG4gICAgc3RhcnREYXRlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xuICAgIHN0YXJ0RGF0ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcIm1pblwiLFxuICAgICAgYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMCl9YCxcbiAgICApO1xuICAgIHN0YXJ0RGF0ZS52YWx1ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTApO1xuICAgIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTApO1xuICAgIHN0YXJ0RGF0ZS5yZXF1aXJlZCA9IHRydWVcblxuICAgIGVuZERhdGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gICAgZW5kRGF0ZS5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ1NlbGVjdCBFbmQgRGF0ZScpXG4gICAgZW5kRGF0ZS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiZW5kLWRhdGVcIik7XG4gICAgc3RhcnREYXRlLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgZW5kRGF0ZS5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgc3RhcnREYXRlLnZhbHVlKTtcbiAgICB9O1xuXG4gICAgZGF0ZURpdi5hcHBlbmRDaGlsZChzdGFydERhdGUpO1xuICAgIGRhdGVEaXYuYXBwZW5kQ2hpbGQoZW5kRGF0ZSk7XG5cbiAgICByZXR1cm4gZGF0ZURpdjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvdW50cnlEcm9wRG93bigpIHtcbiAgICBjb25zdCBkcm9wRG93bkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgY291bnRyeUNvZGUgPSBbXG4gICAgICB7IGNvdW50cnk6IFwiVW5pdGVkIEtpbmdkb21cIiwgY29kZTogXCJHQlwiIH0sXG4gICAgICB7IGNvdW50cnk6IFwiQXVzdHJhbGlhXCIsIGNvZGU6IFwiQVVcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIkNhbmFkYVwiLCBjb2RlOiBcIkNBXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJOaWdlcmlhXCIsIGNvZGU6IFwiTkdcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIkdlcm1hbnlcIiwgY29kZTogXCJERVwiIH0sXG4gICAgICB7IGNvdW50cnk6IFwiVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhXCIsIGNvZGU6IFwiVVNcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIlNvdXRoIEFmcmljYVwiLCBjb2RlOiBcIlpBXCIgfSxcbiAgICBdO1xuXG4gICAgY29uc3Qgc29ydGVkTGlzdGVkID0gY291bnRyeUNvZGUuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKGEuY291bnRyeSA8IGIuY291bnRyeSkgcmV0dXJuIC0xO1xuICAgICAgaWYgKGEuY291bnRyeSA+IGIuY291bnRyeSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcblxuICAgIHNvcnRlZExpc3RlZC51bnNoaWZ0KHsgY291bnRyeTogXCJTZWxlY3QgQ291bnRyeVwiLCBjb2RlOiBcIlwiIH0sKVxuICAgIFxuICAgIGNvbnN0IGRyb3BEb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICBjb25zdCBkcm9wRG93bk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIik7XG4gICAgLy9kcm9wRG93bk5hbWUubGFiZWwgPSBcIlNlbGVjdCBDb3VudHJ5XCI7XG4gICAgLy9kcm9wRG93bi5hcHBlbmRDaGlsZChkcm9wRG93bk5hbWUpO1xuXG4gICAgc29ydGVkTGlzdGVkLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGRyb3Bkb3duSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBkcm9wZG93bkl0ZW0udmFsdWUgPSBpdGVtLmNvZGU7XG4gICAgICBkcm9wZG93bkl0ZW0udGV4dENvbnRlbnQgPSBpdGVtLmNvdW50cnk7XG4gICAgICBpZiAoaXRlbS5jb3VudHJ5ID09PSAnU2VsZWN0IENvdW50cnknKSB7XG4gICAgICAgIGRyb3Bkb3duSXRlbS5zZWxlY3RlZCA9IHRydWVcbiAgICAgICAgLy9kcm9wZG93bkl0ZW0uZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGRyb3BEb3duLmFwcGVuZENoaWxkKGRyb3Bkb3duSXRlbSk7XG4gICAgfSk7XG5cbiAgICBkcm9wRG93bkRpdi5hcHBlbmRDaGlsZChkcm9wRG93bik7XG4gICAgcmV0dXJuIGRyb3BEb3duRGl2O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlV2VhdGhlck9wdGlvbnMoKSB7XG4gICAgY29uc3Qgd2VhdGhlckhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgd2VhdGhlckhlYWRlci50ZXh0Q29udGVudCA9IFwiQ2hvb3NlIHRoZSBXZWF0aGVyIERldGFpbHM6XCI7XG5cbiAgICBjb25zdCB3ZWF0aGVyT3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBjb25zdCB3ZWF0aGVyT3B0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgd2VhdGhlck9wdGlvbnNEaXYuY2xhc3NMaXN0LmFkZCgnd2VhdGhlci1vcHRpb25zLWRpdicpXG5cbiAgICB3ZWF0aGVyT3B0aW9ucy5hcHBlbmRDaGlsZCh3ZWF0aGVySGVhZGVyKTtcbiAgICBjb25zdCBkZWZhdWx0V2VhdGhlck9wdGlvbnMgPSBbXG4gICAgICAvLyBcImFkZHJlc3NcIixcbiAgICAgIC8vIFwidGVtcFwiLFxuICAgICAgLy8gXCJ0ZW1wbWluXCIsXG4gICAgICAvLyBcInRlbXBtYXhcIixcbiAgICAgIC8vIFwiY29uZGl0aW9uc1wiLFxuICAgICAgLy8gXCJkZXNjcmlwdGlvblwiLFxuICAgIF07XG5cbiAgICBkZWZhdWx0V2VhdGhlck9wdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgY29uc3Qgb3B0aW9uc0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXG4gICAgICBvcHRpb25zTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGl0ZW0pO1xuICAgICAgY29uc3Qgb3B0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBvcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgICBvcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwid2VhdGhlci1vcHRpb25zXCIpO1xuICAgICAgb3B0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYCR7aXRlbX1gKTtcbiAgICAgIG9wdGlvbklucHV0LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgLy9vcHRpb25zTGFiZWwuYXBwZW5kQ2hpbGQob3B0aW9uSW5wdXQpO1xuICAgICAgb3B0aW9uc0xhYmVsLnRleHRDb250ZW50ID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGl0ZW0pO1xuXG4gICAgICBvcHRpb25zTGFiZWwub25jbGljayA9IHNlbGVjdEl0ZW1cbiAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25JbnB1dCk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQob3B0aW9uc0xhYmVsKVxuXG4gICAgICB3ZWF0aGVyT3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChkaXYpXG4gICAgfSk7XG4gICAgY29uc3Qgd2VhdGhlck9wdGlvbnNPdGhlciA9IFtcbiAgICAgIFwiZmVlbHNsaWtlbWF4XCIsXG4gICAgICBcImZlZWxzbGlrZW1pblwiLFxuICAgICAgXCJ3aW5kZ3VzdFwiLFxuICAgICAgXCJ3aW5kc3BlZWRcIixcbiAgICAgIFwid2luZGRpclwiLFxuICAgIF07XG5cbiAgICB3ZWF0aGVyT3B0aW9uc090aGVyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnNMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBvcHRpb25zTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGl0ZW0pO1xuICAgICAgY29uc3Qgb3B0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBvcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgICBvcHRpb25JbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwid2VhdGhlci1vcHRpb25zXCIpO1xuICAgICAgb3B0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYCR7aXRlbX1gKTtcblxuICAgICAgLy9vcHRpb25zTGFiZWwuYXBwZW5kQ2hpbGQob3B0aW9uSW5wdXQpO1xuICAgICAgb3B0aW9uc0xhYmVsLnRleHRDb250ZW50ID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGl0ZW0pO1xuXG4gICAgICBvcHRpb25zTGFiZWwub25jbGljayA9IHNlbGVjdEl0ZW1cbiAgICAgIGRpdi5hcHBlbmRDaGlsZChvcHRpb25JbnB1dCk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQob3B0aW9uc0xhYmVsKTtcblxuICAgICAgd2VhdGhlck9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQoZGl2KVxuICAgIH0pO1xuXG4gICAgd2VhdGhlck9wdGlvbnMuYXBwZW5kQ2hpbGQod2VhdGhlck9wdGlvbnNEaXYpXG5cbiAgICByZXR1cm4gd2VhdGhlck9wdGlvbnM7XG4gIH1cblxuICAvLyBmdW5jdGlvbiBjcmVhdGVcblxuICBmdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIod29yZCkge1xuICAgIHJldHVybiB3b3JkLnJlcGxhY2UoYCR7d29yZFswXX1gLCBgJHt3b3JkWzBdLnRvVXBwZXJDYXNlKCl9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RJdGVtKGV2ZW50KSB7XG4gICAgbGV0IHNpYmxpbmdDaGVja0JveCA9IGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG5cbiAgICBpZiAoc2libGluZ0NoZWNrQm94LmNoZWNrZWQpIHtcbiAgICAgIHNpYmxpbmdDaGVja0JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2libGluZ0NoZWNrQm94LmNoZWNrZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgcmVuZGVyIH07XG59O1xuIiwiaW1wb3J0IFBhcGEgZnJvbSBcInBhcGFwYXJzZVwiO1xuXG5leHBvcnQgY29uc3QgdGFibGUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgZGVsaW1pdGVyOiBcIlwiLCAvLyBhdXRvLWRldGVjdFxuICAgICAgbmV3bGluZTogXCJcIiwgLy8gYXV0by1kZXRlY3RcbiAgICAgIHF1b3RlQ2hhcjogJ1wiJyxcbiAgICAgIGVzY2FwZUNoYXI6ICdcIicsXG4gICAgICBoZWFkZXI6IGZhbHNlLFxuICAgICAgdHJhbnNmb3JtSGVhZGVyOiB1bmRlZmluZWQsXG4gICAgICBkeW5hbWljVHlwaW5nOiBmYWxzZSxcbiAgICAgIHByZXZpZXc6IDAsXG4gICAgICBlbmNvZGluZzogXCJcIixcbiAgICAgIHdvcmtlcjogZmFsc2UsXG4gICAgICBjb21tZW50czogZmFsc2UsXG4gICAgICBzdGVwOiB1bmRlZmluZWQsXG4gICAgICBjb21wbGV0ZTogdW5kZWZpbmVkLFxuICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICAgIGRvd25sb2FkOiBmYWxzZSxcbiAgICAgIGRvd25sb2FkUmVxdWVzdEhlYWRlcnM6IHVuZGVmaW5lZCxcbiAgICAgIGRvd25sb2FkUmVxdWVzdEJvZHk6IHVuZGVmaW5lZCxcbiAgICAgIHNraXBFbXB0eUxpbmVzOiBmYWxzZSxcbiAgICAgIGNodW5rOiB1bmRlZmluZWQsXG4gICAgICBjaHVua1NpemU6IHVuZGVmaW5lZCxcbiAgICAgIGZhc3RNb2RlOiB1bmRlZmluZWQsXG4gICAgICBiZWZvcmVGaXJzdENodW5rOiB1bmRlZmluZWQsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHVuZGVmaW5lZCxcbiAgICAgIHRyYW5zZm9ybTogdW5kZWZpbmVkLFxuICAgICAgZGVsaW1pdGVyc1RvR3Vlc3M6IFtcIixcIiwgXCJcXHRcIiwgXCJ8XCIsIFwiO1wiLCBQYXBhLlJFQ09SRF9TRVAsIFBhcGEuVU5JVF9TRVBdLFxuICAgICAgc2tpcEZpcnN0TkxpbmVzOiAwLFxuICAgIH07XG4gICAgZnVuY3Rpb24gcGFyc2VDU1YoaXRlbSkge1xuICAgICAgcmV0dXJuIFBhcGEucGFyc2UoaXRlbSwgY29uZmlnKVxuICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVGFibGUodGFibGVJdGVtKSB7XG4gICAgICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIGxldCB0YWJsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICAgICAgICBsZXQgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcblxuICAgICAgICBsZXQgdGFibGVIZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICB0YWJsZUl0ZW1bMF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGxldCB0aGVhZGVyUm93SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICAgICAgICAgIGxldCB0aGVhZGVyUm93VGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2l0ZW19YClcblxuICAgICAgICAgICAgdGhlYWRlclJvd0l0ZW0uYXBwZW5kQ2hpbGQodGhlYWRlclJvd1RleHQpO1xuICAgICAgICAgICAgdGFibGVIZWFkZXJSb3cuYXBwZW5kQ2hpbGQodGhlYWRlclJvd0l0ZW0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRhYmxlSGVhZC5hcHBlbmRDaGlsZCh0YWJsZUhlYWRlclJvdyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0YWJsZUl0ZW0ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHRhYmxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0YWJsZUl0ZW1baV0ubGVuZ3RoOyB4Kyspe1xuICAgICAgICAgICAgICAgIGxldCB0YWJsZURhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgICAgIHRhYmxlRGF0YS50ZXh0Q29udGVudCA9IHRhYmxlSXRlbVtpXVt4XTtcblxuICAgICAgICAgICAgICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKHRhYmxlRGF0YSlcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQodGFibGVSb3cpXG4gICAgICAgIH1cbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGFibGVIZWFkKVxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpXG5cbiAgICAgICAgcmV0dXJuIHRhYmxlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZUNTVixcbiAgICAgICAgY3JlYXRlVGFibGVcbiAgICB9XG59O1xuXG5jb25zdCBjb250ZW50Qm9keSA9ICgpID0+IHtcbiAgICBcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBcbip7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG5cbn1cblxuLmNvbnRlbnR7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBbc3RhcnRdMWZyIFtzdGFydC1lbmRdMGZyIFtlbmRdO1xuICAgIGdyaWQtYXV0by1yb3dzOiBhdXRvO1xuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG59XG5cbi5jb250ZW50LXRhYmxle1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgbWFyZ2luOiAxMHB4O1xuICAgIGdyaWQtY29sdW1uOiBzdGFydC1lbmQvZW5kO1xufVxuXG4uY29udGVudC1mb3Jte1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgLyogZGlzcGxheTogZmxleDsgKi9cbn1cbnRhYmxle1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2ZmMDAwMDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgICB3aWR0aDogODAlO1xufVxuXG50aHtcbiAgICBmb250LXNpemU6IDEuNDVyZW07XG4gICAgcGFkZGluZzogNXB4O1xufVxudGg6OmZpcnN0LWxldHRlcntcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuXG50ZHtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICB3aWR0aDogMTUlO1xuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjY2NjYztcbn1cblxuXG5cbmZvcm0ge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHdpZHRoOiA5MCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxNXB4O1xufVxuXG4uZm9ybS1kaXYsIC5kYXRlLWRpdntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMTVweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1zZWxmOmZsZXgtc3RhcnQgO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmZvcm0tZGl2e1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbi5mb3JtLWRpdiBpbnB1dCwgLmZvcm0tZGl2IHNlbGVjdHtcbiAgICB3aWR0aDogOTAlO1xufVxuXG4uZm9ybS1kaXYgaW5wdXQsIC5mb3JtLWRpdiBzZWxlY3QsIC5kYXRlLWRpdiBpbnB1dHtcbiAgICBmb250LXNpemU6IDEuNjVlbTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiA4cHg7XG59XG5cbi8qIHNlbGVjdCBvcHRpb25bZGlzYWJsZWRdOmZpcnN0LWNoaWxkIHtcbiAgICBkaXNwbGF5OiBub25lO1xufSAqL1xuXG5sZWdlbmQsIC53ZWF0aGVyLW9wdGlvbnMtZGl2IGRpdiBsYWJlbHtcbiAgICBmb250LXNpemU6IDEuNTVlbTtcbn1cbi5mb3JtLWRpdiBzZWxlY3R7XG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG4gICAgXG59XG5cblxuLndlYXRoZXItb3B0aW9ucy1kaXZ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgZ2FwOjhweDtcbn1cblxuXG4ud2VhdGhlci1vcHRpb25zLWRpdiBkaXZ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDVweDtcbn1cbi5zdWJtaXQtYnV0dG9ue1xuICAgIHBhZGRpbmc6IDEwcHggMjJweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGZvbnQtc2l6ZTogMS41ZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY29ybmZsb3dlcmJsdWU7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlcjogMDtcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgICBcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUNBO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQix5Q0FBeUM7O0FBRTdDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsc0RBQXNEO0lBQ3RELG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsbUJBQW1COztBQUV2Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGNBQWM7SUFDZCx5QkFBeUI7SUFDekIsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksMEJBQTBCO0FBQzlCOzs7QUFHQTtJQUNJLGlCQUFpQjtJQUNqQixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsdUJBQXVCO0FBQzNCOzs7O0FBSUE7SUFDSSxjQUFjO0lBQ2QsVUFBVTtJQUNWLGFBQWE7O0lBRWIsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFNBQVM7SUFDVCxjQUFjO0lBQ2QsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtJQUN0QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFlBQVk7QUFDaEI7O0FBRUE7O0dBRUc7O0FBRUg7SUFDSSxpQkFBaUI7QUFDckI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7O0FBRTdCOzs7QUFHQTtJQUNJLGFBQWE7SUFDYixlQUFlO0lBQ2YsT0FBTztBQUNYOzs7QUFHQTtJQUNJLGFBQWE7SUFDYixRQUFRO0FBQ1o7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLGdDQUFnQztJQUNoQyxZQUFZO0lBQ1osU0FBUztJQUNULGtCQUFrQjtJQUNsQixtQkFBbUI7O0FBRXZCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcbip7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuXFxufVxcblxcbi5jb250ZW50e1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IFtzdGFydF0xZnIgW3N0YXJ0LWVuZF0wZnIgW2VuZF07XFxuICAgIGdyaWQtYXV0by1yb3dzOiBhdXRvO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxufVxcblxcbi5jb250ZW50LXRhYmxle1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIGdyaWQtY29sdW1uOiBzdGFydC1lbmQvZW5kO1xcbn1cXG5cXG4uY29udGVudC1mb3Jte1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICAvKiBkaXNwbGF5OiBmbGV4OyAqL1xcbn1cXG50YWJsZXtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZjAwMDA7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gICAgd2lkdGg6IDgwJTtcXG59XFxuXFxudGh7XFxuICAgIGZvbnQtc2l6ZTogMS40NXJlbTtcXG4gICAgcGFkZGluZzogNXB4O1xcbn1cXG50aDo6Zmlyc3QtbGV0dGVye1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG59XFxuXFxuXFxudGR7XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICB3aWR0aDogMTUlO1xcbiAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgICBwYWRkaW5nOiA1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyOiAycHggc29saWQgI2NjY2M7XFxufVxcblxcblxcblxcbmZvcm0ge1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDE1cHg7XFxufVxcblxcbi5mb3JtLWRpdiwgLmRhdGUtZGl2e1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDE1cHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24tc2VsZjpmbGV4LXN0YXJ0IDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbn1cXG5cXG4uZm9ybS1kaXZ7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4uZm9ybS1kaXYgaW5wdXQsIC5mb3JtLWRpdiBzZWxlY3R7XFxuICAgIHdpZHRoOiA5MCU7XFxufVxcblxcbi5mb3JtLWRpdiBpbnB1dCwgLmZvcm0tZGl2IHNlbGVjdCwgLmRhdGUtZGl2IGlucHV0e1xcbiAgICBmb250LXNpemU6IDEuNjVlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxufVxcblxcbi8qIHNlbGVjdCBvcHRpb25bZGlzYWJsZWRdOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59ICovXFxuXFxubGVnZW5kLCAud2VhdGhlci1vcHRpb25zLWRpdiBkaXYgbGFiZWx7XFxuICAgIGZvbnQtc2l6ZTogMS41NWVtO1xcbn1cXG4uZm9ybS1kaXYgc2VsZWN0e1xcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XFxuICAgIFxcbn1cXG5cXG5cXG4ud2VhdGhlci1vcHRpb25zLWRpdntcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBnYXA6OHB4O1xcbn1cXG5cXG5cXG4ud2VhdGhlci1vcHRpb25zLWRpdiBkaXZ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogNXB4O1xcbn1cXG4uc3VibWl0LWJ1dHRvbntcXG4gICAgcGFkZGluZzogMTBweCAyMnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBmb250LXNpemU6IDEuNWVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHdpZHRoOiBmaXQtY29udGVudDtcXG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gICAgXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLyogQGxpY2Vuc2VcblBhcGEgUGFyc2VcbnY1LjQuMVxuaHR0cHM6Ly9naXRodWIuY29tL21ob2x0L1BhcGFQYXJzZVxuTGljZW5zZTogTUlUXG4qL1xuIWZ1bmN0aW9uKGUsdCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10KCk6ZS5QYXBhPXQoKX0odGhpcyxmdW5jdGlvbiBzKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGY9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp2b2lkIDAhPT1mP2Y6e307dmFyIG49IWYuZG9jdW1lbnQmJiEhZi5wb3N0TWVzc2FnZSxvPWYuSVNfUEFQQV9XT1JLRVJ8fCExLGE9e30sdT0wLGI9e3BhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9KHQ9dHx8e30pLmR5bmFtaWNUeXBpbmd8fCExO0oocikmJih0LmR5bmFtaWNUeXBpbmdGdW5jdGlvbj1yLHI9e30pO2lmKHQuZHluYW1pY1R5cGluZz1yLHQudHJhbnNmb3JtPSEhSih0LnRyYW5zZm9ybSkmJnQudHJhbnNmb3JtLHQud29ya2VyJiZiLldPUktFUlNfU1VQUE9SVEVEKXt2YXIgaT1mdW5jdGlvbigpe2lmKCFiLldPUktFUlNfU1VQUE9SVEVEKXJldHVybiExO3ZhciBlPShyPWYuVVJMfHxmLndlYmtpdFVSTHx8bnVsbCxpPXMudG9TdHJpbmcoKSxiLkJMT0JfVVJMfHwoYi5CTE9CX1VSTD1yLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbXCJ2YXIgZ2xvYmFsID0gKGZ1bmN0aW9uKCkgeyBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBzZWxmOyB9IGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gd2luZG93OyB9IGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZ2xvYmFsOyB9IHJldHVybiB7fTsgfSkoKTsgZ2xvYmFsLklTX1BBUEFfV09SS0VSPXRydWU7IFwiLFwiKFwiLGksXCIpKCk7XCJdLHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9KSkpKSx0PW5ldyBmLldvcmtlcihlKTt2YXIgcixpO3JldHVybiB0Lm9ubWVzc2FnZT1fLHQuaWQ9dSsrLGFbdC5pZF09dH0oKTtyZXR1cm4gaS51c2VyU3RlcD10LnN0ZXAsaS51c2VyQ2h1bms9dC5jaHVuayxpLnVzZXJDb21wbGV0ZT10LmNvbXBsZXRlLGkudXNlckVycm9yPXQuZXJyb3IsdC5zdGVwPUoodC5zdGVwKSx0LmNodW5rPUoodC5jaHVuayksdC5jb21wbGV0ZT1KKHQuY29tcGxldGUpLHQuZXJyb3I9Sih0LmVycm9yKSxkZWxldGUgdC53b3JrZXIsdm9pZCBpLnBvc3RNZXNzYWdlKHtpbnB1dDplLGNvbmZpZzp0LHdvcmtlcklkOmkuaWR9KX12YXIgbj1udWxsO2IuTk9ERV9TVFJFQU1fSU5QVVQsXCJzdHJpbmdcIj09dHlwZW9mIGU/KGU9ZnVuY3Rpb24oZSl7aWYoNjUyNzk9PT1lLmNoYXJDb2RlQXQoMCkpcmV0dXJuIGUuc2xpY2UoMSk7cmV0dXJuIGV9KGUpLG49dC5kb3dubG9hZD9uZXcgbCh0KTpuZXcgcCh0KSk6ITA9PT1lLnJlYWRhYmxlJiZKKGUucmVhZCkmJkooZS5vbik/bj1uZXcgZyh0KTooZi5GaWxlJiZlIGluc3RhbmNlb2YgRmlsZXx8ZSBpbnN0YW5jZW9mIE9iamVjdCkmJihuPW5ldyBjKHQpKTtyZXR1cm4gbi5zdHJlYW0oZSl9LHVucGFyc2U6ZnVuY3Rpb24oZSx0KXt2YXIgbj0hMSxfPSEwLG09XCIsXCIseT1cIlxcclxcblwiLHM9J1wiJyxhPXMrcyxyPSExLGk9bnVsbCxvPSExOyFmdW5jdGlvbigpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiB0KXJldHVybjtcInN0cmluZ1wiIT10eXBlb2YgdC5kZWxpbWl0ZXJ8fGIuQkFEX0RFTElNSVRFUlMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybi0xIT09dC5kZWxpbWl0ZXIuaW5kZXhPZihlKX0pLmxlbmd0aHx8KG09dC5kZWxpbWl0ZXIpOyhcImJvb2xlYW5cIj09dHlwZW9mIHQucXVvdGVzfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnF1b3Rlc3x8QXJyYXkuaXNBcnJheSh0LnF1b3RlcykpJiYobj10LnF1b3Rlcyk7XCJib29sZWFuXCIhPXR5cGVvZiB0LnNraXBFbXB0eUxpbmVzJiZcInN0cmluZ1wiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lc3x8KHI9dC5za2lwRW1wdHlMaW5lcyk7XCJzdHJpbmdcIj09dHlwZW9mIHQubmV3bGluZSYmKHk9dC5uZXdsaW5lKTtcInN0cmluZ1wiPT10eXBlb2YgdC5xdW90ZUNoYXImJihzPXQucXVvdGVDaGFyKTtcImJvb2xlYW5cIj09dHlwZW9mIHQuaGVhZGVyJiYoXz10LmhlYWRlcik7aWYoQXJyYXkuaXNBcnJheSh0LmNvbHVtbnMpKXtpZigwPT09dC5jb2x1bW5zLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJPcHRpb24gY29sdW1ucyBpcyBlbXB0eVwiKTtpPXQuY29sdW1uc312b2lkIDAhPT10LmVzY2FwZUNoYXImJihhPXQuZXNjYXBlQ2hhcitzKTsoXCJib29sZWFuXCI9PXR5cGVvZiB0LmVzY2FwZUZvcm11bGFlfHx0LmVzY2FwZUZvcm11bGFlIGluc3RhbmNlb2YgUmVnRXhwKSYmKG89dC5lc2NhcGVGb3JtdWxhZSBpbnN0YW5jZW9mIFJlZ0V4cD90LmVzY2FwZUZvcm11bGFlOi9eWz0rXFwtQFxcdFxccl0uKiQvKX0oKTt2YXIgdT1uZXcgUmVnRXhwKFEocyksXCJnXCIpO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKTtpZihBcnJheS5pc0FycmF5KGUpKXtpZighZS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoZVswXSkpcmV0dXJuIGgobnVsbCxlLHIpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdKXJldHVybiBoKGl8fE9iamVjdC5rZXlzKGVbMF0pLGUscil9ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYoZS5kYXRhPUpTT04ucGFyc2UoZS5kYXRhKSksQXJyYXkuaXNBcnJheShlLmRhdGEpJiYoZS5maWVsZHN8fChlLmZpZWxkcz1lLm1ldGEmJmUubWV0YS5maWVsZHN8fGkpLGUuZmllbGRzfHwoZS5maWVsZHM9QXJyYXkuaXNBcnJheShlLmRhdGFbMF0pP2UuZmllbGRzOlwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF0/T2JqZWN0LmtleXMoZS5kYXRhWzBdKTpbXSksQXJyYXkuaXNBcnJheShlLmRhdGFbMF0pfHxcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdfHwoZS5kYXRhPVtlLmRhdGFdKSksaChlLmZpZWxkc3x8W10sZS5kYXRhfHxbXSxyKTt0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gc2VyaWFsaXplIHVucmVjb2duaXplZCBpbnB1dFwiKTtmdW5jdGlvbiBoKGUsdCxyKXt2YXIgaT1cIlwiO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9SlNPTi5wYXJzZSh0KSk7dmFyIG49QXJyYXkuaXNBcnJheShlKSYmMDxlLmxlbmd0aCxzPSFBcnJheS5pc0FycmF5KHRbMF0pO2lmKG4mJl8pe2Zvcih2YXIgYT0wO2E8ZS5sZW5ndGg7YSsrKTA8YSYmKGkrPW0pLGkrPXYoZVthXSxhKTswPHQubGVuZ3RoJiYoaSs9eSl9Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciB1PW4/ZS5sZW5ndGg6dFtvXS5sZW5ndGgsaD0hMSxmPW4/MD09PU9iamVjdC5rZXlzKHRbb10pLmxlbmd0aDowPT09dFtvXS5sZW5ndGg7aWYociYmIW4mJihoPVwiZ3JlZWR5XCI9PT1yP1wiXCI9PT10W29dLmpvaW4oXCJcIikudHJpbSgpOjE9PT10W29dLmxlbmd0aCYmMD09PXRbb11bMF0ubGVuZ3RoKSxcImdyZWVkeVwiPT09ciYmbil7Zm9yKHZhciBkPVtdLGw9MDtsPHU7bCsrKXt2YXIgYz1zP2VbbF06bDtkLnB1c2godFtvXVtjXSl9aD1cIlwiPT09ZC5qb2luKFwiXCIpLnRyaW0oKX1pZighaCl7Zm9yKHZhciBwPTA7cDx1O3ArKyl7MDxwJiYhZiYmKGkrPW0pO3ZhciBnPW4mJnM/ZVtwXTpwO2krPXYodFtvXVtnXSxwKX1vPHQubGVuZ3RoLTEmJighcnx8MDx1JiYhZikmJihpKz15KX19cmV0dXJuIGl9ZnVuY3Rpb24gdihlLHQpe2lmKG51bGw9PWUpcmV0dXJuXCJcIjtpZihlLmNvbnN0cnVjdG9yPT09RGF0ZSlyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSkuc2xpY2UoMSwyNSk7dmFyIHI9ITE7byYmXCJzdHJpbmdcIj09dHlwZW9mIGUmJm8udGVzdChlKSYmKGU9XCInXCIrZSxyPSEwKTt2YXIgaT1lLnRvU3RyaW5nKCkucmVwbGFjZSh1LGEpO3JldHVybihyPXJ8fCEwPT09bnx8XCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbihlLHQpfHxBcnJheS5pc0FycmF5KG4pJiZuW3RdfHxmdW5jdGlvbihlLHQpe2Zvcih2YXIgcj0wO3I8dC5sZW5ndGg7cisrKWlmKC0xPGUuaW5kZXhPZih0W3JdKSlyZXR1cm4hMDtyZXR1cm4hMX0oaSxiLkJBRF9ERUxJTUlURVJTKXx8LTE8aS5pbmRleE9mKG0pfHxcIiBcIj09PWkuY2hhckF0KDApfHxcIiBcIj09PWkuY2hhckF0KGkubGVuZ3RoLTEpKT9zK2krczppfX19O2lmKGIuUkVDT1JEX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMwKSxiLlVOSVRfU0VQPVN0cmluZy5mcm9tQ2hhckNvZGUoMzEpLGIuQllURV9PUkRFUl9NQVJLPVwiXFx1ZmVmZlwiLGIuQkFEX0RFTElNSVRFUlM9W1wiXFxyXCIsXCJcXG5cIiwnXCInLGIuQllURV9PUkRFUl9NQVJLXSxiLldPUktFUlNfU1VQUE9SVEVEPSFuJiYhIWYuV29ya2VyLGIuTk9ERV9TVFJFQU1fSU5QVVQ9MSxiLkxvY2FsQ2h1bmtTaXplPTEwNDg1NzYwLGIuUmVtb3RlQ2h1bmtTaXplPTUyNDI4ODAsYi5EZWZhdWx0RGVsaW1pdGVyPVwiLFwiLGIuUGFyc2VyPUUsYi5QYXJzZXJIYW5kbGU9cixiLk5ldHdvcmtTdHJlYW1lcj1sLGIuRmlsZVN0cmVhbWVyPWMsYi5TdHJpbmdTdHJlYW1lcj1wLGIuUmVhZGFibGVTdHJlYW1TdHJlYW1lcj1nLGYualF1ZXJ5KXt2YXIgZD1mLmpRdWVyeTtkLmZuLnBhcnNlPWZ1bmN0aW9uKG8pe3ZhciByPW8uY29uZmlnfHx7fSx1PVtdO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oZSl7aWYoIShcIklOUFVUXCI9PT1kKHRoaXMpLnByb3AoXCJ0YWdOYW1lXCIpLnRvVXBwZXJDYXNlKCkmJlwiZmlsZVwiPT09ZCh0aGlzKS5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpJiZmLkZpbGVSZWFkZXIpfHwhdGhpcy5maWxlc3x8MD09PXRoaXMuZmlsZXMubGVuZ3RoKXJldHVybiEwO2Zvcih2YXIgdD0wO3Q8dGhpcy5maWxlcy5sZW5ndGg7dCsrKXUucHVzaCh7ZmlsZTp0aGlzLmZpbGVzW3RdLGlucHV0RWxlbTp0aGlzLGluc3RhbmNlQ29uZmlnOmQuZXh0ZW5kKHt9LHIpfSl9KSxlKCksdGhpcztmdW5jdGlvbiBlKCl7aWYoMCE9PXUubGVuZ3RoKXt2YXIgZSx0LHIsaSxuPXVbMF07aWYoSihvLmJlZm9yZSkpe3ZhciBzPW8uYmVmb3JlKG4uZmlsZSxuLmlucHV0RWxlbSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIHMpe2lmKFwiYWJvcnRcIj09PXMuYWN0aW9uKXJldHVybiBlPVwiQWJvcnRFcnJvclwiLHQ9bi5maWxlLHI9bi5pbnB1dEVsZW0saT1zLnJlYXNvbix2b2lkKEooby5lcnJvcikmJm8uZXJyb3Ioe25hbWU6ZX0sdCxyLGkpKTtpZihcInNraXBcIj09PXMuYWN0aW9uKXJldHVybiB2b2lkIGgoKTtcIm9iamVjdFwiPT10eXBlb2Ygcy5jb25maWcmJihuLmluc3RhbmNlQ29uZmlnPWQuZXh0ZW5kKG4uaW5zdGFuY2VDb25maWcscy5jb25maWcpKX1lbHNlIGlmKFwic2tpcFwiPT09cylyZXR1cm4gdm9pZCBoKCl9dmFyIGE9bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZTtuLmluc3RhbmNlQ29uZmlnLmNvbXBsZXRlPWZ1bmN0aW9uKGUpe0ooYSkmJmEoZSxuLmZpbGUsbi5pbnB1dEVsZW0pLGgoKX0sYi5wYXJzZShuLmZpbGUsbi5pbnN0YW5jZUNvbmZpZyl9ZWxzZSBKKG8uY29tcGxldGUpJiZvLmNvbXBsZXRlKCl9ZnVuY3Rpb24gaCgpe3Uuc3BsaWNlKDAsMSksZSgpfX19ZnVuY3Rpb24gaChlKXt0aGlzLl9oYW5kbGU9bnVsbCx0aGlzLl9maW5pc2hlZD0hMSx0aGlzLl9jb21wbGV0ZWQ9ITEsdGhpcy5faGFsdGVkPSExLHRoaXMuX2lucHV0PW51bGwsdGhpcy5fYmFzZUluZGV4PTAsdGhpcy5fcGFydGlhbExpbmU9XCJcIix0aGlzLl9yb3dDb3VudD0wLHRoaXMuX3N0YXJ0PTAsdGhpcy5fbmV4dENodW5rPW51bGwsdGhpcy5pc0ZpcnN0Q2h1bms9ITAsdGhpcy5fY29tcGxldGVSZXN1bHRzPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fSxmdW5jdGlvbihlKXt2YXIgdD13KGUpO3QuY2h1bmtTaXplPXBhcnNlSW50KHQuY2h1bmtTaXplKSxlLnN0ZXB8fGUuY2h1bmt8fCh0LmNodW5rU2l6ZT1udWxsKTt0aGlzLl9oYW5kbGU9bmV3IHIodCksKHRoaXMuX2hhbmRsZS5zdHJlYW1lcj10aGlzKS5fY29uZmlnPXR9LmNhbGwodGhpcyxlKSx0aGlzLnBhcnNlQ2h1bms9ZnVuY3Rpb24oZSx0KXtpZih0aGlzLmlzRmlyc3RDaHVuayYmSih0aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuaykpe3ZhciByPXRoaXMuX2NvbmZpZy5iZWZvcmVGaXJzdENodW5rKGUpO3ZvaWQgMCE9PXImJihlPXIpfXRoaXMuaXNGaXJzdENodW5rPSExLHRoaXMuX2hhbHRlZD0hMTt2YXIgaT10aGlzLl9wYXJ0aWFsTGluZStlO3RoaXMuX3BhcnRpYWxMaW5lPVwiXCI7dmFyIG49dGhpcy5faGFuZGxlLnBhcnNlKGksdGhpcy5fYmFzZUluZGV4LCF0aGlzLl9maW5pc2hlZCk7aWYoIXRoaXMuX2hhbmRsZS5wYXVzZWQoKSYmIXRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpe3ZhciBzPW4ubWV0YS5jdXJzb3I7dGhpcy5fZmluaXNoZWR8fCh0aGlzLl9wYXJ0aWFsTGluZT1pLnN1YnN0cmluZyhzLXRoaXMuX2Jhc2VJbmRleCksdGhpcy5fYmFzZUluZGV4PXMpLG4mJm4uZGF0YSYmKHRoaXMuX3Jvd0NvdW50Kz1uLmRhdGEubGVuZ3RoKTt2YXIgYT10aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJnRoaXMuX3Jvd0NvdW50Pj10aGlzLl9jb25maWcucHJldmlldztpZihvKWYucG9zdE1lc3NhZ2Uoe3Jlc3VsdHM6bix3b3JrZXJJZDpiLldPUktFUl9JRCxmaW5pc2hlZDphfSk7ZWxzZSBpZihKKHRoaXMuX2NvbmZpZy5jaHVuaykmJiF0KXtpZih0aGlzLl9jb25maWcuY2h1bmsobix0aGlzLl9oYW5kbGUpLHRoaXMuX2hhbmRsZS5wYXVzZWQoKXx8dGhpcy5faGFuZGxlLmFib3J0ZWQoKSlyZXR1cm4gdm9pZCh0aGlzLl9oYWx0ZWQ9ITApO249dm9pZCAwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz12b2lkIDB9cmV0dXJuIHRoaXMuX2NvbmZpZy5zdGVwfHx0aGlzLl9jb25maWcuY2h1bmt8fCh0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YT10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YS5jb25jYXQobi5kYXRhKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzPXRoaXMuX2NvbXBsZXRlUmVzdWx0cy5lcnJvcnMuY29uY2F0KG4uZXJyb3JzKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMubWV0YT1uLm1ldGEpLHRoaXMuX2NvbXBsZXRlZHx8IWF8fCFKKHRoaXMuX2NvbmZpZy5jb21wbGV0ZSl8fG4mJm4ubWV0YS5hYm9ydGVkfHwodGhpcy5fY29uZmlnLmNvbXBsZXRlKHRoaXMuX2NvbXBsZXRlUmVzdWx0cyx0aGlzLl9pbnB1dCksdGhpcy5fY29tcGxldGVkPSEwKSxhfHxuJiZuLm1ldGEucGF1c2VkfHx0aGlzLl9uZXh0Q2h1bmsoKSxufXRoaXMuX2hhbHRlZD0hMH0sdGhpcy5fc2VuZEVycm9yPWZ1bmN0aW9uKGUpe0oodGhpcy5fY29uZmlnLmVycm9yKT90aGlzLl9jb25maWcuZXJyb3IoZSk6byYmdGhpcy5fY29uZmlnLmVycm9yJiZmLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpiLldPUktFUl9JRCxlcnJvcjplLGZpbmlzaGVkOiExfSl9fWZ1bmN0aW9uIGwoZSl7dmFyIGk7KGU9ZXx8e30pLmNodW5rU2l6ZXx8KGUuY2h1bmtTaXplPWIuUmVtb3RlQ2h1bmtTaXplKSxoLmNhbGwodGhpcyxlKSx0aGlzLl9uZXh0Q2h1bms9bj9mdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpLHRoaXMuX2NodW5rTG9hZGVkKCl9OmZ1bmN0aW9uKCl7dGhpcy5fcmVhZENodW5rKCl9LHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3RoaXMuX2lucHV0PWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX3JlYWRDaHVuaz1mdW5jdGlvbigpe2lmKHRoaXMuX2ZpbmlzaGVkKXRoaXMuX2NodW5rTG9hZGVkKCk7ZWxzZXtpZihpPW5ldyBYTUxIdHRwUmVxdWVzdCx0aGlzLl9jb25maWcud2l0aENyZWRlbnRpYWxzJiYoaS53aXRoQ3JlZGVudGlhbHM9dGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyksbnx8KGkub25sb2FkPXYodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksaS5vbmVycm9yPXYodGhpcy5fY2h1bmtFcnJvcix0aGlzKSksaS5vcGVuKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5P1wiUE9TVFwiOlwiR0VUXCIsdGhpcy5faW5wdXQsIW4pLHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RIZWFkZXJzKXt2YXIgZT10aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycztmb3IodmFyIHQgaW4gZSlpLnNldFJlcXVlc3RIZWFkZXIodCxlW3RdKX1pZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgcj10aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLTE7aS5zZXRSZXF1ZXN0SGVhZGVyKFwiUmFuZ2VcIixcImJ5dGVzPVwiK3RoaXMuX3N0YXJ0K1wiLVwiK3IpfXRyeXtpLnNlbmQodGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEJvZHkpfWNhdGNoKGUpe3RoaXMuX2NodW5rRXJyb3IoZS5tZXNzYWdlKX1uJiYwPT09aS5zdGF0dXMmJnRoaXMuX2NodW5rRXJyb3IoKX19LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKCl7ND09PWkucmVhZHlTdGF0ZSYmKGkuc3RhdHVzPDIwMHx8NDAwPD1pLnN0YXR1cz90aGlzLl9jaHVua0Vycm9yKCk6KHRoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplP3RoaXMuX2NvbmZpZy5jaHVua1NpemU6aS5yZXNwb25zZVRleHQubGVuZ3RoLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtUmFuZ2VcIik7aWYobnVsbD09PXQpcmV0dXJuLTE7cmV0dXJuIHBhcnNlSW50KHQuc3Vic3RyaW5nKHQubGFzdEluZGV4T2YoXCIvXCIpKzEpKX0oaSksdGhpcy5wYXJzZUNodW5rKGkucmVzcG9uc2VUZXh0KSkpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PWkuc3RhdHVzVGV4dHx8ZTt0aGlzLl9zZW5kRXJyb3IobmV3IEVycm9yKHQpKX19ZnVuY3Rpb24gYyhlKXt2YXIgaSxuOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLkxvY2FsQ2h1bmtTaXplKSxoLmNhbGwodGhpcyxlKTt2YXIgcz1cInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcjt0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLG49ZS5zbGljZXx8ZS53ZWJraXRTbGljZXx8ZS5tb3pTbGljZSxzPygoaT1uZXcgRmlsZVJlYWRlcikub25sb2FkPXYodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksaS5vbmVycm9yPXYodGhpcy5fY2h1bmtFcnJvcix0aGlzKSk6aT1uZXcgRmlsZVJlYWRlclN5bmMsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2ZpbmlzaGVkfHx0aGlzLl9jb25maWcucHJldmlldyYmISh0aGlzLl9yb3dDb3VudDx0aGlzLl9jb25maWcucHJldmlldyl8fHRoaXMuX3JlYWRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9pbnB1dDtpZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgdD1NYXRoLm1pbih0aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2lucHV0LnNpemUpO2U9bi5jYWxsKGUsdGhpcy5fc3RhcnQsdCl9dmFyIHI9aS5yZWFkQXNUZXh0KGUsdGhpcy5fY29uZmlnLmVuY29kaW5nKTtzfHx0aGlzLl9jaHVua0xvYWRlZCh7dGFyZ2V0OntyZXN1bHQ6cn19KX0sdGhpcy5fY2h1bmtMb2FkZWQ9ZnVuY3Rpb24oZSl7dGhpcy5fc3RhcnQrPXRoaXMuX2NvbmZpZy5jaHVua1NpemUsdGhpcy5fZmluaXNoZWQ9IXRoaXMuX2NvbmZpZy5jaHVua1NpemV8fHRoaXMuX3N0YXJ0Pj10aGlzLl9pbnB1dC5zaXplLHRoaXMucGFyc2VDaHVuayhlLnRhcmdldC5yZXN1bHQpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKCl7dGhpcy5fc2VuZEVycm9yKGkuZXJyb3IpfX1mdW5jdGlvbiBwKGUpe3ZhciByO2guY2FsbCh0aGlzLGU9ZXx8e30pLHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3JldHVybiByPWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe2lmKCF0aGlzLl9maW5pc2hlZCl7dmFyIGUsdD10aGlzLl9jb25maWcuY2h1bmtTaXplO3JldHVybiB0PyhlPXIuc3Vic3RyaW5nKDAsdCkscj1yLnN1YnN0cmluZyh0KSk6KGU9cixyPVwiXCIpLHRoaXMuX2ZpbmlzaGVkPSFyLHRoaXMucGFyc2VDaHVuayhlKX19fWZ1bmN0aW9uIGcoZSl7aC5jYWxsKHRoaXMsZT1lfHx7fSk7dmFyIHQ9W10scj0hMCxpPSExO3RoaXMucGF1c2U9ZnVuY3Rpb24oKXtoLnByb3RvdHlwZS5wYXVzZS5hcHBseSh0aGlzLGFyZ3VtZW50cyksdGhpcy5faW5wdXQucGF1c2UoKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXtoLnByb3RvdHlwZS5yZXN1bWUuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnJlc3VtZSgpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX2lucHV0Lm9uKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0Lm9uKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5vbihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzLl9jaGVja0lzRmluaXNoZWQ9ZnVuY3Rpb24oKXtpJiYxPT09dC5sZW5ndGgmJih0aGlzLl9maW5pc2hlZD0hMCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2NoZWNrSXNGaW5pc2hlZCgpLHQubGVuZ3RoP3RoaXMucGFyc2VDaHVuayh0LnNoaWZ0KCkpOnI9ITB9LHRoaXMuX3N0cmVhbURhdGE9dihmdW5jdGlvbihlKXt0cnl7dC5wdXNoKFwic3RyaW5nXCI9PXR5cGVvZiBlP2U6ZS50b1N0cmluZyh0aGlzLl9jb25maWcuZW5jb2RpbmcpKSxyJiYocj0hMSx0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKSl9Y2F0Y2goZSl7dGhpcy5fc3RyZWFtRXJyb3IoZSl9fSx0aGlzKSx0aGlzLl9zdHJlYW1FcnJvcj12KGZ1bmN0aW9uKGUpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSx0aGlzLl9zZW5kRXJyb3IoZSl9LHRoaXMpLHRoaXMuX3N0cmVhbUVuZD12KGZ1bmN0aW9uKCl7dGhpcy5fc3RyZWFtQ2xlYW5VcCgpLGk9ITAsdGhpcy5fc3RyZWFtRGF0YShcIlwiKX0sdGhpcyksdGhpcy5fc3RyZWFtQ2xlYW5VcD12KGZ1bmN0aW9uKCl7dGhpcy5faW5wdXQucmVtb3ZlTGlzdGVuZXIoXCJkYXRhXCIsdGhpcy5fc3RyZWFtRGF0YSksdGhpcy5faW5wdXQucmVtb3ZlTGlzdGVuZXIoXCJlbmRcIix0aGlzLl9zdHJlYW1FbmQpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIix0aGlzLl9zdHJlYW1FcnJvcil9LHRoaXMpfWZ1bmN0aW9uIHIobSl7dmFyIGEsbyx1LGk9TWF0aC5wb3coMiw1Myksbj0taSxzPS9eXFxzKi0/KFxcZCtcXC4/fFxcLlxcZCt8XFxkK1xcLlxcZCspKFtlRV1bLStdP1xcZCspP1xccyokLyxoPS9eKChcXGR7NH0tWzAxXVxcZC1bMC0zXVxcZFRbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZFxcLlxcZCsoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKSkkLyx0PXRoaXMscj0wLGY9MCxkPSExLGU9ITEsbD1bXSxjPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fTtpZihKKG0uc3RlcCkpe3ZhciBwPW0uc3RlcDttLnN0ZXA9ZnVuY3Rpb24oZSl7aWYoYz1lLF8oKSlnKCk7ZWxzZXtpZihnKCksMD09PWMuZGF0YS5sZW5ndGgpcmV0dXJuO3IrPWUuZGF0YS5sZW5ndGgsbS5wcmV2aWV3JiZyPm0ucHJldmlldz9vLmFib3J0KCk6KGMuZGF0YT1jLmRhdGFbMF0scChjLHQpKX19fWZ1bmN0aW9uIHkoZSl7cmV0dXJuXCJncmVlZHlcIj09PW0uc2tpcEVtcHR5TGluZXM/XCJcIj09PWUuam9pbihcIlwiKS50cmltKCk6MT09PWUubGVuZ3RoJiYwPT09ZVswXS5sZW5ndGh9ZnVuY3Rpb24gZygpe3JldHVybiBjJiZ1JiYoayhcIkRlbGltaXRlclwiLFwiVW5kZXRlY3RhYmxlRGVsaW1pdGVyXCIsXCJVbmFibGUgdG8gYXV0by1kZXRlY3QgZGVsaW1pdGluZyBjaGFyYWN0ZXI7IGRlZmF1bHRlZCB0byAnXCIrYi5EZWZhdWx0RGVsaW1pdGVyK1wiJ1wiKSx1PSExKSxtLnNraXBFbXB0eUxpbmVzJiYoYy5kYXRhPWMuZGF0YS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIXkoZSl9KSksXygpJiZmdW5jdGlvbigpe2lmKCFjKXJldHVybjtmdW5jdGlvbiBlKGUsdCl7SihtLnRyYW5zZm9ybUhlYWRlcikmJihlPW0udHJhbnNmb3JtSGVhZGVyKGUsdCkpLGwucHVzaChlKX1pZihBcnJheS5pc0FycmF5KGMuZGF0YVswXSkpe2Zvcih2YXIgdD0wO18oKSYmdDxjLmRhdGEubGVuZ3RoO3QrKyljLmRhdGFbdF0uZm9yRWFjaChlKTtjLmRhdGEuc3BsaWNlKDAsMSl9ZWxzZSBjLmRhdGEuZm9yRWFjaChlKX0oKSxmdW5jdGlvbigpe2lmKCFjfHwhbS5oZWFkZXImJiFtLmR5bmFtaWNUeXBpbmcmJiFtLnRyYW5zZm9ybSlyZXR1cm4gYztmdW5jdGlvbiBlKGUsdCl7dmFyIHIsaT1tLmhlYWRlcj97fTpbXTtmb3Iocj0wO3I8ZS5sZW5ndGg7cisrKXt2YXIgbj1yLHM9ZVtyXTttLmhlYWRlciYmKG49cj49bC5sZW5ndGg/XCJfX3BhcnNlZF9leHRyYVwiOmxbcl0pLG0udHJhbnNmb3JtJiYocz1tLnRyYW5zZm9ybShzLG4pKSxzPXYobixzKSxcIl9fcGFyc2VkX2V4dHJhXCI9PT1uPyhpW25dPWlbbl18fFtdLGlbbl0ucHVzaChzKSk6aVtuXT1zfXJldHVybiBtLmhlYWRlciYmKHI+bC5sZW5ndGg/ayhcIkZpZWxkTWlzbWF0Y2hcIixcIlRvb01hbnlGaWVsZHNcIixcIlRvbyBtYW55IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrcixmK3QpOnI8bC5sZW5ndGgmJmsoXCJGaWVsZE1pc21hdGNoXCIsXCJUb29GZXdGaWVsZHNcIixcIlRvbyBmZXcgZmllbGRzOiBleHBlY3RlZCBcIitsLmxlbmd0aCtcIiBmaWVsZHMgYnV0IHBhcnNlZCBcIityLGYrdCkpLGl9dmFyIHQ9MTshYy5kYXRhLmxlbmd0aHx8QXJyYXkuaXNBcnJheShjLmRhdGFbMF0pPyhjLmRhdGE9Yy5kYXRhLm1hcChlKSx0PWMuZGF0YS5sZW5ndGgpOmMuZGF0YT1lKGMuZGF0YSwwKTttLmhlYWRlciYmYy5tZXRhJiYoYy5tZXRhLmZpZWxkcz1sKTtyZXR1cm4gZis9dCxjfSgpfWZ1bmN0aW9uIF8oKXtyZXR1cm4gbS5oZWFkZXImJjA9PT1sLmxlbmd0aH1mdW5jdGlvbiB2KGUsdCl7cmV0dXJuIHI9ZSxtLmR5bmFtaWNUeXBpbmdGdW5jdGlvbiYmdm9pZCAwPT09bS5keW5hbWljVHlwaW5nW3JdJiYobS5keW5hbWljVHlwaW5nW3JdPW0uZHluYW1pY1R5cGluZ0Z1bmN0aW9uKHIpKSwhMD09PShtLmR5bmFtaWNUeXBpbmdbcl18fG0uZHluYW1pY1R5cGluZyk/XCJ0cnVlXCI9PT10fHxcIlRSVUVcIj09PXR8fFwiZmFsc2VcIiE9PXQmJlwiRkFMU0VcIiE9PXQmJihmdW5jdGlvbihlKXtpZihzLnRlc3QoZSkpe3ZhciB0PXBhcnNlRmxvYXQoZSk7aWYobjx0JiZ0PGkpcmV0dXJuITB9cmV0dXJuITF9KHQpP3BhcnNlRmxvYXQodCk6aC50ZXN0KHQpP25ldyBEYXRlKHQpOlwiXCI9PT10P251bGw6dCk6dDt2YXIgcn1mdW5jdGlvbiBrKGUsdCxyLGkpe3ZhciBuPXt0eXBlOmUsY29kZTp0LG1lc3NhZ2U6cn07dm9pZCAwIT09aSYmKG4ucm93PWkpLGMuZXJyb3JzLnB1c2gobil9dGhpcy5wYXJzZT1mdW5jdGlvbihlLHQscil7dmFyIGk9bS5xdW90ZUNoYXJ8fCdcIic7aWYobS5uZXdsaW5lfHwobS5uZXdsaW5lPWZ1bmN0aW9uKGUsdCl7ZT1lLnN1YnN0cmluZygwLDEwNDg1NzYpO3ZhciByPW5ldyBSZWdFeHAoUSh0KStcIihbXl0qPylcIitRKHQpLFwiZ21cIiksaT0oZT1lLnJlcGxhY2UocixcIlwiKSkuc3BsaXQoXCJcXHJcIiksbj1lLnNwbGl0KFwiXFxuXCIpLHM9MTxuLmxlbmd0aCYmblswXS5sZW5ndGg8aVswXS5sZW5ndGg7aWYoMT09PWkubGVuZ3RofHxzKXJldHVyblwiXFxuXCI7Zm9yKHZhciBhPTAsbz0wO288aS5sZW5ndGg7bysrKVwiXFxuXCI9PT1pW29dWzBdJiZhKys7cmV0dXJuIGE+PWkubGVuZ3RoLzI/XCJcXHJcXG5cIjpcIlxcclwifShlLGkpKSx1PSExLG0uZGVsaW1pdGVyKUoobS5kZWxpbWl0ZXIpJiYobS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIoZSksYy5tZXRhLmRlbGltaXRlcj1tLmRlbGltaXRlcik7ZWxzZXt2YXIgbj1mdW5jdGlvbihlLHQscixpLG4pe3ZhciBzLGEsbyx1O249bnx8W1wiLFwiLFwiXFx0XCIsXCJ8XCIsXCI7XCIsYi5SRUNPUkRfU0VQLGIuVU5JVF9TRVBdO2Zvcih2YXIgaD0wO2g8bi5sZW5ndGg7aCsrKXt2YXIgZj1uW2hdLGQ9MCxsPTAsYz0wO289dm9pZCAwO2Zvcih2YXIgcD1uZXcgRSh7Y29tbWVudHM6aSxkZWxpbWl0ZXI6ZixuZXdsaW5lOnQscHJldmlldzoxMH0pLnBhcnNlKGUpLGc9MDtnPHAuZGF0YS5sZW5ndGg7ZysrKWlmKHImJnkocC5kYXRhW2ddKSljKys7ZWxzZXt2YXIgXz1wLmRhdGFbZ10ubGVuZ3RoO2wrPV8sdm9pZCAwIT09bz8wPF8mJihkKz1NYXRoLmFicyhfLW8pLG89Xyk6bz1ffTA8cC5kYXRhLmxlbmd0aCYmKGwvPXAuZGF0YS5sZW5ndGgtYyksKHZvaWQgMD09PWF8fGQ8PWEpJiYodm9pZCAwPT09dXx8dTxsKSYmMS45OTxsJiYoYT1kLHM9Zix1PWwpfXJldHVybntzdWNjZXNzZnVsOiEhKG0uZGVsaW1pdGVyPXMpLGJlc3REZWxpbWl0ZXI6c319KGUsbS5uZXdsaW5lLG0uc2tpcEVtcHR5TGluZXMsbS5jb21tZW50cyxtLmRlbGltaXRlcnNUb0d1ZXNzKTtuLnN1Y2Nlc3NmdWw/bS5kZWxpbWl0ZXI9bi5iZXN0RGVsaW1pdGVyOih1PSEwLG0uZGVsaW1pdGVyPWIuRGVmYXVsdERlbGltaXRlciksYy5tZXRhLmRlbGltaXRlcj1tLmRlbGltaXRlcn12YXIgcz13KG0pO3JldHVybiBtLnByZXZpZXcmJm0uaGVhZGVyJiZzLnByZXZpZXcrKyxhPWUsbz1uZXcgRShzKSxjPW8ucGFyc2UoYSx0LHIpLGcoKSxkP3ttZXRhOntwYXVzZWQ6ITB9fTpjfHx7bWV0YTp7cGF1c2VkOiExfX19LHRoaXMucGF1c2VkPWZ1bmN0aW9uKCl7cmV0dXJuIGR9LHRoaXMucGF1c2U9ZnVuY3Rpb24oKXtkPSEwLG8uYWJvcnQoKSxhPUoobS5jaHVuayk/XCJcIjphLnN1YnN0cmluZyhvLmdldENoYXJJbmRleCgpKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXt0LnN0cmVhbWVyLl9oYWx0ZWQ/KGQ9ITEsdC5zdHJlYW1lci5wYXJzZUNodW5rKGEsITApKTpzZXRUaW1lb3V0KHQucmVzdW1lLDMpfSx0aGlzLmFib3J0ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gZX0sdGhpcy5hYm9ydD1mdW5jdGlvbigpe2U9ITAsby5hYm9ydCgpLGMubWV0YS5hYm9ydGVkPSEwLEoobS5jb21wbGV0ZSkmJm0uY29tcGxldGUoYyksYT1cIlwifX1mdW5jdGlvbiBRKGUpe3JldHVybiBlLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLFwiXFxcXCQmXCIpfWZ1bmN0aW9uIEUoail7dmFyIHosTT0oaj1qfHx7fSkuZGVsaW1pdGVyLFA9ai5uZXdsaW5lLFU9ai5jb21tZW50cyxxPWouc3RlcCxOPWoucHJldmlldyxCPWouZmFzdE1vZGUsSz16PXZvaWQgMD09PWoucXVvdGVDaGFyfHxudWxsPT09ai5xdW90ZUNoYXI/J1wiJzpqLnF1b3RlQ2hhcjtpZih2b2lkIDAhPT1qLmVzY2FwZUNoYXImJihLPWouZXNjYXBlQ2hhciksKFwic3RyaW5nXCIhPXR5cGVvZiBNfHwtMTxiLkJBRF9ERUxJTUlURVJTLmluZGV4T2YoTSkpJiYoTT1cIixcIiksVT09PU0pdGhyb3cgbmV3IEVycm9yKFwiQ29tbWVudCBjaGFyYWN0ZXIgc2FtZSBhcyBkZWxpbWl0ZXJcIik7ITA9PT1VP1U9XCIjXCI6KFwic3RyaW5nXCIhPXR5cGVvZiBVfHwtMTxiLkJBRF9ERUxJTUlURVJTLmluZGV4T2YoVSkpJiYoVT0hMSksXCJcXG5cIiE9PVAmJlwiXFxyXCIhPT1QJiZcIlxcclxcblwiIT09UCYmKFA9XCJcXG5cIik7dmFyIFc9MCxIPSExO3RoaXMucGFyc2U9ZnVuY3Rpb24oaSx0LHIpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBpKXRocm93IG5ldyBFcnJvcihcIklucHV0IG11c3QgYmUgYSBzdHJpbmdcIik7dmFyIG49aS5sZW5ndGgsZT1NLmxlbmd0aCxzPVAubGVuZ3RoLGE9VS5sZW5ndGgsbz1KKHEpLHU9W10saD1bXSxmPVtdLGQ9Vz0wO2lmKCFpKXJldHVybiBMKCk7aWYoai5oZWFkZXImJiF0KXt2YXIgbD1pLnNwbGl0KFApWzBdLnNwbGl0KE0pLGM9W10scD17fSxnPSExO2Zvcih2YXIgXyBpbiBsKXt2YXIgbT1sW19dO0ooai50cmFuc2Zvcm1IZWFkZXIpJiYobT1qLnRyYW5zZm9ybUhlYWRlcihtLF8pKTt2YXIgeT1tLHY9cFttXXx8MDtmb3IoMDx2JiYoZz0hMCx5PW0rXCJfXCIrdikscFttXT12KzE7Yy5pbmNsdWRlcyh5KTspeT15K1wiX1wiK3Y7Yy5wdXNoKHkpfWlmKGcpe3ZhciBrPWkuc3BsaXQoUCk7a1swXT1jLmpvaW4oTSksaT1rLmpvaW4oUCl9fWlmKEJ8fCExIT09QiYmLTE9PT1pLmluZGV4T2Yoeikpe2Zvcih2YXIgYj1pLnNwbGl0KFApLEU9MDtFPGIubGVuZ3RoO0UrKyl7aWYoZj1iW0VdLFcrPWYubGVuZ3RoLEUhPT1iLmxlbmd0aC0xKVcrPVAubGVuZ3RoO2Vsc2UgaWYocilyZXR1cm4gTCgpO2lmKCFVfHxmLnN1YnN0cmluZygwLGEpIT09VSl7aWYobyl7aWYodT1bXSxJKGYuc3BsaXQoTSkpLEYoKSxIKXJldHVybiBMKCl9ZWxzZSBJKGYuc3BsaXQoTSkpO2lmKE4mJk48PUUpcmV0dXJuIHU9dS5zbGljZSgwLE4pLEwoITApfX1yZXR1cm4gTCgpfWZvcih2YXIgdz1pLmluZGV4T2YoTSxXKSxSPWkuaW5kZXhPZihQLFcpLEM9bmV3IFJlZ0V4cChRKEspK1EoeiksXCJnXCIpLFM9aS5pbmRleE9mKHosVyk7OylpZihpW1ddIT09eilpZihVJiYwPT09Zi5sZW5ndGgmJmkuc3Vic3RyaW5nKFcsVythKT09PVUpe2lmKC0xPT09UilyZXR1cm4gTCgpO1c9UitzLFI9aS5pbmRleE9mKFAsVyksdz1pLmluZGV4T2YoTSxXKX1lbHNlIGlmKC0xIT09dyYmKHc8Unx8LTE9PT1SKSlmLnB1c2goaS5zdWJzdHJpbmcoVyx3KSksVz13K2Usdz1pLmluZGV4T2YoTSxXKTtlbHNle2lmKC0xPT09UilicmVhaztpZihmLnB1c2goaS5zdWJzdHJpbmcoVyxSKSksRChSK3MpLG8mJihGKCksSCkpcmV0dXJuIEwoKTtpZihOJiZ1Lmxlbmd0aD49TilyZXR1cm4gTCghMCl9ZWxzZSBmb3IoUz1XLFcrKzs7KXtpZigtMT09PShTPWkuaW5kZXhPZih6LFMrMSkpKXJldHVybiByfHxoLnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiTWlzc2luZ1F1b3Rlc1wiLG1lc3NhZ2U6XCJRdW90ZWQgZmllbGQgdW50ZXJtaW5hdGVkXCIscm93OnUubGVuZ3RoLGluZGV4Old9KSxUKCk7aWYoUz09PW4tMSlyZXR1cm4gVChpLnN1YnN0cmluZyhXLFMpLnJlcGxhY2UoQyx6KSk7aWYoeiE9PUt8fGlbUysxXSE9PUspe2lmKHo9PT1LfHwwPT09U3x8aVtTLTFdIT09Syl7LTEhPT13JiZ3PFMrMSYmKHc9aS5pbmRleE9mKE0sUysxKSksLTEhPT1SJiZSPFMrMSYmKFI9aS5pbmRleE9mKFAsUysxKSk7dmFyIE89QSgtMT09PVI/dzpNYXRoLm1pbih3LFIpKTtpZihpLnN1YnN0cihTKzErTyxlKT09PU0pe2YucHVzaChpLnN1YnN0cmluZyhXLFMpLnJlcGxhY2UoQyx6KSksaVtXPVMrMStPK2VdIT09eiYmKFM9aS5pbmRleE9mKHosVykpLHc9aS5pbmRleE9mKE0sVyksUj1pLmluZGV4T2YoUCxXKTticmVha312YXIgeD1BKFIpO2lmKGkuc3Vic3RyaW5nKFMrMSt4LFMrMSt4K3MpPT09UCl7aWYoZi5wdXNoKGkuc3Vic3RyaW5nKFcsUykucmVwbGFjZShDLHopKSxEKFMrMSt4K3MpLHc9aS5pbmRleE9mKE0sVyksUz1pLmluZGV4T2YoeixXKSxvJiYoRigpLEgpKXJldHVybiBMKCk7aWYoTiYmdS5sZW5ndGg+PU4pcmV0dXJuIEwoITApO2JyZWFrfWgucHVzaCh7dHlwZTpcIlF1b3Rlc1wiLGNvZGU6XCJJbnZhbGlkUXVvdGVzXCIsbWVzc2FnZTpcIlRyYWlsaW5nIHF1b3RlIG9uIHF1b3RlZCBmaWVsZCBpcyBtYWxmb3JtZWRcIixyb3c6dS5sZW5ndGgsaW5kZXg6V30pLFMrK319ZWxzZSBTKyt9cmV0dXJuIFQoKTtmdW5jdGlvbiBJKGUpe3UucHVzaChlKSxkPVd9ZnVuY3Rpb24gQShlKXt2YXIgdD0wO2lmKC0xIT09ZSl7dmFyIHI9aS5zdWJzdHJpbmcoUysxLGUpO3ImJlwiXCI9PT1yLnRyaW0oKSYmKHQ9ci5sZW5ndGgpfXJldHVybiB0fWZ1bmN0aW9uIFQoZSl7cmV0dXJuIHJ8fCh2b2lkIDA9PT1lJiYoZT1pLnN1YnN0cmluZyhXKSksZi5wdXNoKGUpLFc9bixJKGYpLG8mJkYoKSksTCgpfWZ1bmN0aW9uIEQoZSl7Vz1lLEkoZiksZj1bXSxSPWkuaW5kZXhPZihQLFcpfWZ1bmN0aW9uIEwoZSl7cmV0dXJue2RhdGE6dSxlcnJvcnM6aCxtZXRhOntkZWxpbWl0ZXI6TSxsaW5lYnJlYWs6UCxhYm9ydGVkOkgsdHJ1bmNhdGVkOiEhZSxjdXJzb3I6ZCsodHx8MCl9fX1mdW5jdGlvbiBGKCl7cShMKCkpLHU9W10saD1bXX19LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtIPSEwfSx0aGlzLmdldENoYXJJbmRleD1mdW5jdGlvbigpe3JldHVybiBXfX1mdW5jdGlvbiBfKGUpe3ZhciB0PWUuZGF0YSxyPWFbdC53b3JrZXJJZF0saT0hMTtpZih0LmVycm9yKXIudXNlckVycm9yKHQuZXJyb3IsdC5maWxlKTtlbHNlIGlmKHQucmVzdWx0cyYmdC5yZXN1bHRzLmRhdGEpe3ZhciBuPXthYm9ydDpmdW5jdGlvbigpe2k9ITAsbSh0LndvcmtlcklkLHtkYXRhOltdLGVycm9yczpbXSxtZXRhOnthYm9ydGVkOiEwfX0pfSxwYXVzZTp5LHJlc3VtZTp5fTtpZihKKHIudXNlclN0ZXApKXtmb3IodmFyIHM9MDtzPHQucmVzdWx0cy5kYXRhLmxlbmd0aCYmKHIudXNlclN0ZXAoe2RhdGE6dC5yZXN1bHRzLmRhdGFbc10sZXJyb3JzOnQucmVzdWx0cy5lcnJvcnMsbWV0YTp0LnJlc3VsdHMubWV0YX0sbiksIWkpO3MrKyk7ZGVsZXRlIHQucmVzdWx0c31lbHNlIEooci51c2VyQ2h1bmspJiYoci51c2VyQ2h1bmsodC5yZXN1bHRzLG4sdC5maWxlKSxkZWxldGUgdC5yZXN1bHRzKX10LmZpbmlzaGVkJiYhaSYmbSh0LndvcmtlcklkLHQucmVzdWx0cyl9ZnVuY3Rpb24gbShlLHQpe3ZhciByPWFbZV07SihyLnVzZXJDb21wbGV0ZSkmJnIudXNlckNvbXBsZXRlKHQpLHIudGVybWluYXRlKCksZGVsZXRlIGFbZV19ZnVuY3Rpb24geSgpe3Rocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIil9ZnVuY3Rpb24gdyhlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZXx8bnVsbD09PWUpcmV0dXJuIGU7dmFyIHQ9QXJyYXkuaXNBcnJheShlKT9bXTp7fTtmb3IodmFyIHIgaW4gZSl0W3JdPXcoZVtyXSk7cmV0dXJuIHR9ZnVuY3Rpb24gdihlLHQpe3JldHVybiBmdW5jdGlvbigpe2UuYXBwbHkodCxhcmd1bWVudHMpfX1mdW5jdGlvbiBKKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9cmV0dXJuIG8mJihmLm9ubWVzc2FnZT1mdW5jdGlvbihlKXt2YXIgdD1lLmRhdGE7dm9pZCAwPT09Yi5XT1JLRVJfSUQmJnQmJihiLldPUktFUl9JRD10LndvcmtlcklkKTtpZihcInN0cmluZ1wiPT10eXBlb2YgdC5pbnB1dClmLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpiLldPUktFUl9JRCxyZXN1bHRzOmIucGFyc2UodC5pbnB1dCx0LmNvbmZpZyksZmluaXNoZWQ6ITB9KTtlbHNlIGlmKGYuRmlsZSYmdC5pbnB1dCBpbnN0YW5jZW9mIEZpbGV8fHQuaW5wdXQgaW5zdGFuY2VvZiBPYmplY3Qpe3ZhciByPWIucGFyc2UodC5pbnB1dCx0LmNvbmZpZyk7ciYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czpyLGZpbmlzaGVkOiEwfSl9fSksKGwucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1sLChjLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGgucHJvdG90eXBlKSkuY29uc3RydWN0b3I9YywocC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShwLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPXAsKGcucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1nLGJ9KTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBjbGFzcyBXZWF0aGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2l0eSxcbiAgICBjb3VudHJ5LFxuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIC8vIGNvdW50cnksXG4gICAgLy8gbWF4VGVtcCxcbiAgICAvLyBtaW5UZW1wLFxuICAgIC8vIGF2Z1RlbXAsXG4gICAgLy8gZGVzY3JpcHRpb24sXG4gICkge1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcbiAgICB0aGlzLmNvdW50cnkgPSBjb3VudHJ5O1xuICAgIC8vIHRoaXMubWF4VGVtcCA9IG1heFRlbXA7XG4gICAgLy8gdGhpcy5taW5UZW1wID0gbWluVGVtcDtcbiAgICAvLyB0aGlzLmF2Z1RlbXAgPSBhdmdUZW1wO1xuICAgIC8vIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuICBnZXRDaXR5KCkge1xuICAgIHJldHVybiB0aGlzLmNpdHk7XG4gIH1cblxuICBnZXRTdGFydERhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnREYXRlO1xuICB9XG5cbiAgZ2V0RW5kRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmREYXRlO1xuICB9XG4gIGdldENvdW50cnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnRyeTtcbiAgfVxuXG4gIC8vIGdldE1heFRlbXAoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMubWF4VGVtcDtcbiAgLy8gfVxuXG4gIC8vIGdldE1pblRlbXAoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMubWluVGVtcDtcbiAgLy8gfVxuICAvLyBnZXRBdmdUZW1wKCkge1xuICAvLyAgIHJldHVybiB0aGlzLmF2Z1RlbXA7XG4gIC8vIH1cblxuICAvLyBnZXREZXNjcmlwdGlvbigpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgLy8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgV2VhdGhlciB9IGZyb20gXCIuLi9vYmovV2VhdGhlclwiO1xuaW1wb3J0IHsgV2VhdGhlckRldGFpbHMgfSBmcm9tIFwiLi4vZnVuY3Rpb24vZmV0Y2hXZWF0aGVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgdGFibGUgfSBmcm9tIFwiLi4vZnVuY3Rpb24vbWFrZVRhYmxlXCI7XG5pbXBvcnQgeyBib2R5Q29udGVudCB9IGZyb20gXCIuLi9mdW5jdGlvbi9sb2FkZXJcIjtcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbmNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XG5jb25zdCBjb250ZW50Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcblxuY29uc3QgY29udGVudEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuY29uc3QgY29udGVudFRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuY29udGVudFRhYmxlLmNsYXNzTGlzdC5hZGQoXCJjb250ZW50LXRhYmxlXCIpO1xuY29udGVudEZvcm0uY2xhc3NMaXN0LmFkZChcImNvbnRlbnQtZm9ybVwiKTtcblxuY29uc3QgaW5mbyA9IG5ldyBXZWF0aGVyKFwiaHVsbFwiLCBcInVrXCIsIFwiMjAyMy0xMi0yNFwiLCBcIjIwMjMtMTItMjVcIik7XG5jb25zdCBlbGVtZW50cyA9IFtcbiAgXCJhZGRyZXNzXCIsXG4gIFwidGVtcFwiLFxuICBcInRlbXBtaW5cIixcbiAgXCJ0ZW1wbWF4XCIsXG4gIFwiY29uZGl0aW9uc1wiLFxuICBcImRlc2NyaXB0aW9uXCIsXG5dO1xuLy9jb25zdCB3ZWF0aGVyQ29udGVudCA9IFdlYXRoZXJEZXRhaWxzKCkuY2FsbFdlYXRoZXJBUEkoaW5mbywgZWxlbWVudHMpO1xuXG4vL2NvbnNvbGUubG9nKHdlYXRoZXJDb250ZW50XG5cbmNvbnN0IHRhYmxlRGF0YSA9IHRhYmxlKClcbiAgLnBhcnNlQ1NWKGBhZGRyZXNzLHRlbXBtYXgsdGVtcG1pbix0ZW1wLGNvbmRpdGlvbnMsZGVzY3JpcHRpb25cbmh1bGwgdWssMTQuMSwxMS43LDEzLFwiUmFpbiwgT3ZlcmNhc3RcIixDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5IHdpdGggZWFybHkgbW9ybmluZyByYWluLlxuaHVsbCB1aywxMS40LDguNiw5LjgsXCJSYWluLCBPdmVyY2FzdFwiLENsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkgd2l0aCBhIGNoYW5jZSBvZiByYWluLmApO1xuXG5jb25zdCB0YWJsZUJvZHkgPSB0YWJsZSgpLmNyZWF0ZVRhYmxlKHRhYmxlRGF0YS5kYXRhKTtcbmNvbnRlbnRUYWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuY29udGVudEZvcm0uYXBwZW5kQ2hpbGQoYm9keUNvbnRlbnQoKS5yZW5kZXIoKSk7XG4vL2JvZHkuYXBwZW5kQ2hpbGQodGFibGVCb2R5KTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudEZvcm0pO1xuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnV0dG9uXCIpO1xuY29uc3QgY291bnRyeU5hbWVGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeS1maWVsZFwiKTtcbmNvbnN0IGNvdW50cnlPcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VsZWN0XCIpO1xuY29uc3QgZGF0ZXNPcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZSA9XCJkYXRlXCJdJyk7XG5jb25zdCB3ZWF0aGVyT3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dFtuYW1lID1cIndlYXRoZXItb3B0aW9uc1wiXTpjaGVja2VkJyxcbik7XG5cbnN1Ym1pdEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGxldCB3ZWF0aGVyVmFsdWVzID0gW107XG4gIGxldCBkYXRlVmFsdWVzID0gW107XG5cbiAgZGF0ZXNPcHRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBkYXRlVmFsdWVzLnB1c2goaXRlbS52YWx1ZSk7XG4gIH0pO1xuXG4gIHdlYXRoZXJPcHRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICB3ZWF0aGVyVmFsdWVzLnB1c2goaXRlbS52YWx1ZSk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhjb3VudHJ5TmFtZUZpZWxkLnZhbHVlKTtcbiAgY29uc29sZS5sb2coY291bnRyeU9wdGlvbi52YWx1ZSk7XG4gIGNvbnNvbGUubG9nKGRhdGVWYWx1ZXMpO1xuICBjb25zb2xlLmxvZyh3ZWF0aGVyVmFsdWVzKTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgZGlzcGxheVRhYmxlKCk7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudFRhYmxlKTtcbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYWJsZSgpIHtcbiAgY29udGVudC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJbc3RhcnRdMWZyW3N0YXJ0LWVuZF0gM2ZyIFtlbmRdXCI7XG59XG4vL2NvbnNvbGUubG9nKHRhYmxlRGF0YS5kYXRhKVxuXG5cbi8qe1wicXVlcnlDb3N0XCI6MSxcImxhdGl0dWRlXCI6NTMuNzQzMixcImxvbmdpdHVkZVwiOi0wLjM0NTY1LFwicmVzb2x2ZWRBZGRyZXNzXCI6XCJIdWxsLCBFbmdsYW5kLCBVbml0ZWQgS2luZ2RvbVwiLFwiYWRkcmVzc1wiOlwiaHVsbCB1a1wiLFwidGltZXpvbmVcIjpcIkV1cm9wZS9Mb25kb25cIixcInR6b2Zmc2V0XCI6MC4wLFwiZGF5c1wiOlt7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wMlwiLFwidGVtcG1heFwiOjQ4LjgsXCJ0ZW1wbWluXCI6NDQuNyxcInRlbXBcIjo0Ni45LFwiaWNvblwiOlwicmFpblwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wM1wiLFwidGVtcG1heFwiOjQ2LjEsXCJ0ZW1wbWluXCI6NDEuMyxcInRlbXBcIjo0My45LFwiaWNvblwiOlwicmFpblwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNFwiLFwidGVtcG1heFwiOjQ0LjksXCJ0ZW1wbWluXCI6MzYuNixcInRlbXBcIjo0MS4yLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDVcIixcInRlbXBtYXhcIjozOC45LFwidGVtcG1pblwiOjMyLjMsXCJ0ZW1wXCI6MzUuOSxcImljb25cIjpcImNsb3VkeVwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNlwiLFwidGVtcG1heFwiOjM5LjMsXCJ0ZW1wbWluXCI6MzYuOCxcInRlbXBcIjozOC40LFwiaWNvblwiOlwiY2xvdWR5XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTA3XCIsXCJ0ZW1wbWF4XCI6MzkuOCxcInRlbXBtaW5cIjozMy4wLFwidGVtcFwiOjM3LjAsXCJpY29uXCI6XCJwYXJ0bHktY2xvdWR5LWRheVwifV19YCAqL1xuLy8gLyp7XCJxdWVyeUNvc3RcIjoxLFwibGF0aXR1ZGVcIjo1My43NDMyLFwibG9uZ2l0dWRlXCI6LTAuMzQ1NjUsXCJyZXNvbHZlZEFkZHJlc3NcIjpcIkh1bGwsIEVuZ2xhbmQsIFVuaXRlZCBLaW5nZG9tXCIsXCJhZGRyZXNzXCI6XCJodWxsIHVrXCIsXCJ0aW1lem9uZVwiOlwiRXVyb3BlL0xvbmRvblwiLFwidHpvZmZzZXRcIjowLjAsXCJkYXlzXCI6W3tcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTAyXCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNDE1MzYwMCxcInRlbXBtYXhcIjo0OC44LFwidGVtcG1pblwiOjQ0LjcsXCJ0ZW1wXCI6NDYuOSxcImZlZWxzbGlrZW1heFwiOjQ1LjksXCJmZWVsc2xpa2VtaW5cIjozOC43LFwiZmVlbHNsaWtlXCI6NDIuMSxcImRld1wiOjQ0LjcsXCJodW1pZGl0eVwiOjkxLjksXCJwcmVjaXBcIjowLjY1NyxcInByZWNpcHByb2JcIjoxMDAuMCxcInByZWNpcGNvdmVyXCI6NTguMzMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjI1LjUsXCJ3aW5kc3BlZWRcIjoxNy42LFwid2luZGRpclwiOjIxMS4zLFwicHJlc3N1cmVcIjo5ODEuMixcImNsb3VkY292ZXJcIjo4My41LFwidmlzaWJpbGl0eVwiOjUuMSxcInNvbGFycmFkaWF0aW9uXCI6Mi4wLFwic29sYXJlbmVyZ3lcIjowLjEsXCJ1dmluZGV4XCI6MC4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxODo1MlwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDE4MzUzMixcInN1bnNldFwiOlwiMTU6NTE6NDhcIixcInN1bnNldEVwb2NoXCI6MTcwNDIxMDcwOCxcIm1vb25waGFzZVwiOjAuNzEsXCJjb25kaXRpb25zXCI6XCJSYWluLCBQYXJ0aWFsbHkgY2xvdWR5XCIsXCJkZXNjcmlwdGlvblwiOlwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkgd2l0aCBhIGNoYW5jZSBvZiByYWluIHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcInJhaW5cIixcInN0YXRpb25zXCI6W1wiRUdYVlwiLFwiRDg3OTFcIixcIkVHWFNcIixcIkVHTkpcIl0sXCJzb3VyY2VcIjpcImNvbWJcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDNcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0MjQwMDAwLFwidGVtcG1heFwiOjQ2LjEsXCJ0ZW1wbWluXCI6NDEuMyxcInRlbXBcIjo0My45LFwiZmVlbHNsaWtlbWF4XCI6NDMuMSxcImZlZWxzbGlrZW1pblwiOjM3LjAsXCJmZWVsc2xpa2VcIjozOS44LFwiZGV3XCI6NDEuOSxcImh1bWlkaXR5XCI6OTIuOCxcInByZWNpcFwiOjAuMTA0LFwicHJlY2lwcHJvYlwiOjk2LjgsXCJwcmVjaXBjb3ZlclwiOjMzLjMzLFwicHJlY2lwdHlwZVwiOltcInJhaW5cIl0sXCJzbm93XCI6MC4wLFwic25vd2RlcHRoXCI6MC4wLFwid2luZGd1c3RcIjoxOC42LFwid2luZHNwZWVkXCI6MTEuMixcIndpbmRkaXJcIjoyMzkuNixcInByZXNzdXJlXCI6OTg3LjYsXCJjbG91ZGNvdmVyXCI6ODAuNCxcInZpc2liaWxpdHlcIjoxMy4zLFwic29sYXJyYWRpYXRpb25cIjoxMC4wLFwic29sYXJlbmVyZ3lcIjowLjgsXCJ1dmluZGV4XCI6MS4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxODozOFwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDI2OTkxOCxcInN1bnNldFwiOlwiMTU6NTI6NTlcIixcInN1bnNldEVwb2NoXCI6MTcwNDI5NzE3OSxcIm1vb25waGFzZVwiOjAuNzQsXCJjb25kaXRpb25zXCI6XCJSYWluLCBQYXJ0aWFsbHkgY2xvdWR5XCIsXCJkZXNjcmlwdGlvblwiOlwiUGFydGx5IGNsb3VkeSB0aHJvdWdob3V0IHRoZSBkYXkgd2l0aCBlYXJseSBtb3JuaW5nIHJhaW4uXCIsXCJpY29uXCI6XCJyYWluXCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDRcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0MzI2NDAwLFwidGVtcG1heFwiOjQ0LjksXCJ0ZW1wbWluXCI6MzYuNixcInRlbXBcIjo0MS4yLFwiZmVlbHNsaWtlbWF4XCI6NDEuMyxcImZlZWxzbGlrZW1pblwiOjM2LjYsXCJmZWVsc2xpa2VcIjozOC4zLFwiZGV3XCI6MzkuNixcImh1bWlkaXR5XCI6OTQuMyxcInByZWNpcFwiOjAuMCxcInByZWNpcHByb2JcIjoyMi42LFwicHJlY2lwY292ZXJcIjowLjAsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjEzLjYsXCJ3aW5kc3BlZWRcIjo4LjMsXCJ3aW5kZGlyXCI6MjI3LjgsXCJwcmVzc3VyZVwiOjk5OS4xLFwiY2xvdWRjb3ZlclwiOjY2LjQsXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MjIuMSxcInNvbGFyZW5lcmd5XCI6MS45LFwidXZpbmRleFwiOjIuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTg6MjBcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQzNTYzMDAsXCJzdW5zZXRcIjpcIjE1OjU0OjEzXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQzODM2NTMsXCJtb29ucGhhc2VcIjowLjc1LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wNVwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ0MTI4MDAsXCJ0ZW1wbWF4XCI6MzguOSxcInRlbXBtaW5cIjozMi4zLFwidGVtcFwiOjM1LjksXCJmZWVsc2xpa2VtYXhcIjozOC45LFwiZmVlbHNsaWtlbWluXCI6MjkuMSxcImZlZWxzbGlrZVwiOjM0LjMsXCJkZXdcIjozNS43LFwiaHVtaWRpdHlcIjo5OC4wLFwicHJlY2lwXCI6MC4wOTUsXCJwcmVjaXBwcm9iXCI6MTkuNCxcInByZWNpcGNvdmVyXCI6MjAuODMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjguNyxcIndpbmRzcGVlZFwiOjQuNyxcIndpbmRkaXJcIjoyNzYuMCxcInByZXNzdXJlXCI6MTAwNC44LFwiY2xvdWRjb3ZlclwiOjk2LjksXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MjMuOCxcInNvbGFyZW5lcmd5XCI6Mi4xLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTc6NTlcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ0NDI2NzksXCJzdW5zZXRcIjpcIjE1OjU1OjI5XCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ0NzAxMjksXCJtb29ucGhhc2VcIjowLjgxLFwiY29uZGl0aW9uc1wiOlwiT3ZlcmNhc3RcIixcImRlc2NyaXB0aW9uXCI6XCJDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwiY2xvdWR5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDZcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0NDk5MjAwLFwidGVtcG1heFwiOjM5LjMsXCJ0ZW1wbWluXCI6MzYuOCxcInRlbXBcIjozOC40LFwiZmVlbHNsaWtlbWF4XCI6MzkuMyxcImZlZWxzbGlrZW1pblwiOjM2LjMsXCJmZWVsc2xpa2VcIjozOC4wLFwiZGV3XCI6MzcuMixcImh1bWlkaXR5XCI6OTUuMSxcInByZWNpcFwiOjAuMDIsXCJwcmVjaXBwcm9iXCI6MTYuMSxcInByZWNpcGNvdmVyXCI6MTYuNjcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjcuMixcIndpbmRzcGVlZFwiOjQuMCxcIndpbmRkaXJcIjoyMzIuNixcInByZXNzdXJlXCI6MTAxOC41LFwiY2xvdWRjb3ZlclwiOjkzLjIsXCJ2aXNpYmlsaXR5XCI6MTMuOCxcInNvbGFycmFkaWF0aW9uXCI6MjguMSxcInNvbGFyZW5lcmd5XCI6Mi40LFwidXZpbmRleFwiOjIuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTc6MzVcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ1MjkwNTUsXCJzdW5zZXRcIjpcIjE1OjU2OjQ4XCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ1NTY2MDgsXCJtb29ucGhhc2VcIjowLjg0LFwiY29uZGl0aW9uc1wiOlwiT3ZlcmNhc3RcIixcImRlc2NyaXB0aW9uXCI6XCJDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwiY2xvdWR5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMDdcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0NTg1NjAwLFwidGVtcG1heFwiOjM5LjgsXCJ0ZW1wbWluXCI6MzMuMCxcInRlbXBcIjozNy4wLFwiZmVlbHNsaWtlbWF4XCI6MzguMixcImZlZWxzbGlrZW1pblwiOjI2LjAsXCJmZWVsc2xpa2VcIjozMy43LFwiZGV3XCI6MzEuNyxcImh1bWlkaXR5XCI6ODEuNixcInByZWNpcFwiOjAuMDA0LFwicHJlY2lwcHJvYlwiOjI1LjgsXCJwcmVjaXBjb3ZlclwiOjQuMTcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiLFwic25vd1wiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjIyLjUsXCJ3aW5kc3BlZWRcIjo5LjcsXCJ3aW5kZGlyXCI6MzQ0LjUsXCJwcmVzc3VyZVwiOjEwMjkuNyxcImNsb3VkY292ZXJcIjo1MS44LFwidmlzaWJpbGl0eVwiOjE1LjAsXCJzb2xhcnJhZGlhdGlvblwiOjQ3LjIsXCJzb2xhcmVuZXJneVwiOjQuMSxcInV2aW5kZXhcIjoyLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE3OjA2XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0NjE1NDI2LFwic3Vuc2V0XCI6XCIxNTo1ODoxMFwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0NjQzMDkwLFwibW9vbnBoYXNlXCI6MC44NyxcImNvbmRpdGlvbnNcIjpcIlBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJDbGVhcmluZyBpbiB0aGUgYWZ0ZXJub29uLlwiLFwiaWNvblwiOlwicGFydGx5LWNsb3VkeS1kYXlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0wOFwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ2NzIwMDAsXCJ0ZW1wbWF4XCI6NDIuNSxcInRlbXBtaW5cIjozNy4xLFwidGVtcFwiOjM5LjgsXCJmZWVsc2xpa2VtYXhcIjozNi45LFwiZmVlbHNsaWtlbWluXCI6MzEuOSxcImZlZWxzbGlrZVwiOjM0LjAsXCJkZXdcIjozMi44LFwiaHVtaWRpdHlcIjo3NS44LFwicHJlY2lwXCI6MC4wOTEsXCJwcmVjaXBwcm9iXCI6MjkuMCxcInByZWNpcGNvdmVyXCI6MjAuODMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjEsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjI4LjksXCJ3aW5kc3BlZWRcIjoxNi4zLFwid2luZGRpclwiOjUwLjgsXCJwcmVzc3VyZVwiOjEwMzYuNSxcImNsb3VkY292ZXJcIjo1OS44LFwidmlzaWJpbGl0eVwiOjE1LjAsXCJzb2xhcnJhZGlhdGlvblwiOjIyLjYsXCJzb2xhcmVuZXJneVwiOjIuMSxcInV2aW5kZXhcIjoxLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE2OjM0XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0NzAxNzk0LFwic3Vuc2V0XCI6XCIxNTo1OTozNVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0NzI5NTc1LFwibW9vbnBoYXNlXCI6MC45LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwic25vd1wiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTA5XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNDc1ODQwMCxcInRlbXBtYXhcIjo0MS44LFwidGVtcG1pblwiOjM3LjEsXCJ0ZW1wXCI6MzkuNyxcImZlZWxzbGlrZW1heFwiOjM5LjQsXCJmZWVsc2xpa2VtaW5cIjozMi45LFwiZmVlbHNsaWtlXCI6MzYuNCxcImRld1wiOjMyLjAsXCJodW1pZGl0eVwiOjc0LjEsXCJwcmVjaXBcIjowLjAwNCxcInByZWNpcHByb2JcIjoyOS4wLFwicHJlY2lwY292ZXJcIjo0LjE3LFwicHJlY2lwdHlwZVwiOltcInJhaW5cIl0sXCJzbm93XCI6MC4wLFwic25vd2RlcHRoXCI6MC4wLFwid2luZGd1c3RcIjoxMi4zLFwid2luZHNwZWVkXCI6Ni45LFwid2luZGRpclwiOjIyLjUsXCJwcmVzc3VyZVwiOjEwMzguMixcImNsb3VkY292ZXJcIjo3OC4wLFwidmlzaWJpbGl0eVwiOjE1LjAsXCJzb2xhcnJhZGlhdGlvblwiOjIzLjMsXCJzb2xhcmVuZXJneVwiOjIuMSxcInV2aW5kZXhcIjoxLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjE1OjU5XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA0Nzg4MTU5LFwic3Vuc2V0XCI6XCIxNjowMTowMVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA0ODE2MDYxLFwibW9vbnBoYXNlXCI6MC45NCxcImNvbmRpdGlvbnNcIjpcIlBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJQYXJ0bHkgY2xvdWR5IHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcInBhcnRseS1jbG91ZHktZGF5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMTBcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA0ODQ0ODAwLFwidGVtcG1heFwiOjQzLjgsXCJ0ZW1wbWluXCI6MzkuNixcInRlbXBcIjo0Mi4yLFwiZmVlbHNsaWtlbWF4XCI6MzkuNixcImZlZWxzbGlrZW1pblwiOjM1LjIsXCJmZWVsc2xpa2VcIjozNy44LFwiZGV3XCI6MzYuOCxcImh1bWlkaXR5XCI6ODEuMixcInByZWNpcFwiOjAuMDI0LFwicHJlY2lwcHJvYlwiOjkuNyxcInByZWNpcGNvdmVyXCI6MjAuODMsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjE4LjYsXCJ3aW5kc3BlZWRcIjo4LjksXCJ3aW5kZGlyXCI6NTEuNixcInByZXNzdXJlXCI6MTAzNS40LFwiY2xvdWRjb3ZlclwiOjk3LjksXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6OS42LFwic29sYXJlbmVyZ3lcIjowLjYsXCJ1dmluZGV4XCI6MC4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxNToyMFwiLFwic3VucmlzZUVwb2NoXCI6MTcwNDg3NDUyMCxcInN1bnNldFwiOlwiMTY6MDI6MzFcIixcInN1bnNldEVwb2NoXCI6MTcwNDkwMjU1MSxcIm1vb25waGFzZVwiOjAuOTcsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xMVwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDQ5MzEyMDAsXCJ0ZW1wbWF4XCI6NDMuMSxcInRlbXBtaW5cIjo0MS40LFwidGVtcFwiOjQxLjksXCJmZWVsc2xpa2VtYXhcIjozNy43LFwiZmVlbHNsaWtlbWluXCI6MzYuMCxcImZlZWxzbGlrZVwiOjM2LjcsXCJkZXdcIjozNS4wLFwiaHVtaWRpdHlcIjo3Ni40LFwicHJlY2lwXCI6MC4wMTIsXCJwcmVjaXBwcm9iXCI6Ni41LFwicHJlY2lwY292ZXJcIjoxMi41LFwicHJlY2lwdHlwZVwiOltcInJhaW5cIl0sXCJzbm93XCI6MC4wLFwic25vd2RlcHRoXCI6MC4wLFwid2luZGd1c3RcIjoxNy4yLFwid2luZHNwZWVkXCI6MTAuMSxcIndpbmRkaXJcIjo3Ni45LFwicHJlc3N1cmVcIjoxMDI4LjgsXCJjbG91ZGNvdmVyXCI6MTAwLjAsXCJ2aXNpYmlsaXR5XCI6MTUuMCxcInNvbGFycmFkaWF0aW9uXCI6MTIuMCxcInNvbGFyZW5lcmd5XCI6MS4yLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTQ6MzhcIixcInN1bnJpc2VFcG9jaFwiOjE3MDQ5NjA4NzgsXCJzdW5zZXRcIjpcIjE2OjA0OjAyXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDQ5ODkwNDIsXCJtb29ucGhhc2VcIjowLjAsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xMlwiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDUwMTc2MDAsXCJ0ZW1wbWF4XCI6NDEuNixcInRlbXBtaW5cIjozNS4zLFwidGVtcFwiOjM5LjUsXCJmZWVsc2xpa2VtYXhcIjozOC44LFwiZmVlbHNsaWtlbWluXCI6MzEuMSxcImZlZWxzbGlrZVwiOjM2LjMsXCJkZXdcIjozMy41LFwiaHVtaWRpdHlcIjo3OS4zLFwicHJlY2lwXCI6MC4wLFwicHJlY2lwcHJvYlwiOjIyLjYsXCJwcmVjaXBjb3ZlclwiOjAuMCxcInByZWNpcHR5cGVcIjpudWxsLFwic25vd1wiOjAuMCxcInNub3dkZXB0aFwiOjAuMCxcIndpbmRndXN0XCI6OS44LFwid2luZHNwZWVkXCI6NS40LFwid2luZGRpclwiOjE1OS41LFwicHJlc3N1cmVcIjoxMDEzLjIsXCJjbG91ZGNvdmVyXCI6OTIuMixcInZpc2liaWxpdHlcIjoxNS4wLFwic29sYXJyYWRpYXRpb25cIjozNi45LFwic29sYXJlbmVyZ3lcIjozLjMsXCJ1dmluZGV4XCI6Mi4wLFwic2V2ZXJlcmlza1wiOjEwLjAsXCJzdW5yaXNlXCI6XCIwODoxMzo1MlwiLFwic3VucmlzZUVwb2NoXCI6MTcwNTA0NzIzMixcInN1bnNldFwiOlwiMTY6MDU6MzZcIixcInN1bnNldEVwb2NoXCI6MTcwNTA3NTUzNixcIm1vb25waGFzZVwiOjAuMDQsXCJjb25kaXRpb25zXCI6XCJPdmVyY2FzdFwiLFwiZGVzY3JpcHRpb25cIjpcIkNsb3VkeSBza2llcyB0aHJvdWdob3V0IHRoZSBkYXkuXCIsXCJpY29uXCI6XCJjbG91ZHlcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifSx7XCJkYXRldGltZVwiOlwiMjAyNC0wMS0xM1wiLFwiZGF0ZXRpbWVFcG9jaFwiOjE3MDUxMDQwMDAsXCJ0ZW1wbWF4XCI6NDAuOSxcInRlbXBtaW5cIjozNS4xLFwidGVtcFwiOjM4LjcsXCJmZWVsc2xpa2VtYXhcIjozNy4xLFwiZmVlbHNsaWtlbWluXCI6MzAuOCxcImZlZWxzbGlrZVwiOjM0LjMsXCJkZXdcIjozNC43LFwiaHVtaWRpdHlcIjo4NS42LFwicHJlY2lwXCI6MC4wMzYsXCJwcmVjaXBwcm9iXCI6MjIuNixcInByZWNpcGNvdmVyXCI6MTYuNjcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjI0LjgsXCJ3aW5kc3BlZWRcIjoxNS45LFwid2luZGRpclwiOjIyLjAsXCJwcmVzc3VyZVwiOjk5Ni43LFwiY2xvdWRjb3ZlclwiOjEwMC4wLFwidmlzaWJpbGl0eVwiOjE0LjksXCJzb2xhcnJhZGlhdGlvblwiOjcuOCxcInNvbGFyZW5lcmd5XCI6MC42LFwidXZpbmRleFwiOjAuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTM6MDNcIixcInN1bnJpc2VFcG9jaFwiOjE3MDUxMzM1ODMsXCJzdW5zZXRcIjpcIjE2OjA3OjEyXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDUxNjIwMzIsXCJtb29ucGhhc2VcIjowLjA3LFwiY29uZGl0aW9uc1wiOlwiT3ZlcmNhc3RcIixcImRlc2NyaXB0aW9uXCI6XCJDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwiY2xvdWR5XCIsXCJzdGF0aW9uc1wiOm51bGwsXCJzb3VyY2VcIjpcImZjc3RcIn0se1wiZGF0ZXRpbWVcIjpcIjIwMjQtMDEtMTRcIixcImRhdGV0aW1lRXBvY2hcIjoxNzA1MTkwNDAwLFwidGVtcG1heFwiOjQwLjAsXCJ0ZW1wbWluXCI6MzEuNyxcInRlbXBcIjozNS41LFwiZmVlbHNsaWtlbWF4XCI6MzEuNyxcImZlZWxzbGlrZW1pblwiOjIzLjAsXCJmZWVsc2xpa2VcIjoyNy4xLFwiZGV3XCI6MjcuNyxcImh1bWlkaXR5XCI6NzMuMyxcInByZWNpcFwiOjAuMDIsXCJwcmVjaXBwcm9iXCI6MjIuNixcInByZWNpcGNvdmVyXCI6MTYuNjcsXCJwcmVjaXB0eXBlXCI6W1wicmFpblwiLFwic25vd1wiXSxcInNub3dcIjowLjAsXCJzbm93ZGVwdGhcIjowLjAsXCJ3aW5kZ3VzdFwiOjMxLjMsXCJ3aW5kc3BlZWRcIjoxNS45LFwid2luZGRpclwiOjMwOS40LFwicHJlc3N1cmVcIjo5OTguNSxcImNsb3VkY292ZXJcIjo5MC4xLFwidmlzaWJpbGl0eVwiOjE0LjMsXCJzb2xhcnJhZGlhdGlvblwiOjMxLjUsXCJzb2xhcmVuZXJneVwiOjIuNyxcInV2aW5kZXhcIjoxLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjEyOjExXCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA1MjE5OTMxLFwic3Vuc2V0XCI6XCIxNjowODo1MFwiLFwic3Vuc2V0RXBvY2hcIjoxNzA1MjQ4NTMwLFwibW9vbnBoYXNlXCI6MC4xMSxcImNvbmRpdGlvbnNcIjpcIk92ZXJjYXN0XCIsXCJkZXNjcmlwdGlvblwiOlwiQ2xvdWR5IHNraWVzIHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcImNsb3VkeVwiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTE1XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNTI3NjgwMCxcInRlbXBtYXhcIjozNi4yLFwidGVtcG1pblwiOjMwLjgsXCJ0ZW1wXCI6MzMuMCxcImZlZWxzbGlrZW1heFwiOjI1LjYsXCJmZWVsc2xpa2VtaW5cIjoxOS4wLFwiZmVlbHNsaWtlXCI6MjIuMCxcImRld1wiOjI2LjIsXCJodW1pZGl0eVwiOjc2LjQsXCJwcmVjaXBcIjowLjE5OCxcInByZWNpcHByb2JcIjoyOS4wLFwicHJlY2lwY292ZXJcIjoyOS4xNyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCIsXCJzbm93XCJdLFwic25vd1wiOjAuOCxcInNub3dkZXB0aFwiOjAuMixcIndpbmRndXN0XCI6NDEuOCxcIndpbmRzcGVlZFwiOjI0LjYsXCJ3aW5kZGlyXCI6MzEwLjEsXCJwcmVzc3VyZVwiOjEwMDUuOSxcImNsb3VkY292ZXJcIjo2OS4zLFwidmlzaWJpbGl0eVwiOjguNSxcInNvbGFycmFkaWF0aW9uXCI6MzUuMCxcInNvbGFyZW5lcmd5XCI6My4wLFwidXZpbmRleFwiOjEuMCxcInNldmVyZXJpc2tcIjoxMC4wLFwic3VucmlzZVwiOlwiMDg6MTE6MTZcIixcInN1bnJpc2VFcG9jaFwiOjE3MDUzMDYyNzYsXCJzdW5zZXRcIjpcIjE2OjEwOjMwXCIsXCJzdW5zZXRFcG9jaFwiOjE3MDUzMzUwMzAsXCJtb29ucGhhc2VcIjowLjE0LFwiY29uZGl0aW9uc1wiOlwiUGFydGlhbGx5IGNsb3VkeVwiLFwiZGVzY3JpcHRpb25cIjpcIlBhcnRseSBjbG91ZHkgdGhyb3VnaG91dCB0aGUgZGF5LlwiLFwiaWNvblwiOlwic25vd1wiLFwic3RhdGlvbnNcIjpudWxsLFwic291cmNlXCI6XCJmY3N0XCJ9LHtcImRhdGV0aW1lXCI6XCIyMDI0LTAxLTE2XCIsXCJkYXRldGltZUVwb2NoXCI6MTcwNTM2MzIwMCxcInRlbXBtYXhcIjozNC4xLFwidGVtcG1pblwiOjI5LjIsXCJ0ZW1wXCI6MzEuOCxcImZlZWxzbGlrZW1heFwiOjI0LjksXCJmZWVsc2xpa2VtaW5cIjoxOS43LFwiZmVlbHNsaWtlXCI6MjEuOSxcImRld1wiOjI2LjIsXCJodW1pZGl0eVwiOjc5LjYsXCJwcmVjaXBcIjowLjA2NyxcInByZWNpcHByb2JcIjoxOS40LFwicHJlY2lwY292ZXJcIjoyMC44MyxcInByZWNpcHR5cGVcIjpbXCJyYWluXCIsXCJzbm93XCJdLFwic25vd1wiOjAuMixcInNub3dkZXB0aFwiOjAuNyxcIndpbmRndXN0XCI6MzUuNixcIndpbmRzcGVlZFwiOjE3LjIsXCJ3aW5kZGlyXCI6MzA5LjEsXCJwcmVzc3VyZVwiOjEwMTMuNixcImNsb3VkY292ZXJcIjo1NS44LFwidmlzaWJpbGl0eVwiOjEzLjgsXCJzb2xhcnJhZGlhdGlvblwiOjQwLjAsXCJzb2xhcmVuZXJneVwiOjMuNSxcInV2aW5kZXhcIjoyLjAsXCJzZXZlcmVyaXNrXCI6MTAuMCxcInN1bnJpc2VcIjpcIjA4OjEwOjE3XCIsXCJzdW5yaXNlRXBvY2hcIjoxNzA1MzkyNjE3LFwic3Vuc2V0XCI6XCIxNjoxMjoxMVwiLFwic3Vuc2V0RXBvY2hcIjoxNzA1NDIxNTMxLFwibW9vbnBoYXNlXCI6MC4xOCxcImNvbmRpdGlvbnNcIjpcIlBhcnRpYWxseSBjbG91ZHlcIixcImRlc2NyaXB0aW9uXCI6XCJQYXJ0bHkgY2xvdWR5IHRocm91Z2hvdXQgdGhlIGRheS5cIixcImljb25cIjpcInNub3dcIixcInN0YXRpb25zXCI6bnVsbCxcInNvdXJjZVwiOlwiZmNzdFwifV0sXCJzdGF0aW9uc1wiOntcIkVHWFZcIjp7XCJkaXN0YW5jZVwiOjE1MTY1LjAsXCJsYXRpdHVkZVwiOjUzLjg3LFwibG9uZ2l0dWRlXCI6LTAuNDMsXCJ1c2VDb3VudFwiOjAsXCJpZFwiOlwiRUdYVlwiLFwibmFtZVwiOlwiRUdYVlwiLFwicXVhbGl0eVwiOjUwLFwiY29udHJpYnV0aW9uXCI6MC4wfSxcIkQ4NzkxXCI6e1wiZGlzdGFuY2VcIjoyOTk2LjAsXCJsYXRpdHVkZVwiOjUzLjc0LFwibG9uZ2l0dWRlXCI6LTAuMzkxLFwidXNlQ291bnRcIjowLFwiaWRcIjpcIkQ4NzkxXCIsXCJuYW1lXCI6XCJEVzg3OTEgSHVsbCBVS1wiLFwicXVhbGl0eVwiOjAsXCJjb250cmlidXRpb25cIjowLjB9LFwiRUdYU1wiOntcImRpc3RhbmNlXCI6NDM5MzEuMCxcImxhdGl0dWRlXCI6NTMuNDgsXCJsb25naXR1ZGVcIjowLjE1LFwidXNlQ291bnRcIjowLFwiaWRcIjpcIkVHWFNcIixcIm5hbWVcIjpcIkVHWFNcIixcInF1YWxpdHlcIjo0OSxcImNvbnRyaWJ1dGlvblwiOjAuMH0sXCJFR05KXCI6e1wiZGlzdGFuY2VcIjoxODE3MC4wLFwibGF0aXR1ZGVcIjo1My41OCxcImxvbmdpdHVkZVwiOi0wLjM1LFwidXNlQ291bnRcIjowLFwiaWRcIjpcIkVHTkpcIixcIm5hbWVcIjpcIkVHTkpcIixcInF1YWxpdHlcIjo1MCxcImNvbnRyaWJ1dGlvblwiOjAuMH19fSAqL1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9