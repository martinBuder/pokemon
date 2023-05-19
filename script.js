let currentAllPokemons;
let currentPokemon;
let currentCardPokemon;
let searchPokemon
let startNumber = 0;
let finishNumber = 32;

let content;
let cardContent;
let cardWrapper;

let colorCode = {
		'grass': 'rgb(12, 183, 12)',
		'fire': 'rgb(126, 20, 20)',
		'water': 'rgb(36, 92, 189)',
		'bug': 'rgb(168, 184, 32)',
		'normal': 'rgb(168, 168, 120)',
		'poison': 'rgb(160, 64, 160)',
		'electric': 'rgb(248, 208, 48)',
		'fairy': 'rgb(214, 133, 173)',
		'fighting': 'rgb(192, 48, 40)',
		'ground': 'rgb(224, 192, 104)',
		'psychic': 'rgb(248, 88, 136)',
		'ice': 'rgb(152, 216, 216)',
		'rock': 'rgb(184, 160, 56)',
		'dragon': 'rgb(112, 56, 248)',
		'dark': 'rgb(112, 88, 72)',
		'ghost': 'rgb(112, 88, 152)',
		'steel': 'rgb(184, 184, 208)',
		'flying': 'rgb(168, 144, 240)'

	
	}


let backgroundColor

async function loadAllPokemons() {
	let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
	let response = await fetch(url);
	currentAllPokemons = await response.json();
 loadPokemonInfos();
}

function loadNextPokemonInfos() {
	content.innerHTML = '';
	startNumber = startNumber + 32;
	finishNumber = finishNumber + 32;
	checkNumbers();
}

function loadLastPokemonInfos() {
	content.innerHTML = ''
	startNumber = startNumber - 32;
	finishNumber = finishNumber - 32;
	checkNumbers();	
}

function checkNumbers() {
	if (startNumber > 1010 - 33 || finishNumber < 32){
		if (finishNumber < 1) {
		 finishNumber = 1010 - 1;
			startNumber = finishNumber - 32;
			}else {
			startNumber = 0;
			finishNumber = startNumber + 32;
			}	
	}
	// 1010 pokemon on api - currentAllPokemons['results'].length is longer 1281
	loadPokemonInfos();
}

async function loadPokemonInfos() {
	for (let i = startNumber; i < finishNumber; i++) {
		currentPokemon = currentAllPokemons['results'][i]
		let url = `https:pokeapi.co/api/v2/pokemon/${i + 1}`
		let response = await fetch(url);
		currentPokemon = await response.json();
		renderPokemonInfo(i);
	}
}

function renderPokemonInfo(i) {
	content = document.getElementById('content')
	content.innerHTML += pokeStartCardHtml(i);
	fillPokeTypeContent(i);
}

function pokeStartCardHtml(i) {
	return /*html*/ `
		<div id="pokeContainer${i}" class="pokeContainer" onclick="openPokeCard(${i})" style="background: ${colorCode[`${currentPokemon['types'][0]['type']['name']}`]}">
			<h2>${currentPokemon['name']}</h2>
			<div id="pokeTypeContent${i}"></div>
			<img class="backgroundPokeImg" src="img/pokeball.png">
			<img class="pokeFrontImg" id="pokeImg" src=${currentPokemon['sprites']['other']['official-artwork']['front_default']} alt="">
		</div>	
	`
}

function fillPokeTypeContent(i) {
	let pokeTypeContent = document.getElementById(`pokeTypeContent${i}`);
	for (let j = 0; j < currentPokemon['types'].length; j++) {
		pokeTypeContent.innerHTML += /*html*/ `
		<p class="pokeType">
		${currentPokemon['types'][j]['type']['name']}</p>`
	}
}


function	openPokeCard(i) {
	i = checkNumber(i);
	loadCardPokemonInformation(i);
	cardContent = document.getElementById('cardContent');
}

function checkNumber(i) {
	if(i < 0){
		i = 1009
	}
	if(i > 1009){
		i = 0
	}

	return i
}

async function loadCardPokemonInformation(i) {
		let url = `https:pokeapi.co/api/v2/pokemon/${i + 1}`
		let response = await fetch(url);
		currentCardPokemon = await response.json();
		cardContent.innerHTML = cardHtml(i);
		cardWrapper = document.getElementById('cardWrapper');
 	cardWrapper.classList.remove('displayNone');
		renderPokeCardContent();
}

function cardHtml(i) {
	return /*html*/ `
	<div class="cardWrapper displayNone" id="cardWrapper" onclick="closeCardWrapper()">
		<button onclick="openPokeCard(${i - 1})"><</button>
		<div class="cardContainer" style="background: ${colorCode[`${currentCardPokemon['types'][0]['type']['name']}`]}">
			<div class="cardHeader" id="pokeCardContainer" >
				<h2>${currentCardPokemon['name']}</h2>
				<img class="cardImg" id="pokeImg" src=${currentCardPokemon['sprites']['other']['official-artwork']['front_default']} alt="">
			</div>
			<div class="cardBody">
				<div id="pokeCardContent"></div>
			</div>
		</div>
		<button onclick="openPokeCard(${i + 1})">></button> 
	</div>
`
}

function renderPokeCardContent() {
	let pokeCardContent = document.getElementById('pokeCardContent');
	pokeCardContent.innerHTML = pokeCardContentHeaderHtml();
}

function pokeCardContentHeaderHtml() {
	return /*html*/ `
		<div class="headerCardContentContainer">
			<h3 onclick="renderCardContentAbout()">About</h3>
			<h3 onclick="renderCardContentBase()">Base Stats</h3>
			<h3 onclick="renderCardContentEvolution()">Evolution </h3>
			<h3 onclick="renderCardContentMoves()">Moves</h3>
		</div>
	`;
}

function renderCardContentAbout() {
 alert('test')
}
function renderCardContentBase() {
	alert('test')
}
function renderCardContentEvolution() {
	alert('test')
}
function renderCardContentMoves() {
	alert('test')
}


function closeCardWrapper() {
	cardWrapper.classList.add('displayNone');
}
