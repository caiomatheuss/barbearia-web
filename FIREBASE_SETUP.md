# 🔥 Configuração do Firebase

Este guia irá ajudá-lo a configurar o Firebase para a landing page da barbearia.

## Passo 1: Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou "Create a project"
3. Digite um nome para o projeto (ex: "barbearia-web")
4. Aceite os termos e clique em "Continuar"
5. Desative o Google Analytics (ou mantenha ativo, se preferir)
6. Clique em "Criar projeto"

## Passo 2: Ativar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha o modo de produção
4. Selecione uma localização (escolha a mais próxima do Brasil, ex: `southamerica-east1`)
5. Clique em "Ativar"

## Passo 3: Configurar Regras de Segurança

1. Vá para a aba "Regras" no Firestore
2. Substitua as regras por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita na coleção agendamentos
    match /agendamentos/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ IMPORTANTE**: Estas regras permitem acesso público. Para produção, você deve implementar autenticação e regras mais restritivas.

3. Clique em "Publicar"

## Passo 4: Obter Credenciais

1. No menu lateral, clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"
2. Clique em "Configurações do projeto"
3. Role até a seção "Seus aplicativos"
4. Clique no ícone `</>` (Web)
5. Registre um apelido para o app (ex: "barbearia-web")
6. **NÃO** marque a opção "Também configure o Firebase Hosting"
7. Clique em "Registrar app"

## Passo 5: Copiar Configuração

Você verá um código JavaScript com as credenciais. Copie os valores e cole no arquivo `firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIza...",           // Cole aqui
  authDomain: "...",            // Cole aqui
  projectId: "...",             // Cole aqui
  storageBucket: "...",         // Cole aqui
  messagingSenderId: "...",     // Cole aqui
  appId: "1:..."                // Cole aqui
};
```

## Passo 6: Verificar Configuração

1. Abra o arquivo `firebase/config.ts`
2. Substitua todos os valores `YOUR_*` pelas credenciais reais
3. Salve o arquivo

## Passo 7: Testar Conexão

1. Execute o projeto: `npm run dev`
2. Abra o navegador em `http://localhost:3000`
3. Tente fazer um agendamento
4. Verifique no Firebase Console se o agendamento foi criado na coleção `agendamentos`

## 📋 Estrutura da Coleção

A coleção `agendamentos` será criada automaticamente quando o primeiro agendamento for feito. Cada documento terá:

- `barbeiro`: string (ID do barbeiro)
- `data`: string (formato YYYY-MM-DD)
- `horario`: string (formato HH:00)
- `clienteNome`: string
- `servicos`: array de strings
- `valorTotal`: number
- `status`: string ("confirmado")
- `createdAt`: Timestamp

## 🔒 Segurança (Opcional - Para Produção)

Para produção, você deve:

1. Implementar autenticação no Firebase
2. Atualizar as regras do Firestore para:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /agendamentos/{document=**} {
      // Permitir apenas leitura pública, escrita apenas com autenticação
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Ou usar Cloud Functions para validar e criar agendamentos

## ❓ Problemas Comuns

### Erro: "Firebase: Error (auth/unauthorized-domain)"
- Adicione seu domínio nas configurações de autenticação do Firebase
- Para desenvolvimento local, `localhost` já está permitido por padrão

### Erro: "Missing or insufficient permissions"
- Verifique se as regras do Firestore estão publicadas corretamente
- Verifique se você está usando as credenciais corretas

### Agendamentos não aparecem no Firestore
- Verifique o console do navegador para erros
- Verifique se o Firestore está ativado
- Verifique se as regras permitem escrita

## 📚 Recursos Adicionais

- [Documentação do Firebase](https://firebase.google.com/docs)
- [Documentação do Firestore](https://firebase.google.com/docs/firestore)
- [Guia de Segurança](https://firebase.google.com/docs/firestore/security/get-started)

