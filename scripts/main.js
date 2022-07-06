// Endpoint => Members Dues Project, version 11
const EP_MEMBERS_DUES = 
    "https://script.google.com/macros/s/AKfycbwA5NiGEeUPIzuvd9Nf5LoHWEotAitPNvbl9FQJC1oJ7Y-0uvC4IkOz03jcHWQEMvYD/exec" +
    "?q="

const EP_MEMBERS_SERVICES =
    "https://script.google.com/macros/s/AKfycbx2YE8zavh1b55gS85fdFevcLrFsUmBE7trGxmfBa5jfTTAQfqEsHzKwqhtCOYHMN7qxQ/exec" +
    "?q="

function fetchTotalMembers() {
    const url = EP_MEMBERS_DUES + "totalmembers"
    fetch(url,
        {
            cache: "default"
        })
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

document.addEventListener("DOMContentLoaded", fetchMemberCounts)