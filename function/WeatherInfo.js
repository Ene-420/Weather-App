import { daysOfWeek } from "./daysOfWeek";

export const weatherInfo = (info) => {
  const contentWeatherInfo = document.querySelector(".content-weather-info");
  const content = document.querySelector(".content");

  const weekdays = getDaysOfWeek(info.days);
  render(weekdays);
  daysOfWeek().createDays(info);

  let active = document.querySelector(".active");
  const days = document.querySelectorAll(".day");
  let activeDay = document.querySelector(".active-day");
  const weekdayBtn = document.querySelectorAll(".weekday-btn");
  let dayContentExtra = activeDay.querySelector(".day-content-extra");
  const viewMoreBtn = document.querySelectorAll(".view-more-btn");
  const after = document.querySelector('.after')

  // if (viewMoreBtn /*&& dayContentExtra*/) {
  //   viewMoreBtn.onclick = function () {
      
  //     // console.log(dayContentExtra)
  //     // if (dayContentExtra.style.display.includes('none')) {
  //     //   dayContentExtra.style.display = 'block'
  //     // }
  //   };
  // }

  viewMoreBtn.forEach(btn => {
    let active = false
    btn.onclick = function () {
      if (!active) {
        dayContentExtra.classList.add("active-extra-content");
        active = true
        after.textContent = '-'
      }
      else {
        dayContentExtra.classList.remove("active-extra-content");
        active = false;
        after.textContent = "+";
      }
      
    }
  })
  weekdayBtn.forEach((btn) => {
    btn.onclick = function (event) {
      switchActive(event);
      showWeatherInfo(event);
    };
  });

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
          activeDay.classList.remove("active-day");
          item.classList.add("active-day");
          activeDay = item;
          dayContentExtra.classList.remove("active-extra-content");
          dayContentExtra = activeDay.querySelector(".day-content-extra");

        }
      });
    }
  }
  

};
