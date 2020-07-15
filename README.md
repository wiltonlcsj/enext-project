# Projeto parser do Log

> Projeto criado para teste de seleção da enext, resolvendo problema de parser do Log

### Tecnologias Usadas

- Typescript
- NodeJS
- Jest
- Express
- Babel

### Pré-requisitos

- Se certifique que aplicação tenha permissão de escrita na pasta
- A aplicação pode ser rodada com NPM ou Yarn
- Caso a porta 3333 não esteja disponível, a const port deve ser alterada em server.ts

### Breve explicação

- Foi criada uma breve abstração de cada instância em Games, cada Game com sua lista de jogadores e suas respectivas kills
- Após o parser do arquivo é criado um JSON para facilitar a manipulação dos dados e evitar as linhas que não importam a aplicação
- O parser é feito sequencialmente, linha a linha, basicamente fazendo verificações por nome e quebras utilizando Regex e os próprios símbolos do formato da entrada
- Além dos casos de morte pelo `<world>`, o player também perde uma kill caso cometa suicídio

### Passos para executar testes via NPM

1. `npm install`
2. `npm test`

### Passos para executar testes via Yarn

1. `yarn install`
2. `yarn test`

### Para deixar o servidor rodando em debug com NPM

1. `npm dev` --> Inicia em modo debug colocando as saídas no console

### Para deixar o servidor rodando em debug com Yarn

1. `yarn dev` --> Inicia em modo debug colocando as saídas no console

### Para gerar o build com NPM

1. `npm build` --> Inicia em modo debug colocando as saídas no console
2. `npm start` --> Inicia em modo de produção

### Para gerar o build com Yarn

1. `yarn build` --> Inicia em modo debug colocando as saídas no console
2. `yarn start` --> Inicia em modo de produção
