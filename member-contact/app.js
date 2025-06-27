// mraa-member-contact-list-api
const EP_MEMBER_CONTACT =
   "https://script.google.com/macros/s/AKfycbzpdfWIf8ITDLupFLBF_V2K43EHsJfiwD252aSHBFfNvbtzGQ0gdfBP2RDZd-1lK0hbAg/exec"

function validateAccessPost() {
   const formData = new FormData()
   formData.append("email", "jamesgreen.311@gmail.com")
   formData.append("token", "CA595D59") // testing token, will be diabled after testing

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

function showResult(d) {
   document.getElementById("fetching-board-member").classList.add("d-none")
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
      showList(d.vals)
   } else {
      status.innerHTML += `, ${d.msg}`
   }
}

function showList(arr) {
   document.getElementById("form-login").classList.add("d-none")
   const table = document.getElementById("emailTable")
   const emailList = document.getElementById("emailList")
   const btnCopy = document.getElementById("btnCopy")
   let msg = document.getElementById("msg")

   let count = 0
   arr.forEach((el) => {
      let row = table.insertRow(-1)
      row.insertCell(0).innerHTML = el[2]
      row.insertCell(0).innerHTML = el[1]
      row.insertCell(0).innerHTML = el[0]
      //row.insertCell(0).innerHTML = el.lastname
      count += 1
   })

   msg.innerHTML = ""
   btnCopy.disabled = false
   emailList.classList.remove("d-none")
}

function copyToClipboard() {
   const rows = document.getElementById("emailTable").tBodies[0].rows
   const textarea = document.createElement("textarea")
   let msg = document.getElementById("msg")

   textarea.setAttribute("readonly", "")
   textarea.style.position = "absolute"
   textarea.style.left = "-9999px"
   // start loop at 2 to skip header row
   for (i = 2; i < rows.length; i++) {
      textarea.value += `${rows[i].cells[2].textContent},`
   }
   document.body.appendChild(textarea)

   msg.innerHTML = "List Copied"
   textarea.select()
   document.execCommand("copy")
}

// From bootstrap.com
// Example starter JavaScript for disabling form submissions if there are invalid fields
;(function () {
   "use strict"

   // Fetch all the forms we want to apply custom Bootstrap validation styles to
   var forms = document.querySelectorAll(".needs-validation")

   // Loop over them and prevent submission
   Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
         "submit",
         function (event) {
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
   .getElementById("form-login")
   .addEventListener("submit", validateAccessGet)
document.getElementById("btnCopy").addEventListener("click", copyToClipboard)
