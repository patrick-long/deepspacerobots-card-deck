class CardDeck {
	constructor(deckElement, handElement) {
		this.deckElement = document.querySelector(deckElement);
		this.handElement = document.querySelector(handElement);
		this.deck = [
			{ id: "c-2", name: "2 of Clubs", rank: 2, suit: "clubs" },
			{ id: "c-3", name: "3 of Clubs", rank: 3, suit: "clubs" },
			{ id: "c-4", name: "4 of Clubs", rank: 4, suit: "clubs" },
			{ id: "c-5", name: "5 of Clubs", rank: 5, suit: "clubs" },
			{ id: "c-6", name: "6 of Clubs", rank: 6, suit: "clubs" },
			{ id: "c-7", name: "7 of Clubs", rank: 7, suit: "clubs" },
			{ id: "c-8", name: "8 of Clubs", rank: 8, suit: "clubs" },
			{ id: "c-9", name: "9 of Clubs", rank: 9, suit: "clubs" },
			{ id: "c-10", name: "10 of Clubs", rank: 10, suit: "clubs" },
			{ id: "c-J", name: "Jack of Clubs", rank: 11, suit: "clubs" },
			{ id: "c-Q", name: "Queen of Clubs", rank: 12, suit: "clubs" },
			{ id: "c-K", name: "King of Clubs", rank: 13, suit: "clubs" },
			{ id: "c-A", name: "Ace of Clubs", rank: 14, suit: "clubs" },
			{ id: "d-2", name: "2 of Diamonds", rank: 2, suit: "diamonds" },
			{ id: "d-3", name: "3 of Diamonds", rank: 3, suit: "diamonds" },
			{ id: "d-4", name: "4 of Diamonds", rank: 4, suit: "diamonds" },
			{ id: "d-5", name: "5 of Diamonds", rank: 5, suit: "diamonds" },
			{ id: "d-6", name: "6 of Diamonds", rank: 6, suit: "diamonds" },
			{ id: "d-7", name: "7 of Diamonds", rank: 7, suit: "diamonds" },
			{ id: "d-8", name: "8 of Diamonds", rank: 8, suit: "diamonds" },
			{ id: "d-9", name: "9 of Diamonds", rank: 9, suit: "diamonds" },
			{ id: "d-10", name: "10 of Diamonds", rank: 10, suit: "diamonds" },
			{ id: "d-J", name: "Jack of Diamonds", rank: 11, suit: "diamonds" },
			{ id: "d-Q", name: "Queen of Diamonds", rank: 12, suit: "diamonds" },
			{ id: "d-K", name: "King of Diamonds", rank: 13, suit: "diamonds" },
			{ id: "d-A", name: "Ace of Diamonds", rank: 14, suit: "diamonds" },
			{ id: "h-2", name: "2 of Hearts", rank: 2, suit: "hearts" },
			{ id: "h-3", name: "3 of Hearts", rank: 3, suit: "hearts" },
			{ id: "h-4", name: "4 of Hearts", rank: 4, suit: "hearts" },
			{ id: "h-5", name: "5 of Hearts", rank: 5, suit: "hearts" },
			{ id: "h-6", name: "6 of Hearts", rank: 6, suit: "hearts" },
			{ id: "h-7", name: "7 of Hearts", rank: 7, suit: "hearts" },
			{ id: "h-8", name: "8 of Hearts", rank: 8, suit: "hearts" },
			{ id: "h-9", name: "9 of Hearts", rank: 9, suit: "hearts" },
			{ id: "h-10", name: "10 of Hearts", rank: 10, suit: "hearts" },
			{ id: "h-J", name: "Jack of Hearts", rank: 11, suit: "hearts" },
			{ id: "h-Q", name: "Queen of Hearts", rank: 12, suit: "hearts" },
			{ id: "h-K", name: "King of Hearts", rank: 13, suit: "hearts" },
			{ id: "h-A", name: "Ace of Hearts", rank: 14, suit: "hearts" },
			{ id: "s-2", name: "2 of Spades", rank: 2, suit: "spades" },
			{ id: "s-3", name: "3 of Spades", rank: 3, suit: "spades" },
			{ id: "s-4", name: "4 of Spades", rank: 4, suit: "spades" },
			{ id: "s-5", name: "5 of Spades", rank: 5, suit: "spades" },
			{ id: "s-6", name: "6 of Spades", rank: 6, suit: "spades" },
			{ id: "s-7", name: "7 of Spades", rank: 7, suit: "spades" },
			{ id: "s-8", name: "8 of Spades", rank: 8, suit: "spades" },
			{ id: "s-9", name: "9 of Spades", rank: 9, suit: "spades" },
			{ id: "s-10", name: "10 of Spades", rank: 10, suit: "spades" },
			{ id: "s-J", name: "Jack of Spades", rank: 11, suit: "spades" },
			{ id: "s-Q", name: "Queen of Spades", rank: 12, suit: "spades" },
			{ id: "s-K", name: "King of Spades", rank: 13, suit: "spades" },
			{ id: "s-A", name: "Ace of Spades", rank: 14, suit: "spades" },
		];
		this.possibleCards = [...this.deck];
		this.hand = [];
		this.init();
	}
	init() {
		this.shuffleDeck();

		let cardElements = document.querySelectorAll(".card");

		cardElements.forEach((cardElement) => {
			cardElement.addEventListener("click", (e) => {
				if (cardElement.dataset.inHand == "true") {
					this.discard(cardElement.id);
				} else {
					this.draw(cardElement.id);
				}
			});
		});
	}

	generateRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}

	buildCard(card, inHand = false) {
		return `
		<div id="${card.id}" class="card" data-in-hand="${inHand}" data-rank="${card.rank}" data-suit="${card.suit}">
			<div class="card-face-wrapper">
				<img alt="${card.name}" src="assets/cards/${card.id}.svg">
				<div class="card-back"></div>
			</div>
		</div>`;
	}

	buildDeck() {
		this.deckElement.innerHTML = "";

		this.deck.forEach((card) => {
			let cardString = this.buildCard(card);
			this.deckElement.insertAdjacentHTML("beforeend", cardString);
		});
		let cardElements = this.deckElement.children;
		for (let cardElement of cardElements) {
			this.ruffleCardElement(cardElement);
		}
	}

	shuffleDeck() {
		for (let i = this.deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
		this.buildDeck();
		this.possibleCards = [...this.deck];
	}

	ruffleCardElement(cardElement) {
		let rotation = this.generateRandomNumber(-10, 10) + "deg";
		let X = this.generateRandomNumber(-10, 10) + "px";
		let Y = this.generateRandomNumber(-10, 10) + "px";
		cardElement.style.transform = `rotate(${rotation}) translate3D(${X}, ${Y}, 0px)`;
	}

	draw(id) {
		let card = this.deck.find((x) => x.id === id);
		let cardElement = document.getElementById(id);
		cardElement.style.transform = "";

		this.hand.push(card);
		this.deck = this.deck.filter((deckCard) => deckCard.id != id);

		this.handElement.appendChild(cardElement);
		// setTimeout(() => {
			document.getElementById(id).dataset.inHand = "true";
		// }, 100);
	}

	discard(id) {
		let card = this.hand.find((x) => x.id === id);
		let cardElement = document.getElementById(id);

		this.deck.push(card);
		this.hand = this.hand.filter((handCard) => handCard.id != id);

		document.getElementById(id).dataset.inHand = "false";
		setTimeout(() => {
			this.deckElement.appendChild(cardElement);
			this.ruffleCardElement(cardElement);
		}, 600);
	}

	sort() {
		this.hand = this.hand.sort((a, b) =>
			a.suit > b.suit ? 1 : a.suit === b.suit ? (a.rank > b.rank ? 1 : -1) : -1
		);
	}

	filter(cardProp = null, values = []) {
		this.possibleCards = this.possibleCards.filter((card) => values.includes(card[cardProp]));
	}

	limit(number) {
		this.possibleCards = this.possibleCards.slice(0, number);
	}

	drawFiltered() {
		this.possibleCards.forEach((card) => {
			this.draw(card.id);
		});
	}
}

