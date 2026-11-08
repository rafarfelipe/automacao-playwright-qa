<div align="center">

# Automação E2E com Playwright

Suíte de testes automatizados para validar fluxos da aplicação
[SauceDemo](https://www.saucedemo.com/), APIs REST e diferentes recursos de
interação web, utilizando Playwright Test, fixtures customizadas e o padrão
Page Object Model.

<p>
  <img src="https://img.shields.io/badge/Playwright-1.64.1-2EAD33?logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white" alt="Node.js LTS">
  <img src="https://img.shields.io/badge/JavaScript-CommonJS-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Testes-E2E-6C47FF" alt="Testes end-to-end">
  <img src="https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions">
</p>

</div>

## Sobre o projeto

Este projeto reúne testes end-to-end de interface, testes de API e desafios
práticos de automação, com foco em confiabilidade, reutilização de código e
execução multiplataforma.

Os testes utilizam:

- **Playwright Test** para automação e asserções;
- **Page Object Model** para encapsular locators e ações de cada tela;
- **Testes parametrizados** para validar diferentes perfis de usuário;
- **Fixtures customizadas** para disponibilizar Page Objects nos testes;
- **Storage state** para reutilizar uma sessão autenticada no fluxo de compra;
- **APIRequest** para validar operações HTTP;
- **Mocks de rede** para simular indisponibilidade e respostas vazias;
- **Tags de execução** para separar testes smoke;
- **Asserções soft** e **testes de regressão visual**;
- **Interações avançadas** como upload, alertas, iframes, novas abas, hover e
  drag and drop;
- **Relatório HTML**, screenshots, vídeos e traces para facilitar a análise de falhas;
- **GitHub Actions** para execução automática em push e pull request.

## Cenários cobertos

### Autenticação

- Login com usuário e senha válidos;
- Mensagem de erro para usuário bloqueado;
- Login com os usuários `standard_user`, `problem_user`,
  `performance_glitch_user` e `visual_user`.

### Compra

- Adição da **Sauce Labs Backpack** ao carrinho;
- Validação do contador do carrinho;
- Validação da mochila no carrinho;
- Preenchimento de nome, sobrenome e código postal;
- Finalização da compra;
- Validação da mensagem `Thank you for your order!`.

O cenário de compra reutiliza o estado de autenticação gerado pelo setup e
divide a jornada em etapas nomeadas no relatório HTML:

1. Adicionar a mochila ao carrinho;
2. Abrir o carrinho;
3. Preencher os dados de entrega;
4. Finalizar a compra.

### Desafios da aplicação

- Login com senha inválida;
- Validação de campos obrigatórios;
- Remoção de produto do carrinho;
- Ordenação de produtos pelo menor preço;
- Logout;
- Compra de dois produtos com validação do total de `$43.18`.

### Testes de API

Utilizando a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/):

- Consulta de um post com `GET`;
- Criação de um post com `POST`;
- Exclusão de um post com `DELETE`.

### Interações web

