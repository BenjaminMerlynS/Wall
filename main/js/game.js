/**
 * Created by Merlyn on 26/03/16.
 */

function rendersize() {

    $('.main-table').css("height", ($(window).height())); //get window size for fullscreen map
    $(window).on("resize", resize); //get new window size on resize
    resize();
    //Resize map container dynamically on window size. Full screen - defined margin
    function resize() {

        if ($(window).width() >= 980) {
            $('.main-table').css("height", ($(window).height()));
        } else {
            $('.main-table').css("height", ($(window).height()));
        }

    }
}


$(document).ready(function() {

    var table = $(document.createElement('table'));
    table.addClass('main-table');

    var windowSize = $(window).height();
    var squareSize = windowSize/10;

    var colors = {
        "0": "darkred",
        "1": "darkblue",
        "2": "orange",
        "3": "darkgreen"
    };

    var color;
    var key;
    function getRandomColor() {
        var rand = [Math.floor(Math.random() * 4)];
        color = colors[rand];
        key = rand;
    }

   for(i=0; i<10; i++) {
       var tablebodytr = $(document.createElement('tr'));

       for(j=0;j<10; j++) {
           getRandomColor();


           $('<td/>', {
               'class': 'box',
               'id': 'box',
               'html': '<div class="square" data-id="'+key+'" style="background-color:'+color+';height:'+squareSize+'px; width:'+squareSize+'px">'+key+'</div>'
           }).appendTo(tablebodytr);
       }

        tablebodytr.appendTo(table);
    }

    $('.content-wrap').html(table);

    rendersize();
    dragdrop();

});

function dragdrop() {
    jQuery.fn.swap = function (b) {
        // method from: http://blog.pengoworks.com/index.cfm/2008/9/24/A-quick-and-dirty-swap-method-for-jQuery
        b = jQuery(b)[0];
        var a = this[0];
        var t = a.parentNode.insertBefore(document.createTextNode(''), a);
        b.parentNode.insertBefore(a, b);
        t.parentNode.insertBefore(b, t);
        t.parentNode.removeChild(t);
        return this;
    };


    $(".square").draggable({revert: true, helper: "clone"});

    $(".square").droppable({
        accept: ".square",
        activeClass: "squarehover",
        hoverClass: "squareactive",
        drop: function (event, ui) {

            var draggable = ui.draggable, droppable = $(this),
                dragPos = draggable.position(), dropPos = droppable.position();

            draggable.css({
                left: dropPos.left + 'px',
                top: dropPos.top + 'px'
            });

            droppable.css({
                left: dragPos.left + 'px',
                top: dragPos.top + 'px'
            });
            draggable.swap(droppable);

            var dropped = draggable.parent();
            var identifier = draggable.attr('data-id');

            var leftCellval = dropped.prev().attr('data-id');
            //var lefttopCellval = dropped.prev().parent()[0].prev().children()[dropped.cellIndex].attr('data-id');
            //var leftbottomCellval = dropped.next().parent()[0].next().children()[dropped.cellIndex].attr('data-id');
            var rightCellval = dropped.next().attr('data-id');
            var topCell = $(dropped).parent().prev().children()[dropped['0'].cellIndex];
            var topCellval = $(topCell).children().attr('data-id');
            var bottomCell = $(dropped).parent().next().children()[dropped['0'].cellIndex];
            var bottomCellval = $(bottomCell).children().attr('data-id');
        }

    });

}

