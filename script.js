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

// Cria uma rota variante para cada ônibus
function createRouteVariant(shift) {
    const coords = escolas.map(escola => [escola.latitude, escola.longitude]);
    const n = coords.length;
    const firstPart = coords.slice(shift % n);
    const secondPart = coords.slice(0, shift % n);
    return firstPart.concat(secondPart);
}

const buses = [
    { id: 1, nome: 'Ônibus Azul', color: '#007bff', route: createRouteVariant(0), currentIndex: 0, isPaused: false, speed: 100, marker: null },
    { id: 2, nome: 'Ônibus Verde', color: '#28a745', route: createRouteVariant(2), currentIndex: 0, isPaused: false, speed: 100, marker: null },
    { id: 3, nome: 'Ônibus Vermelho', color: '#dc3545', route: createRouteVariant(4), currentIndex: 0, isPaused: false, speed: 100, marker: null },
    { id: 4, nome: 'Ônibus Laranja', color: '#fd7e14', route: createRouteVariant(6), currentIndex: 0, isPaused: false, speed: 100, marker: null },
    { id: 5, nome: 'Ônibus Roxo', color: '#6f42c1', route: createRouteVariant(8), currentIndex: 0, isPaused: false, speed: 100, marker: null }
];

let isPaused = false;
let globalSpeed = 100; // Base para controles gerais

// Função para atualizar a posição do ônibus
function updateBusLocation(bus, lat, lng) {
    if (bus && bus.marker) {
        bus.marker.setLatLng([lat, lng]);
    }
}

// Função para interpolar entre dois pontos
function interpolate(start, end, t) {
    // t é um valor entre 0 e 1
    const lat = start[0] + (end[0] - start[0]) * t;
    const lng = start[1] + (end[1] - start[1]) * t;
    return [lat, lng];
}

// Função para calcular o ângulo de rotação entre dois pontos
function calculateAngle(start, end) {
    const deltaLat = end[0] - start[0];
    const deltaLng = end[1] - start[1];
    const angleDeg = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
    return angleDeg;
}

// Função para mover um ônibus suavemente na sua rota
function moveBus(bus) {
    if (!bus || !bus.route || bus.route.length < 2) return;

    if (bus.isPaused) {
        setTimeout(() => moveBus(bus), 100);
        return;
    }

    const start = bus.route[bus.currentIndex];
    const end = bus.route[(bus.currentIndex + 1) % bus.route.length];

    let t = 0;
    const steps = 50;
    const stepTime = bus.speed / steps;

    const moveStep = () => {
        if (bus.isPaused) {
            setTimeout(moveStep, 100);
            return;
        }

        if (t <= 1) {
            const [lat, lng] = interpolate(start, end, t);
            updateBusLocation(bus, lat, lng);

            const angle = calculateAngle(start, end);
            if (bus.marker && bus.marker._icon) {
                bus.marker._icon.style.transform = `rotate(${angle}deg)`;
            }

            t += 1 / steps;
            setTimeout(moveStep, stepTime);
        } else {
            bus.currentIndex = (bus.currentIndex + 1) % bus.route.length;
            moveBus(bus);
        }
    };

    moveStep();
}

// Função principal para inicializar o mapa
function initMap() {
    // Coordenadas iniciais a partir da primeira escola da lista
    const latitude = escolas[0].latitude;
    const longitude = escolas[0].longitude;
    const zoomLevel = 13;

    // Criar o mapa e definir a visualização inicial
    const map = L.map('map').setView([latitude, longitude], zoomLevel);

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

    // Adicionar um marcador na localização central (primeira escola da rota)
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`<b>${escolas[0].nome}</b><br>Ponto de partida da rota.`).openPopup();

    // Não desenhar linha reta entre os pontos; manter apenas marcadores e movimento do ônibus

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

    // Adicionar marcador no ponto de início (verde)
    L.marker(escolas[0], {
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3050/3050159.png',
            iconSize: [25, 25],
            popupAnchor: [0, -10]
        })
    }).addTo(map).bindPopup(`<b>Início</b><br>${escolas[0].nome}`);

    // Adicionar marcador no ponto final (vermelho)
    L.marker(escolas[escolas.length - 1], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            iconSize: [25, 41],
            popupAnchor: [0, -10]
        })
    }).addTo(map).bindPopup(`<b>Destino</b><br>${escolas[escolas.length - 1].nome}`);

    // Adicionar marcadores e iniciar movimento para cada ônibus
    buses.forEach(bus => {
        const busMarker = L.marker(bus.route[0], {
            icon: L.divIcon({
                html: `<span style="font-size: 24px; color: ${bus.color}; text-shadow: 0 0 2px #000;">🚌</span>`,
                className: 'bus-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        }).addTo(map);

        bus.marker = busMarker;
        busMarker.bindPopup(`<b>${bus.nome}</b><br>Ponto inicial de rota.`);

        // Iniciar movimento suave do ônibus
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

// Função para atualizar informações do painel
function updatePanelInfo() {
    const now = new Date();
    const mainBus = buses[0];
    document.getElementById('busTime').textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('busStatus').textContent = mainBus && mainBus.isPaused ? 'Pausado' : 'Em movimento';
    document.getElementById('nextStop').textContent = mainBus ? `Ponto ${mainBus.currentIndex + 1}` : '-';
}

// Executar a inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const map = initMap();

    // Event listeners para controles
    const pauseResumeBtn = document.getElementById('pauseResume');
    const speedUpBtn = document.getElementById('speedUp');
    const slowDownBtn = document.getElementById('slowDown');
    const centerBusBtn = document.getElementById('centerBus');
    const togglePanelBtn = document.getElementById('togglePanel');
    const closePanelBtn = document.getElementById('closePanel');
    const infoPanel = document.getElementById('infoPanel');

    pauseResumeBtn.addEventListener('click', () => {
        const newPauseState = !buses[0].isPaused;
        buses.forEach(bus => { bus.isPaused = newPauseState; });

        const icon = pauseResumeBtn.querySelector('i');
        if (newPauseState) {
            icon.className = 'fas fa-play';
            pauseResumeBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
        } else {
            icon.className = 'fas fa-pause';
            pauseResumeBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        }
        updatePanelInfo();
    });

    speedUpBtn.addEventListener('click', () => {
        globalSpeed = Math.max(50, globalSpeed - 20);
        buses.forEach(bus => { bus.speed = globalSpeed; });
    });

    slowDownBtn.addEventListener('click', () => {
        globalSpeed = Math.min(500, globalSpeed + 20);
        buses.forEach(bus => { bus.speed = globalSpeed; });
    });

    centerBusBtn.addEventListener('click', () => {
        const pos = buses[0] && buses[0].marker ? buses[0].marker.getLatLng() : null;
        if (pos) map.setView(pos, 15);
    });

    togglePanelBtn.addEventListener('click', () => {
        infoPanel.classList.toggle('open');
    });

    closePanelBtn.addEventListener('click', () => {
        infoPanel.classList.remove('open');
    });

    // Atualizar painel periodicamente
    setInterval(updatePanelInfo, 1000);
    updatePanelInfo(); // Inicial
});