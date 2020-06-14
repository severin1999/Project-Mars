const spacexLaunches = 'https://api.spacexdata.com/v3/launches/upcoming'; //All launches at SpaceX
const potdNASA = 'https://api.nasa.gov/planetary/apod?api_key=l2M7ezAqrDGe03IBjZ86MWJEUqfYQycafot3bVja'; //PictureOfTheDay Nasa API's
const iss = 'http://api.open-notify.org/astros.json';  //People in ISS Api's

const makeRequest = (url, callback) => {
    /*  request through AJAX
        
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();
        request.onload = () => {
            let myResponse = JSON.parse(request.responseText);
            callback(myResponse);
        };           
    */
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data));
};

const countDown = (date, id) => {
    return (setInterval(() => {
        let now = new Date().getTime();
        let distance = date - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(`day_number_${id}`).innerHTML = days;
        document.getElementById(`hour_number_${id}`).innerHTML = hours;
        document.getElementById(`minute_number_${id}`).innerHTML = minutes;
        document.getElementById(`seconds_number_${id}`).innerHTML = seconds;
    }, 1000));
};

const spacexTable = (data) => {
    function countDownTable(upcomingLaunch) {
        let mission = document.createElement('span'),
        rocket = document.createElement('p'),
        details = document.createElement('p');

        mission.innerHTML = upcomingLaunch.mission_name;
        rocket.innerHTML = `Rocket name : ${upcomingLaunch.rocket.rocket_name}`;
        upcomingLaunch.details === null ? 
        details.innerHTML = 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the he goal of reducing space transportation costs to enable the colonization of Mars. SpaceX has developed several launch vehicles and the Dragon spacecraft.': 
        details.innerHTML = upcomingLaunch.details;

        document.getElementById('upcoming_title').appendChild(mission);
        document.getElementById('rocket').appendChild(rocket);
        document.getElementById('details').appendChild(details);

        let countDownDate = new Date(upcomingLaunch.launch_date_local);
        countDown(countDownDate, 'launch');
    };
    countDownTable(data[2]);
    for(let launchIndex of data) {
        let launch = document.createElement('div');
        let mission = document.createElement('p');
        let date = document.createElement('p');
        let vehicle = document.createElement('p');
        let launchpad = document.createElement('p');

        mission.innerHTML = launchIndex.mission_name;
        date.innerHTML = launchIndex.launch_date_local;
        vehicle.innerHTML = launchIndex.rocket.rocket_name;
        launchpad.innerHTML = launchIndex.launch_site.site_name;

        launch.appendChild(mission);
        launch.appendChild(date);
        launch.appendChild(vehicle);
        launch.appendChild(launchpad);
        launch.classList.add('launch_position');
        document.getElementById('all_launches').appendChild(launch)
    };
};

const pictureOfTheDay = (response) => {
    let photoFrame = document.getElementById('picture_frame');
    let description = document.getElementById('description');

    let copyright = document.createElement('p');
    let dayOfPicture = document.createElement('span');
    let picture = document.createElement('div');
    let title = document.createElement('h3');
    let explanation = document.createElement('p');
    switch(response.media_type) {
        case 'video' :
            picture.innerHTML = `<iframe src='${response.url}'>`;
        break;
        case 'image' :
            picture.innerHTML = `<img src='${response.url}'/>`;
        break;
        default :
            picture.innerHTML = `<img src='./css/images/nasa.png'/>`;
        break;
    };
    switch(response.copyright) {
        case undefined : 
            copyright.innerHTML = '(c) NASA Copyright'
        break;
        default :
            copyright.innerHTML = response.copyright;
        break;
    };

    dayOfPicture.innerHTML = response.date;
    title.innerHTML = response.title;
    explanation.textContent = response.explanation;

    photoFrame.appendChild(picture);
    photoFrame.appendChild(copyright);
    description.appendChild(title);
    description.appendChild(explanation);

    document.getElementById('date').appendChild(dayOfPicture);
};

const pplInIss = (response) => {
    let listOfCosmonauts = document.createElement('ol');

    for(let cosmonaut of response.people) {
        let cosmonautItem = document.createElement('li');
        cosmonautItem.innerHTML = `${cosmonaut.name} : ${cosmonaut.craft}`;
        listOfCosmonauts.appendChild(cosmonautItem);
    };
    document.getElementById('cosmonauts').appendChild(listOfCosmonauts)
};

