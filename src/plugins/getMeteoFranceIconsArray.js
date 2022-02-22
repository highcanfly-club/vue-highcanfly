//Main idea is to ask for multiple places forecast
//return a Promise with an array of icon objects {icon: '', url: '', desc:''}
//sample use getMeteoFranceIconsArray().then((icons)=>{console.log(icons)});
const fetch = require('node-fetch');


var exports = {getMeteoFranceIconsArray}; 
