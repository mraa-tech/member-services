function getEmailList() {
    //const url = "https://script.google.com/macros/s/AKfycbw7LsL3ASCbX82jmKa0K1_P66Lz8mBTqh5LLJbpxktF4GR4shm8qBLYig/exec";
    const url = "https://script.google.com/macros/s/AKfycbyMVgIXgdkM51WXD8aFEXJeZuUwYpxjFf6DV2xN_DQvc6eiiQ289q1fGRCfz84dj8WcqA/exec"
    let msg = document.getElementById('msg');
    msg.innerHTML = "Fetching, Please wait ...";

    fetch(url)
        .then(d => d.json())
        .then(d => {
            showList(d[0].data);
        });
}

function showList(arr) {
    const table = document.getElementById('emailTable');
    const btnCopy = document.getElementById('btnCopy');
    const btnGetEmails = document.getElementById('btnGetEmails');
    let msg = document.getElementById('msg');

    arr.forEach(el => {
        // validate good data
        if (el.status) {
            let row = table.insertRow(-1);
            row.insertCell(0).innerHTML = el.status;
            row.insertCell(0).innerHTML = el.email;
            row.insertCell(0).innerHTML = el.firstname;
            row.insertCell(0).innerHTML = el.lastname;
        }

    });

    msg.innerHTML = "";
    btnCopy.disabled = false;
    btnGetEmails.disabled = true;

}

function addRow() {
    const url = "https://script.google.com/macros/s/AKfycbw7LsL3ASCbX82jmKa0K1_P66Lz8mBTqh5LLJbpxktF4GR4shm8qBLYig/exec";
    fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        mode: 'no-cors',
        headers: {
            'ContentType': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            name: "Jon"
        }) //test
    });
}

function copyToClipboard() {
    const rows = document.getElementById("emailTable").tBodies[0].rows;
    const textarea = document.createElement('textarea');
    let msg = document.getElementById('msg');

    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    // start loop at 1 to skip header row
    for (i = 1; i < rows.length; i++) {
        textarea.value += `${rows[i].cells[2].textContent},`;
    }
    document.body.appendChild(textarea);

    msg.innerHTML = "List Copied";
    textarea.select();
    document.execCommand('copy');
}

document.getElementById("btnGetEmails").addEventListener("click", getEmailList);
document.getElementById("btnCopy").addEventListener("click", copyToClipboard);