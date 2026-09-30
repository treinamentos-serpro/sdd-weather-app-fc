# Backlog — Weather App

As tarefas estão ordenadas por dependência dentro das entregas; os IDs são mantidos como referências estáveis e não definem a ordem de execução. Q1–Q9 e Q12 da spec devem ser decididas ou aceitas formalmente como restrições antes da baseline de aceite/produção. Cada tarefa mantém um escopo de arquivos pequeno e uma responsabilidade verificável.

## Checklist de andamento

`[x]` significa que todos os critérios de aceite da tarefa foram verificados; `[ ]` significa pendente. Notas de implementação parcial registram arquivos existentes, mas não contam como aceite concluído. No estado atual, nenhuma tarefa satisfaz integralmente todos os seus critérios.

- [ ] **T-01** — Decisões de escopo/plataforma Q6, Q10 e Q11 pendentes.
- [ ] **T-02** — Contrato de dados e condições Open-Meteo Q1–Q5/Q12 pendentes.
- [ ] **T-03** — Metas NFR e timeout Q7/Q8 pendentes.
- [ ] **T-04** — Política de dados/privacidade Q9 pendente.
- [ ] **T-05** — Não há `src/main.tsx` nem `src/App.tsx`.
- [ ] **T-06 — Parcial:** `src/types/weather.ts` existe; contrato final depende de T-02/Q1–Q5.
- [ ] **T-07** — `weatherMappers.ts` ainda não existe.
- [ ] **T-08** — Mapeamento do payload Forecast ainda não existe.
- [ ] **T-09 — Parcial:** `weatherCodes.ts` existe; conjunto aprovado depende de T-02/Q1.
- [ ] **T-10 — Parcial:** `temperature.ts` existe; arredondamento depende de T-02/Q5.
- [ ] **T-11** — Teste de mapeadores não existe.
- [ ] **T-12** — Teste de códigos WMO não existe.
- [ ] **T-13** — Teste unitário de conversão não existe.
- [ ] **T-14** — Service de geocoding não existe.
- [ ] **T-15** — Teste do service de geocoding não existe.
- [ ] **T-16** — Service de forecast não existe.
- [ ] **T-17** — Teste do service de forecast não existe.
- [ ] **T-18** — Hook de busca não existe.
- [ ] **T-19** — Hook meteorológico não existe.
- [ ] **T-20** — Teste do hook de busca não existe.
- [ ] **T-21** — Teste do hook meteorológico não existe.
- [ ] **T-22 — Parcial:** `SearchBar.tsx` existe, mas resultados e seleção de cidade não estão implementados.
- [ ] **T-23 — Parcial:** `CurrentWeather.tsx` existe; timestamp/AC5 e campos finais Q1/Q4 não estão fechados.
- [ ] **T-24 — Parcial:** `ForecastCard.tsx` e `ForecastList.tsx` existem; Q2 ainda condiciona granularidade diária.
- [ ] **T-25 — Parcial:** `UnitToggle.tsx` existe; estado inicial/integrado e arredondamento Q5 seguem pendentes.
- [ ] **T-26** — `WeatherStatus.tsx` não existe.
- [ ] **T-27** — `App.tsx` e integração da busca não existem.
- [ ] **T-28** — Teste do componente de busca não existe.
- [ ] **T-29** — Teste do componente de clima atual não existe.
- [ ] **T-30** — Teste do componente de previsão não existe.
- [ ] **T-31** — Teste do seletor de unidade não existe.
- [ ] **T-32** — Teste de estados/retry não existe.
- [ ] **T-33** — E2E do fluxo principal não existe.
- [ ] **T-34** — E2E de vazio/erro/retry não existe.
- [ ] **T-35** — E2E mobile não existe; viewport final depende de Q6.
- [ ] **T-36** — Teste/auditoria de acessibilidade não existe; método depende de Q7.
- [ ] **T-37** — Medição de desempenho não existe; protocolo depende de Q7.
- [ ] **T-38** — Verificação operacional de disponibilidade não existe; hosting/meta dependem de Q6/Q7.
- [ ] **T-39** — Integração de clima atual no App não existe.
- [ ] **T-40** — Integração de previsão/unidade no App não existe.

## Entrega 1 — Decisões e contrato de produto