Utilizando o site [The Internet](https://the-internet.herokuapp.com/):

- Seleção e desmarcação de checkbox;
- Seleção de opções em dropdown;
- Upload de arquivo;
- Aceite de alerta JavaScript;
- Abertura e validação de nova aba;
- Validação de conteúdo em iframe;
- Exibição de conteúdo com hover;
- Arrastar e soltar elementos;
- Consulta de dados em tabela.

### Recursos avançados do Playwright

- Fixture `loginPage` para reutilizar o Page Object de login;
- Fixture `produtosPage` para reutilizar o Page Object de produtos;
- Testes orientados a dados com `dados/usuarios.json`;
- Simulação de falha do endpoint e lista vazia com `page.route`;
- Repetição de cenários para investigação de flakiness;
- Teste visual com `toHaveScreenshot`;
- Teste smoke identificado com a tag `@smoke`.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [Playwright](https://playwright.dev/) | Automação de navegador, API e execução dos testes |
| [Node.js](https://nodejs.org/) | Runtime do projeto |
| JavaScript | Implementação dos testes e Page Objects |
| [dotenv](https://www.npmjs.com/package/dotenv) | Carregamento das variáveis de ambiente |
| GitHub Actions | Integração contínua |

## Pré-requisitos

- Node.js em versão LTS;
- npm;
- Credenciais de teste da SauceDemo;
- Acesso à internet para os testes que utilizam SauceDemo, JSONPlaceholder,
  The Internet e a lojinha usada nos testes de mock/visual.

## Instalação

Clone o projeto e instale as dependências:

```bash
git clone <url-do-repositorio>
cd automacao-playwright-qa
npm ci
npx playwright install
```

Crie o arquivo `.env` na raiz do projeto, baseado no exemplo:

```env
SAUCE_USER=standard_user
SAUCE_PASSWORD=sua_senha_de_teste
BASE_URL=https://www.saucedemo.com/
```

> O arquivo `.env` e o estado de autenticação são ignorados pelo Git. Nunca
> publique credenciais reais no repositório.

## Execução dos testes

Executar toda a suíte:

```bash
npm test
```

Executar os testes com a interface do Playwright:

```bash
npm run test:ui
```

Abrir o último relatório HTML:

```bash
npm run test:report
```

Executar um arquivo específico:

```bash
npx playwright test tests/login.spec.js
```

Executar somente os testes smoke:

```bash
npx playwright test --grep @smoke
```

Repetir um teste para investigar flakiness:

```bash
npx playwright test tests/nivel2/flaky.spec.js --repeat-each=10 --project=chromium
```

Listar os testes descobertos sem executá-los:

```bash
npx playwright test --list --project=chromium
```

Atualizar o baseline de teste visual:

```bash
npx playwright test tests/nivel2/visual.spec.js --update-snapshots
```

Executar em um projeto específico:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=celular
```

## Navegadores e dispositivos

A configuração executa os testes nos seguintes projetos:

- Chromium;
- Firefox;
- WebKit;
- Pixel 7 (mobile).

O fluxo de compra depende do projeto de autenticação (`setup`), que gera o
arquivo `playwright/.auth/usuario.json` antes da execução dos testes dependentes.

O teste visual usa `ignoreSnapshots: true` quando executado em CI. Dessa forma,
o restante da suíte continua sendo executado sem exigir um baseline visual
específico no ambiente de integração contínua.

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml       # Pipeline de CI
├── pages/                       # Page Objects
│   ├── CheckoutPage.js
│   ├── LoginPage.js
│   └── ProdutosPage.js
├── fixtures/
│   └── paginas.js               # Fixtures com Page Objects reutilizáveis
├── dados/
│   └── usuarios.json            # Massa do teste de login orientado a dados
├── tests/                       # Cenários automatizados
│   ├── auth.setup.js
│   ├── compra.spec.js           # Compra ponta a ponta com etapas nomeadas
│   ├── api.spec.js              # Testes REST com JSONPlaceholder
│   ├── desafios.spec.js         # Desafios funcionais da SauceDemo
│   ├── internet.spec.js         # Interações no The Internet
│   ├── login.spec.js
│   ├── usuarios.spec.js
│   └── nivel2/
│       ├── dados.spec.js        # Testes orientados a dados
│       ├── fixture.spec.js      # Uso de fixture customizada
│       ├── flaky.spec.js        # Cenário de usuário lento
│       ├── mock.spec.js         # Mock de respostas de rede
│       ├── soft.spec.js         # Asserções não bloqueantes
│       ├── tags.spec.js         # Testes com tags
│       └── visual.spec.js       # Regressão visual
├── arquivos/
│   └── exemplo.txt              # Arquivo usado no teste de upload
├── .env.example                 # Modelo de variáveis de ambiente
├── package.json
└── playwright.config.js         # Configuração global do Playwright
```

## Evidências de execução

Em caso de falha, o Playwright pode gerar:

- relatório HTML em `playwright-report/`;
- resultados de teste em `test-results/`;
- screenshot somente em falhas;
- vídeo em falhas;
- trace na primeira nova tentativa após uma falha.

Esses diretórios são gerados localmente e não são versionados.
O baseline visual deve ser criado ou atualizado localmente antes de validar o
teste `visual.spec.js`.

## Integração contínua

O workflow do GitHub Actions é executado em:

- push para `main` ou `master`;
- pull requests direcionados para `main` ou `master`.

Na pipeline, as dependências e os navegadores são instalados, a suíte é
executada e o relatório HTML é publicado como artefato por 30 dias.

As credenciais devem ser configuradas como secrets do repositório:

- `SAUCE_USER`;
- `SAUCE_PASSWORD`.

## Boas práticas adotadas

- Locators baseados no atributo `data-test`;
- Separação entre ações de tela e cenários de teste;
- Reutilização de autenticação com `storageState`;
- Asserções explícitas para validar resultados observáveis;
- Fixtures e dados separados para reduzir duplicação;
- Mocks de rede para validar estados de erro sem depender do backend;
- Execução em múltiplos navegadores e dispositivo móvel;
- Evidências automáticas para investigação de falhas.

## Licença

Este projeto é destinado a fins de estudo e demonstração de automação de
testes. Adicione uma licença ao repositório caso ele seja distribuído
publicamente.

## Autor

**Rafael Felipe**

[![LinkedIn de Rafael Felipe](https://img.shields.io/badge/LinkedIn-Rafael%20Felipe-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafaelrfelipe/)
