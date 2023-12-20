import { Weather } from "../obj/Weather";

const WeatherDetails = () => {
  function buildApiURL(weatherInfo, elements) {
    let urlEnd = `&include=current&key=BNAX2GBUEDF9XCU6E74SU4T36&contentType=csv`;
    let mainUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
          ${weatherInfo.getCity()}%20${weatherInfo.getCountry()}
          /
          ${weatherInfo.getStartDate()} 
          `;

    mainUrl = weatherInfo.getEndDate()
      ? `${mainUrl}/${weatherInfo.getEndDate()}?`
      : `${mainUrl}?`;

    mainUrl += `unitGroup=metric&`;
    for (let i = 0; i < elements.length; i++) {
      if (i !== elements.length - 1) {
        mainUrl += `${elements[i]}%2C`;
      }
      mainUrl += `${elements[i]}`;
    }

    return `${mainUrl}${urlEnd}`;
  }
  async function callWeatherAPI(info, elements) {
    try {
      const url = await buildApiURL(info, elements);
        const response = await fetch(url);
        if(response.status === 200) return response;
    } catch (error) {
      console.log(error);
    }
  }
};
