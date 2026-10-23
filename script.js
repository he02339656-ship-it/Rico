(() => {
  const published = guests.filter(g => g.consent === true && Number.isFinite(g.lat) && Number.isFinite(g.lng));
  const mapEl = document.getElementById("map");
  const cards = document.getElementById("cards");
  const search = document.getElementById("search");
  const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const photoUrl = p => typeof p === "string" && /^photos\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp)$/i.test(p) ? p : "";
  const countryCount = new Set(published.map(g => g.country.trim().toLowerCase())).size;
  document.getElementById("guestCount").textContent = `${published.length} guests`;
  document.getElementById("countryCount").textContent = `${countryCount} countries`;
  const map = typeof L !== "undefined" ? L.map(mapEl, {scrollWheelZoom:false}).setView([18,12],2) : null;
  if(map) L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:18, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  else mapEl.textContent = "Map could not load. Check your internet connection.";
  const layer = map ? L.layerGroup().addTo(map) : null;
  function render(items) {
    cards.replaceChildren();
    if(layer) layer.clearLayers();
    const bounds = [];
    for(const g of items) {
      const card = document.createElement("article"); card.className="card";
      const url=photoUrl(g.photo);
      const pic=document.createElement(url?"img":"div");
      if(url){pic.src=url;pic.alt=`Photo shared by ${g.nickname}`;pic.loading="lazy";pic.onerror=()=>pic.replaceWith(makePlaceholder());}
      else {pic.className="placeholder";pic.textContent="🌍";}
      card.append(pic);
      const body=document.createElement("div");body.className="card-body";
      const heading=document.createElement("h3");heading.textContent=`${g.nickname} · ${g.country}`;
      const city=document.createElement("p");city.textContent=`📍 ${g.city}`;
      const story=document.createElement("p");story.textContent=g.story;
      const date=document.createElement("p");date.className="date";date.textContent=g.date;
      body.append(heading,city,story,date);card.append(body);cards.append(card);
      if(layer){
        const marker=L.marker([g.lat,g.lng]).addTo(layer);
        const popup=document.createElement("div");
        const title=document.createElement("strong");title.textContent=`${g.nickname} — ${g.country}`;
        const detail=document.createElement("p");detail.textContent=`${g.city} · ${g.story}`;
        popup.append(title,detail);
        if(url){const img=document.createElement("img");img.src=url;img.alt="Guest photo";popup.append(img);}
        marker.bindPopup(popup);
        marker.on("click",()=>card.scrollIntoView({behavior:"smooth",block:"nearest"}));
        bounds.push([g.lat,g.lng]);
      }
    }
    if(!items.length){const p=document.createElement("p");p.className="empty";p.textContent="No matching guests yet.";cards.append(p);}
    if(map){if(bounds.length)map.fitBounds(bounds,{padding:[35,35],maxZoom:4});else map.setView([18,12],2);}
  }
  function makePlaceholder(){const div=document.createElement("div");div.className="placeholder";div.textContent="🌍";return div;}
  search.addEventListener("input",()=>{
    const q=search.value.trim().toLocaleLowerCase();
    render(published.filter(g=>[g.nickname,g.country,g.city,g.story].some(v=>String(v).toLocaleLowerCase().includes(q))));
  });
  document.getElementById("reset").addEventListener("click",()=>{search.value="";render(published);});
  render(published);
})();
