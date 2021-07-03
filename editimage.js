
var length_img;
var arr = new Array();
var arrimagedelete = new Array();
var n = 0;
var num_index_edit = 0;
var _idupdate;
$(function () {

    var imagesPreview = function (input) {
        if (input.files) {
            var filesAmount = input.files.length;
            document.getElementById("imgsixeedit").innerText = '';
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                var typefile = input.files[i].name.split('.');
                if (typefile[1] != 'PNG' && typefile[1] != 'JPG' && typefile[1] != 'jpg' && typefile[1] != 'jpeg' && typefile[1] != 'png') {
                    document.getElementById("imgsixeedit").innerText = 'เลือกรูปภาพใหม่ เป็นไฟล์ JPEG, JPG, PNG !!!' + '\n' + input.files[i].name;
                    document.getElementById("imgsixeedit").style.color = "red";
                    return;
                }
                if (input.files[i].size > 2192282) {
                    //  alert('1111111111111')
                    document.getElementById("imgsixeedit").innerText = "ขนาดภาพใหญ่เกินไป !!" + '\n' + input.files[i].name;
                    document.getElementById("imgsixeedit").style.color = "red";
                    return;
                }
                reader.onload = function (event) {
                    length_img = $("#EditaddImage img");
                    if (length_img.length > 4) {

                        document.getElementById("imgsixeedit").innerText = "อัพไฟล์รูปได้ไม่เกิน 5 รูป !!!";
                        document.getElementById("imgsixeedit").style.color = "red";
                        return;
                    }
                    // $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
                    //     <i name="${n}" class="delete_cc fa fa-times fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12"><img name="${n}" src="${event.target.result}"class="img-responsive thumbnail"></i></a>`);
                    // n = n + 1;
                    // console.log(n)
                }
                reader.readAsDataURL(input.files[i]);
            }
        }
        return;
    };

    var namefile;
    var typename;
    $('#edit_fileimage').on('change', function () {
        length_img = $("#EditaddImage img");
        imagesPreview(this);
        var file_data = $('#edit_fileimage').prop('files');
        var file_length = document.getElementById("edit_fileimage").files.length;

        for (var i = 0; i < file_length; i++) {
            typename = file_data[i].type;
            namefile = file_data[i].name
            _checkimage(file_data[i]);

            // getDataUrl(file_data[i], function (imgBase64) {

            //     $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
            //     <i name="${n}" class="delete_cc fa fa-times fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12"><img name="${n}" src="${imgBase64}"class="img-responsive thumbnail"></i></a>`);

            //     arr[arrimagedelete.length + 1] = dataURLtoFile(imgBase64, namefile);
            //   arrimagedelete[arrimagedelete.length + 1] = dataURLtoFile(imgBase64, namefile);
            //     n = n + 1;

            // });

            if (file_data[i].size > 2192282) {
                return;
            }

            // console.log(arr)

            // console.log(arrimagedelete)

        }
        return
    });


    function _checkimage(_file) {
        getDataUrl(_file, function (imgBase64) {
            $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
            <i name="${n}" class="delete_cc fa fa-times fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12"><img name="${n}" src="${imgBase64}"class="img-responsive thumbnail"></i></a>`);

            //arr[arrimagedelete.length] = dataURLtoFile(imgBase64, _file.name);
            // arrimagedelete[arrimagedelete.length] = dataURLtoFile(imgBase64, _file.name);
            arr[n] = dataURLtoFile(imgBase64, _file.name);
            //  arrimagedelete[arrimagedelete.length + 1] = dataURLtoFile(imgBase64, _file.name);
            n = n + 1;

            //  console.log(n)
        });


    }



    function dataURLtoFile(dataurl, filename) {
        var arr_1 = dataurl.split(','),
            mime = arr_1[0].match(/:(.*?);/)[1],
            bstr = atob(arr_1[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    function getDataUrl(file, callback2) {
        var callback = function (srcOrientation) {
            var reader2 = new FileReader();
            reader2.onload = function (e) {
                var srcBase64 = e.target.result;
                var img = new Image();

                img.onload = function () {
                    var width = img.width,
                        height = img.height,
                        canvas = document.createElement('canvas'),
                        ctx = canvas.getContext("2d");

                    // set proper canvas dimensions before transform & export
                    if (4 < srcOrientation && srcOrientation < 9) {
                        canvas.width = height;
                        canvas.height = width;
                    } else {
                        canvas.width = width;
                        canvas.height = height;
                    }

                    // transform context before drawing image
                    switch (srcOrientation) {
                        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
                        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
                        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
                        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
                        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                        default: break;
                    }

                    // draw image
                    ctx.drawImage(img, 0, 0);

                    // export base64
                    callback2(canvas.toDataURL(file.type, 1.0));
                };
                img.src = srcBase64;
            }
            reader2.readAsDataURL(file);
        }

        var reader = new FileReader();
        reader.onload = function (e) {

            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
            var length = view.byteLength, offset = 2;
            while (offset < length) {
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++)
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                }
                else if ((marker & 0xFF00) != 0xFF00) break;
                else offset += view.getUint16(offset, false);
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    }





    ///////// ลบรูปภาพ
    $('#EditaddImage').on('click', 'i.delete_cc', function (e) {

        var remove_index = $(this).attr("name");
        arrimagedelete[remove_index] = arr[remove_index];
        arr[parseInt(remove_index)] = " ";

        $(this).remove();
        // console.log(remove_index)
        // console.log('id')

        //  console.log(arr)
        //  console.log('fdfdffsssssssssssssssss')
        // console.log(arrimagedelete)
    });






    $.getScript("ip.js", function (dataipaddress, textStatus, jqxhr) {
        var urlipad = dataipaddress.substring(1, dataipaddress.length - 1);


        //////////////// view แก้ไขประกาศ
        $('#table_id8').on('click', 'tbody td i.editor_edit', function (e) {
            e.preventDefault();
            $("#EditaddImage").empty();
            var table = $('#table_id8').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();

            if (data == undefined) {
                data = table.row(this).data();
            }

            $("#Editnotice").modal();
            var str = data.images;
            var n_line = str.indexOf("//");


            if (n_line == '-1') {
                for (let i in data.images) {
                    arr[n] = data.images[i];

                    $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
                    <i name="${n}" class="delete_cc  fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12" ><img name="${n}" src="${urlipad}images/${data.images[i]}"class="img-responsive thumbnail"></i></a>`);
                    n = n + 1;
                }

            } else {
                $("#EditaddImage").append(`<img src="${data.images}"class="img-responsive thumbnail col-lg-3 col-md-4 col-sm-6 col-xs-12">`);

            }
            _idupdate = data._id
            // console.log(data._id)
            $("#_id_updatedata").val(data._id);
            $("#edit_posttopic").val(data.topic);
            $("#edit_datetimenotice").val(data.dateNotice);
            $("#edit_postdetail").val(data.detail);
            $("#edit_weblink").val(data.weblink);


        });

        /////////////////////////// อัพเดท ประกาศ
        $('#edit_submitpostinvoice').on('click', function (e) {
            var _ipupdate = document.getElementById("_id_updatedata").value;
            var _topic = document.getElementById("edit_posttopic").value;
            var _detail = document.getElementById("edit_postdetail").value;
            var weblink = document.getElementById("edit_weblink").value;

            const url = urlipad + 'updateNotice/' + _ipupdate;
            let formData = new FormData();
            formData.append('topic', _topic);
            formData.append('detail', _detail);
            formData.append('weblink', weblink);

            for (var i = 0; i < arrimagedelete.length; i++) {
                try {
                    if (arrimagedelete[i].name == undefined) {
                        formData.append('delImage', arrimagedelete[i]);
                    }
                } catch (err) {
                }

            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != " ") {
                    formData.append('imageNotice', arr[i]);
                }
            }

            axios.put(url, formData
            ).then(function (response) {
                console.log(response.data.message);
                location.href = "allnotice.html";
            }).catch(function (res) {
                const { response } = res
                console.log(response.data.message)
            });

        });







        ////////// view แก้ไข ทรัพย์สิน
        $('#table_id7').on('click', 'tbody td i.editor_editofficial', function (e) {
            n = 0;
            e.preventDefault();
            var table = $('#table_id7').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();
            if (data == undefined) {
                data = table.row(this).data();
            }

            $("#Editofficial").modal();
            $("#EditaddImage").empty();
            var str = data.images;
            var n_line = str.indexOf("//");
            console.log(data)
            if (n_line == '-1') {
                for (let i in data.images) {
                    arr[n] = data.images[i];

                    $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
           <i name="${n}" class="delete_cc  fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12" ><img name="${n}" src="${urlipad}images/${data.images[i]}"class="img-responsive thumbnail"></i></a>`);
                    n = n + 1;
                }
            } else {
                $("#EditaddImage").append(`<img src="${data.images}"class="img-responsive thumbnail col-lg-3 col-md-4 col-sm-6 col-xs-12">`);

            }
            $("#_id_updatedata").val(data._id);
            $("#edit_posttopic").val(data.topic);
            $("#edit_postdetail").val(data.detail);
            $("#edit_latitude").val(data.latitude);
            $("#edit_longitude").val(data.longitude);
        });




        ////////// view แก้ไข ธุรกิจ
        $('#table_id5').on('click', 'tbody td i.editor_editofficial', function (e) {
            n = 0;
            e.preventDefault();
            var table = $('#table_id5').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();
            if (data == undefined) {
                data = table.row(this).data();
            }

            $("#Editofficial").modal();
            $("#EditaddImage").empty();
            var str = data.images;
            var n_line = str.indexOf("//");
            console.log(data)
            if (n_line == '-1') {
                for (let i in data.images) {
                    arr[n] = data.images[i];

                    $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
           <i name="${n}" class="delete_cc  fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12" ><img name="${n}" src="${urlipad}images/${data.images[i]}"class="img-responsive thumbnail"></i></a>`);
                    n = n + 1;
                }
            } else {
                $("#EditaddImage").append(`<img src="${data.images}"class="img-responsive thumbnail col-lg-3 col-md-4 col-sm-6 col-xs-12">`);

            }
            $("#_id_updatedata").val(data._id);
            $("#edit_posttopic").val(data.topic);
            $("#edit_postdetail").val(data.detail);
            $("#edit_latitude").val(data.latitude);
            $("#edit_longitude").val(data.longitude);
        });






        ////////// view แก้ไข ท่องเที่ยว
        $('#table_id4').on('click', 'tbody td i.editor_editofficial', function (e) {
            n = 0;
            e.preventDefault();
            var table = $('#table_id4').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();
            if (data == undefined) {
                data = table.row(this).data();
            }

            $("#Editofficial").modal();
            $("#EditaddImage").empty();
            var str = data.images;
            var n_line = str.indexOf("//");
            console.log(data)
            if (n_line == '-1') {
                for (let i in data.images) {
                    arr[n] = data.images[i];

                    $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
   <i name="${n}" class="delete_cc  fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12" ><img name="${n}" src="${urlipad}images/${data.images[i]}"class="img-responsive thumbnail"></i></a>`);
                    n = n + 1;
                }
            } else {
                $("#EditaddImage").append(`<img src="${data.images}"class="img-responsive thumbnail col-lg-3 col-md-4 col-sm-6 col-xs-12">`);

            }
            $("#_id_updatedata").val(data._id);
            $("#edit_posttopic").val(data.topic);
            $("#edit_postdetail").val(data.detail);
            $("#edit_latitude").val(data.latitude);
            $("#edit_longitude").val(data.longitude);
        });


        ////////// view แก้ไข บริการ
        $('#table_id3').on('click', 'tbody td i.editor_editofficial', function (e) {
            n = 0;
            e.preventDefault();
            var table = $('#table_id3').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();
            if (data == undefined) {
                data = table.row(this).data();
            }

            $("#Editofficial").modal();
            $("#EditaddImage").empty();
            var str = data.images;
            var n_line = str.indexOf("//");
            console.log(data)
            if (n_line == '-1') {
                for (let i in data.images) {
                    arr[n] = data.images[i];

                    $("#EditaddImage").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
   <i name="${n}" class="delete_cc  fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12" ><img name="${n}" src="${urlipad}images/${data.images[i]}"class="img-responsive thumbnail"></i></a>`);
                    n = n + 1;
                }
            } else {
                $("#EditaddImage").append(`<img src="${data.images}"class="img-responsive thumbnail col-lg-3 col-md-4 col-sm-6 col-xs-12">`);

            }
            $("#_id_updatedata").val(data._id);
            $("#edit_posttopic").val(data.topic);
            $("#edit_postdetail").val(data.detail);
            $("#edit_latitude").val(data.latitude);
            $("#edit_longitude").val(data.longitude);
        });




        ////////////////////  อัพเดท ทรัพสิน
        $('#edit_submitpostofficialAsset').on('click', function (e) {
            Update_official('Asset');
        });
        ////////////////////  อัพเดท ธุรกิจ
        $('#edit_submitpostofficialbusiness').on('click', function (e) {
            Update_official('Business');
        });
        ////////////////////  อัพเดท ท่องเที่ยว
        $('#edit_submitpostofficialTravel').on('click', function (e) {
            Update_official('Travel');
        });
        ////////////////////  อัพเดท บริการ
        $('#edit_submitpostofficialservice').on('click', function (e) {
            Update_official('Service');
        });


        function Update_official(val) {

            var _ipupdate = document.getElementById("_id_updatedata").value;
            var _topic = document.getElementById("edit_posttopic").value;
            var _detail = document.getElementById("edit_postdetail").value;
            var _latitude = document.getElementById("edit_latitude").value;
            var _longitude = document.getElementById("edit_longitude").value;

            const url = urlipad + 'updateOfficial/' + _ipupdate;
            let formData = new FormData();

            formData.append('topic', _topic);
            formData.append('detail', _detail);
            formData.append('gps[latitude]', _latitude);
            formData.append('gps[longitude]', _longitude);

            // for (var i = 0; i < arrimagedelete.length; i++) {
            //     if (arrimagedelete[i] != " " && arrimagedelete[i] != undefined) {
            //         if (arr[i].name != undefined) {
            //             console.log(arr[i]);
            //             formData.append('imageOfficial', arr[i]);
            //         } else {
            //             console.log(arrimagedelete[i]);
            //             formData.append('delImage', arrimagedelete[i]);
            //         }
            //     }
            // }


            for (var i = 0; i < arrimagedelete.length; i++) {
                try {
                    if (arrimagedelete[i].name == undefined) {
                        formData.append('delImage', arrimagedelete[i]);
                    }
                } catch (err) {
                }

            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != " ") {
                    formData.append('imageOfficial', arr[i]);
                }
            }



            axios.put(url, formData
            ).then(function (response) {
                console.log(response.data.message);

                if (val == "Asset") {
                    location.href = "allasset.html";
                }
                if (val == "Business") {
                    location.href = "allbusiness.html";
                }
                if (val == "Travel") {
                    location.href = "alltravel.html";
                }

                if (val == "Service") {
                    location.href = "allservice.html";
                }

            }).catch(function (res) {
                const { response } = res
                console.log(response.data.message)
            });
        }


        /////////////////////////// อัพเดท official
        // $('#edit_submitpostofficial').on('click', function (e) {
        //     var _ipupdate = document.getElementById("_id_updatedata").value;
        //     var topic = document.getElementById("edit_posttopic").value;
        //     var detail = document.getElementById("edit_postdetail").value;
        //     var latitude = document.getElementById("edit_latitude").value;
        //     var longitude = document.getElementById("edit_longitude").value;

        //     const url = urlipad + 'updateOfficial/' + _ipupdate;
        //     let formData = new FormData();
        //     formData.append('topic', topic);
        //     formData.append('detail', detail);
        //     formData.append('latitude', latitude);
        //     formData.append('longitude', longitude);

        //     for (var i = 0; i < arrimagedelete.length; i++) {
        //         if (arrimagedelete[i] != " " && arrimagedelete[i] != undefined) {
        //             if (arr[i].name != undefined) {
        //                 console.log(arr[i]);
        //                 formData.append('imageOfficial', arr[i]);
        //             } else {
        //                 console.log(arrimagedelete[i]);
        //                 formData.append('delImage', arrimagedelete[i]);
        //             }
        //         }
        //     }

        //     axios.put(url, formData
        //     ).then(function (response) {
        //         console.log(response.data.message);
        //         location.href = "allnotice.html";
        //     }).catch(function (res) {
        //         const { response } = res
        //         console.log(response.data.message)
        //     });

        // });







    });





    ///////////////////// บันทึกอัพเดท

    // $.getScript("ip.js", function (data, textStatus, jqxhr) {
    //     var urlipaddress = data.substring(1, data.length - 1);

    ////////  document.getElementById("file").files[0];
    //     var _posttopic = document.getElementById("edit_posttopic").value;
    //     var _date = document.getElementById("edit_datetimenotice").value;
    //     var _postdetail = document.getElementById("edit_postdetail").value;
    //     var _weblink = document.getElementById("edit_weblink").value;


    //     if (_posttopic == '' || _date == '' || _postdetail == '') {
    //         document.getElementById("edit_lbl_notice").innerText = "กรุณากรอกข้อมูลให้ครบ";
    //         document.getElementById("edit_lbl_notice").style.color = "red";

    //         return;
    //     }
    //     var today = new Date();
    //     var ti = today.toLocaleTimeString('en-US', {
    //         hour12: false,
    //         hour: "numeric",
    //         minute: "numeric"
    //     }).padStart(2, '0');
    //     var sp_date = _date.split("/");
    //     var Strdatetime = sp_date[1] + '/' + sp_date[0] + '/' + sp_date[2] + ", " + ti;

    //     const dataNotice = {
    //         topic: _posttopic + "",
    //         dateNotice: Strdatetime,
    //         detail: _postdetail,
    //         weblink: _weblink
    //     }
    //     var file_data = $('#edit_fileimage').prop('files');
    //     const url = urlipaddress + 'addNotice';
    //     let formData = new FormData();
    //     if (file_data == undefined) {
    //         formData.append('dataNotice', JSON.stringify(dataNotice));
    //         formData.append('imageNotice', '');
    //     } else {
    //         formData.append('dataNotice', JSON.stringify(dataNotice));
    //         var typefile = $('#edit_fileimage').val().split('.');
    //         if (typefile[1] != 'PNG' && typefile[1] != 'JPG' && typefile[1] != 'jpg' && typefile[1] != 'jpeg' && typefile[1] != 'png') {

    //             document.getElementById("lbl_notice").innerText = 'เลือกรูปภาพใหม่ เป็นไฟล์ JPEG, JPG, PNG !!!';
    //             return;
    //         }

    //         var file_length = document.getElementById("edit_fileimage").files.length;
    //         for (var i = 0; i < file_length; i++) {
    //             console.log(file_data[i]);
    //             formData.append('imageNotice', file_data[i]);
    ///////// document.getElementById("file").files[0];
    //         }
    //     }

    //     // axios.post(url, formData
    //     // ).then(function (response) {
    //     //     location.href = "allnotice.html";

    //     // }).catch(function (res) {
    //     //     const { response } = res
    //     //     document.getElementById("edit_lbl_notice").innerText = 'แก้ไขข้อมูลไม่สำเร็จ !!!';
    //     //     document.getElementById("edit_lbl_notice").style.color = 'red';

    //     // });
    // });




});