/*------------------------------------------*/
//  Use the above predefined class and its
//  methods to complete the challenge.
//
//  Your code goes below this comment.
/*------------------------------------------*/

// Get query parameters from url
const urlSearchAParams = new URLSearchParams(window.location.search);
const queryParams = Object.fromEntries(urlSearchAParams.entries());


// Create a new card deck.
const deck = new CardDeck(".deck", ".hand");
let cardOptions = [];
let finalCardSelection = [];


/**
 * Transforms ranks from a string to an integer if not already an integer
 * @param {string || number} rank 
 * @returns 
 */
const transformRanks = rank => {
	return rank = rank === 'J'
		? 11
		: rank === 'Q'
		? 12
		: rank === 'K'
		? 13
		: rank === 'A'
		? 14
		: rank
};


/**
 * Attempts to find the current card's id in the url search params
 * @param {object} card - the current card
 * @returns true if found or false if not found
 */
const findCardInQueryParams = card => {
	return queryParams.cards.includes(card.id) ? true : false;
}


/**
 * Attempts to find the current card's rank in the url search params
 * @param {object} card - the current card
 * @returns true if found or false if not found
 */
const findRankInQueryParams = card => {
	return queryParams.ranks.find(cardIteration => cardIteration == card.rank) ? true : false;
}


/**
 * Attempts to find the current card's suit in the url search params
 * @param {object} card - the current card
 * @returns true if found or false if not found
 */
const findSuitInQueryParams = card => {
	return queryParams.suits.includes(card.suit) ? true : false;
}


/**
 * Handles sorting the cards that are currently in your hand
 * @param {object} card - the current card object in your hand
 */
const handleSorting = (card) => {
	setTimeout(() => {
		deck.draw(card.id);
	}, 600);
}


