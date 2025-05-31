// Toggle menu mobile
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  navToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  // Fecha o menu ao clicar em algum link (mobile)
  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("active")) {
        navList.classList.remove("active");
      }
    });
  });

  // Botões de compra VIP
  document.querySelectorAll('.vip-btn').forEach(button => {
    button.addEventListener('click', () => {
      alert('Você será redirecionado para a loja em breve!');
    });
  });
});

// Scroll suave até a seção desejada
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Função para copiar texto de um elemento <code>
function copiarTexto(elementId) {
  const texto = document.getElementById(elementId).innerText;

  navigator.clipboard.writeText(texto).then(() => {
    alert("IP copiado com sucesso!");
  }).catch(() => {
    alert("Erro ao copiar IP.");
  });
}
