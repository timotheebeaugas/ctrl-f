// get local storage
async function gotLocalStorage() {
    obj = await browser.storage.local.get();
    return obj.savedWords;
}

// IIFE
(async function(){
    if(await gotLocalStorage()){
        document.getElementById("textarea").innerHTML = await gotLocalStorage();
    }
  })();


// auto save
document.getElementById("textarea").addEventListener('input', function (e) {
    browser.storage.local.set(
        { "savedWords": document.getElementById("textarea").value }             // object
    )
});


// click : clear
document.getElementById("clear").addEventListener("click", async function (e) {
    e.preventDefault();
    browser.storage.local.set(
        { "savedWords": "" }             
    )
    document.getElementById("textarea").value = await gotLocalStorage();
    browser.tabs.executeScript({file: "../scripts/erase.js"})
});

// click : search
document.getElementById("search").addEventListener("click", async function (e) {
    e.preventDefault();
  
    if(await gotLocalStorage()){
        browser.tabs.executeScript({file: "../scripts/highlight.js"})
    }
});

