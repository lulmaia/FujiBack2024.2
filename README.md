# Projeto Node.js com TypeScript e MongoDB 🚀
#Aluno: Luís Gustavo Maia Cavalcanti Santos

Este projeto é uma API desenvolvida com Node.js, TypeScript e MongoDB Atlas, utilizando Express para gerenciamento de rotas e autenticação com JWT. O projeto inclui um CRUD para Usuários e Eventos, e a autenticação de tokens JWT.

## Tecnologias Utilizadas 🛠️

- **Node.js**: Ambiente de execução para JavaScript.
- **TypeScript**: Adiciona tipagem estática.
- **Express.js**: Framework para criar APIs REST.
- **MongoDB Atlas**: Banco de dados NoSQL hospedado na nuvem.
- **Joi**: Biblioteca para validação de dados.
- **JWT**: Token JSON Web para autenticação.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **Supertest**: Biblioteca para testar APIs HTTP.
- **Mongoose**: Biblioteca para modelar dados no MongoDB.
- **ESLint**: Ferramenta para análise estática do código e identificação de problemas.
- **Prettier**: Formatador de código.

## Instalação 🛠️

1. **Clone o Repositório** 📥

   ```bash
   git clone https://github.com/lulmaia/FujiBack2024.2
   cd FujiBack2024.2
   ```

2. **Instale as Dependências** 📦

   ```bash
   npm install
   ```

3. **Configure o Ambiente** ⚙️

   - Acesse o arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

     ```env
     MONGO_URI=SUA-URI
     JWT_SECRET=SEU-SECRET
     ```

4. **Inicie o Servidor** 🚀

   ```bash
   npm run start
   ```

   O servidor será iniciado na porta 3000 por padrão.

## Endpoints 🌐

### Usuários

- **POST /api/users/register**: Registra um novo usuário.
- **POST /api/users/login**: Realiza login e retorna um token JWT.

### Eventos

- **POST /api/events**: Cria um novo evento.
- **GET /api/events**: Obtém todos os eventos ou eventos filtrados por parâmetros de consulta.
- **GET /api/events/:id**: Obtém um evento pelo ID.
- **PUT /api/events/:id**: Atualiza um evento pelo ID.
- **DELETE /api/events/:id**: Exclui um evento pelo ID.

## Testes ✅

Os testes estão localizados na pasta `__tests__` e utilizam Jest para garantir a funcionalidade do projeto. A cobertura mínima dos testes é de 50%.

Para executar os testes:

```bash
npm run test
```

## Estrutura do Projeto 📁

- **src**: Código-fonte.
  - **__tests__**: Testes automatizados.
  - **api**
    - **controllers**: Controladores para gerenciar a lógica das rotas.
    - **middlewares**: Middlewares para autenticação e validação.
    - **models**: Modelos do Mongoose para interação com o MongoDB.
    - **services**: Serviços para lógica de negócio.
    - **utils**: Utilitários e funções auxiliares.
    - **validators**: Validações de dados.
  - **config**: Configurações e utilitários.
  - **database**: Configurações e scripts para o banco de dados.
  - **routes**: Definição das rotas da API.
  - **server.ts**: Arquivo principal para iniciar o servidor Express.
  - **.env**: Arquivo de configuração do ambiente.

## Configurações Adicionais 🔧

- **jest.config.js**: Configuração do Jest para testes automatizados. Inclui ajustes: `testEnvironment`, `transform` e `coverageThreshold`.
- **package.json**: Contém as dependências do projeto e scripts.
- **tsconfig.json**: Configurações do TypeScript.
- **.eslintrc.json**: Configuração do ESLint.
- **.prettierrc**: Configuração do Prettier.

## Licença 📝

Este projeto está licenciado sob a [Licença MIT](LICENSE).
