// estruturando a lógica do jogo
export const game = {
    letters: [],
    word: [],
    error: false,
    streak: 0,
    newGame: function () {
        // limpar letras
        this.letters = [];

        // declarando alfabeto br
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';


        // reservando um espaço para receber 
        this.letters = new Array(3).fill().map(() => {
            // math floor arredonda o valor aleatório que será gerado pelo math random
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet[randomIndex];
        });

        // limpando a palavra que estiver no input
        this.word = [];

        // limpando a mensagem do erro
        this.error = false;

        this.streak = 0;
    },
    validateWord: function(word) {
        for(let i = 0; i < this.letters.length; i++){
            if(word.includes(this.letters[i]) === false){
                this.error = true;
                return false;
            }
        }
        
        this.streak ++;
        return true;
    }
}