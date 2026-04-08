# Projeto-escola.buss

Este é um aplicativo web simples para rastreamento de ônibus escolar, desenvolvido com HTML, CSS e JavaScript. Utiliza a biblioteca Leaflet para exibir um mapa interativo baseado no OpenStreetMap.

## Funcionalidades

- Tela inicial com título "escola.buss"
- Mapa interativo centralizado em Almirante Tamandaré - PR
- 5 ônibus escolares em movimento simultâneo, cada um seguindo sua rota específica
- Movimento suave entre pontos das rotas
- Marcadores para as escolas com popups informativos
- Layout responsivo e bonito

## Estrutura do Projeto

- `index.html`: Estrutura HTML da página
- `style.css`: Estilos CSS para o layout
- `script.js`: Lógica JavaScript para inicializar o mapa e controlar os ônibus

## Como Rodar o Projeto

1. Certifique-se de que você tem um navegador web moderno instalado (como Chrome, Firefox ou Edge).

2. Abra o arquivo `index.html` diretamente no navegador:
   - Navegue até a pasta do projeto.
   - Clique duas vezes no arquivo `index.html` ou arraste-o para a janela do navegador.

3. Alternativamente, se você estiver usando um servidor local (recomendado para evitar problemas de CORS em alguns casos):
   - Instale um servidor simples, como o `http-server` via npm: `npm install -g http-server`
   - Na pasta do projeto, execute: `http-server`
   - Abra o navegador e acesse `http://localhost:8080` (ou a porta indicada).

4. O mapa será carregado automaticamente, centralizado em Almirante Tamandaré - PR, com os ônibus em movimento.

## Dependências

- Leaflet (incluído via CDN)
- OpenStreetMap (tiles gratuitos)

## Notas

- O projeto é puramente front-end e não requer backend para funcionamento básico.
- Para funcionalidades avançadas de rastreamento em tempo real, seria necessário integrar com um backend e APIs de GPS.