let tab = document.getElementById("tab");
let Atab = document.getElementById("actionT");

class entry{
    constructor(fecha,rep,eq,desc,dest,gas,tot){
        this.fecha = fecha;
        this.rep = rep;
        this.eq = eq;
        this.desc = desc;
        this.dest = dest;
        this.gas = gas;
        this.tot = tot;
    }
}

let entries = [];

let drawTab = ()=>{
    tab.innerHTML = `<tr><th>Fecha</th><th>No. de reporte</th><th>Equipo</th><th>Descripcion</th><th>Destino</th><th>Gasto</th><th>Total</th></tr>`;
    actionT.innerHTML = `<tr><th>Accion</th></tr>`;
    for (let i = 0; i < entries.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>"+entries[i].fecha+"</td>"+"<td>"+entries[i].rep+"</td>"+"<td>"+entries[i].eq+"</td>"+"<td>"+entries[i].desc+"</td>"+"<td>"+entries[i].dest+"</td>"+"<td>"+entries[i].gas+"</td>"+"<td><b>"+entries[i].tot+"</b></td>";
        tab.appendChild(tr);
        
        let trA = document.createElement("tr");
        let td = document.createElement("td");

        let btnDel = document.createElement("button");
        btnDel.innerText = "Borrar"
        btnDel.addEventListener("click",()=>remove(i));

        let btnUp = document.createElement("button");
        btnUp.innerText = "▲"
        btnUp.addEventListener("click",()=>mvUp(i));

        let btnDown = document.createElement("button");
        btnDown.innerText = "▼"
        btnDown.addEventListener("click",()=>mvDown(i));

        td.appendChild(btnDel);
        td.appendChild(btnUp);
        td.appendChild(btnDown);

        trA.appendChild(td);
        Atab.appendChild(trA);
    }
}

let init = ()=>{
    const datos = localStorage.getItem("entries");
    if (datos) {
        entries = JSON.parse(datos);
    }
    drawTab();
}

let add = ()=>{
    let en_date = new Date(document.getElementById("fecha").value + "T00:00:00");
    let tmp = new entry(
        en_date.toLocaleDateString("es-ES"),
        document.getElementById("rep").value,
        document.getElementById("eq").value,
        document.getElementById("desc").value,
        document.getElementById("dest").value,
        document.getElementById("gas").value,
        eval(document.getElementById("gas").value)
    );
    entries.push(tmp);
    drawTab();
    localStorage.setItem("entries", JSON.stringify(entries));
}

let remove = (id)=>{
    entries.splice(id,1);
    localStorage.setItem("entries", JSON.stringify(entries));
    drawTab();
}

let mvUp = (id)=>{
    if (id!=0)
    {
        [entries[id], entries[id-1]] = [entries[id-1], entries[id]];
        localStorage.setItem("entries", JSON.stringify(entries));
        drawTab();
    }
}

let mvDown = (id)=>{
    if (id!=(entries.length-1))
    {
        [entries[id], entries[id+1]] = [entries[id+1], entries[id]];
        localStorage.setItem("entries", JSON.stringify(entries));
        drawTab();
    }
}


let cap = ()=>{
    html2canvas(tab, {
        scale: 2,
        useCORS: true
    }).then(canvas => {
        // 3. Convertimos el canvas a una URL de imagen de tipo PNG
        const imgData = canvas.toDataURL('image/png');

        // 4. Creamos un enlace invisible para forzar la descarga
        const enlace = document.createElement('a');
        enlace.download = 'captura_tabla.png'; // El nombre que tendrá el archivo
        enlace.href = imgData;
        // 5. Hacemos click en el enlace y lo removemos
        enlace.click();
    });
}

document.getElementById("add").addEventListener("click",add);
document.getElementById("cap").addEventListener("click",cap);

document.getElementById("del").addEventListener("click",()=>{
    localStorage.clear();
    entries=[];
    drawTab();
})

init();