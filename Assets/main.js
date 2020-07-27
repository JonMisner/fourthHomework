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
      q3: ['consol.log', 'console.frog', 'log.loglog', 'log.console'],
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
   
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      

      $('#game').show();
      
  
      $('#results').html('');
      
     
      $('#start').hide();
  
      
      trivia.nextQuestion(); 
    }