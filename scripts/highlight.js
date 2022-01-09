// get local storage
async function gotLocalStorage() {
  obj = await browser.storage.local.get();
  return obj.savedWords;
}

// IIFE
(async function(){

  let mark = "<mark>";
  let text = document.body.innerHTML;
  let re = new RegExp(mark,"g"); 
  let newText = text.replace(re, " ");
  document.body.innerHTML = newText;  

  let searched = await gotLocalStorage();

  if(searched.length > 0){

    let array = searched.toString().split(",")

    for(i = 0; i < array.length; i++){
      let text = document.body.innerHTML;
      let re = new RegExp(array[i],"g"); 
      let newText = text.replace(re, `<mark>${array[i]}</mark>`);
      document.body.innerHTML = newText;  
    }

  }

})();


