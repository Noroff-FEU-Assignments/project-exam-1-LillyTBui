const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed";
const featuredPost = baseURL + "&tags=4";
const generalPost = baseURL + "&categories_exclude=1";

const featuredContainer = document.querySelector(".landing-page");
const postContainer = document.querySelector(".latest-post__container");
const firstPost = document.querySelectorAll(".first-post");

let numbOfPost = 0;

async function getPosts(url) {
  const response = await fetch(url);
  const posts = await response.json();
  posts.forEach(createPost);
}

function createPost(post) {
  numbOfPost++;
  featuredContainer.innerHTML += `
  <a href="../blog-specific.html">
    <div class="post post${numbOfPost}" data-id="${post.id}">
        <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.full.source_url}" data-id="${post.id}">
        <h2 data-id="${post.id}">${post.title.rendered}</h2>
    </div>
  </a>`;
}

getPosts(featuredPost);

/* general post */

async function getGeneralPost(url) {
  const response = await fetch(url);
  const posts = await response.json();
  posts.forEach(createGeneralPost);
  createCarousel();
}

function createGeneralPost(post) {
  const date = new Date(post.date);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  postContainer.innerHTML += `
  <a href="../blog-specific.html">
    <div class="general-post" data-id="${post.id}">
        <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url}" class="post-img" data-id="${post.id}">
        <h5 class="category-title" data-id="${post.id}">${post._embedded["wp:term"]["0"]["0"].name}</h5>
        <h3 data-id="${post.id}">${post.title.rendered}</h3>
        <h4 data-id="${post.id}">${day}/${month}/${year}</h4>
    </div>
  </a>`;
}

getGeneralPost(generalPost);

featuredContainer.addEventListener("click", getId);
postContainer.addEventListener("click", getId);
firstPost.addEventListener("click", getId);

function getId(event) {
  const id = event.target.dataset.id;
  localStorage.setItem("post", JSON.stringify(id));
}

/* Carousel slider */

function createCarousel() {
  const right = document.querySelector(".right");
  const left = document.querySelector(".left");
  let card = document.querySelector(".general-post");
  let viewport = document.querySelector(".viewport-container");
  let cardWidth = card.offsetWidth;
  let maxCard;
  let viewPortWidth = viewport.clientWidth;
  let transitionTime = "0.5s";

  if (viewPortWidth === 500) {
    maxCard = 9;
  } else if (viewPortWidth === 750) {
    maxCard = 8;
  } else if (viewPortWidth >= 900) {
    maxCard = 3;
    cardWidth *= 4;
    transitionTime = "1s";
  } else {
    maxCard = 10;
  }

  let currentCard = 0;

  right.addEventListener("click", () => {
    currentCard++;
    let widthValue = currentCard * cardWidth;
    if (currentCard < maxCard) {
      postContainer.style.transform = `translate(-${widthValue}px)`;
      postContainer.style.transitionDuration = transitionTime;
    } else {
      postContainer.style.transform = `translate(0px)`;
      currentCard = 0;
    }
  });

  left.addEventListener("click", () => {
    currentCard--;
    let widthValue = currentCard * cardWidth;
    if (currentCard > 0) {
      postContainer.style.transform = `translate(-${widthValue}px)`;
      postContainer.style.transitionDuration = transitionTime;
    } else {
      postContainer.style.transform = `translate(0px)`;
      currentCard = 0;
    }
  });
}
