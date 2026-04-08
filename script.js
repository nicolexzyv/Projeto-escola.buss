// script.js - Lógica para o aplicativo escola.buss

// Lista de escolas com coordenadas exatas (GPS)
const escolas = [
    { nome: "Colégio estadual Ambrósio bini", latitude: -25.311554, longitude: -49.295136 },
    { nome: "Colégio militar Jaci real prado", latitude: -25.313528, longitude: -49.289885 },
    { nome: "Colégio estadual Theodoro de Bona", latitude: -25.318123, longitude: -49.277869 },
    { nome: "Colégio estadual Jardim paraíso", latitude: -25.316243, longitude: -49.308498 },
    { nome: "Colégio estadual Pedro piekas", latitude: -25.322647, longitude: -49.277151 },
    { nome: "Colégio estadual e municipal Airton Senna", latitude: -25.307769, longitude: -49.294285 },
    { nome: "Colégio particular Acesso", latitude: -25.306700, longitude: -49.295928 },
    { nome: "Colégio estadual papa João", latitude: -25.331555, longitude: -49.278424 },
    { nome: "Colégio professora adilmar", latitude: -25.342241, longitude: -49.268769 }
];

// Definir rotas para os 5 ônibus com coordenadas específicas
const rota1 = [
  [-25.311554, -49.295136], // Ambrósio Bini
  [-25.311800, -49.294900],
  [-25.312200, -49.294500],
  [-25.312700, -49.294000],
  [-25.313100, -49.293500],
  [-25.313528, -49.289885], // Jaci
  [-25.314100, -49.288500],
  [-25.314700, -49.287500],
  [-25.315100, -49.286800],
  [-25.315500, -49.287500]
];

const rota2 = [
  [-25.307769, -49.294285], // Airton Senna
  [-25.308100, -49.293800],
  [-25.308500, -49.293000],
  [-25.308900, -49.292200],
  [-25.309300, -49.291400],
  [-25.309800, -49.290600],
  [-25.310300, -49.289800],
  [-25.310800, -49.289000],
  [-25.311300, -49.288300],
  [-25.311500, -49.288500],
  [-25.312000, -49.287900],
  [-25.312500, -49.287400],
  [-25.313000, -49.287000]
];

const rota3 = [
  [-25.313528, -49.289885], // Jaci
  [-25.314000, -49.289000],
  [-25.314800, -49.288000],
  [-25.315500, -49.287200],
  [-25.316400, -49.286400],
  [-25.317500, -49.285600],
  [-25.318800, -49.284500],
  [-25.320000, -49.283500],
  [-25.321500, -49.282500],
  [-25.323000, -49.281000],
  [-25.324800, -49.279800],
  [-25.326800, -49.279000],
  [-25.329000, -49.278700],
  [-25.331000, -49.278500],
  [-25.331555, -49.278424] // Papa João
];

const rota4 = [
  [-25.311554, -49.295136], // Ambrósio
  [-25.311800, -49.295800],
  [-25.312200, -49.296500],
  [-25.312700, -49.297400],
  [-25.313200, -49.298400],
  [-25.313700, -49.299400],
  [-25.314200, -49.300800],
  [-25.314800, -49.301900],
  [-25.315400, -49.303000],
  [-25.315900, -49.304000],
  [-25.316243, -49.308498] // Jardim Paraíso
];

const rota5 = [
  [-25.311554, -49.295136], // Ambrósio
  [-25.312000, -49.294500],
  [-25.313000, -49.293000],
  [-25.314000, -49.291200],
  [-25.315000, -49.289500],
  [-25.316000, -49.288300],
  [-25.317000, -49.287000],
  [-25.318000, -49.285500],
  [-25.319000, -49.284000],
  [-25.320000, -49.282500],
  [-25.320800, -49.281200],
  [-25.321500, -49.279500],
  [-25.322000, -49.278500],
  [-25.322647, -49.277151] // Pedro Piekas
];

