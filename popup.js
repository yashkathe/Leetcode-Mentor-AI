// check if it matches the website
document.addEventListener("DOMContentLoaded", function() {
    browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
            // get access to tabs
            const activeTab = tabs[ 0 ];
            const currentURL = activeTab.url;

            // get access to elements
            const statusMessageElement = document.querySelector("#status-header");
            const statusEmoji = document.querySelector("#status-para");

            // change the text content of a website
            if(statusMessageElement) {
                if(!currentURL.includes("leetcode.com/problems/")) {
                    statusMessageElement.textContent = " Offsite ⚠️";
                    statusEmoji.innerHTML =
                        "This extension currently only support LeetCode <br> Support for other websites will be added later";
                }
            }
        })
        .catch((error) => {
            statusMessageElement.textContent = " Dev Error 🔧";
            statusEmoji.textContent = error;
        });
});
