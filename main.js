// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateGuessNumbers (number) {
    const numbersGuessList = [];
    let i = 0;
    while (i < number) {
        let numberToGuess = randomInt(1, 99);
        if (!numbersGuessList.includes(numberToGuess)) {
            numbersGuessList[i] = numberToGuess;
            i++;
        } 
    }
    return numbersGuessList;
}

function showGuessList(numbersGuessList) {
    let tempString ='';  // usare array.join(' - ') invece che tutto questo
    for (let i = 0; i < numbersGuessList.length-1; i++) {
        tempString += numbersGuessList[i] + ' - '
    }
    tempString += numbersGuessList[numbersGuessList.length-1];
    document.getElementById('numbers-to-guess').innerHTML = (tempString);
}

function userGuess() {
    console.log(numbersGuessList);
    const correctNumbers = [];
    const wrongNumbers = [NaN]; //così impedisco di inserire tutto quello che non è convertibile a intero
    for (let i = 1; i <= difficulty; i++) {
        let guess;
        do {
            guess = parseInt(prompt('Inserisci il ' + i +'° numero:'));
        } while (correctNumbers.includes(guess) || wrongNumbers.includes(guess));
        if (numbersGuessList.includes(guess)) {
            correctNumbers.push(guess);
        }else {
            wrongNumbers.push(guess);
        }     
    }
    
    const pGuess = document.createElement('p');
    pGuess.id = 'guess-list';
    const pResult = document.createElement('p');
    pResult.id = 'result';
    const pWrong = document.createElement('p');
    pWrong.id = 'wrong';
    pGuess.innerHTML = 'Numeri da indovinare: ' + numbersGuessList.join(' - ');
    if (correctNumbers.length > 0) {
        pResult.innerHTML = 'Numeri esatti: ' + correctNumbers.length + ' Quali: ' + correctNumbers.join(' - ');    
    }else {
        pResult.innerHTML = 'Numeri esatti: Nessuno';
    }
    if (wrongNumbers.length > 1) {
        pWrong.innerHTML = 'Numeri sbagliati: ' + (wrongNumbers.length - 1) + ' Quali: ' + wrongNumbers.slice(1, wrongNumbers.length).join(' - ');    
    }else {
        pWrong.innerHTML = 'Numeri sbagliati: Nessuno';
    }
    document.getElementById('numbers-container').append(pGuess, pResult, pWrong); //append.child non funzionava anche con un solo append
}

function reverseClock() {
    cd--;
    document.getElementById('count-down').innerHTML = cd;
    if (cd == 0) {
        document.getElementById('count-down').innerHTML = 'Fine';
        clearInterval(countDown);
    }
}

function hideGuessList() {
        document.getElementById('numbers-container').innerHTML = '';
        setTimeout(userGuess, 0); //Se non facevo così non mi eseguiva l'istruzione prima di entrare nella funzione userGuess
        // userGuess();
}


function startGame () {
    showGuessList(numbersGuessList);
    document.getElementById('count-down').innerHTML = cd;
    countDown = setInterval(reverseClock, 1000);
    setTimeout(hideGuessList, ((cd * 1000) + 100)); // il + 100 millisecondi serve per dare tempo al count down di arrivare a 0 e mostrare fine
}

const difficulty = 5;
let cd = 30; //per testare senza aspettare 30 secondi ridurre questo
let countDown;
const numbersGuessList = generateGuessNumbers(difficulty);
startGame();