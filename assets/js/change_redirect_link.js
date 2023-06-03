// select all links with class "my-link"
const links = document.querySelectorAll('.my-link');

// loop through each link and change its URL
for (let i = 0; i < links.length; i++) {
    links[i].href = "/pages/join-platform.html";
}