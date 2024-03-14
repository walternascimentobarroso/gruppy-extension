"use strict";

async function togglePassword(tab) {
  try {
    console.log("toggling password");
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log("inside password");

        let param = 'input[data-original-type="password"]';
        let passwordInputs = document.querySelectorAll(param);
        if (passwordInputs.length > 0) {
          passwordInputs.forEach((input) => {
            input.type = "password";
            input.removeAttribute("data-original-type");
          });
          return;
        }

        passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach((input) => {
          input.type = "text";
          input.setAttribute("data-original-type", "password");
        });
      },
    });
  } catch (err) {
    console.error(`failed to execute script: ${err}`);
  }
}

function logTabs(tabs) {
  let tab = tabs[0];
  console.log(tab);

  const btnTogglePassword = document.getElementById("togglePassword");
  btnTogglePassword.addEventListener("click", () => {
    btnTogglePassword.textContent =
      btnTogglePassword.textContent.trim() === "Mostrar Senhas"
        ? "Esconder Senhas"
        : "Mostrar Senhas";

    togglePassword(tab);
  });
}

function onError(error) {
  console.error(`Error: ${error}`);
}

browser.tabs
  .query({ currentWindow: true, active: true })
  .then(logTabs, onError);