### T-01 — Fechar escopo do MVP e plataforma

- **Descrição:** registrar a distribuição v1, matriz de dispositivos e destino dos itens opcionais do escopo.
- **Tipo:** Infra
- **Critérios de aceite:** Q6 e Q10 têm decisão registrada; formato de distribuição e matriz de suporte estão nomeados; alertas, geolocalização, cache/offline e histórico/favoritos estão individualmente marcados como incluídos ou excluídos do MVP; Q11 está aprovada ou marcada como não bloqueante. **Refs.:** Q6, Q10, Q11; NFR1.
- **Dependências:** Nenhuma.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.

### T-02 — Fechar contrato meteorológico e de geocoding

- **Descrição:** aprovar campos, granularidade, fuso/fallback, busca, timestamp, unidades, arredondamento e condições da Open-Meteo.
- **Tipo:** Data
- **Critérios de aceite:** Q1–Q5 e Q12 estão respondidas ou cada restrição está formalmente aceita; spec/plano registram campos obrigatórios/opcionais, granularidade, fuso/fallback, timestamp, unidades/arredondamento, parâmetros de busca e condições/atribuição da API. **Refs.:** Q1–Q5, Q12; FR1–FR5.
- **Dependências:** Nenhuma.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.

### T-03 — Aprovar metas operacionais, acessibilidade e timeout

- **Descrição:** fechar métricas e protocolo de avaliação dos NFRs e critérios de erro/timeout.
- **Tipo:** Infra
- **Critérios de aceite:** Q7 e Q8 estão respondidas ou formalmente aceitas; spec registra dispositivo/rede/amostra/limites de desempenho, janela/meta de disponibilidade, método de acessibilidade, duração de timeout e mensagem por categoria de falha; aplicação e provedor têm medições separadas. **Refs.:** Q7, Q8; NFR2–NFR6; FR6.
- **Dependências:** Nenhuma.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.

### T-04 — Definir tratamento de dados e privacidade

- **Descrição:** registrar os dados enviados à Open-Meteo e qualquer armazenamento/uso de localização aprovado.
- **Tipo:** Infra
- **Critérios de aceite:** Q9 está respondida; cada dado de busca/localização tem finalidade, destino, necessidade, consentimento aplicável e retenção documentados; o contrato de request contém somente dados aprovados. **Refs.:** Q9; NFR7.
- **Dependências:** T-01, T-02.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.

## Entrega 2 — Fundação e contratos internos

### T-05 — Criar entrada React/Vite

- **Descrição:** criar a entrada mínima da SPA e a composição inicial sem fluxos meteorológicos.
- **Tipo:** Infra
- **Critérios de aceite:** `pnpm dev` e `pnpm build` funcionam; a página inicial renderiza sem erros; TypeScript strict e Biome continuam aplicáveis.
- **Dependências:** T-01.
- **Arquivos prováveis:** `src/main.tsx`, `src/App.tsx`.

### T-06 — Definir os tipos internos

- **Descrição:** materializar `Unit`, `City`, `CurrentWeather`, o contrato de período aprovado e `WeatherData`.
- **Tipo:** Data
- **Critérios de aceite:** campos e unidades correspondem a T-02; dados parciais são representáveis sem valores inventados; campos não aprovados não viram obrigatórios.
- **Dependências:** T-02, T-05.
- **Arquivos prováveis:** `src/types/weather.ts`.

## Entrega 3 — Funções puras

### T-07 — Mapear resposta de geocoding

