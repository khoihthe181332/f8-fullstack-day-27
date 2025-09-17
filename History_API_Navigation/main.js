const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let currentPage = 'home';

// Lấy phần tử trong DOM
const navLinks = $$('.nav-link'); // Các nút điều hướng
const pages = $$('.page'); // Các trang nội dung

// Hàm lấy hiển thị page 
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

function handleMenuClick(e) {
    e.preventDefault();
    const pageName = e.target.dataset.page
    if (pageName === currentPage) return;

    const newURL = `/${pageName}`;
    history.pushState({ page: pageName }, null, newURL);

    showPage(pageName);
    updateActiveClass(pageName);
}

// Hàm khởi tạo khi trang được load
function initializePage() {
    // Lấy trang hiện tại từ URL
    let pageName = 'home';

    const currentURL = window.location.pathname;
    switch (currentURL) {
        case '/about':
            pageName = 'about';
            break;
        case '/services':
            pageName = 'services';
            break;
        case 'contact':
            pageName = 'contact';
            break
        default:
            pageName = 'home';
            break;
    };

    // Hiển thị trang tương ứng với URL
    showPage(pageName);
    updateActiveClass(pageName);
}



window.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    initializePage();

    // Xử lý click menu 
    navLinks.forEach(btn => {
        btn.addEventListener("click", handleMenuClick);
    });


    window.addEventListener("popstate", (e) => {
        let pageName = 'home';

        if (e.state && e.state.page) {
            pageName = e.state.page;
        } else {
            const currentURL = window.location.pathname;
            switch (currentURL) {
                case '/about':
                    pageName = 'about';
                    break;
                case '/services':
                    pageName = 'services';
                    break;
                case 'contact':
                    pageName = 'contact';
                    break
                default:
                    pageName = 'home';
                    break;
            };
        }


        showPage(pageName);
        updateActiveClass(pageName);
    });

    // Xử lý nút F5
    window.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.key === 'F5') {
            console.log("F5 clicked");
        }
    });

});


const historyLength = $('#history-length');
historyLength.innerText = history.length; // Xử lý hiển thị history length


