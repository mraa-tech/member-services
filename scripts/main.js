// Endpoint => Members Dues Project, version 10
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbzGVVEYcXe_nlTESK9YWwsYr4jtSXowoIpJe-9t5fxFOAIgjdJ9FWjXXnXvItTIASlW/exec" +
    "?q="

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

function fetchTotalExhibitingMembers() {
    const url = EP_MEMBERS_DUES + "totalexhibitingmembers"
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            t = resp
            showTotalExhibitingMembers(t)
        })
        .catch()
}

function showTotalMembers(t) {
    let ele = document.getElementById('memberCount')
    ele.append(t)
}

function showTotalMembers(t) {
    let ele = document.getElementById('exhibitingMemberCount')
    ele.append(t)
}

document.addEventListener("DOMContentLoaded", fetchTotalMembers)