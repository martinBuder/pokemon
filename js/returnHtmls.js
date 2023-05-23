function returnSmallPokeContainerHtml(i) {
	return /*html*/ `
		<div id="pokeContainer${i}" class="pokeContainer" onclick="openPokeCard(${i})" style="background: ${colorCode[`${currentPokemon['types'][0]['type']['name']}`]}">
			<h2>${currentPokemon['name']}</h2>
			<div id="pokeTypeContent${i}"></div>
			<img class="backgroundPokeImg" src="img/pokeball.png">
			<img class="pokeFrontImg" id="pokeImg" src=${currentPokemon['sprites']['other']['official-artwork']['front_default']} alt="">
		</div>	
	`
}

function returnPokeCardHtml(i) {
	return /*html*/ `
	<div class="cardWrapper displayNone" id="cardWrapper" onclick="closeCardWrapper()">
		<button onclick="openPokeCard(${i - 1})"><</button>
		<div class="closeX">x</div>
		<div class="cardBackgroundColor" style="background: ${colorCode[`${currentCardPokemon['types'][0]['type']['name']}`]}">
			<div class="cardContainer" id="pokeCardContainer" onclick="event.stopPropagation()">
				<div class="cardHeader">
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

function returnPokeCardAboutHtml() {
	return /*html*/ `
	<h4>type(s):</h4><p id="cardType"></p>
	<h4>height:</h4><p>${currentCardPokemon['height']}</p>
	<h4>weight:</h4><p>${currentCardPokemon['weight']}</p>
	<h4>abilities:</h4><p id="cardAbility"></p>
	`
}

function returnPokeCardAboutTypesHtml(j) {
	return /*html*/ `
	<div>${currentCardPokemon['types'][j]['type']['name']}</div>`;
}

function returnPokeCardAbilityHtml(j) {
	return /*html*/ `
	<div>${currentCardPokemon['abilities'][j]['ability']['name']}</div>`
}

function returnPokeCardMovesHtml(j) {
	return /*html*/ `
	<h4>moves:</h4><p id="cardMoves"></p>
	`;
}

function returnPokeCardMovesInsideHtml(i) {
	return /*html*/ `
	<div class="move"> 
	${currentCardPokemon['moves'][i]['move']['name']}</div>`
}

function returnDontFoundHtml() {
	return /*html*/ `
	<p class="searchInfo">Kein Pokemon mit diesem Namen gefunden!</p>
	`
}


