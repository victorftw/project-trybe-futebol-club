Nesse projeto foi construido um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento respeitou as regras de negócio providas no projeto e a API foi capaz de ser consumida por um front-end já provido nesse projeto.

<details>
  <summary><strong> Tecnologias utilizadas</strong></summary><br />
  
- `Node.js`
- `TypeScript`
- `JWT`
- `Sequelize`
- `POO`
- `S.O.L.I.D`
- `Arquitetura MSC`
- `docker`
- `docker-compose`
- `MySql`
- `Express`;

</details>

<details>
  <summary><strong>Como rodar o projeto</strong></summary></br>

  **Com Docker:**

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

- `npm run compose:up` na raiz do projeto;
- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `docker exec -it app_backend sh` em ./app/backend;
- `npm run build` no container do backend;
- `npm run db:reset` no container do backend;

**Localmente:**

- `npm run install:apps` na raiz do projeto para instalar dependências do front e back-end;
- `npm run compose:up` na raiz do projeto;
- `npm run build` em app/frontend

</details>
