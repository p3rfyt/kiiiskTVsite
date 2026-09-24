/* kiiiskTV — локальный график мест без внешних библиотек */
(() => {
  "use strict";
  const host = document.getElementById("playerTournamentChart");
  const id = document.body.dataset.playerId;
  const data = window.KIIISK_PROFILE_CHARTS?.[id];
  if (!host || !data || !data.labels?.length) return;

  const esc = v => String(v ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]));
  const draw = () => {
    const width = Math.max(620, host.clientWidth || 620);
    const height = 300, left = 42, right = 18, top = 18, bottom = 54;
    const plotW = width-left-right, plotH = height-top-bottom;
    const max = Math.max(5, ...data.values.map(Number));
    const x = i => left + (data.values.length === 1 ? plotW/2 : i*plotW/(data.values.length-1));
    const y = v => top + ((Number(v)-1)/(max-1 || 1))*plotH;
    const points = data.values.map((v,i)=>[x(i),y(v)]);
    const line = points.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
    const area = line + ` L ${points.at(-1)[0].toFixed(1)} ${(top+plotH).toFixed(1)} L ${points[0][0].toFixed(1)} ${(top+plotH).toFixed(1)} Z`;
    const grid = [1, Math.max(2,Math.ceil(max/2)), max].filter((v,i,a)=>a.indexOf(v)===i).map(v=>{
      const yy=y(v); return `<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" class="chart-grid"/><text x="${left-10}" y="${yy+4}" text-anchor="end" class="chart-axis">${v}</text>`;
    }).join("");
    const labels = data.labels.map((label,i)=>{
      const short=label.length>15?label.slice(0,14)+"…":label;
      return `<text x="${x(i)}" y="${height-18}" text-anchor="middle" class="chart-label">${esc(short)}</text>`;
    }).join("");
    const dots = points.map((p,i)=>`<g class="chart-point" tabindex="0" data-i="${i}"><circle cx="${p[0]}" cy="${p[1]}" r="5.5"/><circle cx="${p[0]}" cy="${p[1]}" r="11" class="chart-hit"/></g>`).join("");
    host.innerHTML=`<div class="local-chart-scroll"><svg class="local-placement-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="График мест на турнирах"><defs><linearGradient id="placementFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".22"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${area}" class="chart-area"/><path d="${line}" class="chart-line"/>${dots}${labels}<text x="${left}" y="12" class="chart-small">1 место — выше</text></svg><div class="local-chart-tip" hidden></div></div>`;
    const tip=host.querySelector('.local-chart-tip');
    host.querySelectorAll('.chart-point').forEach(point=>{
      const show=()=>{const i=Number(point.dataset.i);tip.innerHTML=`<strong>${esc(data.labels[i])}</strong><span>${esc(data.results[i]||(`${data.values[i]} место`))}</span>`;tip.hidden=false;};
      point.addEventListener('mouseenter',show); point.addEventListener('focus',show);
      point.addEventListener('mouseleave',()=>tip.hidden=true); point.addEventListener('blur',()=>tip.hidden=true);
    });
  };
  draw();
  window.addEventListener("resize",draw);
})();
