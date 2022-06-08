const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginBtn = document.querySelector("#login-form button");
const greeting = document.querySelector("h1");

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

// loginForm.addEventListener("submit", submitForm);

// 클릭이 발생하지 않을 때도 실행
const localUserName = localStorage.getItem(USERANME_KEY);

if (localUserName === null) {
  // user의 이름이 존재하지 않으면 form을 보여준다.
  loginForm.addEventListener("submit", submitForm);
} else {
  // 이름이 존재하면 form을 보여주지  않는다.
  greetingPaint(localUserName);
}
