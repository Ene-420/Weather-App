export const weatherInfo = (info) => {
  const contentWeatherInfo = document.querySelector(".content-weather-info");
  const content = document.querySelector(".content");

  const weekdays = getDaysOfWeek(info)
  render(weekdays);

  let active = document.querySelector(".active");

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
        dayBtn.onclick = function () {
          switchActive;
          
        };

        if (i === 0) {
          dayBtn.classList.add("active");
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
    }
  }

   
};
