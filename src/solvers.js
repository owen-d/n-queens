/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting
var recurseRow = function(rowIndex, conflictFn, callback, n, board){
  if (rowIndex === n) {
    callback();
    return;
    //whatever else needs to be done when you hit the end
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(rowIndex, i);
    if (!board[conflictFn](i)) {
     recurseRow(rowIndex + 1, conflictFn, callback, n, board);
    }
    board.togglePiece(rowIndex, i);
  }
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n:n});
  var callback = function(){
    solution = board.buildMatrix();
  };


  recurseRow(0, 'hasColConflictAt', callback, n, board);


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other


window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var callback = function(){solutionCount++;};

  recurseRow(0, 'hasColConflictAt', callback, n, board);



  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {
  if (n === 0) {return [];};
  var board = new Board({n:n});
  var solution = board.rows();
  var callback = function(){
    solution = board.buildMatrix();
  };

  recurseRow(0, 'hasAnyQueensConflicts', callback, n, board);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other


window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var callback = function(){
    solutionCount++;
  };

  recurseRow(0, 'hasAnyQueensConflicts', callback, n, board);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
