//RSVP_APP

document.addEventListener("DOMContentLoaded", () => {


  const form = document.getElementById("registrar");
  const input = form.querySelector('input');
  const mainDiv = document.querySelector(".main");
  const ul = document.getElementById("invitedList");
  const div = document.createElement("div");
  const filter_label = document.createElement("label");
  const filterBox = document.createElement("input");

  filter_label.textContent = "Hide those NOT confirmed";
  filterBox.type = "checkbox";
  div.appendChild(filter_label);
  div.appendChild(filterBox);
  mainDiv.insertBefore(div, ul);

  filterBox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if( isChecked ) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === "responded") {
          li.style.display = "";
        } else {
          li.style.display = "none";
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = "";
      }
    }
    });



  function createLI(text) {
    function createElement(elementName, prop, value){
      const element = document.createElement(elementName);
      element[prop] = value;
      return element;
    }
    function appendToLI(elementName, prop, value) {
      const element = createElement(elementName, prop, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement("li");
    appendToLI("span", "textContent", text)
    appendToLI('label', "textContent", "Confirmed")
      .appendChild(createElement('input', "type", "checkbox"));
    appendToLI('button', "textContent", "edit");
    appendToLI('button', "textContent", "remove");
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    const members = ul.querySelectorAll("span");
    const areDup = members => {
      for (let i = 0; i < members.length; i++){
        if (members[i].textContent === text) {
          return true;
          break
        }
      }
    }
    if (text !== "" && !areDup(members)) {
      input.value = "";
      const li = createLI(text)
      ul.appendChild(li);
    } else if (areDup(members)){
      alert("Name already added")
    } else {
      alert("invalid name")
    }
  });

  ul.addEventListener("change", (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
      listItem.className = "responded";
    } else {
      listItem.className = 'unresponded';
    }
    });

  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const label = button.previousElementSibling;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement("input");
          input.type = "text";
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = "save";
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement("span");
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = "edit";
        }
      };
        nameActions[action]();
      }
    });
});
