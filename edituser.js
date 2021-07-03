$(function () {
    var data;
    var _iduser;
    var _idhome;
    $.getScript("ip.js", function (dataipaddress, textStatus, jqxhr) {
        var urlipad = dataipaddress.substring(1, dataipaddress.length - 1);

        ////////////////////////////////////// แก้ไข User
        $('#table1').on('click', 'i.editor_edit', function (e) {

            $("#h_pass").text('รหัสผ่านเดิม');
            e.preventDefault();
            $("#p_update").text('');
            $("#title").text('แก้ไขข้อมูล');
            document.getElementById("move").style.display = 'none';
            var table = $('#table1').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();

            if (data == undefined) {
                data = table.row(this).data();
            }
            $("#myModal").modal();
            $("#postaddress").val(data.address);

            var _n = data.name.split(' ')
            $("#posttitle").val(_n[0]);
            $("#postname").val(_n[1]);
            $("#postlastName").val(_n[2]);
            $("#posttel").val(data.tel);
            $("#status").val(data.status);
            //  $("#password").val(data.password);

            _iduser = data._iduser;
            _idhome = data._idhome;
            $("#postbuildingtype").val(data.buildingType);
            $("#postmeter").val(data.meterId);
            $("#meterValues").val(data.meterVal);
            $("#latitude").val(data.gps.latitude);
            $("#longitude").val(data.gps.longitude);
            document.getElementById("submitpost").style.display = 'none';
            document.getElementById("editpost").style.display = 'block';
            document.getElementById("newpassword").style.display = 'block';



            document.getElementById("postaddress").disabled = true;
            document.getElementById("posttitle").disabled = true;
            document.getElementById("postname").disabled = true;
            document.getElementById("postlastName").disabled = true;
            document.getElementById("posttel").disabled = true;
            document.getElementById("status").disabled = true;
            document.getElementById("postbuildingtype").disabled = true;
            document.getElementById("postmeter").disabled = true;
            document.getElementById("meterValues").disabled = true;
            document.getElementById("latitude").disabled = true;
            document.getElementById("longitude").disabled = true;

        });


        ////////////////อัพเดท User
        $('#editpost').on('click', function (e) {
            var _passwordold = document.getElementById("password").value;
            var _passwordnew = document.getElementById("new_pass_user").value;
            console.log(_iduser)
            console.log(_idhome)

            if (_passwordold == "" || _passwordnew == "") {
                document.getElementById("p_update").innerText = "กรุณากรอกรหัสผ่านเดิม รหัสผ่านใหม่ ให้ครบ !!!";
                document.getElementById("p_update").style.color = "red";
                return;
            }

            const url = urlipad + 'changePassword/' + _idhome;

            const datauser = {
                _idUser: _iduser,
                oldPassword: _passwordold,
                newPassword: _passwordnew,
            }

            axios.put(url, datauser
            ).then(function (response) {
                console.log(response.data.message);
                location.href = "registerlist.html";
            }).catch(function (res) {
                const { response } = res

                if (response.data.message == "Incorrect password") {
                    document.getElementById("p_update").innerText = "รหัสผ่านเดิมไม่ถูกต้อง !!!";
                    document.getElementById("p_update").style.color = "red";
                    return;
                }

                document.getElementById("p_update").innerText = response.data.message;
                document.getElementById("p_update").style.color = "red";
                console.log(response.data.message)
            });

        });



        ////////////////////////////////////// แก้ไข Admin
        $('#table_admin').on('click', 'i.editor_editadmin', function (e) {

            e.preventDefault();
            $("#title").text('แก้ไขข้อมูล');
            var table = $('#table_admin').DataTable();
            e.preventDefault();
            var _ro = table.row($(this).parents('tr'));
            data = _ro.data();

            if (data == undefined) {
                data = table.row(this).data();
            }
            //  console.log(data)
            $("#myModaladmin").modal();
            $("#username_ad").val(data.username);

            var _n = data.name.split(' ')
            $("#posttitle_ad").val(_n[0]);
            $("#postname_ad").val(_n[1]);
            $("#postlastName_ad").val(_n[2]);
            $("#tel_ad").val(data.tel);
            $("#email_ad").val(data.email);

            document.getElementById("username_ad").disabled = true;
            document.getElementById("posttitle_ad").disabled = true;
            document.getElementById("postname_ad").disabled = true;
            document.getElementById("postlastName_ad").disabled = true;
            document.getElementById("tel_ad").disabled = true;
            document.getElementById("email_ad").disabled = true;

            _idadmin = data._idadmin;
            console.log(_idadmin)
        });

        ////////////////อัพเดท Admin
        $('#editpostadmin').on('click', function (e) {

            var _passold = document.getElementById("pass_ad").value;
            var _passnew = document.getElementById("new_pass_ad").value;

            const url = urlipad + 'changePasswordAd';

            const dataad = {
                _id: _idadmin,
                oldPassword: _passold,
                newPassword: _passnew,
            }
            console.log(dataad)
            axios.put(url, dataad
            ).then(function (response) {
                console.log(response.data.message);
                location.href = "registerlist.html";
            }).catch(function (res) {
                const { response } = res
                console.log(response.data.message)

                if (response.data.message == "Incorrect password") {
                    document.getElementById("p_updateadmin").innerText = "รหัสผ่านเดิมไม่ถูกต้อง !!!";
                    document.getElementById("p_updateadmin").style.color = "red";
                    return;
                }

                document.getElementById("p_updateadmin").innerText = response.data.message;
                document.getElementById("p_updateadmin").style.color = "red";
                console.log(response.data.message)
            });

        });





        ////////////////////////// ResetPassword
        $('#resetpasswordad').on('click', function (e) {
            document.getElementById("title_reset").innerText = 'คุณต้องการจะ รีเซ็ตรหัสผ่าน ใช่หรือไม่'
            document.getElementById("reset_power").style.display = "block";
            document.getElementById("btn_resetpassword").style.display = "none";
            $("#myModalconfirm").modal();
           

        });
        $('#btn_resetpasswordadmin').on('click', function (e) {
            const dataad = {
                _id: _idadmin
            }
            const url = urlipad + 'resetPasswordAd';

            axios.put(url, dataad
            ).then(function (response) {
                document.getElementById("title_reset").innerText = 'รีเซ็ตรหัสผ่านสำเร็จ'
                document.getElementById("reset_error").style.display = "none";
                document.getElementById("reset_ok").style.display = "block";
                document.getElementById("reset_power").style.display = "none";
                document.getElementById("btn_resetpassword").style.display = "none";
                document.getElementById("btn_resetpasswordadmin").style.display = "none";
            }).catch(function (res) {
                const { response } = res
                document.getElementById("title_reset").innerText = 'รีเซ็ตรหัสผ่านไม่สำเร็จ !!!'
                document.getElementById("reset_error").style.display = "block";
                document.getElementById("reset_ok").style.display = "none";
                document.getElementById("reset_power").style.display = "none";
                document.getElementById("btn_resetpasswordadmin").style.display = "none";
                console.log(response.data.message)
            });

        });

        




        ////// User
        $('#resetpassworduser').on('click', function (e) {
            document.getElementById("reset_power").display = "block";
            document.getElementById("btn_resetpasswordadmin").style.display = "none";
            $("#myModalconfirm").modal();
            document.getElementById("title_reset").innerText = 'คุณต้องการจะ รีเซ็ตรหัสผ่าน ใช่หรือไม่'
            // console.log(urlipad)
        });

        $('#btn_resetpassword').on('click', function (e) {
            const dataad = {
                _idUser: _iduser
            }
            const url = urlipad + 'resetPassword/' + _idhome;

            axios.put(url, dataad
            ).then(function (response) {
                console.log(response.data.message);
                document.getElementById("title_reset").innerText = 'รีเซ็ตรหัสผ่านสำเร็จ'
                document.getElementById("reset_error").style.display = "none";
                document.getElementById("reset_ok").style.display = "block";
                document.getElementById("reset_power").style.display = "none";
                document.getElementById("btn_resetpassword").style.display = "none";
                //  location.href = "registerlist.html";
            }).catch(function (res) {
                const { response } = res
                document.getElementById("title_reset").innerText = 'รีเซ็ตรหัสผ่านไม่สำเร็จ !!!'
                document.getElementById("reset_error").style.display = "block";
                document.getElementById("reset_ok").style.display = "none";
                document.getElementById("reset_power").style.display = "none";
                console.log(response.data.message)
            });

        });

    });

});