window.onload = () => {
    const video = document.querySelector("#camera");
    const canvas = document.querySelector("#picture");

    /*camera settings*/

    const constraints = {
        audio: false,
        video: {
            width: 300,
            height: 200,
            facingMode: "user"
        }
    };

    /*sync camera to <video> tag */
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
                video.play();
            };
        })
        .catch((err) => {
            console.log(err.name + ":" + err.message);
        });

    /*シャッターボタン */
    document.querySelector("#shutter").addEventListener("click", () => {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    });
}