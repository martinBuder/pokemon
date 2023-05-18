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
		// findBackgroundColor(i, j)
	}
}


function	openPokeCard(i) {
	if(i < 0){
		i = 1009
	}
	if(i > 1009){
		i = 0
	}
	loadCardPokemonInformation(i);
	cardContent = document.getElementById('cardContent');

}

async function loadCardPokemonInformation(i) {
		let url = `https:pokeapi.co/api/v2/pokemon/${i + 1}`
		let response = await fetch(url);
		currentCardPokemon = await response.json();

		cardContent.innerHTML = cardHtml(i);
		
	cardWrapper = document.getElementById('cardWrapper');

	cardWrapper.classList.remove('displayNone');
}

function cardHtml(i) {
	return /*html*/ `
	<div class="cardWrapper displayNone" id="cardWrapper" onclick="closeCardWrapper()">
		<button onclick="openPokeCard(${i - 1})"><</button>
		<div class="cardContainer">
			<div class="cardHeader" id="pokeCardContainer" style="background: ${colorCode[`${currentCardPokemon['types'][0]['type']['name']}`]}">
				<h2>${currentCardPokemon['name']}</h2>
				<img class="cardImg" id="pokeImg" src=${currentCardPokemon['sprites']['other']['official-artwork']['front_default']} alt="">
			</div>
			<div class="cardBody">
				<div id="pokeTypeContent${i}"></div>
			</div>
		</div>
		<button onclick="openPokeCard(${i + 1})">></button> 
	</div>
`
}


// // function findBackgroundColor(i) {
// 	let pokeContainer = document.getElementById(`pokeContainer${i}`);



// 	if (currentPokemon['types'][0]['type']['name'] == 'grass') {
// 		pokeContainer.style.backgroundColor = 'rgb(12, 183, 12)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'fire') {
// 		pokeContainer.style.backgroundColor = 'rgb(126, 20, 20)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'water') {
// 		pokeContainer.style.backgroundColor = 'rgb(36, 92, 189)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'bug') {
// 		pokeContainer.style.backgroundColor = 'rgb(168, 184, 32)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'normal') {
// 		pokeContainer.style.backgroundColor = 'rgb(168, 168, 120)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'poison') {
// 		pokeContainer.style.backgroundColor = 'rgb(160, 64, 160)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'electric') {
// 		pokeContainer.style.backgroundColor = 'rgb(248, 208, 48)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'fairy') {
// 		pokeContainer.style.backgroundColor = 'rgb(214, 133, 173)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'fighting') {
// 		pokeContainer.style.backgroundColor = 'rgb(192, 48, 40)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'ground') {
// 		pokeContainer.style.backgroundColor = 'rgb(224, 192, 104)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'psychic') {
// 		pokeContainer.style.backgroundColor = 'rgb(248, 88, 136)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'ice') {
// 		pokeContainer.style.backgroundColor = 'rgb(152, 216, 216)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'rock') {
// 		pokeContainer.style.backgroundColor = 'rgb(184, 160, 56)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'dragon') {
// 		pokeContainer.style.backgroundColor = 'rgb(112, 56, 248)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'dark') {
// 		pokeContainer.style.backgroundColor = 'rgb(112, 88, 72)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'ghost') {
// 		pokeContainer.style.backgroundColor = 'rgb(112, 88, 152)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'steel') {
// 		pokeContainer.style.backgroundColor = 'rgb(184, 184, 208)';
// 	}
// 	if (currentPokemon['types'][0]['type']['name'] == 'flying') {
// 		pokeContainer.style.backgroundColor = 'rgb(168, 144, 240)';
// 	}
// // }


function closeCardWrapper() {
	cardWrapper.classList.add('displayNone');
}