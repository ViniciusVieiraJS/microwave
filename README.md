# 🔥 Microwave Project - Simulador de Micro-ondas Digital

Este projeto implementa um **simulador completo de micro-ondas digital**, com **interface web responsiva** e **API RESTful segura**. O sistema permite configurar e executar programas de aquecimento, com autenticação JWT e gerenciamento de receitas personalizadas.

---

## 📑 Índice

- [🚀 Tecnologias](#-tecnologias)
- [🏗 Arquitetura](#-arquitetura)
- [📋 Requisitos](#-requisitos)
- [🔧 Instalação](#-instalação)
- [🔙 Backend](#backend)
- [🌐 Frontend](#frontend)
- [🖥 Uso](#-uso)
- [🔐 Autenticação](#-autenticação)
- [📡 API Endpoints](#-api-endpoints)
- [✨ Funcionalidades](#-funcionalidades)
- [⚠️ Tratamento de Erros](#-tratamento-de-erros)
- [👤 Autor](#-autor)

---

## 🚀 Tecnologias

## 🔙 Backend
- [.NET 9 (ASP.NET Core)](https://dotnet.microsoft.com/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [SQL Server](https://www.microsoft.com/sql-server/)
- JWT Authentication

## 🌐 Frontend
- [Angular 19](https://angular.io/)
- TypeScript
- SCSS
- [Toastr](https://www.npmjs.com/package/ngx-toastr) para notificações

---

## 🏗 Arquitetura

O projeto segue uma **arquitetura em camadas**, promovendo **separação de responsabilidades**, **escalabilidade** e **facilidade de manutenção**:

- Controllers (camada de apresentação da API)
- Services (lógica de negócio)
- Repositories (acesso a dados)
- DTOs e Mapeamentos
- Autenticação e Autorização com JWT


---

## 📋 Requisitos

- [.NET SDK 9.0](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js 22+](https://nodejs.org/)
- Angular CLI 19+
- SQL Server (LocalDB ou instância completa)
- IDEs recomendadas: Visual Studio 2022 ou VS Code

---

## 🔧 Instalação

### Backend

1. **Clone o repositório**
   ```bash
   git clone https://github.com/ViniciusVieiraJS/microwave.git
   cd microwave/backend
   ```

2. **Configure a connection string**
   - Abra o arquivo `appsettings.json`
   - Este projeto utiliza User Secrets para esconder a ConnectionString e a JwtKey do banco de dados durante o desenvolvimento local.
   - String descriptografada (banco local):
     ```
     Server=localhost;Database=Microwave;Trusted_Connection=True;TrustServerCertificate=True;
     ```
   - JwtKey:
      ```
      b7f3e8c2a1d4f6e9b0c5a2e7d8f1c3b6a4e9d2c7b1f5e3a8c6d0b2f4e7a1c9d3
      ```

# Caso não esteja utilizando Visual Studio, é necessário baixar SQL Server Express caso deseje rodar localmente
   -Download: https://learn.microsoft.com/pt-br/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver17

3. **Execute as migrações**
   -Dentro do diretório raiz do backend, execute o seguinte comando:
   ```bash
   dotnet ef database update --project Microwave.EntityFrameworkCore --startup-project Microwave.WebHost
   ```

4. **Inicie o servidor**
   ```bash
   dotnet run
   ```
   > A API estará disponível em: `http://localhost:5204`

---

### Frontend

1. **Instale as dependências**
   ```bash
   cd microwave/frontend
   npm install
   npm install -g @angular/cli
   ```

2. **Inicie o servidor Angular**
   ```bash
   ng serve
   ```
   > A aplicação estará disponível em: `http://localhost:4200`

---

## 🖥 Uso

1. Acesse `http://localhost:4200` no navegador para acessar a interface do micro-ondas. Você deve se autenticar para utilizar as funcionalides.
2. Acesse o campo de registro, insira seus dados e confirme os dados.
3. Faça login com as credenciais padrão:
   - **Usuário:** `usuario`
   - **Senha:** `senha`
4. Após o login, você terá acesso à interface digital do micro-ondas.

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Tokens)** para autenticação segura:

- **Endpoint de login:** `POST /api/auth/login`
- **Duração do token:** 1 hora
- Todas as rotas protegidas requerem o envio do token no header `Authorization: Bearer <token>`

---

## 📡 API Endpoints

### 🔑 Autenticação
- `POST /api/auth/login` – Login de usuário
- `POST /api/auth/register` – Registro de novo usuário

### 🔥 Programas de Aquecimento
- `GET /api/heating-programs` – Listar todos os programas
- `GET /api/heating-programs/{id}` – Detalhar um programa
- `POST /api/heating-programs` – Criar programa
- `PUT /api/heating-programs/{id}` – Atualizar programa
- `DELETE /api/heating-programs/{id}` – Excluir programa

### 🧠 Operações do Micro-ondas
- `POST /api/microwave/start` – Iniciar aquecimento
- `PUT /api/microwave/pause` – Pausar aquecimento
- `PUT /api/microwave/increase30seconds` – Adicionar 30 segundos
- `DELETE /api/microwave/cancel` – Cancelar aquecimento

---

## ✨ Funcionalidades

### 🕹 Micro-ondas Digital
- Definir tempo entre **1 e 120 segundos**
- Controle de **potência de 1 a 10**
- Início rápido com botão de **30 segundos**
- **Caractere visual personalizável** durante o aquecimento
- Pausar, retomar e cancelar aquecimentos
- Progresso de aquecimento **em tempo real**

### 🍲 Programas de Aquecimento
- Criar e salvar programas favoritos
- Utilizar programas predefinidos
- Personalizar tempo e potência para diferentes alimentos

---

## ⚠️ Tratamento de Erros

- Exceções customizadas para validações e regras de negócio
- Mensagens de erro padronizadas
- Validação de dados com feedback detalhado para o usuário
- Exceções não tratadas salvos no banco de dados

---


## 👤 Autor

Desenvolvido por **Silvyo Vieira**.
