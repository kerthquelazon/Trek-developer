const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  //showing and hiding prev/next icon according to carousel scroll left value
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value form the carousel scroll left esle add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;

  positionDiff = Math.abs(positionDiff); //making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  //getting difference value that needs to add or reduce from carousel left to mtake middle img center
  let valDiffence = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    //if user is scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDiffence : -positionDiff);
  }
  carousel.scrollLeft +=
    positionDiff > firstImgWidth / 3 ? valDiffence : -positionDiff;
};
const dragStart = (e) => {
  // updating glovebal variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchleave", dragStop);
