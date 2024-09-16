import { game } from './game';

// capturando o botão do html
const newGameButtonElem = document.getElementById("new-game");
const endGameButtonElem = document.getElementById("end-game");

// capturando o input
const inputElem = document.getElementById("word");

// capturando a div que exibe o erro
const errorElem = document.getElementById("error");

// capturando o streak para exibir mensagens de acerto
const streakElem = document.getElementById("streak");

// criando a função que inicia o jogo
const startGame = () => {
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

        // limpa o contador de acertos
        streakElem.innerHTML = '';
    });
}
startGame();

// Resetando todo o status do jogo para o estado inicial dele
const resetGame = () => {
    // captura os elementos square iniciais e atribui o valor default
    const squareElem1 = document.getElementById("first-letter");
    const squareElem2 = document.getElementById("second-letter");
    const squareElem3 = document.getElementById("third-letter");

    squareElem1.innerHTML = '?';
    squareElem2.innerHTML = '?';
    squareElem3.innerHTML = '?';

    // desabilita o input, obrigando o usuário a clicar em nova partida
    inputElem.disabled = true;

    // escondendo o erro caso esteja visível
    errorElem.style.visibility = 'hidden';

    // chama a função endGame, que reseta todas as propriedades do jogo
    game.endGame();
}

    // capturando o formulário, adicionando um ouvinte e disparando a função validateWord
const handleForm = () => {
    document.getElementById("form").addEventListener('submit', async (event) => {
        event.preventDefault();

        // pegando os dados do formulário
        const formData = new FormData(event.target);

        // capturando a palavra digitada no input
        const word = formData.get('word');

        // passando a palavra digitada no input, verificando na função e guardando em uma constante
        const isWordValid = await game.validateWord(word.toLocaleLowerCase());
        console.log(isWordValid);
        console.log(game.inputedWords);


        // se a palavra for válida ele aumenta o contador e esconde a mensagem de erro
        if(isWordValid === true) {
            streakElem.innerHTML = `Acertos: ${game.streak}`;
            errorElem.style.visibility = 'hidden';
        // se a palavra já tiver sido usada, retorna o erro 2
        } else if(isWordValid === game.messagesError.error2) {
            errorElem.style.visibility = 'visible';
            errorElem.style.color = 'red';
            errorElem.innerHTML = game.messagesError.error2;
        // se a palavra não existir retorna o erro 1
        } else{
            errorElem.style.visibility = 'visible';
            errorElem.style.color = 'red';
            errorElem.innerHTML = game.messagesError.error1;
        }
    });
}
handleForm();

// Finalizador do jogo, exibe quantas palavras o usuário acertou
endGameButtonElem.addEventListener('click', (event) => {
    event.preventDefault();
    if(game.inputedWords.length > 0){
        if(game.inputedWords.length === 1){
            //streakElem.style.visibility = 'visible';
            streakElem.innerHTML = `Parabéns você acertou ${game.inputedWords.length} palavra!`;
            resetGame();
        }else {
            //streakElem.style.visibility = 'visible';
            streakElem.innerHTML = `Parabéns você acertou ${game.inputedWords.length} palavras!`;
            resetGame();
        }
    }
});

