# Evolui CV

Plataforma que transforma o currículo em vantagem competitiva por meio de uma análise crítica que simula a revisão de um recrutador sênior: aponta erros, explica **por que** são problemas e oferece sugestões acionáveis, alinhadas ao objetivo profissional do candidato ou à descrição de uma vaga específica.

A interface principal reflete o fluxo em três colunas:

```
envio do CV  |  parecer do recrutador  |  sugestões de melhoria
```

## Arquitetura

Monorepo com dois aplicativos independentes:

- **`frontend/`** — Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- **`backend/`** — Spring Boot 3.5 + Java 25 + LangChain4j (OpenAI) + Apache Tika

O frontend conversa com a API REST do backend através de `src/lib/api.ts` (`analyzeCv()` via `multipart/form-data`). A base URL é configurável por `NEXT_PUBLIC_API_URL` (padrão `http://localhost:8080`).

### Pipeline de análise

O backend é stateless e usa um pipeline sequencial de dois agentes:

1. **Recruiter Analyst** — persona de recrutador sênior. Detecta o idioma do CV e devolve um parecer estruturado (`score`, `strengths`, `issues` com `why`/`suggestion`/`severity`, `recommendedActions`).
2. **Improvement Suggestions** — recebe o CV original + o parecer e devolve sugestões acionáveis (`ADD`/`REMOVE`/`REWRITE`/`IMPROVE`) por seção, no mesmo idioma do CV.

As personas vivem em `backend/src/main/resources/prompts/*.txt` e o contrato de structured output é garantido por JSON Schema + records imutáveis em `com.evoluicv.backend.ai.model.*`.

## Funcionalidades

- Upload de CV em **PDF, DOCX ou TXT** (até 10 MB) ou colagem direta do texto
- Detecção automática do idioma — a resposta espelha o idioma do CV
- **Modo vaga específica**: ative o toggle e cole a descrição completa de uma vaga — a análise e as sugestões são calibradas por ela
- Parecer com `overallScore`, pontos fortes, issues priorizados por severidade e ações recomendadas
- Sugestões de reescrita por seção, comparando o texto atual com a versão proposta
- Tema claro/escuro e layout responsivo

## Como rodar

### Backend (Spring Boot)

Pré-requisitos: Java 25, Maven Wrapper incluso, conta e chave da OpenAI.

```bash
cd backend
export OPENAI_API_KEY=sk-...
./mvnw spring-boot:run
```

A API sobe em `http://localhost:8080`.

Endpoints:

- `GET  /api/health`
- `POST /api/cv/analyze`
  - `application/json`: `{ "cvText": "...", "professionalGoal": "...", "targetRole": "..." }`
  - `multipart/form-data`: `file` **ou** `cvText` + `professionalGoal` (obrigatório) + `targetRole` (opcional)

Para rodar a suíte de testes (sem chamar a OpenAI):

```bash
./mvnw test
```

### Frontend (Next.js)

Pré-requisitos: Node.js 20+, Yarn. Use **Yarn** para manter o lockfile consistente.

```bash
cd frontend
yarn install
yarn dev
```

Abra `http://localhost:3000`.

Variáveis de ambiente opcionais:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Scripts disponíveis:

```bash
yarn dev      # servidor de desenvolvimento
yarn build    # build de produção
yarn start    # servidor de produção (após build)
yarn lint     # eslint (next/core-web-vitals)
```

## Estrutura de pastas

```
evoluicv/
├── backend/
│   ├── src/main/java/com/evoluicv/backend/
│   │   ├── ai/agent/         # interfaces @AiService do LangChain4j
│   │   ├── ai/model/         # records de structured output
│   │   ├── cv/               # controller, service, text extractor, DTOs
│   │   ├── config/           # CORS
│   │   └── error/            # exceções + GlobalExceptionHandler
│   └── src/main/resources/
│       ├── application.yml
│       └── prompts/          # personas (recrutador e sugestões)
└── frontend/
    └── src/
        ├── app/              # rotas do App Router, layout, globals.css
        ├── components/
        │   ├── cv/           # formulário, parecer, sugestões
        │   └── ui/           # primitivos shadcn (radix-mira)
        ├── hooks/
        ├── lib/              # cliente HTTP, utilitários
        └── types/             # tipos espelhando os records do backend
```

## Notas

- O contrato entre frontend e backend é rígido: qualquer mudança em um record em `com.evoluicv.backend.ai.model.*` precisa atualizar `frontend/src/types/analysis.ts` no mesmo commit.
- O CORS do backend libera apenas `http://localhost:3000` em `/api/**`. Ajuste em `CorsConfig` para outros ambientes.
- Tamanho mínimo do texto do CV: 200 caracteres — textos menores retornam HTTP 422.
- Persistência, autenticação, streaming SSE e OCR de PDFs escaneados estão fora do escopo atual.

## Licença

Projeto pessoal — direitos reservados ao autor.
