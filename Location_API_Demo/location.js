const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const hrefValue = $(".href-value");
const protocolValue = $(".protocol-value");
const hostnameValue = $(".hostname-value");
const portValue = $(".port-value");
const pathnameValue = $(".pathname-value");
const searchValue = $(".search-value");
const hashValue = $(".hash-value");
const originValue = $(".origin-value");

const locationObj = window.location;

hrefValue.textContent = locationObj.href;
protocolValue.textContent = locationObj.protocol;
hostnameValue.textContent = locationObj.hostname;
portValue.textContent = locationObj.port || "default";
pathnameValue.textContent = locationObj.pathname;
searchValue.textContent = locationObj.search || "none";
hashValue.textContent = locationObj.hash || "none";
originValue.textContent = locationObj.origin;