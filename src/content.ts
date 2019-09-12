console.log("Content");

chrome.storage.local.get('version', (res) => {
    console.log('Res', res);
})