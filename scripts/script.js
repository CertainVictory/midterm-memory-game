"use strict";
$(document).ready(function () {
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
//<-------------OVERLAY STYLE END------------>
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
    
function startTimer() {
  var counter = 0;
var timeleft = 300;

function startTimer(duration, display) {
 var timer = duration, minutes, seconds;
 setInterval(function () {
     minutes = parseInt(timer / 60, 10);
     seconds = parseInt(timer % 60, 10);

     minutes = minutes < 10 ? "0" + minutes : minutes;
     seconds = seconds < 10 ? "0" + seconds : seconds;

     display.text(minutes + ":" + seconds);

     if (--timer < 0) {
         timer = duration;
     }
 }, 1000);
}

jQuery(function ($) {
 var fiveMinutes = 60 * 2,
     display = $('#time');
 startTimer(fiveMinutes, display);
});

  console.log("timer start")
}

$("#btn_style").on("click", function() {
  startTimer();
});

  
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
  function cardMatch(firstCard, secondCard) {
    if ($(firstCard).children().first().attr("src") === $(secondCard).children().first().attr("src")) {


    } else {
      unflipCards()
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
  //<---------------END OF ready Doc----------------->
})