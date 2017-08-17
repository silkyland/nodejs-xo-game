var prompt = require('prompt');
var a = ' ', b = ' ', c = ' ', d = ' ', e = ' ', f = ' ', g = ' ', h = ' ', i = ' '

var _arr = [
    [a, b, c],
    [d, e, f],
    [g, h, i]
]
var opponent = 0;
var welcomeTextShow = 0;
console.log('Welcome to XO game !!!')
showTable()
console.log('O, will move first. ')
positionInput()
function toggleOpponent() {
    opponent = !opponent
}

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

function checkMatchingInput(result) {
    var arr = ['1', '2', '3']
    if ((arr.indexOf(result.A) >= 0) && (arr.indexOf(result.B) >= 0)) {
        return true
    } else {
        return false
    }
}


function positionInput() {
    var symbol = opponent == 0 ? 'O' : 'X'
    console.log('Now,  ' + symbol + ' turn :')
    prompt.start();
    prompt.get(['A', 'B'], function (err, result) {
        if (err) { return onErr(err); }
        if (checkMatchingInput(result)) {
            if (_arr[result.A - 1][result.B - 1] == ' ') {
                _arr[result.A - 1][result.B - 1] = symbol
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
        }
    });
    function onErr(err) {
        console.log(err);
        return 1;
    }
}

function checkWin() {
    return false
}

function shuffleScore() {

}


