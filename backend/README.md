Backend README
# 🛠️ Travel_App - Backend


O backend do Travel_App fornece a API REST, gerenciamento de banco de dados SQLite, validação de dados com Zod e documentação via Swagger.

## 📂 Estrutura do Backend
backend/
├─ src/
│  ├─ controllers/
│  ├─ services/
│  ├─ utils/
│  ├─ routes/
│  ├─ index.ts
├─ .env             # Variáveis de ambiente
├─ package.json
├─ tsconfig.json
└─ README.md

## ⚙️ Funcionalidades

API REST para gerenciamento de países visitados e lista de desejos

Validação de dados com Zod

Banco de dados SQLite para persistência

Documentação da API via Swagger (http://localhost:8000/api-docs)

Tratamento de erros centralizado

## 📦 Instalação

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:
 ```bash
yarn install
```

Crie o arquivo .env com as variáveis necessárias:

```bash
PORT=8000
DB_PATH=./database.sqlite
```

Rode o servidor:

```bash
yarn run dev
```

O servidor estará disponível em http://localhost:8000.

## 🗄️ Banco de Dados

Utiliza SQLite.

Cria automaticamente as tabelas visited_countries e wishlist_countries se não existirem.

Estrutura das tabelas:

```bash
CREATE TABLE visited_countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country_code TEXT UNIQUE,
  name TEXT,
  flag TEXT,
  capital TEXT,
  region TEXT,
  population INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishlist_countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country_code TEXT UNIQUE,
  name TEXT,
  flag TEXT,
  capital TEXT,
  region TEXT,
  population INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔗 Rotas da API

Países Visitados

```bash
GET /api/countries/visited → Lista todos os países visitados

POST /api/countries/visited → Adiciona um país aos visitados

DELETE /api/countries/visited/:countryCode → Remove um país da lista de visitados
```

Lista de Desejos

 ```bash
GET /api/countries/wishlist → Lista todos os países na lista de desejos

POST /api/countries/wishlist → Adiciona um país à lista de desejos

DELETE /api/countries/wishlist/:countryCode → Remove um país da lista de desejos
```

Busca de Países

```bash
GET /api/countries/search?name=<nome> → Busca países pelo nome
```
## 🛠️ Validação de Dados

📄 Licença

MIT License
