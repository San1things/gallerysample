let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImage;
let windowWidth = window.innerWidth;

// BY CLICKING THE IMAGES
if (galleryImages) {
  galleryImages.forEach(function (image, index) {
    image.onclick = function () {
      // THIS IS TO GET THE IMAGEURL AND SHRINK IT TO THE FILE NAME
      let getElementCss = window.getComputedStyle(image);
      let getFullImgUrl = getElementCss.getPropertyValue("background-image");
      let getImageUrlPos = getFullImgUrl.split("/images/thumb/");
      let setNewImgUrl = getImageUrlPos[1].replace('")', "");
      // THIS IS TO ADD AN INDEX CAUSE IN PROGRAMMING YOU START FROM 0
      getLatestOpenedImage = index + 1;
      // THIS IS THE BACKGROUND OF THE IMAGE OR THE BODY OF THE WINDOW
      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");
      // THIS IS TO GET THE IMAGE
      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src", "images/" + setNewImgUrl);
      newImg.setAttribute("id", "current-img");
      // ONLOAD SO THAT WE GET THE SIZE OF THE IMAGE BEFORE WE PUT SOMETHING
      newImg.onload = function () {
        // COMPUTATION OF POSITION OF THE BUTTON
        let imgWidth = this.width;
        let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;
        // TO GET THE NEXT BUTTON
        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode(">");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
        newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";
        // TO GET THE PREV BUTTON
        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("<");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");
        newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
      };
    };
  });
}

// FUNCTION ON CLOSING THE IMAGE
function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}
// FUNCTION ON NEXTING OR PREVIOUSING AN IMAGE
function changeImg(direction) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (direction === 1) {
    calcNewImg = getLatestOpenedImage + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (direction === 0) {
    calcNewImg = getLatestOpenedImage - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute("src", "images/t" + calcNewImg + ".jpg");
  newImg.setAttribute("id", "current-img");

  getLatestOpenedImage = calcNewImg;
  //THIS IS FOR THE BUTTON AGAIN
  newImg.onload = function () {
    let imgWidth = this.width;
    let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

    let nextBtn = document.querySelector(".img-btn-next");
    nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

    let prevBtn = document.querySelector(".img-btn-prev");
    prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
  };
}
