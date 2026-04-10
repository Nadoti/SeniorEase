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
Certifique-se de ter o **Node.js** (versão 18+ recomendada) instalado na sua máquina.
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

## Estrutura do Projeto
O SeniorEase utiliza a arquitetura baseada nos princípios de FSD (Feature-Sliced Design), focando na separação de reponsabilidades (UI, Models, Shared Components, etc) e garantindo uma base escalável e flexível.
