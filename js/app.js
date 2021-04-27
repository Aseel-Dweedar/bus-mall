'use strict';

// GENERAL ARRAY ////////////////////////////////////////////////////////////////////////////

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

// GENERAL FUNCTION ////////////////////////////////////////////////////////////////////////////

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// GENERAL VARIABLES ////////////////////////////////////////////////////////////////////////////

let imgContaner = document.getElementById('imgContaner');
let rightImg = document.getElementById('rightImg');
let midImg = document.getElementById('midImg');
let leftImg = document.getElementById('leftImg');

let clicker = 0;
let numberOfRounds = 25;
let rightImgCounts = 0;
let midImgCounts = 0;
let leftImgCounts = 0;

// CONSTRUCTOR FUNCTION ////////////////////////////////////////////////////////////////////////////

let Sections = function(name) {
    this.name = name.split('.')[0];
    this.img = `./img/${name}`;
    this.shown = 0;
    this.clicks = 0;
    Sections.all.push(this);
};
Sections.all = [];

for (let i = 0; i < nameArr.length; i++) {
    new Sections(nameArr[i]);
}

// RENDER FUNCTION ////////////////////////////////////////////////////////////////////////////


// let testing = [];

let showTwo = [-1, -1, -1];

function render() {

    let rightIndex;
    let midIndex;
    let leftIndex;

    do {
        rightIndex = randomNumber(0, nameArr.length - 1);
    } while (rightIndex === showTwo[0] || rightIndex === showTwo[1] || rightIndex === showTwo[2]);

    do {
        midIndex = randomNumber(0, nameArr.length - 1);
    } while (midIndex === rightIndex || midIndex === showTwo[0] || midIndex === showTwo[1] || midIndex === showTwo[2]);

    do {
        leftIndex = randomNumber(0, nameArr.length - 1);
    } while (leftIndex === rightIndex || leftIndex === midIndex || leftIndex === showTwo[0] || leftIndex === showTwo[1] || leftIndex === showTwo[2]);

    rightImg.src = Sections.all[rightIndex].img;
    midImg.src = Sections.all[midIndex].img;
    leftImg.src = Sections.all[leftIndex].img;

    rightImgCounts = rightIndex;
    midImgCounts = midIndex;
    leftImgCounts = leftIndex;

    Sections.all[rightIndex].shown++;
    Sections.all[midIndex].shown++;
    Sections.all[leftIndex].shown++;

    showTwo[0] = rightIndex;
    showTwo[1] = midIndex;
    showTwo[2] = leftIndex;

    showTwo = [rightIndex, midIndex, leftIndex];
    // testing.push([rightIndex, midIndex, leftIndex]);
    return showTwo;
}

render();

// console.log(showTwo);
// console.log(testing);



//  CLICK LISTENER ////////////////////////////////////////////////////////////////////////////

imgContaner.addEventListener('click', handler);


function handler(event) {
    if ((event.target.id === 'rightImg' || event.target.id === 'midImg' || event.target.id === 'leftImg') && clicker < numberOfRounds) {

        if (event.target.id === 'rightImg') {
            Sections.all[rightImgCounts].clicks++;
        }

        if (event.target.id === 'midImg') {
            Sections.all[midImgCounts].clicks++;
        }

        if (event.target.id === 'leftImg') {
            Sections.all[leftImgCounts].clicks++;
        }
        clicker++;
        render();
    } else {
        chart();
    }
}

//  BUTTON LISTENER ////////////////////////////////////////////////////////////////////////////

const view = document.getElementById('view');
const list = document.getElementById('list');

view.addEventListener('click', function dataView() {
    for (let i = 0; i < nameArr.length; i++) {
        let item = document.createElement('li');
        list.appendChild(item);
        item.textContent = `${Sections.all[i].name} had ${Sections.all[i].clicks} votes, and was seen ${Sections.all[i].shown} times.`;
    }
}, {
    once: true
});

//  CHART.JS ////////////////////////////////////////////////////////////////////////////

function chart() {

    let names = [];
    let clicks = [];
    let shown = [];

    for (let i = 0; i < Sections.all.length; i++) {
        names.push(Sections.all[i].name);
        clicks.push(Sections.all[i].clicks);
        shown.push(Sections.all[i].shown);
    }

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                    label: 'Clicks',
                    data: clicks,
                    backgroundColor: ['rgba(175, 190, 185, 0.5)'],
                    borderColor: ['rgba(175, 190, 185, 1)'],
                    borderWidth: 1
                },
                {
                    label: 'Shown',
                    data: shown,
                    backgroundColor: ['rgba(255, 136, 130, 0.5)'],
                    borderColor: ['rgba(255, 136, 130, 1)'],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//  Backups ////////////////////////////////////////////////////////////////////////////


// console.log(Sections.all);

// function render() {

//     let rightIndex = randomNumber(0, nameArr.length - 1);
//     let midIndex;
//     let leftIndex;
//     do {
//         midIndex = randomNumber(0, nameArr.length - 1);
//     } while (rightIndex === midIndex);

//     do {
//         leftIndex = randomNumber(0, nameArr.length - 1);
//     } while (leftIndex === rightIndex || leftIndex === midIndex);

//     rightImg.src = Sections.all[rightIndex].img;
//     midImg.src = Sections.all[midIndex].img;
//     leftImg.src = Sections.all[leftIndex].img;

//     rightImgCounts = rightIndex;
//     midImgCounts = midIndex;
//     leftImgCounts = leftIndex;

//     Sections.all[rightIndex].shown++;
//     Sections.all[midIndex].shown++;
//     Sections.all[leftIndex].shown++;

// }
// render();