// ESPERA CARREGAR
document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".meme-card");

  // =========================
  // 🔍 BUSCA
  // =========================
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const name = card.innerText.toLowerCase();

      if(name.includes(value)){
        card.style.display = "block";
      }else{
        card.style.display = "none";
      }
    });
  });

  // =========================
  // 🖱️ CLICK NOS CARDS
  // =========================
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.children[0].innerText;
      const price = card.children[1].innerText;

      openModal(title, price);
    });
  });

});


// =========================
// 🪟 MODAL
// =========================
function openModal(title, price){
  const modal = document.getElementById("modal");

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = price;

  modal.style.display = "flex";
}


// =========================
// ❌ FECHAR MODAL
// =========================
function closeModal(){
  document.getElementById("modal").style.display = "none";
}


// =========================
// 🖱️ FECHAR CLICANDO FORA
// =========================
window.onclick = function(e){
  const modal = document.getElementById("modal");

  if(e.target === modal){
    modal.style.display = "none";
  }
};
