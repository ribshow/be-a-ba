// estruturando a lógica do jogo
export const game = {
    letters: [],
    word: [],
    error: false,
    messagesError: {
        error1: 'A palavra digitada não existe!',
        error2: 'A palavra já foi digitada!'
    },
    streak: 0,
    inputedWords: [],
    newGame: function () {
        // limpar letras
        this.letters = [];

        this.inputedWords = [];
        console.log(this.inputedWords);

        // declarando alfabeto br
        const alphabet = 'aaabcdeeefghiijklmnoopqrstuuvxz';

        // reservando um espaço para receber 
        this.letters = new Array(3).fill().map(() => {
            const tempLetters = [...this.letters];
            // math floor arredonda o valor aleatório que será gerado pelo math random
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet[randomIndex];
        });

        // limpando a palavra que estiver no input
        this.word = [];

        // limpando a mensagem do erro
        this.error = false;

        // inicializando o atributo streak
        this.streak = 0;
    },
    // função que valida se a palavra digitada contém as 3 letras aleatórias digitadas
    validateWord: async function(word) {
        for(let i = 0; i < this.letters.length; i++){
            if(word.includes(this.letters[i]) === false){
                this.error = true;
                return false;
            // Se a palavra digitada já estiver no array inputedWords, seta error como true e retorna a mensagem de erro que deve ser exibida no html
            }else if(this.inputedWords.includes(word)){
                this.error = true;
                return this.messagesError.error2;
            }
        } 

        // consulta da api para verificar se a palavra existe
        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`);

        // transformando a resposta em um json
        const data =  await rawData.json();

        // se não houver resposta retorna falso
        if(!data.length) {
            return false;
        }

        // colocando a palavra que foi digitada dentro de inputed words
        this.inputedWords.push(word);
        // incrementando o contador para contabilizar o número de palavras que foram acertadas
        this.streak ++;

        // se todo o ciclo correr sem nenhuma interrupção retorna true validando a palavra
        return true;
    },
    endGame: async function(){
        // limpando as letras
        this.letters = [];

        // limpando o array que recebe as palavras
        this.inputedWords = [];

         // limpando a palavra que estiver no input
         this.word = [];

         // limpando a mensagem do erro
         this.error = false;
 
         // inicializando o atributo streak
         this.streak = 0;
    }
}