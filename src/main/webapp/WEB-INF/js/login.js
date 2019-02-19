	$.ajax({
		url:'sessioncheck',
		type:'get',
		success:function(result){
			if(result){
				alert("이미 로그인 하셨습니다.");
				location.href="/";
			}
		},error:function(){
			alert("세션체크 중 문제가 발생했습니다.");
		}
	})
	
$(document).ready(function(){
	$('.header').load('/resources/header.html');
	

	/* 공개키 변수 */
	var RSAModulus = null;
	var RSAExponent = null;
	
	// 공개키 요청
	$.ajax({
		url : 'rsacall',
		type : 'post',
		dataType : 'json',
		success : function(result) {
			RSAModulus = result.RSAModulus;
			RSAExponent = result.RSAExponent;
		}
	});
	
	$('.login_btn').click(function() {
		var id = $('.login_id').val();
		var pw = $('.login_pw').val();
		
		// RSA 암호키 생성
		var rsa = new RSAKey();
		rsa.setPublic(RSAModulus, RSAExponent);

		// 계정 정보 암호화
		var securedid = rsa.encrypt(id);
		var securedpw = rsa.encrypt(pw);
		
		$.ajax({
			url:'memberlogin',
			type:'post',
			data:{
				'id':securedid,
				'pw':securedpw
			},success:function(result){		
				alert(result.msg);
				if(result.msg=="로그인 성공!"){
					login=true;
					location.href="/";
				}
			},error:function(){
				alert("로그인 중 문제발생!");
			}
		})
	});
});