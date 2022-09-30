// Endpoint => Members Dues Project, latest version 11
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbwA5NiGEeUPIzuvd9Nf5LoHWEotAitPNvbl9FQJC1oJ7Y-0uvC4IkOz03jcHWQEMvYD/exec" +
    "?q="

// Endpoint => MRAA Member Services Project, latest version 15
const EP_MEMBERS_SERVICES =
    "https://script.google.com/macros/s/AKfycbzqqH3t4gYnZRH4Q_H60ybyVmfATjyZp1a6GrlXFDuLu-f_ZAhaBv9eqHzxuDSm3XfFow/exec" +
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
        showCurrentExhibitions(resp)
    })
    .catch()
}

function fetchCurrentCallsUploads() {
    const url = EP_MEMBERS_SERVICES + "currentcallsuploads"
    fetch(url) 
    .then(resp => resp.json()
    .then(resp => {
        showCurrentCallsUploads(resp)
    }))
}

function fetchArtistsPerShowHistory() {
    const url = EP_MEMBERS_SERVICES + "artistspershowhistory"
    fetch(url) 
    .then(resp => resp.json()
    .then(resp => {
        showArtistsPerShowHistory(resp)
    }))
}

function fetchEventArtistEntries() {
    const url = EP_MEMBERS_SERVICES + "eventartistentries"
    fetch(url)
    .then(resp => resp.json()
    .then(resp => {
        showEventArtistEntries(resp)
    }))
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

function showCurrentCallsUploads(arr) {
    const ele = document.getElementById("currentexhibitions")
    document.getElementById("loadingcurrentexhibitions").remove()

    if (arr.length<=0) {
        ele.innerHTML = "No open calls"
    } else {
        //build table
        const table = document.createElement("table")
        const row = document.createElement("tr")
        const hdr1 = document.createElement("th")
        const hdr2 = document.createElement("th")

        hdr1.innerText = "Name"
        hdr2.innerText = "Entries"
        row.append(hdr1, hdr2)
        table.append(row)
        
        for (let i=0; i<arr.length; i++) {
            let row = document.createElement("tr")
            let col1 = document.createElement("td")
            let col2 = document.createElement("td")
            col1.innerText = arr[i][1]
            col2.innerText = arr[i][2]
            row.append(col1, col2)
            table.append(row) 
        }
        ele.append(table)       
        table.classList.add("table", "table-borderless") 
    }

}

function showArtistsPerShowHistory(arr) {
    const ele = document.getElementById("artistpershowhistory")
    document.getElementById("loadingartistspershow").remove()

    if (arr.length<=0) {
        ele.innerHTML = "No history"
    } else {
        //build table
        const table = document.createElement("table")
        const thead = document.createElement("thead")
        const tbody = document.createElement("tbody")

        const row = document.createElement("tr")
        const hdr1 = document.createElement("th")
        const hdr2 = document.createElement("th")
        const hdr3 = document.createElement("th")

        hdr1.innerText = "Year"
        hdr2.innerText = "Name"
        hdr3.innerText = "Artists"
        row.append(hdr1, hdr2, hdr3)
        thead.append(row)
        table.append(thead)

        for (let i=0; i<arr.length; i++) {
            let row = document.createElement("tr")
            let col1 = document.createElement("td")
            let col2 = document.createElement("td")
            let col3 = document.createElement("td")
            col1.innerText = arr[i][0]
            col2.innerText = arr[i][1]
            col3.innerText = arr[i][2]
            row.append(col1, col2, col3)
            tbody.append(row) 
        }
        table.append(tbody)
        ele.append(table)  
        table.classList.add("table", "table-striped")      
    }
}

function showEventArtistEntries(arr) {
    const ele = document.getElementById("entriesamountdue")
    document.getElementById("loadingentriesamountdue").remove()

    if (arr.length<=0) {
        ele.innerHTML = "No open calls for entry"
    } else {
        //build table
        const table = document.createElement("table")
        const thead = document.createElement("thead")
        const tbody = document.createElement("tbody")

        const row = document.createElement("tr")
        const hdr1 = document.createElement("th")
        const hdr2 = document.createElement("th")
        const hdr3 = document.createElement("th")
        const hdr4 = document.createElement("th")

        hdr1.innerText = "Exhibit"
        hdr2.innerText = "Artist"
        hdr3.innerText = "Entries"
        hdr4.innerText = "Amount Due"
        row.append(hdr1, hdr2, hdr3, hdr4)
        thead.append(row)
        table.append(thead)

        for (let i=0; i<arr.length; i++) {
            let row = document.createElement("tr")
            let col1 = document.createElement("td")
            let col2 = document.createElement("td")
            let col3 = document.createElement("td")
            let col4 = document.createElement("td")
            col1.innerText = arr[i][0]
            col2.innerText = arr[i][3]
            col3.innerText = arr[i][4]
            col4.innerText = "$" + arr[i][5]
            row.append(col1, col2, col3, col4)
            tbody.append(row) 
        }
        table.append(tbody)
        ele.append(table)  
        table.classList.add("table", "table-success", "table-striped")      
    }
}

document.addEventListener("DOMContentLoaded", fetchMemberCounts)
document.addEventListener("DOMContentLoaded", showYear)
//document.addEventListener("DOMContentLoaded", fetchCurrentExhibitions)
document.addEventListener("DOMContentLoaded", fetchCurrentCallsUploads)
document.addEventListener("DOMContentLoaded", fetchArtistsPerShowHistory)
document.addEventListener("DOMContentLoaded", fetchEventArtistEntries)