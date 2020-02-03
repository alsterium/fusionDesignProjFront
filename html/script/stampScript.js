var canvas , stampText;

function initStampCanvas(){
  //Canvasの初期化
  canvas = new fabric.Canvas("stampCanvas_upper");
  stampText = "おいっす";
  updateText();
}
//テキストの更新
function updateText(){
  //袋文字を作るためのテキスト
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
  //文字をCanvasに追加
  canvas.add(textGroup);
};

