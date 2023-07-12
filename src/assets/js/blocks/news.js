import { definesLanguage } from './global'; // хук для определения языка
import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import __NEWS_JSON from './json/news.json'; // подключение объекта со всеми статичными переводами для новостей
import 'jquery-rss'; // подключение плагина для подгрузки rss новостей

let rssUrl = isbeta();

function isbeta(name) {

    let url = name; // путь к файлу - если у вас другой - то его и указываете
    let pathname = location.pathname.split('/');
    for (let i = 0; i < pathname.length; i++) {
        if (pathname[i] == 'beta') url = '/beta' + name; // если мы на бете, то добавляем подддомен 'beta' к пути
    }
    return url;
}

(function getnewsrss() {
    let newsImg = __CONFIG_GLOBAL.javascript.news.imgblock
    let langData = definesLanguage(),
        baseDir = langData == __CONFIG_GLOBAL.defaultLanguage ? '' : '../';
    langData = (langData === 'zh') ? 'cn' : langData;
    var html = '';
    $.ajax({
        url: isbeta('/rssrequest.php'),
        method: 'GET',
        data: {
            lang: langData
        },
        type: 'json',
        success: function success(data) {

            var res = JSON.parse(data);
            var img
            for (var i = 0; i < res.length; i++) {
                // var author = res[i].author != '' ? textLang[langData].authors + ': ' + res[i].author : '',
                //     date = res[i].date != '' ? textLang[langData].date + ': ' + res[i].date : '';
                var author = res[i].author != '' ? res[i].author : '',
                    date = res[i].date != '' ? res[i].date : '';
                img = res[i].img_url != '' ? res[i].img_url : isbeta(newsImg);

                html += '\
		<div class="news-item">\
			<a class="news-wrapper-inner" style="background-image: url('+ isbeta(newsImg) +'); background-size: 0 0;" target="_blank" href="' + res[i].link + '" >\
                    <img class="news-item__img" src="' + img + '">\
                    <div class="news-item__content">\
                        <div class="news-item__title h3-title" data-dot>' + res[i].title + '</div>\
                        <div class="news-text-wrapper">\
                            <div class="news-item__text news-item__author">' + author + '</div>\
                            <div class="news-item__text news-item__date">' + date + '</div>\
                        </div>\
                    </div>\
			</a>\
		</div>\
		';
            }


            $('.news-slider').html(html);

            $('.news-slider').on('init', onSliderInit);
            $('.news-slider').on('afterChange', onSliderInit);

            $('.news-slider').slick({
                slidesToShow: 3,
                slidesToScroll: 3,
                // centerMode: true,
                // variableWidth: true,
                // touchThreshold: 10,
                dots: true,
                arrows: false,
                appendDots: '.dots-wrapper-news-js',
                appendArrows: '.arrow-slider-wrapper_news',
                prevArrow: '<button type="button" class="slick-prev slick-main-arrow slick-prev-main">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M5.70593 7C5.8944 7.00004 6.07857 7.04943 6.2349 7.14183C6.39123 7.23424 6.51261 7.36548 6.58353 7.51876C6.65445 7.67204 6.67168 7.84041 6.63302 8.00234C6.59437 8.16426 6.50158 8.31239 6.36652 8.42778L3.2468 11.1664H23.0391C23.1647 11.1648 23.2893 11.1852 23.4058 11.2263C23.5223 11.2674 23.6283 11.3284 23.7177 11.4058C23.8071 11.4831 23.8781 11.5754 23.9266 11.677C23.975 11.7787 24 11.8878 24 11.998C24 12.1082 23.975 12.2174 23.9266 12.319C23.8781 12.4207 23.8071 12.5129 23.7177 12.5903C23.6283 12.6677 23.5223 12.7287 23.4058 12.7698C23.2893 12.8109 23.1647 12.8312 23.0391 12.8297H3.2468L6.36652 15.5683C6.45744 15.6449 6.53003 15.7367 6.58004 15.8383C6.63005 15.9398 6.65647 16.0492 6.65775 16.1598C6.65904 16.2704 6.63515 16.3802 6.58751 16.4826C6.53987 16.5851 6.46942 16.6781 6.38029 16.7564C6.29116 16.8346 6.18514 16.8965 6.06845 16.9383C5.95175 16.9801 5.82672 17.0011 5.70068 17C5.57463 16.9988 5.45012 16.9756 5.33441 16.9317C5.21871 16.8878 5.11415 16.8241 5.02685 16.7443L0.373178 12.6591C0.257479 12.5817 0.163635 12.482 0.0989208 12.3676C0.0342064 12.2533 0.000360489 12.1273 1.90735e-06 11.9996C-0.000356674 11.872 0.0327835 11.7459 0.0968571 11.6313C0.160931 11.5166 0.254213 11.4165 0.369478 11.3386L0.375029 11.3353L5.02685 7.25177C5.11514 7.1721 5.22072 7.10878 5.33736 7.06553C5.45399 7.02229 5.57932 7.00001 5.70593 7Z" fill="white"/>\n' +
                    '</svg>' +
                    '</button>',
                nextArrow: '<button type="button" class="slick-next slick-main-arrow slick-next-main">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M18.2941 7C18.1056 7.00004 17.9214 7.04943 17.7651 7.14183C17.6088 7.23424 17.4874 7.36548 17.4165 7.51876C17.3456 7.67204 17.3283 7.84041 17.367 8.00234C17.4056 8.16426 17.4984 8.31239 17.6335 8.42778L20.7532 11.1664H0.960881C0.835341 11.1648 0.7107 11.1852 0.594201 11.2263C0.477702 11.2674 0.37167 11.3284 0.282265 11.4058C0.19286 11.4831 0.121867 11.5754 0.0734102 11.677C0.0249534 11.7787 0 11.8878 0 11.998C0 12.1082 0.0249534 12.2174 0.0734102 12.319C0.121867 12.4207 0.19286 12.5129 0.282265 12.5903C0.37167 12.6677 0.477702 12.7287 0.594201 12.7698C0.7107 12.8109 0.835341 12.8312 0.960881 12.8297H20.7532L17.6335 15.5683C17.5426 15.6449 17.47 15.7367 17.42 15.8383C17.3699 15.9398 17.3435 16.0492 17.3422 16.1598C17.341 16.2704 17.3648 16.3802 17.4125 16.4826C17.4601 16.5851 17.5306 16.6781 17.6197 16.7564C17.7088 16.8346 17.8149 16.8965 17.9316 16.9383C18.0483 16.9801 18.1733 17.0011 18.2993 17C18.4254 16.9988 18.5499 16.9756 18.6656 16.9317C18.7813 16.8878 18.8859 16.8241 18.9732 16.7443L23.6268 12.6591C23.7425 12.5817 23.8364 12.482 23.9011 12.3676C23.9658 12.2533 23.9996 12.1273 24 11.9996C24.0004 11.872 23.9672 11.7459 23.9031 11.6313C23.8391 11.5166 23.7458 11.4165 23.6305 11.3386L23.625 11.3353L18.9732 7.25177C18.8849 7.1721 18.7793 7.10878 18.6626 7.06553C18.546 7.02229 18.4207 7.00001 18.2941 7Z" fill="white"/>\n' +
                    '</svg>\n' +
                    '</button>',
                infinite: true,
                responsive: [
                    {
                        breakpoint: 1160,
                        settings: {
                            variableWidth: false,
                        }
                    },
                    {
                        breakpoint: 901,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            variableWidth: false,
                        }
                    },
                    {
                        breakpoint: 761,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            fade: true,
                            variableWidth: false,
                        }
                    }
                ]
            });

            $('[data-dot]').dotdotdot();
            $(window).resize(function() {
                $('[data-dot]').dotdotdot();
            });
            function onSliderInit(event, slick) {
                var countSlide = $(this).siblings('.dots-wrapper').find('.slick-dots li:last-child button').text();
                var activeSlide = $(this).siblings('.dots-wrapper').find('.slick-dots .slick-active button').text();

                $(this).parents('.wrapper').find('.current-slide').text(activeSlide);
                $(this).parents('.wrapper').find('.number-of-slides').text(countSlide);
            };


        },
        error: function error() {
            console.log('error');
        }
    });

})();
