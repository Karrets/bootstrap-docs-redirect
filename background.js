/**
 * Redirect matching URLs to the new URL.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest
 * 
 * @param {object} requestDetails
 * @return {object}
 */
function redirect(requestDetails) {
    const latestVersion = '5.1'
    const regex = /\/([0-9]+\.[0-9]+)\//gm
    const requestedVersion = regex.exec(requestDetails.url)
    if (requestedVersion && requestedVersion[1] !== latestVersion) {
        const newUrl = requestDetails.url.replace(regex, '/' + latestVersion + '/')
        // console.log(requestDetails.url, newUrl)
        return {
            redirectUrl: newUrl
        }
    }
}

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