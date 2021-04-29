//I wanted to keep the scope of this project small and focus on the requirements rather
//than go over board and overwhelm myself, so there really isn't much to the story or
//gameplay. I did really enjoy making this so I fully intend to expand on it
//right now you're told where the exit is and you only have the option of going
//left or right, this is intentional to keep the scope of the project small
//so this is a really boring text adventure right now, sorry. I'll try and make it more exciting later


$(document).ready(function() {   
    
    const adventureLog = $('.adventure-log');
    //character object storing char information
    const character = {
        name: '',
        age: 0,
        stamina: 100,
        location: {
            left: 0,
            right: 0
        },
        //move position and update stamina       
        move: function(locLeft, locRight) {
            this.location.left += locLeft;
            this.location.right += locRight;
            this.stamina -= 10;
            $('.char-stamina').text(this.stamina);
            console.log(this.location);
        }
    }

    //update the adventure log with user action
    const updateLog = function(input) {
        
        if(input != 'left' && input != 'right') {
            adventureLog.append('<p> Please enter either left or right </p>');
        } else {
            adventureLog.append(`<p>You chose the ${input} door. <br>You are now in room ${character.location.left}, ${character.location.right}<br> Which door would you like to go through</p>`); 
        }  
    }

    const positionCheck = function(posLeft, posRight) {
        //fail states, hide interface and display game over
        //run out of stamnia
        if(character.stamina == 0) {
            $('.interface').hide();
            $('h1').text('You\'ve run out of stamina and could not escape the dungeon');
        //escape position, any door after this position will win
        } else if(character.location.right == 5 && character.location.left == 3) {
            $('.interface').hide();
            $('h1').text('You\'ve escaped the dungeon!');
        }
    }


    //set character information based on user input 
    $('.character-form').on('submit', function(event) {
        event.preventDefault();

        //set character name and age
        character.name = $('input#char-name').val()
        character.age = $('input#char-age').val()

        //display chracter info
        $('.char-name').text(character.name);
        $('.char-age').text(character.age);
        $('.char-stamina').text(character.stamina);

        //hide character input, display adventure log and user input for movement
        $('.character-form').hide();
        $('.user-sheet').show();
        adventureLog.show();
        $('.user-log').show();
    });
   
   //perform actions when user submits next move
    $('.user-log').on('submit', function(event) {        
        event.preventDefault();
        
        //scroll the adventure log, it doesn't quite work the way I want it to
        adventureLog.scrollTop(adventureLog[0].scrollHeight);

        //send user input to update log
        const userInput = $('#user-input').val();

        //check position
        positionCheck(character.location.left, character.location.right);

        //move character
        if(userInput == 'left') {
           character.move(1,0);

        } else if (userInput == 'right') {
           character.move(0,1);
        }

        updateLog(userInput);


    });

});