let currentAllPokemons;
let currentPokemon;
let currentCardPokemon;
let search;
let startNumber = 0;
let finishNumber = 32;

let content;
let cardContent;
let cardWrapper;
let pokeCardContent;
let pokeName;


let statsBtn;
let evoBtn;
let movesBtn;
let aboutBtn;

let timeOut;

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