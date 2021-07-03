
var data;
var checkvaluse;
$(function () {


    $.getScript("ip.js", function (data, textStatus, jqxhr) {
        var urlipaddress = data.substring(1, data.length - 1);


        /////////////////////  ลบประกาศ
        $('#table_id8').on('click', 'tbody td i.editor_remove', function (e) {
            document.getElementById("lbl_dalate_completed").style.display = "none";
            document.getElementById("lbl_delete").style.display = "block";
            e.preventDefault();
            $("#myModaldelete").modal();

            var table = $('#table_id8').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();

            if (data == undefined) {
                data = table.row(this).data();
            }
            console.log(data)
            $("#_id_deletedata").text(data._id);
            $("#lbl_dalete_completed").text('คุณต้องการจะลบข้อมูล ใช่หรือไม่');
        });

        ////////// ลบประกาศ
        $('#Deletenoticedata').on('click', function (e) {
            axios.delete(urlipaddress + 'delNotice/' + data._id
            ).then(function (response) {
                console.log(response.data.message)
                location.href = "allnotice.html";

            }
            ).catch(function (res) {
                const { response } = res

                console.log(response.data.message)

            });

            document.getElementById("lbl_delete").style.display = "none";
            document.getElementById("lbl_dalate_completed").style.display = "block";
            document.getElementById("lbl_dalete_completed").innerText = 'ลบข้อมูลสำเร็จแล้ว';
        });







        /////////////////ลบทรัยสิน

        $('#table_id7').on('click', 'tbody td i.editor_remove', function (e) {
            document.getElementById("lbl_completed_official").style.display = "none";
            document.getElementById("lbl_delete_official").style.display = "block";
            e.preventDefault();
            var table = $('#table_id7').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();
            if (data == undefined) {
                data = table.row(this).data();
            }
            checkvaluse = "asset";

            console.log(data)
            $("#_id_deletedata").text(data._id);
            $("#myModaldeleteofficial").modal();
            $("#lbl_dalete_official").text('คุณต้องการจะลบข้อมูล ใช่หรือไม่');
        });

        ////////////////// ลบข้อมูลธุรกิจ

        $('#table_id5').on('click', 'tbody td i.editor_remove', function (e) {
            document.getElementById("lbl_completed_official").style.display = "none";
            document.getElementById("lbl_delete_official").style.display = "block";
            e.preventDefault();

            var table = $('#table_id5').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();

            if (data == undefined) {
                data = table.row(this).data();
            }
            checkvaluse = "business";
            $("#_id_deletedata").text(data._id);
            $("#myModaldeleteofficial").modal();
            $("#lbl_dalete_official").text('คุณต้องการจะลบข้อมูล ใช่หรือไม่');

        });


        //////ลบข้อมูลท่องเที่ยว

        $('#table_id4').on('click', 'tbody td i.editor_remove', function (e) {
            document.getElementById("lbl_completed_official").style.display = "none";
            document.getElementById("lbl_delete_official").style.display = "block";
            e.preventDefault();
            $("#myModaldeleteofficial").modal();

            var table = $('#table_id4').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();

            if (data == undefined) {
                data = table.row(this).data();
            }
            checkvaluse = "travel";
            $("#_id_deletedata").text(data._id);
            $("#lbl_dalete_official").text('คุณต้องการจะลบข้อมูล ใช่หรือไม่');

        });


        //////ลบ
        $('#table_id3').on('click', 'tbody td i.editor_remove', function (e) {
            document.getElementById("lbl_completed_official").style.display = "none";
            document.getElementById("lbl_delete_official").style.display = "block";
            e.preventDefault();
            $("#myModaldeleteofficial").modal();
            var table = $('#table_id3').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();

            if (data == undefined) {
                data = table.row(this).data();
            }
            checkvaluse = "service";
            $("#_id_deletedata").text(data._id);
            $("#lbl_dalete_official").text('คุณต้องการจะลบข้อมูล ใช่หรือไม่');

        });





        ////////// ลบทรัพสิน ธุรกิจ ท่องเที่ยว บริการ
        $('#Deleteofficial').on('click', function (e) {
            axios.delete(urlipaddress + 'official/' + data._id
            ).then(function (response) {
                console.log(response.data.message)
                document.getElementById("lbl_delete_official").style.display = "none";
                document.getElementById("lbl_completed_official").style.display = "block";
                document.getElementById("lbl_dalete_official").innerText = 'ลบข้อมูลสำเร็จแล้ว';

                if (checkvaluse == "asset") {
                    location.href = "allasset.html";
                }
    
                if (checkvaluse == "business") {
                    location.href = "allbusiness.html";
                }
    
                if (checkvaluse == "travel") {
                    location.href = "alltravel.html";
                }
    
                if (checkvaluse == "service") {
                    location.href = "allservice.html";
                }

            }).catch(function (res) {
                const { response } = res
                console.log(response.data.message)
            });

            


        });








       













    });

    return;
});