- **Descrição:** converter resultados da Open-Meteo Geocoding em `City`.
- **Tipo:** Data
- **Critérios de aceite:** nomes, contexto geográfico, coordenadas e timezone disponíveis são mapeados conforme T-02; resultados ausentes permanecem vazios; estrutura inválida é rejeitada.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/lib/weatherMappers.ts`.

### T-08 — Mapear resposta de forecast

- **Descrição:** converter `current` e o formato de previsão aprovado em contratos internos.
- **Tipo:** Data
- **Critérios de aceite:** campos e granularidade aprovados são mapeados; arrays são associados pelo mesmo índice da data; unidades e ausências respeitam T-02; payload inválido não é tratado como sucesso.
- **Dependências:** T-06, T-07.
- **Arquivos prováveis:** `src/lib/weatherMappers.ts`.

### T-09 — Mapear códigos WMO para rótulos pt-BR

- **Descrição:** fornecer descrição localizada para os códigos meteorológicos aprovados.
- **Tipo:** Data
- **Critérios de aceite:** códigos definidos em T-02 retornam rótulos pt-BR; código desconhecido tem fallback explícito e não quebra a renderização.
- **Dependências:** T-02.
- **Arquivos prováveis:** `src/lib/weatherCodes.ts`.

### T-10 — Implementar conversão pura de temperatura

- **Descrição:** derivar Celsius/Fahrenheit sem mutar o snapshot nem fazer request.
- **Tipo:** Data
- **Critérios de aceite:** conversões nos dois sentidos seguem fórmula e arredondamento de T-02; ausências continuam ausentes; função não depende de React ou rede.
- **Dependências:** T-02, T-06.
- **Arquivos prováveis:** `src/lib/temperature.ts`.

## Entrega 4 — Services Open-Meteo

### T-14 — Implementar service de geocoding

- **Descrição:** consultar Geocoding e normalizar resultado/erros de transporte.
- **Tipo:** Data
- **Critérios de aceite:** URL, parâmetros, encoding e resposta seguem T-02; lista vazia retorna resultado vazio sem chamar Forecast; erros HTTP/rede são normalizados conforme T-03.
- **Dependências:** T-02, T-03, T-04, T-06, T-07.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`.

### T-16 — Implementar service de forecast

- **Descrição:** consultar clima atual e previsão com os parâmetros aprovados.
- **Tipo:** Data
- **Critérios de aceite:** `current`, granularidade, fuso, unidades e janela seguem T-02; resposta passa pelo mapper; timeout, HTTP 429/5xx, rede, JSON inválido e resposta parcial seguem T-03.
- **Dependências:** T-02, T-03, T-08, T-14.
- **Arquivos prováveis:** `src/services/openMeteoService.ts`.

## Entrega 5 — Hooks de estado

### T-18 — Implementar hook de busca

- **Descrição:** coordenar query, service de geocoding e estados `idle/loading/success/empty/error`.
- **Tipo:** UI
- **Critérios de aceite:** input vazio não envia request; busca válida retorna cidades; vazio/error são distintos; respostas obsoletas não sobrescrevem a busca mais recente.
- **Dependências:** T-14.
- **Arquivos prováveis:** `src/hooks/useCitySearch.ts`.

### T-19 — Implementar hook meteorológico

- **Descrição:** coordenar cidade selecionada, consulta atual/forecast, retry e resposta obsoleta.
- **Tipo:** UI
- **Critérios de aceite:** estados `idle/loading/success/empty/error` seguem T-02/T-03; parcial permanece success; mudar cidade invalida dados anteriores e ignora respostas tardias.
- **Dependências:** T-16.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.

## Entrega 6 — Componentes e composição

### T-22 — Criar componente de busca e seleção

- **Descrição:** apresentar campo, resultados e seleção de cidade.
- **Tipo:** UI
- **Critérios de aceite:** atende AC1.1–AC1.3; input vazio, carregamento e vazio são distinguíveis; contexto aprovado distingue homônimos; nomes Unicode são preservados; operação por teclado e labels acessíveis.
- **Dependências:** T-01, T-18.
- **Arquivos prováveis:** `src/components/CitySearch.tsx`.

### T-23 — Criar componente de clima atual

- **Descrição:** renderizar os campos obrigatórios aprovados para observação atual.
- **Tipo:** UI
- **Critérios de aceite:** atende AC2.1–AC2.2 e AC5.1–AC5.2; identifica a cidade, mostra somente campos disponíveis e temperatura na unidade selecionada, e apresenta o timestamp aprovado em Q4 ou o fallback definido quando ausente.
- **Dependências:** T-02, T-06, T-19.
- **Arquivos prováveis:** `src/components/CurrentWeather.tsx`.

### T-24 — Criar componente de previsão

- **Descrição:** renderizar períodos/dias da granularidade aprovada.
- **Tipo:** UI
- **Critérios de aceite:** atende AC3.1–AC3.3; apresenta janela e ordem aprovadas; mantém datas/campos indisponíveis sem copiar dados de outro período.
- **Dependências:** T-02, T-08, T-19.
- **Arquivos prováveis:** `src/components/Forecast.tsx`.

