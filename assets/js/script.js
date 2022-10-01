var scroll = 0;
var active = false;

$(function() {
    $('.chip').click(function() {
        $('.chip-active').map(function() {
            $(this).removeClass('chip-active');
        });
        $(this).addClass('chip-active');
        var tag = $(this).attr('data-tag');
        $('.chip-content').map(function() {
            var technologies = $(this).attr('data-technologies');
            if (technologies) {
                technologies = technologies.split(', ');
                technologies = technologies.map(function(value) {
                    return value.replace(/\s/g, '');
                });
            }
            if (tag == 'all' || $(this).attr('data-scope') == tag || (technologies && technologies.indexOf(tag) > -1)) {
                $(this).css('display', 'block');
                $(this).css('opacity', '0');
                $(this).animate({
                    opacity: 1
                }, 400);
            }
            else $(this).css('display', 'none');
        });
    });
    $('.chipset').scroll(function() {
        var $elem = $('.chipset');
        var newScrollLeft = $elem.scrollLeft(),
            width = $elem.width(),
            scrollWidth = $elem.get(0).scrollWidth;
        var offset = 2;
        if (newScrollLeft == 0) {
            $('.left-arrow').css('display', 'none');
            $('.right-arrow').css('display', 'flex');
        }
        else if (scrollWidth - newScrollLeft - width < offset) {
            $('.right-arrow').css('display', 'none');
            $('.left-arrow').css('display', 'flex');
        }
        else {
            $('.left-arrow').css('display', 'flex');
            $('.right-arrow').css('display', 'flex');
        }
    });
    $(window).bind('mousewheel', function(event, delta) {
        var body = document.body, html = document.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        var windowHeight = $(window).height();
        if (scroll + event.originalEvent.deltaY >= 0 && scroll + event.originalEvent.deltaY < height)
            scroll += event.originalEvent.deltaY;
        if (scroll > 1000 && height > windowHeight) {
            active = true;
            $('.dynamic-island').removeClass('nav-hide');
            $('.toggle-btn').removeClass('toggle-btn-hide');
            $('.mode-icon').removeClass('mode-icon-hide');
            $('.dynamic-island').removeClass('dynamic-island-hide');
            $('.dynamic-island').css('display', 'flex');
        }
        else if (active) {
            active = false;
            $('.dynamic-island').addClass('nav-hide');
            $('.toggle-btn').addClass('toggle-btn-hide');
            $('.mode-icon').addClass('mode-icon-hide');
            setTimeout(function() {
                $('.dynamic-island').removeClass('nav-hide');
                $('.dynamic-island').addClass('dynamic-island-hide');
                $('#dynamic-island').css('display', 'none');
            }, 350);
        }
        return false;
    });
    $(window).on('load', function() {
        var $tickerWrapper = $(".tickerwrapper");
        var $list = $tickerWrapper.find("ul.ticklist");
        var $clonedList = $list.clone();
        var listWidth = 10;

        $list.find("li").each(function (i) {
                    listWidth += $(this, i).outerWidth(true);
        });

        var endPos = $tickerWrapper.width() - listWidth;

        $list.add($clonedList).css({
            "width" : listWidth + "px"
        });

        $clonedList.addClass("cloned").appendTo($tickerWrapper);

        //TimelineMax
        var infinite = new TimelineMax({repeat: -1, paused: true});
        var time = 60;

        infinite
        .fromTo($list, time, {rotation:0.01,x:0}, {force3D:true, x: -listWidth, ease: Linear.easeNone}, 0)
        .fromTo($clonedList, time, {rotation:0.01, x:listWidth}, {force3D:true, x:0, ease: Linear.easeNone}, 0)
        .set($list, {force3D:true, rotation:0.01, x: listWidth})
        .to($clonedList, time, {force3D:true, rotation:0.01, x: -listWidth, ease: Linear.easeNone}, time)
        .to($list, time, {force3D:true, rotation:0.01, x: 0, ease: Linear.easeNone}, time)
        .progress(1).progress(0)
        .play();
    });
});