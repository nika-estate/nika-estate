(function(){
  document.querySelectorAll('a[href="#register"]').forEach(function(link){
    link.addEventListener('click',function(){
      var input=document.querySelector('#register input[name="name"]');
      if(input){window.setTimeout(function(){input.focus({preventScroll:true});},500);}
    });
  });
  document.querySelectorAll('form[data-webinar-registration]').forEach(function(form){
    var goal=form.querySelector('select[name="goal"]');
    if(!goal)return;
    var formName=form.dataset.formName;
    function syncGoal(){
      form.dataset.formName=goal.value?formName+' — цель: '+goal.value:formName;
    }
    goal.addEventListener('change',syncGoal);
    form.addEventListener('submit',syncGoal,true);
    syncGoal();
  });
})();