### T-25 — Criar seletor de unidade

- **Descrição:** alternar unidade de temperatura na apresentação.
- **Tipo:** UI
- **Critérios de aceite:** atende AC4.1–AC4.3; Celsius inicia selecionado; mudança deriva valores sem mutar `WeatherData` ou refazer request.
- **Dependências:** T-10, T-19.
- **Arquivos prováveis:** `src/components/UnitSelector.tsx`.

### T-26 — Criar componente de estados e retry

- **Descrição:** apresentar loading, erro, vazio e ação de nova tentativa.
- **Tipo:** UI
- **Critérios de aceite:** estados são visual e semanticamente distinguíveis; mensagens seguem T-03; retry invoca a ação recebida por props e controles têm nome acessível.
- **Dependências:** T-03, T-18, T-19.
- **Arquivos prováveis:** `src/components/WeatherStatus.tsx`.

### T-27 — Integrar busca no App

- **Descrição:** integrar o primeiro caminho vertical de busca e seleção, sem esperar a previsão completa.
- **Tipo:** UI
- **Critérios de aceite:** App conecta `useCitySearch` a `CitySearch`; busca, estado vazio e erro são visíveis; selecionar um resultado mantém a `City` exata selecionada. **Refs.:** FR1; AC1.1–AC1.3.
- **Dependências:** T-22.
- **Arquivos prováveis:** `src/App.tsx`.

### T-39 — Integrar clima atual no App

- **Descrição:** acrescentar ao fluxo de busca a consulta e apresentação do clima atual.
- **Tipo:** UI
- **Critérios de aceite:** após selecionar uma cidade, App conecta `useWeather` a `CurrentWeather`; apresenta campos atuais aprovados, timestamp conforme Q4 e retry/estado parcial, sem mostrar dados de cidade anterior como atuais. **Refs.:** FR2, FR5, FR6; AC2.1–AC2.2, AC5.1–AC5.2, AC6.1–AC6.2.
- **Dependências:** T-19, T-23, T-26, T-27.
- **Arquivos prováveis:** `src/App.tsx`.

### T-40 — Integrar previsão e unidade no App

- **Descrição:** completar a tela com previsão e alternância de unidade.
- **Tipo:** UI
- **Critérios de aceite:** App conecta `Forecast` e `UnitSelector` aos dados/hooks; mostra a janela e granularidade aprovadas; alternar C/F atualiza todas as temperaturas sem novo request; dados ausentes permanecem identificados. **Refs.:** FR3–FR4; AC3.1–AC3.3, AC4.1–AC4.3.
- **Dependências:** T-24, T-25, T-39.
- **Arquivos prováveis:** `src/App.tsx`.

## Entrega 7 — Testes unitários, de componente e E2E

Os testes são executados após a integração dos fluxos. Dependências apontam para as implementações sob teste, não para outros testes, exceto quando a validação integrada exige a cobertura de componente.

### T-11 — Testar mapeadores de geocoding e forecast

- **Descrição:** validar transformação dos payloads meteorológicos com Vitest.
- **Tipo:** Test
- **Critérios de aceite:** testes cobrem payload válido, campos opcionais ausentes, lista vazia, arrays desalinhados, unidade/timezone e payload inválido; nenhum teste usa rede real. **Refs.:** Q1–Q3, Q5; AC1.1–AC3.3.
- **Dependências:** T-07, T-08.
- **Arquivos prováveis:** `tests/lib/weatherMappers.test.ts`.

### T-12 — Testar mapeamento WMO

- **Descrição:** verificar códigos conhecidos e desconhecidos.
- **Tipo:** Test
- **Critérios de aceite:** cada código aprovado tem resultado esperado; código desconhecido usa o fallback de T-09. **Refs.:** Q1; FR2–FR3.
- **Dependências:** T-09.
- **Arquivos prováveis:** `tests/lib/weatherCodes.test.ts`.

### T-13 — Testes unitários da conversão Celsius/Fahrenheit

