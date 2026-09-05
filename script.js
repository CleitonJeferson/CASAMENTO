const slides = document.querySelector(".slides")

let index = 0

function slider(){

    index++

    slides.style.transition = "1s"

    slides.style.transform = `translateX(-${index * 100}%)`

    if(index === 3){

        setTimeout(() => {

            slides.style.transition = "none"

            index = 0

            slides.style.transform = `translateX(0px)`

        }, 1000)
    }
}

setInterval(slider, 4000)

//agora o codigo do contador -- -------

const dataCasamento = new Date("2026-12-12T14:00:00");

function atualizarContador() {

    const agora = new Date();

    const diferenca = dataCasamento - agora;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (diferenca / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferenca / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferenca / 1000) % 60
    );

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

setInterval(atualizarContador, 1000);

atualizarContador();

//IMAGEM AGITAR DA LISTA DE PRESENTES

const imagens = document.querySelectorAll('.animar-sino');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            const img = entry.target;

            img.classList.remove('agitar');

            void img.offsetWidth; // força reinício

            img.classList.add('agitar');
        }
    });
});

imagens.forEach(img => observer.observe(img));

const parametros = new URLSearchParams(window.location.search)

const nomeConfirmado = parametros.get('confirmado')

if (nomeConfirmado) {
  const mensagem = document.getElementById('mensagem-confirmacao')

  mensagem.innerHTML = `
    <strong>✓ Presença confirmada!</strong>
    <span>${nomeConfirmado}</span>
  `

  mensagem.classList.add('mostrar')

  setTimeout(() => {
    mensagem.classList.remove('mostrar')
  }, 5000)
}