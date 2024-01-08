document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tab1").addEventListener("click", () => changeTab(1));
  document.querySelector(".tab2").addEventListener("click", () => changeTab(2));
});


function changeTab(tabNumber) {
  document.querySelectorAll(".tab-content").forEach((div) => {
    div.style.display = "none";
    div.classList.remove("active");
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
  });

  document.querySelector(`#tab${tabNumber}`).style.display = "block";
  document.querySelector(`.tab${tabNumber}`).classList.add("active");
}