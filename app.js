function getEmailList() {
    const url = "https://script.google.com/macros/s/AKfycbw7LsL3ASCbX82jmKa0K1_P66Lz8mBTqh5LLJbpxktF4GR4shm8qBLYig/exec";
    fetch(url)
        .then(d => d.json())
        .then(d => {
            showList(d[0].data);
        });    
}

function showList(arr) {
    const table = document.getElementById("emailTable");
    arr.forEach(el => {
        table.insertRow(-1).insertCell(0).innerHTML = el.email;
    });
}

function addRow() {
    const url = "https://script.google.com/macros/s/AKfycbw7LsL3ASCbX82jmKa0K1_P66Lz8mBTqh5LLJbpxktF4GR4shm8qBLYig/exec";
    fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        mode: 'no-cors',
        headers: {
            'ContentType': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({name:"Jon"})
    }); 
}

function copyToClipboard() {
    const listTable = document.getElementById("emailTable").tBodies[0].rows[0].cells[0].innerText;
    const rows = document.getElementById("emailTable").tBodies[0].rows;
    const textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    for (i=0; i<rows.length; i++) {
        textarea.value += `${rows[i].textContent},`;
    }
    document.body.appendChild(textarea);
    
    textarea.select();
    document.execCommand('copy');
}

document.getElementById("btn").addEventListener("click", getEmailList);
document.getElementById("copyBtn").addEventListener("click", copyToClipboard);