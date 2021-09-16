const list = document.querySelectorAll(".list-a");

for (const item of list) {
    item.addEventListener(`click`, function () {
        const child = item.children[0];
        const currentCount = item.dataset.id;
        const previousCount = JSON.parse(localStorage.getItem("count"));
        let isSame = false;
        let index;

        if (previousCount !== null) {
            for (let i = 0; i <= previousCount.length-1; i++) {
                console.log(currentCount, previousCount[i]);
                    if(currentCount === previousCount[i]){ 
                        isSame = true;
                        index = previousCount.indexOf(currentCount);
                    }
            }
            if(isSame === true){
                child.style.display = "none";
                previousCount.splice(index, 1);
                localStorage.setItem("count", JSON.stringify(previousCount));
            }
            else{
                child.style.display = "block";
                previousCount.push(currentCount);
                localStorage.setItem("count", JSON.stringify(previousCount));
            }
        }
        else {
            child.style.display = "block";
            const newList = [currentCount];
            localStorage.setItem("count", JSON.stringify(newList));
            }
        }
    )
}


/* child.style.display = "none";
        const oldList = JSON.parse(localStorage.getItem("count"));
        oldList.pop();
        console.log("1");
        localStorage.removeItem("count", JSON.stringify(oldList));
        break; */

        /*console.log("2");
        child.style.display = "block";
        previousCount.push(currentCount);
        localStorage.setItem("count", JSON.stringify(previousCount));*/

       localStorage.clear();

       /* const index = previousCount.indexOf(currentCount);
                        const oldList = JSON.parse(localStorage.getItem("count"));
                        oldList.splice(index, 1);
                        localStorage.removeItem("count", JSON.stringify(oldList));
                        const check = localStorage.setItem("count");
                        console.log(check);
                        i = previousCount.length;
                        console.log(i);*/