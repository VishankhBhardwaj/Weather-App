const apikey = 'b7c3033ae1190101b46663d1cadd2517';
const api = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchbar = document.querySelector('.search-bar');
const searchicon = document.querySelector('.search-icon');
const weatherimg = document.querySelector('.weather-img');
const body = document.querySelector('body');
const arr = ["1.jpg", "2.jpg", "3.jpg"]; // Correct paths to images
let backgroundIndex = 0;

function changeBackground() {
    console.log(arr[backgroundIndex]);
    body.style.transition = "background-image 1.5s ease-in-out"; // Smooth transition
    body.style.backgroundImage = `url(${arr[backgroundIndex]})`; // Change background
    backgroundIndex = (backgroundIndex + 1) % arr.length; // Loop through images
}

setInterval(changeBackground, 5000); // Call function every 5 seconds

async function checkweather(city) {
    const response = await fetch(api + city + `&apikey=${apikey}`);
    const data = await response.json();
    console.log(data);
    document.querySelector('.city').innerText = data.name;
    document.querySelector('.temp').innerText = data.main.temp + "°C";
    document.querySelector('.humidity').innerText = data.main.humidity + "%";
    document.querySelector('.wind').innerText = data.wind.speed + " km/h";
    
    if (data.weather[0].main === 'Clouds') {
        weatherimg.src = 'clouds.png';
    } else if (data.weather[0].main === 'Rain') {
        weatherimg.src = 'rain.png';
    } else if (data.weather[0].main === 'Clear') {
        weatherimg.src = 'clear.png';
    } else if (data.weather[0].main === 'Snow') {
        weatherimg.src = 'snow.png';
    } else if (data.weather[0].main === 'Drizzle') {
        weatherimg.src = 'rain.png';
    }

    weatherimg.style.transition = 'opacity 1s ease-in-out';
    weatherimg.style.opacity = 0;
    setTimeout(() => {
        weatherimg.style.opacity = 1;
    }, 50);
}

searchicon.addEventListener('click', () => {
    checkweather(searchbar.value);
});
