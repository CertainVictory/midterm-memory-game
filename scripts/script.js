const cards = $('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.on("click", function(e) {
  if (lockBoard) return;
  if (this === firstCard) return;

  $(e.target.parentElement).addClass('flip');

  if (!hasFlippedCard) {
    //first card
    hasFlippedCard = true;
    firstCard = $(e.target.parentElement);
  } else {
    // second card
    hasFlippedCard = false;
    secondCard = $(e.target.parentElement);
  }
  
})

