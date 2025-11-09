# 🔐 FACEIO Test System

Sistema completo de testes para a API de reconhecimento facial FACEIO.

## 📋 Sobre o Projeto

Este é um sistema web interativo desenvolvido para testar e demonstrar as funcionalidades da API FACEIO, incluindo:
- **Enrollment (Cadastro Facial)**: Registro de novos usuários através de reconhecimento facial
- **Authentication (Autenticação)**: Login facial para usuários previamente cadastrados
- **Logs em tempo real**: Acompanhamento detalhado de todas as operações
- **Interface amigável**: Design moderno e responsivo

## 🚀 Como Usar

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Webcam funcional
- Conexão com a internet
- Permissão para acesso à câmera

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd face-recon
```

2. Abra o arquivo `index.html` em seu navegador:
```bash
# Opção 1: Abrir diretamente
open index.html

# Opção 2: Usar um servidor local (recomendado)
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 📖 Guia de Uso

### 1. Cadastro Facial (Enrollment)

1. Preencha o **Email** e **Nome** do usuário
2. Clique em **"Iniciar Cadastro Facial"**
3. Permita o acesso à câmera quando solicitado
4. Posicione seu rosto na frente da câmera
5. O sistema irá capturar e processar sua face
6. Você será solicitado a criar um PIN de 4-16 dígitos
7. Após o sucesso, um **Facial ID** único será gerado

**Resultado esperado:**
```
✓ Cadastro Realizado com Sucesso!
Facial ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Nome: João Silva
Email: joao@exemplo.com
Timestamp: 09/11/2025 14:30:00
```

### 2. Autenticação Facial

1. Clique em **"Iniciar Autenticação"**
2. Permita o acesso à câmera
3. Posicione seu rosto na frente da câmera
4. Digite o PIN que você criou durante o cadastro
5. O sistema irá reconhecer e autenticar sua face
6. Os dados do usuário serão exibidos

**Resultado esperado:**
```
✓ Autenticação Bem-Sucedida!
Facial ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Nome: João Silva
Email: joao@exemplo.com
```

## 🔧 Configuração

### API Key

A API Key do FACEIO está configurada no arquivo `app.js`:

```javascript
const FACEIO_APP_ID = '1d87cc03661633a87289b4180e439eb0';
```

Para usar sua própria API Key:
1. Acesse [FACEIO Console](https://console.faceio.net/)
2. Crie uma nova aplicação ou use uma existente
3. Copie a API Key (Public ID)
4. Substitua no arquivo `app.js`

## 🎯 Funcionalidades

### Interface do Usuário
- ✅ Design moderno e responsivo
- ✅ Feedback visual em tempo real
- ✅ Sistema de logs detalhado
- ✅ Exibição de dados do usuário
- ✅ Tratamento de erros amigável
- ✅ Animações suaves

### Funcionalidades Técnicas
- ✅ Integração completa com FACEIO API
- ✅ Tratamento robusto de erros
- ✅ Validação de formulários
- ✅ Suporte a múltiplos idiomas (locale: auto)
- ✅ Armazenamento de payload customizado
- ✅ Debug helpers no console

## 🐛 Tratamento de Erros

O sistema trata os seguintes erros comuns:

| Código | Descrição |
|--------|-----------|
| 1 | Permissão de câmera negada |
| 2 | Nenhum rosto detectado |
| 3 | Rosto não reconhecido |
| 4 | Múltiplas faces detectadas |
| 5 | Ataque de spoofing detectado |
| 6 | Tempo de processamento excedido |
| 7 | Operação cancelada pelo usuário |
| 8 | PIN inválido |
| 9 | Erro de rede |
| 10 | Aplicação não encontrada |
| 11 | Limite de usuários atingido |

## 🛠️ Debug

O sistema expõe helpers de debug no console do navegador:

```javascript
// Acessar instância do FACEIO
window.faceioDebug.getFaceIO()

// Adicionar log personalizado
window.faceioDebug.addLog('Minha mensagem', 'info')

// Limpar logs
window.faceioDebug.clearLogs()
```

## 📂 Estrutura de Arquivos

```
face-recon/
├── index.html          # Página principal
├── styles.css          # Estilos e animações
├── app.js              # Lógica da aplicação
└── README.md           # Documentação
```

## 🔒 Segurança

### Boas Práticas
- ✅ API Key configurada (não expõe chaves privadas)
- ✅ Validação de entrada de dados
- ✅ Proteção contra ataques de spoofing (FACEIO)
- ✅ Conexão segura (HTTPS recomendado)

### Recomendações
- Use HTTPS em produção
- Implemente rate limiting
- Monitore logs de acesso
- Configure as opções de segurança no FACEIO Console

## 📊 Dados Coletados

Durante o enrollment, os seguintes dados são armazenados:

```javascript
{
  facialId: "UUID único",
  payload: {
    email: "usuario@exemplo.com",
    name: "Nome do Usuário",
    timestamp: "2025-11-09T14:30:00.000Z"
  },
  details: {
    age: "estimativa de idade",
    gender: "estimativa de gênero"
  }
}
```

## 🌐 Navegadores Suportados

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Opera 67+

## 📱 Dispositivos Suportados

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablets
- ✅ Smartphones (com câmera frontal)

## 🔗 Links Úteis

- [FACEIO Documentation](https://faceio.net/integration-guide)
- [FACEIO Console](https://console.faceio.net/)
- [FAQ](https://faceio.net/faq)
- [Developer Center](https://faceio.net/dev-guides)

## 💡 Dicas

1. **Iluminação adequada**: Certifique-se de estar em um ambiente bem iluminado
2. **Posição da câmera**: Mantenha o rosto centralizado e a uma distância adequada
3. **Estabilidade**: Evite movimentos bruscos durante a captura
4. **Privacidade**: Apenas uma pessoa deve estar visível na câmera
5. **PIN seguro**: Use um PIN que você conseguirá lembrar

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📝 Licença

Este projeto é fornecido como exemplo educacional para testes da API FACEIO.

## 👨‍💻 Desenvolvedor

Sistema desenvolvido para testes e demonstração da API FACEIO.

---

**Nota:** Este é um sistema de testes. Para uso em produção, implemente medidas adicionais de segurança e otimização conforme as necessidades do seu projeto.
