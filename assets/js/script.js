var scroll = 0;
var active = false;

$(function() {
    $(window).bind('mousewheel', function(event, delta) {
        if (scroll + event.originalEvent.deltaY >= 0 && scroll + event.originalEvent.deltaY <= 3000)
            scroll += event.originalEvent.deltaY;
        if (scroll >= 800 && window.location.pathname != "/404") {
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