var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $gameTime = document.querySelector('#game-time');

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

var score = 0;
var isGameStarted = false;

function startGame(){
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');
    $timeHeader.classList.remove('hide');
    $resultHeader.classList.add('hide');
    isGameStarted = true;
    $start.classList.add('hide');
    $game.style.backgroundColor = '#fff';

    var interval = setInterval(function(){
        var time = parseFloat($time.textContent);

        if(time <= 0){
            clearInterval(interval);
            endGame();
        }else{
            $time.textContent = (time - 0.1).toFixed(1);
        }
    },100)

    renderBox();
}

function setGameScore(){
    $result.textContent = score.toString();
}

function setGameTime(){
    var time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
}

function endGame(){
    isGameStarted = false;
    setGameScore();
    $game.innerHTML = '';
    $start.classList.remove('hide');
    $game.style.backgroundColor = '#ccc';
    $timeHeader.classList.add('hide');
    $resultHeader.classList.remove('hide');
    $gameTime.removeAttribute('disabled');
}

function handleBoxClick(event){
    if(!isGameStarted){
        return;
    }
    if(event.target.dataset.box){
        renderBox();
        score++;
    }
}

function renderBox(){
    $game.innerHTML = '';

    var box = document.createElement('div');
    var boxSize = getRandom(30, 90);
    var borderSize = getRandom(0, 100);
    var gameSize = $game.getBoundingClientRect();
    var maxTop = gameSize.height - boxSize;
    var maxLeft = gameSize.width - boxSize;
    var randomColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = randomColor;
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.borderRadius = borderSize + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
