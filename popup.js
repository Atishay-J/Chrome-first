let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

function setPageBackgroundColor() {
  let curColor = document.body.style.background;
  let allDivs = document.querySelectorAll("div");

  console.log("Cur Color", curColor);

  if (curColor === "rgb(58, 167, 87)") {
    allDivs.forEach((elem) => {
      elem.style.backgroundColor = "red";
      elem.style.color = "white";
    });
    return (document.body.style.background = "red");
  }

  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.background = color;
  });
}
