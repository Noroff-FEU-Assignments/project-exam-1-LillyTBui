const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed&categories=3";

const tipsContainer = document.querySelector(".tips-post");
const container = document.querySelectorAll(".tips-post__container");

async function getTips(url) {
  const response = await fetch(url);
  const posts = await response.json();
  posts.forEach(createPost);
}

function createPost(post) {
  tipsContainer.innerHTML += `
      <div class="tips-div" data-id="${post.id}">
          <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.full.source_url}" data-id="${post.id}">
          <h2>${post.title.rendered}</h2>
          <div class="tips-div__content" data-id="${post.id}">${post.content.rendered}</div>
          <a href="../blog-specific.html" class="link_underline tips_link" data-id="${post.id}">Read more</a>
      </div>`
    ;
}

getTips(baseURL);

tipsContainer.onclick = function (event) {
  const id = event.target.dataset.id;
  localStorage.setItem("post", JSON.stringify(id));
};

