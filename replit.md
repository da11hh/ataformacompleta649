# ExecutiveAI Pro - Guia Completo Replit

## IMPORTAÇÃO RÁPIDA (Leia Primeiro!)

### Para economizar créditos após importar do GitHub:

```bash
# OPÇÃO 1: Setup Rápido (RECOMENDADO - um único comando!)
bash scripts/setup-rapido.sh

# OPÇÃO 2: Setup Manual (se preferir mais controle)
bash scripts/restaurar-apos-importar.sh

# Configure secrets na aba Secrets do Replit:
#    - JWT_SECRET (gere com: openssl rand -base64 32) - auto-gerado se não existir
#    - TOKEN_ID e CHAVE_TOKEN (opcional, para BigDataCorp)
#    - SUPABASE_MASTER_URL e SUPABASE_MASTER_SERVICE_ROLE_KEY (opcional)

# Inicie o servidor
npm run dev
```

**Login padrão:** admin@example.com (senha gerada nos logs)

---

## Visão Geral

ExecutiveAI Pro é uma plataforma multi-tenant SaaS para gestão de leads, formulários, CPF compliance, e integração com WhatsApp Business. Inclui dashboard executivo, label designer estilo Canva, e sistema de formulários com URLs públicas.

## Arquitetura

| Componente | Tecnologia |
|------------|------------|
| Frontend | React 18 + Vite + TypeScript |
| Backend | Express.js + TypeScript |
| Database | PostgreSQL (Replit/Neon) + Drizzle ORM |
| UI | TailwindCSS + shadcn/ui + Radix UI |
| State | TanStack Query + Zustand |

## Estrutura de Diretórios

```
├── server/               # Backend Express
│   ├── index.ts          # Entry point (porta 5000)
│   ├── routes/           # Rotas da API
│   ├── lib/              # Serviços (BigDataCorp, Supabase, etc)
│   ├── middleware/       # Auth, cache, rate limit
│   └── formularios/      # Sistema de formulários
├── src/                  # Frontend React
│   ├── App.tsx           # Componente principal
│   ├── components/       # Componentes reutilizáveis
│   ├── features/         # Features por domínio
│   └── lib/              # Utilitários
├── shared/               # Código compartilhado
│   └── db-schema.ts      # Schema Drizzle ORM (46+ tabelas)
├── scripts/              # Scripts de utilidade
│   ├── setup-rapido.sh            # Setup em um comando (RECOMENDADO)
│   ├── limpar-antes-exportar.sh   # Antes de exportar
│   └── restaurar-apos-importar.sh # Após importar
├── vite.config.ts        # Vite (host: 0.0.0.0, port: 5000, allowedHosts: all)
├── drizzle.config.ts     # Drizzle ORM config
├── start.sh              # Script de inicialização
└── package.json          # Dependências NPM
```

## Configuração do Ambiente

### Workflow Configurado
```yaml
Nome: Start application
Comando: bash start.sh
Porta: 5000
Tipo: webview
```

### Vite (Já Configurado)
- `host: "0.0.0.0"` - Permite acesso externo
- `port: 5000` - Porta padrão Replit
- `allowedHosts: ['all']` - Aceita proxy do Replit
- HMR configurado para REPLIT_DEV_DOMAIN

## Secrets e Variáveis de Ambiente

### Obrigatórios
| Secret | Descrição | Como Obter |
|--------|-----------|------------|
| `JWT_SECRET` | Tokens de autenticação | `openssl rand -base64 32` |
| `DATABASE_URL` | Banco PostgreSQL | Criado automaticamente pelo Replit |

### Opcionais (Funcionalidades Avançadas)
| Secret | Descrição | Serviço |
|--------|-----------|---------|
| `TOKEN_ID` | ID token API | BigDataCorp |
| `CHAVE_TOKEN` | Chave de acesso | BigDataCorp |
| `SUPABASE_MASTER_URL` | URL do projeto | Supabase Master |
| `SUPABASE_MASTER_SERVICE_ROLE_KEY` | Service role key | Supabase Master |
| `REACT_APP_SUPABASE_URL` | URL Supabase cliente | Supabase |
| `REACT_APP_SUPABASE_ANON_KEY` | Chave anon | Supabase |
| `REDIS_URL` | Cache Redis | Upstash |
| `EVOLUTION_API_URL` | URL Evolution | WhatsApp |
| `EVOLUTION_API_KEY` | API key | WhatsApp |
| `SENTRY_DSN` | Monitoramento | Sentry |

## Comandos NPM

