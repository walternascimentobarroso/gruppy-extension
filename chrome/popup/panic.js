"use strict";

function salvarURLNaPasta(idPasta, page) {
  chrome.bookmarks.create(
    {
      parentId: idPasta,
      title: page.title,
      url: page.url,
    },
    (item) => {
      console.log("URL salva com sucesso:", item);
    }
  );
}

function criarPasta(title) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.create({ title }, (folder) => {
      resolve(folder);
    });
  });
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
      chrome.tabs.remove(tab.id);
    }
  } catch (error) {
    console.error("Erro ao criar pasta:", error);
  }
}

async function logTabs(tabs) {
  const panicButton = document.getElementById("panic");
  panicButton.addEventListener("click", async () => {
    await salvarTabsNaPasta(tabs);
    chrome.tabs.create({});
  });
}

chrome.tabs.query({}, logTabs);
