## 📝 Introdução

Olá! Este repositório contém a minha solução para o desafio da Logzz. Trata-se de um sistema simples de cadastro de produtos, que importa dados de uma API externa utilizando Node.js e MongoDB.

Deploy do backend: [https://github.com/GustavoGFG/teste-back-end]()

## 🚀 Começando

Siga as **instruções** abaixo para configurar o ambiente e rodar o backend do projeto localmente.

### 📋 Pré-requisitos

Antes de começar, verifique se você possui as seguintes dependências instaladas:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/) (versão 20 ou superior)
- [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/GustavoGFG/teste-back-end
```

2. Navegue até a pasta do projeto e execute o comando abaixo para instalar todas as dependências necessárias:

```bash
npm install
```

3. Após a conclusão da instalação, crie o arquivo de configuração com o comando a seguir na raiz do projeto:

```bash
copy .env.example .env
```

4. Abra o arquivo .env e configure as variáveis de ambiente conforme necessário. Lembre-se de substituir o MONGO_URI pela string de conexão do seu próprio banco de dados MongoDB:

```bash
PORT=4000
MONGO_URI=mongodb://<username>:<password>@localhost:27017/logzz  # Altere para suas credenciais
JWT_SECRET=logzz_secret
```

5. Agora você pode executar o projeto usando os seguinte comando:

```bash
npm run dev
```

6. Para importar produtos, utilize os seguintes comandos:
   Para importar todos os produtos:

```bash
npm run import import-products
```

Para importar um produto por ID:

```bash
npm run import import-product --id=<id_do_produto>
```