```bash
npm run dev          # Servidor desenvolvimento (Express + Vite)
npm run build        # Build de produção
npm run start        # Servidor produção (após build)
npm run db:push      # Sincroniza schema com banco
npm run lint         # Verifica erros de código
```

## Banco de Dados

### Tabelas Principais (46+ criadas automaticamente)
- `users`, `tenants`, `sessions` - Autenticação
- `leads`, `lead_activities`, `lead_labels` - Pipeline
- `forms`, `form_submissions`, `form_tenant_mapping` - Formulários
- `whatsapp_labels` - Etiquetas (9 criadas automaticamente)
- `supabase_config` - Credenciais por tenant
- `products`, `inventory`, `orders` - Produtos

### Labels Padrão (Criadas Automaticamente)
| Label | Cor | Uso |
|-------|-----|-----|
| Contato inicial | Cinza | Novo contato |
| Formulário incompleto | Amarelo | Form iniciado |
| Aprovado formulário | Verde | Form aprovado |
| Reprovado formulário | Vermelho | Form reprovado |
| CPF aprovado | Rosa | CPF validado |
| CPF reprovado | Ciano | CPF com problemas |
| Marcação de reunião pendente | Laranja | Aguardando |
| Marcação de reunião completo | Azul | Agendado |
| Consultor | Roxo | Lead qualificado |

## Rotas Principais

### Páginas
| Rota | Descrição |
|------|-----------|
| `/` | Login |
| `/formulario` | Dashboard formulários |
| `/formulario/:company/form/:slug` | Formulário público |
| `/clientes` | Lista de leads |
| `/kanban` | Pipeline Kanban |
| `/consultar-cpf` | Consulta CPF |
| `/configuracoes` | Configurações |