// Configuração dos ônibus com informações do motorista
const buses = [
    { 
        id: 1, 
        nome: 'Ônibus Azul', 
        color: '#007bff', 
        route: [...rota1], 
        originalRoute: [...rota1], 
        currentIndex: 0, 
        marker: null, 
        direction: 'ida',
        motorista: {
            nome: 'João Silva',
            telefone: '(41) 99999-9999',
            numero_onibus: '01'
        }
    },
    { 
        id: 2, 
        nome: 'Ônibus Verde', 
        color: '#28a745', 
        route: [...rota2], 
        originalRoute: [...rota2], 
        currentIndex: 0, 
        marker: null, 
        direction: 'ida',
        motorista: {
            nome: 'Maria Santos',
            telefone: '(41) 98888-7777',
            numero_onibus: '02'
        }
    },
    { 
        id: 3, 
        nome: 'Ônibus Vermelho', 
        color: '#dc3545', 
        route: [...rota3], 
        originalRoute: [...rota3], 
        currentIndex: 0, 
        marker: null, 
        direction: 'ida',
        motorista: {
            nome: 'Carlos Oliveira',
            telefone: '(41) 97777-6666',
            numero_onibus: '03'
        }
    },
    { 
        id: 4, 
        nome: 'Ônibus Laranja', 
        color: '#fd7e14', 
        route: [...rota4], 
        originalRoute: [...rota4], 
        currentIndex: 0, 
        marker: null, 
        direction: 'ida',
        motorista: {
            nome: 'Ana Ferreira',
            telefone: '(41) 96666-5555',
            numero_onibus: '04'
        }
    },
    { 
        id: 5, 
        nome: 'Ônibus Roxo', 
        color: '#6f42c1', 
        route: [...rota5], 
        originalRoute: [...rota5], 
        currentIndex: 0, 
        marker: null, 
        direction: 'ida',
        motorista: {
            nome: 'Pedro Costa',
            telefone: '(41) 95555-4444',
            numero_onibus: '05'
        }
    }
];

// Função para gerar pontos intermediários entre dois pontos com curvatura simulada (ruas)
function generateIntermediatePoints(start, end, numPoints) {
    const points = [];
    const deltaLat = end[0] - start[0];
    const deltaLng = end[1] - start[1];
    const distance = Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);
    
    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        let lat = start[0] + deltaLat * t;
        let lng = start[1] + deltaLng * t;
        
        // Adicionar curvatura sinusoidal para simular ruas (mais pronunciada)
        const curvatureFactor = 0.002; // Fator de curvatura aumentado
        const perpendicularLat = -deltaLng / distance;
        const perpendicularLng = deltaLat / distance;
        
        // Curvatura em forma de S para simular ruas realistas
        const curveOffset = Math.sin(t * Math.PI * 2) * curvatureFactor * distance;
        lat += curveOffset * perpendicularLat;
        lng += curveOffset * perpendicularLng;
        
        points.push([lat, lng]);
    }
    return points;
}

// Função para atualizar a posição do ônibus
function updateBusLocation(bus, lat, lng) {
    if (bus && bus.marker) {
        bus.marker.setLatLng([lat, lng]);
    }
}

// Função para calcular distância entre dois pontos (Fórmula de Haversine)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distância em km
}

// Função para encontrar a escola mais próxima
function findNearestSchool(lat, lng) {
    let nearest = null;
    let minDistance = Infinity;
    
    escolas.forEach(escola => {
        const distance = calculateDistance(lat, lng, escola.latitude, escola.longitude);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = { escola: escola, distance: distance };
        }
    });
    
    return nearest;
}

