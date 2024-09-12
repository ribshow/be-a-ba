// estruturando a lógica do jogo
export const game = {
    letters: [],
    word: [],
    error: false,
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
            }
        }
        
        // se a palavra já tiver sido digitada, retorna o error
        if(this.inputedWords.includes(word)) {
            return false;
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
        return true;
    }
}