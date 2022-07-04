// Endpoint => Members Dues Project, version 8
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbw9FU5odEsod-PY2T_jsJMqDzbMIJEPWrWC-a1jyPCDcmUy6Sw4BEMAGV8akY5Jq-Rw/exec/exec" +
    "q="

function fetchTotalMembers() {
    const url = EP_MEMBERS_DUES + "totalmembers"
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            t = resp
            showTotalMembers(t)
        })
        .catch()
}

function showTotalMembers(t) {
    let ele = document.getElementById('memberCount')
    ele.append(t)
}

document.addEventListener("DOMContentLoaded", fetchTotalMembers)