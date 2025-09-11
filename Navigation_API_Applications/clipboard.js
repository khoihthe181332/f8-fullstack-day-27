const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const copyBtn = $('.btn-copy');
const pasteBtn = $('.btn-paste');
const textInput = $('#textInput');
const textOutput = $('#textOutput');
const copyStatus = $('#copyStatus');
const pasteStatus = $('#pasteStatus');

// Hiển thị thông báo trạng thái
function showStatus(element, message, type) {
    element.textContent = message;
    element.className = `status-message ${type}`;
    element.style.display = 'block';

    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

copyBtn.addEventListener('click', () => {
    const text = textInput.value;
    // Kiểm tra nếu không có văn bản để sao chép
    if (!text) {
        showStatus(copyStatus, 'Vui lòng nhập văn bản để sao chép!', 'error');
        return;
    } else {
        showStatus(copyStatus, 'Văn bản đã được sao chép vào clipboard!', 'success');
        navigator.clipboard.writeText(text);
        copyBtn.classList.add('success');
        setTimeout(() => copyBtn.classList.remove('success'), 3000);
        return;
    }
});


pasteBtn.addEventListener('click', () => {
    const text = navigator.clipboard.readText();
    // Kiểm tra nếu clipboard trống
    if (!text) {
        showStatus(pasteStatus, 'Không có văn bản nào trong clipboard để dán!', 'error');
        pasteBtn.classList.add('error');
        setTimeout(() => pasteBtn.classList.remove('error'), 3000);
        return;
    } else {
        text.then(clipText => (textOutput.value = clipText));
        showStatus(pasteStatus, 'Văn bản đã được dán từ clipboard!', 'success');
        pasteBtn.classList.add('success');
        setTimeout(() => pasteBtn.classList.remove('success'), 3000);
        return;
    }

});