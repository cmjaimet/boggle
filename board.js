var bgl_timeout  = 120;
var bgl_alert    = 15;
var bgl_timer    = null;
var elem_clock   = null;
var elem_button  = null;
var elem_dice    = null;

function setBoard() {
  elem_button = document.getElementById( 'timerButton' );
  elem_clock  = document.getElementById( 'timerDisplay' );
  elem_dice   = document.getElementsByClassName( 'die_cube' );
  setTimerDisplay();
  var dice = setDice();
  var dice_count = dice.length;
  var die_number = 0;
  var die_char  = '';
  var die_style  = '';
  for ( x = 0; x < dice_count; x++ ) {
    die_number = getDieNumber( dice );
    die_char   = getDieFace( dice, die_number );
    setDieFace( x, die_char, die_style );
    setDieStyle( x, die_char );
    dice.splice( die_number, 1 );
  }
}

function setDieStyle( cell_number, die_char ) {
  var rotate = Math.floor( Math.random() * 4 ) * 90;
  var style = '';
  var cell = document.getElementById( 'bgl_cell_' + cell_number );
  if ( 0 !== rotate ) {
    cell.style.transform = 'rotate( ' + rotate + 'deg )';
  }
  if ( 'M' === die_char || 'W' === die_char ) {
    cell.style.textDecoration = 'underline';
  }
}

function setDieFace( cell_number, die_char, die_style ) {
  document.getElementById( 'bgl_cell_' + cell_number ).innerText = die_char;
}

function getDieFace( dice, die_number ) {
  die_face = Math.floor( Math.random() * 6 );
  return dice[ die_number ][ die_face ];
}

function getDieNumber( dice ) {
  return Math.floor( Math.random() * dice.length );
}

function setDice() {
  return getDice();
}

function getDice() {
  return [
    [ 'A', 'O', 'J', 'O', 'B', 'B' ],
    [ 'E', 'E', 'A', 'A', 'G', 'N' ],
    [ 'H', 'W', 'T', 'R', 'E', 'V' ],
    [ 'S', 'N', 'U', 'I', 'E', 'E' ],
    [ 'H', 'R', 'N', 'N', 'L', 'Z' ],
    [ 'W', 'E', 'N', 'E', 'G', 'H' ],
    [ 'W', 'T', 'A', 'O', 'O', 'T' ],
    [ 'M', 'T', 'C', 'U', 'I', 'O' ],
    [ 'I', 'O', 'T', 'S', 'S', 'E' ],
    [ 'A', 'S', 'K', 'P', 'F', 'F' ],
    [ 'S', 'T', 'Y', 'T', 'I', 'D' ],
    [ 'I', 'D', 'E', 'R', 'X', 'L' ],
    [ 'L', 'R', 'T', 'E', 'T', 'Y' ],
    [ 'C', 'H', 'A', 'P', 'O', 'S' ],
    [ 'S', 'S', 'E', 'T', 'I', 'O' ],
    [ 'Qu', 'U', 'N', 'H', 'I', 'M' ],
  ];
}

function displayDice( mode ) {
  for ( var i = 0; i < elem_dice.length; i++ ) {
    if ( 'Hide' !== mode ) {
      elem_dice[ i ].classList.add( 'die_shown' );
    } else {
      console.log('x');
      elem_dice[ i ].classList.remove( 'die_shown' );
      elem_dice[ i ].classList.remove( 'timer_alert' );
    }
  }
}

function setTimer() {
  var mode = elem_button.value;
  if ( 0 >= bgl_timeout ) {
    displayDice( 'Show' );
  } else {
    var next = 'Pause';
    if ( 'Pause' === mode ) {
      next = 'Start'
      clearInterval( bgl_timer );
      displayDice( 'Hide' );
    } else {
      bgl_timer = setInterval( activateTimer, 1000 );
      displayDice( 'Show' );
    }
    setButton( next, next );
  }
}

function activateTimer() {
  bgl_timeout --;
  setTimerDisplay();
  if ( bgl_alert === bgl_timeout ) {
    css = 'timer_alert';
    elem_clock.classList.add( css );
    for ( var i = 0; i < elem_dice.length; i++ ) {
      elem_dice[ i ].classList.add( css );
    }
  } else if ( 0 === bgl_timeout ) {
    // elem_dice[ i ].classList.remove( css );
    clearInterval( bgl_timer );
    displayDice( 'Hide' );
    setButton( 'Show', 'Score' );
    elem_clock.innerText = 'Time up!';
  }
}

function setTimerDisplay() {
  var minutes = Math.floor( bgl_timeout / 60 );
  var seconds = bgl_timeout - ( 60 * minutes );
  var clock_display = minutes + ':' + ( 10 > seconds ? '0' : '' ) + seconds;
  elem_clock.innerText = clock_display;
}

function setButton( val, lbl ) {
  elem_button.value     = val;
  elem_button.innerText = lbl;
}
