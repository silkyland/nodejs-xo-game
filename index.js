//-------------------------------------------
//
// TICK TOK TOE NODE JS GAME
// Created by Bundit Nuntates
// http://www.devded.com, http://gunoob.com
// https://github.com/silkyland
// 
//------------------------------------------
var prompt = require('prompt');

//Start The game
run()

// var
var _arr
var _sumO = 0, _sumX = 0
var opponent
var welcomeTextShow
var _randomScore

// Start the Game Engine :)
function run() {
    _arr = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    opponent = 0;
    welcomeTextShow = 0;
    console.log('Welcome to XO game !!!')
    showTable()
    console.log('O, will move first. ')
    positionInput()
    _randomScore = shuffleScore()
}


// Switch between O or X
function toggleOpponent() {
    opponent = !opponent
}

// Show Board 
function showTable() {
    console.log('-------------------')
    console.log('====== board ====== ')
    console.log('-------------------')
    console.log('   B1  B2  B3')
    console.log('A1 ' + _arr[0][0] + ' | ' + _arr[0][1] + ' | ' + _arr[0][2])
    console.log('  ---+---+---')
    console.log('A2 ' + _arr[1][0] + ' | ' + _arr[1][1] + ' | ' + _arr[1][2])
    console.log('  ---+---+---')
    console.log('A3 ' + _arr[2][0] + ' | ' + _arr[2][1] + ' | ' + _arr[2][2])
    console.log('-------------------')
}

// Check if input not in [1, 2, 3]
function checkMatchingInput(result) {
    var arr = ['1', '2', '3']
    if ((arr.indexOf(result.A) >= 0) && (arr.indexOf(result.B) >= 0)) {
        return true
    } else {
        return false
    }
}

// Input Position
function positionInput() {
    var symbol = opponent == 0 ? 'O' : 'X'
    console.log('Now,  ' + symbol + ' turn :')
    prompt.start();
    prompt.get(['A', 'B'], function (err, result) {
        if (err) { return onErr(err); }
        if (checkMatchingInput(result)) {
            if (_arr[result.A - 1][result.B - 1] == ' ') {
                _arr[result.A - 1][result.B - 1] = symbol
                if (opponent == 0) {
                    _sumO += _randomScore[(result.A * result.B) - 1]
                } else {
                    _sumX += _randomScore[(result.A * result.B) - 1]
                }
            } else {
                console.log('Target is not blank, try again !')
                positionInput()
                return false
            }
        } else {
            console.log('Wrong turn, try again !')
            positionInput()
            return false
        }
        if (!checkWin()) {
            showTable()
            toggleOpponent()
            positionInput()
        } else {
            if (opponent == 0) {
                console.log('Hooley ! ' + symbol + ' is winner with point : ' + _sumO + ' point!')
                savePoint(_sumO)
            } else {
                console.log('Hooley ! ' + symbol + ' is winner with point : ' + _sumX + ' point!')
                savePoint(_sumX)
            }

        }
    });
    function onErr(err) {
        console.log(err);
        return 1;
    }
}

// Check winner ?
function checkWin() {
    if ((sameValue(_arr[0]) && _arr[0][0] != ' ') || (sameValue(_arr[1]) && _arr[1][0] != ' ') || (sameValue(_arr[2]) && _arr[2][0] != ' ')) {
        return true
    } else if ((sameValue([_arr[0][0], _arr[1][0], _arr[2][0]]) && _arr[2][0] != ' ') || (sameValue([_arr[0][1], _arr[1][1], _arr[2][1]]) && _arr[0][1] != ' ') || (sameValue([_arr[0][2], _arr[1][2], _arr[2][2]]) && _arr[0][2] != ' ')) {
        return true
    } else if ((sameValue([_arr[0][0], _arr[1][1], _arr[2][2]]) && _arr[0][0] != ' ') || (sameValue([_arr[0][2], _arr[1][1], _arr[2][0]]) && _arr[0][2] != ' ')) {
        return true
    } else {
        return false
    }
}

// add score to board
var scoreBoard = []
function savePoint(point) {
    prompt.start();
    console.log('Please enter your name? ')
    prompt.get(['name'], function (err, result) {
        var id = scoreBoard.length + 1
        scoreBoard.push({ id: id, name: result.name, score: point })
        showScoreBoard()
        playAgain()
    })
}


// need to play it again ?
function playAgain() {
    prompt.start();
    console.log('Are you sure to play again? (Y/N)')
    prompt.get(['answer'], function (err, result) {
        if (result.answer == 'y' || result.answer == 'Y') {
            run()
        } else if (result.answer == 'n' || result.answer == 'N') {
            goodBye()
        } else {
            console.log('Wrong answer.')
            playAgain()
        }
    })
}

// no I don't need to play 
function goodBye() {
    console.log('Thank you to playing, good bye ! :-)')
}

// Hall of Score board
function showScoreBoard() {
    console.log('-----------------------------------------')
    console.log('Table of best score             ')
    console.log('-----------------------------------------')

    // Sort Score
    var sortScore = scoreBoard.sort(function (a, b) {
        return parseInt(b.score) - parseInt(a.score)
    })
    for (var loop = 0; loop < sortScore.length && loop <= 5; loop++) {
        console.log((loop + 1) + '. ' + sortScore[loop].name + ', Score: ' + sortScore[loop].score)
    }
    console.log('-----------------------------------------')
}

// Check weather input same thing in array
function sameValue(arr) {

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[0])
            return false;
    }

    return true;
}

// Random & shuffle Score
function shuffleScore() {
    var _arrScore = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return shuffle(_arrScore)
}

// Shuffle it!
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

