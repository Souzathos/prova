# Pré requisitos
## node v18+
## banco mysql rodando no pc

# Instalação do front
*Para conseguir rodar o projeto, siga os seguintes passos:*
- Entrar na pasta do frontend. No terminal: cd frontend
- Instalar as dependências. No terminal (ainda dentro da pasta): npm install
- Rodar o projeto. No terminal (na mesma pasta): npm run dev
- Após isso, acesse localhost:5173 no navegador.

## O senac wedding trata-se de um sistema de checkin de convidados para um casamento. Contendo cargos diferentes de usuário (administrador e recepcionista), que contém diversas funções para cada
- Admin: Pode cadastrar, visualizar/buscar convidados por nome (em tempo real), fazer checkin, deletar e editar convidados.
- Recepcionista: Pode apenas visualizar/buscar convidados por nome (em tempo real) e realizar checkin.

## Telas permitidas para o administrador
- Dashboard (Ver dados reais com base no banco de dados, como total de convidados, total de convidados confirmados (com checkin realizado) e os convidados pendentes(os que nao fizeram checkin). Todos esses dados vem do backend via integração com fetch).
- Admin (criar, atualizar, ou deletar convidados, tendo tambem o numero total, de confirmados e os pendentes).
- Recepção (Visualizar e buscar convidados por nome, ou realizar o checkin).

## Telas permitidas para o recepcionista
- Recepção (Visualizar e buscar convidados por nome, ou realizar o checkin).

## Tecnologias utilizadas
### frontend: Reaxt.js, tailwindCSS
### backend: Typescript, node.js, typeORM
