//const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts";
const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed";
const featuredPost = baseURL + "&tags=4";
const generalPost = baseURL + "&categories_exclude=1";

const featuredContainer = document.querySelector(".featured-posts");
const postContainer = document.querySelector(".latest-post__container");

async function getPosts(url) {
  const response = await fetch(url);
  const posts = await response.json();
  /*console.log(posts);
    console.log(posts[1].title.rendered); //get title
    console.log(posts[1]._embedded['wp:featuredmedia']['0'].source_url);*/
  posts.forEach(createPost);
}

function createPost(post) {
  featuredContainer.innerHTML += `
    <div class="post">
        <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url}" class="post-img">
        <h2>${post.title.rendered}</h2>
    </div>
    `;
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
    <div class="general-post">
        <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url}" class="post-img">
        <h5 class="category-title">${post._embedded["wp:term"]["0"]["0"].name}</h5>
        <h3>${post.title.rendered}</h3>
        <h4>${day}/${month}/${year}</h4>
    </div>`;
}

getGeneralPost(generalPost);

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
  } else if (viewPortWidth === 900) {
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
