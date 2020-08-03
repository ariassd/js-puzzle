$(document).ready(function () {
  const lang = getBrowserLang();
  const image = "assets/puzzle1.jpeg";

  Utils.getImageSize(image).then((imageSize) => {
    const puzzle = new Puzzle({ width: imageSize.w, height: imageSize.h }, image, lang);
    puzzle.start();
  });
});
