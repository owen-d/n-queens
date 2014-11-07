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
var findFirstRook = function(board, n, v1, rowIndex, callback){

  if (rowIndex === n) {
    return callback(board);
  }

  for (var i = 0; i < n; i++){
    board.togglePiece(rowIndex, i);
    if (!board[v1](i)) {
      var solution = findFirstRook(board, n, v1, rowIndex + 1, callback);
      if (solution) {
        return solution;
      }
    }
    board.togglePiece(rowIndex, i);
  }
};

window.findNRooksSolution = function(n) {

  var solution = undefined;
  var board = new Board({n:n});

  findFirstRook(board,n,'hasColConflictAt',0, function(){
    return solution = board.rows();
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
var findNRooks = function(board, n, v1, rowIndex, callback) {

  if (rowIndex === n) {
    callback();
    return;
  }

  for (var i = 0; i < n; i++){
    board.togglePiece(rowIndex, i);
    if (!board[v1](i)) {
      findNRooks(board, n, v1, rowIndex + 1, callback);
    }
    board.togglePiece(rowIndex, i);
  }
};

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  findNRooks(board, n, 'hasColConflictAt', 0, function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
var findFirstQueen = function(board, n, v1, v2, v3, rowIndex, callback){

  if (rowIndex === n) {
    return callback(board);
  }

  for (var i = 0; i < n; i++){
    var majorStart = board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, i);
    var minorStart = board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, i);
    board.togglePiece(rowIndex, i);
    if (!board[v1](i) && !board[v2](majorStart) && !board[v3](minorStart) ) {
      var solution = findFirstQueen(board, n, v1, v2, v3, rowIndex + 1, callback);
      if (solution) {
        return solution;
      }
    }
    board.togglePiece(rowIndex, i);
  }
};

window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = board.rows();


  findFirstQueen(board, n,'hasColConflictAt', 'hasMajorDiagonalConflictAt', 'hasMinorDiagonalConflictAt', 0, function(){
    return solution = board.buildMatrix();
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
var findNQueens = function(board, n, v1, v2, v3, rowIndex, callback){

  if (rowIndex === n) {
    callback();
    return;
  }

  for (var i = 0; i < n; i++){
    var majorStart = board._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, i);
    var minorStart = board._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, i);
    board.togglePiece(rowIndex, i);
    if (!board[v1](i) && !board[v2](majorStart) && !board[v3](minorStart) ) {
      findNQueens(board, n, v1, v2, v3, rowIndex + 1, callback);
    }
    board.togglePiece(rowIndex, i);
  }
};


window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  findNQueens(board, n, 'hasColConflictAt', 'hasMajorDiagonalConflictAt', 'hasMinorDiagonalConflictAt', 0, function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
