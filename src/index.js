import one from "./button.svg";
import two from "./delete.svg";
import "./index.css";
import { compareAsc, format } from "date-fns";

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let date = document.querySelector("#date");
let priority = document.querySelector("#priority");
let note = document.querySelector("#note");
let check = document.createElement("input");
check.classList.add("check");
check.setAttribute("type", "checkbox");
let arrs = [];

class todo {
  constructor(title, description, date, priority, check, note) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.check = check;
    this.note = note;
  }
}

let fill = function (Ptitle, Pdescription, Pdate, Ppriority, Pcheck, Pnote) {
  let content = document.querySelector(".contents");

  let hold = document.createElement("div");
  hold.classList.add("hold");
  content.appendChild(hold);

  // creating elements
  let titlebar = document.createElement("div");
  hold.appendChild(titlebar);
  title.classList.add("titlebar");

  let _title = document.createElement("h2");
  _title.classList.add("_title");
  titlebar.appendChild(_title);

  let bodybar = document.createElement("div");
  bodybar.classList.add("bodybar");
  hold.appendChild(bodybar);

  let _description = document.createElement("h3");
  _description.classList.add("_description");
  bodybar.appendChild(_description);

  let _date = document.createElement("h5");
  _date.classList.add("_date");
  bodybar.appendChild(_date);

  let firsttab = document.createElement("div");
  firsttab.classList.add("tab");
  bodybar.appendChild(firsttab);

  let _priority = document.createElement("h5");
  _priority.classList.add("_priority");
  firsttab.appendChild(_priority);

  let clickOne = document.createElement("img");
  firsttab.appendChild(clickOne);
  clickOne.src = one;
  clickOne.classList.add("clickone");
  clickOne.setAttribute("width", "20px");

  let secondtab = document.createElement("div");
  secondtab.classList.add("tab");
  bodybar.appendChild(secondtab);

  let _check = document.createElement("h5");
  _check.classList.add("_check");
  secondtab.appendChild(_check);

  let clickTwo = document.createElement("img");
  secondtab.appendChild(clickTwo);
  clickTwo.classList.add("clickTwo");
  clickTwo.src = one;
  clickTwo.setAttribute("width", "20px");

  let _note = document.createElement("p");
  _note.classList.add("_note");
  bodybar.appendChild(_note);

  let deleter = document.createElement("img");
  deleter.classList.add("delete");
  bodybar.appendChild(deleter);
  deleter.src = two;
  deleter.setAttribute("width", "20px");

  let count = document.createElement("div");
  content.appendChild(count);

  if (Pdate == undefined) {
    Pdate == "";
  }

  let set = new todo(Ptitle, Pdescription, Pdate, Ppriority, Pcheck, Pnote);
  arrs.push(set);
  arrs.forEach((item, index) => {
    _title.textContent = item.title;
    _description.textContent = item.description;
    _date.textContent = item.date;
    _priority.textContent = item.priority;
    _check.textContent = item.check;
    _note.textContent = item.note;
    count.setAttribute("data-count", `${index}`);
    bodybar.style = "display:none;";
  });

  clickOne.addEventListener("click", () => {
    if (_priority.textContent == "low") {
      _priority.textContent = "high";
    } else {
      _priority.textContent = "low";
    }
    arrs[count.getAttribute("data-count")].priority = _priority.textContent;
    localStorage.setItem("arrs", JSON.stringify(arrs));
  });
  clickTwo.addEventListener("click", () => {
    if (_check.textContent == "not complete") {
      _check.textContent = "complete";
    } else {
      _check.textContent = "not complete";
    }
    arrs[count.getAttribute("data-count")].check = _check.textContent;
    localStorage.setItem("arrs", JSON.stringify(arrs));
  });

  deleter.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.remove();
    e.target.parentElement.parentElement.style.display = "none";
    let index = count.getAttribute("data-count");
    arrs.splice(index, 1);
    localStorage.setItem("arrs", JSON.stringify(arrs));
  });

  titlebar.addEventListener("click", () => {
    if (bodybar.style.display == "block") {
      bodybar.style.display = "none";
    } else {
      bodybar.style.display = "block";
    }
  });
};

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.style.display = "none";
  fill(
    title.value,
    description.value,
    date.value,
    priority.checked ? "high" : "low",
    check.checked ? "complete" : "not complete",
    note.value
  );
  console.log(JSON.stringify(arrs));
  localStorage.setItem("arrs", JSON.stringify(arrs));
  form.reset();
});
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
} else {
  // Too bad, no localStorage for us
}
window.addEventListener("load", () => {
  let store = JSON.parse(localStorage.getItem("arrs"));

  for (let i = 0; i < store.length; i++) {
    fill(
      store[i].title,
      store[i].description,
      store[i].date,
      store[i].priority,
      store[i].check,
      store[i].note
    );
  }
});
