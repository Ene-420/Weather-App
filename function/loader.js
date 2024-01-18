import { easepick } from "@easepick/bundle";
export const bodyContent = () => {
  function render() {
    const formDetails = document.createElement("form");
    const formDiv = document.createElement("div");
    const formDiv_2 = document.createElement("div");
    formDiv.classList.add("form-div");
    formDiv_2.classList.add("form-div");
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
    formDiv_2.append(createDates(), createWeatherOptions());
    formDetails.append(formDiv, formDiv_2, submitBtn);
    // formDetails.appendChild(createDates());
    // formDetails.appendChild(createWeatherOptions());
    // formDetails.appendChild(submitBtn);

    return formDetails;
  }

  function createDates() {
    const dateDiv = document.createElement("div");
    const dateRange = document.createElement("input");
    dateRange.setAttribute("id", "date-range");
    dateDiv.append(dateRange);

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

    sortedListed.unshift({ country: "Select Country", code: "" });

    const dropDown = document.createElement("select");
    const dropDownName = document.createElement("optgroup");
    //dropDownName.label = "Select Country";
    //dropDown.appendChild(dropDownName);

    sortedListed.forEach((item) => {
      const dropdownItem = document.createElement("option");
      dropdownItem.value = item.code;
      dropdownItem.textContent = item.country;
      if (item.country === "Select Country") {
        dropdownItem.selected = true;
        //dropdownItem.disabled = true
      }

      dropDown.appendChild(dropdownItem);
    });

    dropDownDiv.appendChild(dropDown);
    return dropDownDiv;
  }

  function createWeatherOptions() {
    const weatherHeader = document.createElement("legend");

    const weatherOptions = document.createElement("div");
    const span = document.createElement('span')
    const dropDownBtn = document.createElement('button')
    const btnIcon = document.createElement('i')
    btnIcon.classList.add('fa-solid')
    btnIcon.classList.add('fa-chevron-down')
    dropDownBtn.classList.add('dropdown-btn')
    dropDownBtn.append(btnIcon)

    span.textContent = 'Select Weather Options '
    weatherOptions.classList.add('weather-details')
    const weatherOptionsDiv = document.createElement("div");
    weatherOptionsDiv.classList.add("weather-options-div");


    const weatherOptionsOther = [
      { option: "Feels Like Max", code: "feelslikemax" },
      { option: "Feels Like Min", code: "feelslikemin" },
      { option: "Wind Gust", code: "windgust" },
      { option: "Wind Speed", code: "windspeed" },
      { option: "Wind Direction", code: "winddir" },
    ];

    const weatherDropdown = document.createElement('div')
    weatherDropdown.classList.add('weather-dropdown-list')
    const weatherOptionsList = document.createElement('ul')
    weatherOptionsOther.forEach(item => {
      const listItem = document.createElement('li')
      const itemCheckbox = document.createElement('input')
      const itemLabel = document.createElement('label')

      itemCheckbox.setAttribute('type', 'checkbox')
      itemCheckbox.setAttribute('value', item.code)
      itemCheckbox.setAttribute('name', 'weather-options')
      itemLabel.textContent = item.option
      itemLabel.onclick = selectItem

      listItem.append(itemCheckbox, itemLabel)
      weatherOptionsList.append(listItem)
    })

    weatherDropdown.append(weatherOptionsList)
    weatherOptionsDiv.append(span,dropDownBtn);

    weatherOptions.append(weatherOptionsDiv, weatherDropdown);

    return weatherOptions;
  }

  // function create

  function dateRangePicker(element) {
    const picker = new easepick.create({
      element: `#${element}`,
      css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
      ],
      plugins: ["RangePlugin", "LockPlugin"],
      RangePlugin: {
        tooltipNumber(num) {
          return num - 1;
        },
        locale: {
          one: "night",
          other: "nights",
        },
        startDate: new Date().toISOString().substring(0, 10),
      },
      LockPlugin: {
        minDate: new Date().toISOString().substring(0, 10),
      },
    });
    return picker;
  }
  function capitalizeFirstLetter(word) {
    return word.replace(`${word[0]}`, `${word[0].toUpperCase()}`);
  }

  function selectItem(event) {
    let siblingCheckBox = event.target.previousElementSibling;

    if (siblingCheckBox.checked) {
      siblingCheckBox.checked = false;
    } else {
      siblingCheckBox.checked = true;
    }
  }

  return { render, dateRangePicker };
};
