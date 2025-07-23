# Winx Test Developer - Frontend Application

## 🚀 Visão Geral

Bem-vindo ao projeto Winx Test Developer! Esta é uma aplicação web moderna construída com Nuxt.js 3 que oferece uma plataforma interativa para testes e desenvolvimento. O frontend foi projetado com foco em performance, experiência do usuário e escalabilidade.

### ✨ Principais Recursos

- Interface moderna e responsiva
- Navegação fluida com animações suaves
- Suporte a temas claro/escuro
- Integração com Supabase para autenticação e banco de dados
- Gerenciamento de estado eficiente
- Rotas dinâmicas e otimizadas
- Componentes reutilizáveis
- Animações com Framer Motion e GSAP

## 🛠️ Tecnologias Utilizadas

- **Framework Principal**: Nuxt.js 3
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: Composables do Vue 3
- **Animações**: Framer Motion e GSAP
- **Autenticação**: Supabase Auth
- **Requisições HTTP**: Axios
- **Validação**: Class Validator
- **WebSockets**: Socket.IO
- **Documentação**: Swagger UI

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 18 ou superior)
- npm (geralmente vem com o Node.js) ou Yarn
- Git
- Um editor de código de sua preferência (VS Code recomendado)

## 🚀 Configuração do Ambiente

### 1. Clonando o Repositório

```bash
git clone [URL_DO_REPOSITÓRIO]
cd Winx-Test-Developer
```

### 2. Instalando Dependências

Escolha um dos comandos abaixo para instalar as dependências:

```bash
# Usando npm
npm install

# OU usando Yarn
yarn install

# OU usando pnpm
pnpm install
```

### 3. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Supabase
NUXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NUXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# Configurações da API
API_BASE_URL=http://localhost:3000/api

# Outras configurações
NODE_ENV=development
```

## 🖥️ Executando o Projeto

### Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot-reload em `http://localhost:3000`:

```bash
# Usando npm
npm run dev

# OU usando Yarn
yarn dev

# OU usando pnpm
pnpm dev
```

### Modo de Produção

Para construir a aplicação para produção:

```bash
# Build da aplicação
npm run build

# Preview da build de produção localmente
npm run preview
```

## 🧪 Testes

Para executar os testes unitários:

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm test -- --watch
```

## 🏗️ Estrutura do Projeto

```
Winx-Test-Developer/
├── assets/           # Arquivos estáticos (imagens, estilos, etc.)
├── components/       # Componentes Vue reutilizáveis
│   ├── common/       # Componentes comuns (botões, inputs, etc.)
│   └── product/      # Componentes específicos de produtos
├── composables/      # Lógica reutilizável com Composition API
├── layouts/          # Layouts da aplicação
├── middleware/       # Middleware do Nuxt
├── pages/            # Páginas da aplicação
├── plugins/          # Plugins do Nuxt
├── public/           # Arquivos públicos
├── server/           # Lógica do lado do servidor
├── stores/           # Gerenciamento de estado (Pinia)
├── types/            # Tipos TypeScript
├── utils/            # Utilitários e funções auxiliares
├── app.vue           # Componente raiz
├── nuxt.config.ts    # Configuração do Nuxt
└── tsconfig.json     # Configuração do TypeScript
```

## 🧩 Principais Dependências

### Dependências Principais

- `@nuxtjs/color-mode`: Suporte a temas claro/escuro
- `@supabase/supabase-js`: Cliente do Supabase
- `axios`: Cliente HTTP
- `framer-motion`: Animações
- `gsap`: Animações avançadas
- `socket.io`: Comunicação em tempo real
- `vue3-smooth-dnd`: Drag and drop suave

### Dependências de Desenvolvimento

- `@nuxt/types`: Tipos do Nuxt
- `tailwindcss`: Framework CSS
- `typescript`: Suporte a TypeScript
- `jest`: Testes

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request
