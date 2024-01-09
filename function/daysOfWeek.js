export const daysOfWeek = () => {
  const contentWeatherInfo = document.querySelector(".content-weather-info");

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(require.context("../assets/img", false, /\.(png)$/));

  function createDays(weatherInfo) {
    const daysContentDiv = document.createElement("div");
    const locationHeader = document.createElement("h2");
    locationHeader.textContent = weatherInfo.resolvedAddress;
    daysContentDiv.classList.add("weekday-weather");
    daysContentDiv.appendChild(locationHeader);
    const dayContent = document.createElement("div");
    dayContent.classList.add("weekday-weather-content");
    const days = weatherInfo.days;
    for (let i = 0; i < days.length; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayInfo(days[i], dayDiv);
      dayDiv.dataset.tag = i;
      if (i === 0) {
        dayDiv.classList.add("active-day");
      }
      dayContent.appendChild(dayDiv);
    }
    daysContentDiv.appendChild(dayContent);
    contentWeatherInfo.appendChild(daysContentDiv);
  }

  function dayInfo(day, div) {
    const dayWeatherInfo = day;
    const weatherDetailToSkip = ["datetime", "temp", "icon", "conditions"];
    const headDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const headContent = document.createElement("div");
    const dateTime = document.createElement("h3");

    dateTime.textContent = dayWeatherInfo.datetime;
    // delete dayWeatherInfo.datetime;
    const temp = document.createElement("h1");
    temp.textContent = dayWeatherInfo.temp;
    // delete dayWeatherInfo.temp;
    const icon = document.createElement("img");
    icon.src = images[`${dayWeatherInfo.icon}.png`];
    // delete dayWeatherInfo.icon;
    const conditions = document.createElement("h3");
    conditions.textContent = day.conditions;
    contentDiv.classList.add("day-content-items");
    contentDiv.append(temp, icon);
    headContent.append(contentDiv, conditions);

    headDiv.append(dateTime, headContent);
    headDiv.classList.add("day-content");
    div.append(headDiv);
    if (dayWeatherInfo) {
      const viewMoreBtn = document.createElement("button");
      const span = document.createElement("span");
      span.classList.add("after");
      span.textContent = "+";
      viewMoreBtn.classList.add("view-more-btn");
      viewMoreBtn.textContent = `View More `;
      viewMoreBtn.append(span)
      const moreDiv = document.createElement("div");
      moreDiv.classList.add("day-content-extra");
      Object.entries(dayWeatherInfo).forEach(([key, value]) => {
        if (!weatherDetailToSkip.includes(key)) {
          const extra = document.createElement("h3");
          extra.textContent = `${key}: ${value}`;

          moreDiv.appendChild(extra);
        }
      });
      headDiv.append(viewMoreBtn);
      div.append(moreDiv);
    }
  }

  return { createDays };
};
