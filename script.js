// =======================
// TOKENS LIMPOS (SEM REPETIÇÃO + FILTRO BOM)
// =======================
async function loadTokens(){

  const grid = document.getElementById("grid");
  grid.innerHTML = "Carregando...";

  try{

    const res = await fetch("https://api.dexscreener.com/latest/dex/pairs/ethereum");
    const data = await res.json();

    const seen = new Set();
    const clean = [];

    data.pairs.forEach(t => {

      const name = t.baseToken.name;

      // remove duplicados
      if(seen.has(name)) return;
      seen.add(name);

      // filtro de lixo (sem liquidez mínima)
      if(!t.liquidity || t.liquidity.usd < 10000) return;

      clean.push(t);
    });

    grid.innerHTML = "";

    clean.slice(0,20).forEach(t => {

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
    grid.innerHTML = "Erro ao carregar";
  }
}
