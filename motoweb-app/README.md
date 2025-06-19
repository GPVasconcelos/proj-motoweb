# 📱 MotoWeb App - React Native

Aplicativo mobile desenvolvido com **React Native + Expo**, voltado para entregadores (motoboys) que atuam na plataforma **MotoWeb**. O app permite acompanhar entregas, aceitar entregas e atualizar status.

> 🎯 Projeto acadêmico | Engenharia de Software - Faculdade Assis Gurgacz - FAG (2025)

---

## 📌 Sobre

Este aplicativo é o módulo **Motoboy** da plataforma **MotoWeb**, onde os entregadores acessam suas entregas em tempo real, notificações, status, histórico e dados do veículo.

O app consome uma **API RESTful desenvolvida em NestJS**, hospedada no [Railway](https://railway.app/).

---

## 🚀 Funcionalidades

- **Autenticação JWT** via login
- **Listagem de entregas pendentes**
- **Aceitação de entrega**
- **Início e conclusão de rota**
- **Atualização de status da entrega**
- **Histórico de entregas finalizadas**
- **Gerenciamento de veículo**
- **Notificações de novas entregas**

---

## 📷 Telas

- **Login**
- **Lista de entregas disponíveis**
- **Detalhes da entrega**
- **Histórico**
- **Perfil do motoboy**
- **Tela de erro / conexão**
- **SplashScreen com carregamento**

---

## 🔗 Endpoints Consumidos

Abaixo estão os endpoints da API utilizados pelo app mobile (módulo motoboy):

 🔐 Autenticação

````
POST   /auth/login
GET    /motoboy/user/{userId}
````

🧍 Motoboy (perfil)
````
GET    /motoboy
GET    /motoboy/{id}
POST   /motoboy
PATCH  /motoboy/{id}
DELETE /motoboy/{id}
````

🛵 Veículos
````
POST   /motoboy/{id}/vehicles
GET    /motoboy/{id}/vehicles
PATCH  /motoboy/{id}/vehicles/{vehicleId}
DELETE /motoboy/{id}/vehicles/{vehicleId}
````

📦 Entregas
````
GET    /motoboy/{id}/delivery               
PATCH  /motoboy/{id}/delivery/{deliveryId}/status
````
---

## 🛠️ Tecnologias

- React Native
- Expo
- TypeScript
- Axios
- React Navigation
- Expo Router
- Context API

---

## 🏗️ Estrutura de Pastas
````
motoweb-app/
├── app/                 
│   ├── _layout.tsx      
│   ├── index.tsx        
│   ├── dashboard.tsx    
│   ├── entregas.tsx     
│   ├── veiculos.tsx     
│   └── (auth)/         
├── assets/              
├── components/         
├── constants/        
├── hooks/               
├── scripts/             
├── src/                
├── app.json           
├── eas.json           
├── package.json
├── README.md
````
---

## 📲 Instalar o App

Você pode baixar o APK diretamente neste link:

👉 **[Clique aqui para baixar o APK](https://expo.dev/accounts/gholiveira/projects/motoweb-app/builds/044bb1b6-ccbe-44ff-bd83-9807b8b331ad)**

> Compatível com Android   
> Basta instalar e permitir a origem desconhecida no primeiro uso.

---

👨‍💻 Autores
- Desenvolvido por **Guilherme Poit Vasconcelos** — [GitHub](https://github.com/GPVasconcelos)
- Desenvolvido por **Gustavo Oliveira** — [GitHub](https://github.com/Gholiveira6)

📜 Licença
Uso educacional. Projeto acadêmico da Faculdade Assis Gurgacz (FAG) - 2025.