const marsWeather = (response) => {
    const temperatures = Object.entries(response).map(([sol, data]) => {
        return {
            solDay: sol,
            maxTemp: data.AT.mx,
            minTemp: data.AT.mn,
            windSpeed: data.HWS.av,
            windDirectionDegrees: data.WD.most_common.compass_degrees,
            windDirectionCardinal: data.WD.most_common.compass_point,
            date: new Date(data.First_UTC)
        }
    })
    function displayDate(date) {
        return date.toLocaleDateString(
            undefined,
            {day: 'numeric', month: 'long'}
        )
    };
    for(weatherSol of temperatures) {
        let weatherCard = document.createElement('div');

        let date = document.createElement('div');
        let details = document.createElement('div');

        let solOnMars = document.createElement('h3');
        let dayOnEarth = document.createElement('p');

        solOnMars.innerHTML = `Sol ${weatherSol.solDay}`;
        dayOnEarth.innerHTML = displayDate(weatherSol.date);
        let high = document.createElement('p');
        high.innerHTML = `High : ${Math.round(weatherSol.maxTemp)} °C`;
        let low = document.createElement('p');
        low.innerHTML = `Low : ${Math.round(weatherSol.minTemp)} °C`;
        let wind = document.createElement('p');
        wind.innerHTML = `Wind : ${Math.round(weatherSol.windSpeed)} Km/H`;      

        details.appendChild(high);
        details.appendChild(low);
        details.appendChild(wind);

        date.classList.add('weather_day');

        date.appendChild(solOnMars);
        date.appendChild(dayOnEarth);
        weatherCard.appendChild(date);
        weatherCard.appendChild(details);
        weatherCard.classList.add('weather_card')
        document.getElementById('weather_cards').appendChild(weatherCard)
    };
};

const countDownBet = () => {
    let countDownDate = new Date('January 1, 2026 00:00');
    countDown(countDownDate, 'bet');
};

fetch('https://api.nasa.gov/insight_weather/?api_key=l2M7ezAqrDGe03IBjZ86MWJEUqfYQycafot3bVja&feedtype=json&ver=1.0')
    .then(data => data.json())
    .then(response => {
        const {
            sol_keys,
            validity_checks,
            ...solData
        } = response;
        marsWeather(solData);
    });
makeRequest(potdNASA, pictureOfTheDay);
makeRequest(spacexLaunches, spacexTable);
makeRequest(iss, pplInIss)
countDownBet();

document.getElementById('next_launches').addEventListener('click', () => {
    document.getElementById('upcoming_launch_body').style.display = 'none';
    document.getElementById('all_launches_body').classList.remove('invisible');
});
document.getElementById('up_next').addEventListener('click', () => {
    document.getElementById('upcoming_launch_body').style.display = 'grid';
    document.getElementById('all_launches_body').classList.add('invisible');
});
document.getElementById('why_mars').addEventListener('click', () => {
    document.getElementById('mars_container').style.display = 'grid';
    document.getElementById('mars_countdown').style.display = 'none';
});
document.getElementById('musk_bet').addEventListener('click', () => {
    document.getElementById('mars_countdown').style.display = 'block';
    document.getElementById('mars_container').style.display = 'none';
});
document.getElementById('live_streaming').addEventListener('click', () => {
    document.getElementById('map_station').style.display = 'none';
    document.getElementById('iss_stream').style.display = 'flex';
    document.getElementById('iss_container').style.gridTemplateRows = '1fr 8fr';
});
document.getElementById('live_tracking').addEventListener('click', () => {
    document.getElementById('map_station').style.display = 'grid';
    document.getElementById('iss_stream').style.display = 'none';
    // document.getElementById('iss_container').style.gridTemplateRows = 'initial';
});

//  user clicks on the button, scroll to the top of the document
let scrollToTop = document.getElementById("scroll_button");
window.onscroll = () => {
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? scrollToTop.style.display = "block" : scrollToTop.style.display = "none";
};
const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
scrollToTop.addEventListener('click', topFunction);
