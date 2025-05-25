// Parte 1 - script básico com evento de botão

console.log("Script carregado - parte 1");

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnTeste");
  const mensagem = document.getElementById("mensagem");

  btn.addEventListener("click", () => {
    mensagem.textContent = "JS funcionando! Você clicou no botão.";
  });
});
