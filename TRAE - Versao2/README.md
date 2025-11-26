# Landing Page - Reforma Tributária Destrava Brasil

Landing page para download de material gratuito sobre a Reforma Tributária com formulário de captação em duas etapas.

## 🚀 Características

- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Formulário Multi-step**: Duas etapas para melhor conversão
- **Auto-save**: Dados salvos automaticamente em tempo real
- **Validação com Zod**: Validação robusta de formulário
- **Máscaras de Input**: Para WhatsApp e outros campos
- **LGPD Compliance**: Opções de consentimento incluídas
- **NPS Rating**: Sistema de avaliação visual
- **Notificações Toast**: Feedback visual amigável

## 📋 Funcionalidades

### Formulário - Etapa 1:
- ✅ Nome completo
- ✅ Email com validação
- ✅ WhatsApp com máscara
- ✅ Avaliação NPS (0-10) com escala visual
- ✅ Campo adicional para comentário sobre a nota NPS
- ✅ Opções LGPD (obrigatório e opcional)

### Formulário - Etapa 2:
- ✅ Área de atuação (dropdown)
- ✅ Principais desafios na área
- ✅ Perguntas para o palestrante
- ✅ Barra de progresso (50% - "Quase lá!")

### Banco de Dados:
- ✅ Tabela Supabase para leads
- ✅ Auto-save a cada 2 segundos
- ✅ RLS (Row Level Security) configurada
- ✅ Índices para performance

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **React Hook Form** para gerenciamento de formulário
- **Zod** para validação
- **Sonner** para notificações
- **React IMask** para máscaras de input
- **Supabase** para banco de dados
- **Vite** para build e desenvolvimento

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Adicione suas credenciais do Supabase no arquivo `.env`:
```
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

5. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔧 Configuração do Banco de Dados

1. Acesse seu projeto Supabase
2. Execute a migration em `supabase/migrations/20241126_create_leads_table.sql`
3. Configure as políticas de segurança conforme necessário

## 📝 Estrutura do Projeto

```
src/
├── components/
│   └── LeadCaptureForm.tsx      # Formulário principal
├── lib/
│   └── supabase.ts              # Configuração do Supabase
├── App.tsx                      # Componente principal
└── index.css                    # Estilos globais

public/
└── material-reforma-tributaria-desttrava-brasil.html  # Material para download
```

## 🎨 Personalização

### Link do Material
O link do Google Drive para download do material está configurado em `src/components/LeadCaptureForm.tsx` na linha 153. Substitua pelo link desejado.

### Cores e Estilos
Edite `tailwind.config.js` para ajustar as cores do tema.

### Textos e Conteúdo
Modifique os textos em `App.tsx` para o cabeçalho e `LeadCaptureForm.tsx` para os formulários.

### Campos do Formulário
Ajuste o schema Zod em `LeadCaptureForm.tsx` para modificar validações.

## 📱 Responsividade

- **Mobile**: Layout vertical otimizado
- **Tablet**: Layout adaptativo
- **Desktop**: Grid com 2 colunas

## 🔒 Segurança

- Validação de dados no frontend e backend
- Proteção contra XSS
- Sanitização de inputs
- Conformidade LGPD

## 📊 Analytics

O formulário coleta:
- Dados de contato (nome, email, WhatsApp)
- Avaliação NPS da palestra
- Área de atuação profissional
- Desafios enfrentados
- Perguntas para especialistas

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outros serviços
Build estático disponível em `dist/` após executar:
```bash
npm run build
```

## 🐛 Tratamento de Erros

- Modo demonstração ativado quando Supabase não está configurado
- Notificações amigáveis para o usuário
- Logs detalhados no console para debugging
- Fallbacks para operações críticas

## 📞 Suporte

Para dúvidas sobre a implementação ou personalização, consulte a documentação das tecnologias utilizadas ou entre em contato com a equipe de desenvolvimento.

---

**Destrava Brasil** - Especialistas em Reforma Tributária
