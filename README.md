# ![Cover](.github/assets/cover-nodejs.png)

## Sobre o projeto

O projeto Daily Diet é uma API RESTful que permite gerenciar refeições de usuários. Os usuários podem criar, editar, apagar, listar e visualizar suas refeições. A API também fornece métricas sobre as refeições de cada usuário, incluindo a quantidade total de refeições registradas, a quantidade total de refeições dentro da dieta, a quantidade total de refeições fora da dieta e a melhor sequência de refeições dentro da dieta.

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Fastify Cookie](https://www.npmjs.com/package/@fastify/cookie)
- [Knex.js](https://knexjs.org/)
- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/ladjs/supertest#readme)

*Opções de serviço de deploy*

- [Render](https://render.com/)
- [Fly](https://fly.io/)
- [Railway](https://railway.app/)



## Instalação

```sh
yarn
```

## Comandos

```bash
# Iniciar arquivo de configurações do typescript
$ npx tsc --init

# Comando para identificar erros de lint
$ yarn eslint src --ext .ts

# Comando para identificar erros de lint e corrigir
$ yarn eslint src --ext .ts --fix

# Criar uma migrate
$ npx knex migrate:make create_users_and_meals_tables

# Executar a migration
$ yarn knex migrate:latest

# Desfazer a  ultima migration
$ yarn knex migrate:rollback


```
## Requisitos


<details>
<summary>Clique aqui para visualizar</summary>

```mdx
 RF:  Requisitos Funcionais
 RNF: Requisitos Não Funcionais
 RN:  Regra de negócio (não deve possuir termos muito técnicos)
```

### Transação

- [x] **RF**
  - [x] Deve ser possível criar um usuário
  - [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
  - [x] Deve ser possível editar uma refeição, podendo alterar todos os dados
  - [] Deve ser possível apagar uma refeição
  - [x] Deve ser possível listar todas as refeições
  - [] Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta
- [x] **RN**
  - [x] Deve ser possível identificar o usuário entre as requisições
  - [x] As refeições devem ser relacionadas a um usuário.
  - [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

</details>

## Contribuição

Contribuições são bem-vindas!

Para contribuir, basta abrir uma issue ou pull request neste repositório.

## Autor
|  [<img loading="lazy" src="https://github.com/MauricioAires.png" width=115><br><sub>Mauricio Aires 👋🏽</sub>](https://github.com/MauricioAires) |
|  :---: |
