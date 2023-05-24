async function loadAllPokemons() {
	let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
	let response = await fetch(url);
	currentAllPokemons = await response.json();
 findPokemonInfos();
}

function findPokemonInfos() {
	for (let i = startNumber; i < finishNumber; i++) {
		currentPokemon = currentAllPokemons['results'][i];
		loadPokemonInfos(i);
	}
}

async function loadPokemonInfos(i) {
	let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
	let response = await fetch(url);
	currentPokemon = await response.json();
	renderPokemonInfo(i);
}

function renderPokemonInfo(i) {
	content = document.getElementById('content')
	content.innerHTML += returnSmallPokeContainerHtml(i);
	fillPokeTypeContent(i);
}

function fillPokeTypeContent(i) {
	let pokeTypeContent = document.getElementById(`pokeTypeContent${i}`);
	for (let j = 0; j < currentPokemon['types'].length; j++) {
		pokeTypeContent.innerHTML += /*html*/ `
		<p class="pokeType">${currentPokemon['types'][j]['type']['name']}</p>`
	}
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

function renderBeginn() { //logo function
	content.innerHTML = ''
	startNumber = 0;
	finishNumber = 32;
	findPokemonInfos();
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
	}	// 1010 pokemon on api - currentAllPokemons['results'].length is longer 1281
	findPokemonInfos();
}

// ! beginn pokecard
function	openPokeCard(i) {
	i = checkNumber(i);
	loadCardPokemonInformation(i);
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
		let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
		let response = await fetch(url);
		currentCardPokemon = await response.json();
		renderPokeCard(i)
}

function renderPokeCard(i) {
	cardContent = document.getElementById('cardContent');
	cardContent.innerHTML = returnPokeCardHtml(i);
	showCardWrapper();
	renderCardContentAbout();
}

function showCardWrapper() {
	cardWrapper = document.getElementById('cardWrapper');
	cardWrapper.classList.remove('displayNone');
}

function renderCardContentAbout() {
	styleAboutH3();
	pokeCardContent = document.getElementById('pokeCardContent');
	pokeCardContent.innerHTML = returnPokeCardAboutHtml();
	showPokeCardAboutTypes();
	showPokeCardAboutAbilities();
}

function showPokeCardAboutTypes() {
	let cardType = document.getElementById('cardType')
	for (let j = 0; j < currentCardPokemon['types'].length; j++) {
	 cardType.innerHTML +=	returnPokeCardAboutTypesHtml(j);
	}
}

function showPokeCardAboutAbilities() {
	let cardAbility = document.getElementById('cardAbility')
	for (let j = 0; j < currentCardPokemon['abilities'].length; j++) {
	 cardAbility.innerHTML +=	returnPokeCardAbilityHtml(j);
	}
}

function renderCardContentMoves() {
	styleMovesH3();
	pokeCardContent = document.getElementById('pokeCardContent');
	pokeCardContent.innerHTML = returnPokeCardMovesHtml();
	fillCardMoves();
}

function fillCardMoves(i) {
	let cardMoves = document.getElementById('cardMoves')
	for (let i = 0; i < currentCardPokemon['moves'].length; i++) {
	 cardMoves.innerHTML +=	returnPokeCardMovesInsideHtml(i);
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

function searchPokemon() {
	clearTimeout(timeOut);
	timeOut = setTimeout(closeSearchField, 800);
}

function closeSearchField() {
	document.getElementById('search').disabled = true;
	searchFunction()
}

function openSearchField() {
	document.getElementById('search').disabled = false;
}

function searchFunction() {
	search = document.getElementById('search').value;
	if (search === ''){
		renderBeginn();
	}
	else{
		search = search.toLowerCase();
		content.innerHTML = ``;
		let counter = 0
		for (let i = 0; i < 1010; i++) {
			let name = currentAllPokemons['results'][i]['name'];
			if (name.includes(search)) {
				loadPokemonInfos(i);
				counter++
			}
		}
		if (counter == 0) {
			content.innerHTML = returnDontFoundHtml();
		}
	}
	openSearchField()
}
