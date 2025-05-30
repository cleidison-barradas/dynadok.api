## Como Executar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/dynadok.api.git
cd dynadok.api
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**

- Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário.

4. **Execute o docker compose para subir os containers MongoDB, Redis e RabbitMQ:**

```bash
docker-compose up -d
```

5. **Inicie o servidor:**

```bash
npm run start:dev
# ou
yarn start:dev
```

6. **Acesse a aplicação:**

- As rotas da API estão disponíveis em `http://localhost:8000/api/users/` (ou porta configurada).
