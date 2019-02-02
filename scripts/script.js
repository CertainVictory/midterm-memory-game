"use strict";
$(document).ready(function () {
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let choice = "Naruto"
  
  shuffle();

  $(document).on("click", ".btn_naruto", function(){
    console.log(choice)
    choice = "Naruto";
    $(".memory-game").html("");
    shuffle();
    startTimer();
    removeOverlay();
    flipCards();
  })

  $(document).on("click", ".btn_dbz", function(){
    choice = "DBZ";
    console.log(choice)
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
      "width": "100%",
      "height": "100%",
      "background-color": "rgba(0,0,0,.5)",
      "z-index": "10",
      "vertical-align": "middle",
      "text-align": "center",
      "color": "#fff",
      // "font-weight": "bold",
    }).appendTo("body");
  }

  function removeOverlay() {
    $(".overlay").hide();
  }

  displayOverlay(`
    <p>Will you be Hokage?</p>
    <button class="btn_naruto" type="button">Naruto</button>
    <button class="btn_dbz" type="button">Dragon Ball Z</button>`);


  //<------------TIMER--------->
  let sec = 10;
  function startTimer() {
  
    let timer = setInterval(function () {
      $('#time').html('00:' + sec);
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

  $(document).on("click", ".memory-card", function (e) {
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
    console.log($(firstCard).children().first().attr("src"));
    console.log($(secondCard).children().first().attr("src"));
    cardMatch(firstCard, secondCard);
  });

  //<-------------MATCH------------>
  function cardMatch(firstCard, secondCard) {
    let match = false;

    if ($(firstCard).children().first().attr("src") === $(secondCard).children().first().attr("src")) {
      match = true;
      if (match === true) {
        setTimeout(() => {
        $(firstCard).addClass("disappear");
        $(secondCard).addClass("disappear");
        }, 1000);
      }
      console.log(match)
    } else {
      // match = false;
      unflipCards()
      console.log(match)
    }
  }
  //<------------LOCK AND DISABLE------------->
  function disableCards() {
    firstCard.removeEventListener('click', function(){});
    secondCard.removeEventListener('click', function(){});

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
    <p>Will you be Hokage?</p>
    <button class="btn_naruto" type="button">Naruto</button>
    <button class="btn_dbz" type="button">Dragon Ball Z</button>`);
    sec = 10
  }


  //<-------WORK IN PROGRESS-------->

  $(document).on("click", ".btn-restart", function(){
    sec = 0
    console.log('HELLORES')
  })

  
})

  //<---------------END OF ready Doc----------------->
