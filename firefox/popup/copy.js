document.addEventListener("DOMContentLoaded", function () {
  let copyButtons = document.querySelectorAll(".copy-button");

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let elementId = button.getAttribute("data-element-copy");

      clipboardCopy(elementId);
    });
  });
});

async function clipboardCopy(elementId) {
  let text = document.querySelector(`#${elementId}`).value;
  await navigator.clipboard.writeText(text);
}
