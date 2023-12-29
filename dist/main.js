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
    let urlEnd = `&include=days&key=GGLYE6F842M6SC4GVHVXRZF4R&contentType=csv`;
    let mainUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherInfo.getCity()}%20${weatherInfo.getCountry()}/${weatherInfo.getStartDate()}`;

    mainUrl = weatherInfo.getEndDate()
      ? `${mainUrl}/${weatherInfo.getEndDate()}?`
      : `${mainUrl}?`;

    mainUrl += `unitGroup=metric&elements=`;
    for (let i = 0; i < elements.length; i++) {
      if (i !== elements.length - 1) {
        mainUrl += `${elements[i]}%2C`;
      } else {
        mainUrl += `${elements[i]}`;
      }
    }

    return `${mainUrl}${urlEnd}`;
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
    submitBtn.textContent = 'Submit'
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

    endDate.setAttribute("type", "date");
    endDate.setAttribute("name", "start-date");
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
    const dropDown = document.createElement("select");
    const dropDownName = document.createElement("optgroup");
    dropDownName.label = "Select Country";
    dropDown.appendChild(dropDownName);

    sortedListed.forEach((item) => {
      const dropdownItem = document.createElement("option");
      dropdownItem.value = item.code;
      dropdownItem.textContent = item.country;

      dropDown.appendChild(dropdownItem);
    });

    dropDownDiv.appendChild(dropDown);
    return dropDownDiv;
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


}

.content{
    height: 100vh;
    display: grid;
    grid-template-columns: [start]1fr [start-end]0fr [end];
    grid-auto-rows: auto;
    justify-items: center;
    align-items: center;

}

.content-table{
    grid-column: start-end/end;
}

.content-form{
    grid-column: start/start-end;
}
table{
    
    border: 1px solid #ff0000;
    font-size: 1rem;
    border-collapse: collapse;
    width: 60%;
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
   
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}

.form-div, .date-div{
    display: flex;
    gap: 5px;
    width: 80%;
    margin: 0 auto;
    justify-content: center;
    align-self:flex-start ;
}


.form-div input, .form-div select, .date-div input{
    font-size: 1.75em;
    border-radius: 10px;
    text-align: center;
    padding: 8px;
}


.form-div select{
    width: fit-content;
    background-color: #efefef;
}

.submit-button{
    padding: 10px 22px;
    border-radius: 10px;
    font-size: 1.5em;
    background-color: cornflowerblue;
    color: white;
    border: 0;
    width: fit-content;
    
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":";AACA;IACI,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,sBAAsB;IACtB,gBAAgB;;;AAGpB;;AAEA;IACI,aAAa;IACb,aAAa;IACb,sDAAsD;IACtD,oBAAoB;IACpB,qBAAqB;IACrB,mBAAmB;;AAEvB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,4BAA4B;AAChC;AACA;;IAEI,yBAAyB;IACzB,eAAe;IACf,yBAAyB;IACzB,UAAU;AACd;;AAEA;IACI,kBAAkB;IAClB,YAAY;AAChB;AACA;IACI,0BAA0B;AAC9B;;;AAGA;IACI,iBAAiB;IACjB,UAAU;IACV,mBAAmB;IACnB,YAAY;IACZ,kBAAkB;IAClB,uBAAuB;AAC3B;;;;AAIA;;IAEI,aAAa;IACb,sBAAsB;IACtB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,QAAQ;IACR,UAAU;IACV,cAAc;IACd,uBAAuB;IACvB,sBAAsB;AAC1B;;;AAGA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,kBAAkB;IAClB,YAAY;AAChB;;;AAGA;IACI,kBAAkB;IAClB,yBAAyB;AAC7B;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,gBAAgB;IAChB,gCAAgC;IAChC,YAAY;IACZ,SAAS;IACT,kBAAkB;;AAEtB","sourcesContent":["\n*{\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    box-sizing: border-box;\n    background: none;\n\n\n}\n\n.content{\n    height: 100vh;\n    display: grid;\n    grid-template-columns: [start]1fr [start-end]0fr [end];\n    grid-auto-rows: auto;\n    justify-items: center;\n    align-items: center;\n\n}\n\n.content-table{\n    grid-column: start-end/end;\n}\n\n.content-form{\n    grid-column: start/start-end;\n}\ntable{\n    \n    border: 1px solid #ff0000;\n    font-size: 1rem;\n    border-collapse: collapse;\n    width: 60%;\n}\n\nth{\n    font-size: 1.45rem;\n    padding: 5px;\n}\nth::first-letter{\n    text-transform: capitalize;\n}\n\n\ntd{\n    font-size: 1.2rem;\n    width: 15%;\n    height: fit-content;\n    padding: 5px;\n    text-align: center;\n    border: 2px solid #cccc;\n}\n\n\n\nform {\n   \n    display: flex;\n    flex-direction: column;\n    text-align: center;\n    align-items: center;\n}\n\n.form-div, .date-div{\n    display: flex;\n    gap: 5px;\n    width: 80%;\n    margin: 0 auto;\n    justify-content: center;\n    align-self:flex-start ;\n}\n\n\n.form-div input, .form-div select, .date-div input{\n    font-size: 1.75em;\n    border-radius: 10px;\n    text-align: center;\n    padding: 8px;\n}\n\n\n.form-div select{\n    width: fit-content;\n    background-color: #efefef;\n}\n\n.submit-button{\n    padding: 10px 22px;\n    border-radius: 10px;\n    font-size: 1.5em;\n    background-color: cornflowerblue;\n    color: white;\n    border: 0;\n    width: fit-content;\n    \n}"],"sourceRoot":""}]);
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
body.classList.add("content");
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7QUFHQSxpQkFBaUIsaURBQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQiwwREFBSztBQUN2QjtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLDBEQUFLO0FBQ3ZCO0FBQ0Esd0JBQXdCLDZEQUFXO0FBQ25DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vZnVuY3Rpb24vZmV0Y2hXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vZnVuY3Rpb24vbG9hZGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vZnVuY3Rpb24vbWFrZVRhYmxlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9wYXBhcGFyc2UvcGFwYXBhcnNlLm1pbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vb2JqL1dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdlYXRoZXIgfSBmcm9tIFwiLi4vb2JqL1dlYXRoZXJcIjtcblxuZXhwb3J0IGNvbnN0IFdlYXRoZXJEZXRhaWxzID0gKCkgPT4ge1xuICBmdW5jdGlvbiBidWlsZEFwaVVSTCh3ZWF0aGVySW5mbywgZWxlbWVudHMpIHtcbiAgICBsZXQgdXJsRW5kID0gYCZpbmNsdWRlPWRheXMma2V5PUdHTFlFNkY4NDJNNlNDNEdWSFZYUlpGNFImY29udGVudFR5cGU9Y3N2YDtcbiAgICBsZXQgbWFpblVybCA9IGBodHRwczovL3dlYXRoZXIudmlzdWFsY3Jvc3NpbmcuY29tL1Zpc3VhbENyb3NzaW5nV2ViU2VydmljZXMvcmVzdC9zZXJ2aWNlcy90aW1lbGluZS8ke3dlYXRoZXJJbmZvLmdldENpdHkoKX0lMjAke3dlYXRoZXJJbmZvLmdldENvdW50cnkoKX0vJHt3ZWF0aGVySW5mby5nZXRTdGFydERhdGUoKX1gO1xuXG4gICAgbWFpblVybCA9IHdlYXRoZXJJbmZvLmdldEVuZERhdGUoKVxuICAgICAgPyBgJHttYWluVXJsfS8ke3dlYXRoZXJJbmZvLmdldEVuZERhdGUoKX0/YFxuICAgICAgOiBgJHttYWluVXJsfT9gO1xuXG4gICAgbWFpblVybCArPSBgdW5pdEdyb3VwPW1ldHJpYyZlbGVtZW50cz1gO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpICE9PSBlbGVtZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIG1haW5VcmwgKz0gYCR7ZWxlbWVudHNbaV19JTJDYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1haW5VcmwgKz0gYCR7ZWxlbWVudHNbaV19YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYCR7bWFpblVybH0ke3VybEVuZH1gO1xuICB9XG4gIGFzeW5jIGZ1bmN0aW9uIGNhbGxXZWF0aGVyQVBJKGluZm8sIGVsZW1lbnRzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVybCA9IGF3YWl0IGJ1aWxkQXBpVVJMKGluZm8sIGVsZW1lbnRzKTtcbiAgICAgIC8vcmV0dXJuIHVybDtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGNhbGxXZWF0aGVyQVBJIH07XG59O1xuXG4vL2h0dHBzOi8vd2VhdGhlci52aXN1YWxjcm9zc2luZy5jb20vVmlzdWFsQ3Jvc3NpbmdXZWJTZXJ2aWNlcy9yZXN0L3NlcnZpY2VzL3RpbWVsaW5lL2h1bGwlMjB1az91bml0R3JvdXA9dXMmaW5jbHVkZT1kYXlzJmtleT1CTkFYMkdCVUVERjlYQ1U2RTc0U1U0VDM2JmNvbnRlbnRUeXBlPWNzdlxuIiwiZXhwb3J0IGNvbnN0IGJvZHlDb250ZW50ID0gKCkgPT4ge1xuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgY29uc3QgZm9ybURldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBjb25zdCBmb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtRGl2LmNsYXNzTGlzdC5hZGQoXCJmb3JtLWRpdlwiKTtcbiAgICBjb25zdCBmb3JtVGV4dEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9ICdTdWJtaXQnXG4gICAgc3VibWl0QnRuLmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gICAgZm9ybVRleHRCb3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgZm9ybVRleHRCb3guc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJFbnRlciBMb2NhdGlvbiBIZXJlXCIpO1xuICAgIGZvcm1UZXh0Qm94LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY291bnRyeS1maWVsZFwiKTtcbiAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGZvcm1UZXh0Qm94KTtcbiAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGNyZWF0ZUNvdW50cnlEcm9wRG93bigpKTtcbiAgICBmb3JtRGV0YWlscy5hcHBlbmRDaGlsZChmb3JtRGl2KTtcbiAgICBmb3JtRGV0YWlscy5hcHBlbmRDaGlsZChjcmVhdGVEYXRlcygpKTtcbiAgICBmb3JtRGV0YWlscy5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xuXG4gICAgcmV0dXJuIGZvcm1EZXRhaWxzO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRGF0ZXMoKSB7XG4gICAgY29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGF0ZURpdi5jbGFzc0xpc3QuYWRkKFwiZGF0ZS1kaXZcIik7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbnN0IGVuZERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cbiAgICBzdGFydERhdGUuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInN0YXJ0LWRhdGVcIik7XG4gICAgc3RhcnREYXRlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xuICAgIHN0YXJ0RGF0ZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcIm1pblwiLFxuICAgICAgYCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLCAxMCl9YCxcbiAgICApO1xuICAgIHN0YXJ0RGF0ZS52YWx1ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTApO1xuICAgIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwgMTApO1xuXG4gICAgZW5kRGF0ZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcbiAgICBlbmREYXRlLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJzdGFydC1kYXRlXCIpO1xuICAgIHN0YXJ0RGF0ZS5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGVuZERhdGUuc2V0QXR0cmlidXRlKFwibWluXCIsIHN0YXJ0RGF0ZS52YWx1ZSk7XG4gICAgfTtcblxuICAgIGRhdGVEaXYuYXBwZW5kQ2hpbGQoc3RhcnREYXRlKTtcbiAgICBkYXRlRGl2LmFwcGVuZENoaWxkKGVuZERhdGUpO1xuXG4gICAgcmV0dXJuIGRhdGVEaXY7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDb3VudHJ5RHJvcERvd24oKSB7XG4gICAgY29uc3QgZHJvcERvd25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGNvdW50cnlDb2RlID0gW1xuICAgICAgeyBjb3VudHJ5OiBcIlVuaXRlZCBLaW5nZG9tXCIsIGNvZGU6IFwiR0JcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIkF1c3RyYWxpYVwiLCBjb2RlOiBcIkFVXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJDYW5hZGFcIiwgY29kZTogXCJDQVwiIH0sXG4gICAgICB7IGNvdW50cnk6IFwiTmlnZXJpYVwiLCBjb2RlOiBcIk5HXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJHZXJtYW55XCIsIGNvZGU6IFwiREVcIiB9LFxuICAgICAgeyBjb3VudHJ5OiBcIlVuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYVwiLCBjb2RlOiBcIlVTXCIgfSxcbiAgICAgIHsgY291bnRyeTogXCJTb3V0aCBBZnJpY2FcIiwgY29kZTogXCJaQVwiIH0sXG4gICAgXTtcblxuICAgIGNvbnN0IHNvcnRlZExpc3RlZCA9IGNvdW50cnlDb2RlLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmNvdW50cnkgPCBiLmNvdW50cnkpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmNvdW50cnkgPiBiLmNvdW50cnkpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgY29uc3QgZHJvcERvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIGNvbnN0IGRyb3BEb3duTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKTtcbiAgICBkcm9wRG93bk5hbWUubGFiZWwgPSBcIlNlbGVjdCBDb3VudHJ5XCI7XG4gICAgZHJvcERvd24uYXBwZW5kQ2hpbGQoZHJvcERvd25OYW1lKTtcblxuICAgIHNvcnRlZExpc3RlZC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBkcm9wZG93bkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgZHJvcGRvd25JdGVtLnZhbHVlID0gaXRlbS5jb2RlO1xuICAgICAgZHJvcGRvd25JdGVtLnRleHRDb250ZW50ID0gaXRlbS5jb3VudHJ5O1xuXG4gICAgICBkcm9wRG93bi5hcHBlbmRDaGlsZChkcm9wZG93bkl0ZW0pO1xuICAgIH0pO1xuXG4gICAgZHJvcERvd25EaXYuYXBwZW5kQ2hpbGQoZHJvcERvd24pO1xuICAgIHJldHVybiBkcm9wRG93bkRpdjtcbiAgfVxuXG4gIHJldHVybiB7IHJlbmRlciB9O1xufTtcbiIsImltcG9ydCBQYXBhIGZyb20gXCJwYXBhcGFyc2VcIjtcblxuZXhwb3J0IGNvbnN0IHRhYmxlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIGRlbGltaXRlcjogXCJcIiwgLy8gYXV0by1kZXRlY3RcbiAgICAgIG5ld2xpbmU6IFwiXCIsIC8vIGF1dG8tZGV0ZWN0XG4gICAgICBxdW90ZUNoYXI6ICdcIicsXG4gICAgICBlc2NhcGVDaGFyOiAnXCInLFxuICAgICAgaGVhZGVyOiBmYWxzZSxcbiAgICAgIHRyYW5zZm9ybUhlYWRlcjogdW5kZWZpbmVkLFxuICAgICAgZHluYW1pY1R5cGluZzogZmFsc2UsXG4gICAgICBwcmV2aWV3OiAwLFxuICAgICAgZW5jb2Rpbmc6IFwiXCIsXG4gICAgICB3b3JrZXI6IGZhbHNlLFxuICAgICAgY29tbWVudHM6IGZhbHNlLFxuICAgICAgc3RlcDogdW5kZWZpbmVkLFxuICAgICAgY29tcGxldGU6IHVuZGVmaW5lZCxcbiAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICBkb3dubG9hZDogZmFsc2UsXG4gICAgICBkb3dubG9hZFJlcXVlc3RIZWFkZXJzOiB1bmRlZmluZWQsXG4gICAgICBkb3dubG9hZFJlcXVlc3RCb2R5OiB1bmRlZmluZWQsXG4gICAgICBza2lwRW1wdHlMaW5lczogZmFsc2UsXG4gICAgICBjaHVuazogdW5kZWZpbmVkLFxuICAgICAgY2h1bmtTaXplOiB1bmRlZmluZWQsXG4gICAgICBmYXN0TW9kZTogdW5kZWZpbmVkLFxuICAgICAgYmVmb3JlRmlyc3RDaHVuazogdW5kZWZpbmVkLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB1bmRlZmluZWQsXG4gICAgICB0cmFuc2Zvcm06IHVuZGVmaW5lZCxcbiAgICAgIGRlbGltaXRlcnNUb0d1ZXNzOiBbXCIsXCIsIFwiXFx0XCIsIFwifFwiLCBcIjtcIiwgUGFwYS5SRUNPUkRfU0VQLCBQYXBhLlVOSVRfU0VQXSxcbiAgICAgIHNraXBGaXJzdE5MaW5lczogMCxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHBhcnNlQ1NWKGl0ZW0pIHtcbiAgICAgIHJldHVybiBQYXBhLnBhcnNlKGl0ZW0sIGNvbmZpZylcbiAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhYmxlKHRhYmxlSXRlbSkge1xuICAgICAgICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICAgICAgICBsZXQgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgICAgICAgbGV0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG5cbiAgICAgICAgbGV0IHRhYmxlSGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgdGFibGVJdGVtWzBdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBsZXQgdGhlYWRlclJvd0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgICAgICAgICBsZXQgdGhlYWRlclJvd1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtpdGVtfWApXG5cbiAgICAgICAgICAgIHRoZWFkZXJSb3dJdGVtLmFwcGVuZENoaWxkKHRoZWFkZXJSb3dUZXh0KTtcbiAgICAgICAgICAgIHRhYmxlSGVhZGVyUm93LmFwcGVuZENoaWxkKHRoZWFkZXJSb3dJdGVtKTtcbiAgICAgICAgfSlcblxuICAgICAgICB0YWJsZUhlYWQuYXBwZW5kQ2hpbGQodGFibGVIZWFkZXJSb3cpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGFibGVJdGVtLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGxldCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGFibGVJdGVtW2ldLmxlbmd0aDsgeCsrKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFibGVEYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgICB0YWJsZURhdGEudGV4dENvbnRlbnQgPSB0YWJsZUl0ZW1baV1beF07XG5cbiAgICAgICAgICAgICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZCh0YWJsZURhdGEpXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KVxuICAgICAgICB9XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlSGVhZClcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGFibGVCb2R5KVxuXG4gICAgICAgIHJldHVybiB0YWJsZTtcbiAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2VDU1YsXG4gICAgICAgIGNyZWF0ZVRhYmxlXG4gICAgfVxufTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBcbip7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG5cblxufVxuXG4uY29udGVudHtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBbc3RhcnRdMWZyIFtzdGFydC1lbmRdMGZyIFtlbmRdO1xuICAgIGdyaWQtYXV0by1yb3dzOiBhdXRvO1xuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG59XG5cbi5jb250ZW50LXRhYmxle1xuICAgIGdyaWQtY29sdW1uOiBzdGFydC1lbmQvZW5kO1xufVxuXG4uY29udGVudC1mb3Jte1xuICAgIGdyaWQtY29sdW1uOiBzdGFydC9zdGFydC1lbmQ7XG59XG50YWJsZXtcbiAgICBcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZmYwMDAwO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIHdpZHRoOiA2MCU7XG59XG5cbnRoe1xuICAgIGZvbnQtc2l6ZTogMS40NXJlbTtcbiAgICBwYWRkaW5nOiA1cHg7XG59XG50aDo6Zmlyc3QtbGV0dGVye1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG5cbnRke1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIHdpZHRoOiAxNSU7XG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICNjY2NjO1xufVxuXG5cblxuZm9ybSB7XG4gICBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5mb3JtLWRpdiwgLmRhdGUtZGl2e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiA1cHg7XG4gICAgd2lkdGg6IDgwJTtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1zZWxmOmZsZXgtc3RhcnQgO1xufVxuXG5cbi5mb3JtLWRpdiBpbnB1dCwgLmZvcm0tZGl2IHNlbGVjdCwgLmRhdGUtZGl2IGlucHV0e1xuICAgIGZvbnQtc2l6ZTogMS43NWVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDhweDtcbn1cblxuXG4uZm9ybS1kaXYgc2VsZWN0e1xuICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xufVxuXG4uc3VibWl0LWJ1dHRvbntcbiAgICBwYWRkaW5nOiAxMHB4IDIycHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBmb250LXNpemU6IDEuNWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGNvcm5mbG93ZXJibHVlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXI6IDA7XG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgIFxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQ0E7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIsZ0JBQWdCOzs7QUFHcEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHNEQUFzRDtJQUN0RCxvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLG1CQUFtQjs7QUFFdkI7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7QUFDQTs7SUFFSSx5QkFBeUI7SUFDekIsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksMEJBQTBCO0FBQzlCOzs7QUFHQTtJQUNJLGlCQUFpQjtJQUNqQixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsdUJBQXVCO0FBQzNCOzs7O0FBSUE7O0lBRUksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFFBQVE7SUFDUixVQUFVO0lBQ1YsY0FBYztJQUNkLHVCQUF1QjtJQUN2QixzQkFBc0I7QUFDMUI7OztBQUdBO0lBQ0ksaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7O0FBR0E7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsZ0NBQWdDO0lBQ2hDLFlBQVk7SUFDWixTQUFTO0lBQ1Qsa0JBQWtCOztBQUV0QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJcXG4qe1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuXFxuXFxufVxcblxcbi5jb250ZW50e1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IFtzdGFydF0xZnIgW3N0YXJ0LWVuZF0wZnIgW2VuZF07XFxuICAgIGdyaWQtYXV0by1yb3dzOiBhdXRvO1xcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxufVxcblxcbi5jb250ZW50LXRhYmxle1xcbiAgICBncmlkLWNvbHVtbjogc3RhcnQtZW5kL2VuZDtcXG59XFxuXFxuLmNvbnRlbnQtZm9ybXtcXG4gICAgZ3JpZC1jb2x1bW46IHN0YXJ0L3N0YXJ0LWVuZDtcXG59XFxudGFibGV7XFxuICAgIFxcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZmYwMDAwO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICAgIHdpZHRoOiA2MCU7XFxufVxcblxcbnRoe1xcbiAgICBmb250LXNpemU6IDEuNDVyZW07XFxuICAgIHBhZGRpbmc6IDVweDtcXG59XFxudGg6OmZpcnN0LWxldHRlcntcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcblxcblxcbnRke1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgd2lkdGg6IDE1JTtcXG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNjY2NjO1xcbn1cXG5cXG5cXG5cXG5mb3JtIHtcXG4gICBcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZm9ybS1kaXYsIC5kYXRlLWRpdntcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiA1cHg7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24tc2VsZjpmbGV4LXN0YXJ0IDtcXG59XFxuXFxuXFxuLmZvcm0tZGl2IGlucHV0LCAuZm9ybS1kaXYgc2VsZWN0LCAuZGF0ZS1kaXYgaW5wdXR7XFxuICAgIGZvbnQtc2l6ZTogMS43NWVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDhweDtcXG59XFxuXFxuXFxuLmZvcm0tZGl2IHNlbGVjdHtcXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmO1xcbn1cXG5cXG4uc3VibWl0LWJ1dHRvbntcXG4gICAgcGFkZGluZzogMTBweCAyMnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBmb250LXNpemU6IDEuNWVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb3JuZmxvd2VyYmx1ZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHdpZHRoOiBmaXQtY29udGVudDtcXG4gICAgXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLyogQGxpY2Vuc2VcblBhcGEgUGFyc2VcbnY1LjQuMVxuaHR0cHM6Ly9naXRodWIuY29tL21ob2x0L1BhcGFQYXJzZVxuTGljZW5zZTogTUlUXG4qL1xuIWZ1bmN0aW9uKGUsdCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10KCk6ZS5QYXBhPXQoKX0odGhpcyxmdW5jdGlvbiBzKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGY9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp2b2lkIDAhPT1mP2Y6e307dmFyIG49IWYuZG9jdW1lbnQmJiEhZi5wb3N0TWVzc2FnZSxvPWYuSVNfUEFQQV9XT1JLRVJ8fCExLGE9e30sdT0wLGI9e3BhcnNlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9KHQ9dHx8e30pLmR5bmFtaWNUeXBpbmd8fCExO0oocikmJih0LmR5bmFtaWNUeXBpbmdGdW5jdGlvbj1yLHI9e30pO2lmKHQuZHluYW1pY1R5cGluZz1yLHQudHJhbnNmb3JtPSEhSih0LnRyYW5zZm9ybSkmJnQudHJhbnNmb3JtLHQud29ya2VyJiZiLldPUktFUlNfU1VQUE9SVEVEKXt2YXIgaT1mdW5jdGlvbigpe2lmKCFiLldPUktFUlNfU1VQUE9SVEVEKXJldHVybiExO3ZhciBlPShyPWYuVVJMfHxmLndlYmtpdFVSTHx8bnVsbCxpPXMudG9TdHJpbmcoKSxiLkJMT0JfVVJMfHwoYi5CTE9CX1VSTD1yLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbXCJ2YXIgZ2xvYmFsID0gKGZ1bmN0aW9uKCkgeyBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBzZWxmOyB9IGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gd2luZG93OyB9IGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZ2xvYmFsOyB9IHJldHVybiB7fTsgfSkoKTsgZ2xvYmFsLklTX1BBUEFfV09SS0VSPXRydWU7IFwiLFwiKFwiLGksXCIpKCk7XCJdLHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9KSkpKSx0PW5ldyBmLldvcmtlcihlKTt2YXIgcixpO3JldHVybiB0Lm9ubWVzc2FnZT1fLHQuaWQ9dSsrLGFbdC5pZF09dH0oKTtyZXR1cm4gaS51c2VyU3RlcD10LnN0ZXAsaS51c2VyQ2h1bms9dC5jaHVuayxpLnVzZXJDb21wbGV0ZT10LmNvbXBsZXRlLGkudXNlckVycm9yPXQuZXJyb3IsdC5zdGVwPUoodC5zdGVwKSx0LmNodW5rPUoodC5jaHVuayksdC5jb21wbGV0ZT1KKHQuY29tcGxldGUpLHQuZXJyb3I9Sih0LmVycm9yKSxkZWxldGUgdC53b3JrZXIsdm9pZCBpLnBvc3RNZXNzYWdlKHtpbnB1dDplLGNvbmZpZzp0LHdvcmtlcklkOmkuaWR9KX12YXIgbj1udWxsO2IuTk9ERV9TVFJFQU1fSU5QVVQsXCJzdHJpbmdcIj09dHlwZW9mIGU/KGU9ZnVuY3Rpb24oZSl7aWYoNjUyNzk9PT1lLmNoYXJDb2RlQXQoMCkpcmV0dXJuIGUuc2xpY2UoMSk7cmV0dXJuIGV9KGUpLG49dC5kb3dubG9hZD9uZXcgbCh0KTpuZXcgcCh0KSk6ITA9PT1lLnJlYWRhYmxlJiZKKGUucmVhZCkmJkooZS5vbik/bj1uZXcgZyh0KTooZi5GaWxlJiZlIGluc3RhbmNlb2YgRmlsZXx8ZSBpbnN0YW5jZW9mIE9iamVjdCkmJihuPW5ldyBjKHQpKTtyZXR1cm4gbi5zdHJlYW0oZSl9LHVucGFyc2U6ZnVuY3Rpb24oZSx0KXt2YXIgbj0hMSxfPSEwLG09XCIsXCIseT1cIlxcclxcblwiLHM9J1wiJyxhPXMrcyxyPSExLGk9bnVsbCxvPSExOyFmdW5jdGlvbigpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiB0KXJldHVybjtcInN0cmluZ1wiIT10eXBlb2YgdC5kZWxpbWl0ZXJ8fGIuQkFEX0RFTElNSVRFUlMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybi0xIT09dC5kZWxpbWl0ZXIuaW5kZXhPZihlKX0pLmxlbmd0aHx8KG09dC5kZWxpbWl0ZXIpOyhcImJvb2xlYW5cIj09dHlwZW9mIHQucXVvdGVzfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnF1b3Rlc3x8QXJyYXkuaXNBcnJheSh0LnF1b3RlcykpJiYobj10LnF1b3Rlcyk7XCJib29sZWFuXCIhPXR5cGVvZiB0LnNraXBFbXB0eUxpbmVzJiZcInN0cmluZ1wiIT10eXBlb2YgdC5za2lwRW1wdHlMaW5lc3x8KHI9dC5za2lwRW1wdHlMaW5lcyk7XCJzdHJpbmdcIj09dHlwZW9mIHQubmV3bGluZSYmKHk9dC5uZXdsaW5lKTtcInN0cmluZ1wiPT10eXBlb2YgdC5xdW90ZUNoYXImJihzPXQucXVvdGVDaGFyKTtcImJvb2xlYW5cIj09dHlwZW9mIHQuaGVhZGVyJiYoXz10LmhlYWRlcik7aWYoQXJyYXkuaXNBcnJheSh0LmNvbHVtbnMpKXtpZigwPT09dC5jb2x1bW5zLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJPcHRpb24gY29sdW1ucyBpcyBlbXB0eVwiKTtpPXQuY29sdW1uc312b2lkIDAhPT10LmVzY2FwZUNoYXImJihhPXQuZXNjYXBlQ2hhcitzKTsoXCJib29sZWFuXCI9PXR5cGVvZiB0LmVzY2FwZUZvcm11bGFlfHx0LmVzY2FwZUZvcm11bGFlIGluc3RhbmNlb2YgUmVnRXhwKSYmKG89dC5lc2NhcGVGb3JtdWxhZSBpbnN0YW5jZW9mIFJlZ0V4cD90LmVzY2FwZUZvcm11bGFlOi9eWz0rXFwtQFxcdFxccl0uKiQvKX0oKTt2YXIgdT1uZXcgUmVnRXhwKFEocyksXCJnXCIpO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKTtpZihBcnJheS5pc0FycmF5KGUpKXtpZighZS5sZW5ndGh8fEFycmF5LmlzQXJyYXkoZVswXSkpcmV0dXJuIGgobnVsbCxlLHIpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdKXJldHVybiBoKGl8fE9iamVjdC5rZXlzKGVbMF0pLGUscil9ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYoZS5kYXRhPUpTT04ucGFyc2UoZS5kYXRhKSksQXJyYXkuaXNBcnJheShlLmRhdGEpJiYoZS5maWVsZHN8fChlLmZpZWxkcz1lLm1ldGEmJmUubWV0YS5maWVsZHN8fGkpLGUuZmllbGRzfHwoZS5maWVsZHM9QXJyYXkuaXNBcnJheShlLmRhdGFbMF0pP2UuZmllbGRzOlwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF0/T2JqZWN0LmtleXMoZS5kYXRhWzBdKTpbXSksQXJyYXkuaXNBcnJheShlLmRhdGFbMF0pfHxcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdfHwoZS5kYXRhPVtlLmRhdGFdKSksaChlLmZpZWxkc3x8W10sZS5kYXRhfHxbXSxyKTt0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gc2VyaWFsaXplIHVucmVjb2duaXplZCBpbnB1dFwiKTtmdW5jdGlvbiBoKGUsdCxyKXt2YXIgaT1cIlwiO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9SlNPTi5wYXJzZSh0KSk7dmFyIG49QXJyYXkuaXNBcnJheShlKSYmMDxlLmxlbmd0aCxzPSFBcnJheS5pc0FycmF5KHRbMF0pO2lmKG4mJl8pe2Zvcih2YXIgYT0wO2E8ZS5sZW5ndGg7YSsrKTA8YSYmKGkrPW0pLGkrPXYoZVthXSxhKTswPHQubGVuZ3RoJiYoaSs9eSl9Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe3ZhciB1PW4/ZS5sZW5ndGg6dFtvXS5sZW5ndGgsaD0hMSxmPW4/MD09PU9iamVjdC5rZXlzKHRbb10pLmxlbmd0aDowPT09dFtvXS5sZW5ndGg7aWYociYmIW4mJihoPVwiZ3JlZWR5XCI9PT1yP1wiXCI9PT10W29dLmpvaW4oXCJcIikudHJpbSgpOjE9PT10W29dLmxlbmd0aCYmMD09PXRbb11bMF0ubGVuZ3RoKSxcImdyZWVkeVwiPT09ciYmbil7Zm9yKHZhciBkPVtdLGw9MDtsPHU7bCsrKXt2YXIgYz1zP2VbbF06bDtkLnB1c2godFtvXVtjXSl9aD1cIlwiPT09ZC5qb2luKFwiXCIpLnRyaW0oKX1pZighaCl7Zm9yKHZhciBwPTA7cDx1O3ArKyl7MDxwJiYhZiYmKGkrPW0pO3ZhciBnPW4mJnM/ZVtwXTpwO2krPXYodFtvXVtnXSxwKX1vPHQubGVuZ3RoLTEmJighcnx8MDx1JiYhZikmJihpKz15KX19cmV0dXJuIGl9ZnVuY3Rpb24gdihlLHQpe2lmKG51bGw9PWUpcmV0dXJuXCJcIjtpZihlLmNvbnN0cnVjdG9yPT09RGF0ZSlyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSkuc2xpY2UoMSwyNSk7dmFyIHI9ITE7byYmXCJzdHJpbmdcIj09dHlwZW9mIGUmJm8udGVzdChlKSYmKGU9XCInXCIrZSxyPSEwKTt2YXIgaT1lLnRvU3RyaW5nKCkucmVwbGFjZSh1LGEpO3JldHVybihyPXJ8fCEwPT09bnx8XCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbihlLHQpfHxBcnJheS5pc0FycmF5KG4pJiZuW3RdfHxmdW5jdGlvbihlLHQpe2Zvcih2YXIgcj0wO3I8dC5sZW5ndGg7cisrKWlmKC0xPGUuaW5kZXhPZih0W3JdKSlyZXR1cm4hMDtyZXR1cm4hMX0oaSxiLkJBRF9ERUxJTUlURVJTKXx8LTE8aS5pbmRleE9mKG0pfHxcIiBcIj09PWkuY2hhckF0KDApfHxcIiBcIj09PWkuY2hhckF0KGkubGVuZ3RoLTEpKT9zK2krczppfX19O2lmKGIuUkVDT1JEX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMwKSxiLlVOSVRfU0VQPVN0cmluZy5mcm9tQ2hhckNvZGUoMzEpLGIuQllURV9PUkRFUl9NQVJLPVwiXFx1ZmVmZlwiLGIuQkFEX0RFTElNSVRFUlM9W1wiXFxyXCIsXCJcXG5cIiwnXCInLGIuQllURV9PUkRFUl9NQVJLXSxiLldPUktFUlNfU1VQUE9SVEVEPSFuJiYhIWYuV29ya2VyLGIuTk9ERV9TVFJFQU1fSU5QVVQ9MSxiLkxvY2FsQ2h1bmtTaXplPTEwNDg1NzYwLGIuUmVtb3RlQ2h1bmtTaXplPTUyNDI4ODAsYi5EZWZhdWx0RGVsaW1pdGVyPVwiLFwiLGIuUGFyc2VyPUUsYi5QYXJzZXJIYW5kbGU9cixiLk5ldHdvcmtTdHJlYW1lcj1sLGIuRmlsZVN0cmVhbWVyPWMsYi5TdHJpbmdTdHJlYW1lcj1wLGIuUmVhZGFibGVTdHJlYW1TdHJlYW1lcj1nLGYualF1ZXJ5KXt2YXIgZD1mLmpRdWVyeTtkLmZuLnBhcnNlPWZ1bmN0aW9uKG8pe3ZhciByPW8uY29uZmlnfHx7fSx1PVtdO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oZSl7aWYoIShcIklOUFVUXCI9PT1kKHRoaXMpLnByb3AoXCJ0YWdOYW1lXCIpLnRvVXBwZXJDYXNlKCkmJlwiZmlsZVwiPT09ZCh0aGlzKS5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpJiZmLkZpbGVSZWFkZXIpfHwhdGhpcy5maWxlc3x8MD09PXRoaXMuZmlsZXMubGVuZ3RoKXJldHVybiEwO2Zvcih2YXIgdD0wO3Q8dGhpcy5maWxlcy5sZW5ndGg7dCsrKXUucHVzaCh7ZmlsZTp0aGlzLmZpbGVzW3RdLGlucHV0RWxlbTp0aGlzLGluc3RhbmNlQ29uZmlnOmQuZXh0ZW5kKHt9LHIpfSl9KSxlKCksdGhpcztmdW5jdGlvbiBlKCl7aWYoMCE9PXUubGVuZ3RoKXt2YXIgZSx0LHIsaSxuPXVbMF07aWYoSihvLmJlZm9yZSkpe3ZhciBzPW8uYmVmb3JlKG4uZmlsZSxuLmlucHV0RWxlbSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIHMpe2lmKFwiYWJvcnRcIj09PXMuYWN0aW9uKXJldHVybiBlPVwiQWJvcnRFcnJvclwiLHQ9bi5maWxlLHI9bi5pbnB1dEVsZW0saT1zLnJlYXNvbix2b2lkKEooby5lcnJvcikmJm8uZXJyb3Ioe25hbWU6ZX0sdCxyLGkpKTtpZihcInNraXBcIj09PXMuYWN0aW9uKXJldHVybiB2b2lkIGgoKTtcIm9iamVjdFwiPT10eXBlb2Ygcy5jb25maWcmJihuLmluc3RhbmNlQ29uZmlnPWQuZXh0ZW5kKG4uaW5zdGFuY2VDb25maWcscy5jb25maWcpKX1lbHNlIGlmKFwic2tpcFwiPT09cylyZXR1cm4gdm9pZCBoKCl9dmFyIGE9bi5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZTtuLmluc3RhbmNlQ29uZmlnLmNvbXBsZXRlPWZ1bmN0aW9uKGUpe0ooYSkmJmEoZSxuLmZpbGUsbi5pbnB1dEVsZW0pLGgoKX0sYi5wYXJzZShuLmZpbGUsbi5pbnN0YW5jZUNvbmZpZyl9ZWxzZSBKKG8uY29tcGxldGUpJiZvLmNvbXBsZXRlKCl9ZnVuY3Rpb24gaCgpe3Uuc3BsaWNlKDAsMSksZSgpfX19ZnVuY3Rpb24gaChlKXt0aGlzLl9oYW5kbGU9bnVsbCx0aGlzLl9maW5pc2hlZD0hMSx0aGlzLl9jb21wbGV0ZWQ9ITEsdGhpcy5faGFsdGVkPSExLHRoaXMuX2lucHV0PW51bGwsdGhpcy5fYmFzZUluZGV4PTAsdGhpcy5fcGFydGlhbExpbmU9XCJcIix0aGlzLl9yb3dDb3VudD0wLHRoaXMuX3N0YXJ0PTAsdGhpcy5fbmV4dENodW5rPW51bGwsdGhpcy5pc0ZpcnN0Q2h1bms9ITAsdGhpcy5fY29tcGxldGVSZXN1bHRzPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fSxmdW5jdGlvbihlKXt2YXIgdD13KGUpO3QuY2h1bmtTaXplPXBhcnNlSW50KHQuY2h1bmtTaXplKSxlLnN0ZXB8fGUuY2h1bmt8fCh0LmNodW5rU2l6ZT1udWxsKTt0aGlzLl9oYW5kbGU9bmV3IHIodCksKHRoaXMuX2hhbmRsZS5zdHJlYW1lcj10aGlzKS5fY29uZmlnPXR9LmNhbGwodGhpcyxlKSx0aGlzLnBhcnNlQ2h1bms9ZnVuY3Rpb24oZSx0KXtpZih0aGlzLmlzRmlyc3RDaHVuayYmSih0aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuaykpe3ZhciByPXRoaXMuX2NvbmZpZy5iZWZvcmVGaXJzdENodW5rKGUpO3ZvaWQgMCE9PXImJihlPXIpfXRoaXMuaXNGaXJzdENodW5rPSExLHRoaXMuX2hhbHRlZD0hMTt2YXIgaT10aGlzLl9wYXJ0aWFsTGluZStlO3RoaXMuX3BhcnRpYWxMaW5lPVwiXCI7dmFyIG49dGhpcy5faGFuZGxlLnBhcnNlKGksdGhpcy5fYmFzZUluZGV4LCF0aGlzLl9maW5pc2hlZCk7aWYoIXRoaXMuX2hhbmRsZS5wYXVzZWQoKSYmIXRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpe3ZhciBzPW4ubWV0YS5jdXJzb3I7dGhpcy5fZmluaXNoZWR8fCh0aGlzLl9wYXJ0aWFsTGluZT1pLnN1YnN0cmluZyhzLXRoaXMuX2Jhc2VJbmRleCksdGhpcy5fYmFzZUluZGV4PXMpLG4mJm4uZGF0YSYmKHRoaXMuX3Jvd0NvdW50Kz1uLmRhdGEubGVuZ3RoKTt2YXIgYT10aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJnRoaXMuX3Jvd0NvdW50Pj10aGlzLl9jb25maWcucHJldmlldztpZihvKWYucG9zdE1lc3NhZ2Uoe3Jlc3VsdHM6bix3b3JrZXJJZDpiLldPUktFUl9JRCxmaW5pc2hlZDphfSk7ZWxzZSBpZihKKHRoaXMuX2NvbmZpZy5jaHVuaykmJiF0KXtpZih0aGlzLl9jb25maWcuY2h1bmsobix0aGlzLl9oYW5kbGUpLHRoaXMuX2hhbmRsZS5wYXVzZWQoKXx8dGhpcy5faGFuZGxlLmFib3J0ZWQoKSlyZXR1cm4gdm9pZCh0aGlzLl9oYWx0ZWQ9ITApO249dm9pZCAwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz12b2lkIDB9cmV0dXJuIHRoaXMuX2NvbmZpZy5zdGVwfHx0aGlzLl9jb25maWcuY2h1bmt8fCh0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YT10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YS5jb25jYXQobi5kYXRhKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzPXRoaXMuX2NvbXBsZXRlUmVzdWx0cy5lcnJvcnMuY29uY2F0KG4uZXJyb3JzKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMubWV0YT1uLm1ldGEpLHRoaXMuX2NvbXBsZXRlZHx8IWF8fCFKKHRoaXMuX2NvbmZpZy5jb21wbGV0ZSl8fG4mJm4ubWV0YS5hYm9ydGVkfHwodGhpcy5fY29uZmlnLmNvbXBsZXRlKHRoaXMuX2NvbXBsZXRlUmVzdWx0cyx0aGlzLl9pbnB1dCksdGhpcy5fY29tcGxldGVkPSEwKSxhfHxuJiZuLm1ldGEucGF1c2VkfHx0aGlzLl9uZXh0Q2h1bmsoKSxufXRoaXMuX2hhbHRlZD0hMH0sdGhpcy5fc2VuZEVycm9yPWZ1bmN0aW9uKGUpe0oodGhpcy5fY29uZmlnLmVycm9yKT90aGlzLl9jb25maWcuZXJyb3IoZSk6byYmdGhpcy5fY29uZmlnLmVycm9yJiZmLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpiLldPUktFUl9JRCxlcnJvcjplLGZpbmlzaGVkOiExfSl9fWZ1bmN0aW9uIGwoZSl7dmFyIGk7KGU9ZXx8e30pLmNodW5rU2l6ZXx8KGUuY2h1bmtTaXplPWIuUmVtb3RlQ2h1bmtTaXplKSxoLmNhbGwodGhpcyxlKSx0aGlzLl9uZXh0Q2h1bms9bj9mdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpLHRoaXMuX2NodW5rTG9hZGVkKCl9OmZ1bmN0aW9uKCl7dGhpcy5fcmVhZENodW5rKCl9LHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3RoaXMuX2lucHV0PWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX3JlYWRDaHVuaz1mdW5jdGlvbigpe2lmKHRoaXMuX2ZpbmlzaGVkKXRoaXMuX2NodW5rTG9hZGVkKCk7ZWxzZXtpZihpPW5ldyBYTUxIdHRwUmVxdWVzdCx0aGlzLl9jb25maWcud2l0aENyZWRlbnRpYWxzJiYoaS53aXRoQ3JlZGVudGlhbHM9dGhpcy5fY29uZmlnLndpdGhDcmVkZW50aWFscyksbnx8KGkub25sb2FkPXYodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksaS5vbmVycm9yPXYodGhpcy5fY2h1bmtFcnJvcix0aGlzKSksaS5vcGVuKHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RCb2R5P1wiUE9TVFwiOlwiR0VUXCIsdGhpcy5faW5wdXQsIW4pLHRoaXMuX2NvbmZpZy5kb3dubG9hZFJlcXVlc3RIZWFkZXJzKXt2YXIgZT10aGlzLl9jb25maWcuZG93bmxvYWRSZXF1ZXN0SGVhZGVycztmb3IodmFyIHQgaW4gZSlpLnNldFJlcXVlc3RIZWFkZXIodCxlW3RdKX1pZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgcj10aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLTE7aS5zZXRSZXF1ZXN0SGVhZGVyKFwiUmFuZ2VcIixcImJ5dGVzPVwiK3RoaXMuX3N0YXJ0K1wiLVwiK3IpfXRyeXtpLnNlbmQodGhpcy5fY29uZmlnLmRvd25sb2FkUmVxdWVzdEJvZHkpfWNhdGNoKGUpe3RoaXMuX2NodW5rRXJyb3IoZS5tZXNzYWdlKX1uJiYwPT09aS5zdGF0dXMmJnRoaXMuX2NodW5rRXJyb3IoKX19LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKCl7ND09PWkucmVhZHlTdGF0ZSYmKGkuc3RhdHVzPDIwMHx8NDAwPD1pLnN0YXR1cz90aGlzLl9jaHVua0Vycm9yKCk6KHRoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplP3RoaXMuX2NvbmZpZy5jaHVua1NpemU6aS5yZXNwb25zZVRleHQubGVuZ3RoLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtUmFuZ2VcIik7aWYobnVsbD09PXQpcmV0dXJuLTE7cmV0dXJuIHBhcnNlSW50KHQuc3Vic3RyaW5nKHQubGFzdEluZGV4T2YoXCIvXCIpKzEpKX0oaSksdGhpcy5wYXJzZUNodW5rKGkucmVzcG9uc2VUZXh0KSkpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PWkuc3RhdHVzVGV4dHx8ZTt0aGlzLl9zZW5kRXJyb3IobmV3IEVycm9yKHQpKX19ZnVuY3Rpb24gYyhlKXt2YXIgaSxuOyhlPWV8fHt9KS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1iLkxvY2FsQ2h1bmtTaXplKSxoLmNhbGwodGhpcyxlKTt2YXIgcz1cInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcjt0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLG49ZS5zbGljZXx8ZS53ZWJraXRTbGljZXx8ZS5tb3pTbGljZSxzPygoaT1uZXcgRmlsZVJlYWRlcikub25sb2FkPXYodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksaS5vbmVycm9yPXYodGhpcy5fY2h1bmtFcnJvcix0aGlzKSk6aT1uZXcgRmlsZVJlYWRlclN5bmMsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2ZpbmlzaGVkfHx0aGlzLl9jb25maWcucHJldmlldyYmISh0aGlzLl9yb3dDb3VudDx0aGlzLl9jb25maWcucHJldmlldyl8fHRoaXMuX3JlYWRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9pbnB1dDtpZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgdD1NYXRoLm1pbih0aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2lucHV0LnNpemUpO2U9bi5jYWxsKGUsdGhpcy5fc3RhcnQsdCl9dmFyIHI9aS5yZWFkQXNUZXh0KGUsdGhpcy5fY29uZmlnLmVuY29kaW5nKTtzfHx0aGlzLl9jaHVua0xvYWRlZCh7dGFyZ2V0OntyZXN1bHQ6cn19KX0sdGhpcy5fY2h1bmtMb2FkZWQ9ZnVuY3Rpb24oZSl7dGhpcy5fc3RhcnQrPXRoaXMuX2NvbmZpZy5jaHVua1NpemUsdGhpcy5fZmluaXNoZWQ9IXRoaXMuX2NvbmZpZy5jaHVua1NpemV8fHRoaXMuX3N0YXJ0Pj10aGlzLl9pbnB1dC5zaXplLHRoaXMucGFyc2VDaHVuayhlLnRhcmdldC5yZXN1bHQpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKCl7dGhpcy5fc2VuZEVycm9yKGkuZXJyb3IpfX1mdW5jdGlvbiBwKGUpe3ZhciByO2guY2FsbCh0aGlzLGU9ZXx8e30pLHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3JldHVybiByPWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe2lmKCF0aGlzLl9maW5pc2hlZCl7dmFyIGUsdD10aGlzLl9jb25maWcuY2h1bmtTaXplO3JldHVybiB0PyhlPXIuc3Vic3RyaW5nKDAsdCkscj1yLnN1YnN0cmluZyh0KSk6KGU9cixyPVwiXCIpLHRoaXMuX2ZpbmlzaGVkPSFyLHRoaXMucGFyc2VDaHVuayhlKX19fWZ1bmN0aW9uIGcoZSl7aC5jYWxsKHRoaXMsZT1lfHx7fSk7dmFyIHQ9W10scj0hMCxpPSExO3RoaXMucGF1c2U9ZnVuY3Rpb24oKXtoLnByb3RvdHlwZS5wYXVzZS5hcHBseSh0aGlzLGFyZ3VtZW50cyksdGhpcy5faW5wdXQucGF1c2UoKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXtoLnByb3RvdHlwZS5yZXN1bWUuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX2lucHV0LnJlc3VtZSgpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX2lucHV0Lm9uKFwiZGF0YVwiLHRoaXMuX3N0cmVhbURhdGEpLHRoaXMuX2lucHV0Lm9uKFwiZW5kXCIsdGhpcy5fc3RyZWFtRW5kKSx0aGlzLl9pbnB1dC5vbihcImVycm9yXCIsdGhpcy5fc3RyZWFtRXJyb3IpfSx0aGlzLl9jaGVja0lzRmluaXNoZWQ9ZnVuY3Rpb24oKXtpJiYxPT09dC5sZW5ndGgmJih0aGlzLl9maW5pc2hlZD0hMCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2NoZWNrSXNGaW5pc2hlZCgpLHQubGVuZ3RoP3RoaXMucGFyc2VDaHVuayh0LnNoaWZ0KCkpOnI9ITB9LHRoaXMuX3N0cmVhbURhdGE9dihmdW5jdGlvbihlKXt0cnl7dC5wdXNoKFwic3RyaW5nXCI9PXR5cGVvZiBlP2U6ZS50b1N0cmluZyh0aGlzLl9jb25maWcuZW5jb2RpbmcpKSxyJiYocj0hMSx0aGlzLl9jaGVja0lzRmluaXNoZWQoKSx0aGlzLnBhcnNlQ2h1bmsodC5zaGlmdCgpKSl9Y2F0Y2goZSl7dGhpcy5fc3RyZWFtRXJyb3IoZSl9fSx0aGlzKSx0aGlzLl9zdHJlYW1FcnJvcj12KGZ1bmN0aW9uKGUpe3RoaXMuX3N0cmVhbUNsZWFuVXAoKSx0aGlzLl9zZW5kRXJyb3IoZSl9LHRoaXMpLHRoaXMuX3N0cmVhbUVuZD12KGZ1bmN0aW9uKCl7dGhpcy5fc3RyZWFtQ2xlYW5VcCgpLGk9ITAsdGhpcy5fc3RyZWFtRGF0YShcIlwiKX0sdGhpcyksdGhpcy5fc3RyZWFtQ2xlYW5VcD12KGZ1bmN0aW9uKCl7dGhpcy5faW5wdXQucmVtb3ZlTGlzdGVuZXIoXCJkYXRhXCIsdGhpcy5fc3RyZWFtRGF0YSksdGhpcy5faW5wdXQucmVtb3ZlTGlzdGVuZXIoXCJlbmRcIix0aGlzLl9zdHJlYW1FbmQpLHRoaXMuX2lucHV0LnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIix0aGlzLl9zdHJlYW1FcnJvcil9LHRoaXMpfWZ1bmN0aW9uIHIobSl7dmFyIGEsbyx1LGk9TWF0aC5wb3coMiw1Myksbj0taSxzPS9eXFxzKi0/KFxcZCtcXC4/fFxcLlxcZCt8XFxkK1xcLlxcZCspKFtlRV1bLStdP1xcZCspP1xccyokLyxoPS9eKChcXGR7NH0tWzAxXVxcZC1bMC0zXVxcZFRbMC0yXVxcZDpbMC01XVxcZDpbMC01XVxcZFxcLlxcZCsoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKXwoXFxkezR9LVswMV1cXGQtWzAtM11cXGRUWzAtMl1cXGQ6WzAtNV1cXGQoWystXVswLTJdXFxkOlswLTVdXFxkfFopKSkkLyx0PXRoaXMscj0wLGY9MCxkPSExLGU9ITEsbD1bXSxjPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fTtpZihKKG0uc3RlcCkpe3ZhciBwPW0uc3RlcDttLnN0ZXA9ZnVuY3Rpb24oZSl7aWYoYz1lLF8oKSlnKCk7ZWxzZXtpZihnKCksMD09PWMuZGF0YS5sZW5ndGgpcmV0dXJuO3IrPWUuZGF0YS5sZW5ndGgsbS5wcmV2aWV3JiZyPm0ucHJldmlldz9vLmFib3J0KCk6KGMuZGF0YT1jLmRhdGFbMF0scChjLHQpKX19fWZ1bmN0aW9uIHkoZSl7cmV0dXJuXCJncmVlZHlcIj09PW0uc2tpcEVtcHR5TGluZXM/XCJcIj09PWUuam9pbihcIlwiKS50cmltKCk6MT09PWUubGVuZ3RoJiYwPT09ZVswXS5sZW5ndGh9ZnVuY3Rpb24gZygpe3JldHVybiBjJiZ1JiYoayhcIkRlbGltaXRlclwiLFwiVW5kZXRlY3RhYmxlRGVsaW1pdGVyXCIsXCJVbmFibGUgdG8gYXV0by1kZXRlY3QgZGVsaW1pdGluZyBjaGFyYWN0ZXI7IGRlZmF1bHRlZCB0byAnXCIrYi5EZWZhdWx0RGVsaW1pdGVyK1wiJ1wiKSx1PSExKSxtLnNraXBFbXB0eUxpbmVzJiYoYy5kYXRhPWMuZGF0YS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIXkoZSl9KSksXygpJiZmdW5jdGlvbigpe2lmKCFjKXJldHVybjtmdW5jdGlvbiBlKGUsdCl7SihtLnRyYW5zZm9ybUhlYWRlcikmJihlPW0udHJhbnNmb3JtSGVhZGVyKGUsdCkpLGwucHVzaChlKX1pZihBcnJheS5pc0FycmF5KGMuZGF0YVswXSkpe2Zvcih2YXIgdD0wO18oKSYmdDxjLmRhdGEubGVuZ3RoO3QrKyljLmRhdGFbdF0uZm9yRWFjaChlKTtjLmRhdGEuc3BsaWNlKDAsMSl9ZWxzZSBjLmRhdGEuZm9yRWFjaChlKX0oKSxmdW5jdGlvbigpe2lmKCFjfHwhbS5oZWFkZXImJiFtLmR5bmFtaWNUeXBpbmcmJiFtLnRyYW5zZm9ybSlyZXR1cm4gYztmdW5jdGlvbiBlKGUsdCl7dmFyIHIsaT1tLmhlYWRlcj97fTpbXTtmb3Iocj0wO3I8ZS5sZW5ndGg7cisrKXt2YXIgbj1yLHM9ZVtyXTttLmhlYWRlciYmKG49cj49bC5sZW5ndGg/XCJfX3BhcnNlZF9leHRyYVwiOmxbcl0pLG0udHJhbnNmb3JtJiYocz1tLnRyYW5zZm9ybShzLG4pKSxzPXYobixzKSxcIl9fcGFyc2VkX2V4dHJhXCI9PT1uPyhpW25dPWlbbl18fFtdLGlbbl0ucHVzaChzKSk6aVtuXT1zfXJldHVybiBtLmhlYWRlciYmKHI+bC5sZW5ndGg/ayhcIkZpZWxkTWlzbWF0Y2hcIixcIlRvb01hbnlGaWVsZHNcIixcIlRvbyBtYW55IGZpZWxkczogZXhwZWN0ZWQgXCIrbC5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrcixmK3QpOnI8bC5sZW5ndGgmJmsoXCJGaWVsZE1pc21hdGNoXCIsXCJUb29GZXdGaWVsZHNcIixcIlRvbyBmZXcgZmllbGRzOiBleHBlY3RlZCBcIitsLmxlbmd0aCtcIiBmaWVsZHMgYnV0IHBhcnNlZCBcIityLGYrdCkpLGl9dmFyIHQ9MTshYy5kYXRhLmxlbmd0aHx8QXJyYXkuaXNBcnJheShjLmRhdGFbMF0pPyhjLmRhdGE9Yy5kYXRhLm1hcChlKSx0PWMuZGF0YS5sZW5ndGgpOmMuZGF0YT1lKGMuZGF0YSwwKTttLmhlYWRlciYmYy5tZXRhJiYoYy5tZXRhLmZpZWxkcz1sKTtyZXR1cm4gZis9dCxjfSgpfWZ1bmN0aW9uIF8oKXtyZXR1cm4gbS5oZWFkZXImJjA9PT1sLmxlbmd0aH1mdW5jdGlvbiB2KGUsdCl7cmV0dXJuIHI9ZSxtLmR5bmFtaWNUeXBpbmdGdW5jdGlvbiYmdm9pZCAwPT09bS5keW5hbWljVHlwaW5nW3JdJiYobS5keW5hbWljVHlwaW5nW3JdPW0uZHluYW1pY1R5cGluZ0Z1bmN0aW9uKHIpKSwhMD09PShtLmR5bmFtaWNUeXBpbmdbcl18fG0uZHluYW1pY1R5cGluZyk/XCJ0cnVlXCI9PT10fHxcIlRSVUVcIj09PXR8fFwiZmFsc2VcIiE9PXQmJlwiRkFMU0VcIiE9PXQmJihmdW5jdGlvbihlKXtpZihzLnRlc3QoZSkpe3ZhciB0PXBhcnNlRmxvYXQoZSk7aWYobjx0JiZ0PGkpcmV0dXJuITB9cmV0dXJuITF9KHQpP3BhcnNlRmxvYXQodCk6aC50ZXN0KHQpP25ldyBEYXRlKHQpOlwiXCI9PT10P251bGw6dCk6dDt2YXIgcn1mdW5jdGlvbiBrKGUsdCxyLGkpe3ZhciBuPXt0eXBlOmUsY29kZTp0LG1lc3NhZ2U6cn07dm9pZCAwIT09aSYmKG4ucm93PWkpLGMuZXJyb3JzLnB1c2gobil9dGhpcy5wYXJzZT1mdW5jdGlvbihlLHQscil7dmFyIGk9bS5xdW90ZUNoYXJ8fCdcIic7aWYobS5uZXdsaW5lfHwobS5uZXdsaW5lPWZ1bmN0aW9uKGUsdCl7ZT1lLnN1YnN0cmluZygwLDEwNDg1NzYpO3ZhciByPW5ldyBSZWdFeHAoUSh0KStcIihbXl0qPylcIitRKHQpLFwiZ21cIiksaT0oZT1lLnJlcGxhY2UocixcIlwiKSkuc3BsaXQoXCJcXHJcIiksbj1lLnNwbGl0KFwiXFxuXCIpLHM9MTxuLmxlbmd0aCYmblswXS5sZW5ndGg8aVswXS5sZW5ndGg7aWYoMT09PWkubGVuZ3RofHxzKXJldHVyblwiXFxuXCI7Zm9yKHZhciBhPTAsbz0wO288aS5sZW5ndGg7bysrKVwiXFxuXCI9PT1pW29dWzBdJiZhKys7cmV0dXJuIGE+PWkubGVuZ3RoLzI/XCJcXHJcXG5cIjpcIlxcclwifShlLGkpKSx1PSExLG0uZGVsaW1pdGVyKUoobS5kZWxpbWl0ZXIpJiYobS5kZWxpbWl0ZXI9bS5kZWxpbWl0ZXIoZSksYy5tZXRhLmRlbGltaXRlcj1tLmRlbGltaXRlcik7ZWxzZXt2YXIgbj1mdW5jdGlvbihlLHQscixpLG4pe3ZhciBzLGEsbyx1O249bnx8W1wiLFwiLFwiXFx0XCIsXCJ8XCIsXCI7XCIsYi5SRUNPUkRfU0VQLGIuVU5JVF9TRVBdO2Zvcih2YXIgaD0wO2g8bi5sZW5ndGg7aCsrKXt2YXIgZj1uW2hdLGQ9MCxsPTAsYz0wO289dm9pZCAwO2Zvcih2YXIgcD1uZXcgRSh7Y29tbWVudHM6aSxkZWxpbWl0ZXI6ZixuZXdsaW5lOnQscHJldmlldzoxMH0pLnBhcnNlKGUpLGc9MDtnPHAuZGF0YS5sZW5ndGg7ZysrKWlmKHImJnkocC5kYXRhW2ddKSljKys7ZWxzZXt2YXIgXz1wLmRhdGFbZ10ubGVuZ3RoO2wrPV8sdm9pZCAwIT09bz8wPF8mJihkKz1NYXRoLmFicyhfLW8pLG89Xyk6bz1ffTA8cC5kYXRhLmxlbmd0aCYmKGwvPXAuZGF0YS5sZW5ndGgtYyksKHZvaWQgMD09PWF8fGQ8PWEpJiYodm9pZCAwPT09dXx8dTxsKSYmMS45OTxsJiYoYT1kLHM9Zix1PWwpfXJldHVybntzdWNjZXNzZnVsOiEhKG0uZGVsaW1pdGVyPXMpLGJlc3REZWxpbWl0ZXI6c319KGUsbS5uZXdsaW5lLG0uc2tpcEVtcHR5TGluZXMsbS5jb21tZW50cyxtLmRlbGltaXRlcnNUb0d1ZXNzKTtuLnN1Y2Nlc3NmdWw/bS5kZWxpbWl0ZXI9bi5iZXN0RGVsaW1pdGVyOih1PSEwLG0uZGVsaW1pdGVyPWIuRGVmYXVsdERlbGltaXRlciksYy5tZXRhLmRlbGltaXRlcj1tLmRlbGltaXRlcn12YXIgcz13KG0pO3JldHVybiBtLnByZXZpZXcmJm0uaGVhZGVyJiZzLnByZXZpZXcrKyxhPWUsbz1uZXcgRShzKSxjPW8ucGFyc2UoYSx0LHIpLGcoKSxkP3ttZXRhOntwYXVzZWQ6ITB9fTpjfHx7bWV0YTp7cGF1c2VkOiExfX19LHRoaXMucGF1c2VkPWZ1bmN0aW9uKCl7cmV0dXJuIGR9LHRoaXMucGF1c2U9ZnVuY3Rpb24oKXtkPSEwLG8uYWJvcnQoKSxhPUoobS5jaHVuayk/XCJcIjphLnN1YnN0cmluZyhvLmdldENoYXJJbmRleCgpKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXt0LnN0cmVhbWVyLl9oYWx0ZWQ/KGQ9ITEsdC5zdHJlYW1lci5wYXJzZUNodW5rKGEsITApKTpzZXRUaW1lb3V0KHQucmVzdW1lLDMpfSx0aGlzLmFib3J0ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gZX0sdGhpcy5hYm9ydD1mdW5jdGlvbigpe2U9ITAsby5hYm9ydCgpLGMubWV0YS5hYm9ydGVkPSEwLEoobS5jb21wbGV0ZSkmJm0uY29tcGxldGUoYyksYT1cIlwifX1mdW5jdGlvbiBRKGUpe3JldHVybiBlLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLFwiXFxcXCQmXCIpfWZ1bmN0aW9uIEUoail7dmFyIHosTT0oaj1qfHx7fSkuZGVsaW1pdGVyLFA9ai5uZXdsaW5lLFU9ai5jb21tZW50cyxxPWouc3RlcCxOPWoucHJldmlldyxCPWouZmFzdE1vZGUsSz16PXZvaWQgMD09PWoucXVvdGVDaGFyfHxudWxsPT09ai5xdW90ZUNoYXI/J1wiJzpqLnF1b3RlQ2hhcjtpZih2b2lkIDAhPT1qLmVzY2FwZUNoYXImJihLPWouZXNjYXBlQ2hhciksKFwic3RyaW5nXCIhPXR5cGVvZiBNfHwtMTxiLkJBRF9ERUxJTUlURVJTLmluZGV4T2YoTSkpJiYoTT1cIixcIiksVT09PU0pdGhyb3cgbmV3IEVycm9yKFwiQ29tbWVudCBjaGFyYWN0ZXIgc2FtZSBhcyBkZWxpbWl0ZXJcIik7ITA9PT1VP1U9XCIjXCI6KFwic3RyaW5nXCIhPXR5cGVvZiBVfHwtMTxiLkJBRF9ERUxJTUlURVJTLmluZGV4T2YoVSkpJiYoVT0hMSksXCJcXG5cIiE9PVAmJlwiXFxyXCIhPT1QJiZcIlxcclxcblwiIT09UCYmKFA9XCJcXG5cIik7dmFyIFc9MCxIPSExO3RoaXMucGFyc2U9ZnVuY3Rpb24oaSx0LHIpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBpKXRocm93IG5ldyBFcnJvcihcIklucHV0IG11c3QgYmUgYSBzdHJpbmdcIik7dmFyIG49aS5sZW5ndGgsZT1NLmxlbmd0aCxzPVAubGVuZ3RoLGE9VS5sZW5ndGgsbz1KKHEpLHU9W10saD1bXSxmPVtdLGQ9Vz0wO2lmKCFpKXJldHVybiBMKCk7aWYoai5oZWFkZXImJiF0KXt2YXIgbD1pLnNwbGl0KFApWzBdLnNwbGl0KE0pLGM9W10scD17fSxnPSExO2Zvcih2YXIgXyBpbiBsKXt2YXIgbT1sW19dO0ooai50cmFuc2Zvcm1IZWFkZXIpJiYobT1qLnRyYW5zZm9ybUhlYWRlcihtLF8pKTt2YXIgeT1tLHY9cFttXXx8MDtmb3IoMDx2JiYoZz0hMCx5PW0rXCJfXCIrdikscFttXT12KzE7Yy5pbmNsdWRlcyh5KTspeT15K1wiX1wiK3Y7Yy5wdXNoKHkpfWlmKGcpe3ZhciBrPWkuc3BsaXQoUCk7a1swXT1jLmpvaW4oTSksaT1rLmpvaW4oUCl9fWlmKEJ8fCExIT09QiYmLTE9PT1pLmluZGV4T2Yoeikpe2Zvcih2YXIgYj1pLnNwbGl0KFApLEU9MDtFPGIubGVuZ3RoO0UrKyl7aWYoZj1iW0VdLFcrPWYubGVuZ3RoLEUhPT1iLmxlbmd0aC0xKVcrPVAubGVuZ3RoO2Vsc2UgaWYocilyZXR1cm4gTCgpO2lmKCFVfHxmLnN1YnN0cmluZygwLGEpIT09VSl7aWYobyl7aWYodT1bXSxJKGYuc3BsaXQoTSkpLEYoKSxIKXJldHVybiBMKCl9ZWxzZSBJKGYuc3BsaXQoTSkpO2lmKE4mJk48PUUpcmV0dXJuIHU9dS5zbGljZSgwLE4pLEwoITApfX1yZXR1cm4gTCgpfWZvcih2YXIgdz1pLmluZGV4T2YoTSxXKSxSPWkuaW5kZXhPZihQLFcpLEM9bmV3IFJlZ0V4cChRKEspK1EoeiksXCJnXCIpLFM9aS5pbmRleE9mKHosVyk7OylpZihpW1ddIT09eilpZihVJiYwPT09Zi5sZW5ndGgmJmkuc3Vic3RyaW5nKFcsVythKT09PVUpe2lmKC0xPT09UilyZXR1cm4gTCgpO1c9UitzLFI9aS5pbmRleE9mKFAsVyksdz1pLmluZGV4T2YoTSxXKX1lbHNlIGlmKC0xIT09dyYmKHc8Unx8LTE9PT1SKSlmLnB1c2goaS5zdWJzdHJpbmcoVyx3KSksVz13K2Usdz1pLmluZGV4T2YoTSxXKTtlbHNle2lmKC0xPT09UilicmVhaztpZihmLnB1c2goaS5zdWJzdHJpbmcoVyxSKSksRChSK3MpLG8mJihGKCksSCkpcmV0dXJuIEwoKTtpZihOJiZ1Lmxlbmd0aD49TilyZXR1cm4gTCghMCl9ZWxzZSBmb3IoUz1XLFcrKzs7KXtpZigtMT09PShTPWkuaW5kZXhPZih6LFMrMSkpKXJldHVybiByfHxoLnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiTWlzc2luZ1F1b3Rlc1wiLG1lc3NhZ2U6XCJRdW90ZWQgZmllbGQgdW50ZXJtaW5hdGVkXCIscm93OnUubGVuZ3RoLGluZGV4Old9KSxUKCk7aWYoUz09PW4tMSlyZXR1cm4gVChpLnN1YnN0cmluZyhXLFMpLnJlcGxhY2UoQyx6KSk7aWYoeiE9PUt8fGlbUysxXSE9PUspe2lmKHo9PT1LfHwwPT09U3x8aVtTLTFdIT09Syl7LTEhPT13JiZ3PFMrMSYmKHc9aS5pbmRleE9mKE0sUysxKSksLTEhPT1SJiZSPFMrMSYmKFI9aS5pbmRleE9mKFAsUysxKSk7dmFyIE89QSgtMT09PVI/dzpNYXRoLm1pbih3LFIpKTtpZihpLnN1YnN0cihTKzErTyxlKT09PU0pe2YucHVzaChpLnN1YnN0cmluZyhXLFMpLnJlcGxhY2UoQyx6KSksaVtXPVMrMStPK2VdIT09eiYmKFM9aS5pbmRleE9mKHosVykpLHc9aS5pbmRleE9mKE0sVyksUj1pLmluZGV4T2YoUCxXKTticmVha312YXIgeD1BKFIpO2lmKGkuc3Vic3RyaW5nKFMrMSt4LFMrMSt4K3MpPT09UCl7aWYoZi5wdXNoKGkuc3Vic3RyaW5nKFcsUykucmVwbGFjZShDLHopKSxEKFMrMSt4K3MpLHc9aS5pbmRleE9mKE0sVyksUz1pLmluZGV4T2YoeixXKSxvJiYoRigpLEgpKXJldHVybiBMKCk7aWYoTiYmdS5sZW5ndGg+PU4pcmV0dXJuIEwoITApO2JyZWFrfWgucHVzaCh7dHlwZTpcIlF1b3Rlc1wiLGNvZGU6XCJJbnZhbGlkUXVvdGVzXCIsbWVzc2FnZTpcIlRyYWlsaW5nIHF1b3RlIG9uIHF1b3RlZCBmaWVsZCBpcyBtYWxmb3JtZWRcIixyb3c6dS5sZW5ndGgsaW5kZXg6V30pLFMrK319ZWxzZSBTKyt9cmV0dXJuIFQoKTtmdW5jdGlvbiBJKGUpe3UucHVzaChlKSxkPVd9ZnVuY3Rpb24gQShlKXt2YXIgdD0wO2lmKC0xIT09ZSl7dmFyIHI9aS5zdWJzdHJpbmcoUysxLGUpO3ImJlwiXCI9PT1yLnRyaW0oKSYmKHQ9ci5sZW5ndGgpfXJldHVybiB0fWZ1bmN0aW9uIFQoZSl7cmV0dXJuIHJ8fCh2b2lkIDA9PT1lJiYoZT1pLnN1YnN0cmluZyhXKSksZi5wdXNoKGUpLFc9bixJKGYpLG8mJkYoKSksTCgpfWZ1bmN0aW9uIEQoZSl7Vz1lLEkoZiksZj1bXSxSPWkuaW5kZXhPZihQLFcpfWZ1bmN0aW9uIEwoZSl7cmV0dXJue2RhdGE6dSxlcnJvcnM6aCxtZXRhOntkZWxpbWl0ZXI6TSxsaW5lYnJlYWs6UCxhYm9ydGVkOkgsdHJ1bmNhdGVkOiEhZSxjdXJzb3I6ZCsodHx8MCl9fX1mdW5jdGlvbiBGKCl7cShMKCkpLHU9W10saD1bXX19LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtIPSEwfSx0aGlzLmdldENoYXJJbmRleD1mdW5jdGlvbigpe3JldHVybiBXfX1mdW5jdGlvbiBfKGUpe3ZhciB0PWUuZGF0YSxyPWFbdC53b3JrZXJJZF0saT0hMTtpZih0LmVycm9yKXIudXNlckVycm9yKHQuZXJyb3IsdC5maWxlKTtlbHNlIGlmKHQucmVzdWx0cyYmdC5yZXN1bHRzLmRhdGEpe3ZhciBuPXthYm9ydDpmdW5jdGlvbigpe2k9ITAsbSh0LndvcmtlcklkLHtkYXRhOltdLGVycm9yczpbXSxtZXRhOnthYm9ydGVkOiEwfX0pfSxwYXVzZTp5LHJlc3VtZTp5fTtpZihKKHIudXNlclN0ZXApKXtmb3IodmFyIHM9MDtzPHQucmVzdWx0cy5kYXRhLmxlbmd0aCYmKHIudXNlclN0ZXAoe2RhdGE6dC5yZXN1bHRzLmRhdGFbc10sZXJyb3JzOnQucmVzdWx0cy5lcnJvcnMsbWV0YTp0LnJlc3VsdHMubWV0YX0sbiksIWkpO3MrKyk7ZGVsZXRlIHQucmVzdWx0c31lbHNlIEooci51c2VyQ2h1bmspJiYoci51c2VyQ2h1bmsodC5yZXN1bHRzLG4sdC5maWxlKSxkZWxldGUgdC5yZXN1bHRzKX10LmZpbmlzaGVkJiYhaSYmbSh0LndvcmtlcklkLHQucmVzdWx0cyl9ZnVuY3Rpb24gbShlLHQpe3ZhciByPWFbZV07SihyLnVzZXJDb21wbGV0ZSkmJnIudXNlckNvbXBsZXRlKHQpLHIudGVybWluYXRlKCksZGVsZXRlIGFbZV19ZnVuY3Rpb24geSgpe3Rocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZC5cIil9ZnVuY3Rpb24gdyhlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZXx8bnVsbD09PWUpcmV0dXJuIGU7dmFyIHQ9QXJyYXkuaXNBcnJheShlKT9bXTp7fTtmb3IodmFyIHIgaW4gZSl0W3JdPXcoZVtyXSk7cmV0dXJuIHR9ZnVuY3Rpb24gdihlLHQpe3JldHVybiBmdW5jdGlvbigpe2UuYXBwbHkodCxhcmd1bWVudHMpfX1mdW5jdGlvbiBKKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9cmV0dXJuIG8mJihmLm9ubWVzc2FnZT1mdW5jdGlvbihlKXt2YXIgdD1lLmRhdGE7dm9pZCAwPT09Yi5XT1JLRVJfSUQmJnQmJihiLldPUktFUl9JRD10LndvcmtlcklkKTtpZihcInN0cmluZ1wiPT10eXBlb2YgdC5pbnB1dClmLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpiLldPUktFUl9JRCxyZXN1bHRzOmIucGFyc2UodC5pbnB1dCx0LmNvbmZpZyksZmluaXNoZWQ6ITB9KTtlbHNlIGlmKGYuRmlsZSYmdC5pbnB1dCBpbnN0YW5jZW9mIEZpbGV8fHQuaW5wdXQgaW5zdGFuY2VvZiBPYmplY3Qpe3ZhciByPWIucGFyc2UodC5pbnB1dCx0LmNvbmZpZyk7ciYmZi5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Yi5XT1JLRVJfSUQscmVzdWx0czpyLGZpbmlzaGVkOiEwfSl9fSksKGwucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1sLChjLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGgucHJvdG90eXBlKSkuY29uc3RydWN0b3I9YywocC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShwLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yPXAsKGcucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaC5wcm90b3R5cGUpKS5jb25zdHJ1Y3Rvcj1nLGJ9KTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBjbGFzcyBXZWF0aGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2l0eSxcbiAgICBjb3VudHJ5LFxuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIC8vIGNvdW50cnksXG4gICAgLy8gbWF4VGVtcCxcbiAgICAvLyBtaW5UZW1wLFxuICAgIC8vIGF2Z1RlbXAsXG4gICAgLy8gZGVzY3JpcHRpb24sXG4gICkge1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcbiAgICB0aGlzLmNvdW50cnkgPSBjb3VudHJ5O1xuICAgIC8vIHRoaXMubWF4VGVtcCA9IG1heFRlbXA7XG4gICAgLy8gdGhpcy5taW5UZW1wID0gbWluVGVtcDtcbiAgICAvLyB0aGlzLmF2Z1RlbXAgPSBhdmdUZW1wO1xuICAgIC8vIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuICBnZXRDaXR5KCkge1xuICAgIHJldHVybiB0aGlzLmNpdHk7XG4gIH1cblxuICBnZXRTdGFydERhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnREYXRlO1xuICB9XG5cbiAgZ2V0RW5kRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmREYXRlO1xuICB9XG4gIGdldENvdW50cnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnRyeTtcbiAgfVxuXG4gIC8vIGdldE1heFRlbXAoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMubWF4VGVtcDtcbiAgLy8gfVxuXG4gIC8vIGdldE1pblRlbXAoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMubWluVGVtcDtcbiAgLy8gfVxuICAvLyBnZXRBdmdUZW1wKCkge1xuICAvLyAgIHJldHVybiB0aGlzLmF2Z1RlbXA7XG4gIC8vIH1cblxuICAvLyBnZXREZXNjcmlwdGlvbigpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgLy8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgV2VhdGhlciB9IGZyb20gXCIuLi9vYmovV2VhdGhlclwiO1xuaW1wb3J0IHsgV2VhdGhlckRldGFpbHMgfSBmcm9tIFwiLi4vZnVuY3Rpb24vZmV0Y2hXZWF0aGVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgdGFibGUgfSBmcm9tIFwiLi4vZnVuY3Rpb24vbWFrZVRhYmxlXCI7XG5pbXBvcnQgeyBib2R5Q29udGVudCB9IGZyb20gXCIuLi9mdW5jdGlvbi9sb2FkZXJcIjtcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuYm9keS5jbGFzc0xpc3QuYWRkKFwiY29udGVudFwiKTtcbmNvbnN0IGNvbnRlbnRCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuXG5jb25zdCBjb250ZW50Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5jb25zdCBjb250ZW50VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG5jb250ZW50VGFibGUuY2xhc3NMaXN0LmFkZChcImNvbnRlbnQtdGFibGVcIik7XG5jb250ZW50Rm9ybS5jbGFzc0xpc3QuYWRkKFwiY29udGVudC1mb3JtXCIpO1xuXG5cbmNvbnN0IGluZm8gPSBuZXcgV2VhdGhlcihcImh1bGxcIiwgXCJ1a1wiLCBcIjIwMjMtMTItMjRcIiwgXCIyMDIzLTEyLTI1XCIpO1xuY29uc3QgZWxlbWVudHMgPSBbXG4gIFwiYWRkcmVzc1wiLFxuICBcInRlbXBcIixcbiAgXCJ0ZW1wbWluXCIsXG4gIFwidGVtcG1heFwiLFxuICBcImNvbmRpdGlvbnNcIixcbiAgXCJkZXNjcmlwdGlvblwiLFxuXTtcbi8vY29uc3Qgd2VhdGhlckNvbnRlbnQgPSBXZWF0aGVyRGV0YWlscygpLmNhbGxXZWF0aGVyQVBJKGluZm8sIGVsZW1lbnRzKTtcblxuLy9jb25zb2xlLmxvZyh3ZWF0aGVyQ29udGVudFxuXG5jb25zdCB0YWJsZURhdGEgPSB0YWJsZSgpXG4gIC5wYXJzZUNTVihgYWRkcmVzcyx0ZW1wbWF4LHRlbXBtaW4sdGVtcCxjb25kaXRpb25zLGRlc2NyaXB0aW9uXG5odWxsIHVrLDE0LjEsMTEuNywxMyxcIlJhaW4sIE92ZXJjYXN0XCIsQ2xvdWR5IHNraWVzIHRocm91Z2hvdXQgdGhlIGRheSB3aXRoIGVhcmx5IG1vcm5pbmcgcmFpbi5cbmh1bGwgdWssMTEuNCw4LjYsOS44LFwiUmFpbiwgT3ZlcmNhc3RcIixDbG91ZHkgc2tpZXMgdGhyb3VnaG91dCB0aGUgZGF5IHdpdGggYSBjaGFuY2Ugb2YgcmFpbi5gKTtcblxuY29uc3QgdGFibGVCb2R5ID0gdGFibGUoKS5jcmVhdGVUYWJsZSh0YWJsZURhdGEuZGF0YSk7XG5jb250ZW50VGFibGUuYXBwZW5kQ2hpbGQodGFibGVCb2R5KTtcbmNvbnRlbnRGb3JtLmFwcGVuZENoaWxkKGJvZHlDb250ZW50KCkucmVuZGVyKCkpO1xuLy9ib2R5LmFwcGVuZENoaWxkKHRhYmxlQm9keSk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnRGb3JtKTtcblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnV0dG9uXCIpO1xuXG5zdWJtaXRCdG4ub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGRpc3BsYXlUYWJsZSgpO1xuICBib2R5LmFwcGVuZENoaWxkKGNvbnRlbnRUYWJsZSk7XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5VGFibGUoKSB7XG4gIGNvbnRlbnRCb2R5LnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcIltzdGFydF0xZnJbc3RhcnQtZW5kXSAzZnIgW2VuZF1cIjtcbn1cbi8vY29uc29sZS5sb2codGFibGVEYXRhLmRhdGEpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=