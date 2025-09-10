# 🌍 Travel_App - Frontend

**O frontend do Travel_App** é construído em React com TypeScript e Tailwind CSS. Ele se conecta à API do backend para gerenciar países visitados, lista de desejos, mapa e estatísticas.

## 📂 Estrutura do Frontend
frontend/
├─ src/
│  ├─ components/
│  ├─ hooks/
│  ├─ services/
│  ├─ App.tsx
│  ├─ index.tsx
├─ .env             # Variáveis de ambiente
├─ package.json
├─ tsconfig.json
└─ README.md

## ⚙️ Funcionalidades

Busca de países com sugestões automáticas

Adicionar/remover países visitados

Adicionar/remover países na lista de desejos

Visualização de mapa mundial interativo

Estatísticas de países visitados e desejados

Notificações para ações realizadas

Persistência via API do backend

## 📦 Instalação

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
yarn install
```

Crie o arquivo .env com as variáveis necessárias:

```bash
REACT_APP_API_BASE_URLL=http://localhost:8000/api
```

Rode a aplicação:

```bash
yarn start
```

O frontend estará disponível em http://localhost:3000.

## 🛠️ Estrutura de Componentes

#### CountryCard → Exibe informações do país e botões de ação

#### CountryList → Lista países visitados ou da lista de desejos

#### SearchBar → Busca países e mostra sugestões

#### WorldMap → Mapa mundial com cores para visitados e desejos

#### MapStats → Estatísticas de países visitados/desejados

#### Hooks → useCountries, useDebounce, useWorldMap para gerenciamento de estado e lógica

## 🔗 Integração com Backend

O frontend consome as rotas do backend via Axios.

Todas as ações (adicionar, remover, buscar) passam pelos endpoints do backend.

É necessário que o backend esteja rodando para o frontend funcionar corretamente.

💡 Observações

O frontend utiliza Tailwind CSS para estilização e responsividade.

Todas as interações atualizam a interface em tempo real.

Notificações informam sobre sucesso ou falha das ações.

O mapa mundial utiliza IDs de países para colorir visitados e desejos.

📄 Licença

MIT License
