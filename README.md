# 🌍 Travel_App

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)

**Travel_App** é um gerenciador de países visitados e lista de desejos de viagem.  
O projeto permite buscar países, marcar como visitados, adicionar à lista de desejos, visualizar estatísticas e um mapa mundial interativo.

> Este README é o **guia principal** do projeto. O projeto está dividido em **frontend** e **backend**, cada um com seu próprio README detalhado. Para rodar o projeto corretamente, é essencial ler os READMEs específicos.

---

### ⚙️ Configurar a versão do Node

O projeto utiliza uma versão específica do Node definida no arquivo `.nvmrc`.  
Se você estiver usando NVM, execute:

### ⚡ Rodando Backend e Frontend

O projeto é dividido em **backend** e **frontend**, que devem ser executados separadamente:

1. **Backend**
2. 
```bash
cd backend
nvm install
nvm use
yarn install
yarn run dev
```

1. **Frontend**
```bash
cd frontend
nvm install
nvm use
yarn install
yarn start
```
## 🔹 Funcionalidades

- Busca de países por nome
- Listagem de países visitados
- Lista de desejos de viagem
- Adição e remoção de países das listas
- Mapa mundial interativo com cores diferentes para visitados e desejos
- Estatísticas de países visitados e desejados
- Notificações para ações realizadas (adicionar, remover, erro)
- Armazenamento persistente via SQLite (backend)

---

## 📁 Estrutura do Projeto

Travel_App/
├─ backend/ 
├─ frontend/
├─.gitignore
├─ README.md



## ⚡ Tecnologias Utilizadas

- **Frontend:** React, TypeScript, Tailwind CSS, Axios
- **Backend:** Node.js, Express, SQLite, Zod (validação), dotenv
- **Documentação da API:** Swagger/OpenAPI (disponível em http://localhost:8000/api-docs)
- **Controle de versão:** Git, GitHub

## 🚀 Como Começar

### 1. Clonar o repositório
```bash
git clone https://github.com/RuanF7/Travel_App.git
cd Travel_App
```

### 2. Configurar backend e frontend
Entre nas pastas backend e frontend separadamente e siga as instruções dos READMEs específicos.

É essencial configurar os arquivos .env em ambos os projetos para que tudo funcione corretamente.

📚 Leitura Recomendada  

README do Backend: Contém instruções detalhadas de instalação, configuração, banco de dados, rotas da API, variáveis de ambiente e como rodar o servidor.  

README do Frontend: Contém instruções detalhadas de instalação, configuração, variáveis de ambiente, execução da aplicação e uso dos componentes principais.

💡 Observações  

O projeto utiliza SQLite para persistência local, então é necessário garantir que o banco de dados seja criado corretamente (o backend cria automaticamente se não existir).

Todas as interações de adicionar/remover países são refletidas no mapa mundial e nas estatísticas em tempo real.

Notificações informam o usuário sobre o sucesso ou falha das ações.
