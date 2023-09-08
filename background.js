/**
 * Redirect matching URLs to the new URL.
 *
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest
 *
 * @param {object} requestDetails
 * @return {object}
 */

let redirVersion;

function redirect(requestDetails) {
    const regex = /\/([0-9]+\.[0-9]+)\//gm
    const requestedVersion = regex.exec(requestDetails.url)
    if (requestedVersion && requestedVersion[1] !== redirVersion) {
        const newUrl = requestDetails.url.replace(regex, '/' + redirVersion + '/')
        console.log(requestDetails.url, newUrl)
        return {
            redirectUrl: newUrl
        }
    }
}

function fetchUserVersion() {
    return browser.storage.sync.get("version").then((result) => {
        redirVersion = result.version ?? '5.3';
        console.log("Noticed user conf change. Version is now: " + redirVersion);
    });
}

browser.storage.onChanged.addListener(() => {
    fetchUserVersion();
})

fetchUserVersion(); //We need to get it otherwise we will default to 5.3 for the first web page.

chrome.webRequest.onBeforeRequest.addListener(
    redirect,
    {
        urls: [
            '*://getbootstrap.com/docs/*',
        ],
        types: [
            'main_frame',
        ],
    },
    ['blocking']
)