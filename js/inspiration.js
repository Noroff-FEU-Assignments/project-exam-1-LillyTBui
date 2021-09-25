const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed&per_page=9";

const photo = document.querySelector(".photo");
const link = document.querySelector(".bahamas-link");
localStorage.clear();

async function getPhoto(url) {
  const response = await fetch(url);
  const posts = await response.json();
  posts.forEach(createPost);
}

function createPost(post) {
  photo.innerHTML += `
    <a href="../blog-specific.html" data-id="${post.id}">
      <div class="photo-div" data-id="${post.id}">
          <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.full.source_url}" data-id="${post.id}" alt="${post._embedded["wp:featuredmedia"]["0"].alt_text}">
          <div class="photo-div__content" data-id="${post.id}">${post.content.rendered}</div>
      </div>
    </a>`;
}

getPhoto(baseURL);

photo.onclick = function (event) {
  const id = event.target.dataset.id;
  localStorage.setItem("post", JSON.stringify(id));
};

link.onclick = function (event) {
  const id = event.target.dataset.list;
  localStorage.setItem("post", JSON.stringify(id));
};
