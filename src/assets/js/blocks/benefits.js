(function initBenefitsTabs() {
    if( $('div').is('.wrapper-benefits') ) {
        $('.benefits-list-item').on('mouseenter', function () {
            let thisElement = $(this).data('benefits-icon');

            $('.benefits-icon').removeClass('active');
            $('.' + thisElement).addClass('active');
        });

        $('.benefits-list-item').on('mouseleave', function () {
            $('.benefits-icon').removeClass('active');
            $('.benefits-icon_1').addClass('active');
        })
    }
})();
