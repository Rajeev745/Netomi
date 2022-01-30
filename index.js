const result = window.parent.document.querySelector(".outsideObj");

function validateForm() {
  err = {};
  var name = document.myForm.fname.value;
  if (name.length < 4 || name.length > 10) {
    err.names = "Length should be between 4-10 characters";
  }
  var contact = document.myForm.fcontact.value;
  if (contact.length != 10) {
    err.contact = "mobile number should be of 10 digits";
  }
  var email = document.myForm.femail.value;
  if (email.length < 6 || !email.includes("@") || !email.includes(".com")) {
    err.email = "email should be valid";
  }
  var dob = document.myForm.txtDOB.value;
  if (dob == null || dob == "") {
    err.DOB = "Invalid date of birth";
  }
  var con = document.myForm.countstate.value;
  if (con == "") {
    err.Country = "select Country";
  }

  if (JSON.stringify(err) === "{}") {
    result.innerHTML = ``;
    err.result = "All fields are valid";
    result.innerHTML = `<div>${err.result}</div>`;
  } else {
    result.innerHTML = ``;
    result.innerHTML = `<div>${JSON.stringify(err)}</div>`;
  }

  return false;
}

let fetchRes = fetch(
  "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
);

var select = document.getElementById("con");
var stateSelect = document.getElementById("sta");
let arr = [];
fetchRes
  .then((res) => res.json())
  .then((d) => {
    d.forEach((e) => {
      select.innerHTML += `<option class="ops" value="${e.name}" >${e.name}</option>`;
      if (e.name === select.value) {
        let state = e.states;
        state.map((item) => {
          stateSelect.innerHTML += `<option val="${item.code}">${item.name}</option>`;
        });
      }
    });
  });

async function addstate() {
  let response = await fetch(
    "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
  );
  let data = await response.json();

  var options = stateSelect.getElementsByTagName("OPTION");
  for (var i = 0; i < options.length; i++) {
    stateSelect.removeChild(options[i]);
    i--;
  }

  data.forEach((e) => {
    if (e.name === select.value) {
      let state = e.states;
      state.forEach((item) => {
        stateSelect.innerHTML += `<option val="${item.code}">${item.name}</option>`;
      });
    }
  });
}
