// Endpoint => Members Dues Project, version 11
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbwA5NiGEeUPIzuvd9Nf5LoHWEotAitPNvbl9FQJC1oJ7Y-0uvC4IkOz03jcHWQEMvYD/exec" +
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

function fetchMemberCounts() {
    fetchTotalMembers()
    fetchTotalExhibitingMembers()
}

function showTotalMembers(t) {
    let ele = document.getElementById('memberCount')
    ele.append(t)
}

function showTotalExhibitingMembers(t) {
    let ele = document.getElementById('exhibitingMemberCount')
    ele.append(t)
}

document.addEventListener("DOMContentLoaded", fetchMemberCounts)