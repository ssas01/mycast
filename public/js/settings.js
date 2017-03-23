/**
 * Created by Administrator on 2017/3/22.
 */
//个人中心模块
//jquery,
define(["jquery","template","ckeditor","region","datepicker","language","uploadify","validate","formsend"],function ($,template,CKEDITOR) {
    //当点击个人中心的时候，发送ajax请求
    $.ajax({
        url:"/api/teacher/profile",
        type:"GET",
        dataType:"json",
        success:function (data) {
            //使用模板，可能修改后还要上传
            if (data.code==200) {
                var htmlStr=template("settingsTpl",data.result);
                $("#settingsArea").html(htmlStr);

                //有了元素之后，使用头像上传插件
                $("#upfile").uploadify({
                    buttonText:"",
                    width:120,
                    height:120,
                    fileObjName:'tc_avatar',
                    swf:"/public/assets/uploadify/uploadify.swf",
                    uploader:"/api/uploader/avatar",
                    onUploadSuccess:function (file,data) {
                        data=JSON.parse(data);
                        console.log(data);
                        $("#showProfilePlace img").attr("src",data.result.path);
                    }
                });
               //日期插件
                $("#tcBirthdayID,#jonDateID").datepicker({
                    format:"yyyy-mm-dd",
                    language:"zh-CN",
                    endDate:"0d"
                });
                //省级联动
                $('.hometown').region({
                    url : '/public/assets/jquery-region/region.json'
                });
                //富文本编辑----设置
                CKEDITOR.replace('ckeditor',{
                    toolbarGroups : [
                        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] }
                    ]
                });
                //表单验证和提交
                $("#settingsForm").validate({
                    sendForm:false,
                    valid:function(){
                        //同步更新富文本
                        // for (var instance in CKEDITOR.instances) {
                        //     CKEDITOR.instances[instance].updateElement();
                        // }
                        for(var instance in CKEDITOR.instances){
                            CKEDITOR.instances[instance].updateElement();
                        };
                        //当都合法时，传递的需要额外数据
                        var province=$("#p").find("option:selected").text();
                        var city=$("#c").find("option:selected").text();
                        var area=$("#d").find("option:selected").text();
                        var tc_hometown=province+"|"+city+"|"+area;
                        console.log(tc_hometown);
                        $(this).ajaxSubmit({
                            url:"/api/teacher/modify",
                            type:"POST",
                            data:{tc_hometown:tc_hometown},
                            dataType:"json",
                            success:function (data) {
                                //当修改成功时跳转页面，相当于刷新
                                if(data.code == 200){
                                    location.href = '/index/settings';
                                }
                            }
                        });
                    },

                });
            }
        }
    })

});