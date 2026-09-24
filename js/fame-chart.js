/* kiiiskTV — график Зала славы без внешних библиотек */
(() => {
  "use strict";
  const host=document.getElementById("famePlacementChart");
  if(!host)return;
  const labels=["Kiiisk 5 vs 5","Kiiisk Trio","Kiiisk Duo Cup 2","Kiiisk Duo Cup 4","Kiiisk Duo Cup 5"];
  const values=[1,7,1,2,9];
  const results=["1 место","7-8 место","1 место","2 место","9-16 место"];
  const esc=v=>String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]));
  const draw=()=>{
    const width=Math.max(620,host.clientWidth||620),height=300,left=42,right=18,top=18,bottom=54,plotW=width-left-right,plotH=height-top-bottom,max=Math.max(9,...values);
    const x=i=>left+(values.length===1?plotW/2:i*plotW/(values.length-1)),y=v=>top+((v-1)/(max-1))*plotH;
    const pts=values.map((v,i)=>[x(i),y(v)]),line=pts.map((p,i)=>(i?"L":"M")+p[0]+" "+p[1]).join(" "),area=line+` L ${pts.at(-1)[0]} ${top+plotH} L ${pts[0][0]} ${top+plotH} Z`;
    const grid=[1,5,9].map(v=>{const yy=y(v);return `<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" class="fame-chart-grid"/><text x="${left-10}" y="${yy+4}" text-anchor="end" class="fame-chart-axis">${v}</text>`}).join("");
    const labs=labels.map((l,i)=>`<text x="${x(i)}" y="${height-18}" text-anchor="middle" class="fame-chart-label">${esc(l.length>16?l.slice(0,15)+"…":l)}</text>`).join("");
    const dots=pts.map((p,i)=>`<g class="fame-chart-point" tabindex="0" data-i="${i}"><circle cx="${p[0]}" cy="${p[1]}" r="5.5"/><circle cx="${p[0]}" cy="${p[1]}" r="11" class="fame-chart-hit"/></g>`).join("");
    host.innerHTML=`<div class="local-chart-scroll"><svg class="local-placement-chart fame-placement-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="История занятых мест"><defs><linearGradient id="fameFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffd45a" stop-opacity=".24"/><stop offset="1" stop-color="#ffd45a" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${area}" class="fame-chart-area"/><path d="${line}" class="fame-chart-line"/>${dots}${labs}<text x="${left}" y="12" class="fame-chart-small">1 место — выше</text></svg><div class="local-chart-tip fame-tip" hidden></div></div>`;
    const tip=host.querySelector('.local-chart-tip');
    host.querySelectorAll('.fame-chart-point').forEach(p=>{const show=()=>{const i=+p.dataset.i;tip.innerHTML=`<strong>${esc(labels[i])}</strong><span>${esc(results[i])}</span>`;tip.hidden=false};p.addEventListener('mouseenter',show);p.addEventListener('focus',show);p.addEventListener('mouseleave',()=>tip.hidden=true);p.addEventListener('blur',()=>tip.hidden=true)});
  };
  draw(); window.addEventListener('resize',draw);
})();
