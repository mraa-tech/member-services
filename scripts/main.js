// Endpoint => Members Dues Project, latest version 11
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbwA5NiGEeUPIzuvd9Nf5LoHWEotAitPNvbl9FQJC1oJ7Y-0uvC4IkOz03jcHWQEMvYD/exec" +
    "?q="

// Endpoint => MRAA Member Services Project, latest version 5
const EP_MEMBERS_SERVICES =
    "https://script.google.com/macros/s/AKfycbxVjJOeeyfNw19oJE773pPn3NWG3UTgHsrDGq-nCZTgihy2RED5Mfyxrv47EiVr08_znA/exec" +
    "?q="

var totalMembers = 0

function fetchTotalMembers() {
    const url = EP_MEMBERS_SERVICES + "totalmembers"
    fetch(url,
        {
            cache: "default"
        })
        .then(resp => resp.json())
        .then(resp => {
            t = resp
            totalMembers = t
            showTotalMembers(t)
        })
        .catch()
}

function fetchTotalExhibitingMembers() {
    const url = EP_MEMBERS_SERVICES + "totalexhibitingmembers"
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            t = resp
            showTotalExhibitingMembers(t)
        })
        .catch()
}

function fetchTotalAssociateMembers() {
    const url = EP_MEMBERS_SERVICES + "totalassociatemembers"
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            t = resp
            showTotalAssociateMembers(t)
        })
        .catch()
}

function fetchTotalPendingMembers() {
    const url = EP_MEMBERS_SERVICES + "totalpendingmembers"
    fetch(url)
    .then(resp => resp.json())
    .then(resp => {
        t = resp
        showTotalPendingMembers(t)
    })
    .catch()
}

function fetchTotalDuesPaid() {
    const url = EP_MEMBERS_SERVICES + "totalduespaid"
    fetch(url)
    .then(resp => resp.json())
    .then(resp => {
        t = resp
        showTotalDuesPaid(t)
    })
    .catch()
}

function fetchMemberCounts() {
    fetchTotalMembers()
    fetchTotalExhibitingMembers()
    fetchTotalPendingMembers()
    fetchTotalAssociateMembers()
    fetchTotalDuesPaid()
}

function showTotalMembers(t) {
    let loading = document.getElementById('memberCountLoading')
    let ele = document.getElementById('memberCount')
    loading.remove()
    ele.append(t)
}

function showTotalExhibitingMembers(t) {
    let loading = document.getElementById('exhibitingCountLoading')
    let ele = document.getElementById('exhibitingMemberCount')
    loading.remove()
    ele.append(t)
}

function showTotalPendingMembers(t) {
    let ele = document.getElementById('pendingCount')
    ele.innerText = t
}

function showTotalAssociateMembers(t) {
    let ele = document.getElementById('associateCount')
    ele.innerText = t
}

function showTotalDuesPaid(t) {
    let ele = document.getElementById('duesPaid')
    if (t < totalMembers) {
        ele.parentElement.classList.add("warning")
    } 
    ele.innerText = t
}

document.addEventListener("DOMContentLoaded", fetchMemberCounts)