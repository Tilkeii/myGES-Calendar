console.log("Background");

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'www.myges.fr',
                    schemes: ['https'],
                    pathEquals: '/student/planning-calendar'
                },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log(token);
});
