const CSS_FILE = 'stop-declarative-animations.css';
let tabs = new Map();

browser.browserAction.onClicked.addListener(tab => {
  if (tabs.has(tab.id)) {
    browser.tabs.removeCSS({ file: CSS_FILE, allFrames: true }).then(() => {
      tabs.delete(tab.id);
      browser.browserAction.setIcon({ path: 'watch-active.svg' });
    });
  } else {
    browser.tabs.insertCSS({ file: CSS_FILE, allFrames: true }).then(() => {
      tabs.set(tab.id, true);
      browser.browserAction.setIcon({ path: 'watch-inactive.svg' });
    });
  }
});

browser.tabs.onActivated.addListener(activeInfo => {
  if (tabs.has(activeInfo.tabId)) {
    browser.browserAction.setIcon({ path: 'watch-inactive.svg' });
  } else {
    browser.browserAction.setIcon({ path: 'watch-active.svg' });
  }
});
