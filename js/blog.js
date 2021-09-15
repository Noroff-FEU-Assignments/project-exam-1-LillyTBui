const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed";
const newUrl = baseURL + "&categories_exclude=1";
const updateURL = newUrl + "&per_page=10";

const postContainer = document.querySelector(".post-list");
const viewBtn = document.querySelector(".post-view-btn");

viewBtn.onclick = function (event) {
  event.preventDefault();
  const URL = newUrl + "&per_page=20";
  getPost2(URL);
  viewBtn.remove();
};

async function getPost2(url) {
  const response = await fetch(url);
  const posts = await response.json();
  for (let i = 10; i <= 20; i++) {
    createPost(posts[i]);
  }
}

async function getPost(url) {
  const response = await fetch(url);
  const posts = await response.json();
  posts.forEach(createPost);
}

function createPost(post) {
  const date = new Date(post.date);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  postContainer.innerHTML += `
  <a href="../blog-specific.html">
      <div class="post-list__div" data-id="${post.id}">
          <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url}" class="post-list__img" data-id="${post.id}">
          <h3 data-id="${post.id}">${day}/${month}/${year}</h3>
          <h2 data-id="${post.id}">${post.title.rendered}</h2>
          <a href="../blog-specific.html" class="blue-btn post-btn" data-id="${post.id}">View post</a>
      </div>
  </a>`;
}

getPost(updateURL);

postContainer.onclick = function (event) {
  const id = event.target.dataset.id;
  localStorage.setItem("post", JSON.stringify(id));
};
