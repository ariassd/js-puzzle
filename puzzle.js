// enum game status
const GAME_STATUS = {
  PLAYING: 1,
  STOPPED: 2,
};
// class Puzzle
function Puzzle({ imageSize, imageUrl, language, containerElement, onGameOver }) {
  // Properties
  this.image = imageUrl;
  this.imageSize = imageSize;
  this.language = language;

  this.moves = 0;
  this.secs = 0;
  this.gameStatus = GAME_STATUS.STOPPED;
  this.cols = 3;
  this.rows = 3;

  console.log();

  this.paddingTopLeft = 0;
  this.pieceWith = Math.ceil(containerElement.width() / this.cols);
  const newHeight = (imageSize.height * containerElement.width()) / imageSize.width;
  this.pieceHeight = Math.ceil(newHeight / this.rows); // get proportions
  this.pieces = [];
  this.timerInterval;

  // events
  this.onGameOver = onGameOver;

  /**
   * Build and set positions to each piece in the puzzle
   *
   */
  this.buildStage = function () {
    $(containerElement).empty();
    this.pieces = [];
    let colors = Object.values(JSON.parse(JSON.stringify(constants.PiecesColors)));
    let currPos = 0;
    for (let indexRow = 0; indexRow < this.rows; indexRow++) {
      for (let indexCol = 0; indexCol < this.cols; indexCol++) {
        this.pieces.push({ top: this.pieceHeight * indexRow, left: this.pieceWith * indexCol, isOk: false, pos: currPos++ });
      }
    }

    this.pieces.map((value, i) => {
      value.top = value.top + this.paddingTopLeft;
      value.left = value.left + this.paddingTopLeft;
      value.color = colors[i];
      const $new = $(`<div class="pieces" id="piece-${value.pos + 1}" data-pos="${value.pos + 1}"></div>`);
      // $new.css("background", `url(assets/piece${value.pos + 1}.jpg) no-repeat`);
      $new.css("background", `url(${this.image}) no-repeat`);
      $new.css("background-size", `${this.pieceWith * this.cols}px ${this.pieceHeight * this.rows}px`);
      $new.css({ width: this.pieceWith, height: this.pieceHeight });
      $new.css(value);
      $new.css("background-position", `${(value.left - this.paddingTopLeft) * -1} ${(value.top - this.paddingTopLeft) * -1}`);
      $new.css(`:before`, `color: ${value.color}`);

      const e = $(containerElement).append($new);
    });
  };

  /**
   * Determines if the player wins or not
   *
   */
  this.watchGameStatus = function () {
    this.pieces.forEach((p) => {
      p.isOk = $(`#piece-${p.pos + 1}`).attr("data-curr-pos") == $(`#piece-${p.pos + 1}`).attr("data-pos");
    });

    if (this.pieces.filter((i) => !i.isOk).length === 0) {
      $(containerElement).addClass("glow-2");
      if (typeof this.onGameOver === "function") {
        this.onGameOver({ secs: this.secs, moves: this.moves, message: LANG[this.language].winText({ secs: this.secs, moves: this.moves }) });
      }
      this.moves = 0;
      this.gameStatus = GAME_STATUS.STOPPED;
      $(".pieces").unbind("click");
    }
  };

  /**
   * Add events and action to the game
   *
   */
  this.initAction = function () {
    $(".pieces").click((event) => {
      if ($(".glow").length === 0) {
        $(event.currentTarget).addClass("glow");
      } else {
        // set new current position
        const tempCurrPos = $(".glow").attr("data-curr-pos");
        $(".glow").attr("data-curr-pos", $(event.currentTarget).attr("data-curr-pos"));
        $(event.currentTarget).attr("data-curr-pos", tempCurrPos);

        // set new absolute positions and run animations
        const tempAbsPos = $(".glow").css(["top", "left"]);
        $(".glow").css($(event.currentTarget).css(["top", "left"]));
        $(event.currentTarget).css(tempAbsPos);

        // remove the glow and reset the first tile
        $(".pieces").removeClass("glow");

        // test for the win
        setTimeout(() => this.watchGameStatus(), 500);

        this.moves++;
      }
    });
  };

  /**
   * Move each piece to a random position
   *
   */
  this.shuffleTiles = function () {
    const places = Utils.shuffleArray(JSON.parse(JSON.stringify(this.pieces)));
    this.pieces.map((value) => {
      const newPosition = places.pop();
      $(`#piece-${value.pos + 1}`).css(newPosition);
      $(`#piece-${value.pos + 1}`).attr("data-curr-pos", newPosition.pos + 1);
    });
  };

  // Start the game
  this.start = function () {
    this.buildStage();
    this.shuffleTiles();
    this.initAction();

    this.gameStatus = GAME_STATUS.PLAYING;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.gameStatus === GAME_STATUS.PLAYING) {
        $(".time").text(LANG[this.language].timeText({ secs: this.secs }));
        this.secs++;
      }
    }, 0);
  };

  this.reset = function () {
    this.secs = 0;
    this.moves = 0;
    this.pieces = [];
    $(containerElement).empty();
    clearInterval(this.timerInterval);
    this.start();
  };

  this.destruct = function () {
    clearInterval(this.timerInterval);
  };
}
