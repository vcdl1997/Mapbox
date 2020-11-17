// ESCOPO DE VARIÁVEIS
let data, map,
    raio = 10,
    zoom = 10,
    plottedRoutes = 0,
    latlng = [],
    pontosDePassagem = [],
    viewedPoints = [],
    windowWidth = window.innerWidth,
    windowHeight = window.innerHeight
;

// ARRAY POPULADO COM AS ESCOLAS
data = [
    {codigo_cie: "901659", cor: "#FF0000", escola: "EE PROFA MASSAKO OSAWA HIRABAYASHI", latitude: "-24.5037994384766", longitude: "-47.8619995117188", execucao: "100", pi: "1998/01152", situacao: "", imagens: ['https://scontent.fcgh19-1.fna.fbcdn.net/v/t1.0-9/42936435_771766126489117_4451507639779590144_n.jpg?_nc_cat=100&ccb=2&_nc_sid=19026a&_nc_ohc=DE0usEhF2q0AX_dIRUu&_nc_ht=scontent.fcgh19-1.fna&oh=ec9cb24ff10114658713c69d2867ee19&oe=5FD01662', 'https://scontent.fcgh19-1.fna.fbcdn.net/v/t1.0-9/12803027_251266911872377_2180457362717717218_n.jpg?_nc_cat=103&ccb=2&_nc_sid=174925&_nc_ohc=s9Q1JkEOq1kAX9NMOyY&_nc_ht=scontent.fcgh19-1.fna&oh=a0311088a5e54edda980f7a5ea533469&oe=5FCEB6DD']},

    {codigo_cie: "902135", cor: "#FF0000", escola: "EE CDOR BENEVIDES BERALDO", latitude: "-23.7238998413086", longitude: "-46.859001159668", execucao: "100", pi: "1999/00375", situacao: "", imagens: ['https://scontent.fcgh19-1.fna.fbcdn.net/v/t1.0-9/122460500_3912655222096544_2936514919859728052_o.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=wwdSjOjG2vAAX9nJeGK&_nc_ht=scontent.fcgh19-1.fna&oh=a41c42779d8cdbe45b3d6ebb6f89238f&oe=5FCFE184', 'https://photos.wikimapia.org/p/00/02/94/89/30_big.jpg']},

    {codigo_cie: "291948", cor: "#FF0000", escola: "EMEF CEL JOSE VENANCIO DIAS", latitude: "-20.7141502807008", longitude: "-48.5386872694244", execucao: "100", pi: "1998/01152", situacao: "", imagens: ['https://www.ocolinense.com.br/images/12885.jpg', 'https://scontent.fcgh19-1.fna.fbcdn.net/v/t1.0-9/387628_235225066554876_1139902387_n.jpg?_nc_cat=105&ccb=2&_nc_sid=cdbe9c&_nc_ohc=nPuZiV6J1-QAX85yJUl&_nc_ht=scontent.fcgh19-1.fna&oh=53535117ed6523710cb3b05d905a4cf7&oe=5FD0D510']},

    {codigo_cie: "16901; 458697", cor: "#FF0000", escola: "EE/CEL PROFA MARIA ANGELICA BAILLOT", latitude: "-23.5090007781982", longitude: "-47.6077995300293", execucao: "100", pi: "2000/00519", situacao: "", imagens: []},

    {codigo_cie: "23589", cor: "#FF0000", escola: "EE PROF SALVADOR GOGLIANO JUNIOR", latitude: "-21.1760292053223", longitude: "-48.6303100585938", execucao: "100", pi: "2000/04220", situacao: "", imagens: ['https://scontent.fcgh19-1.fna.fbcdn.net/v/t1.0-9/123139700_2829958827284678_4640972921799791714_n.jpg?_nc_cat=101&ccb=2&_nc_sid=e3f864&_nc_ohc=LSFcp9GLvUkAX_DftB6&_nc_ht=scontent.fcgh19-1.fna&oh=c57738e071124c70d8cd713ef6c7dede&oe=5FD03938', 'https://s03.video.glbimg.com/x720/3534766.jpg']},

    {codigo_cie: "34587", cor: "#FF0000", escola: "EE JOAQUIM ABARCA", latitude: "-21.9256591796875", longitude: "-50.5229301452637", 
    execucao: "100", pi: "2001/00927", situacao: "", imagens: ['https://www.tupacity.com/img/2019/08/26/fileg_419793.jpg', 'https://lh3.googleusercontent.com/proxy/BcH1_1sY9aQZWYR2alQuxXSPqWqPLhogSEZb7tDjBAENVMILTi5oMYxZT3BWRY1iEgTm0W0tE6SCJ346_4HekheMg2dX-550dUKvLa9fx-85vJbxivkRKkI']},

    {codigo_cie: "30831; 209120", cor: "#FF0000", escola: "EE/EMEFEI PROFA TAIEKA TAKAHASHI GIMENES/TEREZINHA ZANELLI", latitude: "-21.853", longitude: "-51.0893", execucao: "100", pi: "2000/02979", situacao: "", imagens: []},

    {codigo_cie: "16559; 458284", cor: "#FF0000", escola: "EE/CEL LUIZ CAMPACCI", latitude: "-23.0557098388672", longitude: "-47.8367881774902", execucao: "100", pi: "2001/00871", situacao: "", imagens: []}
];



