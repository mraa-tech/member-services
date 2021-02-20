function getEmailList() {
    const url = "https://script.google.com/macros/s/AKfycbw7LsL3ASCbX82jmKa0K1_P66Lz8mBTqh5LLJbpxktF4GR4shm8qBLYig/exec";
    let msg = document.getElementById('msg');
    msg.innerHTML = "Please wait ...";

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
        table.insertRow(-1).insertCell(0).innerHTML = el.email;
    });

    msg.innerHTML = "";  
    btnCopy.disabled = false;
    btnGetEmails.disabled = true;

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
    const rows = document.getElementById("emailTable").tBodies[0].rows;
    const textarea = document.createElement('textarea');
    let msg = document.getElementById('msg');

    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    for (i=0; i<rows.length; i++) {
        textarea.value += `${rows[i].textContent},`;
    }
    document.body.appendChild(textarea);
    
    msg.innerHTML = "List Copied";
    textarea.select();
    document.execCommand('copy');
}

document.getElementById("btnGetEmails").addEventListener("click", getEmailList);
document.getElementById("btnCopy").addEventListener("click", copyToClipboard);