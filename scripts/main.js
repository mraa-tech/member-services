// Endpoint => Members Dues Project, latest version 11
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbwA5NiGEeUPIzuvd9Nf5LoHWEotAitPNvbl9FQJC1oJ7Y-0uvC4IkOz03jcHWQEMvYD/exec" +
    "?q="

// Endpoint => MRAA Member Services Project, latest version 6
const EP_MEMBERS_SERVICES =
    "https://script.google.com/macros/s/AKfycbxs6TnMuk8JvjF0shqi6PnZXWt-X7XnWXs402za0LDiUh9_8nCWW050N_rG7RG-5fJq/exec" +
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

function fetchCurrentExhibitions() {
    const yr = new Date().getFullYear()
    const url = EP_MEMBERS_SERVICES + "currentexhibitions"
    fetch(url) 
    .then(resp => resp.json())
    .then(resp => {
        t = resp
        showCurrentExhibitions(t)
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

function showYear() {
    const yr = new Date().getFullYear()
    const ele = document.getElementById("yr")
    ele.innerText = yr
}

function showCurrentExhibitions(arr) {
    const ele = document.getElementById("currentexhibitions")
    document.getElementById("loadingcurrentexhibitions").remove()

    if (arr.length<=0) {
        ele.innerHTML = "No open calls"
    } else {
        //build table
        let table = document.createElement("table")
        let row = document.createElement("tr")
        let hdr = document.createElement("th")
        let col = document.createElement("td")

        hdr.innerText = "Name"
        row.append(hdr)
        table.insertRow(0).append(hdr)    
        
        for (let i=0; i<arr.length; i++) {
            col.innerText = arr[i]
            row.append(col)
            table.insertRow(-1).append(col)        
        }
        ele.appendChild(table)        
    }


    return
}

document.addEventListener("DOMContentLoaded", fetchMemberCounts)
document.addEventListener("DOMContentLoaded", showYear)
document.addEventListener("DOMContentLoaded", fetchCurrentExhibitions)