// Função para mover um ônibus suavemente na sua rota
function moveBus(bus) {
    if (!bus || !bus.route || bus.route.length < 2) return;
    if (bus.currentIndex >= bus.route.length - 1) {
        handleRouteEnd(bus);
        return;
    }

    const start = bus.route[bus.currentIndex];
    const end = bus.route[bus.currentIndex + 1];

    // Gerar pontos intermediários para movimento suave
    const intermediatePoints = generateIntermediatePoints(start, end, 100);
    let pointIndex = 0;

    const moveStep = () => {
        if (pointIndex < intermediatePoints.length) {
            const [lat, lng] = intermediatePoints[pointIndex];
            updateBusLocation(bus, lat, lng);

            pointIndex++;
            setTimeout(moveStep, 20);
        } else {
            // Verificar se chegou em uma escola de parada
            const [lat, lng] = bus.route[bus.currentIndex + 1];
            const nearest = findNearestSchool(lat, lng);

            bus.currentIndex += 1;

            if (nearest && nearest.distance < 0.0005) {
                // Parada de 3 segundos em escolas
                setTimeout(() => {
                    handleRouteEnd(bus);
                }, 3000);
            } else {
                handleRouteEnd(bus);
            }
        }
    };

    moveStep();
}

function handleRouteEnd(bus) {
    if (bus.currentIndex < bus.route.length - 1) {
        setTimeout(() => moveBus(bus), 500);
        return;
    }

    if (bus.direction === 'ida') {
        setTimeout(() => {
            bus.route = [...bus.originalRoute].reverse();
            bus.currentIndex = 0;
            bus.direction = 'volta';
            setTimeout(() => moveBus(bus), 500);
        }, 5000);
    } else {
        bus.route = [...bus.originalRoute];
        bus.currentIndex = 0;
        bus.direction = 'ida';
        setTimeout(() => moveBus(bus), 500);
    }
}

// Função para gerar o popup com informações do motorista
function gerarPopupMotorista(bus) {
    const { nome, telefone, numero_onibus } = bus.motorista;
    
    // HTML formatado com estilos básicos
    const popupContent = `
        <div style="font-family: Arial, sans-serif; width: 200px;">
            <h4 style="margin: 0 0 10px 0; color: #333; border-bottom: 2px solid ${bus.color}; padding-bottom: 8px;">
                ${bus.nome}
            </h4>
            <p style="margin: 8px 0; font-size: 13px;">
                <strong>Motorista:</strong> ${nome}
            </p>
            <p style="margin: 8px 0; font-size: 13px;">
                <strong>Telefone:</strong> ${telefone}
            </p>
            <p style="margin: 8px 0; font-size: 13px;">
                <strong>Ônibus:</strong> ${numero_onibus}
            </p>
        </div>
    `;
    
    return popupContent;
}

