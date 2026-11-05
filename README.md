<div align="center">

# Automação E2E com Playwright

Suíte de testes end-to-end para validar os principais fluxos da aplicação
[SauceDemo](https://www.saucedemo.com/), utilizando Playwright Test e o padrão
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

Este projeto automatiza jornadas essenciais de uma loja virtual de demonstração,
com foco em confiabilidade, reutilização de código e execução multiplataforma.

Os testes utilizam:

- **Playwright Test** para automação e asserções;
- **Page Object Model** para encapsular locators e ações de cada tela;
- **Testes parametrizados** para validar diferentes perfis de usuário;
- **Storage state** para reutilizar uma sessão autenticada no fluxo de compra;
- **Relatório HTML**, screenshots, vídeos e traces para facilitar a análise de falhas;
- **GitHub Actions** para execução automática em push e pull request.

## Cenários cobertos

### Autenticação

- Login com usuário e senha válidos;
- Mensagem de erro para usuário bloqueado;
- Login com os usuários `standard_user`, `problem_user`,
  `performance_glitch_user` e `visual_user`.

### Compra

- Adição da mochila ao carrinho;
- Validação do item no carrinho;
- Preenchimento dos dados de entrega;
- Finalização da compra;
- Validação da mensagem de confirmação do pedido.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [Playwright](https://playwright.dev/) | Automação de navegador e execução dos testes |
| [Node.js](https://nodejs.org/) | Runtime do projeto |
| JavaScript | Implementação dos testes e Page Objects |
| [dotenv](https://www.npmjs.com/package/dotenv) | Carregamento das variáveis de ambiente |
| GitHub Actions | Integração contínua |

## Pré-requisitos

- Node.js em versão LTS;
- npm;
- Credenciais de teste da SauceDemo.

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
├── tests/                       # Cenários automatizados
│   ├── auth.setup.js
│   ├── compra.spec.js
│   ├── login.spec.js
│   └── usuarios.spec.js
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
- trace na primeira tentativa novamente.

Esses diretórios são gerados localmente e não são versionados.

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
- Execução em múltiplos navegadores e dispositivo móvel;
- Evidências automáticas para investigação de falhas.

## Licença

Este projeto é destinado a fins de estudo e demonstração de automação de
testes. Adicione uma licença ao repositório caso ele seja distribuído
publicamente.

## Autor

**Rafael Felipe**

[![LinkedIn de Rafael Felipe](https://img.shields.io/badge/LinkedIn-Rafael%20Felipe-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafaelrfelipe/)
