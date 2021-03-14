//https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif
var browser = browser || chrome;
var redirectListeners = [], agentListeners = [];

function setListener() {
    redirectListeners.forEach(listener => browser.webRequest.onBeforeRequest.removeListener(listener));
    redirectListeners = [];

    agentListeners.forEach(listener => browser.webRequest.onBeforeSendHeaders.removeListener(listener));
    agentListeners = [];

    browser.storage.sync.get(['redirect', 'agent'], function (result) {
        if (result['redirect'] !== undefined)
            result['redirect'].forEach(element => {
                if (element.disabled === undefined || element.disabled === false) {
                    var rtURL = element.rtURL;

                    var redirect = function (requestDetails) {
                        console.log("Redirecting: " + requestDetails.url);
                        return {
                            redirectUrl: rtURL
                        };
                    };

                    browser.webRequest.onBeforeRequest.addListener(
                        redirect,
                        { urls: element.rfURL.split(/\s*;\s*/), types: element.types },
                        ["blocking"]
                    );

                    redirectListeners.push(redirect);
                }
            });

        if (result['agent'] !== undefined)
            result['agent'].forEach(element => {
                if (element.disabled === undefined || element.disabled === false) {

                    var aSet = element.aSet;

                    var rewriteUserAgentHeader = function (e) {
                        console.log(e.requestHeaders);
                        for (var header of e.requestHeaders) {
                            if (header.name.toLowerCase() === "user-agent") {
                                header.value = aSet;
                            }
                        }
                        return { requestHeaders: e.requestHeaders };
                    };

                    browser.webRequest.onBeforeSendHeaders.addListener(
                        rewriteUserAgentHeader,
                        { urls: element.aURL.split(/\s*;\s*/) },
                        ["blocking", "requestHeaders"]
                    );

                    agentListeners.push(rewriteUserAgentHeader);
                }
            });


    });
}

setListener();

browser.browserAction.onClicked.addListener(function () {
    browser.tabs.create({
        'url': browser.runtime.getURL("options/options.html")
    });
});


browser.storage.onChanged.addListener(function (changes, area) {
    setListener();

    // console.log("Change in storage area: " + area);

    // let changedItems = Object.keys(changes);

    // for (let item of changedItems) {
    //     console.log(item + " has changed:");
    //     console.log("Old value: ");
    //     console.log(changes[item].oldValue);
    //     console.log("New value: ");
    //     console.log(changes[item].newValue);

    //     console.log()
    // }
});