//HELPER
function setAttributeHelper(item, attribute, value) {
  item.setAttribute(attribute, value);
}

// ELEMENTS
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Check if all images are loaded
function imageLoad() {
  imageLoaded++;
  if (imageLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}

// UNPLASH API
const count = 30;
const apiKey = "fwnPc2PhHnks40RQO-dd3-DnzrqDWfBH7Q04iQufWII";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function displayPhotos() {
  imageLoaded = 0;
  totalImages = photoArray.length;
  // create <a></a> to link to unplash api
  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributeHelper(item, "href", photo.links.html);
    setAttributeHelper(item, "target", "_blank");

    // Create image for photo;
    const img = document.createElement("img");

    setAttributeHelper(img, "src", photo.urls.regular);
    setAttributeHelper(img, "alt", photo.alt_description);
    setAttributeHelper(img, "title", photo.alt_description);

    // put img to a and put all of that to image container
    img.addEventListener("load", imageLoad);

    // Event listener, check if image has already loaded
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error.message);
  }
}

// check to see if scrolling near bottom of page, load more images
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();

console.log("Hello world");
