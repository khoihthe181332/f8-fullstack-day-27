const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const startCameraBtn = $('#startCamera');
const stopCameraBtn = $('#stopCamera');
const takePhotoBtn = $('.btn-capture');
const downloadBtn = $('.btn-download');

let stream = null;
const video = $("#videoStream");

startCameraBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        disableBtn(stream);
    } catch (err) {
        alert("Không thể truy cập camera: " + err.message);
    }
});

stopCameraBtn.addEventListener('click', () => {
    // console.log("Stop Camera");
    if (stream) {
        stream.getVideoTracks().forEach((track) => track.stop());
        stream = null;
        video.srcObject = null;
    }
    disableBtn(stream);
});

function disableBtn(stream) {
    if (stream) {
        startCameraBtn.disabled = true;
        stopCameraBtn.disabled = false
        takePhotoBtn.disabled = false;
    } else {
        stopCameraBtn.disabled = true;
        startCameraBtn.disabled = false;
        takePhotoBtn.disabled = true;
    }
}

