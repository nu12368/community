<?php
function OpenCon()
 {
 $dbhost = "163.44.198.57:3306";
 $dbuser = "cp929922_admin";
 $dbpass = "wacpassword";
 $db = "cp929922_wac_water";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
   
