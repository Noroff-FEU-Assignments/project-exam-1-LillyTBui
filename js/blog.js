const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed";
const newUrl = baseURL + "&categories_exclude=1";

const postContainer = document.querySelector(".post-list");

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
      <div class="post-list__div">
            
          <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url}" class="post-list__img">
          <h3>${day}/${month}/${year}</h3>
          <h2>${post.title.rendered}</h2>
          <a class="blue-btn post-btn">View post</a>
      </div>`;
}

getPost(newUrl);
