const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed";
const updateURL = baseURL + "&per_page=10";
let url = updateURL + "&order=desc";

const postContainer = document.querySelector(".post-list");
const viewBtn = document.querySelector(".post-view-btn");

viewBtn.onclick = function (event) {
  event.preventDefault();
  const URL = url + "&per_page=20";
  getPost2(URL);
  viewBtn.style.display = "none";
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
  if(posts.length > 0){
    posts.forEach(createPost);
    
  }
  else{
    postContainer.innerHTML = `
    <div class="error-message">
    <i class="fas fa-exclamation-circle"></i>
    <h2>Unfortunately we do not have any posts matching your search</h2>
    </div>`;
  }

  if(posts.length < 10){
    viewBtn.style.display = "none";
  }
  else{
    viewBtn.style.display = "initial";
  }
}

function createPost(post) {
  const date = new Date(post.date);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  postContainer.innerHTML += `
  <a href="../blog-specific.html">
      <div class="post-list__div" data-id="${post.id}">
          <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url}" class="post-list__img" data-id="${post.id}" alt="${post._embedded["wp:featuredmedia"]["0"].alt_text}">
          <h3 data-id="${post.id}">${day}/${month}/${year}</h3>
          <h2 data-id="${post.id}">${post.title.rendered}</h2>
          <a href="../blog-specific.html" class="blue-btn post-btn" data-id="${post.id}">View post</a>
      </div>
  </a>`;
}

getPost(url);

postContainer.onclick = function (event) {
  const id = event.target.dataset.id;
  localStorage.setItem("post", JSON.stringify(id));
};


/* sortby */
const sort = document.querySelector("#sort");

sort.onchange = function(){
  if(sort.value == "newest"){
    url = updateURL + "&order=desc";
  }
  else if(sort.value == "oldest"){
    url = updateURL + "&order=asc";
  }

  postContainer.innerHTML = "";
  getPost(url);
}

let search = document.querySelector("#search");

search.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    const input = search.value;
    url = updateURL + "&search=" + input;
    postContainer.innerHTML = "";
    getPost(url);
  }
})
