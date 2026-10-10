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
O projeto conta com suítes de testes FSD automatizadas cobrindo hooks, interface e controle de side-effects. Para rodar:
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
O SeniorEase utiliza a arquitetura baseada nos princípios de FSD (Feature-Sliced Design), focando na separação de reponsabilidades (UI, Models, Shared Components, etc) e garantindo uma base escalável e flexível.
