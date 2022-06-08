# 사용자에게 데이터 받아보자

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style_ex.css" />
    <title>Document</title>
  </head>

  <body>
    <div id="loginForm">
      <input type="text" />
      <button>login</button>
    </div>
    <script type="text/javascript" src="script_ex.js"></script>
  </body>
</html>
```

## 자바스크립트를 사용하기

자바스크립트에서 요소를 가져오는 방법

- getElementById : 아이디로 요소 취득 (HTMLCollection)
- getElementByClassName : 클래스로 요소 취득 (HTMLCollection)
- getElementByTagName: 태그 이름으로 요소 취득 (HTMLCollection)
- querySelector: CSS 선택자를 이용한 하나의 요소 취득 (HTMLCollection)
- querySelectorAll: CSS 선택자를 이용한 요소는 NodeList 객체로 반환 (NodeList는 유사 배열 객체)

HTMLCollection과 NodeList의 차이

- HTMLCollection은 살아있는 객체이다.
  실시간으로 HTMLCollection은 중간에 요소의 속성이 바뀌면 HTMLCollection 객체도 실시간으로 변한다.

- querySelector은 실시간으로 상태를 변경하지 않는다.
  하지만 querySelector의 childNode는 실시간으로 변한다.

## login 버튼을 눌렀을 때 데이터 정보 수집

```javascript
const loginInput = document.querySelector("#loginForm input");
const loginBtn = document.querySelector("#loginForm button");

function btnClick() {
  const username = loginInput.value;
  if (username === "") {
    alert("Please write your name");
  } else if (username.length > 15) {
    alert("Your name is too long");
  }
}

loginBtn.addEventListener("click", btnClick);
```

## html에서 유효성 검사하기

중요한 점 form 태그 안에 input 태그가 존재해야 한다.
자바스크립트 없이도 유효성 검사가 가능하다.

```html
<form id="login-form">
  <input required maxlength="15" type="text" placeholder="What is your name" />
  <button>Log In</button>
</form>
```

form은 submit의 기본 동작이 존재한다.

## 유저에게 받은 데이터 값 확인하기

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginBtn = document.querySelector("#login-form button");

function submitForm() {
  const username = loginInput.value;
  console.log(username);
}

loginForm.addEventListener("submit", submitForm);
```

문제가 발생한다. 유저에게 받은 데이터 값이 새로고침 하면서 없어진다.

이벤트는 클릭을 하는 순간 발생하고, 새로고침이 일어난다. 하지만 새로고침이 일어나는 것을 form sumbit의 기본 동작이다.

preventDefault 메서드를 활용해서 form submit의 기본 동작인 새로고침을 막는다.

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginBtn = document.querySelector("#login-form button");

function btnClick(event) {
  event.preventDefault();
  const username = loginInput.value;
  console.log(username);
}

loginForm.addEventListener("submit", submitForm);
```

## 사용자가 로그인하면 반겨주기

display: none;의 hidden class 생성

자바스크립트를 이용해서 hidden 클래스를 추가와 삭제로 form 형식을 보여주고 삭제하는 것을 반복한다.

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginBtn = document.querySelector("#login-form button");
const greeting = document.querySelector("h1");

function submitForm(event) {
  event.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add("hidden");
  greeting.innerText = "Hello " + username;
  greeting.classList.remove("hidden");
}

loginForm.addEventListener("sumbit", submitForm);
```

## 사용자 데이터를 local storage에 저장하자!

local storage에 저장하지 않으면 새로고침 했을 때,
사용자의 정보가 사라진다.
때문에 local storage에 데이터를 저장해야한다.

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginBtn = document.querySelector("#login-form button");
const greeting = document.querySelector("h1");

function submitForm(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem("username_key", username);
  loginForm.classList.add("hidden");
  greeting.innerText = "Hello " + username;
  greeting.classList.remove("hidden");
}

loginForm.addEventListener("sumbit", submitForm);
```

local storage에 저장했지만, 새로고침 하여도 여전히 사용자 ID를 물어본다.

## 로그인 이후 더 이상 사용자 ID 묻지 않기

이미 local storage에 저장한 값이 존재하면, 더이상 사용자 ID를 묻지 않기

localStorage에서 키 값을 활용하여 값을 묻은 이후에
if문을 활용해서 존재에 따라서 동작을 다르게 설정해 준다.

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginBtn = document.querySelector("#login-form button");
const greeting = document.querySelector("h1");

function submitForm(event) {
  event.preventDefault();
  loginForm.classList.add("hidden");
  const username = loginInput.value;
  localStorage.setItem("username_key", username);
  greeting.innerText = "Hello " + username;
  greeting.classList.remove("hidden");
}

// loginForm.addEventListener("submit", submitForm);

// 클릭이 발생하지 않을 때도 실행
const localUserName = localStorage.getItem("username_key");

if (localUserName === null) {
  // user의 이름이 존재하지 않으면 form을 보여준다.
  loginForm.addEventListener("submit", submitForm);
} else {
  // 이름이 존재하면 form을 보여주지  않는다.
  loginForm.classList.add("hidden");
  greeting.innerText = "Hello " + localUserName;
  greeting.classList.remove("hidden");
}
```

## 코드를 좀 더 가독성을 높여보자!

1. 반복되는 오타 방지를 위해서 string은 변수로 설정해준다. ("username_key", "hidden")
2. 반복되는 코드는 함수로 묶어준다.
   (loginForm.classList.add, greeting.innerText, gretting.classList.remove("hidden"))

```javascript
// string만 포함된 변수는 대문자로 지정해준다.
const HIDDEN_CLASS = "hidden";
const USERANME_KEY = "username_key";

function submitForm(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem(USERANME_KEY, username);
  greetingPaint(username);
}

function greetingPaint(username) {
  loginForm.classList.add(HIDDEN_CLASS);
  greeting.innerText = "Hello " + username;
  greeting.classList.remove(HIDDEN_CLASS);
}

// 클릭이 발생하지 않을 때도 실행
const localUserName = localStorage.getItem(USERANME_KEY);

if (localUserName === null) {
  // user의 이름이 존재하지 않으면 form을 보여준다.
  loginForm.addEventListener("submit", submitForm);
} else {
  // 이름이 존재하면 form을 보여주지  않는다.
  greetingPaint(localUserName);
}
```
