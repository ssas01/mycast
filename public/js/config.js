require.config({
    baseUrl:"/public",
    paths:{
        jquery:"assets/jquery/jquery",
        bootstrap:"assets/bootstrap/js/bootstrap",
        cookie:"assets/jquery-cookie/jquery.cookie",
        echarts:"assets/echarts/echarts.min",
        tempalte:"assets/artTemplate/template",
        nprogress:"assets/nprogress/nprogress",
        //datepicker是模块化的
        datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker",
        language:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        //validate非模块化
        validate:"assets/validate/jquery-validate",
        formsend:"assets/jquery-form/jquery.form",
        //图片上传
        uploadify:"assets/uploadify/jquery.uploadify",
        //地区
        region:"assets/jquery-region/jquery.region",
        //富文本编辑
        ckeditor:"assets/ckeditor/ckeditor"
    },
    //注意垫片问题
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        //语言需要两个垫片
        language:{
            deps:["jquery","datepicker"]
        },
        validate:{
            deps:["jquery"]
        },
        uploadify:{
            //作为jquery插件，但是本身不需要到处任何模块变量的木块
            deps:["jquery"]
        },
        ckeditor:{
            deps:["jquery"],
            //依赖于jquery，同时需要导出模块变量
            exports : 'CKEDITOR',
        }
    }
});