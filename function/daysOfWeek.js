const daysOfWeek = () => {
    




    function getDaysOfWeek(elements) {
        let days = []
        const dOfw = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        elements.forEach(item => {
            const date = new Date(item.datetime).getDay()
            days.push(dOfw[date])
            
        })
        return days
    }
    function createDays(weatherInfo) {
        const daysContentDiv = document.createElement('div')
        const locationHeader = document.createElement('h2')
        locationHeader.textContent = weatherInfo.resolvedAddress
        const days = weatherInfo.days
        for (let i = 0; i < days.length; i++){
            const dayDiv = document.createElement("div");
            dayInfo(days[i], dayDiv);
            dayDiv.dataset.key = i
            daysContentDiv.appendChild(dayDiv)
        }
        return daysContentDiv
    }

    function dayInfo(day, div) {
        const headDiv = document.createElement('div')
        const contentDiv = document.createElement('div')
        const dateTime = document.createElement('h3')
        dateTime.textContent = day['date-time']
        delete day['date-time']
        const temp = document.createElement('h1')
        temp.textContent = day.temp
        const icon = document.createElement('img')
        //icon.src =
        delete day.icon
        contentDiv.append(temp, icon)
        headDiv.append(dateTime, contentDiv)
        div.append(headDiv)
        if (day) {
            const viewMoreBtn = document.createElement('button')
            viewMoreBtn.textContent = 'View More'
            const moreDiv = document.createElement('div')
            Object.entries(day).forEach(([key, value]) => {
                const extra = document.createElement(h3)
                extra.textContent = `${key}: ${value}`

                moreDiv.appendChild(extra)
            })
            headDiv.append(viewMoreBtn)
            div.append(moreDiv)

        }


    }

    return {createDays}
}
