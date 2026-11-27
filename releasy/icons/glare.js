/* Animated favicon: a small light glare sweeps across the disc every 7 seconds. Best effort, falls back to the still icon. */
(function(){
  try{
    if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    var img=new Image();img.src='/releasy/icons/favicon-192.png';
    var S=48,c=document.createElement('canvas');c.width=c.height=S;var x=c.getContext('2d');
    var running=false;
    function frame(p){
      x.clearRect(0,0,S,S);x.save();x.beginPath();x.arc(S/2,S/2,S*0.458,0,7);x.clip();
      x.drawImage(img,0,0,S,S);
      var cx=-S*0.4+p*S*1.8;
      var g=x.createLinearGradient(cx-S*0.25,0,cx+S*0.25,S*0.27);
      g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.22,'rgba(255,255,255,.18)');g.addColorStop(.5,'rgba(255,255,255,.9)');g.addColorStop(.78,'rgba(255,255,255,.18)');g.addColorStop(1,'rgba(255,255,255,0)');
      x.fillStyle=g;x.fillRect(0,0,S,S);x.restore();
      return c.toDataURL('image/png');
    }
    function run(){
      if(running||document.hidden||!img.complete||!img.naturalWidth)return;running=true;
      var olds=[].slice.call(document.querySelectorAll('link[rel~="icon"]'));
      var a=document.createElement('link');a.rel='icon';a.type='image/png';
      olds.forEach(function(l){l.parentNode.removeChild(l)});document.head.appendChild(a);
      var t0=performance.now(),D=560;
      (function step(t){
        var p=Math.min(1,(t-t0)/D);a.href=frame(p);
        if(p<1)setTimeout(function(){step(performance.now())},40);
        else{document.head.removeChild(a);olds.forEach(function(l){document.head.appendChild(l)});running=false}
      })(t0);
    }
    img.onload=function(){setTimeout(run,1200);setInterval(run,7000)};
  }catch(e){}
})();
