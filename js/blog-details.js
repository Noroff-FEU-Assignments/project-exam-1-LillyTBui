const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts/";
const id = JSON.parse(localStorage.getItem("post"));

const newURL = baseURL + id + "?_embed";
const postContainer = document.querySelector(".blog-specification");

async function getPost(url) {
  const response = await fetch(url);
  const post = await response.json();
  createPost(post);

  const div = document.querySelectorAll(".wp-block-image");
 
  for (let i = 0; i < div.length; i++) {
    let img = div[i];

    img.innerHTML += `<div class="modal modal${i}">
      <div class="modal-content">
        <img id="modal-img${i}" src="${img.getElementsByTagName("IMG")[0].src}">
        <i class="fas fa-times-circle circle${i}"></i>
      </div>
    </div>`;

    const className = ".modal" + i;
    const circleName = ".circle" + i;
    const modal = document.querySelector(className);
    const circle = document.querySelector(circleName);
    const imgMain = img.getElementsByTagName("IMG")[0];
  
    imgMain.onclick = function () {
      modal.style.display = "block";
    };

    circle.onclick =  function () {
      modal.style.display = "none";
    };
  }
}

function createPost(post) {
  const date = new Date(post.date);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  document.title = "My Blog | " + post.title.rendered;

  postContainer.innerHTML += `
        <div class="post-details" data-id="${post.id}">
        <img src="${post._embedded["wp:featuredmedia"]["0"].media_details.sizes.full.source_url}" class="post-details__img" data-id="${post.id}">
            <h2 data-id="${post.id}">${post.title.rendered}</h2>
            <h3 data-id="${post.id}">${day}/${month}/${year}</h3>
            <h4 class="category-title" data-id="${post.id}">${post._embedded["wp:term"]["0"]["0"].name}</h4>
            <div class="post-details__div">${post.content.rendered}</div>
        </div>`;
}

getPost(newURL);