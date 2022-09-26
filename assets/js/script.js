var scroll = 0;
var active = false;

$(function() {
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