// Handle queryParam instances based on key
if (queryParams) {
	if (queryParams.cards) {
		const individualCards = queryParams.cards.split(' ');
		for (let individualCard of individualCards) {
			const filteredPossibleCards = deck.possibleCards.filter(card => card.id === individualCard);
			cardOptions.push(...filteredPossibleCards);
		}
	}

	if (queryParams.suits) {
		const individualSuits = queryParams.suits.split(' ');
		for (let suit of individualSuits) {
			const filteredPossibleCards = deck.possibleCards.filter(card => card.suit === suit);
			cardOptions.push(...filteredPossibleCards);
		}
	}

	if (queryParams.ranks) {
		const individualRanks = queryParams.ranks.split(' ');
		for (let rank of individualRanks) {
			transformRanks(rank);
			const filteredPossibleCards = deck.possibleCards.filter(card => card.rank == rank);
			cardOptions.push(...filteredPossibleCards);
		}
	}

	if (queryParams.pleaseletmedraweverycard) {
		const everyCardButton = document.createElement('button');
		everyCardButton.setAttribute('class', 'every-card-button');
		everyCardButton.innerHTML = 'Click Me!';
		everyCardButton.addEventListener('click', () => {
			console.log(`If you have the console open, thanks for clicking my bonus hidden button :)`);
			deck.drawFiltered();
		})
		
		const tableDiv = document.getElementsByClassName('table');
		tableDiv[0].appendChild(everyCardButton);
	}
}


// Transform queryParams.ranks
if (queryParams) {
	if (queryParams.ranks) {
		let finalRanks = [];
		const splitRanks = queryParams.ranks.split(' ');

		for (let rank of splitRanks) {
			const transformedRank = transformRanks(rank);
			finalRanks.push(transformedRank);
		}
		queryParams.ranks = finalRanks;
	}
}


// Handle drawing cards based on queryParams
for (let card of cardOptions) {
	let isValid;

	if (queryParams.cards && queryParams.ranks && queryParams.suits) {
		isValid = findCardInQueryParams(card)
			&& findRankInQueryParams(card)
			&& findSuitInQueryParams(card)
			? true
			: false;
	} else if (queryParams.cards && queryParams.ranks) {
		isValid = findCardInQueryParams(card)
			&& findRankInQueryParams(card)
			? true
			: false;
	} else if (queryParams.ranks && queryParams.suits) {
		isValid = findRankInQueryParams(card)
			&& findSuitInQueryParams(card)
			? true
			: false;
	} else if (queryParams.cards && queryParams.suits) {
		isValid = findCardInQueryParams(card)
			&& findSuitInQueryParams(card)
			? true
			: false;
	} else if (queryParams.cards) {
		isValid = findCardInQueryParams(card);
	} else if (queryParams.ranks) {
		isValid = findRankInQueryParams(card);
	} else if (queryParams.suits) {
		isValid = findSuitInQueryParams(card);
	}

	if (isValid && !finalCardSelection.find(selectedCard => selectedCard.id === card.id)) {
		finalCardSelection.push(card);
	}
}


// Handle drawing cards based on limit queryParam
if (finalCardSelection && finalCardSelection.length > 0) {
	if (queryParams.limit && queryParams.limit < finalCardSelection.length) {
		for (let i = 0; i < queryParams.limit; i++) {
			const selectionIndex = Math.floor(Math.random() * finalCardSelection.length);
			deck.draw(finalCardSelection[selectionIndex].id);
			finalCardSelection.splice(selectionIndex, 1);
		}
	} else {
		for (let card of finalCardSelection) {
			deck.draw(card.id);
		}
	}
}


/**
 * Creates a button with the class "sort-cards-button"
 */
const createSortCardsButton = () => {
	const sortCardsButton = document.createElement('button');
	sortCardsButton.setAttribute('class', 'sort-cards-button');
	sortCardsButton.innerHTML = 'SORT YOUR CARDS';
	sortCardsButton.addEventListener('click', () => {
		deck.sort();
		const yourHand = deck.hand;
		
		for (let card of deck.hand) {
			deck.discard(card.id);
		}
		
		for (let card of yourHand) {
			handleSorting(card);
		}
	})
	const tableDiv = document.getElementsByClassName('table');
	tableDiv[0].appendChild(sortCardsButton);
}


/**
 * Removes the button of class "sort-cards-button" from the DOM
 */
const removeSortCardsButton = () => {
	const sortCardsButton = document.getElementsByClassName('sort-cards-button');
	sortCardsButton[0].remove();
}


// Create sort card button if hand length is greater than 1 at compilation
if (deck.hand && deck.hand.length > 1) {
	createSortCardsButton();
}


// Create sort card button if hand length is greater than 1 at any point thereafter
const DOMCards = document.getElementsByClassName('card');
for (let DOMCard of DOMCards) {
	DOMCard.addEventListener('click', () => {
		if (deck.hand && deck.hand.length > 1 && document.getElementsByClassName('sort-cards-button').length === 0) {
			createSortCardsButton();
		} else if (deck.hand && deck.hand.length <= 1 && document.getElementsByClassName('sort-cards-button').length > 0) {
			removeSortCardsButton();
		}
	})
}