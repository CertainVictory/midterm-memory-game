"use strict";
$(document).ready(function () {

  shuffle();
  //<----------OVERLAY STYLE---------->
  function displayOverlay(text) {
    $("<table id='overlay'><tbody><tr><td>" + text + "</td></tr></tbody></table>").css({
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
    $("#overlay").remove();
  }

  $("body").click(function () {
    if ($("#btn_style").length > 0) {
      removeOverlay();
    }

  });
  displayOverlay(`
    <p>Will you be Hokage?</p>
    <button id="btn_style" type="button">START</button>`);


  //<------------TIMER--------->
  function startTimer() {
    var sec = 10;
    var timer = setInterval(function () {
      $('#time').html('00:' + sec);
      sec--;
      if (sec < 0) {
        clearInterval(timer)
        loseGame()

      }
    }, 1000);
  }



  $("#btn_style").on("click", function () {
    startTimer()

  });

  //<------------------------------GAME FUNCTION------------------------------>

  //<-----------SHUFFLE------------>

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  function shuffle() {

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
  }

//<----TRYING TO MAKE THIS WORK
function reShuffle(){
  (".memory-game").append(`
    <div class="memory-card">

    </div>`
      )
}


  //<-----------------FLIP------------>

  $(".memory-card").on("click", function (e) {
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
  };

  function loseGame() {
    displayOverlay(`
    <p>Will you be Hokage?</p>
    <button id="btn_style" type="button">FUCKING WORK</button>
    `);
  }


  //<-------WORK IN PROGRESS-------->
  // function restartGame(){
    
  // }
})

  //<---------------END OF ready Doc----------------->
