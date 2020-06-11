let startButton = document.querySelector('#start_button');
let startButtonClick = document.querySelector('#a_start_button');
let hamburger = document.querySelector('.hamburger');
let icon = document.querySelector("svg");
const music = new Audio();

music.src = './js/canvas/Stellardrone - Eternity [SpaceAmbient].mp3';

// for appeareance subtitle
const appearance = () => {
    let byline = document.getElementById('byline');
    let bylineArr = byline.innerHTML.split('');                                   
    byline.innerHTML = ''; 

    let span, letter; 

    bylineArr.map(index => {
        span = document.createElement("span");
        letter = document.createTextNode(index);
        index === ' ' ? byline.appendChild(letter) : (
            span.appendChild(letter),                  
            byline.appendChild(span)
        );
    });
}; 
const appearanceStartButton = () => { 
    const styles = {
        display: 'flex',
        justifyContent: 'center',
    };
    setTimeout(() => Object.assign(startButton.style, styles), 4100);
}; 
const openMenu = () => {
    let navLinks = document.querySelector('.nav_links');
    let links = document.querySelectorAll('.nav_links li');
    let bars = document.querySelectorAll('.bar');

    navLinks.classList.toggle('show');
    links.forEach(link => link.classList.toggle('hide'));
    bars.forEach(bars => bars.classList.toggle('change'));
};
const eventsAfterStartButton = () => {
    let links = document.querySelectorAll('.nav_links li');

    hamburger.style.pointerEvents = 'auto';
    startButton.style.display = 'none';
    
    openMenu();
    [...links].forEach(link => link.addEventListener('click', () => {
        document.querySelector('.emblem').style.display = 'none';
        document.querySelector('.appearance').style.display = 'none';
    }));
};

appearance();
appearanceStartButton();

setTimeout(() => document.querySelector('#byline').style.display = 'none', 4001);      //delete subtitle
setTimeout(() => document.querySelector('.appearance')    //for hidding logo that has perspective on and it is not compatible with z-index
.classList.remove('animation_appearance'), 4002);       

startButtonClick.addEventListener('click', eventsAfterStartButton);  //activate menu button after get start button is clicked
hamburger.addEventListener('click', () => {                         //drop down menu
    openMenu();
    document.body.classList.toggle('scrollbar');   //for hidding scrollbar when drop down menu is open
});
icon.addEventListener("click", () => {         //stop or play music, icon change
    music.paused ? music.play() : music.pause() ; 
    icon.classList.toggle('mute');
});


const closeDropDown = () => {
    let navLinks = document.querySelector('.nav_links');
    let links = document.querySelectorAll('.nav_links li');
    let bars = document.querySelectorAll('.bar');

    navLinks.classList.toggle('show');
    links.forEach(link => link.classList.toggle('hide'));
    bars.forEach(bars => bars.classList.toggle('change'));
};
const showStore = () => {
    document.body.style.backgroundImage = `url('./css/images/store.jpg')`;
    document.getElementById('store_container').style.display = 'grid';
};
const showContainer = () => {
    document.querySelector('#container').style.display = 'block';
    document.body.style.overflowY = 'auto';
    document.body.style.background = 'content-box';
    document.getElementById('nav').style.background = 'black';
};
const showContact = () => {
    document.body.style.backgroundImage = `url('./css/images/contact.png')`;
    document.getElementById('contact').style.display = 'block';
};
let menuButtons = [...document.querySelector('.nav_links').children];
let menuButtonsId = menuButtons.map(menuButton => menuButton.id);
const allPages = [document.getElementById('container'), document.getElementById('store_container')];

menuButtons.forEach(menuButton => {
    menuButton.addEventListener('click', () => {
        function hideOtherPages(id) {
            for(let page of allPages) {
                if(page.id != id) {
                    page.style.display = 'none';
                };
            };
        };
        switch(event.target.id) {
            case 'container_button' :
                hideOtherPages('container');
                closeDropDown();
                showContainer();
            break;
            case 'store_button' :
                hideOtherPages('store');
                closeDropDown()
                showStore();
            break;
            case 'contact_button' :
                hideOtherPages('contact');
                closeDropDown();
                showContact();
            break;
        };
    });
});