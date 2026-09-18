(function(){
  const counter=112565381;
  window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};
  window.ym.l=Date.now();
  const y=document.createElement('script');y.async=true;y.src='https://mc.yandex.ru/metrika/tag.js?id='+counter;document.head.appendChild(y);
  ym(counter,'init',{webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});
  if(!window.fbq){const q=window.fbq=function(){q.callMethod?q.callMethod.apply(q,arguments):q.queue.push(arguments)};q.queue=[];q.loaded=true;q.version='2.0';window._fbq=q;const m=document.createElement('script');m.async=true;m.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(m)}
  fbq('init','1758103622093263');fbq('track','PageView');
  const seen=new Set();
  document.addEventListener('nika:lead-sent',function(e){const d=e.detail||{};if(d.confirmed!==true||!d.leadId||seen.has(d.leadId))return;seen.add(d.leadId);const type=d.formType==='quiz'?'quiz':'mini_form';ym(counter,'reachGoal','form_success');ym(counter,'reachGoal',type+'_success');fbq('track','Lead',{form_type:type,landing:d.landingName},{eventID:d.leadId});fbq('trackCustom',type==='quiz'?'QuizSubmit':'MiniFormSubmit',{landing:d.landingName});});
  let active=0,last=performance.now();const hit=new Set();
  setInterval(function(){const now=performance.now();if(!document.hidden)active+=Math.min(now-last,1500);last=now;[[30,'time_30s'],[60,'time_60s'],[120,'time_120s'],[180,'time_180s']].forEach(([seconds,id])=>{if(active>=seconds*1000&&!hit.has(id)){hit.add(id);ym(counter,'reachGoal',id)}})},1000);
})();