### API
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/check-session` | Verificar sessão |
| GET | `/api/forms` | Listar formulários |
| POST | `/api/compliance/check` | Consultar CPF |

## Automações (Background Jobs)

| Job | Intervalo | Função |
|-----|-----------|--------|
| FormPoller | 2 min | Sincroniza submissions do Supabase |
| CPFPoller | 3 min | Atualiza status CPF nos leads |
| FormMappingSync | 5 min | Sincroniza mapeamento de formulários |

## Troubleshooting

| Problema | Solução |
|----------|---------|
| App não inicia | `npm run dev` ou reinicie workflow |
| Erro de banco | `npm run db:push` |
| Dependências faltando | `npm install` |
| Porta ocupada | Reinicie o Repl |
| Login não funciona | Verifique logs para senha gerada |
| Cannot find module | `rm -rf node_modules && npm install` |
| JWT_SECRET not set | Configure na aba Secrets |

## Exportação para GitHub

### Antes de Exportar (Economiza 95% dos créditos!)
```bash
bash scripts/limpar-antes-exportar.sh
git add .
git commit -m "Otimizado para export"
git push origin main
```

### Após Importar
```bash
bash scripts/restaurar-apos-importar.sh
# Configure secrets na aba Secrets
npm run dev
```

## Documentação Adicional

| Arquivo | Conteúdo |
|---------|----------|
| `FORMULARIOS_SYSTEM.md` | Sistema de formulários completo |
| `DOCUMENTATION.md` | Documentação técnica |
| `SECRETS_REQUIRED.md` | Detalhes de cada secret |
| `PRESERVACAO_COMPLETA_ESTADO.md` | Checklist de exportação |
| `GUIA_EXPORT_OTIMIZADO.md` | Passo a passo exportação |

## Sistema de Formulários (Notas Críticas)

- **Dados salvos em `form.questions`**, NÃO em `form.elements`
- Formato legado: cada pergunta = 1 página
- Formato moderno: `pageBreak` elements controlam paginação
- **4 arquivos devem ter lógica idêntica de cores:**
  - `FormPreview.tsx`, `FormularioPublico.tsx`, `PublicForm.tsx`, `TrackedPublicForm.tsx`
- Use `deriveDesignColors` de `src/features/formularios-platform/utils/deriveDesignColors.ts`

## Deployment

Configurado para autoscale:
- **Build:** `npm run build`
- **Run:** `npm run start`

---

**Última atualização:** December 16, 2024

### Kanban Simplificado - Modo Visualização (December 16, 2024)
**Solicitação:** O usuário requisitou que o Kanban seja somente visualização, sem funcionalidade de arrastar cards (drag-and-drop). As movimentações de leads devem ser controladas apenas por automação.

**Mudanças:**
1. Removido DndContext, DragOverlay, e todos os hooks de drag-and-drop do KanbanPage.tsx
2. Removidos useSortable e useDroppable do KanbanColumn.tsx
3. Removido ícone de arrastar (GripVertical) do LeadCard.tsx
4. Cards agora são clicáveis diretamente para abrir popup de detalhes (sem botão "Mais/Menos")

**Arquivos Modificados:**
- `src/features/kanban/pages/KanbanPage.tsx` - Removido DndContext e lógica de drag
- `src/features/kanban/components/KanbanColumn.tsx` - Removido useDroppable
- `src/features/kanban/components/LeadCard.tsx` - Removido GripVertical, card inteiro clicável

**Resultado:** Kanban agora é puramente visualização. Leads só mudam de coluna através de automações do sistema.

### Meeting Type Display Fix (December 16, 2024)
**Issue:** Meeting data like `tipo_reuniao` (meeting type) exists in the database but showed "Não definido" in the Kanban lead details modal.

**Root Cause:** The `transformApiLead` function in `KanbanPage.tsx` was not mapping the `reuniaoTipo`, `reuniaoLink`, `reuniaoTitulo` and `meeting` fields from the API response. The Lead interface was also missing these fields.

**Solution:** 
1. Added `reuniaoTipo`, `reuniaoLink`, `reuniaoTitulo` and `meeting` fields to the `Lead` interface in `LeadCard.tsx`
2. Added mappings for these fields in `transformApiLead` in `KanbanPage.tsx`

**Files Modified:**
- `src/features/kanban/components/LeadCard.tsx` - Added missing fields to Lead interface
- `src/features/kanban/pages/KanbanPage.tsx` - Added mappings in transformApiLead function

**Result:** Meeting type now correctly displays "online" or "presencial" in the lead details modal instead of "Não definido"

## Recent Setup Notes

- Application successfully imported from GitHub and running on Replit
- PostgreSQL database provisioned and migrations applied
- Express + Vite integrated server running on port 5000 (host: 0.0.0.0, allowedHosts: all)
- Multi-tenant authentication system active (open access mode without Supabase)
- Background job queues initialized for form sync, CPF polling, and automation
- Deployment configured for autoscale (build: npm run build, run: npm run start)
- Default login: admin@example.com (password shown in server logs on first startup)

## Kanban Pipeline Enhancement (December 2024)

O modal de detalhes do LeadCard foi completamente reformulado para exibir TODAS as informações acumuladas do lead:

### Seções do Modal de Detalhes do Lead
1. **Informações Pessoais** - Nome, CPF, Email, Telefone, Status
2. **Histórico de Contato** - Primeiro contato, Último contato, Última atividade, Setor atual
3. **Informações de Reunião** - Tipo, Status, Data, Hora, Consultor, Resultado
4. **Respostas do Formulário** - Todas as respostas do formulário em grid (lead.form.answers)
5. **Estatísticas de Atividade** - Total registros, Dados cliente, Mensagens chat, Transcrições, Fontes dados
6. **Disponibilidade de Dados** - Indicadores visuais para dados cliente, histórico chat, transcrições
7. **Histórico Completo CPF / Compliance** - CPF, Status, Verificação, Risco, Processos detalhados, Payload completo
8. **Último Resumo** - Resumo estruturado da conversa
9. **Conversação Completa** - Histórico de mensagens WhatsApp formatado (cliente vs agente)

### Fluxo de Dados
```
Supabase (dashboard_completo_v5_base.todas_mensagens_chat)
    ↓
server/lib/leadJourneyAggregator.ts (DashboardData.todasMensagensChat)
    ↓
server/routes/leadsPipelineRoutes.ts (todas_mensagens_chat)
    ↓
src/features/kanban/components/LeadCard.tsx (formatWhatsAppMessages)
```

### Arquivos Modificados
- `server/lib/leadJourneyAggregator.ts` - Interfaces e agregação de dados
- `server/routes/leadsPipelineRoutes.ts` - Transformação para frontend
- `src/features/kanban/components/LeadCard.tsx` - Modal de detalhes expandido

## Bug Fixes (December 2024)

### Form Submissions Tenant ID Mismatch Fix
**Issue:** Form submissions were not appearing in the Kanban board because of a tenant_id mismatch. Submissions with `tenant_id = null` weren't matched with leads that have a `tenant_id = 'system'` or other tenant values.

**Solution:** Updated `fetchFormSubmissions` and `fetchFormularioEnvios` in `server/lib/leadJourneyAggregator.ts` to include submissions where tenant_id is null, but only for the 'system' tenant to prevent cross-tenant data exposure:
```typescript
// Before (broken)
query = query.eq('tenant_id', tenantId);

