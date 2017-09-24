<?php
$resp =  strlen($_REQUEST["uname"]) % 2 == 0;
if($resp){
    echo true;
}else{
    echo false;
}
?>