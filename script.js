const word = document.getElementById('word')
const wrong = document.getElementById('wrong-letters')
const popUp = document.getElementById('popup-container')
const notification = document.getElementById('notofication-container')
const finalMessage = document.getElementById('final-message')
const finalRevealWord = document.getElementById('finalRevealWord')
const figure = document.querySelectorAll('.figure')
const playAgain = document.getElementById('btn-play-again')

let wordArr=['JavaScript', 'programming', 'learning', 'React' ]

let selectedWord = wordArr[Math.floor(Math.random()*wordArr.length)].toLowerCase()

let correctLetters = []
let wrongLetters = []


function displayWord(){
    word.innerHTML = `
    ${selectedWord.split('').map(letter => `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}</span>`)
			.join('')}`;

	const innerWord = word.innerText.replace(/[\n]/g, '');
    console.log(word.innerText)

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
        finalRevealWord.innerText=''
		popUp.style.display = 'flex';

	}
}

function updateWrongLetters(){
    wrong.innerHTML = `${wrongLetters.length > 0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letters =>`<span>${letters}</span>`)}`

    figure.forEach((part,index) => {
        const error = wrongLetters.length
        if(index<error){
            part.style.display='block'
        }else{
            part.style.display='none'
        }
    })
    if(wrongLetters.length === figure.length){
        finalMessage.innerText='Unfortunately you lost 😕'
        finalRevealWord.innerText=`...the word was: ${selectedWord}`
        popUp.style.display = 'flex'
    }
}

function showNotification(){
    notification.classList.add('show')
    setTimeout(()=>{
    notification.classList.remove('show')
    },2000)
}


window.addEventListener('keydown', e=> {
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key.toLowerCase()

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }else{
                showNotification()
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetters()
            }else{
                showNotification()
            }
        }
    }
    
})


playAgain.addEventListener('click',()=>{
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = wordArr[Math.floor(Math.random()*wordArr.length)].toLowerCase()
    displayWord()
    updateWrongLetters()
    popUp.style.display='none'
})

displayWord()


