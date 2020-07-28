$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    score: [0],
 
    questions: {
      q1: 'In full stack development, what does JS stand for?',
      q2: 'Which is the correct way to write a variable?',
      q3: 'how do you log something on the console?',
      q4: 'Whis is a correct way to create a pop up window',
      q5: 'The function math.floor...',
  
    },
    options: {
      q1: ['Japanese Script', 'Java Script', 'John Stockton', 'Jazz Sax'],
      q2: ['variable1 = x', 'let = x+1', 'var i = 15', 'function(santa) = "ho,ho,ho"'],
      q3: ['console.log', 'console.frog', 'log.loglog', 'log.console'],
      q4: ['pop-up.hello', 'alert("hello");', 'window(hello)', 'howdy (popup)'],
      q5: ['Rounds up','explodes somthing far away','is gibberish','Rounds down'],

    },
    answers: {
      q1: 'Java Script',
      q2: 'var i = 15',
      q3: 'console.log',
      q4: 'alert("hello");',
      q5: 'Rounds down',

    },
 
    startGame: function(){
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);
        
        $('#game').show();
     
        $('#results').html('');

        $('#timer').text(trivia.timer);
      
        $('#start').hide();
    
        $('#remaining-time').show();
        
        trivia.nextQuestion();
        
      },
      // method to loop through and display questions and options 
      nextQuestion : function(){

        trivia.timer = 10;
         $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
     
        if(!trivia.timerOn){
          trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        
        // gets all the questions then indexes the current questions
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);
        
        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
        
        // creates all the trivia guess options in the html
        $.each(questionOptions, function(index, key){
          $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        })
        
      },
   
      timerRunning : function(){
        // if timer still has time left and there are still questions left to ask
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
          $('#timer').text(trivia.timer);
          trivia.timer--;
            if(trivia.timer === 4){
              $('#timer').addClass('last-seconds');
            }
        }
        // the time has run out and increment unanswered, run result
        else if(trivia.timer === -1){
          trivia.unanswered++;
          trivia.result = false;
          console.log(trivia.timer);
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
        }
        // if all the questions have been shown end the game, show results
        else if(trivia.currentSet === Object.keys(trivia.questions).length){
          
          // adds results of game (correct, incorrect, unanswered) to the page
          $('#results')
            .html('<h3>Nice Job!</h3>'+
            '<p>Correct: '+ trivia.correct +'</p>'+
            '<p>Incorrect: '+ trivia.incorrect +'</p>'+
            '<p>Unanswered: '+ trivia.unanswered +'</p>'+
            '<p>Try Again?</p>');
          
      
          $('#game').hide();
          
  
          $('#start').show();
        }
        
      },
      
      guessChecker : function() {
        
       
        var resultId;
        
      
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        
        // if the text of the option picked matches the answer of the current question, increment correct
        if($(this).text() === currentAnswer){
     
          $(this).addClass('btn-success').removeClass('btn-info');
          
          trivia.correct++;
          console.log(trivia.timer);
          console.log(trivia.score);
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Correct Answer!</h3>');
        }
       
        else{
        
          $(this).addClass('btn-danger').removeClass('btn-info');
          
          trivia.incorrect++;
          console.log(trivia.timer - 5);
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
        }
        
      },
      // method to remove previous question results and options
      guessResult : function(){
        
        // increment to next question set
        trivia.currentSet++;
        
        // remove the options and results
        $('.option').remove();
        $('#results h3').remove();
        
        // begin next question
        trivia.nextQuestion();
         
      }
    
    }