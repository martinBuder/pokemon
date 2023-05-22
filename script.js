
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
		renderCardContentAbout();
}

function cardHtml(i) {
	return /*html*/ `
	<div class="cardWrapper displayNone" id="cardWrapper" onclick="closeCardWrapper()" disabled>
		<button onclick="openPokeCard(${i - 1})"><</button>
		<div class="cardBackgroundColor" style="background: ${colorCode[`${currentCardPokemon['types'][0]['type']['name']}`]}" onclick="blockCloseFunc()">
			<div class="cardContainer" id="pokeCardContainer" onclick="event.stopPropagation()">
				<div class="cardHeader"  >
					<h2>${currentCardPokemon['name']}</h2>
					<img class="cardImg" id="pokeImg" src=${currentCardPokemon['sprites']['other']['official-artwork']['front_default']} alt="">
					<div class="headerCardContentContainer">
						<h3 onclick="renderCardContentAbout()" id="aboutBtn">About</h3>
						<h3 onclick="renderCardContentBase()" id="statsBtn">Base Stats</h3>
						<h3 onclick="renderCardContentMoves()" id="movesBtn">Moves</h3>
					</div>
				</div>
				<div class="cardBody">
					<div id="pokeCardContent"></div>
				</div>
			</div>
		</div>
		<button onclick="openPokeCard(${i + 1})">></button> 
	</div>
`
}

function renderCardContentAbout() {
	styleAboutH3();
	pokeCardContent = document.getElementById('pokeCardContent');


	pokeCardContent.innerHTML = /*html*/ `
	<h4>type(s):</h4><p id="cardType"></p>
	<h4>height:</h4><p>${currentCardPokemon['height']}</p>
	<h4>weight:</h4><p>${currentCardPokemon['weight']}</p>
	<h4>abilities:</h4><p id="cardAbility"></p>
	`
	showAllPokeCardTypes();
	showAllPokeCardAbilities();
}



function renderCardContentEvolution() {
	styleEvolutionH3();
	pokeCardContent = document.getElementById('pokeCardContent');

	pokeCardContent.innerHTML = /*html*/ `
	<h4>type(s):</h4><p id="cardType"></p>
	<h4>height:</h4><p>${currentCardPokemon['height']}</p>
	<h4>weight:</h4><p>${currentCardPokemon['weight']}</p>
	<h4>abilities:</h4><p id="cardAbility"></p>
	`
}

function renderCardContentMoves() {
	styleMovesH3();
	pokeCardContent = document.getElementById('pokeCardContent');
	pokeCardContent.innerHTML = /*html*/ `
	<h4>moves:</h4><p id="cardMoves"></p>
	`;
	fillCardMoves();
}

function fillCardMoves() {
	let cardMoves = document.getElementById('cardMoves')
	for (let i = 0; i < currentCardPokemon['moves'].length; i++) {
	 cardMoves.innerHTML +=	/*html*/ `
		<div class="move"> 
		${currentCardPokemon['moves'][i]['move']['name']}</div>`
	}
}

function showAllPokeCardTypes() {
	let cardType = document.getElementById('cardType')
	for (let j = 0; j < currentCardPokemon['types'].length; j++) {
	 cardType.innerHTML +=	/*html*/ `
		<div> 
		${currentCardPokemon['types'][j]['type']['name']}</div>`
	}
}

function showAllPokeCardAbilities() {
	let cardAbility = document.getElementById('cardAbility')
	for (let j = 0; j < currentCardPokemon['abilities'].length; j++) {
	 cardAbility.innerHTML +=	/*html*/ `
		<div> 
		${currentCardPokemon['abilities'][j]['ability']['name']}</div>`
	}
}

function definateBtn() {
	aboutBtn = document.getElementById('aboutBtn');
	statsBtn = document.getElementById('statsBtn');
	movesBtn = document.getElementById('movesBtn');
}

function styleAboutH3() {
	definateBtn()
	aboutBtn.style.scale = '1.2';
	statsBtn.style.scale = '1';
	movesBtn.style.scale = '1';
}

function styleBaseH3() {
	statsBtn.style.scale = '1.2';
	aboutBtn.style.scale = '1';
	movesBtn.style.scale = '1';
}

function styleMovesH3() {
	movesBtn.style.scale = '1.2';
	aboutBtn.style.scale = '1';
	statsBtn.style.scale = '1';
}

function closeCardWrapper() {
	cardWrapper.classList.add('displayNone');
}