- **Descrição:** cobrir a função pura de conversão com Vitest.
- **Tipo:** Test
- **Critérios de aceite:** arquivo unitário Vitest cobre Celsius sem alteração, conversões exatas nos dois sentidos, pelo menos um valor fracionário com arredondamento de T-02 e entradas `null`/`undefined`; a função é testada sem DOM ou mock de rede. **Refs.:** Q5; FR4; AC4.1–AC4.3.
- **Dependências:** T-10.
- **Arquivos prováveis:** `tests/lib/temperature.test.ts`.

### T-15 — Testar service de geocoding com `fetch` mockado

- **Descrição:** testar apenas o service Geocoding substituindo `fetch` por mock.
- **Tipo:** Test
- **Critérios de aceite:** verifica URL/parâmetros/encoding, resultado válido, lista vazia, HTTP, rede e JSON inválido; lista vazia não dispara Forecast. **Refs.:** Q3, Q8; AC1.1–AC1.3.
- **Dependências:** T-14.
- **Arquivos prováveis:** `tests/services/openMeteoService.test.ts`.

### T-17 — Testar service de forecast com `fetch` mockado

- **Descrição:** cobrir apenas o service Forecast, substituindo `fetch` por mock.
- **Tipo:** Test
- **Critérios de aceite:** verifica parâmetros, resposta completa/parcial, HTTP 4xx/429/5xx, rede, timeout e JSON inválido; nenhum teste chama a Open-Meteo real. **Refs.:** Q1, Q2, Q8; AC2.1–AC3.3, AC6.1–AC6.2.
- **Dependências:** T-16.
- **Arquivos prováveis:** `tests/services/openMeteoService.test.ts`.

### T-20 — Testar hook de busca

- **Descrição:** verificar transições e concorrência do fluxo de geocoding.
- **Tipo:** Test
- **Critérios de aceite:** input vazio, loading, resultados, vazio, erro, retry e request obsoleto estão cobertos com service simulado. **Refs.:** Q3, Q8; AC1.1–AC1.3, AC6.1–AC6.2.
- **Dependências:** T-18.
- **Arquivos prováveis:** `tests/hooks/useCitySearch.test.ts`.

### T-21 — Testar hook meteorológico

- **Descrição:** verificar consulta de dados e mudança de cidade durante request.
- **Tipo:** Test
- **Critérios de aceite:** idle/loading/success/empty/error, resposta parcial, retry e descarte de resposta obsoleta estão cobertos com service simulado. **Refs.:** Q1, Q2, Q8; AC2.1–AC3.3, AC6.1–AC6.2.
- **Dependências:** T-19.
- **Arquivos prováveis:** `tests/hooks/useWeather.test.ts`.

### T-28 — Testar componente de busca

- **Descrição:** cobrir apresentação e interação de `CitySearch`.
- **Tipo:** Test
- **Critérios de aceite:** seleção, lista homônima, input vazio, loading, vazio, Unicode e teclado estão cobertos sem requests reais.
- **Dependências:** T-22.
- **Arquivos prováveis:** `tests/components/CitySearch.test.tsx`.

### T-29 — Testar componente de clima atual

- **Descrição:** cobrir campos disponíveis/ausentes e identificação da cidade.
- **Tipo:** Test
- **Critérios de aceite:** valores válidos e estado indisponível seguem AC2.1–AC2.2; timestamp presente e ausente seguem AC5.1–AC5.2 e decisão Q4; campos testados são os aprovados em T-02.
- **Dependências:** T-23.
- **Arquivos prováveis:** `tests/components/CurrentWeather.test.tsx`.

### T-30 — Testar componente de previsão

- **Descrição:** cobrir datas, ordenação, granularidade e campos parciais.
- **Tipo:** Test
- **Critérios de aceite:** janela/granularidade de T-02 e AC3.1–AC3.3 são verificadas; data ausente não recebe valores de outro período.
- **Dependências:** T-24.
- **Arquivos prováveis:** `tests/components/Forecast.test.tsx`.

### T-31 — Testar seletor de unidade

- **Descrição:** verificar interação e apresentação C/F.
- **Tipo:** Test
- **Critérios de aceite:** AC4.1–AC4.3 são cobertos; seleção não solicita dados nem altera cidade/datas/condição.
- **Dependências:** T-25.
- **Arquivos prováveis:** `tests/components/UnitSelector.test.tsx`.

