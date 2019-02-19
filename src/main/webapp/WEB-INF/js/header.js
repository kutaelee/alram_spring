$.ajax({
		url:'sessioncheck',
		type:'get',
		success:function(result){
			if(result){
				$('.nav_body ul li:nth-child(3)').html('<a href="mypage">내 정보</a>');
				$('.nav_body ul li:nth-child(4)').html('<a class="logout_btn">로그아웃</a>');
			}
		},error:function(){
			alert("세션체크 중 문제가 발생했습니다.");
		}
	});
$(document).ready(function(){	
	var tag=$('body').prop('class');
	

	$(document).on('click','.logout_btn',function(){
		$.ajax({
			url:'logout',
			type:'get',
			success:function(result){
				if(result){
					alert("로그아웃 완료!");
					location.href="/";
				}
			},error:function(){
				alert("로그아웃 중 문제발생!");
			}
		});
	});
$('#menu_toggle').click(function(){
		var name=$(this).prop('class');
		if(name=='menu_toggle'){
			$(this).attr('class','change');
			$('.'+tag+'_body').css({
				'transform':'rotate(-11deg)',
				'margin-left':'-10%',
				'transition':'0.4s'
			});

		   $('.nav_body').css({
			   'transform':'rotate(-11deg)',
			   'margin-left':'91%',
			   'transition':'0.2s'
			});
		   $('.line').css({
			   'transform':'rotate(-11deg)',
			   'margin-left':'-10%',
			   'transition':'0.5s'
		   })
			$('#menu_toggle div').css({
				'background':'white'
			})
		}else if(name=='change'){
			$(this).attr('class','menu_toggle');
			   $('.'+tag+'_body').css({
				   'transform':'rotate(0deg)',
					'margin-left':'0',
				   'transition':'0.3s'
			   });
			   $('.line').css({
				   'transform':'rotate(0deg)',
				   'margin-left':'0',
				   'transition':'0.2s'
			   })
			$('.nav_body').css({
				   'transform':'rotate(0deg)',
				   'margin-left':'101%',
				   'transition':'0.5s'
				});
			$('#menu_toggle div').css({
				'background':'cadetblue'
			})
		}
			
	});


});