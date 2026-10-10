# SeniorEase Web

SeniorEase Web é um dashboard moderno e intuitivo, desenhado com foco total em **acessibilidade** (cores, modo claro/escuro, alto contraste, opções avançadas de tipografia e teclado). Feito na stack **React + TypeScript + Vite**.

## Tecnologias Principais
- React 19
- Vite
- TypeScript
- CSS Modules (Design System próprio com variáveis de tema)
- Jotai (Gerenciamento de Estado Global com localStorage)
- React Router 7
- Vitest & RTL (Testes)

---

## 🚀 Como Inicializar o Projeto Localmente

Siga as instruções abaixo para rodar a aplicação em seu ambiente de desenvolvimento.

### 1. Pré-requisitos
Certifique-se de ter o **Node.js 24 LTS** instalado na sua máquina. O Vite 7 exige Node.js 20.19+ ou 22.12+; Node.js 18 não é compatível.
- Para verificar sua versão, execute: `node -v`

### 2. Instalar Dependências
Abra o seu terminal na pasta raiz do projeto e instale todos os pacotes:
```bash
npm install
```

### 3. Rodar o Servidor de Desenvolvimento
Para iniciar a interface localmente:
```bash
npm run dev
```
Após executar, o terminal mostrará um endereço local, tipicamente `http://localhost:5173/`. Acesse-o no seu navegador e você entrará direto no SeniorEase!

### 4. Executar os Testes Unitários
O projeto conta com testes automatizados cobrindo hooks, interface e efeitos no DOM. Para rodar:
```bash
npm run test
```

### 5. Compilar para Produção (Build)
Para verificar a integridade da compilação e criar a versão otimizada da sua aplicação:
```bash
npm run build
```

---

## Deploy na Vercel

O arquivo `vercel.json` configura o build e o fallback para `index.html`, necessário para abrir ou atualizar diretamente as rotas do React Router.

1. Envie as alterações deste projeto para a branch `main` do repositório conectado à Vercel.
2. Nas configurações do projeto na Vercel, use:
   - **Root Directory:** raiz do repositório (pasta que contém `package.json`).
   - **Framework Preset:** Vite.
   - **Build Command:** `npm run build`.
   - **Output Directory:** `dist`.
   - **Install Command:** `npm ci`.
   - **Node.js Version:** 24.x.
3. Aguarde o deploy automático do novo commit ou inicie um novo deploy desse commit no painel.
4. Após o build concluir, abra a URL fornecida pela Vercel e teste `/login`, `/cadastro` e a atualização de uma rota do dashboard após entrar.

Para validar localmente antes de publicar:

```bash
npm ci
npm run build
npm run test -- --run
```

Atualmente o projeto não exige variáveis de ambiente nem backend para o deploy. Login e cadastro são demonstrativos, e o estado fica no navegador; publicar o site não cria autenticação real nem um banco de dados.

## Estrutura do Projeto

O SeniorEase organiza o código pelas camadas do Feature-Sliced Design (FSD):

```text
src/
  app/                         # Inicialização, router, composição de layouts e atalhos globais
    config/                    # Configuração do ambiente de testes
    layouts/                   # Composição dos widgets e das funcionalidades globais
    model/                     # Coordenação da navegação por teclado
    providers/                 # Router e providers da aplicação
    styles/                    # Estilos globais da aplicação
  pages/                       # Slices de páginas, com ui/, model/ e index.ts
    (dashboard)/               # Grupo estrutural; suas páginas continuam independentes
    login/
    register/
    not-found/
  widgets/                     # Blocos de interface reutilizados nas páginas
    sidebar/
    floating-sidebar/
    auth-layout/
  features/                    # Ações reutilizadas do usuário
    sign-out/                  # Logout usado pelas barras de navegação e pelos atalhos
    narrated-reading/          # Leitura dos elementos da interface
  entities/                    # Estado e modelos de conceitos do produto
    session/                   # Sessão demonstrativa persistida
    user-preferences/          # Preferências de acessibilidade, segurança e navegação
  shared/                      # UI e bibliotecas sem regras de negócio
    ui/                        # Componentes e suas APIs públicas
    lib/classnames/            # Composição de classes CSS
    lib/theme/                 # Utilitário de tema
    styles/                    # Entradas CSS públicas: tokens e acessibilidade
```

### Regras de dependência

- Ordem das camadas: `app → pages → widgets → features → entities → shared`.
- Um slice só pode importar outros slices de camadas inferiores. Slices da mesma camada são independentes.
- Consumidores externos usam o `index.ts` público de cada slice. Em `shared/ui` e `shared/lib`, cada componente/biblioteca também possui sua API pública.
- Imports entre camadas usam o alias `@/`. Dentro de um slice, use caminhos relativos para acessar seus arquivos internos, evitando importar o próprio índice.
- `app` e `shared` não possuem slices e seus segmentos podem se comunicar. Isso não permite que Shared importe camadas superiores.
- O grupo `(dashboard)` organiza páginas; não contém lógica compartilhada entre elas.
- CSS em `shared/styles` possui entradas públicas explícitas (`tokens.css` e `accessibility.css`).
- Lógica exclusiva de uma página permanece no seu `model/`. Extraia para `features` ou `entities` quando houver reutilização ou um conceito de domínio compartilhado; não crie camadas apenas para preencher pastas.

A composição do layout fica em `app/layouts`, permitindo usar vários widgets sem criar dependências entre slices da camada Widgets. Sessão e preferências ficam em `entities`; Shared não conhece logout nem os fluxos do dashboard.

### Validação do projeto

```bash
npm run lint
npm run test -- --run
npm run build
```

O lint verifica as regras de TypeScript e React. Os testes validam os comportamentos da aplicação, e o build verifica os tipos e gera os arquivos de produção na pasta `dist`.

As regras de dependência e as responsabilidades das camadas FSD devem ser conferidas na revisão do código; não há verificador arquitetural automático configurado. A refatoração preserva os nomes das chaves de localStorage e as rotas existentes.

Referências: [camadas](https://feature-sliced.design/docs/reference/layers), [slices e segmentos](https://feature-sliced.design/docs/reference/slices-segments) e [APIs públicas](https://feature-sliced.design/docs/reference/public-api).
