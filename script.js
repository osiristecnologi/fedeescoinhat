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
// 🔥 DADOS GARANTIDOS (fallback)
// =======================
const fallbackTokens = [
  {
    name:"Pepe",
    symbol:"PEPE",
    price:0.0000012,
    site:"https://pepe.vip",
    twitter:"https://twitter.com/pepecoineth",
    telegram:"#"
  },
  {
    name:"Dogecoin",
    symbol:"DOGE",
    price:0.15,
    site:"https://dogecoin.com",
    twitter:"https://twitter.com/dogecoin",
    telegram:"#"
  },
  {
    name:"Shiba Inu",
    symbol:"SHIB",
    price:0.00002,
    site:"https://shibatoken.com",
    twitter:"https://twitter.com/shibtoken",
    telegram:"#"
  }
];

// =======================
// RENDER
// =======================
function render(tokens){

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  tokens.forEach(t => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <b>${t.name}</b>
      <div>$${t.price}</div>
    `;

    card.onclick = () => openModal(t);

    grid.appendChild(card);
  });
}

// =======================
// API REAL (SE FUNCIONAR)
// =======================
async function loadTokens(){

  try{

    const res = await fetch("https://api.dexscreener.com/latest/dex/search/?q=pepe");
    const data = await res.json();

    if(data.pairs && data.pairs.length > 0){

      const tokens = data.pairs.slice(0,20).map(t => ({
        name:t.baseToken.name,
        symbol:t.baseToken.symbol,
        price:t.priceUsd,
        site:t.info?.website || "#",
        twitter:t.info?.twitter || "#",
        telegram:t.info?.telegram || "#"
      }));

      render(tokens);

    }else{
      render(fallbackTokens);
    }

  }catch(e){
    render(fallbackTokens);
  }
}

// =======================
// MODAL
// =======================
function openModal(t){

  document.getElementById("modal").style.display = "flex";

  document.getElementById("tokenName").innerText = t.name;
  document.getElementById("tokenPrice").innerText = "$" + t.price;

  document.getElementById("tokenSite").href = t.site;
  document.getElementById("tokenTwitter").href = t.twitter;
  document.getElementById("tokenTg").href = t.telegram;

  // gráfico simples (placeholder)
  document.getElementById("chart").innerHTML =
    "📊 gráfico (integração TradingView aqui)";
}

// =======================
// BUSCA
// =======================
document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("searchInput");

  input.addEventListener("input", () => {
    const v = input.value.toLowerCase();

    const filtered = fallbackTokens.filter(t =>
      t.name.toLowerCase().includes(v)
    );

    render(filtered);
  });

});

// =======================
// INIT
// =======================
loadTokens();
