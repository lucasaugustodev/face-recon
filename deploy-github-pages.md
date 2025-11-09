# 🌐 Deploy no GitHub Pages

## Passo a Passo para Hospedar Online

### Opção 1: Via Configurações do GitHub (Recomendado)

1. Acesse seu repositório no GitHub: `https://github.com/lucasaugustodev/face-recon`

2. Vá em **Settings** (Configurações)

3. No menu lateral, clique em **Pages**

4. Em **Source**, selecione:
   - Branch: `claude/faceio-api-test-system-011CUxW1u1QtHbLRmQRnAWcq`
   - Folder: `/ (root)`

5. Clique em **Save**

6. Aguarde 1-2 minutos e seu site estará disponível em:
   ```
   https://lucasaugustodev.github.io/face-recon/
   ```

### Opção 2: Merge para Main (Se preferir)

Se quiser que o site fique na branch principal:

```bash
git checkout main
git merge claude/faceio-api-test-system-011CUxW1u1QtHbLRmQRnAWcq
git push origin main
```

Depois configure o GitHub Pages para usar a branch `main`.

---

## Outros Serviços de Hospedagem Gratuita

### Netlify (Deploy em 30 segundos)

1. Acesse: https://app.netlify.com/drop
2. Arraste a pasta `face-recon` para o site
3. Pronto! Link gerado automaticamente

### Vercel

1. Instale: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções

### Surge.sh

1. Instale: `npm i -g surge`
2. Execute: `surge`
3. Digite um nome único: `meu-faceio-test.surge.sh`

---

## 🎯 Link Esperado

Após configurar GitHub Pages, seu sistema estará disponível em:

```
https://lucasaugustodev.github.io/face-recon/
```

**Tempo de deploy:** 1-2 minutos após configuração

---

## ⚠️ Importante

Para o FACEIO funcionar em produção, você precisa:

1. Acessar o [FACEIO Console](https://console.faceio.net/)
2. Adicionar o domínio permitido (ex: `lucasaugustodev.github.io`)
3. Configurar CORS e domínios autorizados

Caso contrário, você verá erro de domínio não autorizado.
