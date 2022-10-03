# WhaTap Dashboard assignment

와탭랩스 대시보드 구현 과제

<br>

## 목차

- [설치 및 실행방법](#설치-및-실행방법)
- [구현 위젯](#구현-위젯)
- [과제수행 기간](#과제수행-기간)
- [기술 스택](#기술-스택)
- [챌린지](#챌린지)
- [과제 후기](#과제-후기)

<br>

## 설치 및 실행방법

1. 터미널을 실행시키고 프로젝트를 clone 받을 폴더로 이동합니다.
2. 프로젝트를 clone 합니다.
   ```
   git clone https://github.com/JinkwonHeo/WhaTap-assignment
   ```
3. 프로젝트 폴더로 이동합니다.
   ```
   cd WhaTap-assignment
   ```
4. 프로젝트 폴더로 이동 후 yarn을 입력하여 설치합니다.
   ```
   yarn install
   ```
5. yarn start를 입력하여 프로젝트를 실행합니다.
   ```
   yarn start
   ```

### 이슈 사항

- open API를 사용하는 프로젝트이므로 CORS 이슈가 발생할 수 있습니다. 아래의 명령어를 터미널에 입력하여 web-security를 해제한 크롬 브라우저를 실행시킨 후 프로젝트를 실행합니다.
  ```
  open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
  ```

<br>

## 구현 위젯 (사용 api)

- TPS (tps)
- 동시접속 사용자 (user)
- 금일 사용자 (visitor_5m/{stime}/{etime})
- 액티브 스테이터스 (act_method, act_sql, act_httpc, act_dbc, act_socket)
- 인포매틱스 (act_agent, inact_agent, cpucore, host)
- 총 12개 api사용

<br>

## 과제수행 기간

**_2022년 9월 21일 ~ 10월 3일 (2주)_**

<details><summary>1주차</summary>

- 과제 요구사항 파악
- 애플리케이션 구조설계 및 기술스택 선정
- 기술스택 학습 (d3.js)
- 인포매틱스, 라인, 바 차트 각 한 개 이상 구현

</details>

<details><summary>2주차</summary>

- 위젯 구현
- 편의기능 구현 (위젯 정보모달)
- 피드백을 위주로 리팩토링

  - DashBoard에서 하드코딩으로 필요한 모든 상태를 fetch하던 코드를 위젯마다 fetch하도록 변경
  - promise.all을 이용하여 각 위젯이 필요한 정보는 한 번에 fetch하도록 변경
  - useInterval 내부의 타이머를 setInterval에서 setTimeout으로 변경
  - 위젯마다 각각 컴포넌트를 만들었던 사항을 공용 Widget으로 통합

  </details>
  <br>

## 폴더 구조
<details><summary>폴더 구조</summary>

```
📦src
 ┣ 📂components
 ┃ ┣ 📂DashBoard
 ┃ ┃ ┣ 📂Informatics
 ┃ ┃ ┃ ┗ 📜Informatics.tsx
 ┃ ┃ ┣ 📂Widget
 ┃ ┃ ┃ ┣ 📂Chart
 ┃ ┃ ┃ ┃ ┣ 📂BarChart
 ┃ ┃ ┃ ┃ ┃ ┣ 📜BarChart.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜type.d.ts
 ┃ ┃ ┃ ┃ ┗ 📂LineChart
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LineChart.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜type.d.ts
 ┃ ┃ ┃ ┣ 📜Widget.tsx
 ┃ ┃ ┃ ┗ 📜types.d.ts
 ┃ ┃ ┗ 📜DashBoard.tsx
 ┃ ┣ 📂ErrorBoundary
 ┃ ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┃ ┗ 📜ErrorUI.tsx
 ┃ ┣ 📂LoadingCircle
 ┃ ┃ ┗ 📜LoadingCircle.tsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┣ 📂Portal
 ┃ ┃ ┗ 📜Portal.tsx
 ┃ ┗ 📂shared
 ┃ ┃ ┣ 📜Container.tsx
 ┃ ┃ ┣ 📜Text.tsx
 ┃ ┃ ┗ 📜WidgetContainer.tsx
 ┣ 📂constants
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜queueFormat.ts
 ┃ ┗ 📜widgetInformation.ts
 ┣ 📂hooks
 ┃ ┣ 📜useFetch.ts
 ┃ ┣ 📜useInterval.ts
 ┃ ┗ 📜useResizeOBserver.tsx
 ┣ 📂reducer
 ┃ ┣ 📜action.ts
 ┃ ┣ 📜actionTypes.ts
 ┃ ┣ 📜context.tsx
 ┃ ┣ 📜reducer.ts
 ┃ ┗ 📜types.d.ts
 ┣ 📂style
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜Pretendard-Bold.ttf
 ┃ ┃ ┣ 📜Pretendard-Light.ttf
 ┃ ┃ ┗ 📜Pretendard-Medium.ttf
 ┃ ┣ 📜GlobalStyles.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜styled.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂utils
 ┃ ┗ 📜getMaxDomainValue.ts
 ┣ 📜App.tsx
 ┣ 📜api.ts
 ┗ 📜index.tsx
 ```
  </details>
  <br>

## 기술 스택

- TypeScript
- React
- d3
- immer
- Styled-components

### 기술스택 선정이유

- d3.js vs chart.js
  - d3.js ✅
    - svg 사용
    - 명쾌함을 잃지 않으면서 차트 리사이징 가능
    - generate 로직을 직접 작성해야한다. (line, area … 등)
    - 차트가 정형화되어있지 않으므로 원하는 모양의 차트를 만들 수 있음 👍
  - chart.js
    - canvas 사용
    - 리사이징을 할 때 명쾌함을 잃을 수 있음
    - 차트가 미리 만들어져있으므로 필요한 값만을 입력해서 바로 생성가능
    - 차트가 정형화되어있음
- 상태관리 ✅
  - 전역으로 관리되어야 할 상태
    - 차트데이터
    - isLoading
    - error
    - queue
  - 크게 복잡하게 관리되어야 하는 상태 x → 라이브러리 사용 대신 useReducer 사용
  - props drilling 방지를 위해 context API 사용
  - reducer사용 시 상태불변성 유지의 용이성을 위해 **_immer_** 사용
- css vs styled components - styled components ✅ - 전역적으로 css 관리가 아닌 컴포넌트마다 스타일 적용 가능 - 미리 스타일이 적용된 공유컴포넌트를 가져와서 추가적인 스타일 적용 가능 (공유 컴포넌트) - props를 통해 컴포넌트마다 비슷하지만 조금씩 다른 스타일 적용 가능 - 컴포넌트에서 바로 css 확인 가능
  <br>

## 챌린지

- d3.js<br>
  d3.js를 처음 사용하기 때문에 학습과정을 거친 후 과제에 적용하였습니다. 학습하면서 가장 어려웠던 점은 차트를 구현하기 위해 하나하나 모두 설정해주어야 한다는 점이었습니다. line chart 하나를 구현하기 위해 사용하는 메서드의 종류가 많았고 따라서 메서드가 어떤 동작을 하는지 파악하는데 많은 시간이 소요되었습니다.<br>
  이를 해결하기 위해 단시간에 많은 예제를 접하고 직접 차트를 만들어보면서 익숙해지는 시간을 가졌습니다. 구글링을 해서 예제를 가져오는 것 보다는 이후 제가 원하는 모양의 차트를 좀 더 손쉽게 만들기 위해 반드시 필요한 과정이라고 생각했고, 비록 완벽하지는 않지만 어느정도 원하는 모양의 차트를 만들고 과제를 완료하였습니다.

- 다수의 api fetch<br>
  위젯을 추가하는 과정에서 사용하는 api가 많아지고 이를 적절히 처리하는 과정이 필요함을 느꼈습니다. 처음에는 DashBoard 컴포넌트에서 필요한 api를 한 번에 모두 불러오는 방식으로 fetch를 수행하였습니다. 이는 코드상 가독성이 좋지않고 한 위젯이 필요한 정보를 가져오는데 시간차가 발생할 수 있다고 생각되었습니다.<br>
  이를 해결하기 위해 Promise.all을 사용하여 각 위젯이 필요한 api를 한 번에 요청하도록 하고 각 요청그룹은 queuing을 통해 관리하였습니다. 한 번에 다수의 fetch를 실행하면 429에러가 발생하기에 각 요청마다 300ms의 시간차를 두어 요청하도록 구현하였습니다. <br>
  위젯이 필요한 정보를 정상적으로 응답받았다면 refresh가 필요한 위젯은 다시 queuing을 통해 다음 주기에 다시 fetch하도록 구현하였습니다.

- Widget 공용 컴포넌트 구현<br>
  애플리케이션을 설계하면서 공용 컴포넌트를 염두하고 설계하였습니다. 이를 위해 대시보드에서 자주 사용되는 LineChart, BarChart를 공용으로 만들고 필요한 정보를 각 위젯의 서비스컴포넌트에서 만든 후 props로 내려주는 방식으로 구현하였습니다.<br>
  이후 1차 피드백을 받영하여 위젯마다 각각 컴포넌트를 만드는 것이 아닌 좀 더 범용성이 큰 하나의 Widget 공용 컴포넌트를 만들게 되었습니다. 각 위젯마다 공통된 부분을 추출하여 Widget 컴포넌트 내부에서 수행하도록 하였고 각 차트마다 고유하게 필요한 요소들은 컴포넌트 내부에서 분기처리를 통해 서비스를 수행하도록 구현하였습니다.<br>

## 과제 후기
과제로 주신 대시보드 구현은 저에게 도전욕구를 불러왔습니다. 많은 정보의 시각화, 다수의 api 요청을 활용한 화면처리 등 지금까지 구현했던 프로그램과는 조금 다른 영역의 과제였습니다. 과제를 성공적으로 완성하고 완성도를 높이기 위해 실제로 와탭랩스에서 일한다는 마음가짐으로 수행하였습니다.<br>
지금은 저 혼자 과제를 진행하였지만, 와탭랩스에서의 협업을 가정하고 커밋메시지를 작성하고 커밋 컨벤션을 작성하였습니다.<br>
또한 리뷰를 받으면서 과제의 완성도를 높일 수 있었던 것은 물론, 실제 개발을 하게 된다면 어떤 부분을 중점적으로 생각해야 하는지 알게 된 유익한 시간이었습니다.<br>
<br>
와탭랩스의 과제를 수행한 시간은 다양한 open api를 사용해보고 코드리뷰를 받으면서 개발자로써 고민하고 성장도 이루어낸 귀중한 시간이었습니다. 감사합니다.