// REALIZA A MONTAGEM DO MAPA SETANDO OS MARCADORES COM BASE NO RAIO INFORMADO
const montaMapa = function(){

    let date = new Date(),
        second = date.getSeconds()
    ;

    mapboxgl.accessToken = "<< TOKEN >>";

    if(map != undefined) zoom = map.getZoom();
    
    plottedRoutes = 0;
    pontosDePassagem = [];
    latlng = [];
    viewedPoints = [];

    document.querySelector("#instructions").style.display = 'none';
    document.getElementById("map").style.width = `${windowWidth}px`;
    document.getElementById("map").style.height = `${windowHeight}px`;

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-46.6388, -23.5489], //coordenadas da cidade de São Paulo
        zoom: zoom
    });

    //Adiciona o controle de zoom ao mapa
    map.addControl(new mapboxgl.NavigationControl());

    if(data.length > 0){
        data.forEach(({cor, longitude, latitude, codigo_cie, escola}, posicao)=>{

            //Insere a Latitude e Longitude do Marcador em um array de Coordenadas
            latlng.push([parseFloat(longitude), parseFloat(latitude)]);
        });

        map.on('load', function() {
            
            // coordenadas dos marcadores
            let points = turf.points(latlng);

            //Desenha um círculo com raio que informamos
            let center = [-46.6388, -23.5489], //coordenadas da cidade de São Paulo
                radius = raio,
                options = {units: 'kilometers', properties: {foo: 'bar'}},
                circle = turf.circle(center, radius, options)
            ;

            // Localiza os marcadores dentro do circulo
            let markerWithin = turf.pointsWithinPolygon(points, circle);

            map.addLayer({
				'id': 'circle',
				'type': 'fill',
				'source': {
				'type': 'geojson',
				'data': circle
                },
				'layout': {},
				'paint': {
				'fill-color': '#525252',
				'fill-opacity': 0.2
                }
            });
        
            //percorre o resultado da busca dos marcadores que se encontram dentro do raio definido
            markerWithin.features.forEach((marker)=>{

                //div com a imagem do marcador
                let el = document.createElement('div');
                el.className = 'marker';

                let escola = new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map)
                ;

                //buscamos o index da escola encontrada no array data, com base na latitude
                let match = data.findIndex(x => x.latitude == marker.geometry.coordinates[1]);
                viewedPoints.push(match);

                //Seto o evento de click no marcador
                escola._element.setAttribute('onclick', `showPopupMarker(${match})`);
            });
        });
    }
}


// INSERE A LONGITUDE E LATITUD EM UM ARRAY DE ROTAS, CASO ESTE POSSUA 2 POSIÇÕES E DISPARADO O EVENTO DE CALCULO DE ROTAS
const capturaLatLng = function(latitude, longitude){

    //Latitude e Longitude do Marcador clicado
    let latMarker = parseFloat(latitude),
        lngMarker = parseFloat(longitude)
    ;

    //Verifica se as coordenadas já existem no array antes de inserir
    if(pontosDePassagem.map(x => x.lat).indexOf(latMarker) == -1 &&
        pontosDePassagem.map(x => x.lng).indexOf(lngMarker) == -1){

        //Insere latitude e longitude da escola clicada no array de pontos de passagem
        pontosDePassagem.push({lng: lngMarker, lat: latMarker, });
    }

    //Só inicia o calcula de rotas se houver mais de um ponto de passagem
    if(pontosDePassagem.length > 1) calculadorDeRotas(pontosDePassagem);
}


