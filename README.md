# Gerenciamento de Estoque

Sistema de gerenciamento de estoque para e-commerce e lojas, desenvolvido com React, TypeScript, Node.js e MySQL.

## Tecnologias

** Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM

** Backend**
- Node.js + Express
- Prisma ORM
- MySQL

## Funcionalidades

-  **Produtos** — cadastro, edição e exclusão com categoria e preços
-  **Categorias** — organização dos produtos por categoria
-  **Movimentações** — registro de entradas e saídas com histórico
-  **Alertas** — indicador automático de estoque baixo
-  **Dashboard** — visão geral com totais, valor em estoque e alertas

##  Arquitetura do Backend

```
Route → Controller → Service → Banco de Dados
```

## Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- MySQL

### Backend

```bash
cd backend
npm install
```

Configure o `.env`:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/gerenciamento_estoque"
```

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## Autor

Felipe Buzo — [GitHub](https://github.com/Felipebuzo)
