// MENU
function toggleMenu(){
  document.getElementById("sidebar").classList.toggle("open");
}

// LANG
function toggleLang(){
  let box = document.getElementById("langBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// =======================
// 🔥 TOKENS REAIS (FUNCIONA)
// =======================
async function loadTokens(){

  const grid = document.getElementById("grid");
  grid.innerHTML = "Carregando memecoins...";

  try{

    const res = await fetch("https://api.dexscreener.com/latest/dex/pairs/bsc");
    const data = await res.json();

    grid.innerHTML = "";

    data.pairs.slice(0,30).forEach(t => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <b>${t.baseToken.name}</b>
        <div>$${Number(t.priceUsd).toFixed(6)}</div>
      `;

      card.onclick = () => openModal(t);

      grid.appendChild(card);
    });

  }catch(e){
    grid.innerHTML = "Erro ao carregar tokens 😢";
  }
}

// =======================
// 🪟 MODAL COMPLETO
// =======================
function openModal(t){

  document.getElementById("modal").style.display = "flex";

  document.getElementById("tokenName").innerText = t.baseToken.name;
  document.getElementById("tokenPrice").innerText = "$" + t.priceUsd;

  document.getElementById("tokenSite").href = t.info?.website || "#";
  document.getElementById("tokenTwitter").href = t.info?.twitter || "#";
  document.getElementById("tokenTg").href = t.info?.telegram || "#";

  // 📊 GRÁFICO TRADINGVIEW
  document.getElementById("chart").innerHTML = `
    <iframe 
      src="https://s.tradingview.com/widgetembed/?symbol=${t.baseToken.symbol}USD&interval=15&theme=dark"
      width="100%" height="250" frameborder="0">
    </iframe>
  `;
}

// FECHAR
function closeModal(){
  document.getElementById("modal").style.display = "none";
}

// =======================
// 📰 NEWS (placeholder)
// =======================
function loadNews(){
  document.getElementById("news").innerHTML =
    "📰 Notícias em breve (Cointelegraph API limitada)";
}

// INIT
loadTokens();
loadNews();
