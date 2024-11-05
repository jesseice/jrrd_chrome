chrome.runtime.onInstalled.addListener(() => {
  console.log("[setBadgeText] ---> ", "setBadgeText");
  chrome.action.setBadgeText({
    text: "ON",
  });

  chrome.sidePanel.setOptions({
    enabled: true,
  });
});
