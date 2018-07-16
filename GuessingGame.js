function Game (){

	this.playersGuess = null,
	this.pastGuesses = [],
	this.winningNumber = generateWinningNumber()

}

Game.prototype.difference = function (){
	return  Math.abs(this.winningNumber - this.playersGuess)
}

Game.prototype.isLower = function (){

	if(this.playersGuess < this.winningNumber){
		return true
	}else{
		return false
	}
}

Game.prototype.playersGuessSubmission = function(numb){
      
      if(numb <= 0 || numb > 100){
      	     throw ("That is an invalid guess.")
      }else if(!(typeof numb === 'number')){
      	    throw ("That is an invalid guess.")
      }

     
	this.playersGuess = numb
     return this.checkGuess()
}

Game.prototype.checkGuess = function (){
 
    if(this.playersGuess === this.winningNumber){                 
        $('#subtitle').text("Press the Reset button to play again!")
        $('#hint, #submit').prop('disable', true)
        return 'You Win!'
    }
    else{
                
         if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            $('#subtitle').text('You have already guessed that number')
			return 'You have already guessed that number.'
         }
         else{
                this.pastGuesses.push(this.playersGuess)
                $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
         
                if(this.pastGuesses.length === 5){
                    
                    $('#hint, #submit').prop('disable', true)
                    $('#subtitle').text("You lose!, Press the Reset button to play again")

                    return 'You Lose.'
                }

                if(this.difference() < 10){
                   $('#subtitle').text("You're burning up!")
                   return "You're burning up!"
                }
                
                if(this.difference() < 25){
                  $('#subtitle').text("You're lukewarm.")
                  return "You're lukewarm."
                }

                if(this.difference() < 50){
                  $('#subtitle').text("You're a bit chilly.")
                  return "You're a bit chilly."
                }

                if(this.difference() < 100){
                  $('#subtitle').text("You're ice cold!")
                  return "You're ice cold!"
                }

        }
    }
}

let newGame = function (){
  
  return mygame = new Game()

}

Game.prototype.provideHint = function (){

	let myArr = []
	let i =0

	myArr.push(this.winningNumber)

	while(i<2){
		myArr.push(generateWinningNumber())
		i++
	}

	return shuffle(myArr)
}


function generateWinningNumber() {
   
	let result  = Math.random() * 100 +1
     return Math.floor(result)

}

function shuffle (arr){

	let arrLength = arr.length
	let temp
	let remainElem

	while(arrLength){

		//pick remaining element 
		remainElem = Math.floor(Math.random() * arrLength--)

		//swap with current element 
		temp = arr[arrLength]
		arr[arrLength] = arr[remainElem]
		arr[remainElem] = temp
	}
	return arr
}

$(document).ready(function() {

	var mygame = new Game()
	//$('#hint').hide()

	$('#submit').click(function (e){
		
		var guess = $('#player-input').val(); //store guess
		$('#player-input').val(''); //clear player-input
		var output = mygame.playersGuessSubmission(parseInt(guess, 10)); //'send' guess to playersubmission func
		console.log(output)
	});


	$('#reset').click(function (e){

		 
		 mygame = new Game()

		$('#title').text('Play the Guessing Game!')
		$('#subtitle').text('Guess a number between 1-100!')
		$('.guess').text('-');
		$('#hint, #submit').prop('disable', false)
	});

	
	$('#hint').click(function (e){
		
		var hint = mygame.provideHint()
		console.log(hint)

		$('#title').text('The winning number is ' + hint[0] +', ' +hint[1]+ ', or '+hint[2]);
	});

});



