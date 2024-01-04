const weatherInfo = () => {
    // fucntion parseJSON(text){
    //     return JSON.parse(Text)
    // }

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
}