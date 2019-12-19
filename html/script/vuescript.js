new Vue({
    el: "#app",
    data: {
        toggleView: true
    },
    methods: {
        grabImage: function() {
            let canvas = document.getElementById("model_preview");
            let link = document.getElementById("dllink");
            link.href = canvas.toDataURL();
        },
        activateCamera: function() {
            this.toggleView = !this.toggleView;
            console.log(this.toggleView);
            if (this.toggleView != true) {
                const video = document.getElementById("cam_preview");

                /*camera settings*/

                const constraints = {
                    audio: false,
                    video: {
                        facingMode: "environment"
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

        }
    }
});