function attachEvents() {
    let locationsUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    let todayForeUrl = 'http://localhost:3030/jsonstore/forecaster/today/';
    let futureForeUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/'

    let locationInput = document.getElementById('location');
    let buttonElem = document.getElementById('submit');
    let forecastElem = document.getElementById('forecast');



    let conditionSymbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: ''
    }


    buttonElem.addEventListener('click', submit);

    function submit() {

        if (document.querySelector('.forecasts')) {
            document.querySelector('.forecasts').remove()
            document.getElementById('forecast').style.display = 'none';
        }
        if (document.querySelector('.forecast-info')) {
            document.querySelector('.forecast-info').remove()
        }
        if (document.getElementById('error')) {
            document.getElementById('error').remove()
        }


        fetch(locationsUrl)
            .then(res => res.json())
            .then(locations => {
                let city = locations.filter(obj => obj.name == locationInput.value)[0];
                fetch(`${todayForeUrl}${city.code}`)
                    .then(res => res.json())
                    .then(today => {
                        let name = today.name;
                        let min = today.forecast.low;
                        let max = today.forecast.high;
                        let condition = today.forecast.condition;
                        todayDisplay(name, min, max, condition);
                    })
                fetch(`${futureForeUrl}${city.code}`)
                    .then(res => res.json())
                    .then(futureForecast => {

                        createaDailyFore(futureForecast.forecast);
                    })

            }).catch(error => {
                let label = document.createElement('div');
                label.className = 'label';
                label.id = 'error';
                label.textContent = 'Error';
                document.querySelector('#request').appendChild(label);

            })


    }


    function todayDisplay(city, min, max, con) {

        let resultDiv = document.createElement('div');
        resultDiv.className = 'forecasts'

        let symbolSpan = document.createElement('span');
        symbolSpan.className = 'condition symbol';
        symbolSpan.textContent = conditionSymbols[con]

        let infoSpan = document.createElement('span');
        infoSpan.className = 'condition';

        let nameSpan = document.createElement('span');
        nameSpan.className = 'forecast-data';
        nameSpan.textContent = city;

        let tempSpan = document.createElement('span');
        tempSpan.className = 'forecast-data';
        tempSpan.textContent = `${min}°/${max}°`;

        let condSpan = document.createElement('span');
        condSpan.className = 'forecast-data';
        condSpan.textContent = con


        infoSpan.appendChild(nameSpan);
        infoSpan.appendChild(tempSpan);
        infoSpan.appendChild(condSpan);

        resultDiv.appendChild(symbolSpan);
        resultDiv.appendChild(infoSpan);

        document.getElementById('current').appendChild(resultDiv);
        forecastElem.style.display = 'block';
    }


    function createaDailyFore(days) {
        let forecastInfoDiv = document.createElement('div');
        forecastInfoDiv.className = 'forecast-info';


        days.forEach(obj => {
            let upcomingSpan = document.createElement('span');
            upcomingSpan.className = 'upcoming'

            let symbolSpan = document.createElement('span');
            symbolSpan.className = 'symbol';
            symbolSpan.textContent = conditionSymbols[obj.condition];

            let tempSpan = document.createElement('span');
            tempSpan.className = 'forecast-data';
            tempSpan.textContent = `${obj.low}°/${obj.high}°`;

            let condSpan = document.createElement('span');
            condSpan.className = 'forecast-data';
            condSpan.textContent = obj.condition;


            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(tempSpan);
            upcomingSpan.appendChild(condSpan)
            forecastInfoDiv.appendChild(upcomingSpan);

        })
        document.getElementById('upcoming').appendChild(forecastInfoDiv);
    }


}

attachEvents();