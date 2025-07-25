  document.querySelector('.bat-icon').addEventListener('click', function() {
      const batIcon = document.querySelector('.bat-icon');
      const audioNormal = document.querySelector('#calmSound');
      const audioTerror = document.querySelector('#horrorSound');
      const body = document.body;

      if (!body.classList.contains('halloween-theme')) {
          // Ativar o modo terror
          batIcon.classList.add('animate');
          audioNormal.pause();
          audioNormal.currentTime = 0;
          audioTerror.play();

          const batIcons = ['./morcego2.ico', './morcego3.ico', './morcego4.ico'];
          let currentIconIndex = 0;

          function updateIcon(index) {
              batIcon.src = batIcons[index];
          }

          updateIcon(currentIconIndex);

          batIcon.animate(
              [
                  { transform: 'translateX(0) translateY(0)', offset: 0 },
                  { transform: 'translateX(calc(25vw - 25px)) translateY(-20px)', offset: 0.25 },
                  { transform: 'translateX(calc(50vw - 25px)) translateY(0)', offset: 0.5 },
                  { transform: 'translateX(calc(75vw - 25px)) translateY(20px)', offset: 0.75 },
                  { transform: 'translateX(calc(95vw - 50px))', offset: 1 } // Morcego não vai além de 95% da largura
              ],
              {
                  duration: 5000,
                  fill: 'forwards',
                  easing: 'linear',
                  iterations: 1
              }
          ).onfinish = () => {
              updateIcon(2);
              body.classList.add('halloween-theme');
              audioTerror.pause();
              audioTerror.currentTime = 0;
          };

          const interval = setInterval(() => {
              currentIconIndex++;
              if (currentIconIndex < batIcons.length) {
                  updateIcon(currentIconIndex);
              } else {
                  clearInterval(interval);
              }
          }, 2500);
      } else {
          // Reverter para o modo normal
          body.classList.remove('halloween-theme');
          audioTerror.pause();
          audioTerror.currentTime = 0;
          audioNormal.play();
      }
  });

  // Lógica do banner e áudio com base no tema
  let theme = 1; // Muda para 1, pois você usou o termo "tema 1" como inicial.
  let clickCount = 0;

  const bannerImg = document.getElementById('banner-img');
  const bannerGif = document.getElementById('banner-gif');
  const bannerGif3 = document.getElementById('banner-gif3'); // Novo banner para o terceiro clique
  const themeBtn = document.getElementById('theme-btn');
  const audio1 = document.getElementById('audio1');
  const audio2 = document.getElementById('audio2');

  // Função para alternar o tema
  function changeTheme() {
      theme++;

      if (theme === 2) {
          // Mudar para Tema 2
          bannerImg.style.display = 'none';
          bannerGif.style.display = 'block'; // Exibe o GIF do Tema 2
          themeBtn.style.display = 'inline-block'; // Mostrar botão apenas no Tema 2
          document.body.classList.add('theme-two'); // Adiciona classe do tema 2
          clickCount = 0; // Resetar contagem de cliques
      } else if (theme === 3) {
          // Tema 3 - Muda para o terceiro banner
          bannerGif.style.display = 'none'; // Esconde o GIF do Tema 2
          bannerGif3.style.display = 'block'; // Mostra o terceiro banner
          themeBtn.style.display = 'none'; // Ocultar o botão no tema 3
          document.body.classList.remove('theme-two'); // Remove a classe do tema 2
          document.body.classList.add('theme-three'); // Adiciona classe do tema 3
      } else {
          // Volta para o Tema 1 ao clicar novamente
          theme = 1; 
          bannerImg.style.display = 'block'; // Mostra o banner inicial
          bannerGif.style.display = 'none'; // Esconde a GIF
          bannerGif3.style.display = 'none'; // Esconde o terceiro banner
          document.body.classList.remove('theme-two'); // Remove a classe do tema 2
          document.body.classList.remove('theme-three'); // Remove a classe do tema 3
      }
  }

  // Função para gerenciar cliques no botão
  themeBtn.addEventListener('click', function () {
      clickCount++;

      if (clickCount === 1) {
          audio1.play(); // Liberar o primeiro áudio após 1 clique
      } else if (clickCount === 3) {
          // Tocar áudio ao terceiro clique
          const audio = document.getElementById('audio'); // Seu áudio específico para o terceiro clique
          audio.play(); // Toca o áudio
          
          // Mudar para o banner ao terceiro clique
          bannerGif.style.display = 'none'; // Esconde a GIF
          bannerImg.style.display = 'none'; // Esconde o banner inicial
          bannerGif3.style.display = 'block'; // Mostra a nova GIF
          changeTheme(); // Mudar para o próximo tema
      } else if (clickCount === 4) {
          audio1.pause(); // Pausar o primeiro áudio
          audio2.play(); // Liberar o segundo áudio no quarto clique
      }
  });

  // Chamando a função para alternar temas ao clicar no ícone do morcego
  document.querySelector('.bat-icon').addEventListener('click', function() {
      // Aqui chama a função renomeada para não ter conflito
      changeTheme();
  });

  let currentTheme = 1; // 1 para tema 2, 2 para tema 3

  function toggleTheme() {
      const cardGroup = document.querySelector('.card-group');

      if (currentTheme === 1) {
          cardGroup.classList.remove('theme-two');
          cardGroup.classList.add('theme-three');
          currentTheme = 2;
      } else {
          cardGroup.classList.remove('theme-three');
          cardGroup.classList.add('theme-two');
          currentTheme = 1;
      }
  }

  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);


document.getElementById("banner-gif").style.display = "block"; // Exibe o GIF

function playThunderEffect() {
  const flash = document.getElementById("lightning");
  const thunderAudio = document.getElementById("thunder-audio");

  // Mostrar o efeito de flash e tocar o som do trovão
  flash.classList.add("show-flash");
  thunderAudio.play();

  // Remover o efeito após 3 segundos
  setTimeout(() => {
    flash.classList.remove("show-flash");
  }, 3000);
}

document.getElementById("banner-gif").addEventListener("click", playThunderEffect);

      document.querySelectorAll('.card').forEach(card => {
    const video = card.querySelector('video');
    const img = card.querySelector('img');

    card.addEventListener('mouseover', () => {
        img.style.display = 'none';
        video.style.display = 'block';
        video.play();
    });

    card.addEventListener('mouseout', () => {
        video.style.display = 'none';
        img.style.display = 'block';
        video.pause();
        video.currentTime = 0; // Reinicia o vídeo ao sair do hover
    });
});







