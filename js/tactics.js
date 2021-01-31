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
  var des_str = "159 Panda Miao USA 1991 I g 1.? +-";
  var fes_str = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
  create_one_tactic(des_str, fes_str, "no solution");
	
}

function create_one_tactic(descriptions, FEN, solution) {
  /*
  create one chess tactic board from FEN
  descriptions: [no. white black place year class tactic who_move result]
  e.g 159 Panda Miao USA 1991 I g 1.? +-
  FEN: chess FEN board
  solution: solution string
  */
  const info_list = descriptions.split(' ');
  var new_board_id = "tacticboard_" + start_tactic_num.toString();

  var tactic_block = $('#tacticblock_' + "1"); //start_tactic_num.toString()
  var block_header = $("<h5>" + info_list[0] + " "+ info_list[1] + " vs " + info_list[2] + " </h5>" +  
					   "<h5>" + info_list[3] + " "+ info_list[4] + "    ----    " + info_list[5] + " " + info_list[6] + " </h5>"
					   );
  var block_main = $("<div id=\"" + new_board_id + "\" class=\"small-board\">");
  var block_footer = $("<div style=\"display: flex; justify-content: space-around\">" + "<div>" + 
					  info_list[7] + "</div>" + "<div>" + info_list[8] + "</div>" + "</div>");

  tactic_block.append(block_header);
  tactic_block.append(block_main);
  tactic_block.append(block_footer);


 
  var new_board = Chessboard(new_board_id,{
  	position: FEN,
  });

}
