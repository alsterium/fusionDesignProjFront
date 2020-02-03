function initStampCanvas() {
  var canvas;
  //Canvasの初期化
  canvas = new fabric.Canvas("stampCanvas_upper");
  var fontStyle = {
    font: "NicoMoji",
    size: 100,
    originX: "center",
    originY: "center"
  };
  var textGroup = create_bag_character(fontStyle);
  canvas.add(textGroup);
}
//テキストの更新
function updateText() {}

function create_bag_character(font_style) {
  //袋文字を作るためのテキスト
  var upperText = new fabric.Text(font_style.text, {
    fontFamily: font_style.font,
    fontSize: font_style.size,
    originX: font_style.originX,
    originY: font_style.originY
  });
  var middleText = new fabric.Text(font_style.text, {
    fontFamily: font_style.font,
    fontSize: font_style.size,
    stroke: "#ffffff",
    strokeWidth: 10,
    originX: font_style.originX,
    originY: font_style.originY
  });
  var lowerText = new fabric.Text(font_style.text, {
    fontFamily: font_style.font,
    fontSize: font_style.size,
    stroke: "#000",
    strokeWidth: 15,
    originX: font_style.originX,
    originY: font_style.originY
  });

  //二重袋文字
  var textGroup = new fabric.Group([lowerText, middleText, upperText], {
    top: 150,
    left: 150
  });
  return textGroup;
}
