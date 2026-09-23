(function(){
  const counter=112565381;
  window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};
  window.ym.l=Date.now();
  const y=document.createElement('script');y.async=true;y.src='https://mc.yandex.ru/metrika/tag.js?id='+counter;document.head.appendChild(y);
  ym(counter,'init',{webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});
  if(!window.fbq){const q=window.fbq=function(){q.callMethod?q.callMethod.apply(q,arguments):q.queue.push(arguments)};q.queue=[];q.loaded=true;q.version='2.0';window._fbq=q;const m=document.createElement('script');m.async=true;m.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(m)}
  fbq('set','autoConfig',false,'1758103622093263');fbq('init','1758103622093263');fbq('track','PageView');
  const seen=new Set();
  document.addEventListener('nika:lead-sent',function(e){const d=e.detail||{};if(d.confirmed!==true||!d.leadId||seen.has(d.leadId))return;seen.add(d.leadId);const type=d.formType==='quiz'?'quiz':'mini_form';ym(counter,'reachGoal','lead_sent');ym(counter,'reachGoal',type+'_sent');fbq('track','Lead',{form_type:type,landing:d.landingName},{eventID:d.leadId});fbq('trackCustom',type==='quiz'?'QuizLead':'MiniFormLead',{landing:d.landingName},{eventID:d.leadId+':'+type});});
  let active=0,last=performance.now(),visible=!document.hidden;const hit=new Set();
  const goals=[[30,'time_30s'],[60,'time_60s'],[120,'time_120s'],[180,'time_180s']];
  function updateActiveTime(){const now=performance.now();if(visible)active+=Math.max(0,now-last);last=now;goals.forEach(([seconds,id])=>{if(active>=seconds*1000&&!hit.has(id)){hit.add(id);ym(counter,'reachGoal',id)}});if(hit.size===goals.length)clearInterval(timer)}
  document.addEventListener('visibilitychange',function(){updateActiveTime();visible=!document.hidden});
  const timer=setInterval(updateActiveTime,1000);
})();
(function(w,d){if(!w.location||!d.head||typeof d.createElement!=='function'||(d.querySelector&&d.querySelector('script[data-nika-value-gallery]')))return;const m='/nika-estate/',p=w.location.pathname,i=p.indexOf(m),r=i>=0?p.slice(0,i)+m:'/';const s=d.createElement('script');s.src=r+'assets/scripts/value-gallery.js?v=20260921-1';s.defer=true;s.dataset.nikaValueGallery='true';d.head.appendChild(s)})(window,document);