//CAPTURA A LONGITUDE E LATITUDE DO MARCADOR CLICADO E INSERE EM UM ARRAY DE ROTAS, CASO ESTE POSSUA 2 POSIÇÕES E DISPARADO O EVENTO DE CALCULO DE ROTAS
const calculadorDeRotas = function(coordenadas) {

    //div das instruções da viagem
    let instructions = document.getElementById('instructions'),
        rotaA = document.querySelector(".pointA"),
        rotaB = document.querySelector(".pointB")
    ;

    plottedRoutes = ++plottedRoutes;

    //Caso já tenha sido calculado uma rota, escondo a div de instruções para que a mesma possa ser resetada
    if(instructions.style.display != "none") instructions.style.display = "none"

    //Se já existirem marcadores de rota na tela, removo eles
    if(rotaA != null && rotaB != null){
        rotaA.remove(); rotaB.remove();
    }

    //fazemos a requisição de rotas usando o perfil de carro(driving)
    let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordenadas[0].lng},${coordenadas[0].lat};${coordenadas[1].lng},${coordenadas[1].lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}&language=pt-BR`,
        req = new XMLHttpRequest()
    ;

    req.open('GET', url, true);
    req.onload = function() {

        let json = JSON.parse(req.response),
            data = json.routes[0],
            route = data.geometry.coordinates,
            geojson = {
                'type': 'Feature',
                'properties': {},
                'geometry': {'type': 'LineString', 'coordinates': route }
            }
        ;

        //se a rota já existir no mapa, setamos apenas a propriedade data
        if (map.getSource('route')) {
            
            map.getSource('route').setData(geojson);
        
        }else{

            //caso contrário, montaremos toda a estrutura do zero
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': { 'type': 'LineString', 'coordinates': geojson }
                    }
                },
                'layout': { 'line-join': 'round', 'line-cap': 'round'},
                'paint': {'line-color': '#c0392b', 'line-width': 5, 'line-opacity': 0.75 }
            });
        }

        // resultado com as instruções
        let steps = data.legs[0].steps, tripInstructions = [];

        //montamos o html com as instruções
        for (let i = 0; i < steps.length; i++) {
            tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';

            instructions.innerHTML = `
                <span class="duration" style="margin-bottom: 5px;">
                    <strong style="font-size: 13.5px; color: red;">Distancia:</strong>
                    <b style='font-size: 12px; color: orange;'>${Math.floor(data.distance / 1000)} Km </b>
                    <button type="button" class="close  btn-modal-school-close" data-dismiss="modal" aria-label="Close" style="float:right; padding-left:5px;" onclick="resetarRota()">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true" style="color: white;"></span>
                    </button>
                    <b style='font-size: 12px; color: orange; float: right;'>${Math.floor(data.duration / 60)} min </b>
                    <strong style="font-size: 13.5px; color: red; float:right;">Duração:&nbsp;</strong>
                    <i class="fa fa-car" aria-hidden="true" style="color: red; font-size: 12px;"></i>
                </span>
                ${tripInstructions}
            `;
        }

        let pointA = document.createElement('div'), pointB = document.createElement('div');

        pointA.className = 'pointA';
        new mapboxgl.Marker(pointA)
            .setLngLat([coordenadas[0].lng, coordenadas[0].lat])
            .addTo(map)
        ;

        pointB.className = 'pointB';
        new mapboxgl.Marker(pointB)
            .setLngLat([coordenadas[1].lng, coordenadas[1].lat])
            .addTo(map)
        ;

        if(plottedRoutes == 1) return calculadorDeRotas(coordenadas);

        instructions.style.display = ""; //Retiro o display none da minha div instructions
    };
    req.send();
}


// EXIBE A MODAL COM AS INFORMAÇÕES DO MARCADOR E POSSIBILITA QUE O USUÁRIO CRIE A SUA ROTA
const showPopupMarker = function(posicao){
    let pos = Number(posicao);
    document.querySelector('.btn-modal-school-open').click();
    document.querySelector("#ModalSchoolLabel").textContent = data[pos].escola;
    document.querySelector("#slideshow").innerHTML = `
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
            ${data[pos].imagens.length > 0 ?
                data[pos].imagens.map((value, index)=>{
                    return `<li data-target="#myCarousel" data-slide-to="${index}" class="${index == 0 ? 'active' : ''}"></li>`;
                }).join('') : `
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            `}
            </ol>
            <div class="carousel-inner">
            ${data[pos].imagens.length > 0 ?
                data[pos].imagens.map((value, index)=>{
                    return `
                        <div class="item ${index == 0 ? 'active' : ''}">
                            <img src="${value}" alt="${data[pos].escola}" style="width:100%; height:200px;">
                                <div class="carousel-caption">
                            </div>
                        </div>
                    `;
                }).join('') : `
                <div class="item active">
                    <img src="https://portal.crea-sc.org.br/wp-content/uploads/2017/11/imagem-indisponivel-para-produtos-sem-imagem_15_5.jpg" alt="${data[pos].escola}" style="width:100%; height:200px;">
                        <div class="carousel-caption">
                    </div>
                </div>
            `}
            </div>
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `;
    document.querySelector("#pi").innerHTML = `
        <div>&#127891; <strong>PI: </strong>${data[pos].pi}</div>
    `;
    document.querySelector("#execucao").innerHTML = `
        <div>&#128119; <strong>Execução: </strong>${data[pos].execucao}%</div>
    `;
    document.querySelector("#situacao").innerHTML = `
        <div>&#128172; <strong>Situação: </strong>${data[pos].situacao == '' ? 'Não informada' : data[pos].situacao}</div>
    `;
    document.querySelector("#select-origem").innerHTML = `
        ${viewedPoints.length > 0 ?
            viewedPoints.map((value)=>{
                return `
                    <option value="${value}" ${value == pos ? 'selected' : ''}>${data[value].escola}</option>
                `;
            }).join('') : ''}
    `;
    document.querySelector("#select-destino").innerHTML = `
        ${data.length > 0 ?
            viewedPoints.map((value, index)=>{
                return `
                    <option value="${value}" ${index == 0 ? 'selected' : ''}>${data[value].escola}</option>
                `;
            }).join('') : ''}
    `;
}   


// CAPTURA AS COORDENADAS DA COMBO ORIGEM E DESTINO E REPASSA AO MOTOR DE TRAÇAR DE ROTAS
const preparaRota = function(event){
    event.preventDefault();

    let posO = Number(document.querySelector("#select-origem").value),
        posD = Number(document.querySelector("#select-destino").value),
        arr = [data[posO], data[posD]];

    if(posO == posD){
        swal("Atenção", "Origem igual ao Destino!", "warning");
        return false;
    }

    pontosDePassagem = [];
    arr.forEach(({latitude, longitude})=>{
        setTimeout(()=>capturaLatLng(latitude, longitude), 150);
    });
}


// RESETA AS ROTAS TRAÇADAS
const resetarRota = () => montaMapa();


// INVERTE A ORDEM DOS COMBOS DE ORIGEM E DESTINO
const inverteRota = function(){
    let origem = document.querySelector("#select-origem").value,
        destino = document.querySelector("#select-destino").value;
    document.querySelector("#select-origem").value = destino;
    document.querySelector("#select-destino").value = origem;
}


// LOCALIZA OS DISPOSITIVOS EM TEMPO REAL
const localizaDispositivo = function(device_id){

    if(document.querySelector(".point-user-device") != null){
        document.querySelector(".point-user-device").remove();
    }

    let ajax = new XMLHttpRequest();
    ajax.open("POST", "./servidor.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`funcao=localizar&device_id=${device_id}`);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            let data = JSON.parse(ajax.responseText);

            if(data.success){
                let pointUserDevice = document.createElement('div');
                pointUserDevice.className = 'point-user-device';

                new mapboxgl.Marker(pointUserDevice)
                    .setLngLat([data.latitude, data.longitude])
                    .addTo(map);

                //centraliza o mapa na localização do dispositivo e aplica um zoom de 20x
                map.flyTo({center:[data.latitude, data.longitude], zoom: 20});

                //reseta combo de usuários
                document.querySelector("#user-device-select").value = "";
            }else{
                swal("Atenção", "Este usuário encontra-se desconectado!", "warning");
            }
        }
    }
}


// REDIMENSIONA O TAMANHO DA MODAL DE ACORDO COM O RESIZE DA TELA
const redimensionar = function(){
    setTimeout(()=>{
        let windowWidth = window.innerWidth,
            windowHeight = window.innerHeight
        ;

        // document.getElementById("map").style.width = `${windowWidth}px`;
        // document.getElementById("map").style.height = `${windowHeight}px`;
        map.resize();
    }, 300);
}


//SÓ É DISPARADO QUANDO TODO O CONTEÚDO É CARREGADO (INCLUINDO IMAGENS, VÍDEOS, ETC).
window.onload = function() {

    document.querySelector("body").setAttribute("onresize", "redimensionar()");

    document.querySelector("#radius-select").addEventListener("change", ()=>{
        raio = Number(document.querySelector("#radius-select").value);
        if(raio != "") montaMapa();
    });

    document.querySelector("#user-device-select").addEventListener("change", ()=>{
        device_id = document.querySelector("#user-device-select").value;
        if(device_id != "") localizaDispositivo(device_id)
    });

    montaMapa();
};

// window.onbeforeunload = (e) => e.preventDefault();






