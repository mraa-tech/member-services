// Endpoint => Members Dues Project, latest version 11
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbwA5NiGEeUPIzuvd9Nf5LoHWEotAitPNvbl9FQJC1oJ7Y-0uvC4IkOz03jcHWQEMvYD/exec" +
    "?q="

// Endpoint => MRAA Member Services Project, latest version 17
const EP_MEMBERS_SERVICES =
    "https://script.google.com/macros/s/AKfycbzqqH3t4gYnZRH4Q_H60ybyVmfATjyZp1a6GrlXFDuLu-f_ZAhaBv9eqHzxuDSm3XfFow/exec" +
    "?q="

var totalMembers = 0
// TODO: Combine the fetches for member counts into one, store in object to retrieve and display
// -- fetchTotalMembers, fetchTotalExhibitingMembers, fetchTotalAssociateMembers, fetchTotalPendingMembers

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

function showCurrentCallsUploads(arr) {
    const ele = document.getElementById("currentexhibitions")
    document.getElementById("loadingcurrentexhibitions").remove()
    const schema = {
        "Name" : 0,
        "Entries" : 1
    }

    if (arr.length<=0) {
        ele.innerHTML = "No open calls"
    } else {
        //build table
        const table = document.createElement("table")

        //create headers
        const headers = Object.keys(schema)
        const thead = document.createElement("thead")
        const hrow = document.createElement("tr")
        headers.forEach(h => {
            let hdr = document.createElement("th")
            hdr.innerText = h
            hrow.append(hdr)
        })
        thead.append(hrow)
        table.append(thead)
        
        //create body
        const tbody = document.createElement("tbody")
        arr.forEach(r => {
            let brow = document.createElement("tr")
            r.shift() //remove the event id
            r.forEach(c => {
                let cell =  document.createElement("td")
                cell.innerText = c
                brow.append(cell)                
            })
            tbody.append(brow)
        })
        table.append(tbody)

        ele.append(table)       
        table.classList.add("table", "table-borderless") 
    }

}

function showArtistsPerShowHistory(arr) {
    const ele = document.getElementById("artistpershowhistory")
    document.getElementById("loadingartistspershow").remove()
    const schema = {
        "Year" : 0,
        "Name" : 1, 
        "Artists" : 2
    }

    if (arr.length<=0) {
        ele.innerHTML = "No history"
    } else {
        //build table
        const table = document.createElement("table")

        //create headers
        const headers = Object.keys(schema)
        const thead = document.createElement("thead")
        const hrow = document.createElement("tr")
        headers.forEach(h => {
            let hdr = document.createElement("th")
            hdr.innerText = h
            hrow.append(hdr)
        })
        thead.append(hrow)
        table.append(thead)

        //create body
        const tbody = document.createElement("tbody")
        arr.forEach(r => {
            let brow = document.createElement("tr")
            r.forEach(c => {
                let cell =  document.createElement("td")
                cell.innerText = c
                brow.append(cell)                
            })
            tbody.append(brow)
        })
        table.append(tbody)
        ele.append(table)  
        table.classList.add("table", "table-striped")      
    }
}

function showEventArtistEntries(arr) {
    const ele = document.getElementById("entriesamountdue")
    document.getElementById("loadingentriesamountdue").remove()
    const schema = {
        "Exhibit" : 0,
        "Artist" : 3,
        "Entries" : 4,
        "Amount Due" : 5
    }

    if (arr.length<=0) {
        ele.innerHTML = "No open calls for entry"
    } else {
        //build table
        const table = document.createElement("table")
        //create headers
        const headers = Object.keys(schema)
        const thead = document.createElement("thead")
        const hrow = document.createElement("tr")
        headers.forEach(h => {
            let hdr = document.createElement("th")
            hdr.innerText = h
            hrow.append(hdr)
        })
        thead.append(hrow)
        table.append(thead)

        //create body
        const tbody = document.createElement("tbody")
        const bvalues = Object.values(schema)

        let feeTotal = 0
        arr.forEach(r => {
            let row = document.createElement("tr")
            bvalues.forEach(c => {
                let col = document.createElement("td")
                col.innerText = r[c]
                row.append(col)
                if (c===schema["Amount Due"]) {
                    feeTotal += parseInt(r[c])
                }
            })
            tbody.append(row)     
        })

        //create footer
        const tfooter = document.createElement("tfoot")
        const footers = ["Total", "", "", "$" + feeTotal]
        const footerRow = tfooter.insertRow()
        footers.forEach(footer => {
            let f = document.createElement("th")
            f.innerText = footer
            footerRow.append(f)
        })
        table.append(tbody)
        table.append(tfooter)
        ele.append(table)  
        table.classList.add("table", "table-primary", "table-striped")      
    }
}

document.addEventListener("DOMContentLoaded", fetchMemberCounts)
document.addEventListener("DOMContentLoaded", showYear)
document.addEventListener("DOMContentLoaded", fetchCurrentCallsUploads)
document.addEventListener("DOMContentLoaded", fetchArtistsPerShowHistory)
document.addEventListener("DOMContentLoaded", fetchEventArtistEntries)