export class Weather {
  constructor(
    city,
    country,
    startDate,
    endDate,
    weatherDetails
  
  ) {
    this.city = city;
    this.startDate = startDate;
    this.endDate = endDate;
    this.country = country;
    this.weatherDetails = weatherDetails

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

  getWeatherDetails() {
    return this.weatherDetails;
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
