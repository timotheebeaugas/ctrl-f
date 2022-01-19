// get local storage
async function gotLocalStorage() {
  obj = await browser.storage.local.get();
  return obj.savedWords;
}

// close notification
function openForm() {
  document.getElementById("target").style.display = "block";
  }

// IIFE
(async function (){

let body  = document.body.innerHTML;

let searched = await gotLocalStorage();
let array = searched.toString().split(",");

let results = []

  if(searched.length > 0 && body){
    
    // search each words in the web page
    array.forEach(word => 
      {
      let regex = new RegExp(word,"ig"); //i
      let found = body.match(regex);
      if(found){
        let obj = {
          'value': word, 
          'occurrence': found.length
        }
        results.push(obj)
      }
    });

    
    if(results.length > 0)

    // return results as a string
    function result(){
      a = []
      results.forEach(x => 
        a.push(x.value+" ("+x.occurrence+")")
        )
      return a.join()
    }

    // send a notification on the web page like a popup
    let style = document.createElement('style');

    style.innerHTML = `
    #target {
      display: block;
      z-index: 100;
      padding: 5px;
      border: none;
      background-color: rgb(0,128,0);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: white;
      text-align: center; 
      position: fixed; 
      bottom: 0%;
      width: 100%;
      font-size: 15px;
      font-weight: bold;
      -webkit-animation: fadeinout 10s linear forwards;
      animation: fadeinout 10s linear forwards;
    }

    @-webkit-keyframes fadeinout {
      0%,100% { opacity: 0; }
      5% { opacity: 1; }
      90% { opacity: 1; }
    }
    
    @keyframes fadeinout {
      0%,100% { opacity: 0; }
      5% { opacity: 1; }
      90% { opacity: 1; }
    }
    `;

    document.head.appendChild(style);

    let div = document.createElement("div");
    div.setAttribute("id","target");
    div.innerHTML = result()
    document.body.appendChild(div); 

    // remove notification after 10 seconds
    window.setTimeout(closeForm, 10000)

  }

})();