// Função principal para inicializar o mapa
function initMap() {
    // Coordenadas iniciais a partir da primeira escola da lista
    const latitude = escolas[0].latitude;
    const longitude = escolas[0].longitude;
    const zoomLevel = 13;

    // Criar o mapa e definir a visualização inicial, desabilitando controles extras
    const map = L.map('map', {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: false,
        keyboard: false,
        dragging: true,
        touchZoom: true
    }).setView([latitude, longitude], zoomLevel);

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Evento de clique no mapa para mostrar nome da localização
    map.on('click', function(e) {
        const locationName = getLocationName(e.latlng.lat, e.latlng.lng);
        L.popup()
            .setLatLng(e.latlng)
            .setContent(`<b>${locationName}</b>`)
            .openOn(map);
    });

    // Adicionar marcadores para as escolas fornecidas com coordenadas exatas
    escolas.forEach(escola => {
        L.marker([escola.latitude, escola.longitude], {
            icon: L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/167/167707.png',
                iconSize: [24, 24],
                iconAnchor: [12, 24],
                popupAnchor: [0, -18]
            })
        }).addTo(map).bindPopup(
            `<b>${escola.nome}</b><br>Lat: ${escola.latitude.toFixed(6)}<br>Lng: ${escola.longitude.toFixed(6)}`
        );
    });

    // Adicionar marcadores e iniciar movimento para cada ônibus
    buses.forEach(bus => {
        // Ícone personalizado para ônibus
        const busIcon = L.divIcon({
            html: `<span style="font-size: 24px; color: ${bus.color};">🚌</span>`,
            className: 'bus-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const busMarker = L.marker(bus.route[0], { icon: busIcon }).addTo(map);

        bus.marker = busMarker;
        // Usar a função para gerar popup com informações do motorista
        busMarker.bindPopup(gerarPopupMotorista(bus));
        
        // Adicionar evento de clique para abrir o bottom sheet
        busMarker.on('click', function() {
            const bottomSheetContent = `
                <div style="padding: 8px 0;">
                    <h3 style="margin: 0 0 16px 0; color: #1f7ed6; font-size: 18px;">${bus.nome}</h3>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 12px; margin: 12px 0;">
                        <p style="font-size: 14px; margin: 6px 0;"><strong>Motorista:</strong> ${bus.motorista.nome}</p>
                        <p style="font-size: 14px; margin: 6px 0;"><strong>Telefone:</strong> ${bus.motorista.telefone}</p>
                        <p style="font-size: 14px; margin: 6px 0;"><strong>Ônibus:</strong> ${bus.motorista.numero_onibus}</p>
                    </div>
                    <p style="font-size: 13px; color: #5f6368; margin: 12px 0;">Clique no ícone de rota para ver mais detalhes.</p>
                </div>
            `;
            updateBottomSheet(bottomSheetContent);
        });

        // Iniciar movimento do ônibus
        moveBus(bus);
    });

    // Log para confirmar inicialização
    console.log('Mapa inicializado com sucesso e 5 ônibus em movimento');

    // Retornar o mapa para uso em event listeners
    return map;
}

// Função para simular nome da localização (reverse geocoding simples)
function getLocationName(lat, lng) {
    // Simulação baseada em coordenadas aproximadas
    if (Math.abs(lat - (-25.3173)) < 0.001 && Math.abs(lng - (-49.3103)) < 0.001) {
        return "Centro de Almirante Tamandaré";
    } else if (lat > -25.318) {
        return "Zona Norte";
    } else {
        return "Zona Sul";
    }
}

// Executar a inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const map = initMap();

    // Funcionalidade da barra de pesquisa
    const searchInput = document.getElementById('search-input');

    // Buscar ao pressionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase();
            const escola = escolas.find(e => e.nome.toLowerCase().includes(query));
            if (escola) {
                map.setView([escola.latitude, escola.longitude], 15);
                // Mostrar no painel
                updateBottomSheet(`
                    <div style="padding: 8px 0;">
                        <h3 style="margin: 0 0 12px 0; color: #1f7ed6; font-size: 18px;">${escola.nome}</h3>
                        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 12px; margin: 12px 0;">
                            <p style="font-size: 14px; margin: 6px 0;"><strong>Latitude:</strong> ${escola.latitude.toFixed(6)}</p>
                            <p style="font-size: 14px; margin: 6px 0;"><strong>Longitude:</strong> ${escola.longitude.toFixed(6)}</p>
                        </div>
                    </div>
                `);
            } else {
                alert('Escola não encontrada.');
            }
        }
    });

    // Botões flutuantes
    const locationButton = document.getElementById('location-button');
    const zoomInButton = document.getElementById('zoom-in-button');
    const zoomOutButton = document.getElementById('zoom-out-button');

    locationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                map.setView([lat, lng], 15);
                L.marker([lat, lng]).addTo(map).bindPopup('Sua localização').openPopup();
            });
        } else {
            alert('Geolocalização não suportada.');
        }
    });

    zoomInButton.addEventListener('click', () => {
        map.zoomIn();
    });

    zoomOutButton.addEventListener('click', () => {
        map.zoomOut();
    });

    // Integrar com marcadores existentes (opcional, para expandir painel ao clicar)
    // Como já tem popup, talvez adicionar evento para painel
});

// ============================================
// Interatividade da Nova Interface
// ============================================

// Atualizar a função updateBottomSheet para expandir o painel
function updateBottomSheet(content) {
    const bottomSheet = document.querySelector('.bottom-sheet');
    const contentElement = document.querySelector('.bottom-sheet-content');
    
    contentElement.innerHTML = content;
    bottomSheet.classList.add('expanded');
}

