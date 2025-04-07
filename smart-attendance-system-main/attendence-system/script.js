// Espera o DOM carregar completamente
$(function() {

    // --- DADOS MOCADOS (Simulação) ---
    let mockUsersData = {
        "Thor": 1, // Perto
        "Bidu": 0, // Longe
        "Amora": 1, // Perto
        "Simba": 0, // Longe
        "Luna": 1  // Novo pet
    };

    // --- MAPEAMENTO DE NOMES PARA FOTOS (NOVO!) ---
    const petPhotos = {
        "Thor": "./img/thor.png",       // PRECISA CRIAR/TER ESSAS IMAGENS!
        "Bidu": "./img/bidu.png",
        "Amora": "./img/amora.png",     // Pode ser gif!
        "Simba": "./img/simba.png",
        "Luna": "./img/luna.png",
        // Foto padrão para pets sem foto específica ou novos
        "default": "./img/default-pet-avatar.png"
    };

    let mockAttendanceData = [
        { uid: 'Thor', id: 'Comedouro A', time: '2025-03-27T10:30:00Z', status: true },
        { uid: 'Bidu', id: 'Comedouro B', time: '2025-03-27T10:35:15Z', status: true },
        { uid: 'Thor', id: 'Comedouro A', time: '2025-03-27T10:45:00Z', status: false },
        { uid: 'Amora', id: 'Comedouro A', time: '2025-03-27T11:00:00Z', status: true },
        { uid: 'Bidu', id: 'Comedouro B', time: '2025-03-27T11:05:00Z', status: false },
        { uid: 'Thor', id: 'Comedouro A', time: '2025-03-27T11:30:00Z', status: true },
        { uid: 'Simba', id: 'Comedouro C', time: '2025-03-27T11:45:00Z', status: true },
        { uid: 'Luna', id: 'Comedouro A', time: '2025-03-27T12:00:00Z', status: true }, // Evento para Luna
    ];

    // --- Seletores do DOM ---
    const $liveStatusRow = $('#live-status-row');
    const $liveStatusPlaceholder = $('#live-status-placeholder');

    // --- Inicialização do DataTable ---
    // (O código do DataTable continua igual ao anterior)
    const attendanceTable = $('#attendanceTable').DataTable({
        // ... (configurações anteriores do DataTable) ...
         "responsive": true,
        "ordering": true,
        "paging": true,
        "pageLength": 10,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
        },
        "dom": '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
               '<"row"<"col-sm-12"tr>>' +
               '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>' +
               'B',
        "buttons": [
            {
                extend: 'csv',
                filename: 'historico_pets',
                className: 'btn btn-outline-success btn-sm ml-2 dt-button-csv',
                text: '<i class="fas fa-file-csv"></i> Exportar CSV'
            }
        ]
    });


    // --- Funções de Renderização ---

    function renderLiveStatus(usersData) {
        $liveStatusRow.empty();
        let hasLiveUsers = false;

        if (usersData && Object.keys(usersData).length > 0) {
            hasLiveUsers = true;
            Object.keys(usersData).forEach(petName => { // Agora a chave é o nome
                const isCheckedIn = usersData[petName] === 1;
                // Busca a foto no mapeamento, usa default se não encontrar
                const petAvatar = petPhotos[petName] || petPhotos["default"]; // <-- USA O MAPEAMENTO
                const statusIcon = isCheckedIn ? './img/paw-green.png' : './img/paw-grey.png';
                const statusText = isCheckedIn ? 'Perto!' : 'Passeando...'; // Textos mais fofos
                const cardClass = isCheckedIn ? 'pet-card-active' : 'pet-card-inactive';

                const petCardHtml = `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
                  <div class="card pet-card ${cardClass} w-100 shadow-sm">
                    <a href="#" title="Ver detalhes de ${petName}">
                      <img src="${petAvatar}" class="pet-avatar" alt="Foto de ${petName}">
                    </a>
                    <div class="card-body text-center d-flex flex-column">
                      <h5 class="card-title pet-name mb-1 mt-2">${petName}</h5>
                      <p class="card-text pet-status mt-auto">
                        <img src="${statusIcon}" class="status-icon" alt="status">
                        <span class="status-text">${statusText}</span>
                      </p>
                    </div>
                  </div>
                </div>
                `;
                $liveStatusRow.append(petCardHtml);
            });
        }

        if (!hasLiveUsers) {
            $liveStatusRow.html('<div class="col-12 text-center"><p class="text-muted">Nenhum pet sendo monitorado no momento. <i class="far fa-sad-tear"></i></p></div>');
        }
         $liveStatusPlaceholder.hide();
    }

    // (A função renderAttendanceTable continua igual, pois já usa `elem.uid` que agora são nomes)
    function renderAttendanceTable(attendanceData) {
        // ... (código igual ao anterior para popular a tabela) ...
         attendanceTable.clear();
         if (attendanceData && attendanceData.length > 0) {
             attendanceData.forEach(function(elem) {
                 // ... (validação e formatação de data igual antes) ...
                  let formattedTime = 'Data inválida';
                 let dateForSort = 0;
                 try { /* ... (lógica de parse da data) ... */
                     let dateObj = new Date(elem.time);
                      if (!isNaN(dateObj)) {
                         formattedTime = dateObj.toLocaleString('pt-BR', { /*...*/ });
                         dateForSort = dateObj.getTime();
                      }
                 } catch(e) {/*...*/}

                 const statusBadge = elem.status === true
                    ? '<span class="badge badge-success">Check In <i class="fas fa-door-open"></i></span>' // Adiciona ícone
                    : '<span class="badge badge-danger">Check Out <i class="fas fa-door-closed"></i></span>';// Adiciona ícone

                 attendanceTable.row.add([
                     elem.uid, // Que agora é o nome
                     elem.id,
                     formattedTime,
                     statusBadge
                 ]);
             });
         }
         attendanceTable.draw();
    }

    function processData(users, attendance) {
         renderLiveStatus(users);
         renderAttendanceTable(attendance);
    }

    // --- Simulação de Mudança de Status ---
     $('#simulate-change-btn').on('click', function() {
        // Pega um nome de pet aleatório da lista atual para simular
        const petNames = Object.keys(mockUsersData);
        if (petNames.length === 0) return; // Não faz nada se não houver pets

        const randomPetIndex = Math.floor(Math.random() * petNames.length);
        const petToChange = petNames[randomPetIndex];

        const currentState = mockUsersData[petToChange];
        const newState = currentState === 1 ? 0 : 1;
        mockUsersData[petToChange] = newState;

        mockAttendanceData.push({
            uid: petToChange,
            id: 'ComedouroSimulado',
            time: new Date().toISOString(),
            status: newState === 1
        });

        processData(mockUsersData, mockAttendanceData);

        // Feedback visual (efeito de 'pulso' no card)
        const cardToHighlight = $liveStatusRow.find(`.pet-card:contains(${petToChange})`).closest('.col-lg-3'); // Pega a coluna
        if(cardToHighlight.length > 0) {
            cardToHighlight.addClass('card-pulsing');
            setTimeout(() => cardToHighlight.removeClass('card-pulsing'), 1200); // Remove após a animação
        }

         // alert(`Status do ${petToChange} alterado para ${newState === 1 ? '"Perto!"' : '"Passeando..."'} e evento adicionado!`);
    });

    // --- Inicialização com Dados Mocados ---
    console.log("Iniciando com dados mocados...");
    $liveStatusPlaceholder.show();
    setTimeout(() => {
        processData(mockUsersData, mockAttendanceData);
    }, 500);

    // --- Código comentado para voltar ao Firebase ---
    /*
    firebase.database().ref('/').on('value', function(snap) {
       // ... seu código original do listener do Firebase ...
       // Lembre-se que o Firebase pode retornar UIDs, não nomes.
       // Você precisaria buscar no '/pets_registry' para obter nome/foto
       // antes de chamar processData.
    }, function (errorObject) {
       // ... tratamento de erro ...
    });
    */

}); // Fim do Document Ready