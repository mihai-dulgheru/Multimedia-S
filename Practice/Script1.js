// JavaScript source code
document.getElementById('data').valueAsDate = new Date();

function loading(delay) {
    let div = document.createElement('div');
    div.className = "circle";
    document.body.appendChild(div);
    return new Promise((resolve, reject) => {
        let circle = document.querySelector('div[class="circle"]');
        setTimeout(() => {
            circle.remove();
            resolve(delay);
        }, delay);
    });
};

const fileUrl = 'persoane.txt';
let text;

loading(3000).then(() => {
    fetch(fileUrl)
        .then(response => response.text())
        .then(data => {
            text = data;
            let lines = data.split('\n');
            let tBody = document.getElementById('tableBody');
            for (let i = 0; i < lines.length - 1; i++) {
                let input = lines[i].split(',');
                let row = document.createElement('tr');
                for (const element of input) {
                    let cell = document.createElement('td');
                    cell.innerHTML = element;
                    row.appendChild(cell);
                }
                tBody.appendChild(row);
            }
            document.getElementsByTagName("tfoot")[0].childNodes[1].childNodes[1].innerHTML =
                "Număr persoane: <strong>" + tBody.children.length.toString() + "</strong>";
        });
}).catch((error) => {
    console.warn(error);
});

function adaugaPersoana() {
    const tRow = document.createElement("tr");

    const cNume = document.createElement("td");
    if (document.getElementById("nume").value) {
        cNume.innerHTML = document.getElementById("nume").value;
    }

    const cPrenume = document.createElement("td");
    if (document.getElementById("prenume").value) {
        cPrenume.innerHTML = document.getElementById("prenume").value;
    }

    const cTelefon = document.createElement("td");
    if (document.getElementById("telefon").value) {
        cTelefon.innerHTML = document.getElementById("telefon").value;
    }

    const cEmail = document.createElement('td');
    if (document.getElementById('email').value) {
        cEmail.innerHTML = document.getElementById('email').value;
    }

    const cData = document.createElement('td');
    if (document.getElementById('data').value) {
        cData.innerHTML = document.getElementById('data').value;
    }

    const cAn = document.createElement('td');
    if (document.getElementById('an_studii').value) {
        cAn.innerHTML = document.getElementById('an_studii').value;
    }

    const cForma = document.createElement('td');
    if (document.querySelector('input[name="forma_finantare"]:checked').value) {
        cForma.innerHTML = document.querySelector('input[name="forma_finantare"]:checked').value;;
    }

    tRow.appendChild(cNume);
    tRow.appendChild(cPrenume);
    tRow.appendChild(cTelefon);
    tRow.appendChild(cEmail);
    tRow.appendChild(cData);
    tRow.appendChild(cAn);
    tRow.appendChild(cForma);

    const tBody = document.getElementById("tableBody");
    tBody.appendChild(tRow);

    document.getElementsByTagName("tfoot")[0].childNodes[1].childNodes[1].innerHTML =
        "Număr persoane: <strong>" + tBody.children.length.toString() + "</strong>";
}

function golireFormular() {
    document.getElementById('nume').value = '';
    document.getElementById('prenume').value = '';
    document.getElementById('telefon').value = '';
    document.getElementById('email').value = '';
    document.getElementById('data').valueAsDate = new Date();
    document.getElementById('selected').selected = "selected";
    document.querySelector('input[type=radio]:checked').checked = false;
}

function reprPerson() {
    const del = ',';
    const persoana = document.getElementById("nume").value + del
        + document.getElementById("prenume").value + del
        + document.getElementById("telefon").value + del
        + document.getElementById("email").value + del
        + document.getElementById("data").value + del
        + document.getElementById("an_studii").value + del
        + document.querySelector('input[name="forma_finantare"]:checked').value + "\n";
    return persoana;
}

function onClickAdauga() {
    if (document.getElementById("nume").value
        && document.getElementById("prenume").value
        && document.getElementById("telefon").value
        && document.getElementById('email').value
        && document.querySelector('input[name="forma_finantare"]:checked').value) {
        loading(1000).then(() => {
            adaugaPersoana();
            download(fileUrl, text + reprPerson());
            golireFormular();
        }).catch((error) => {
            console.warn(error);
        });
    }
}

document.querySelector('input[type="button"]').addEventListener('click', onClickAdauga);

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}