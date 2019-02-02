"use strict";
$(document).ready(function () {
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let timer = 0;
  let choice = "Naruto";

  shuffle();

  $(document).on("click", ".btn_naruto", function () {

    choice = "Naruto";
    $(".title").attr("src","/Assets/Images/Header/Animemory Logo.png");
    $(".memory-game").html("");
    shuffle();
    startTimer();
    removeOverlay();
    flipCards();
  })

  $(document).on("click", ".btn_dbz", function () {
    choice = "DBZ";
    $(".title").attr("src","/Assets/Images/Header/Animemory Logo.png");
    $(".memory-game").html("");
    shuffle();
    startTimer();
    removeOverlay();
    flipCards();
  })

  $(document).on("click", ".btn_meme", function () {
    choice = "Meme";
    $(".title").attr("src","/Assets/Images/Header/Mememory Logo.png");
    $(".memory-game").html("");
    shuffle();
    startTimer();
    removeOverlay();
    flipCards();
  })



  //<----------OVERLAY STYLE---------->
  function displayOverlay(text) {
    $("<table class='overlay'><tbody><tr><td>" + text + "</td></tr></tbody></table>").css({
      "position": "fixed",
      "top": "0px",
      "left": "0px",
      "width": "100vw",
      "height": "100vh",
      "background-color": "rgba(0,0,0,.5)",
      "z-index": "10",
      "vertical-align": "middle",
      "text-align": "center",
      "color": "#fff"
    }).appendTo("body");
  }

  function removeOverlay() {
    $(".overlay").hide();
  }

  displayOverlay(`
  <p>Choose Wisely . . .</p>
  <button class="btn_naruto" type="button">Naruto</button>
  <button class="btn_dbz" type="button">Dragon Ball Z</button>
  <button class="btn_meme" type="button">Meme</button>`);

  //<------------TIMER--------->
  let sec = 90;
  function startTimer() {

    timer = setInterval(function () {
      $('#time').html(sec);
      sec--;
      if (sec < 0) {
        clearInterval(timer)
        loseGame()

      }
    }, 1000);
  }

  //<------------------------------GAME FUNCTION------------------------------>

  //<-----------SHUFFLE------------>
  function shuffle() {

    let nums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    for (let i = 0; i < 12; i++) {
      let imageNumber = Math.floor(Math.random() * nums.length);

      $(".memory-game").append(`
    <div class="memory-card">
      <img class="front-face" src="/Assets/Images/${choice}/${nums[imageNumber]}.png"/>
      <img class="back-face" src="Assets/Images/${choice}/Back.png"/>
    </div>`
      );

      nums.splice(imageNumber, 1)
    }
  }

  //<----TRYING TO MAKE THIS WORK


  //<-----------------FLIP------------>
// function flipCards(){
  $(document).on("click", ".memory-card", function flipCards(e) {
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

    }
    cardMatch(firstCard, secondCard);
  });
// }

  //<-------------MATCH------------>
  function cardMatch(firstCard, secondCard) {

    if ($(firstCard).children().first().attr("src") === $(secondCard).children().first().attr("src")) {
        setTimeout(() => {
          $(firstCard).addClass("disappear");
          $(secondCard).addClass("disappear");
          disableCards()
        }, 1000);
    } else {
      // match = false;
      unflipCards()
    }
  }
  //<------------LOCK AND DISABLE------------->
  function disableCards() {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);

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
  };

  function loseGame() {
    $(".memory-game").html("");
    shuffle();
    displayOverlay(`
    <p>Choose Wisely . . .</p>
    <button class="btn_naruto" type="button">Naruto</button>
    <button class="btn_dbz" type="button">Dragon Ball Z</button>
    <button class="btn_meme" type="button">Meme</button>`);
    sec = 90
  }

  $(document).on("click", ".btn-restart", function () {
    $(".memory-game").html("");
    shuffle();
    clearInterval(timer)
    displayOverlay(`
    <p>Choose Wisely . . .</p>
    <button class="btn_naruto" type="button">Naruto</button>
    <button class="btn_dbz" type="button">Dragon Ball Z</button>
    <button class="btn_meme" type="button">Meme</button>`);
    sec = 90
  })


})

  //<---------------END OF ready Doc----------------->