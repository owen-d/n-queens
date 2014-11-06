/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // debugger;
  var o = {};
  o['n'] = n;
  var board = new Board(o);

  for (var i = 0; i < n ; i++){
    board.togglePiece(i,i);
  }

  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var o = {};
  o['n'] = n;
  var brd = new Board(o);

  var recurseRow = function(rowIndex){
    for (var i = 0; i < n; i++){
      brd.togglePiece(rowIndex, i);
      if (!brd.hasColConflictAt(i)) {
        if (rowIndex === n-1) {
          solutionCount++;
        } else {
          recurseRow(rowIndex + 1);
        }
      }
      brd.togglePiece(rowIndex, i);
    }
  };

  recurseRow(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {return [];}
  var solution;
  var o = {};
  o['n'] = n;
  var brd = new Board(o);

  var recurseRow = function(rowIndex){
    for (var i = 0; i < n; i++){
      brd.togglePiece(rowIndex, i);
      if (!brd.hasColConflictAt(i) && !brd.hasMajorDiagonalConflictAt(brd._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, i)) && !brd.hasMinorDiagonalConflictAt(brd._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, i)) ) {
        if (rowIndex === n-1) {
          debugger;
           solution = brd.buildMatrix();
        } else {
          recurseRow(rowIndex + 1);
        }
      }
      brd.togglePiece(rowIndex, i);
    }
  };

  recurseRow(0);

  if (solution === undefined) {
    var obj = {};
    obj['n'] = n;
    solution = new Board(obj).rows();
  }

  return solution;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {return 1};
  var solutionCount = 0;
  var o = {};
  o['n'] = n;
  var brd = new Board(o);

  var recurseRow = function(rowIndex){
    for (var i = 0; i < n; i++){
      brd.togglePiece(rowIndex, i);
      if (!brd.hasColConflictAt(i) && !brd.hasMajorDiagonalConflictAt(brd._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, i)) && !brd.hasMinorDiagonalConflictAt(brd._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, i)) ) {
        if (rowIndex === n-1) {
          solutionCount++;
        } else {
          recurseRow(rowIndex + 1);
        }
      }
      brd.togglePiece(rowIndex, i);
    }
  };

  recurseRow(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
