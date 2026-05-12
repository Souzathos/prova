# Back-end do Wedding pass!


## Para iniciar o projeto, siga as instruções abaixo:
- 1º Para baixar as dependenicas, entre na pasta e rode: npm i
- 2º Configure o .env: Crie o arquivo .env na pasta "src", e coloque as seguintes informações: DB_HOST=localhost
DB_PORT=3306
DB_NAME=prova
DB_USERNAME=root
DB_PASSWORD=root

JWT_SECRET=supersegredo
JWT_EXPIRES_IN=86400

PORT=3000

- 3º Após instalar as dependencias e configurar o .env, para iniciar o projeto rode: npm run dev


## Mesmo com o typeORM criando as tabelas, segue o script do banco de dados (mysql), com as tabelas e inserts dos usuários/convidados.:
CREATE SCHEMA IF NOT EXISTS prova;
USE prova;

CREATE TABLE IF NOT EXISTS guests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(11) NOT NULL UNIQUE,
  table_number INT NOT NULL,
  checked_in BOOLEAN NOT NULL DEFAULT false
 );


CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'recepcionista') NOT NULL
);


INSERT INTO guests (name, email, phone, table_number, checked_in) VALUES ('convidado 1', 'convidado1@gmail.com', '51299999999', 1, false);
INSERT INTO guests (name, email, phone, table_number, checked_in) VALUES ('convidado 2', 'convidado2@gmail.com', '51399999999', 2, false);
INSERT INTO guests (name, email, phone, table_number, checked_in) VALUES ('convidado 3', 'convidado3@gmail.com', '51499999999', 3, false);
INSERT INTO guests (name, email, phone, table_number, checked_in) VALUES ('convidado 4', 'convidado4@gmail.com', '51599999999', 3, false);
INSERT INTO guests (name, email, phone, table_number, checked_in) VALUES ('convidado 5', 'convidado5@gmail.com', '51699999999', 5, false);



INSERT INTO users (name, email, cpf, password, role) VALUES ("admin", "admin@gmail.com", "12345678910", "$2b$10$IJLtkIJBWXVMIkGVDuNQn.e/dv9W9QlWpYSH3g59PqQM3MnNx6YM6", "admin")

INSERT INTO users (name, email, cpf, password, role) VALUES ("recepcionista", "recepcionista@gmail.com", "12345678911", "$10$Ettd1ukEqORFFUDb7lEj5.VtjHnUuQMI/IeB5/tsZsJfO0tfZ.Tki", "recepcionista")

### Para rodar, cole esse script dentro do mysql workbench, e clique no primeiro icone de raio que fica no header do arquivo.

## Rotas
*LEMBRE-SE de adicionar o token da respectiva role necessária para realizar a rota (mencionado abaixo quais roles são permitidas para suas respectivas rotas), adicione o token na sua rota em Auth -> Bearer -> (seu token) OU Headers -> (adicionar novo campo) header -> Authorization | value -> (seu token) . O token é entregue no body ao fazer login como user. admin e recepcionista tem tokens diferente a cada vez que fazem login.*
### Login de usuário
- método: POST http://localhost:3000/user/login
- No body, coloque email e senha. 
ex: {
    "email": "admin@gmail.com",
    "password": "12345678"
}

### Cadastro de Convidado - Somente admin permitido
- método: POST http://localhost:3000/guest/register
- no body, coloque informações necessárias para o cadastro do convidado.
ex: {
    "name": "convidado 1",
    "email": "convidado1@gmail.com",
    "phone": "51999999999",
    "table_number": 5,
}

## Listagem de convidados - Admin e Recepcionista permitidos
- Método: GET http://localhost:3000/guest/list (isso para listar todos os convidados.)
- Método: GET http://localhost:3000/guest/list?name=convidado 1 (isso vai listar o convidado pelo nome buscado nos parametros da URL, nesse exemplo, retornaria o convidado 1)
- Neste método nao é necessario body.

## Edição de convidados - Somente admin permitido
- Método: PUT http://localhost:3000/guest/update/:id
- Nesse método, devemos passar o id do convidado que desejamos atualizar.
- no body, coloque as informações que deseja que sejam alteradas.
ex: {
    "name": "convidado 1 atualizado"
}

## Exclusão de convidado - Somente admin permitido
- Método: DELETE http://localhost:3000/guest/delete/:id
- Nesse método devemos passar o id do convidado que desejamos excluir direto na URL.

## Check-in do convidado - admin e recepcionista permitidos
- Método: POST http://localhost:3000/guest/checkin/:id
- Nesse método devemos passar o id do convidado que desejamos realizar checkin direto na URL.

## Dashboard - Somente admin permitido
- Método: GET http://localhost:3000/dashboard
- Esse método irá listar a quantidade total de convidados, os confirmados, pendentes, e a ocupação em %
- Neste método nao é necessario body.