// After (fixed - secure)
if (tenantId === 'system') {
  // System tenant gets null-tenant submissions (legacy data)
  query = query.or(`tenant_id.eq.${tenantId},tenant_id.is.null`);
} else {
  // Other tenants only get their own data
  query = query.eq('tenant_id', tenantId);
}
```

This ensures form submissions created before multi-tenant setup or without tenant assignment still display correctly in the lead journey, while maintaining proper tenant isolation for other tenants.

### Multi-Key Form Submission Matching Fix (December 15, 2024)
**Issue:** Form submissions were only matched by phone number. When phone formats differed between form submissions and leads (from CPF compliance data), the matching failed.

**Solution:** Implemented multi-key indexing in `fetchFormSubmissions`:
- Primary: Match by normalized phone (`tel:+5531999999999`)
- Secondary: Match by CPF (`cpf:12345678901`)
- Tertiary: Match by lowercase name (`name:john doe`)

**Key Changes:**
```typescript
// Form submissions now indexed by multiple keys
submissionsMap.set(`tel:${telefoneNorm}`, submission);
submissionsMap.set(`cpf:${cpfNorm}`, submission);
submissionsMap.set(`name:${nameNorm}`, submission);

// Matching priority: phone → CPF → name
let submission = submissionsMap.get(`tel:${telefoneNorm}`);
if (!submission) submission = submissionsMap.get(`cpf:${clienteCpf}`);
if (!submission) submission = submissionsMap.get(`name:${clienteName}`);
```

### Form Answers JSON Parsing Fix (December 15, 2024)
**Issue:** Form answers stored as JSON strings weren't being displayed because `Object.keys()` failed on string values.

**Solution:**
1. Backend (`leadJourneyAggregator.ts`): Parse JSON string answers to objects before returning
2. Frontend (`LeadCard.tsx`): Handle both object and array answer formats

**Frontend now supports:**
- Object format: `{ "cpf": "123", "nome": "Test" }`
- Array format: `[{ "question_id": "1", "answer": "Yes", "points": 10 }]`
- JSON string format: Automatically parsed to object/array

### Orphan CPF Leads Form Matching Fix (December 15, 2024)
**Issue:** Leads originating from CPF compliance checks (orphan CPF leads) were not being matched with form submissions, so Kanban cards showed no form data even when the person had filled out a form.

**Root Cause:** The orphan CPF processing loop (lines 1378-1470 in leadJourneyAggregator.ts) was setting `form: undefined` without attempting to match with form_submissions.

**Solution:** Added form submission matching logic to orphan CPF processing:
1. Try matching by CPF first (`cpf:12345678901`)
2. Then by name (`name:john doe`)
3. Then by phone if available

**Key Changes:**
```typescript
// Before orphan CPF was added with form: undefined
// Now we try to find matching form submission first
let orphanSubmission = null;
const orphanCpfNorm = normalizeCPF(cpfResult.cpf);
if (orphanCpfNorm) {
  orphanSubmission = submissionsMap.get(`cpf:${orphanCpfNorm}`);
}
if (!orphanSubmission && cpfResult.nome) {
  const orphanNameNorm = cpfResult.nome.trim().toLowerCase();
  orphanSubmission = submissionsMap.get(`name:${orphanNameNorm}`);
}
// Build form data and include form event in timeline
```

**Result:** CPF-originated leads now display form data and include form submission events in their timeline when a matching form submission exists.

### Meeting Status Priority Fix (December 16, 2024)
**Issue:** Leads with scheduled meetings were not appearing in the "REUNIÃO AGENDADA" column of the Kanban board. The meeting table had multiple records for the same phone number, with null-status records appearing before records with valid status.

**Root Cause:** The `reunioesMap` building logic used a simple "first wins" approach. When multiple records existed for the same phone:
1. First record (status: null) was added to the map
2. Subsequent records (status: "agendado") were ignored as duplicates

**Solution:** Modified the reunioesMap building to prefer records with status:
```typescript
if (telefoneNorm) {
  const existing = reunioesMap.get(telefoneNorm);
  // Prefer records with a status over records without status
  if (!existing || (!existing.status && reuniao.status)) {
    reunioesMap.set(telefoneNorm, reuniao);
  }
}
```

**Additional fixes:**
- Status normalization: 'agendado' → 'agendada' (masculine to feminine form for consistency)
- Debug logging added for matching verification (removed after fix)

**Result:** Leads with scheduled meetings now correctly appear in the "REUNIÃO AGENDADA" column with proper meeting data attached.
