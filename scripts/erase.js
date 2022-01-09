  var mark = "<mark>";
    let text = document.body.innerHTML;
    let re = new RegExp(mark,"g"); // search for all instances
    let newText = text.replace(re, " ");
    document.body.innerHTML = newText;  


