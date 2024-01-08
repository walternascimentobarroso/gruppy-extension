document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("openURL").addEventListener("click", openURL);
});

function openURL() {
  let incognito = document.getElementById("incognito").checked;
  let dev = document.getElementById("dev").checked;
  let token = document.getElementById("token").value;
  let store = document.getElementById("store").value;
  let base = "app.gruppy.com.br";
  if (dev) {
    base = "localhost";
  }
  let url = `http://${base}/${store}?action=site&value=${token}`;
  let config = { url: url };

  if (incognito) {
    config.incognito = incognito;
    browser.windows.create(config);
  } else {
    browser.tabs.create(config);
  }

  window.close();
}

function changeTab(tabNumber) {
  console.log(tabNumber);
  document.querySelectorAll(".tab-content").forEach((div) => {
    div.style.display = "none";
    div.classList.remove("active");
    console.log(div);
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
  });

  document.getElementById(`tab${tabNumber}`).style.display = "block";
  document.querySelector(`.tab${tabNumber}`).classList.add("active");
}
