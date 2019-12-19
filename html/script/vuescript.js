new Vue({
    el: "#app",
    data: {
        toggleView: true,
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
            if (this.toggleView != true) {
                const video = document.getElementById("cam_preview");

                /*camera settings*/

                var constraints = {
                    audio: false,
                    video: {
                        facingMode: this.facingMode
                    }
                };

                /*sync camera to <video> tag */
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(stream => {
                        video.srcObject = stream;
                    })
                    .catch(err => {
                        console.log(err.name + ":" + err.message);
                    });
            }
        },
        toggleCamera: function() {
            if (this.facingValue === "environment") {
                this.facingValue = "user";
            } else if (this.facingValue === "user") {
                this.facingValue = "environment";
            }

            console.log(this.facingValue);
        }
    }
});