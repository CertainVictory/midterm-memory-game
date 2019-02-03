"use strict";
$(document).ready(function () {
  idleMusic();
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let timer = 0;
  let choice = "Naruto";
  let matches = 0;
  shuffle();

//<---logic for overlay button theme--->
  $(document).on("click", ".btn_naruto", function () {
    choice = "Naruto";
    $('audio#idle')[0].pause()
    $('audio#idle')[0].currentTime = 0
    $(".title").attr("src", "/Assets/Images/Header/Animemory Logo 2.png");
    $(".memory-game").html("");
    shuffle();
    startTimer();
    removeOverlay();
    bgMusic();
    flipCards();

  })

  $(document).on("click", ".btn_dbz", function () {
    choice = "DBZ";
    $('audio#idle')[0].pause()
    $('audio#idle')[0].currentTime = 0
    $(".title").attr("src", "/Assets/Images/Header/Animemory Logo.png");
    $(".memory-game").html("");
    shuffle();
    startTimer();
    removeOverlay();
    bgMusic()
    flipCards();

  })

  $(document).on("click", ".btn_meme", function () {
    choice = "Meme";
    $('audio#idle')[0].pause()
    $('audio#idle')[0].currentTime = 0
    $(".title").attr("src", "/Assets/Images/Header/Mememory Logo.png");
    $(".memory-game").html("");
    shuffle();
    startTimer();
    removeOverlay();
    bgMusic();
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
//<---Default Overlay--->
  displayOverlay(`
  <h3>WELCOME TO ANIMEMORY!</h3>
  <p>There are 3 paths to choose from</p>
  <p>So Choose Wisely . . .</p>
  <img class="btn_naruto" src="Assets/Images/Naruto/Back.png"/>
  <img class="btn_dbz" src="Assets/Images/DBZ/Back.png"/>
  <img class="btn_meme" src="Assets/Images/Meme/Back.png"/>
  `);

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

  //<----------GAME FUNCTION---------->

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

  //<-------------MATCH------------>
  function cardMatch(firstCard, secondCard) {

    if ($(firstCard).children().first().attr("src") === $(secondCard).children().first().attr("src")) {
      matches++;
      setTimeout(() => {
        jutsu();
        $(firstCard).addClass("disappear");
        $(secondCard).addClass("disappear");
        disableCards()
      }, 1000);
    } else {
      unflipCards()
    }

    if (matches === 6) {
      winGame();
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

    setTimeout(() => {
      matches = 0
      $('audio#never')[0].pause()
      $('audio#never')[0].currentTime = 0
      $('audio#naruto')[0].pause()
      $('audio#naruto')[0].currentTime = 0
      $('audio#dbz')[0].pause()
      $('audio#dbz')[0].currentTime = 0
      $(".memory-game").html("");
      clearInterval(timer)
      shuffle();
      displayOverlay(`
      <p>YOU LOSE :(</p>
      <p>Try again?</p>
      <p>Choose Wisely . . .</p>
      <img class="btn_naruto" src="Assets/Images/Naruto/Back.png"/>
      <img class="btn_dbz" src="Assets/Images/DBZ/Back.png"/>
      <img class="btn_meme" src="Assets/Images/Meme/Back.png"/>`);
      sec = 90
      idleMusic();
    }, 1000);
  }

  function winGame() {

    setTimeout(() => {
      matches = 0
      $('audio#never')[0].pause()
      $('audio#never')[0].currentTime = 0
      $('audio#naruto')[0].pause()
      $('audio#naruto')[0].currentTime = 0
      $('audio#dbz')[0].pause()
      $('audio#dbz')[0].currentTime = 0
      $(".memory-game").html("");
      clearInterval(timer)
      shuffle();
      displayOverlay(`
      <h3>YOU WIN!</h3>
      <p>Try another path</p>
      <p>Choose Wisely . . .</p>
      <img class="btn_naruto" src="Assets/Images/Naruto/Back.png"/>
      <img class="btn_dbz" src="Assets/Images/DBZ/Back.png"/>
      <img class="btn_meme" src="Assets/Images/Meme/Back.png"/>`);
      sec = 90
      idleMusic();
    }, 2000);
  }

  $(document).on("click", ".btn-restart", function () {
    matches = 0
    $('audio#never')[0].pause() //pauses music on restart click
    $('audio#never')[0].currentTime = 0
    $('audio#naruto')[0].pause()
    $('audio#naruto')[0].currentTime = 0
    $('audio#dbz')[0].pause()
    $('audio#dbz')[0].currentTime = 0
    $(".memory-game").html("");
    shuffle(); //shuffles cards up
    clearInterval(timer) //clears timer to 0
    displayOverlay(`
    <p>Do it for real this time!</p>
    <p>Choose Wisely . . .</p>
    <img class="btn_naruto" src="Assets/Images/Naruto/Back.png"/>
    <img class="btn_dbz" src="Assets/Images/DBZ/Back.png"/>
    <img class="btn_meme" src="Assets/Images/Meme/Back.png"/>`);
    //^^displays overlay with choose wisely and restart specific message
    idleMusic(); //calls for self-named function for audio to be played
    sec = 90
  })



  //<-----------MUSIC------------>

  function bgMusic() {
    if (choice === "Naruto"){
      $('audio#naruto')[0].play()
      $('audio#naruto').prop("volume", 0.06);
    }
    if (choice === "DBZ"){
      $('audio#dbz')[0].play()
      $('audio#dbz').prop("volume", 0.04);
    }
    if (choice === "Meme"){
      $('audio#never')[0].play()
      $('audio#never').prop("volume", 0.04);
    }
  }

    //<-----------MUSIC on overlay------------>

  function idleMusic() {
    $('audio#idle')[0].play()
    $('audio#idle').prop("volume", 0.02);
  }

  //<------Card Disappear Sound effects------>

  function jutsu() {
    if (choice === "Naruto") {
      $('audio#jutsu')[0].play()
      $('audio#justu').prop("volume", .07);
    }
    if (choice === "DBZ") {
      $('audio#teleport')[0].play()
      $('audio#teleport').prop("volume", .08);
    }
    if (choice === "Meme") {
      $('audio#bye')[0].play()
      $('audio#bye').prop("volume", .07);
    }
  }



})

  //<---------------END OF ready Doc----------------->