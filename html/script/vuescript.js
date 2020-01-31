new Vue({
  el: "#app",
  data: {
    toggleView: true,
    stampEditMode: false,
    facingValue: "environment"
  },
  methods: {
    grabImage: function() {
      let canvas = document.getElementById("model_preview");
      let link = document.getElementById("dllink");
      link.href = canvas.toDataURL();
    },
    activateCamera: function() {
      this.toggleView = !this.toggleView;
      if (this.toggleView != true) this.initCamera();
    },
    initCamera: function() {
      var video = document.getElementById("cam_preview");

      /*camera settings*/

      var constraints = {
        audio: false,
        video: {
          facingMode: this.facingValue
        }
      };

      /*sync camera to <video> tag */
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          video.srcObject = stream;
          localMediaStream = stream;
        })
        .catch(err => {
          console.log(err.name + ":" + err.message);
        });
    },
    toggleCamera: function() {
      if (this.facingValue === "environment") {
        this.facingValue = "user";
        this.initCamera();
      } else if (this.facingValue === "user") {
        this.facingValue = "environment";
        this.initCamera();
      }
      console.log(this.facingValue);
    },
    toggleStampEditMode: function() {
      var modelPrevData = document.querySelector("#model_preview");
      var stampBG = document.querySelector("#stampCanvas_lower");

      //   var context = modelPrevData.getContext("2d");
      var context = modelPrevData.getContext("webgl");//モデルを表示している部分はwebglコンテキスト（泣き）
      console.log(context);

      stampBG.getContext("2d").drawImage(modelPrevData, 0, 0);

      this.$nextTick(() => initStampCanvas()); //DOMレンダリングが更新されたタイミングで呼び出されるコールバック関数
      this.stampEditMode = true;
    }
  }
});
