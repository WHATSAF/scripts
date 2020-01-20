(function () {
    $('.root-nav .nav-link').click(function () {
        var navIconthis = $(this).find('.fa-chevron-left').length != 0 ? $(this).find('.fa-chevron-left') : $(this).find('.fa-chevron-down');
        var navItem = $(this).parent();
        if ($(navIconthis).hasClass('fa-chevron-left')) {
            $(navIconthis).removeClass('fa-chevron-left').addClass('fa-chevron-down');

            $(this).siblings('.sub-nav').slideDown('fast', function () {
                $(navItem).addClass('on');
            });
        } else if ($(navIconthis).hasClass('fa-chevron-down')) {
            $(navIconthis).removeClass('fa-chevron-down').addClass('fa-chevron-left');

            $(this).siblings('.sub-nav').slideUp('fast', function () {
                $(navItem).removeClass('on');
            });
        }
    })
    $('.sub-nav .nav-link').click(function () {
        var navIconthis = $(this).find('.fa-angle-left').length != 0 ? $(this).find('.fa-angle-left') : $(this).find('.fa-angle-down');
        var navItem = $(this).parent();
        if ($(navIconthis).hasClass('fa-angle-left')) {
            $(navIconthis).removeClass('fa-angle-left').addClass('fa-angle-down');

            $(this).siblings('.sub-sub-nav').slideDown('fast', function () {
                $(navItem).addClass('on');
            });
        } else if ($(navIconthis).hasClass('fa-angle-down')) {
            $(navIconthis).removeClass('fa-angle-down').addClass('fa-angle-left');

            $(this).siblings('.sub-sub-nav').slideUp('fast', function () {
                $(navItem).removeClass('on');
            });
        }
    })
})()
