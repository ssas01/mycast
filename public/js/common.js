
	//实现状态栏左边的效果
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	//实现检查登录状态，直接在地址栏跳过登录页面输入其他页面，可以通过检查sessionID的方式实现检查，具体名字可以登录的时候，检查请求文档
	var flag=$.cookie("PHPSESSID");
	var pathname=location.pathname;
	if (!flag && pathname.indexOf("login")==-1) {
		//重新定位到login页面
		location.href="/login";
	}
