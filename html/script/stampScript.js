var canvas , stampText;

function initStampCanvas(){
  canvas = new fabric.Canvas("stampCanvas_upper");
  stampText = "おいっす";
  updateText();
}

function updateText(){
  var upperText = new fabric.Text(stampText, {
    fontFamily: "Nico Moji",
    fontSize: 100,
    originX: "center",
    originY: "center"
  });
  var middleText = new fabric.Text(stampText, {
    fontFamily: "Nico Moji",
    fontSize: 100,
    stroke: "#ffffff",
    strokeWidth: 10,
    originX: "center",
    originY: "center"
  });

  var lowerText = new fabric.Text(stampText, {
    fontFamily: "Nico Moji",
    fontSize: 100,
    stroke: "#000",
    strokeWidth: 15,
    originX: "center",
    originY: "center"
  });

  //二重袋文字
  var textGroup = new fabric.Group([lowerText,middleText, upperText], {
    top: 150,
    left: 150
  });
  canvas.add(textGroup);
};

