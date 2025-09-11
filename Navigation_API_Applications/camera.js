const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const startCameraBtn = $('#startCamera');
const stopCameraBtn = $('#stopCamera');

startCameraBtn.addEventListener('click', () => {
    console.log('Start Camera', camera);
});

stopCameraBtn.addEventListener('click', () => {
    console.log('Stop Camera');
});