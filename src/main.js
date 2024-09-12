import { game } from './game';

// capturando o botão do html
const newGameButtonElem = document.getElementById("new-game");

// capturando o input
const inputElem = document.getElementById("word");

// capturando
const errorElem = document.getElementById("error");

// capturando o streak para exibir mensagens de acerto
const streakElem = document.getElementById("streak");

// adicionando um ouvinte para capturar o click
newGameButtonElem.addEventListener('click', () => {
    game.newGame();

    // caputando todas as divs que recebem as letras
    const lettersElem = document.querySelectorAll('.square');

    // percorrendo o array e atribuindo
    for (let i = 0; i < lettersElem.length; i++){
        lettersElem[i].innerHTML = game.letters[i].toUpperCase();

    }

    // habilitar o input
    inputElem.disabled = false;

    // limpar o input ao clicar nova partida
    inputElem.value = '';

    // focando o input ao clicar
    inputElem.focus();

    // alterando a visibilidade do erro para que não fique visível
    errorElem.style.visibility = 'hidden';

    streakElem.innerHTML = '';
});

document.getElementById("form").addEventListener('submit', (event) => {
    event.preventDefault();

    // pegando os dados do formulário
    const formData = new FormData(event.target);
    const word = formData.get('word');

    const isWordValid = game.validateWord(word);

    if(isWordValid) {
        streakElem.innerHTML = game.streak;
        errorElem.style.visibility = 'hidden';
    } else {
        errorElem.style.visibility = 'visible';
    }
});

