$(document).ready(function () {
  const lang = getBrowserLang();
  const image = "assets/puzzle1.jpeg";
  let puzzle;
  Utils.getImageSize(image).then((imageSize) => {
    puzzle = new Puzzle({ width: imageSize.w, height: imageSize.h }, image, lang, $("article"));
    puzzle.start();
  });

  /*
  $(".fireworks").fireworks({
    sound: true, // sound effect
    opacity: 0.9,
    width: "100%",
    height: "100%",
  });
  */

  $("#restart").click((e) => puzzle.reset());
  $("#restart").text(LANG[lang].restartButtonText());
});
