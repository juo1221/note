
# BLUE

> 파일 구조를 이용할 수 있는 노트 앱입니다. 

배포주소 : https://main--gleaming-dieffenbachia-20b345.netlify.app/




# 1. 스택 

- react
- fxjs


# 2. 이용방법

<details>
  <summary>폴더 및 파일 생성</summary>
   <img src='https://user-images.githubusercontent.com/79268108/175510810-6f439645-63ae-49ea-b757-1b4aabea8157.gif' width=500>
  <p>현재 폴더 클릭 후 파일 혹은 폴더 생성</p>
</details>


<details>
  <summary>이름 변경</summary>
     <img src='https://user-images.githubusercontent.com/79268108/175510846-a0ca3f4f-a4c3-46cb-97dd-a99e31cf3972.gif' width=500>
  <p>파일 혹은 폴더 클릭 후 Enter 시 이름 변경 가능하고 취소할 수 있다.</p>
</details>


<details>
  <summary>파일 보기</summary>
     <img src='https://user-images.githubusercontent.com/79268108/175510854-847e5783-6ab4-41b7-ac3f-ea1bf6eb33f8.gif' width=500>
  <p>파일 클릭 시 파일에 대한 정보가 담겨있는 뷰가 생성</p>
</details>


<details>
  <summary>삭제</summary>
     <img src='https://user-images.githubusercontent.com/79268108/175510862-189e7380-7b04-4db8-82de-c22a22e2bd91.gif' width=500>
  <p>파일 혹은 폴더의 삭제 버튼 클릭 시 삭제 </p>
</details>


<details>
  <summary>이미지 변경</summary>
     <img src='https://user-images.githubusercontent.com/79268108/175510865-61794d5d-1c12-4694-8590-ff8cb8098f9e.gif' width=500>
  <p>우측 상단 버튼 클릭 시 이미지 변경</p>
</details>


# 3. 주요기능

<details>
  <summary>폴더 중첩</summary> 
<img width="500" src="https://user-images.githubusercontent.com/79268108/175765331-a96d70a7-2f37-44fc-bdd3-69a089d366a9.png">
  <p>
  재귀를 이용해 폴더에 폴더나 파일을 생성할 수 있도록 파일 시스템을 구현했다. 
 </p>
 </div>
</details>

<details>
<summary>삭제</summary>
  <p>폴더 삭제 시 : 현재 폴더와 폴더 내부에 들어있는 모든 내용을 같이 삭제한다.</p>
  <p>파일 삭제 시 : 현재 파일만 삭제한다.</p>
 </div>
</details>

<details>
<summary>breadcrumb</summary>
<div align="center">
<img width="832" alt="스크린샷 2022-06-25 오후 5 40 37" src="https://user-images.githubusercontent.com/79268108/175765672-69980038-9fbe-4aa1-86e8-589fc3f22afd.png">
  <p>
파일 경로를 알 수 있도록 최상위 폴더로부터 현재 파일까지의 위치를 표시했다. 
 </p>
</div>
  <div align="center">
<img width="832" alt="스크린샷 2022-06-25 오후 5 40 37" src="https://user-images.githubusercontent.com/79268108/175766052-67fc8127-d0c5-475b-a8e1-ed915f3373e7.png">
  <p>
재귀적으로 특정 속성을 추출해 연결할 수 있는 recurJoin 함수를 만들었고 
 </p>
  <img width="832" alt="스크린샷 2022-06-25 오후 5 40 37" src="https://user-images.githubusercontent.com/79268108/175766072-56a2ed9b-6079-43d1-be33-a2b4ea3b4e22.png">
  <p>
해당 함수를 이용해 breadcrumb 기능을 구현했다. 
 </p>
</div>
</details>

<details>
<summary>모달 재활용</summary>
<img width="500" src="https://user-images.githubusercontent.com/79268108/175766712-d8ca417c-a77c-4804-8f7c-fc4fb52689f3.png">
  <p>alert와 confirm 모달을 UI.message를 재사용해 만듦</p>
 </div>
</details>

<details>
<summary>애니메이션</summary>
<img width="500" src="https://user-images.githubusercontent.com/79268108/175767019-f94feca6-2032-4f72-bfb6-891ce6415c56.gif">
  <p>
  폴더 클릭 시 : 현재 담고 있는 폴더 혹은 파일을 부드럽게 보여주도록 애니메이션 적용
  </p>
  <p>
  이미지 변경 클릭 시 : 이미지 배경이 바뀔 때까지 로딩중임을 표시하고 이미지가 모두 로드되면 애니메이션이 종료 
  </p>
</details>

<details>
  <summary>저장과 복구</summary>
   <img src='https://user-images.githubusercontent.com/79268108/175510864-69823883-9698-4291-8aec-d032d8376f13.gif' width=500>
  <p>새로고침 혹은 웹브라우저 종류 후에도 복구</p>
  <p>폴더 객체를 저장하고 복구하기 위해 stringify, parse, localStorage를 사용</p>
  <p>객체마다 저장, 복구 영역을 정하기 위해 toJSON 사용</p>
  <img src='https://user-images.githubusercontent.com/79268108/175767603-3de320b1-46b0-4a0d-85d4-2fb23f9060f9.png' width=500>
  <p>순환 참조로 인한 오류방지를 위해 각 객체의 parent 속성은 stringify하지 않도록 함</p>
</details>

# 4. 최적화 포인트

#### 1. 파일 혹은 폴더 삭제 시 재귀 로직 제거 

<div align="center">
<img width="500" alt="스크린샷 2022-05-02 오후 3 45 57" src="https://user-images.githubusercontent.com/79268108/175768024-e576245d-91af-43e9-80c4-13e8044579ff.png">
 <p>기존: 최상위 폴더로부터 재귀적으로 파일을 탐색 후 제거</p>
<img width="500" alt="스크린샷 2022-05-02 오후 3 45 57" src="https://user-images.githubusercontent.com/79268108/175768021-c67ad13b-6426-4198-b582-6b0c458013a0.png">
 <p>개선: 해당 파일(혹은 폴더)을 담고있는 부모 폴더로부터 파일을 탐색 후 제거</p>
</div>




#### 2. 이미지 로딩 최적화 (placeholder image 사용)

  <p>
    한번에 2700x1900 사이즈를 받아오는 것이 아니라 810x570 사이즈의 이미지를 먼저 로딩 후 덮어씌우기 때문에 조금 더 높은 해상도의 이미지가 빠르게 로딩된다는 느낌을 줄 수 있다. 
  </p>

