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
