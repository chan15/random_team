$(function() {
    var nameList = $('#name_list');
    var result = $('#result');
    var amount = $('#amount');
    var loader = $('#loader');
    var timeout = 3000;

    $('#btn_cal').on('click', function() {
        if (nameList.val() === '') {
            alert('名單不得空白');

            return false;
        }

        loader.removeClass('hide');
        result.addClass('hide');

        var names = [];
        var html = [];
        var number = 0;
        var amountVal = parseInt(amount.val());
        var start = 0;
        var end = amountVal;

        result.html('');
        names = nameList.val().replace(/(\r\n|\r|\n)/g, '\n');
        names = names.split('\n');

        if (names.length <= amountVal) {
            alert('人數不足以分隊');
            nameList.focus();

            loader.addClass('hide');
            result.removeClass('hide');

            return false;
        }

        setTimeout(function() {
            shuffle(names);

            for (var i = 0; i < Math.ceil(names.length / amountVal); ++i) {
                html.push({
                    number: i + 1,
                    name: names.slice(start, end).join(', ')
                });

                start += amountVal;
                end = start + amountVal;
            }

            result.html($('#template').render(html));

            loader.addClass('hide');
            result.removeClass('hide');
        }, timeout);
    });

    function shuffle(a) {
        var j, x, i;

        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
});
