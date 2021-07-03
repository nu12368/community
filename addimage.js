
var length_img;
var n = 0;
var arr = new Array();
var img_id = $(this).children("img").attr("id");
var num_index = 0;
$(function () {


    /////////////////แสดงรูปภาพ
    var imagesPreview = function (input) {
        if (input.files) {
            var filesAmount = input.files.length;
            document.getElementById("lbl_add").innerText = '';
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                var typefile = input.files[i].name.split('.');
                if (typefile[1] != 'PNG' && typefile[1] != 'JPG' && typefile[1] != 'jpg' && typefile[1] != 'jpeg' && typefile[1] != 'png') {
                    document.getElementById("lbl_add").innerText = 'เลือกรูปภาพใหม่ เป็นไฟล์ JPEG, JPG, PNG !!!' + '\n' + input.files[i].name;
                    document.getElementById("lbl_add").style.color = "red";
                    return;
                }
                if (input.files[i].size > 2192282) {
                    document.getElementById("lbl_add").innerText = "ขนาดภาพใหญ่เกินไป !!" + '\n' + input.files[i].name;
                    document.getElementById("lbl_add").style.color = "red";
                    return;
                }

                reader.onload = function (event) {
                    length_img = $("#addImagenew img");
                    if (length_img.length > 4) {
                        document.getElementById("lbl_add").innerText = "อัพไฟล์รูปได้ไม่เกิน 5 รูป !!!";
                        document.getElementById("lbl_add").style.color = "red";
                        return;
                    }

                    // $("#addImagenew").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
                    //     <i name="${num_index}" class="delete_cc fa fa-times fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12" ><img name="${num_index}" src="${event.target.result} "class="cc img-responsive thumbnail"></i></a>`);
                    // num_index = num_index + 1;

                }

                reader.readAsDataURL(input.files[i]);
            }
        }
        return;
    };

    var typename;

    ///////////////// เลือกไฟล์
    $('#fileimage').on('change', function () {
        length_img = $("#addImagenew img");
        imagesPreview(this);
        var file_data = $('#fileimage').prop('files');
        var file_length = document.getElementById("fileimage").files.length;
        var database64 = "";
        var namefile;
        for (var i = 0; i < file_length; i++) {
            typename = file_data[i].type;
            namefile = file_data[i].name
            getDataUrl(file_data[i], function (imgBase64) {
                $("#addImagenew").append(`<a id="close" style="font-size:18px;color:red; class="pull-right" href="#">
                <i name="${num_index}" class="delete_cc fa fa-times fa fa-times col-lg-3 col-md-4 col-sm-6 col-xs-12" ><img name="${num_index}" src="${imgBase64} "class="cc img-responsive thumbnail"></i></a>`);
                database64 = imgBase64;
                num_index = num_index + 1;
                arr[n] = dataURLtoFile(imgBase64, namefile);
                n = n + 1;
            });

            if (file_data[i].size > 2192282) {
                return;
            }

            ///////////////////////////// เดิม
            // if (file_data[i].size > 2192282) {
            //     return;
            // }
            //  arr[n] = file_data[i]
        }
        return
    });

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

    ///////// ลบรูปภาพ
    $('#addImagenew').on('click', 'i.delete_cc', function (e) {
        var remove_index = $(this).attr("name");
        arr[parseInt(remove_index)] = " ";
        $(this).remove();

    });

    ////////////////////  บันทึก ประกาศ
    $('#submitpostinvoice').on('click', function (e) {
        $.getScript("ip.js", function (data, textStatus, jqxhr) {
            var urlipaddress = data.substring(1, data.length - 1);
            var _posttopic = document.getElementById("posttopic").value;
            var _date = document.getElementById("datetimenotice").value;
            var _postdetail = document.getElementById("postdetail").value;
            var _weblink = document.getElementById("weblink").value;

            if (_posttopic == '' || _date == '' || _postdetail == '') {
                document.getElementById("lbl_notice").innerText = "กรุณากรอกข้อมูลให้ครบ";
                document.getElementById("lbl_notice").style.color = "red";
                if (_posttopic == '') { document.getElementById("posttopic").style.borderColor = "red"; }
                if (_date == '') { document.getElementById("datetimenotice").style.borderColor = "red"; }
                if (_postdetail == '') { document.getElementById("postdetail").style.borderColor = "red"; }
                return;
            }
            var today = new Date();
            var ti = today.toLocaleTimeString('en-US', {
                hour12: false,
                hour: "numeric",
                minute: "numeric"
            }).padStart(2, '0');
            var sp_date = _date.split("/");
            var Strdatetime = sp_date[1] + '/' + sp_date[0] + '/' + sp_date[2] + ", " + ti;

            const dataNotice = {
                topic: _posttopic + "",
                dateNotice: Strdatetime,
                detail: _postdetail,
                weblink: _weblink
            }
            const url = urlipaddress + 'addNotice';
            let formData = new FormData();
            if (arr.length == 0) {
                formData.append('dataNotice', JSON.stringify(dataNotice));
                formData.append('imageNotice', '');
            } else {
                formData.append('dataNotice', JSON.stringify(dataNotice));

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != " ") {
                        formData.append('imageNotice', arr[i]);
                       // console.log(arr[i]);
                    }
                }
            }

            axios.post(url, formData
            ).then(function (response) {
                location.href = "allnotice.html";
            }).catch(function (res) {
                const { response } = res
                console.log(response.data.message)
                if (response.data.message == 'File too large') {
                    document.getElementById("lbl_notice").innerText = "ขนาดภาพใหญ่เกินไป";
                    document.getElementById("lbl_notice").style.color = "red";
                }
            });


        });
    });


    ////////////////////  บันทึก ทรัพสิน
    $('#submitpostOfficialaddAsset').on('click', function (e) {
        SaveDataOfficial('addAsset');
    });
    ////////////////////  บันทึก ธุรกิจ
    $('#submitpostOfficialbusiness').on('click', function (e) {
        SaveDataOfficial('addBusiness');
    });
    ////////////////////  บันทึก ท่องเที่ยว
    $('#submitpostOfficialaServiceTravel').on('click', function (e) {
        SaveDataOfficial('addTravel');
    });
    ////////////////////  บันทึก บริการ
    $('#submitpostOfficialaService').on('click', function (e) {
        SaveDataOfficial('addService');
    });

    function SaveDataOfficial(val) {
        $.getScript("ip.js", function (data, textStatus, jqxhr) {
            var urlipaddress = data.substring(1, data.length - 1);
            var _topic = document.getElementById("posttopic").value;
            var _detail = document.getElementById("postdetail").value;
            var _latitude = document.getElementById("latitude").value;
            var _longitude = document.getElementById("longitude").value;

            if (_topic == '' || _detail == '' || _latitude == '' || _longitude == '') {
                document.getElementById("lbl_1").innerText = "กรุณากรอกข้อมูลให้ครบ";
                document.getElementById("lbl_1").style.color = "red";
                return;
            }
            const dataservice = {
                topic: _topic,
                detail: _detail,
                "gps": {
                    latitude: _latitude,
                    longitude: _longitude
                }
            }
            const url = urlipaddress + val;
            let formData = new FormData();
            if (arr.length == 0) {
                formData.append('dataOfficial', JSON.stringify(dataservice));
                formData.append('imageOfficial', '');
            } else {
                formData.append('dataOfficial', JSON.stringify(dataservice));

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != " ") {
                        formData.append('imageOfficial', arr[i]);
                       // console.log(arr[i]);
                    }
                }

            }

            axios.post(url, formData
            ).then(function (response) {
                console.log('บันทึกข้อมูลสำเร็จ')

                if (val == "addAsset") {
                    location.href = "allasset.html";
                }
                if (val == "addBusiness") {
                    location.href = "allbusiness.html";
                }
                if (val == "addTravel") {
                    location.href = "alltravel.html";
                }

                if (val == "addService") {
                    location.href = "allservice.html";
                }

            }).catch(function (res) {
                const { response } = res
                document.getElementById("lbl_1").innerText = 'บันทึกข้อมูลไม่สำเร็จ !!!';
                document.getElementById("lbl_1").style.color = 'red';
            });

        });

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

                    //console.log(canvas.toDataURL(file.type,1.0))
                };
                img.src = srcBase64;
                // arr[n] = dataURLtoFile(srcBase64, file.name);
                // arr[n] = img;
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






    // function getOrientation(file, callback) {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {

    //         var view = new DataView(e.target.result);
    //         if (view.getUint16(0, false) != 0xFFD8) {
    //             return callback(-2);
    //         }
    //         var length = view.byteLength, offset = 2;
    //         while (offset < length) {
    //             if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
    //             var marker = view.getUint16(offset, false);
    //             offset += 2;
    //             if (marker == 0xFFE1) {
    //                 if (view.getUint32(offset += 2, false) != 0x45786966) {
    //                     return callback(-1);
    //                 }

    //                 var little = view.getUint16(offset += 6, false) == 0x4949;
    //                 offset += view.getUint32(offset + 4, little);
    //                 var tags = view.getUint16(offset, little);
    //                 offset += 2;
    //                 for (var i = 0; i < tags; i++) {
    //                     if (view.getUint16(offset + (i * 12), little) == 0x0112) {
    //                         return callback(view.getUint16(offset + (i * 12) + 8, little));
    //                     }
    //                 }
    //             }
    //             else if ((marker & 0xFF00) != 0xFF00) {
    //                 break;
    //             }
    //             else {
    //                 offset += view.getUint16(offset, false);
    //             }
    //         }

    //         return callback(-1);
    //     };
    //     reader.readAsArrayBuffer(file);



    //     var reader2 = new FileReader();
    //     reader2.onload = function (e) {

    //         var srcBase64 = e.target.result;
    //         var img = new Image();


    //         img.onload = function () {
    //             var width = img.width,
    //             height = img.height,
    //             canvas = document.createElement('canvas'),
    //             ctx = canvas.getContext("2d");
    //         }
    //         if (4 < orientation && orientation < 9) {
    //             canvas.width = height;
    //             canvas.height = width;
    //         } else {
    //             canvas.width = width;
    //             canvas.height = height;
    //         }

    //         switch (orientation) {
    //             case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
    //             case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
    //             case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
    //             case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
    //             case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
    //             case 7: ctx.transform(0, -1, -1, 0, height, width); break;
    //             case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
    //             default: break;
    //         }
    //         ctx.drawImage(img, 0, 0);
    //         callback2(canvas.toDataURL());
    //     }
    //     reader2.readAsDataURL(file);



    // }

    return;
});