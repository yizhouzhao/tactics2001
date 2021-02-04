// JavaScript Document
function hello_world() {
    console.log("hello!");
    make_pagination(10);
}

function make_pagination(max_page) {
    var page_ul = $("#pageUl");
    for (var i = 1; i <= max_page; i++) {
        var page_li = $(`<li class="page-item"><a class="page-link" href="#">${i.toString()}</a></li>`);
        page_li.insertBefore("#pageUl li:last-child");
        var page_link = page_li.find("a");
        page_link.attr("page_num", i.toString());
        page_link.click(function () {
            var page_num = $(this).attr("page_num");
            console.log("setpage!" + page_num);
            set_pagination(parseInt(page_num), max_page);
        });
    }

}

function set_pagination(page, max_page) {
    var page_ul = $("#pageUl");
    var previous_page_li = $("#pageUl li:first-child");
    var next_page_li = $("#pageUl li:last-child");


    if (page == 1) {
        previous_page_li.addClass("disabled");
    } else {
        if (previous_page_li.hasClass("disabled"))
            previous_page_li.removeClass("disabled");
    }

    if (page >= max_page) {
        next_page_li.addClass("disabled");
    } else {
        if (next_page_li.hasClass("disabled"))
            next_page_li.removeClass("disabled");
    }

    var ul_children = page_ul.children();
    //
    for (var i = 2; i < ul_children.length - 2; i++) {
        //console.log(ul_children);
		var child_i = ul_children.eq(i);
        if (page - i == 3 || i - page == 3) {
			child_i.css("display", "");
            child_i.find("a").text("...");
            child_i.addClass("disabled");

        } else if (page - i > 3 || i - page > 3) {
            child_i.css("display", "none");
        } else {
			child_i.css("display", "");
            child_i.find("a").text(i.toString());
            child_i.removeClass("disabled");
        }

        child_i.find("a").removeClass("bg-danger");

    }
    for (var i = 1; i < ul_children.length - 1; i++) {
        if (i != page) {
            ul_children.eq(i).find("a").removeClass("bg-danger");
        } else {
            ul_children.eq(page).find("a").addClass("bg-danger");
        }
    }

}
