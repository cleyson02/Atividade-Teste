# Sistema de Login - Full Stack Application

## 📋 Descrição do Projeto

Sistema de autenticação web desenvolvido com Angular no frontend e Quarkus (Java) no backend. A aplicação inclui funcionalidades de login, recuperação de senha, validação de campos e integração com serviço de CEP.

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- Login com validação de credenciais
- Recuperação de senha por email
- Mensagem de sucesso personalizada

### 📝 Formulário de Cadastro
- **Campo de Email**: Validação de formato de email
- **Campo de Senha**: Requisitos mínimos de segurança (mínimo 8 caracteres, letras maiúsculas, minúsculas, números e símbolos)
- **Campo CEP**: Busca automática de endereço com preenchimento dos campos
- **Bottom Sheet**: Pop-up inferior para informações adicionais
- **Campo Livre**: Área de texto sem restrições para comentários

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Java 17
- Node.js 22
- Angular CLI
- Maven

### Executando o Backend (Quarkus)

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Execute o Quarkus em modo desenvolvimento:
   ```bash
   ./mvnw quarkus:dev
   ```

3. O backend estará disponível em: http://localhost:8080

### Executando o Frontend (Angular)

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o Angular:
   ```bash
   ng serve
   ```

4. O frontend estará disponível em: http://localhost:4200

## 🔌 Endpoints da API

### POST /api/login
Autentica um usuário com email e senha.

**Request:**
```json
{
  "login": "usuario@exemplo.com",
  "senha": "Senha123!"
}
```

**Response:**
```json
{
  "message": "SUCESSO! VOCÊ ESTÁ LOGADO"
}
```

### GET /api/cep/{cep}
Busca endereço a partir do CEP.

**Exemplo:** GET /api/cep/01001000

**Response:**
```json
{
  "uf": "PE",
  "logradouro": "Rua Tocantins",
  "bairro": "Floresta"
}
```

### POST /api/recuperar-senha
Solicita recuperação de senha.

**Request:**
```json
{
  "email": "usuario@exemplo.com"
}
```

**Response:**
```json
{
  "message": "Instruções de recuperação enviadas para o email: usuario@exemplo.com"
}
```

## 🧪 Testando a Aplicação

### Credenciais de Teste
- **Email:** usuario@exemplo.com
- **Senha:** Senha123!

### Fluxo de Teste Recomendado

1. Acesse http://localhost:4200
2. Preencha o formulário com:
   - Email: usuario@exemplo.com
   - Senha: Senha123!
   - CEP: 01001000 (aguarde o preenchimento automático)
   - Campo livre: Qualquer texto
3. Clique em "Informações Adicionais" para testar o bottom sheet
4. Clique em "Entrar" para fazer login
5. Teste a recuperação de senha clicando em "Esqueci minha senha"

### Testando os Endpoints da API

Para testar diretamente os endpoints do backend:

```bash
# Testar endpoint de CEP
curl http://localhost:8080/api/cep/01001000

# Testar endpoint de login (no PowerShell)
Invoke-RestMethod -Uri "http://localhost:8080/api/login" -Method Post -ContentType "application/json" -Body '{"login":"usuario@exemplo.com","senha":"Senha123!"}'

# Testar recuperação de senha (no PowerShell)
Invoke-RestMethod -Uri "http://localhost:8080/api/recuperar-senha" -Method Post -ContentType "application/json" -Body '{"email":"usuario@exemplo.com"}'
```

## ⚙️ Configurações

### Backend (application.properties)
```properties
quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:4200
quarkus.http.cors.headers=accept, authorization, content-type, x-requested-with
quarkus.http.cors.methods=GET, POST, PUT, DELETE, OPTIONS
```

### Frontend (Environment)
A aplicação frontend está configurada para se comunicar com o backend em http://localhost:8080

## 🔧 Solução de Problemas

### Erros Comuns e Soluções

1. **Problema de CORS**: Verifique se as configurações do backend estão corretas
2. **Erro de JSON no PowerShell**: Use `Invoke-RestMethod` em vez de `curl`
3. **Problemas de validação de senha**: Use exatamente `Senha123!` (com S maiúsculo, números e !)
4. **Angular CLI não encontrado**: Execute `npm install -g @angular/cli`

### Verificações de Funcionamento

Para confirmar que tudo está funcionando:

1. Backend responde em http://localhost:8080
2. Frontend carrega em http://localhost:4200
3. Endpoint de CEP funciona: http://localhost:8080/api/cep/01001000
4. Formulário de login valida os campos corretamente
5. Integração entre frontend e backend funciona

---

**Nota**: Esta aplicação foi desenvolvida para fins de avaliação de habilidades em desenvolvimento full-stack com Java Quarkus e Angular.