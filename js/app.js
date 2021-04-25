'use strict';

let nameArr = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];


function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let imgContaner = document.getElementById('imgContaner');
let rightImg = document.getElementById('rightImg');
let midImg = document.getElementById('midImg');
let leftImg = document.getElementById('leftImg');

let clicker = 0;
let numberOfRounds = 25
let rightImgCounts = 0;
let midImgCounts = 0;
let leftImgCounts = 0;

let Sections = function(name) {
    this.name = name;
    this.img = `./img/${name}`;
    this.shown = 0;
    this.clicks = 0;
    Sections.all.push(this);
};
Sections.all = [];

for (let i = 0; i < nameArr.length; i++) {
    new Sections(nameArr[i]);
}

function render() {
    let rightIndex = randomNumber(0, nameArr.length - 1);
    let midIndex;
    let leftIndex;
    do {
        midIndex = randomNumber(0, nameArr.length - 1);
    } while (rightIndex === midIndex);

    do {
        leftIndex = randomNumber(0, nameArr.length - 1);
    } while (leftIndex === rightIndex || leftIndex === midIndex);

    rightImg.src = Sections.all[rightIndex].img;
    midImg.src = Sections.all[midIndex].img;
    leftImg.src = Sections.all[leftIndex].img;

    rightImgCounts = rightIndex;
    midImgCounts = midIndex;
    leftImgCounts = leftIndex;

    Sections.all[rightIndex].shown++;
    Sections.all[midIndex].shown++;
    Sections.all[leftIndex].shown++;
}
render();


imgContaner.addEventListener('click', whenClick);

function whenClick(event) {
    if ((event.target.id === 'rightImg' || event.target.id === 'midImg' || event.target.id === 'leftImg') && clicker < numberOfRounds) {

        if (event.target.id === 'rightImg') {
            Sections.all[rightImgCounts].clicks++;
        }

        if (event.target.id === 'rightImage') {
            Sections.all[midImgCounts].clicks++;
        }

        if (event.target.id === 'leftImg') {
            Sections.all[leftImgCounts].clicks++;
        }
        clicker++;
        render();
    }
}

// console.log(Sections.all);


const view = document.getElementById('view');
const list = document.getElementById('list');

view.addEventListener('click', function dataView() {
    for (let i = 0; i < nameArr.length; i++) {
        let item = document.createElement('li');
        list.appendChild(item);
        item.textContent = `${Sections.all[i].name.split('.')[0]} had ${Sections.all[i].clicks} votes, and was seen ${Sections.all[i].shown} times.`;
    }
}, {
    once: true
});


// function RespondClick() {
//     view.removeEventListener('click', dataView);
//     for (let i = 0; i < nameArr.length; i++) {
//         let item = document.createElement('li');
//         list.appendChild(item);
//         item.textContent = `${Sections.all[i].name.split('.')[0]} had ${Sections.all[i].clicks} votes, and was seen ${Sections.all[i].shown} times.`;
//     }
// }


// const view = document.getElementById('view');
// const list = document.getElementById('list');


// view.addEventListener('click', function dataView(event) {
//             event.view.removeEventListener(event.click, dataView);

//             for (let i = 0; i < nameArr.length; i++) {
//                 let item = document.createElement('li');
//                 list.appendChild(item);
//                 item.textContent = `${Sections.all[i].name.split('.')[0]} had ${Sections.all[i].clicks} votes, and was seen ${Sections.all[i].shown} times.`;
//             }
//         }