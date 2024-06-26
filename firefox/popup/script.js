let defaultBrowser =
  typeof browser !== "undefined"
    ? browser
    : typeof chrome !== "undefined"
    ? chrome
    : {};

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
    defaultBrowser.windows.create(config);
  } else {
    defaultBrowser.tabs.create(config);
  }

  window.close();
}
