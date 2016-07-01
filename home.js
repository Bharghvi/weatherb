
var temp;
var loc;
var icon;
var des;
var humidity;
var wind;
var direction;
var API= "784abc38e8e6a69dfa1f1c02fa16d7b1";


function update(weather) {
	temp.innerHTML=	weather.temp;
	loc.innerHTML=	weather.loc;
	des.innerHTML=	weather.des;
	wind.innerHTML=	weather.wind;
	humidity.innerHTML=	weather.humidity;
	direction.innerHTML=weather.direction;
	icon.src= "imgs/codes/" + weather.icon + ".png";

}

function updateByName(name) {
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + name + '&APPID=' + API;

	sendRequest(url);
}

function updateGeo(latitude,longitude){
	var url = 'http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + latitude + '&long=' + longitude + '&APPID=' + API;

	sendRequest(url);
}



function sendRequest(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadychange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.temp= data.main.temp;
			weather.loc= data.name;
			weather.des= data.weather.description;
			weather.wind= data.wind.speed;
			weather.direction= data.wind.deg;
			weather.humidity= data.main.humidity;
			weather.icon= data.weather.icon;

			update(weather);
		};
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function showPosition(position)
{
	updateGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function () {
	temp= document.getElementById("temperature");
	loc= document.getElementById("location");
	icon= document.getElementById("icon");
	des= document.getElementById("description");
	humidity= document.getElementById("humidity");
	wind= document.getElementById("wind");
	direction= document.getElementById("direction");

	
	if("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
	var name = prompt("Enter the City name");
	updateByName(name);
	}
}