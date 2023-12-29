export const bodyContent = () => {
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
