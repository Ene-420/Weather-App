import { Weather } from "../obj/Weather";

export const WeatherDetails = () => {
  function buildApiURL(weatherInfo) {
    let urlEnd = `&include=days&key=GGLYE6F842M6SC4GVHVXRZF4R&contentType=json`;
    let mainUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherInfo.getCity()}%20${weatherInfo.getCountry()}/${weatherInfo.getStartDate()}`;

    mainUrl = weatherInfo.getEndDate()
      ? `${mainUrl}/${weatherInfo.getEndDate()}?`
      : `${mainUrl}?`;

    mainUrl += `unitGroup=metric&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cicon`;

    let newUrl = weatherInfo.getWeatherDetails()
      ? addElements(`${mainUrl}%2`, weatherInfo.getWeatherDetails())
      : `${mainUrl}&`;

    return `${newUrl}${urlEnd}`;
  }
  async function callWeatherAPI(info) {
    try {
      const url = await buildApiURL(info);
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
