# GROK_RULES.md
## Constituição Oficial do Projeto O Discípulo

Estas regras são obrigatórias e devem ser respeitadas em todas as tarefas.

### REGRA 1 — Alteração mínima
Faça somente o que foi solicitado.
- Não implemente melhorias extras.
- Não faça otimizações não solicitadas.
- Não faça refatorações desnecessárias.
- Não reorganize arquivos.
- Não altere arquitetura.
- Não troque bibliotecas.
- Não atualize dependências sem autorização.

### REGRA 2 — Não modificar o que já funciona
Tudo que já foi aprovado está congelado.
Nunca altere:
- Home
- Landing Page
- Header
- Sidebar
- Menu Mobile
- Responsividade
- Componentes aprovados
- Tema
- Cores
- Tipografia
- CSS existente
- Rotas existentes

Se precisar criar algo novo, crie novos componentes.
Nunca altere componentes aprovados.

### REGRA 3 — Evitar efeitos colaterais
Toda alteração deve resolver apenas o problema informado.
- Nunca gere novos problemas.
- Nunca altere outra funcionalidade.
- Nunca corrija uma tela quebrando outra.

### REGRA 4 — Trabalhar em modo cirúrgico
Antes de editar qualquer arquivo:
- identifique exatamente o problema;
- altere apenas o trecho necessário;
- preserve todo o restante.

Nunca reescreva um arquivo inteiro para corrigir poucas linhas.

### REGRA 5 — Arquitetura escalável
Todo código novo deve ser:
- organizado;
- reutilizável;
- componentizado;
- simples de manter;
- preparado para crescimento.

### REGRA 6 — Organização
Sempre utilizar boas práticas.
- Componentes pequenos.
- Pastas organizadas.
- Código limpo.
- Imports organizados.
- Sem duplic ação.

### REGRA 7 — Supabase
Enquanto o Supabase não for oficialmente configurado:
Não criar:
- banco;
- tabelas;
- migrations;
- policies;
- RLS;
- buckets;
- storage;
- autenticação;
- edge functions;
- variáveis de ambiente.

Sempre utilizar dados mock.

### REGRA 8 — Dependências
Não instalar bibliotecas novas sem autorização.
Sempre reutilizar o que já existe.

### REGRA 9 — Build obrigatório
Antes de qualquer commit executar:

```bash
npm run typecheck
```

Depois executar:

```bash
npm run build
```

Se existir qualquer erro:
Pare.
Corrija.
Execute novamente.
Somente faça commit quando ambos finalizarem sem erros.

### REGRA 10 — Commits
Cada tarefa deve gerar um commit separado.
A mensagem deve ser clara.
Nunca misture várias funcionalidades no mesmo commit.

### REGRA 11 — Nunca tomar decisões sozinho
Se houver dúvida:
- Não invente.
- Não suponha.
- Implemente somente o que foi solicitado.

### REGRA 12 — Preservar o padrão visual
Todo novo componente deve seguir exatamente o padrão visual do projeto.
- Não mudar identidade visual.
- Não criar novos estilos sem necessidade.

### REGRA 13 — Mobile First
Todo componente novo deve funcionar em:
- Desktop
- Tablet
- Mobile

Nenhuma atualização pode quebrar qualquer resolução.

### REGRA 14 — Documentação
Sempre documentar rapidamente:
- Arquivos alterados.
- Objetivo.
- Resultado.
- Commit realizado.

### REGRA 15 — Fluxo de trabalho
Para toda tarefa seguir exatamente esta ordem:

1. Ler o arquivo GROK_RULES.md
2. Entender a tarefa.
3. Identificar os arquivos envolvidos.
4. Alterar somente o necessário.
5. Validar.
6. Executar typecheck.
7. Executar build.
8. Corrigir erros.
9. Fazer commit.
10. Informar o resultado.

### REGRA 16 — Nunca alterar arquivos fora do escopo da tarefa
Antes de modificar qualquer arquivo, verifique se ele está diretamente relacionado ao problema solicitado. Se não estiver, não o edite.

---

Estas regras passam a ser obrigatórias para todo o desenvolvimento do projeto O Discípulo.

Sempre leia este arquivo antes de iniciar qualquer tarefa futura.