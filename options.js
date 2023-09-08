
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#settings-form').addEventListener('submit', function(e){
        e.preventDefault();

        browser.storage.sync.set({
            version: document.querySelector('#bs-version').value
        }).then(() => {
            document.querySelector('#saved-confirm').classList.toggle('fadeOut')
        });
    });

    browser.storage.sync.get("version").then(
        (result) => { //Once gotten
        document.querySelector('#bs-version').value = result.version || "5.3";
    }, errorHandler)
});

function errorHandler(error) {
    let errorP = document.querySelector('#error');
    errorP.attr('hidden', false);
    errorP.innerText = error;
}