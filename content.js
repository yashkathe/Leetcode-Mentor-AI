console.log('Content script loaded');

// get Element and its Text Content
const getElement = (selector, messageID) => {

    const waitForElement = () => {

        const element = document.querySelector(selector);

        if(element) {

            // access header
            let content = element.textContent;

            // send message to PoPUP
            browser.runtime.onMessage.addListener((message, sender, sendResponse) => {

                if(message.type === messageID) {
                    sendResponse({ title: content });
                }

            });

        } else {
            setTimeout(waitForElement, 100);
        }

    };

    waitForElement();

};

// get problem title
getElement('a.cursor-text', 'GET-TITLE');

// get content for API
// get Element and its Text Content
const getDataForApi = (selectors, messageID) => {

    const waitForElement = () => {

        let [ problemSelector, languageSelector, solutionSelector ] = selectors;

        const problemEle = document.querySelector(problemSelector)
        const languageEle = document.querySelector(languageSelector)
        const solutionEle = document.querySelector(solutionSelector)


        if(problemEle && languageEle && solutionEle) {

            // access header
            let problemContent = problemEle.textContent;
            let languageContent = languageEle.textContent;
            let solutionContent = solutionEle.textContent;


            // send message to PoPUP
            browser.runtime.onMessage.addListener((message, sender, sendResponse) => {

                if(message.type === messageID) {
                    sendResponse({
                        problem: problemContent,
                        language: languageContent,
                        solution: solutionContent
                    });
                }

            });

        } else {
            setTimeout(waitForElement, 100);
        }

    };

    waitForElement();

};

// get content for api
getDataForApi([
    '.elfjS',
    '.px-1\\.5',
    'div.flex-1:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)'
]
    , 'GET-API-DATA');

            