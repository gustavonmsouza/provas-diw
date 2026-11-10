const API = "http://localhost:3000";

async function buscarParticipantes(naRoca) {
    const resposta = await fetch(`${API}/participantes?naRoca=${naRoca}`);
    return await resposta.json();
}

async function buscarVotos() {
    const resposta = await fetch(`${API}/votos`);
    return await resposta.json();
}

async function registrarVoto(participanteId) {
    const resposta = await fetch(`${API}/votos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            participanteId: participanteId,
            data: new Date().toISOString()
        })
    });

    return await resposta.json();
}

async function excluirVoto(id) {
    return await fetch(`${API}/votos/${id}`, {
        method: "DELETE"
    });
}
async function carregarRoca() {
    const roca = await buscarParticipantes(true);
    const demais = await buscarParticipantes(false);

    const listaRoca = document.getElementById("participantesRoca");
    const listaDemais = document.getElementById("participantesDemais");

    listaRoca.innerHTML = "";
    listaDemais.innerHTML = "";

    roca.forEach(participante => {
        listaRoca.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <img src="${participante.foto}" class="card-img-top" alt="${participante.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${participante.nome}</h5>
                        <span class="badge bg-danger">Na roça</span>
                    </div>
                </div>
            </div>
        `;
    });

    demais.forEach(participante => {
        listaDemais.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <img src="${participante.foto}" class="card-img-top" alt="${participante.nome}">
                    <div class="card-body">
                        <h6 class="card-title">${participante.nome}</h6>
                    </div>
                </div>
            </div>
        `;
    });
}

carregarRoca();

carregarRoca();