### T-32 — Testar componente loading/erro/vazio e retry

- **Descrição:** verificar renderização e ação de `WeatherStatus`.
- **Tipo:** Test
- **Critérios de aceite:** Testing Library renderiza cada estado `loading`, `error` e `empty` isoladamente e confirma conteúdo/role esperado; retry chama a ação recebida por props exatamente uma vez; componente não faz requests diretamente; labels e teclado seguem T-03. **Refs.:** FR6; AC6.1–AC6.2; NFR2, NFR6.
- **Dependências:** T-26.
- **Arquivos prováveis:** `tests/components/WeatherStatus.test.tsx`.

### T-33 — Testar fluxo E2E principal com Playwright

- **Descrição:** validar busca, seleção, consulta e alternância em navegador.
- **Tipo:** Test
- **Critérios de aceite:** fluxo dos AC1.1–AC1.2, AC2.1, AC3.1, AC4.1–AC4.3 e AC5.1 funciona com APIs interceptadas; timestamp segue Q4; nenhuma chamada depende da Open-Meteo real. **Refs.:** US1–US5; FR1–FR5.
- **Dependências:** T-40, T-28, T-29, T-30, T-31.
- **Arquivos prováveis:** `tests/e2e/weather-app.spec.ts`.

### T-34 — Testar vazio, erro e retry com Playwright

- **Descrição:** validar a jornada de nenhum resultado e recuperação de falhas.
- **Tipo:** Test
- **Critérios de aceite:** AC1.3 e AC6.1–AC6.2 passam com respostas interceptadas; geocoding vazio não dispara Forecast; mensagem e timeout seguem T-03. **Refs.:** FR1, FR6; NFR6.
- **Dependências:** T-40, T-28, T-32.
- **Arquivos prováveis:** `tests/e2e/search-errors.spec.ts`.

## Entrega 8 — Hardening

### T-35 — Executar fluxo E2E principal em viewport mobile

- **Descrição:** repetir em Playwright o fluxo E2E principal de T-33 no viewport mobile mínimo aprovado.
- **Tipo:** Test
- **Critérios de aceite:** busca → seleção → clima atual/previsão → alternância C/F é concluído em viewport mobile e navegadores aprovados em T-01; não há rolagem horizontal e os controles de busca, unidade e retry permanecem utilizáveis. **Refs.:** NFR1; Q6; AC1.1–AC1.2, AC2.1, AC3.1, AC4.1–AC4.3.
- **Dependências:** T-01, T-33.
- **Arquivos prováveis:** `tests/e2e/responsive.spec.ts`.

### T-36 — Verificar acessibilidade dos fluxos principais

- **Descrição:** testar teclado, nomes acessíveis e critérios WCAG aprovados.
- **Tipo:** Test
- **Critérios de aceite:** navegação por teclado e critérios de acessibilidade definidos em T-03 passam nos fluxos principais; qualquer ferramenta adicional de auditoria é aprovada antes de adicionar dependência.
- **Dependências:** T-03, T-27.
- **Arquivos prováveis:** `tests/e2e/accessibility.spec.ts`.

### T-37 — Medir desempenho com protocolo aprovado

- **Descrição:** executar a medição de busca e consulta definida para NFR3.
- **Tipo:** Test
- **Critérios de aceite:** dispositivo, rede, amostra, limites e pontos de início/fim seguem T-03; resultado é comparado ao alvo aprovado, não ao valor provisório da spec.
- **Dependências:** T-03, T-33.
- **Arquivos prováveis:** `tests/e2e/performance.spec.ts`.

### T-38 — Verificar disponibilidade operacional

- **Descrição:** configurar ou documentar a sonda periódica de disponibilidade para o deployment aprovado.
- **Tipo:** Infra
- **Critérios de aceite:** alvo, janela, exclusões e responsável seguem T-03; a verificação distingue endpoint da aplicação e indisponibilidade do provedor; se o hosting não estiver escolhido, o bloqueio e a decisão necessária ficam registrados sem adicionar configuração específica de fornecedor.
- **Dependências:** T-01, T-03, T-05.
- **Arquivos prováveis:** `docs/operations/availability.md`, configuração do monitor/hosting aprovado.

## Rastreabilidade

### Requisitos funcionais → tarefas

