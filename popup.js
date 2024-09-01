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
                browser.tabs.sendMessage(activeTab.id, { type: "GET-API-DATA" }).then(async (response) => {
                    console.log(response)
                    if(response) {

                        console.log(response);

                        readme.style.display = 'none';
                        spinner.style.display = 'inline-block';

                        const fetchResult = await fetchReadmeContent(response);

                        const htmlContent = fetchResult.hints;
                        readme.textContent = htmlContent;

                        readme.style.display = 'block';
                        spinner.style.display = 'none';
                    }
                }).catch((error) => {
                    console.log(error);
                });

            });
        });
});

const fetchReadmeContent = async (responseData) => {
    try {
        const apiUrl = 'http://127.0.0.1:5000/get-hints/phi3:latest'; // Replace with your API URL

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseData) // Send the response data as the request body
        };

        const response = await fetch(apiUrl, fetchOptions);

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Assuming the response is JSON
        return data; // This is the content that you want to display

    } catch(error) {
        console.error('Error fetching README content:', error);
        return { error: 'Failed to fetch README content' };
    }
};
