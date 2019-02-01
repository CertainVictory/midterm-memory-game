"use strict";

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
 let nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

for (let i = 0; i < 12; i++) {
  let imageNumber = Math.floor(Math.random() * nums.length);
  
  $(".memory-game").append(`
  <div class="memory-card">
    <img class="front-face" src="/Assets/Images/Naruto/${nums[imageNumber]}.png"/>
    <img class="back-face" src="Assets/Images/Naruto/Back.png"/>
  </div>`
  );
  
  nums.splice(imageNumber, 1)
}
$(".memory-card").on("click", function(e) {
  if (lockBoard) return;
  if (this === firstCard) return;
  $(e.target.parentElement).addClass('flip');
  if (!hasFlippedCard) {
    //first card
    hasFlippedCard = true;
    firstCard = e.target.parentElement;


    disableCards();
 
  } else {
    // second card
    hasFlippedCard = false;
    secondCard = e.target.parentElement;

    // unflipCards()
  }
  console.log($(firstCard).children().first().attr("src"));
  console.log($(secondCard).children().first().attr("src"));
  cardMatch(firstCard, secondCard);
});
function cardMatch(firstCard, secondCard) {
  if ($(firstCard).children().first().attr("src") === $(secondCard).children().first().attr("src")) {
    

  } else {

    unflipCards()
    // firstCard = null;
    // secondCard = null;
  }

}

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1000);
  }
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
;



