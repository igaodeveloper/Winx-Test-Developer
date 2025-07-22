# Backend - Product API

API RESTful para gerenciamento de produtos usando Node.js, TypeScript, Supabase e PostgreSQL.

## Requisitos
- Node.js 18+
- Conta e projeto no [Supabase](https://supabase.com/)

## Setup

```bash
cd backend
cp .env.example .env
npm install
```

Configure as variáveis de ambiente no arquivo `.env`.

## Scripts

- `npm run dev` — inicia o servidor em modo desenvolvimento
- `npm run build` — compila o projeto para produção
- `npm start` — executa o build
- `npm test` — executa os testes

## Endpoints

- `GET /products` — lista produtos (paginação, filtros, busca)
- `GET /products/:id` — detalhes do produto
- `POST /products` — cria produto
- `PUT /products/:id` — atualiza produto
- `DELETE /products/:id` — remove produto

Documentação Swagger disponível em `/docs` após rodar o servidor.

## Estrutura

- `src/controllers` — lógica dos endpoints
- `src/services` — regras de negócio
- `src/repositories` — acesso ao banco (Supabase)
- `src/utils` — DTOs, tipos, helpers
- `src/config` — configuração do Supabase
- `src/middlewares` — middlewares Express
- `src/routes` — rotas Express
- `src/tests` — testes

## Migrações

Crie a tabela `products` no Supabase:

```sql
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  categoryId text not null,
  price numeric not null,
  imageUrl text not null,
  createdAt timestamp with time zone default now(),
  updatedAt timestamp with time zone default now()
);
```

## Observações
- Use as chaves do Supabase no arquivo `.env`
- Para autenticação, adapte o middleware conforme necessário
- Estrutura pronta para escalar e manter 