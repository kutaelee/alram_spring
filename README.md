# 서버가 죽으면 이메일로 알람을 보내주는 사이트입니다!
* 기간 2019.02.15~ing
# 베타버전 배포!
[사이트보러가기!](https://serverchecker.shop/)  
기간 2019.02.15~2019.03.02  

이번 프로젝트는 다른 프로젝트에 비해서 조금 속도가 늦었는데 중간에 짬날때 마다 ttd를 공부했습니다. 

다음프로젝트부터는 ttd를 이용해 개발해볼 생각입니다

제작목적은 많은 선배개발자분들과 오픈소스를 공개해주시는 많은 개발자분들에게 감사함을 느끼면서

아직 실력이 부족하지만 저도 누군가에게 필요한 사이트를 만들고싶어졌습니다.

생각해본 결과 요즘은 포트폴리오를 웹에 배포하고 이력서를 추가하는 경우가 많은데 

혹시나 서버가 다운된다면 낭패이기때문에 알림이 있으면 좋을 것 같았습니다.

아직 완벽한 완성은 아니지만 카카오톡 로그인구현과 카카오톡 알림메시지까지 꼭 구현해보고싶습니다.

# 주요 기능
* 도메인 서버의 다운 유무를 체크합니다.
* 회원이 도메인을 등록해 놓았다면 주기적으로 체크하여 다운이 되면 이메일로 알림을 보냅니다. 
* 회원가입,로그인 기능이 있습니다.
* 회원가입,로그인 모두 rsa 암호화를 진행하였습니다.
* 비밀번호는 단방향 암호화를 진행하였습니다.
* 회원이 도메인을 삭제,갱신 할 수 있습니다.
* 회원은 회원정보 변경,탈퇴를 할 수있습니다.
* 소셜로그인 (구글,네이버,카카오톡)
* https (직접 ssl을 인증받아서 사용하려했으나 클라우드에서 인증이 여러번 실패되어 블락을 당하여서 클라우드플레어로 대체)

# 해야할 일
* 카카오톡 로그인 및 알림서비스
* 리팩토링

# 문제 해결

## 403 권한문제
네이버의 경우 http로 연결시 user-agent가 없으면 403 코드로 권한거부를 하였고 이를 user-agent  상수를 지정해서 해결했습니다.

## 301,302,307 리다이렉트 문제
http연결시 https로 리다이렉트 하는 사이트의 경우 301,302,307 코드로 uri 변경후 로케이션에 저장하는데 

성공코드가 아니기 때문에 서버다운으로 간주되었습니다.

HttpUrlConnection의 setFollowRedirects 함수로 true를 사용 하여 일부해결이 되었지만 

https로 리다이렉트 할 경우 프로토콜이 달라지기 때문에 Follow 하지 못하는 문제가 있었고

이게 가능하다고 해도 자격증명이나 클라이언트의 인증서 여부를 알 수있는  보안상 문제가 있을 수 있어서

상태코드를 판별 후 연결된 커넥션의 리스폰 헤더에 로케이션을 파싱하였고 

이를 다시 커넥션시켜서 상태코드를 확인하는 작업을 제한횟수(무한리다이렉트가 있을 수 있으므로)를 정한 후에 반복해서 해결하였습니다. 
