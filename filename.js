$(function () {
    document.addEventListener('contextmenu', event => event.preventDefault());
    $.getScript("path.js", function (data, textStatus, jqxhr) {
        var _path = data.substring(1, data.length - 1);
        var folder = _path;
        $.ajax({
            url: folder,
            success: function (data) {
                $(data).find("a").attr("href", function (i, val) {
                    if (val.match(/\.(jpe?g|JPE?G|png|PNG|gif|GIF)$/)) {
                        $('#logo').attr('src', val);
                    }
                    $.get(_path+'name.txt', function (urlipaddress) {
                        $("#logoname").text(urlipaddress);
                    }, 'text');
                });
            },
            error: function (e) {
            }
        });
    });

});