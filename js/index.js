//const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts";
const baseURL = "https://sunnyday.one/happy-tourist/wp-json/wp/v2/posts?_embed";
const featuredPost = baseURL + "&tags=4";
const generalPost = baseURL + "&categories_exclude=1";

const featuredContainer = document.querySelector(".featured-posts");
const postContainer = document.querySelector(".latest-post__container");

async function getPosts(url){
    const response = await fetch(url);
    const posts = await response.json();
    /*console.log(posts);
    console.log(posts[1].title.rendered); //get title
    console.log(posts[1]._embedded['wp:featuredmedia']['0'].source_url);*/
    posts.forEach(createPost);
}

getPosts(featuredPost);

function createPost(post){
    featuredContainer.innerHTML += `
    <div class="post">
        <img src="${post._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url}" class="post-img">
        <h2>${post.title.rendered}</h2>
    </div>
    `;
}

async function getGeneralPost(url){
    const response = await fetch(url);
    const posts = await response.json();
    posts.forEach(createGeneralPost);
    console.log(posts[3]._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url);
    console.log(posts[4]._embedded['wp:term']['0']['0'].name);
    const date = new Date(posts[3].date);
    console.log(date.getFullYear());
    console.log(date.getMonth());
    console.log(date.getDay());
}

function createGeneralPost(post){
    const date = new Date(post.date);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    postContainer.innerHTML += `
    <div class="general-post">
        <img src="${post._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url}" class="post-img">
        <h5 class="category-title">${post._embedded['wp:term']['0']['0'].name}</h5>
        <h3>${post.title.rendered}</h3>
        <h4>${day}/${month}/${year}</h4>
    </div>`;
}

getGeneralPost(generalPost);