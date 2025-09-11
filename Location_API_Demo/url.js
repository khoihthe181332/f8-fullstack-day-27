const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// Tạo URL từ form
function buildUrlFromForm() {
    const protocol = $('#protocol').value;
    const hostname = $('#hostname');
    const port = $('#port').value.trim();
    const pathname = $('#pathname').value.trim();
    const search = $('#search').value.trim();
    const hash = $('#hash').value.trim();

    let url;

    if (!hostname.value.trim()) {
        hostname.classList.add('input-error');
        setTimeout(() => {
            hostname.classList.remove('input-error');
        }, 700);
        return null;
    } else {
        url = `${protocol}//${hostname.value.trim()}`;
    }

    if (port) {
        url += ':' + port;
    }

    if (pathname && !pathname.startsWith('/')) {
        url += '/' + pathname;
    } else if (pathname) {
        url += pathname;
    }

    if (search && !search.startsWith('?')) {
        url += '?' + search;
    } else if (search) {
        url += search;
    }

    if (hash && !hash.startsWith('#')) {
        url += '#' + hash;
    } else if (hash) {
        url += hash;
    }

    return url;
}

// Navigate đến URL mới
function navigateToUrl() {
    const url = buildUrlFromForm();
    if (url) {
        window.location.assign(url);
    }
}

// Replace URL hiện tại bằng URL mới
function replaceUrl() {
    const url = buildUrlFromForm();
    if (url) {
        window.location.replace(url);
    }
}

// Reload trang hiện tại
function reloadUrl() {
    window.location.reload();
}

// Xử lý click
$(".btn-navigate").addEventListener("click", navigateToUrl);
$(".btn-replace").addEventListener("click", replaceUrl);
$(".btn-reload").addEventListener("click", reloadUrl);
