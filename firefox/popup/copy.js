document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#copy').addEventListener('click', clipboardCopy);
});

async function clipboardCopy() {
  let text = document.querySelector("#number").value;
  await navigator.clipboard.writeText(text);
}