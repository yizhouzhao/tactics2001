// JavaScript Document

var start_tactic_num;

function init() {
  //init code
  start_tactic_num = 0;
	
  // example 1
  var board1 = Chessboard('board1', 'start')

  // example 2
  var board2 = Chessboard('board2', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    showNotation: false,
  })

  // example 3
  var board2 = Chessboard('board3', {
    position: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
    draggable: true,
    dropOffBoard: 'trash',
    showNotation: false,
  })
  
  //init tactics
  create_one_tactic("panda miao", 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R', "no solution");
  

  // prevent hover problems on touch devices
  if (isTouchDevice()) {
    $('.navbar-a57cc').removeClass('hover-effect')
  }
}

function create_one_tactic(descriptions, FEN, solution){
	/*
	create one chess tactic board from FEN
	descriptions: [no. white black place year class tactic who_move result]
	FEN: chess FEN board
	solution: solution string
	*/
	var new_board_id = "tacticboard_" + start_tactic_num.toString();
	
	var tactic_block = $('#tacticblock_' + "1"); //start_tactic_num.toString()
	var block_header = $("<h4> this is a block header.</h4>");
	var block_main = $("<div>", {id: new_board_id, "class": "small-board"});
	var block_footer = $("<h4> this is a block footer.</h4>");
	
	/*const info_list = descriptions.split(' ');
	var new_board = Chessboard('tacticboard_' + info_list[0],{
		position: FEN,
	});*/
	
	tactic_block.append(block_header);
	//tactic_block.appemd(new_board);
	tactic_block.append(block_footer);
	
}
