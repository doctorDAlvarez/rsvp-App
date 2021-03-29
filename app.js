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
    const li = document.createElement("li");
    li.textContent = text;

    const label = document.createElement('label');
    label.textContent = "Confirmed";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);

    const edit_b = document.createElement('button');
    edit_b.textContent = 'edit';
    li.appendChild(edit_b);

    const rem_b = document.createElement('button');
    rem_b.textContent = 'remove';
    li.appendChild(rem_b);

    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    const LI = createLI(text)
    ul.appendChild(LI);
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
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const label = button.previousElementSibling;
    if (button.textContent === "remove") {
        ul.removeChild(li);
    } else if (button.textContent === "edit") {
        button.textContent = "save edited value";
        label.firstElementChild.type = "text";
        label.firstElementChild.value = li.firstChild.textContent;
        li.firstChild.textContent = "";
        label.firstChild.textContent = "";


    } else if (button.textContent === "save edited value") {
          button.textContent = "edit";
          label.firstElementChild.type = "checkbox";
          li.className = "unresponded";
          label.firstChild.textContent = "Confirmed";
          li.firstChild.textContent = label.firstElementChild.value;

    }

  });


});
