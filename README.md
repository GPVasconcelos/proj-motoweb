
# 🚀 MotoWeb — Plataforma de Gestão de Entregas

O **MotoWeb** é uma plataforma desenvolvida para conectar empresas de logística, clientes e motoboys, oferecendo uma solução eficiente para gestão de entregas. A aplicação é **multiplataforma**, composta por:

- 🖥️ **Frontend Web (Angular)** — Interface para Cliente e Central.
- 📱 **Aplicativo Mobile (React Native + Expo)** — Interface para Motoboy.
- 🔗 **API Backend (NestJS + Prisma)** — Gerenciamento dos dados e integrações.

## 🗂️ Estrutura dos Repositórios

```
/motoweb-api      → Backend (NestJS + Prisma)
/motoweb-web      → Frontend (Angular)
/motoweb-app      → Mobile (React Native + Expo)
```

## 🧠 Tecnologias Utilizadas

- **Backend:** NestJS + Prisma + PostgreSQL
- **Frontend Web:** Angular + Typescript
- **Mobile:** React Native + Expo + Typescript
- **Outros:** Axios, AsyncStorage, JWT, Expo Router

## 🔥 Clonando o Projeto

1️⃣ Clone o repositório:
```bash
git clone https://github.com/GPVasconcelos/proj-motoweb.git
cd proj-motoweb
```

2️⃣ Acesse as pastas individualmente para configurar cada ambiente:
- `motoweb-api`
- `motoweb-web`
- `motoweb-app`

## 🛠️ Configuração do Backend — API NestJS

### 📍 Acesse a pasta:
```bash
cd motoweb-api
```

### 📦 Instale as dependências:
```bash
npm install
```

### 🗄️ Configure o banco de dados:

1. Crie um banco PostgreSQL local ou em nuvem.

2. Configure a variável de ambiente `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/motoweb"
JWT_SECRET="sua senha"
```

### 🔄 Execute as migrations Prisma:
```bash
npx prisma migrate dev --name init
```

### 🚀 Execute a API:
```bash
npm run start:dev
```

> API estará disponível em:  
`http://localhost:3000`

## 🌐 Configuração do Frontend Web — Angular

### 📍 Acesse a pasta:
```bash
cd motoweb-web
```

### 📦 Instale as dependências:
```bash
npm install
```

### 🔗 Configure o ambiente:

Edite o arquivo:
```bash
src/app/core/service/api.service.ts
```
Exemplo:
```ts
export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000', // ← ajuste se necessário
    });
  }
```

### 🚀 Rode o projeto:
```bash
ng serve
```

> Acesse no navegador:  
`http://localhost:4200`

## 📱 Configuração do Mobile — React Native com Expo

### 📍 Acesse a pasta:
```bash
cd motoweb-app
```

### 📦 Instale as dependências:
```bash
npm install
```

### 🔗 Configure o backend da API:

No arquivo:
```ts
/src/services/api.ts
```
Configure o IP local:
```ts
const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL:3000',  // ← Troque pelo IP da sua máquina na rede
});
```
> ⚠️ O **localhost** não funciona no dispositivo físico.  
Use o IP da rede local.

### 🚀 Execute o projeto:
```bash
npx expo start
```

- Escaneie o QR Code usando o app **Expo Go** no celular  
ou  
- Rode no emulador Android/iOS.

## ✅ Funcionalidades Implementadas

- 🔐 Login e autenticação via JWT.
- 🚚 Gerenciamento de entregas.
- 🔄 Atualização de status das entregas.
- 🛵 Gerenciamento de veículos.
- 🗂️ Interface web para Centrais e Clientes.
- 📱 Interface mobile para Motoboys.

## 💡 Considerações Finais

- ✔️ Projeto desenvolvido com foco em aprendizado acadêmico.
- ✔️ Arquitetura organizada, seguindo boas práticas.
- ✔️ Permite expansão futura.

## 🤝 Colaboração

Contribuições são bem-vindas!  
Sinta-se livre para abrir issues ou enviar pull requests.

## 🔗 Contato

- Desenvolvido por **Guilherme Poit Vasconcelos** — [GitHub](https://github.com/GPVasconcelos)
- Desenvolvido por **Gustavo Oliveira** — [GitHub](https://github.com/Gholiveira6)

