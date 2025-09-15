const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const startCameraBtn = $('#startCamera');
const stopCameraBtn = $('#stopCamera');
const takePhotoBtn = $('.btn-capture');
const downloadBtn = $('.btn-download');
const canvas = $("#photoCanvas");
const imgPhoto = $("#capturedPhoto");
const photoPlaceholder = $("#photoPlaceholder");

let stream = null;
const video = $("#videoStream");

// Start Camera
startCameraBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });
        video.srcObject = stream;
        disableBtn(stream);
    } catch (err) {
        alert("Không thể truy cập camera: " + err.message);
    }
});

// Stop Camera
stopCameraBtn.addEventListener('click', () => {
    // console.log("Stop Camera");
    if (stream) {
        stream.getVideoTracks().forEach((track) => track.stop());
        stream = null;
        video.srcObject = null;
    }
    disableBtn(stream);
});

// Take picture
takePhotoBtn.addEventListener("click", () => {
    if (!stream) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("img/png");
    imgPhoto.src = image;

    imgPhoto.style.display = "block";
    photoPlaceholder.style.display = 'none';

    checkPhotoExist();
});

// Download picture
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    if (imgPhoto.src) {
        link.download = 'photo.png';
        link.href = canvas.toDataURL();
        link.click();
    } else {
        alert("Không có ảnh để tải về");
    }
});

// Kiểm tra xem có ảnh đã chụp không
function checkPhotoExist() {
    if (imgPhoto.src) {
        downloadBtn.disabled = false;
    } else {
        downloadBtn.disabled = true;
    }
}

// Hàm kiểm soát nút bấm
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

