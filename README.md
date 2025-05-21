🛵 MotoWeb
Plataforma para gerenciamento de entregas por motoboy, com painel mobile desenvolvido em React Native (Expo) e API em Node.js (NestJS).

📦 Estrutura do Projeto
bash
Copiar
Editar
proj-motoweb/
├── motoweb-api/         # Back-end (NestJS)
└── front-react/         # Front-end mobile (Expo Router + React Native)
🚀 Tecnologias
Back-end (motoweb-api)
Node.js

NestJS

TypeORM

PostgreSQL

JWT Authentication

Front-end (front-react)
React Native com Expo

Expo Router (navegação por rotas de arquivos)

Axios

TypeScript

🔧 Instalação
Pré-requisitos
Node.js v18+

Expo CLI (npm install -g expo-cli)

PostgreSQL

Yarn ou npm

📁 Clone o repositório
bash
Copiar
Editar
git clone https://github.com/GPVasconcelos/proj-motoweb.git
cd proj-motoweb
🔙 Back-end – motoweb-api
bash
Copiar
Editar
cd motoweb-api
npm install
# ou yarn install

# Configure o banco em .env
cp .env.example .env

# Rode as migrations
npm run typeorm migration:run

# Inicie o servidor
npm run start:dev
A API ficará disponível em http://localhost:3001

📱 Front-end – front-react
bash
Copiar
Editar
cd ../front-react
npm install
# ou yarn install

# Inicie o app
npx expo start
Abra o app no emulador, navegador ou celular com o app Expo Go.

📚 Funcionalidades
 Cadastro e listagem de usuários

 Visualização de entregas e detalhes

 Design responsivo e navegação fluída

 Tela de login (em construção)

 Dashboard de entregas

🗂️ Estrutura de pastas (front)
bash
Copiar
Editar
front-react/
├── app/                # Páginas e rotas com Expo Router
│   ├── index.tsx       # Página inicial
│   ├── usuarios/
│   │   ├── index.tsx   # Lista de usuários
│   │   └── [id].tsx    # Detalhes de usuário
├── components/         # Componentes reutilizáveis
├── constants/          # Configuração da API
├── ...
🧪 Rotas da API (exemplo)
bash
Copiar
Editar
GET    /usuarios
GET    /usuarios/:id
POST   /usuarios
GET    /entregas
POST   /entregas
👥 Contribuidores
@GPVasconcelos

@Gholiveira6
