$(document).ready(function () {
  const lang = getBrowserLang();
  const image = "assets/puzzle1.jpeg";
  let puzzle;

  Utils.getImageSize(image).then((imageSize) => {
    puzzle = new Puzzle({
      imageSize: { width: imageSize.w, height: imageSize.h },
      imageUrl: image,
      language: lang,
      containerElement: $("article"),
      onGameOver: (result) => {
        $("p.message").text(result.message);
        $(".gameover").show();
      },
    });
    puzzle.start();
  });

  $("#restart").click((e) => {
    $(".gameover").empty();
    $(".gameover").hide();
    puzzle.reset();
  });
  $("#restart").text(LANG[lang].restartButtonText());
});
