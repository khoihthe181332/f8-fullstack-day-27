const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const historyLength = $('#history-length');

// Xử lý hiển thị history length
historyLength.innerText = history.length;

// Lấy phần tử trong DOM
const navBtns = $$('.nav-link'); // Các nút điều hướng
const pages = $$('.page'); // Các trang nội dung

navBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const pageId = e.target.dataset.page;
        pages.forEach(page => {
            let currentPage = $('.page.active');
            if (page.id === pageId) {
                if (!page.classList.contains('active')) {
                    // Ẩn trang hiện tại
                    currentPage.classList.remove('active');
                    // Hiển thị trang được chọn
                    page.classList.add('active');
                    // Thêm trạng thái vào lịch sử trình duyệt
                    history.pushState({ page: pageId }, null, `${pageId}`);
                }
            }
        });
    });
});