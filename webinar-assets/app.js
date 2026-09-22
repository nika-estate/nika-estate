(function(){
  document.querySelectorAll('a[href="#register"]').forEach(function(link){
    link.addEventListener('click',function(){
      var input=document.querySelector('#register input[name="name"]');
      if(input){window.setTimeout(function(){input.focus({preventScroll:true});},500);}
    });
  });
})();
