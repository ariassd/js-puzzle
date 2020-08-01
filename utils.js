Utils = {
  getImageSize: (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        resolve({ w: this.width, h: this.height });
      };
      img.src = image;
    });
  },

  shuffleArray: (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
};
