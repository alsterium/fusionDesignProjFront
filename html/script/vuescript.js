new Vue({
  el: "#app",
  methods: {
    grabImage: function() {
      let canvas = document.getElementById("model_preview");
      let link = document.getElementById("dllink");
      link.href = canvas.toDataURL();
    }
  }
});
