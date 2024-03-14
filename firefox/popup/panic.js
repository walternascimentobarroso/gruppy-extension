"use strict";

function salvarURLNaPasta(idPasta, page) {
  browser.bookmarks.create({
    parentId: idPasta,
    title: page.title,
    url: page.url,
  }).then((item) => {
    console.log("URL salva com sucesso:", item);
  }).catch((error) => {
    console.error("Erro ao salvar URL:", error);
  });
}

function criarPasta(title) {
  return browser.bookmarks.create({ title });
}

async function salvarTabsNaPasta(tabs) {
  try {
    const folder = await criarPasta("Continue");
    for (const tab of tabs) {
      const page = {
        url: tab.url,
        title: tab.title,
      };
      salvarURLNaPasta(folder.id, page);
      browser.tabs.remove(tab.id);
    }
  } catch (error) {
    console.error("Erro ao criar pasta:", error);
  }
}

async function logTabs(tabs) {
  const panicButton = document.getElementById("panic");
  panicButton.addEventListener("click", async () => {
    await salvarTabsNaPasta(tabs);
    browser.tabs.create({});
  });
}

browser.tabs.query({}).then(logTabs).catch((error) => {
  console.error("Erro ao consultar guias:", error);
});
