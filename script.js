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
// TOKENS (DEXSCREENER API)
// =======================
async function loadTokens(){

  const res = await fetch("https://api.dexscreener.com/latest/dex/tokens/eth");
  const data = await res.json();

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  data.pairs.slice(0,20).forEach(t => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <b>${t.baseToken.name}</b>
      <div>$${t.priceUsd}</div>
    `;

    card.onclick = () => openModal(t);

    grid.appendChild(card);
  });
}

// =======================
// MODAL TOKEN
// =======================
function openModal(t){

  document.getElementById("modal").style.display = "flex";

  document.getElementById("tokenName").innerText = t.baseToken.name;
  document.getElementById("tokenPrice").innerText = "$" + t.priceUsd;

  document.getElementById("tokenSite").href = t.info?.website || "#";
  document.getElementById("tokenTwitter").href = t.info?.twitter || "#";
  document.getElementById("tokenTg").href = t.info?.telegram || "#";
}

// CLOSE
function closeModal(){
  document.getElementById("modal").style.display = "none";
}

// =======================
// NEWS (EXEMPLO SIMPLES)
// =======================
async function loadNews(){
  const newsDiv = document.getElementById("news");

  newsDiv.innerHTML = "API notícia aqui (Cointelegraph)";
}

// INIT
loadTokens();
loadNews();
