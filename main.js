//  author Piers Rueb

$(document).ready(function () {
  //  globals

  var tileClicked = false;
  var firstTileClicked;
  var secondTileClicked;
  var topPosFir = 0;
  var leftPosFir = 0;
  var topPosSec = 0;
  var leftPosSec = 0;
  var shuffle = Math.floor(Math.random() * 4 + 1);
  var moves = 0;
  var secs = 0;
  const paddingTopLeft = 30;
  const pieceWith = 265;
  const pieceHeight = 305;
  const cols = 3;
  const rows = 2;

  let colors = ["red", "yellow", "blue", "orange", "purple", "green"];

  const pieces = [
    { top: 0, left: 0, isOk: false, pos: 0 },
    { top: 0, left: pieceWith, isOk: false, pos: 1 },
    { top: 0, left: pieceWith * 2, isOk: false, pos: 2 },

    { top: pieceHeight, left: 0, isOk: false, pos: 3 },
    { top: pieceHeight, left: pieceWith, isOk: false, pos: 4 },
    { top: pieceHeight, left: pieceWith * 2, isOk: false, pos: 5 },
  ];

  pieces.map((value) => {
    value.top = value.top + paddingTopLeft;
    value.left = value.left + paddingTopLeft;
    value.color = colors.pop();
    const $new = $(`<div class="pieces" id="piece-${value.pos + 1}" data-pos="${value.pos + 1}"></div>`);
    // $new.css("background", `url(assets/piece${value.pos + 1}.jpg) no-repeat`);
    $new.css("background", `url(assets/puzzle1.jpeg) no-repeat`);
    $new.css("background-size", `${pieceWith * cols}px ${pieceHeight * rows}px`);
    $new.css({ width: pieceWith, height: pieceHeight });
    $new.css("background-position", `${(value.left - paddingTopLeft) * -1} ${(value.top - paddingTopLeft) * -1}`);
    $new.css(`:before`, `color: ${value.color}`);

    const e = $("article").append($new);
  });

  function shuffleTiles() {
    if (shuffle == 1) {
      $("#piece-1").css(pieces[5]);
      $("#piece-2").css(pieces[2]);
      $("#piece-3").css(pieces[4]);
      $("#piece-4").css(pieces[1]);
      $("#piece-5").css(pieces[3]);
      $("#piece-6").css(pieces[0]);
    } else if (shuffle == 2) {
      $("#piece-1").css(pieces[3]);
      $("#piece-2").css(pieces[0]);
      $("#piece-3").css(pieces[4]);
      $("#piece-4").css(pieces[1]);
      $("#piece-5").css(pieces[5]);
      $("#piece-6").css(pieces[2]);
    } else if (shuffle == 3) {
      $("#piece-1").css(pieces[2]);
      $("#piece-2").css(pieces[0]);
      $("#piece-3").css(pieces[4]);
      $("#piece-4").css(pieces[5]);
      $("#piece-5").css(pieces[1]);
      $("#piece-6").css(pieces[3]);
    } else if (shuffle == 4) {
      $("#piece-1").css(pieces[2]);
      $("#piece-2").css(pieces[5]);
      $("#piece-3").css(pieces[1]);
      $("#piece-4").css(pieces[4]);
      $("#piece-5").css(pieces[0]);
      $("#piece-6").css(pieces[3]);
    }
  }

  $(window).load(function () {
    setTimeout(function () {
      shuffleTiles();
      setInterval(function () {
        secs++;
      }, 0);
    }, 0);
  });

  //  play the game
  $(".pieces").click(function () {
    if (tileClicked == false) {
      //  if no tile is clicked

      //  set variables
      firstTileClicked = $(this).attr("id");
      topPosFir = parseInt($(this).css("top"));
      leftPosFir = parseInt($(this).css("left"));

      //  highlight tile
      $(this).addClass("glow");
      tileClicked = true;
    } else {
      //  if you've clicked a tile

      //  set variables
      secondTileClicked = $(this).attr("id");
      topPosSec = parseInt($(this).css("top"));
      leftPosSec = parseInt($(this).css("left"));

      //  animations
      $("#" + firstTileClicked).css({ top: topPosSec, left: leftPosSec });
      $("#" + secondTileClicked).css({ top: topPosFir, left: leftPosFir });

      //  remove the glow and reset the first tile
      $(".pieces").removeClass("glow");
      tileClicked = false;

      //  test for the win
      setTimeout(function () {
        pieces.forEach((p) => {
          p.isOk = $(`#piece-${p.pos + 1}`).css("left") == `${p.left}px` && $(`#piece-${p.pos + 1}`).css("top") == `${p.top}px`;
        });

        if (pieces.filter((i) => !i.isOk).length === 0) {
          $("p").text("You have solved the puzzle in " + secs + " seconds using " + moves + " moves!!");
          $("article").addClass("glow-2");
          moves = 0;
        }
      }, 1000);

      //  increment the move counter
      moves++;
    }
  }); //  end the click function
});
