const list = document.querySelectorAll(".list-a");
localStorage.clear();

/* show destination list */
for (const item of list) {
  item.addEventListener(`click`, function () {
    const child = item.children[0];
    const currentCount = item.dataset.id;
    const previousCount = JSON.parse(localStorage.getItem("count"));
    let isSame = false;
    let index;

    if (previousCount !== null) {
      console.log(previousCount);
      for (let i = 0; i <= previousCount.length - 1; i++) {
        if (currentCount === previousCount[i]) {
          isSame = true;
          index = previousCount.indexOf(currentCount);
        }
      }
      if (isSame === true) {
        child.style.display = "none";
        previousCount.splice(index, 1);
        localStorage.setItem("count", JSON.stringify(previousCount));
      } else {
        child.style.display = "block";
        previousCount.push(currentCount);
        localStorage.setItem("count", JSON.stringify(previousCount));
      }
    } else {
      console.log("first");
      child.style.display = "block";
      const newList = [currentCount];
      localStorage.setItem("count", JSON.stringify(newList));
    }
  });
}

const favoriteContainer = document.querySelector(".favorite-destinations");
const listContainer = document.querySelector(".destination-list__container");

favoriteContainer.onclick = function (event) {
  const id = event.target.dataset.id;
  localStorage.setItem("post", JSON.stringify(id));
};

listContainer.onclick = function (event) {
  const id = event.target.dataset.list;
  localStorage.setItem("post", JSON.stringify(id));
};
