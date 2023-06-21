
# -TypeScript\_-Inventory_Management


## 프로젝트명 :

warehouse(재고 관리 프로그램)

## 프로젝트 기간 :

2023.6.17 ~

## 주요 기능

<br>
회원가입  

로그인  

프로덕트(상품) 등록  

등록된 프로덕트 수정  

거래처 등록  

등록된 거래처 수정  

오더(출고)  

입고  

추가 적으로 통계 적용

## 사용 기술 스택

<br>
frontend : react, javaScript, typescript

backend : java, spring boot, JPA, spring security  
Database : mongoDB  
CI/CD : github actions


## 협의 내용

목표 사내 원활한 재고관리를 위해 관리 프로그램을 만든다.

= 즉 혼자 쓰는 것이 아니다. 
꼭 들어가야할 것들:
1. 사내 사원의 아이디나 사원명, 사원번호 등 재고를 등록 혹은 소진한 인원의 정보가 나와야한다. 누가 등록했고 누가 사용했는지 -로그인 기능을 만들어야한다. 
2. 사진을 등록할 수 있어야한다. - 상품 사진등록은 필수다. 
3. 무작위로 만들어진 상품 번호가 필요하다. - 상품번호로 상품 식별 -당연한 이야기다. 기본적으로 등록되는 아이디
4. 언제든 쉽게 재고를 바꿀 수 있어야한다. - 반응형 앱으로 만들어야한다. 핸드폰에서 사용될 수 있도록
5. 바코드를 이용할 수 있어야한다. - 바코드를 등록하고 바코드를 찍으면 상품의 정보로 연결되어야한다- bwip-js-react를 이용하자
6. 새로운 상품을 등록할 수 있어야한다. 필수등록요소(상품명, 상품수, 상품위치(꽤 중요하다고 본다.), 상품 설명, 바코드)
7. 새로운 등록요소를 추가할 수 있어야한다. (납품 기한 등등)
8. 필수등록요소를 통해 상품을 검색할 수 있어야한다. 
9. 재고 알림 기능 -상품의 재고 수가 일정 이하로 떨어지면 알림을 보내줘야한다. - 쉽지 않을듯
10 재고 보고서 기능 - 상품의 입고수나 판매량 데이터를 그래프나 통계로 보여줄 수 있어야한다. 
<br>  
** 협의는 노션이나 단톡방에서 합니다.



## ERD

[ERD 링크](https://dbdiagram.io/d/648bf257722eb77494101b6d)


## 스탭바이스텝

1. [기능명세서 만들기](https://github.com/samdo91/TypeScript_Inventory_Management/blob/master/client/%EA%B8%B0%EB%8A%A5%EB%AA%85%EC%84%B8%EC%84%9C.md)
2. API 명세서 
    - [notion](https://amusing-side-256.notion.site/API-63c1a3c2d99b475fa8b61da97f73b593?pvs=4)
    - [swagger](https://app.swaggerhub.com/apis/samdo91/wareHouse_API/1.0.0#/)

## 일지

1. 6월 17일 프로젝트 시작
2. 6월 20일 기획명세서 완성
3. 6월 21일 API명세서 작성
4. 6월 22일 API명세서 swagger 버전 만듬

---




