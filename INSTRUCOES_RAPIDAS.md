# 🚀 Instruções Rápidas

## ⚡ Início Rápido

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar Firebase:**
   - Siga o guia em `FIREBASE_SETUP.md`
   - Edite `firebase/config.ts` com suas credenciais

3. **Configurar WhatsApp:**
   - Edite `utils/constants.ts`
   - Substitua os números dos barbeiros (formato: 5511999999999)

4. **Executar projeto:**
   ```bash
   npm run dev
   ```

5. **Acessar:**
   - Abra [http://localhost:3000](http://localhost:3000)

## 📝 Checklist de Configuração

- [ ] Firebase configurado (`firebase/config.ts`)
- [ ] Firestore Database ativado
- [ ] Regras do Firestore configuradas
- [ ] Números do WhatsApp atualizados (`utils/constants.ts`)
- [ ] Dependências instaladas (`npm install`)

## 🎨 Personalização Rápida

### Alterar Cores
Edite `styles/globals.css`:
```css
--cor-roxo: #9b59ff;  /* Sua cor aqui */
```

### Adicionar Barbeiro
Edite `utils/constants.ts`:
```typescript
{
  id: 'novo-barbeiro',
  nome: 'Nome do Barbeiro',
  whatsapp: '5511999999999',
  foto: '/barbeiros/foto.jpg'
}
```

### Adicionar Serviço
Edite `utils/constants.ts`:
```typescript
{ id: 'novo-servico', nome: 'Nome do Serviço', valor: 50 }
```

## 🐛 Problemas?

1. **Erro de conexão Firebase:**
   - Verifique se as credenciais estão corretas
   - Verifique se o Firestore está ativado

2. **WhatsApp não abre:**
   - Verifique o formato do número (sem caracteres especiais)
   - Formato correto: 5511999999999

3. **Horários não aparecem:**
   - Verifique o console do navegador
   - Verifique as regras do Firestore

## 📞 Suporte

Consulte o `README.md` para informações detalhadas.