| Requisito funcional | Tarefas de implementação | Tarefas de teste | Cobertura |
|---|---|---|---|
| FR1 — Buscar cidades | T-14, T-18, T-22, T-27 | T-15, T-20, T-28, T-33, T-34 | Coberto; depende de decisões Q3/Q8 para busca e mensagens. |
| FR2 — Consultar clima atual | T-16, T-19, T-23, T-27 | T-17, T-21, T-29, T-33 | Coberto conforme os campos aprovados em Q1. |
| FR3 — Consultar previsão de cinco dias | T-16, T-19, T-24, T-27 | T-17, T-21, T-30, T-33 | Coberto; granularidade/fuso dependem de Q2. |
| FR4 — Alternar unidade | T-10, T-25, T-27 | T-13, T-31, T-33 | Coberto; arredondamento e persistência dependem de Q5. |
| FR5 — Consultar atualização dos dados | T-23, T-27 | T-29, T-33 | Planejado, mas aceite depende de Q4 definir timestamp e fallback. |
| FR6 — Recuperar falhas | T-14, T-16, T-18, T-19, T-26, T-27 | T-15, T-17, T-20, T-21, T-32, T-34 | Coberto; timeout e textos dependem de Q8. |

Não há requisito funcional sem tarefa correspondente. FR5 tem implementação e teste planejados, mas não pode ser fechado como aceite até Q4 ser decidida.

| Tarefa | Requisitos/decisões da spec |
|---|---|
| T-01 | Q6, Q10, Q11; NFR1 |
| T-02 | Q1–Q5, Q12; FR1–FR5 |
| T-03 | Q7, Q8; FR6; NFR2–NFR6 |
| T-04 | Q9; NFR7 |
| T-05 | NFR1; base técnica do plano (Architecture/Project Structure) |
| T-06 | Q1–Q5; FR1–FR5 |
| T-07 | Q3, Q12; FR1; AC1.1–AC1.3 |
| T-08 | Q1, Q2, Q5; FR2–FR3; AC2.1–AC3.3 |
| T-09 | Q1; FR2–FR3 |
| T-10 | Q5; FR4; AC4.1–AC4.3 |
| T-11 | Q1–Q3, Q5; AC1.1–AC3.3 |
| T-12 | Q1; FR2–FR3 |
| T-13 | Q5; FR4; AC4.1–AC4.3 |
| T-14 | Q3, Q8, Q12; FR1; AC1.1–AC1.3 |
| T-15 | Q3, Q8; AC1.1–AC1.3; Edge Cases: geocoding vazio/caracteres especiais |
| T-16 | Q1, Q2, Q4, Q5, Q8, Q12; FR2–FR3, FR5–FR6 |
| T-17 | Q1, Q2, Q8; AC2.1–AC3.3, AC6.1–AC6.2 |
| T-18 | Q3, Q8; FR1, FR6; AC1.1–AC1.3, AC6.1–AC6.2 |
| T-19 | Q1, Q2, Q8; FR2–FR3, FR6; AC2.1–AC3.3, AC6.1–AC6.2 |
| T-20 | Q3, Q8; AC1.1–AC1.3, AC6.1–AC6.2 |
| T-21 | Q1, Q2, Q8; AC2.1–AC3.3, AC6.1–AC6.2 |
| T-22 | Q3; FR1; AC1.1–AC1.3; NFR1–NFR2 |
| T-23 | Q1, Q4; FR2, FR5; AC2.1–AC2.2, AC5.1–AC5.2 |
| T-24 | Q1, Q2; FR3; AC3.1–AC3.3 |
| T-25 | Q5; FR4; AC4.1–AC4.3 |
| T-26 | Q8; FR6; AC6.1–AC6.2; NFR6 |
| T-27 | FR1; AC1.1–AC1.3; NFR1–NFR2 |
| T-28 | FR1; AC1.1–AC1.3; NFR2 |
| T-29 | FR2, FR5; AC2.1–AC2.2, AC5.1–AC5.2 |
| T-30 | FR3; AC3.1–AC3.3; NFR8 |
| T-31 | FR4; AC4.1–AC4.3 |
| T-32 | FR6; AC6.1–AC6.2; NFR2, NFR6 |
| T-33 | US1–US5; AC1.1–AC1.2, AC2.1, AC3.1, AC4.1–AC4.3, AC5.1 |
| T-34 | FR1, FR6; AC1.3, AC6.1–AC6.2; NFR6 |
| T-35 | NFR1; Q6; AC1.1–AC1.2, AC2.1, AC3.1, AC4.1–AC4.3 |
| T-36 | NFR2; Q7 |
| T-37 | NFR3; Q7 |
| T-38 | NFR4; Q6–Q7 |

