// JavaScript Document

var board_count_num;

function init() {
  //init code
  board_count_num = 0;

  // example 1
  var board1 = Chessboard('board1', 'start')

  // example 2
  var board2 = Chessboard('board2', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    showNotation: false,
  })

  //init tactics
  var des_str = "159 Panda Miao USA 1991 I g 1.? +-";
  var fes_str = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
  create_one_tactic(des_str, fes_str, "no solution");
  
  board_count_num++;
  
  
  load_tactic_from_book();
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
  var new_board_id = "tacticboard_" + board_count_num.toString();

  var tactic_block = $('#tacticblock_' + board_count_num.toString()); //
	
  var block_header = $("<h5>" + info_list[0] + " "+ info_list[1] + " vs " + info_list[2] + " </h5>" +  
					   "<div style=\"display: flex\"><div style=\"flex-grow: 1;\"> " + 
					  info_list[3] + " "+ info_list[4] + "</div>" + "<div>" + info_list[5] + " " + info_list[6] + " </div>" + "</div>");
  var block_main = $("<div id=\"" + new_board_id + "\" class=\"small-board\">");
  var block_footer = $("<div style=\"display: flex\"><div style=\"flex-grow: 1;\">" + 
					  info_list[7] + "</div>" + "<div>" + info_list[8] + "</div>" + "</div>");

  tactic_block.append(block_header);
  tactic_block.append(block_main);
  tactic_block.append(block_footer);

 
  var new_board = Chessboard(new_board_id,{
  	position: FEN,
	showNotation: false,
  });
}

function load_tactic_from_book(){
	var main_container = $('#exampleBodyContainer');
	//load tactic from book
	for(var i = 0; i < book.length / 3; i++){
		var row_container = $("<div></div>").addClass("container-4e1ee");
		main_container.append(row_container);
		for(var j = 0; j < 3; j++){
			var book_item = book[3 * i + j];
			
			var block_container = $("<div id=\"tacticblock_" + board_count_num.toString() +  "\"></div>").addClass("tactic_block");
			row_container.append(block_container);
			
			create_one_tactic(book_item['description'], book_item['FEN'], book_item['solution']);
			board_count_num ++;
		}	
	}
}
