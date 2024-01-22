export const caller= (info) =>{
    let previousEntry = localStorage.getItem('weatherInfo') ? JSON.parse(localStorage.getItem('weatherInfo')) : '';

    if (previousEntry) {
        console.log(previousEntry.city) 
        console.log(info)
    }
    else {
        localStorage.setItem('weatherInfo', JSON.stringify(info))
    }
}