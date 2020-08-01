$(document).ready(function () {
  //  globals
  var tileClicked = false;
  var firstTileClicked;
  var secondTileClicked;
  var topPosFir = 0;
  var leftPosFir = 0;
  var topPosSec = 0;
  var leftPosSec = 0;
  var moves = 0;
  var secs = 0;
  const cols = 3;
  const rows = 3;
  const image = "assets/puzzle1.jpeg";
  const imageSize = { width: 800, height: 600 };
  const paddingTopLeft = 30;
  const pieceWith = Math.ceil(imageSize.width / rows);
  const pieceHeight = Math.ceil(imageSize.height / cols);

  // console.log(pieceWith, pieceHeight);

  const size = Utils.getImageSize(image);

  size.then((d) => console.log(d));

  let colors = ["red", "yellow", "blue", "orange", "purple", "green"];

  let pieces = [];
  let currPos = 0;
  for (let indexRow = 0; indexRow < rows; indexRow++) {
    for (let indexCol = 0; indexCol < cols; indexCol++) {
      pieces.push({ top: pieceHeight * indexRow, left: pieceWith * indexCol, isOk: false, pos: currPos++ });
    }
  }

  pieces.map((value) => {
    value.top = value.top + paddingTopLeft;
    value.left = value.left + paddingTopLeft;
    value.color = colors.pop();
    const $new = $(`<div class="pieces" id="piece-${value.pos + 1}" data-pos="${value.pos + 1}"></div>`);
    // $new.css("background", `url(assets/piece${value.pos + 1}.jpg) no-repeat`);
    $new.css("background", `url(${image}) no-repeat`);
    $new.css("background-size", `${pieceWith * cols}px ${pieceHeight * rows}px`);
    $new.css({ width: pieceWith, height: pieceHeight });
    $new.css(value);
    $new.css("background-position", `${(value.left - paddingTopLeft) * -1} ${(value.top - paddingTopLeft) * -1}`);
    $new.css(`:before`, `color: ${value.color}`);

    const e = $("article").append($new);
  });

  function shuffleTiles() {
    const places = Utils.shuffleArray(JSON.parse(JSON.stringify(pieces)));
    pieces.map((value) => {
      $(`#piece-${value.pos + 1}`).css(places.pop());
    });
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
