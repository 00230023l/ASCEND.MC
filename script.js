// Garante que todo o conteúdo do DOM esteja carregado antes de executar os scripts
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  // Funcionalidade de alternar o menu de navegação mobile
  if (navToggle && navList) { // Verifica se os elementos existem para evitar erros
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("active");
      // Adiciona ou remove aria-expanded para acessibilidade
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !isExpanded);
      // Altera o ícone do botão de menu (hambúrguer para 'X' e vice-versa)
      navToggle.querySelector('i').classList.toggle('fa-bars');
      navToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Fecha o menu mobile quando um link de navegação é clicado
    navList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (navList.classList.contains("active")) {
          navList.classList.remove("active");
          navToggle.setAttribute('aria-expanded', 'false'); // Reseta aria-expanded
          // Volta o ícone para hambúrguer
          navToggle.querySelector('i').classList.remove('fa-times');
          navToggle.querySelector('i').classList.add('fa-bars');
        }
      });
    });
  }

  // Adiciona funcionalidade aos botões de compra VIP
  document.querySelectorAll('.vip-btn').forEach(button => {
    button.addEventListener('click', () => {
      alert('Você será redirecionado para a loja em breve!');
      // Exemplo de como você poderia redirecionar:
      // window.location.href = 'URL_DA_SUA_LOJA';
    });
  });
});

/**
 * Rola suavemente a janela até a seção desejada.
 * @param {string} id - O ID da seção para a qual rolar.
 */
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Apenas um aviso no console se a seção não for encontrada
    console.warn(`Seção com ID '${id}' não encontrada para rolagem.`);
  }
}

/**
 * Copia o texto de um elemento especificado para a área de transferência e fornece feedback ao usuário.
 * @param {string} elementId - O ID do elemento cujo conteúdo de texto será copiado.
 */
function copiarTexto(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemento com ID '${elementId}' não encontrado.`);
    alert("Erro: Elemento para copiar não encontrado.");
    return;
  }

  const textToCopy = element.innerText;

  // Usa a API Clipboard moderna para melhor segurança e experiência do usuário
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Mostra um feedback visual temporário em vez de apenas um alert
        showTemporaryFeedback(element, "Copiado!");
        console.log("IP copiado com sucesso!");
      })
      .catch(err => {
        console.error("Erro ao copiar IP:", err);
        alert("Erro ao copiar IP. Por favor, tente novamente.");
      });
  } else {
    // Fallback para navegadores mais antigos (menos comum hoje em dia)
    try {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed"; // Evita rolagem para o final
      textArea.style.left = "-999999px"; // Fora da tela
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      showTemporaryFeedback(element, "Copiado!");
      console.log("IP copiado com sucesso (fallback)!");
    } catch (err) {
      console.error("Erro ao copiar IP (fallback):", err);
      alert("Erro ao copiar IP. Seu navegador pode não suportar esta função.");
    }
  }
}

/**
 * Mostra um feedback visual temporário próximo ao elemento copiado.
 * @param {HTMLElement} element - O elemento próximo ao qual o feedback será exibido.
 * @param {string} message - A mensagem a ser exibida.
 */
function showTemporaryFeedback(element, message) {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.textContent = message;
  feedbackDiv.style.cssText = `
    position: absolute;
    background-color: #4caf50;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8em;
    opacity: 0;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    transform: translateY(0);
    z-index: 1000;
    white-space: nowrap; /* Evita que o texto quebre */
  `;

  // Posiciona o feedback em relação ao botão, se disponível, ou ao próprio elemento
  const referenceElement = element.nextElementSibling && element.nextElementSibling.tagName === 'BUTTON' ? element.nextElementSibling : element;
  
  // Obtém a posição do elemento de referência
  const rect = referenceElement.getBoundingClientRect();
  feedbackDiv.style.top = `${rect.top + window.scrollY - 30}px`; // 30px acima do botão
  feedbackDiv.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (feedbackDiv.offsetWidth / 2)}px`;
  feedbackDiv.style.transform = 'translateY(10px)'; // Começa um pouco abaixo

  document.body.appendChild(feedbackDiv);

  // Animação de entrada
  setTimeout(() => {
    feedbackDiv.style.opacity = '1';
    feedbackDiv.style.transform = 'translateY(0)';
  }, 10); // Pequeno atraso para disparar a transição

  // Animação de saída e remoção
  setTimeout(() => {
    feedbackDiv.style.opacity = '0';
    feedbackDiv.style.transform = 'translateY(-10px)'; // Move para cima enquanto desaparece
    feedbackDiv.addEventListener('transitionend', () => feedbackDiv.remove());
  }, 1500); // Exibe por 1.5 segundos
}
