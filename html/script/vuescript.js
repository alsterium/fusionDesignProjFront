new Vue({
    el: "#app",
    data: {
        toggleView: true,
        facingValue: "environment",
    },
    methods: {
        grabImage: function() {
            let canvas = document.getElementById("model_preview");
            let link = document.getElementById("dllink");
            link.href = canvas.toDataURL();
        },
        activateCamera: function() {
            this.toggleView = !this.toggleView;
            if (this.toggleView != true)
                this.initCamera();
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
        }
    }
});