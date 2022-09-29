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
});