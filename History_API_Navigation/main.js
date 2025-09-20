const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let currentPage = 'home';

// Lấy phần tử trong DOM
const navLinks = $$('.nav-link'); // Các nút điều hướng
const pages = $$('.page'); // Các trang nội dung

// Hàm lấy trang từ URL parameters
function getPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page') || 'home';
}

// Hàm hiển thị page
function showPage(pageName) {
    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = $(`#${pageName}`);
    if (selectedPage) {
        selectedPage.classList.add("active");
        currentPage = pageName;
    }
}

// Hàm update class Active vào nút điều hướng
function updateActiveClass(pageName) {
    navLinks.forEach(item => {
        item.classList.remove("active");
    });

    const activeLink = $(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}

// Hàm cập nhật URL với search parameters
function updateURL(pageName) {
    const url = new URL(window.location);
    if (pageName === 'home') {
        // Xóa parameter nếu là trang home
        url.searchParams.delete('page');
    } else {
        url.searchParams.set('page', pageName);
    }

    // Cập nhật URL mà không reload trang
    history.pushState({ page: pageName }, null, url.toString());
}

// Hàm xử lý click menu
function handleMenuClick(e) {
    e.preventDefault();
    const pageName = e.target.dataset.page;

    if (pageName === currentPage) return;

    // Cập nhật URL với search parameter
    updateURL(pageName);

    // Hiển thị trang và cập nhật active state
    showPage(pageName);
    updateActiveClass(pageName);

    // Cập nhật history length display
    updateHistoryLength();
}

// Hàm khởi tạo khi trang được load
function initializePage() {
    // Lấy trang hiện tại từ URL parameters
    const pageName = getPageFromURL();

    // Kiểm tra trang có hợp lệ không
    const validPages = ['home', 'about', 'services', 'contact'];
    const pageToShow = validPages.includes(pageName) ? pageName : 'home';

    // Hiển thị trang tương ứng với URL parameter
    showPage(pageToShow);
    updateActiveClass(pageToShow);

    // Nếu URL không có parameter hoặc parameter không hợp lệ, cập nhật URL
    if (pageName !== pageToShow) {
        updateURL(pageToShow);
    }
}

// Hàm cập nhật hiển thị history length
function updateHistoryLength() {
    const historyLength = $('#history-length');
    if (historyLength) {
        historyLength.innerText = history.length;
    }
}

// Event listeners
window.addEventListener("DOMContentLoaded", (e) => {
    // Khởi tạo trang
    initializePage();

    // Xử lý click menu
    navLinks.forEach(btn => {
        btn.addEventListener("click", handleMenuClick);
    });

    // Xử lý nút back/forward của browser
    window.addEventListener("popstate", (e) => {
        let pageName = 'home';

        console.log(pageName, e.state);
        if (e.state && e.state.page) {
            pageName = e.state.page;
        } else {
            pageName = getPageFromURL();
        }

        // Kiểm tra trang có hợp lệ không
        const validPages = ['home', 'about', 'services', 'contact'];
        const pageToShow = validPages.includes(pageName) ? pageName : 'home';

        showPage(pageToShow);
        updateActiveClass(pageToShow);
        updateHistoryLength();
    });

    // Xử lý nút F5 (optional - để debug)
    window.addEventListener("keydown", (e) => {
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
            console.log("Page refresh detected, current page:", getPageFromURL());
        }
    });

    // Khởi tạo history length display
    updateHistoryLength();
});

// Xử lý khi trang được load lại (refresh/F5)
window.addEventListener("load", () => {
    // Đảm bảo trang hiển thị đúng sau khi refresh
    const currentPageFromURL = getPageFromURL();
    if (currentPageFromURL !== currentPage) {
        initializePage();
    }
});