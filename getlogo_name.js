
$(function () {
    $.getScript("api_name_logo.js", function (data, textStatus, jqxhr) {
        var namecategory = data.substring(1, data.length - 1);
        $.getScript("ip.js", function (data, textStatus, jqxhr) {
            var urlipaddressport = data.substring(1, data.length - 1).split(':');
            $(document).ready(function () {
              //  console.log(urlipaddressport[1].replace('//', '').replace('/', ''));
                $.post(namecategory,
                    {
                        adddata: '',
                        selectdata: 'selectdata',
                        id: '',
                        updatenamedata: '',
                        updatelogostr: '',
                        port: urlipaddressport[1].replace('//', '').replace('/', ''),
                       // port: urlipaddressport[2].replace('/', ''),
                    },
                    function (data) {
                        var jsondata = data;
                      //  console.log('data')
                    // console.log(jsondata)

                        localStorage.setItem("datalogoname", JSON.stringify(jsondata));
                     
                        $.each(data, function (key, value) {
                            $("#logoname").text(value.name);
                            $('#LOGOVIEW').attr('src', value.logobasestr);
                        });
                    })
                    .fail(function (xhr, status, error) {
                        var obj = JSON.parse(localStorage.getItem("datalogoname"));
                        //console.log(obj)
                        // var obj = JSON.parse(Cookies.get('datalogo_name'))
                        // console.log(obj)
                        $.each(obj, function (key, value) {
                            $("#logoname").text(value.name);
                            $('#LOGOVIEW').attr('src', value.logobasestr);

                        });
                    });
            });
        });
    });

});