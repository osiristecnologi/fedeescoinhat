// =======================
// MENU / LANG
// =======================
function toggleMenu(){
  document.getElementById("sidebar").classList.toggle("open");
}

function toggleLang(){
  let box = document.getElementById("langBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// =======================
// 🔥 BUSCAR TOKENS REAIS (SEM REPETIÇÃO)
// =======================
async function loadTokens(){

  const grid = document.getElementById("grid");
  grid.innerHTML = "Carregando...";

  try{
    const res = await fetch("https://api.dexscreener.com/latest/dex/search/?q=trending");
    const data = await res.json();

    grid.innerHTML = "";

    // remover duplicados por nome
    const unique = [];
    const names = new Set();

    data.pairs.forEach(t => {
      if(!names.has(t.baseToken.name)){
        names.add(t.baseToken.name);
        unique.push(t);
      }
    });

    unique.slice(0,20).forEach(t => {

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
    grid.innerHTML = "Erro ao carregar 😢";
  }
}

// =======================
// 🪟 MODAL COMPLETO
// =======================
function openModal(t){

  const modal = document.getElementById("modal");
  modal.style.display = "flex";

  document.getElementById("tokenName").innerText = t.baseToken.name;
  document.getElementById("tokenPrice").innerText = "$" + t.priceUsd;

  document.getElementById("tokenSite").href = t.info?.website || "#";
  document.getElementById("tokenTwitter").href = t.info?.twitter || "#";
  document.getElementById("tokenTg").href = t.info?.telegram || "#";

  // 🔥 GRÁFICO REAL TRADINGVIEW (FUNCIONANDO)
  document.getElementById("chart").innerHTML = `
    <iframe 
      src="https://s.tradingview.com/widgetembed/?symbol=${t.baseToken.symbol}USD&interval=15&theme=dark"
      style="width:100%; height:250px; border:none;">
    </iframe>
  `;
}

// =======================
// ❌ FECHAR MODAL (CORRIGIDO)
// =======================
function closeModal(){
  document.getElementById("modal").style.display = "none";
}

// clicar fora fecha
window.addEventListener("click", (e)=>{
  const modal = document.getElementById("modal");
  if(e.target === modal){
    modal.style.display = "none";
  }
});

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  loadTokens();
});