// Botão de menu
const menuButton = document.getElementById('menu-button');
if (menuButton) {
    menuButton.addEventListener('click', () => {
        alert('Menu em desenvolvimento');
    });
}

// Botão de notificações (header)
const notificationButton = document.getElementById('notification-button');
if (notificationButton) {
    notificationButton.addEventListener('click', () => {
        alert('Notificações:\n- Ônibus Azul chegando em 5 min\n- Ônibus Verde com atraso de 2 min');
    });
}

// Botões de navegação inferior
const navButtons = document.querySelectorAll('.nav-button');
navButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remover classe active de todos os botões
        navButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        this.classList.add('active');
        
        const tab = this.getAttribute('data-tab');
        
        if (tab === 'rotas') {
            updateBottomSheet(`
                <div style="padding: 8px 0;">
                    <h4 style="margin: 12px 0 8px 0; color: #1f7ed6;">Rotas Disponíveis</h4>
                    <p style="font-size: 14px; color: #5f6368; margin: 8px 0;">
                        <strong>Rota 1 (Azul):</strong> Ambrósio → Jaci<br>
                        <strong>Rota 2 (Verde):</strong> Airton Senna → Centro<br>
                        <strong>Rota 3 (Vermelho):</strong> Jaci → Papa João<br>
                        <strong>Rota 4 (Laranja):</strong> Ambrósio → Jardim Paraíso<br>
                        <strong>Rota 5 (Roxo):</strong> Ambrósio → Pedro Piekas
                    </p>
                </div>
            `);
        } else if (tab === 'notificacoes') {
            updateBottomSheet(`
                <div style="padding: 8px 0;">
                    <h4 style="margin: 12px 0 8px 0; color: #1f7ed6;">Notificações Recentes</h4>
                    <div style="border-left: 3px solid #2196F3; padding: 12px; margin: 8px 0; background-color: #f8f9fa; border-radius: 4px;">
                        <p style="font-size: 14px; margin: 0 0 4px 0;"><strong>Ônibus Azul</strong></p>
                        <p style="font-size: 13px; color: #5f6368; margin: 0;">Chegando em 5 minutos</p>
                    </div>
                    <div style="border-left: 3px solid #FF9800; padding: 12px; margin: 8px 0; background-color: #f8f9fa; border-radius: 4px;">
                        <p style="font-size: 14px; margin: 0 0 4px 0;"><strong>Ônibus Laranja</strong></p>
                        <p style="font-size: 13px; color: #5f6368; margin: 0;">Atraso de 3 minutos</p>
                    </div>
                </div>
            `);
        } else if (tab === 'perfil') {
            updateBottomSheet(`
                <div style="padding: 8px 0;">
                    <h4 style="margin: 12px 0 8px 0; color: #1f7ed6;">Meu Perfil</h4>
                    <div style="border-radius: 8px; padding: 12px; background-color: #f8f9fa; margin: 8px 0;">
                        <p style="font-size: 14px; margin: 6px 0;"><strong>Nome:</strong> Usuário</p>
                        <p style="font-size: 14px; margin: 6px 0;"><strong>Email:</strong> usuario@example.com</p>
                        <p style="font-size: 14px; margin: 6px 0;"><strong>Telefone:</strong> (41) 9999-9999</p>
                        <p style="font-size: 14px; margin: 6px 0;"><strong>Ônibus Favorito:</strong> Ônibus Azul</p>
                    </div>
                </div>
            `);
        }
    });
});

// Fechar painel inferior ao clicar na handle de drag
const dragHandle = document.querySelector('.bottom-sheet-drag-handle');
if (dragHandle) {
    dragHandle.addEventListener('click', () => {
        const bottomSheet = document.querySelector('.bottom-sheet');
        bottomSheet.classList.toggle('expanded');
    });
}

// Botão de fechar do bottom sheet
const closeButton = document.getElementById('close-bottom-sheet');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        const bottomSheet = document.querySelector('.bottom-sheet');
        bottomSheet.classList.remove('expanded');
    });
}