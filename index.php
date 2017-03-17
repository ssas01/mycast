<?php
    //是后端做好的，但是要了解流程
   $path="index";
   $filename="index";
   //如果存在该值
   if (array_key_exists("PATH_INFO",$_SERVER)) {
        $url=$_SERVER["PATH_INFO"];
        //参数不同，字符串，开始位置（包含），长度
        $str=substr($url,1);
        $arr=explode("/",$str);
        if (count($arr)==2) {
            $path=$arr[0];
            $filename=$arr[1];
        }
   }else {
    //地址之后没有参数
        $filename="login";
   }
   //作用载入一个页面，也就是在php中载入一个页面，那么载入的页面需要以php为基础引入文件
   include("./view/".$path."/".$filename.".html");
?>