| T-39 | FR2, FR5–FR6; AC2.1–AC2.2, AC5.1–AC5.2, AC6.1–AC6.2 |
| T-40 | FR3–FR4; AC3.1–AC3.3, AC4.1–AC4.3 |

## Prioridade e tamanho

Prioridade: **P0** = necessário para entregar o MVP funcional; **P1** = necessário para aprovar produção/NFRs após o fluxo principal visível; **P2** = melhoria opcional posterior, somente se o escopo for aprovado. Tamanhos relativos: **S** = tarefa estreita, um arquivo/contrato; **M** = várias verificações ou integração dentro de uma camada; **G** = decisão transversal ou coordenação de múltiplos contratos/partes interessadas.

| Tarefa | Prioridade | Tamanho |
|---|---:|---:|
| T-01 | P0 | G |
| T-02 | P0 | G |
| T-03 | P0 | G |
| T-04 | P0 | M |
| T-05 | P0 | S |
| T-06 | P0 | S |
| T-07 | P0 | S |
| T-08 | P0 | M |
| T-09 | P0 | S |
| T-10 | P0 | S |
| T-11 | P0 | M |
| T-12 | P0 | S |
| T-13 | P0 | S |
| T-14 | P0 | M |
| T-15 | P0 | S |
| T-16 | P0 | M |
| T-17 | P0 | S |
| T-18 | P0 | M |
| T-19 | P0 | M |
| T-20 | P0 | S |
| T-21 | P0 | S |
| T-22 | P0 | M |
| T-23 | P0 | M |
| T-24 | P0 | M |
| T-25 | P0 | S |
| T-26 | P0 | S |
| T-27 | P0 | S |
| T-28 | P0 | S |
| T-29 | P0 | S |
| T-30 | P0 | S |
| T-31 | P0 | S |
| T-32 | P0 | S |
| T-33 | P0 | M |
| T-34 | P0 | M |
| T-35 | P0 | M |
| T-36 | P1 | M |
| T-37 | P1 | M |
| T-38 | P1 | M |
| T-39 | P0 | M |
| T-40 | P0 | M |

Não há tarefas P2 no backlog atual: offline, favoritos, alertas e outras capacidades opcionais permanecem fora/pendentes de decisão em Q10. Se forem aprovadas, devem entrar como tarefas P2 próprias, sem bloquear o MVP.

## Sequência em fatias verticais

O preflight T-01–T-06 fecha decisões mínimas, privacidade, fundação e contratos; ainda não produz uma tela de produto. Em seguida, entregar cada fatia com seu conjunto de testes antes de avançar:

1. **Busca de cidade visível:** T-07 → T-14 → T-18 → T-22 → T-27; validar com T-15, T-20 e T-28. Resultado: pessoa pesquisa, escolhe uma cidade e vê loading/vazio/erro sem forecast.
2. **Clima atual visível:** T-08 → T-09 → T-16 → T-19 → T-23 → T-26 → T-39; validar com T-11, T-12, T-17, T-21, T-29 e T-32. Resultado: busca selecionada apresenta condições atuais, timestamp aprovado e estados de falha/parcial.
3. **Previsão e unidade:** T-10 → T-24 → T-25 → T-40; validar com T-13, T-30, T-31 e T-33. Resultado: janela de previsão aprovada e conversão C/F sem novo request.
4. **Hardening e release:** T-34 → T-35 → T-36 → T-37 → T-38. Resultado: erros/retry, viewport mobile, acessibilidade, desempenho e disponibilidade verificados segundo critérios aprovados.

Q1/Q2/Q4/Q5/Q6/Q7/Q8/Q9/Q12 continuam gates para as partes correspondentes. Se alguma não for decidida no preflight, limitar a fatia ao contrato já aprovado e não fixar comportamento candidato como requisito.