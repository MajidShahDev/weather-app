const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '0342d1836dc0484adcd66f37992f31de'; // openweathermap.org

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    let city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch (error) {
            console.log(error);
            displayError(error);
        }

    } else {
        displayError(`Please Enter a City!`);
    }
});

const getWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
        throw new error('Could not fetch weather Data!');
    } else {
        return await response.json();
    }


}

const toTitleCase = (str) => {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const displayWeatherInfo = (data) => {
    console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ id, description }] } = data;
    card.textContent = '';
    // card.style.display = 'flex';
    // card.style.flexDirection = 'row';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');
    const descDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    weatherEmoji.textContent = getWeatherEmoji(id);
    descDisplay.textContent = toTitleCase(description);
    humidityDisplay.textContent = `Humudity: ${humidity}%`;

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    weatherEmoji.classList.add('weatherEmoji');
    descDisplay.classList.add('descDisplay');
    humidityDisplay.classList.add('humidityDisplay');


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(descDisplay);
    card.appendChild(humidityDisplay);
}
const getWeatherEmoji = (weatherId) => {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return '🌩';
        case (weatherId >= 300 && weatherId < 400):
            return '🌧';
        case (weatherId >= 500 && weatherId < 600):
            return '🌧';
        case (weatherId >= 600 && weatherId < 700):
            return '❄';
        case (weatherId >= 700 && weatherId < 800):
            return '🌫';
        case (weatherId === 800):
            return '☀';
        case (weatherId >= 801 && weatherId < 810):
            return '☁';
        default:
            return '❔';
    }
}


const displayError = (mesg) => {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = mesg;
    errorDisplay.classList.add('errorDisplay');
    card.textContent = '';
    // card.style.display = 'flex';
    card.appendChild(errorDisplay);
}