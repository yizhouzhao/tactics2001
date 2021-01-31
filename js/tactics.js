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

    change_page(true, init = true);
    //load_tactic_from_book();
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

    var block_header = $("<h5>" + info_list[0] + " " + info_list[1] + " vs " + info_list[2] + " </h5>"
        + "<div style=\"display: flex\"><div style=\"flex-grow: 1;\"> "
        + info_list[3] + " " + info_list[4] + "</div>" + "<div>" + info_list[5] + " " + info_list[6] + " </div>" + "</div>");
    var block_main = $("<div id=\"" + new_board_id + "\" class=\"small-board\">");
    var block_footer = $("<div style=\"display: flex\"><div style=\"flex-grow: 1;\">"
        + info_list[7] + "</div>" + "<div>" + info_list[8] + "</div>" + "</div>");

    tactic_block.append(block_header);
    tactic_block.append(block_main);
    tactic_block.append(block_footer);


    var new_board = Chessboard(new_board_id, {
        position: FEN,
        showNotation: false,
    });
}

function load_tactic_from_book(page = 0) {
    var main_container = $('#realBodyContainer');
    main_container.empty();
    //load tactic from book
    for (var i = 0; i < 3; i++) {
        var row_container = $("<div></div>").addClass("container-4e1ee");
        main_container.append(row_container);
        for (var j = 0; j < 3; j++) {
            if (9 * page + 3 * i + j >= book.length) {
                break;
            }
            var book_item = book[9 * page + 3 * i + j];

            var block_container = make_hover_card("tacticblock_" + board_count_num.toString(), book_item['solution'], book_item['FEN']);
            //$("<div id=\"tacticblock_" + board_count_num.toString() + "\"></div>").addClass("tactic_block");


            row_container.append(block_container);

            create_one_tactic(book_item['description'], book_item['FEN'], book_item['solution']);
            board_count_num++;
        }
    }
}

function make_hover_card(block_id, solution, FEN = "") {
    var card = $(`
	        <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div class="tactic_block" id="${block_id}"> </div>
                    </div>
                    <div class="flip-card-back">
                            <div class="btn-group" role="group" style="margin-top:10px;">
                                <button type="button" class="btn btn-outline-primary show-answer-button">Show answer</button>
                            </div>
                            <div class="scrollable">
                                <p class="tactic-answer">${solution}</p>
                            </div>
                            <div> <span>Copy:</span>
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
									<button type="button" class="btn btn-outline-primary copy-fen-button">FEN</button>
                                    <!--<button type="button" class="btn btn-outline-primary">PGN</button>-->       
                                </div>
                            </div>
							<div class="copy-notification" style="visibility:hidden;">Copied successfully (analyze in <a href="https://www.chess.com/analysis">chess.com </a>)</div>
                    </div>
                </div>
            </div>`)
    //make scrolled anser
    var scroll_part = card.find('.scrollable');
    scroll_part.css("visibility", "hidden");

    //set up botton
    var show_button = card.find('.show-answer-button');

    show_button.click(function () {
        if (scroll_part.css("visibility") == "hidden") {
            scroll_part.css("visibility", "visible");
            show_button.text("Hide answer");
        } else {
            scroll_part.css("visibility", "hidden");
            show_button.text("Show answer");
        }

    })

    //set up copy
    var copy_fen_button = card.find(".copy-fen-button");
    var copy_notification = card.find(".copy-notification");

    copy_fen_button.click(function () {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(FEN).select();
        document.execCommand("copy");
        $temp.remove();
		
		copy_notification.css("visibility","visible");
    })

    return card;
}


function change_page(next_page = true, init = false) {
    //change page
    var page_id = parseInt($("#pageId").text());
    if (next_page)
        page_id++;
    else
        page_id--;

    if (init) {
        page_id = 1;
    }

    $("#pageId").text(page_id.toString());

    load_tactic_from_book(page_id - 1);

    //disable previous page
    var previous_page_li = $("#previousPageLi");
    var next_page_li = $("#nextPageLi");
    if (page_id == 1) {
        previous_page_li.addClass("disabled");
    } else {
        if (previous_page_li.hasClass("disabled"))
            previous_page_li.removeClass("disabled");
    }

    if (page_id * 9 >= book.length) {
        next_page_li.addClass("disabled");
    } else {
        if (next_page_li.hasClass("disabled"))
            next_page_li.removeClass("disabled");
    }

}
