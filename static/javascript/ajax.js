document.querySelector('body').addEventListener('click',function(ev){
var ele = ev.target;
if(ele.className =='del');
{   var liElement = ele.parentElement;
    var name = liElement.firstElementChild.textContent;
    del(name);
    liElement.remove();
}
    return false;
}
                                                   );
function del(name) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     console.log("done");
    }
  };
  xhttp.open("DELETE", "/users?name="+name, true);
  xhttp.send();
}