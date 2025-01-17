const EP_MEMBER_CONTACT =
   "https://script.google.com/macros/s/AKfycbzpdfWIf8ITDLupFLBF_V2K43EHsJfiwD252aSHBFfNvbtzGQ0gdfBP2RDZd-1lK0hbAg/exec"
const EP_MEMBER_CONTACT_TEST =
   "https://script.google.com/macros/s/AKfycbzpdfWIf8ITDLupFLBF_V2K43EHsJfiwD252aSHBFfNvbtzGQ0gdfBP2RDZd-1lK0hbAg/exec?path=validateaccess&email=jamesgreen.311@gmail.com&token=CA595D59"

function validateAccessPost() {
   const formData = new FormData()
   formData.append("email", "jamesgreen.311@gmail.com")
   formData.append("token", "CA595D59")

   const options = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
      },
   }

   fetch(EP_MEMBER_CONTACT, options)
      .then((d) => d.json())
      .then((d) => {
         showResult(d)
      })
}

function validateAccessGet(e) {
   e.preventDefault()
   const email = document.getElementById("board-member-email").value
   const token = document.getElementById("board-member-token").value
   const url =
      EP_MEMBER_CONTACT + `?path=validateaccess&email=${email}&token=${token}`
   if (email !== "") {
      document
         .getElementById("fetching-board-member")
         .classList.remove("d-none")
      fetch(url)
         .then((d) => d.json())
         .then((d) => {
            showResult(d)
         })
   }
}

function getEmailList() {
   // EndPoint source -> MRAA Critique List version 8, TODO move to MRAA Member Services
   const url = ""
   let msg = document.getElementById("msg")
   msg.innerHTML = "Fetching, Please wait ..."

   fetch(url)
      .then((d) => d.json())
      .then((d) => {
         showList(d)
      })
}

function showResult(d) {
   document.getElementById("fetching-board-member").classList.add("d-none")
   //document.getElementById("login").classList.add("d-none")
   const msg = document.getElementById("result-msg")
   const status = document.getElementById("status-msg")
   if (d.params.boardmember === "true") {
      status.innerHTML = `${d.params.email} is a board member`
   } else {
      status.innerHTML = `${d.params.email} is not a board member`
   }
   if (d.params.hasvalidtoken === "true") {
      status.innerHTML += `, has a valid token`
   } else {
      status.innerHTML += `, does not have a valid token`
   }
   if (d.status === "SUCCESS") {
      msg.innerHTML += `, ${d.vals}`
   } else {
      status.innerHTML += `, ${d.msg}`
   }
}

function showList(arr) {
   const activeMemberStatus = ["active", "pending"]
   const table = document.getElementById("emailTable")
   const btnCopy = document.getElementById("btnCopy")
   const btnGetEmails = document.getElementById("btnGetEmails")
   let msg = document.getElementById("msg")

   let count = 0
   arr.forEach((el) => {
      // validate good data
      if (activeMemberStatus.includes(el.status)) {
         let row = table.insertRow(-1)
         row.insertCell(0).innerHTML = el.status
         row.insertCell(0).innerHTML = el.email
         row.insertCell(0).innerHTML = el.firstname
         row.insertCell(0).innerHTML = el.lastname
         count += 1
      }
   })

   // let row = table.insertRow(-1);
   // row.insertCell(0).innerHTML = `Total: ${count}`;
   // row.insertCell(0).innerHTML = "";
   // row.insertCell(0).innerHTML = "";
   // row.insertCell(0).innerHTML = "";
   msg.innerHTML = ""
   btnCopy.disabled = false
   btnGetEmails.disabled = true
}

// A test run for adding a new row
function addRow() {
   // endpoint source -> MRAA Critique List version 7
   const url =
      "https://script.google.com/macros/s/AKfycbw7LsL3ASCbX82jmKa0K1_P66Lz8mBTqh5LLJbpxktF4GR4shm8qBLYig/exec"
   fetch(url, {
      method: "POST",
      cache: "no-cache",
      mode: "no-cors",
      headers: {
         ContentType: "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
         name: "Jon",
      }), //test
   })
}

function copyToClipboard() {
   const rows = document.getElementById("emailTable").tBodies[0].rows
   const textarea = document.createElement("textarea")
   let msg = document.getElementById("msg")

   textarea.setAttribute("readonly", "")
   textarea.style.position = "absolute"
   textarea.style.left = "-9999px"
   // start loop at 1 to skip header row
   for (i = 1; i < rows.length; i++) {
      textarea.value += `${rows[i].cells[2].textContent},`
   }
   document.body.appendChild(textarea)

   msg.innerHTML = "List Copied"
   textarea.select()
   document.execCommand("copy")
}

// From bootstrap.com
;(() => {
   "use strict"

   // Fetch all the forms we want to apply custom Bootstrap validation styles to
   const forms = document.querySelectorAll(".needs-validation")

   // Loop over them and prevent submission
   Array.from(forms).forEach((form) => {
      form.addEventListener(
         "submit",
         (event) => {
            if (!form.checkValidity()) {
               event.preventDefault()
               event.stopPropagation()
            }

            form.classList.add("was-validated")
         },
         false
      )
   })
})()

document.addEventListener("DOMContentLoaded", showYear)
document
   .getElementById("login-button")
   .addEventListener("click", validateAccessGet)
//document.getElementById("btnGetEmails").addEventListener("click", getEmailList);
//document.getElementById("btnCopy").addEventListener("click", copyToClipboard);
