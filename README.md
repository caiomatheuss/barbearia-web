# ✂️ Barbearia Web - Landing Page Completa

Landing page moderna e funcional para barbearia com sistema completo de agendamento, integração com banco de dados Firebase e envio automático para WhatsApp.

## 🎨 Características

- **Design Moderno**: Interface premium com paleta de cores preto, branco e roxo (#9b59ff)
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Sistema de Agendamento**: Fluxo completo em 5 etapas dentro da própria página
- **Banco de Dados**: Integração com Firebase Firestore para gerenciar agendamentos
- **Integração WhatsApp**: Envio automático de mensagem formatada após confirmação
- **Bloqueio de Horários**: Sistema inteligente que impede agendamentos duplicados

## 🚀 Tecnologias Utilizadas

- **Next.js 14**: Framework React para produção
- **TypeScript**: Tipagem estática para maior segurança
- **Firebase Firestore**: Banco de dados em tempo real
- **CSS Modules**: Estilização modular e organizada

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Firebase (gratuita)
- NPM ou Yarn

## 🔧 Instalação

1. **Clone ou baixe o projeto**

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
```

3. **Configure o Firebase:**

   - Acesse [Firebase Console](https://console.firebase.google.com/)
   - Crie um novo projeto (ou use um existente)
   - Ative o Firestore Database
   - Vá em Configurações do Projeto > Geral
   - Copie as credenciais do Firebase

4. **Configure as credenciais:**

   Edite o arquivo `firebase/config.ts` e substitua os valores:
   ```typescript
   const firebaseConfig = {
     apiKey: "SUA_API_KEY",
     authDomain: "SEU_AUTH_DOMAIN",
     projectId: "SEU_PROJECT_ID",
     storageBucket: "SEU_STORAGE_BUCKET",
     messagingSenderId: "SEU_MESSAGING_SENDER_ID",
     appId: "SEU_APP_ID"
   };
   ```

5. **Configure os números do WhatsApp:**

   Edite o arquivo `utils/constants.ts` e substitua os números dos barbeiros:
   ```typescript
   whatsapp: '5511999999999' // Formato: código do país + DDD + número (sem caracteres especiais)
   ```

6. **Execute o projeto:**
```bash
npm run dev
# ou
yarn dev
```

7. **Acesse no navegador:**
   - Abra [http://localhost:3000](http://localhost:3000)

## 📱 Estrutura do Projeto

```
barbearia-web/
├── components/          # Componentes React
│   ├── Hero.tsx         # Seção principal
│   ├── Barbeiros.tsx    # Lista de barbeiros
│   └── AgendamentoModal.tsx  # Modal de agendamento
├── firebase/            # Configuração Firebase
│   ├── config.ts        # Configuração do Firebase
│   └── agendamentos.ts  # Funções de agendamento
├── pages/               # Páginas Next.js
│   ├── _app.tsx         # App principal
│   └── index.tsx        # Página inicial
├── styles/              # Estilos CSS
│   ├── globals.css      # Estilos globais
│   ├── Hero.module.css
│   ├── Barbeiros.module.css
│   └── AgendamentoModal.module.css
└── utils/               # Utilitários
    ├── constants.ts     # Constantes e dados
    └── whatsapp.ts     # Função WhatsApp
```

## 🗓️ Fluxo de Agendamento

1. **Selecionar Barbeiro**: Escolha entre Guilherme, Rafael ou Douglas
2. **Selecionar Data**: Escolha uma data disponível (até 30 dias à frente)
3. **Selecionar Horário**: Veja apenas horários livres (08:00 às 21:00)
4. **Inserir Nome**: Digite seu nome completo
5. **Selecionar Serviços**: Escolha um ou mais serviços
6. **Confirmar**: Revise e confirme o agendamento

Após a confirmação:
- O horário é bloqueado no banco de dados
- Uma mensagem é gerada automaticamente
- O WhatsApp é aberto com a mensagem formatada

## 🗄️ Estrutura do Banco de Dados

A coleção `agendamentos` no Firestore contém documentos com:

```typescript
{
  barbeiro: string,        // ID do barbeiro
  data: string,           // YYYY-MM-DD
  horario: string,        // HH:00
  clienteNome: string,
  servicos: string[],     // Array de nomes dos serviços
  valorTotal: number,
  status: "confirmado",
  createdAt: Timestamp
}
```

## 🎨 Personalização

### Cores
As cores podem ser alteradas em `styles/globals.css`:
```css
:root {
  --cor-preto: #000000;
  --cor-branco: #ffffff;
  --cor-roxo: #9b59ff;
}
```

### Serviços
Edite a lista de serviços em `utils/constants.ts`:
```typescript
export const SERVICOS: Servico[] = [
  { id: 'corte-degrade', nome: 'Corte degradê', valor: 50 },
  // Adicione mais serviços aqui
];
```

### Barbeiros
Edite a lista de barbeiros em `utils/constants.ts`:
```typescript
export const BARBEIROS: Barbeiro[] = [
  {
    id: 'guilherme',
    nome: 'Guilherme',
    whatsapp: '5511999999999',
    foto: '/barbeiros/guilherme.jpg'
  },
  // Adicione mais barbeiros aqui
];
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [Vercel](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente (se necessário)
5. Deploy automático!

### Outras plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Firebase Hosting
- Etc.

## 📝 Licença

MIT License - Veja o arquivo LICENSE para mais detalhes.

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verifique se o Firebase está configurado corretamente
2. Verifique se os números do WhatsApp estão no formato correto
3. Verifique o console do navegador para erros

## ✨ Funcionalidades Futuras

- [ ] Sistema de notificações por email
- [ ] Painel administrativo
- [ ] Histórico de agendamentos
- [ ] Sistema de avaliações
- [ ] Galeria de trabalhos
- [ ] Blog/Notícias

---

Desenvolvido com ❤️ para barbearias modernas
