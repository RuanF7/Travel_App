Backend README
🛠️ Travel_App - Backend




O backend do Travel_App fornece a API REST, gerenciamento de banco de dados SQLite, validação de dados com Zod e documentação via Swagger.

📂 Estrutura do Backend
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

⚙️ Funcionalidades

API REST para gerenciamento de países visitados e lista de desejos

Validação de dados com Zod

Banco de dados SQLite para persistência

Documentação da API via Swagger (http://localhost:8000/api-docs)

Tratamento de erros centralizado

📦 Instalação

Entre na pasta do backend:

cd backend


Instale as dependências:

npm install


Crie o arquivo .env com as variáveis necessárias:

PORT=8000
DB_PATH=./database.sqlite
NODE_ENV=development


Compile o TypeScript (opcional se usar ts-node):

npx tsc


Rode o servidor:

npm run dev
# ou se compilado
node dist/index.js


O servidor estará disponível em http://localhost:8000.

🗄️ Banco de Dados

Utiliza SQLite.

Cria automaticamente as tabelas visited_countries e wishlist_countries se não existirem.

Estrutura das tabelas:

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

🔗 Rotas da API
Países Visitados

GET /api/countries/visited → Lista todos os países visitados

POST /api/countries/visited → Adiciona um país aos visitados

DELETE /api/countries/visited/:countryCode → Remove um país da lista de visitados

Lista de Desejos

GET /api/countries/wishlist → Lista todos os países na lista de desejos

POST /api/countries/wishlist → Adiciona um país à lista de desejos

DELETE /api/countries/wishlist/:countryCode → Remove um país da lista de desejos

Busca de Países

GET /api/countries/search?name=<nome> → Busca países pelo nome

🛠️ Validação de Dados

Todos os países passam por Zod para garantir que country_code, name e flag estejam corretos.

Exemplo:

import { z } from 'zod';

export const countrySchema = z.object({
  country_code: z.string().min(2).max(3),
  name: z.string().min(1),
  flag: z.url(),
});

📄 Licença

MIT License