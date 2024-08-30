console.log('pop up script loaded');

// check if it matches the website
document.addEventListener("DOMContentLoaded", () => {
    browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
            // get access to tabs
            const activeTab = tabs[ 0 ];
            const currentURL = activeTab.url;

            // get access to elements
            const statusHeader = document.querySelector("#status-header");
            const statusPara = document.querySelector("#status-para");

            // change the text content of a website
            if(statusHeader) {
                if(!currentURL.includes("leetcode.com/problems/")) {

                    // If the URL doesn't match LeetCode
                    if(statusHeader) {
                        statusHeader.textContent = "Offsite ⚠️";
                        statusPara.innerHTML = "This extension currently only supports LeetCode.<br>Support for other websites will be added later.";
                    }
                }
            }
        })
        .catch((error) => {
            const statusHeader = document.querySelector("#status-header");
            const statusPara = document.querySelector("#status-para");

            statusHeader.textContent = " Dev Error 🔧";
            statusPara.textContent = error;
        });
});


// set the title
document.addEventListener('DOMContentLoaded', () => {

    browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
            // get access to tabs
            const activeTab = tabs[ 0 ];
            const currentURL = activeTab.url;

            // get access to elements
            const mainDiv = document.querySelector('#active-leetcode');
            const titleHeader = document.querySelector("#problem-title");
            const statusDiv = document.querySelector('#status-div');
            const spinner = document.querySelector('.loader');
            const hintButton = document.querySelector('#hint-btn');

            if(currentURL.includes("leetcode.com/problems/")) {

                hintButton.style.display = 'block';
                mainDiv.style.display = 'flex';
                statusDiv.style.display = 'none';

                browser.tabs.sendMessage(activeTab.id, { type: "GET-TITLE" }).then((response) => {
                    if(response && response.title) {
                        titleHeader.textContent = response.title + ' 🚀';
                    } else {
                        titleHeader.textContent = "Title not found";
                        statusPara.textContent = "Could not fetch the problem title.";
                    }
                }).catch((error) => {
                    titleHeader.textContent = 'Loading ⌛';
                    spinner.style.display = 'inline-block';
                    statusDiv.style.display = 'none';
                    hintButton.style.display = 'none';
                });
            }

        });

});

// fetch hints from API

document.addEventListener('DOMContentLoaded', () => {

    browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
            // get access to tabs
            const activeTab = tabs[ 0 ];

            const hintButton = document.querySelector('#hint-btn');
            hintButton.addEventListener('click', () => {

                // get access to elements
                const readme = document.querySelector('#readme');
                const spinner = document.querySelector('.loader');

                // fetch api
                spinner.style.display = 'inline-block';

                browser.tabs.sendMessage(activeTab.id, { type: "GET-API-DATA" }).then((response) => {
                    if(response) {
                        console.log(response);
                    }
                }).catch((error) => {
                    console.log(error);
                });

                spinner.style.display = 'none';
            });
        });
});
