# Especificação de Produto — Weather App

## Overview

O Weather App permite consultar as condições meteorológicas de uma cidade escolhida pelo usuário. A primeira versão contempla busca de cidades, visualização do clima atual, previsão de hoje mais os quatro dias seguintes e alternância entre Celsius e Fahrenheit. A interface será em pt-BR, com Celsius como unidade inicial, usando Open-Meteo como fonte de dados sem chave de API. O produto deve funcionar em dispositivos móveis; plataforma, conteúdo detalhado e metas operacionais ainda dependem das decisões registradas em Open Questions.

O objetivo é ajudar pessoas a tomar decisões cotidianas e planejar os próximos dias com informações meteorológicas fáceis de encontrar e compreender. As personas identificadas no discovery são hipóteses e devem ser validadas com usuários.

## Functional Requirements

- **FR1 — Buscar cidades:** o usuário deve poder pesquisar uma cidade e selecionar a localidade desejada entre os resultados disponíveis.
- **FR2 — Consultar clima atual:** após selecionar uma cidade, o usuário deve poder consultar as condições meteorológicas atuais dessa localidade.
- **FR3 — Consultar previsão de cinco dias:** o usuário deve poder consultar a previsão que cobre o dia atual e os quatro dias seguintes.
- **FR4 — Alternar unidade de temperatura:** o usuário deve poder alternar entre Celsius e Fahrenheit; Celsius é a unidade inicial. Todos os valores de temperatura apresentados devem refletir a unidade selecionada.
- **FR5 — Consultar atualização dos dados:** a interface deve informar quando os dados meteorológicos exibidos foram atualizados pela última vez.
- **FR6 — Recuperar falhas:** diante de falha na busca ou consulta meteorológica, a interface deve explicar que a operação não foi concluída e oferecer uma ação para tentar novamente.

## User Stories

- **US1 — Busca de cidade (FR1):** Como decisora do dia a dia, quero buscar e selecionar minha cidade para consultar as condições da localidade correta.
- **US2 — Clima atual (FR2):** Como decisora do dia a dia, quero ver o clima atual da cidade selecionada para decidir como me preparar antes de sair.
- **US3 — Previsão (FR3):** Como planejadora de viagem, quero consultar a previsão de hoje e dos quatro dias seguintes para planejar os próximos dias no destino.
- **US4 — Unidade de temperatura (FR4):** Como planejadora de viagem, quero alternar entre Celsius e Fahrenheit para interpretar as temperaturas na unidade que prefiro.
- **US5 — Atualização dos dados (FR5):** Como profissional de atividade externa, quero saber quando os dados meteorológicos foram atualizados para avaliar se ainda são úteis para ajustar meus planos.
- **US6 — Recuperação de falhas (FR6):** Como decisora do dia a dia, quero tentar novamente uma busca ou consulta que falhou para obter as informações necessárias à minha decisão.

## Acceptance Criteria

### FR1 — Buscar cidades

**AC1.1 — Distinguir localidades homônimas**

- **Dado que** a busca retorna duas localidades com o mesmo nome e região e país disponíveis.
- **Quando** a pessoa usuária executa a busca.
- **Então** os dois resultados são apresentados com nome da cidade, região e país.

**AC1.2 — Selecionar uma localidade**

- **Dado que** os resultados da busca contêm mais de uma localidade.
- **Quando** a pessoa usuária seleciona um resultado.
- **Então** a cidade selecionada corresponde ao nome e ao contexto geográfico daquele resultado.

**AC1.3 — Nenhum resultado**

- **Dado que** um termo de busca sem localidades correspondentes.
- **Quando** a pessoa usuária executa a busca.
- **Então** o sistema informa que nenhuma cidade foi encontrada e não seleciona uma localidade.

### FR2 — Consultar clima atual

**AC2.1 — Dados atuais disponíveis**

- **Dado que** uma cidade selecionada e dados atuais válidos contendo temperatura e condição meteorológica.
- **Quando** a consulta é concluída.
- **Então** a interface identifica a cidade e apresenta a temperatura na unidade selecionada e a condição retornada para essa cidade. Os campos adicionais obrigatórios ainda dependem da decisão sobre conteúdo meteorológico.

**AC2.2 — Dado atual ausente**

- **Dado que** uma cidade selecionada e uma resposta sem temperatura atual.
- **Quando** a consulta é concluída.
- **Então** a interface não apresenta um valor numérico como temperatura atual válida e identifica esse dado como indisponível.

### FR3 — Consultar previsão de cinco dias

**AC3.1 — Previsão cobre a janela definida**

- **Dado que** uma cidade com fuso horário conhecido e dados de previsão para hoje e os quatro dias locais seguintes.
- **Quando** a previsão é exibida.
- **Então** a interface apresenta dados para exatamente essas cinco datas locais, em ordem cronológica, sem incluir uma sexta data nem omitir uma das cinco.

**AC3.2 — Fuso horário indisponível**

- **Dado que** a fonte não fornece um fuso horário válido para a cidade selecionada.
- **Quando** a aplicação determina as cinco datas da previsão.
- **Então** não atribui datas com base em um fuso arbitrário; o fallback depende da decisão de produto registrada em Open Questions.

**AC3.3 — Dados ausentes em uma das datas**

- **Dado que** uma resposta de previsão sem dados para uma das cinco datas.
- **Quando** a previsão é exibida.
- **Então** a data continua identificada e seus dados são marcados como indisponíveis, sem copiar valores de outro dia.

### FR4 — Alternar unidade de temperatura

**AC4.1 — Unidade inicial**

- **Dado que** uma primeira consulta sem preferência de unidade previamente definida.
- **Quando** os dados de temperatura são exibidos.
- **Então** os valores são apresentados em Celsius.

**AC4.2 — Alternar todas as temperaturas visíveis para Fahrenheit**

- **Dado que** valores de temperatura visíveis no clima atual e na previsão, incluindo 20 °C.
- **Quando** a pessoa usuária seleciona Fahrenheit.
- **Então** todos os valores de temperatura visíveis passam a usar Fahrenheit, 20 °C é apresentado como 68 °F, e cidade, datas e condições meteorológicas permanecem inalteradas.

**AC4.3 — Alternar de volta para Celsius**

- **Dado que** os mesmos dados apresentados em Fahrenheit, incluindo 68 °F.
- **Quando** a pessoa usuária seleciona Celsius.
- **Então** todos os valores visíveis passam a usar Celsius e 68 °F é apresentado como 20 °C.

**Nota de testabilidade:** os exemplos acima verificam conversões exatas. A precisão e o arredondamento para valores fracionários, assim como a duração da preferência, precisam ser definidos antes de ampliar os testes de aceite.

### FR5 — Consultar atualização dos dados

**AC5.1 — Fonte informa horário de atualização**

- **Dado que** dados meteorológicos associados ao timestamp definido como horário de atualização do produto.
- **Quando** esses dados são exibidos.
- **Então** a interface apresenta esse horário no formato regional aprovado.

**AC5.2 — Fonte não informa horário de atualização**

- **Dado que** dados meteorológicos sem horário de atualização fornecido pela fonte.
- **Quando** esses dados são exibidos.
- **Então** a interface informa “Horário de atualização indisponível” e não apresenta um horário inventado.

### FR6 — Recuperar falhas

**AC6.1 — Nova tentativa tem sucesso**

- **Dado que** uma busca ou consulta que falhou e uma ação de nova tentativa disponível.
- **Quando** a pessoa usuária aciona nova tentativa e a operação é concluída com sucesso.
- **Então** o erro anterior deixa de ser exibido e o resultado da operação é apresentado.

**AC6.2 — Nova tentativa também falha**

- **Dado que** uma busca ou consulta que falhou.
- **Quando** a pessoa usuária aciona nova tentativa e a operação falha novamente.
- **Então** o sistema identifica que a operação falhou e continua oferecendo a ação de nova tentativa. O texto final da mensagem permanece pendente de aprovação.

**Prontidão dos critérios:**

| Requisito | O que já pode ser testado | Decisão pendente para aceite completo |
|---|---|---|
| FR1 | Resultados sem correspondência e seleção de localidade homônima. | Tipos de entrada aceitos e fallback quando região ou país não estiver disponível. |
| FR2 | Exibição de temperatura e condição válidas; dado ausente não aparece como valor válido. | Lista completa de campos obrigatórios e opcionais. |
| FR3 | Janela com cinco datas em ordem cronológica quando o fuso é conhecido. | Granularidade da previsão, fonte do fuso e fallback quando inválido/ausente. |
| FR4 | Unidade inicial Celsius e conversões exatas nos dois sentidos. | Precisão/arredondamento e duração da preferência. |
| FR5 | Exibição de um timestamp fornecido e fallback quando ausente. | Significado do timestamp e defasagem máxima aceitável. |
| FR6 | Nova tentativa com sucesso e nova tentativa que falha. | Limite de timeout e conteúdo final das mensagens por tipo de falha. |

Os critérios da última coluna são parciais e não devem ser usados como cobertura completa de aceite até as decisões correspondentes serem aprovadas.

## Non-Functional Requirements

- **NFR1 — Uso móvel e responsividade:** os fluxos de busca e consulta devem permanecer utilizáveis em dispositivos móveis e em diferentes larguras de tela. Como critério inicial sujeito a aprovação, validar os fluxos principais a partir de 320 px de largura sem rolagem horizontal da página. A matriz de dispositivos e navegadores permanece em aberto.
- **NFR2 — Acessibilidade:** os fluxos principais devem ser operáveis por teclado e compatíveis com tecnologias assistivas. WCAG 2.2 nível AA é a referência proposta, sujeita a aprovação e definição do método de avaliação.
- **NFR3 — Desempenho:** a proposta inicial é que 95% das buscas e consultas apresentem resultado em até 3 segundos. Para ser testável, devem ser acordados dispositivo, condições de rede, conjunto de amostras e pontos de início e fim da medição.
- **NFR4 — Disponibilidade:** a proposta inicial é disponibilidade mensal de 99,5% para a aplicação. Devem ser definidos período, janela de medição, manutenção planejada e atribuição de incidentes do provedor externo; a disponibilidade do provedor deve ser acompanhada separadamente.
- **NFR5 — Frescor dos dados:** os dados meteorológicos devem respeitar uma defasagem máxima a ser definida. O horário de atualização deve ser mostrado conforme FR5.
- **NFR6 — Resiliência:** falhas temporárias de conexão ou do provedor não devem deixar a aplicação em estado irrecuperável; depois de uma falha, o usuário deve poder tentar a operação novamente conforme FR6.
- **NFR7 — Privacidade e segurança:** coletar e transmitir somente os dados necessários à consulta. Antes da implementação, documentar quais dados de busca/localização são enviados ao provedor, se há armazenamento local, a finalidade e o prazo de retenção; comunicar eventual uso de localização e definir critérios verificáveis para proteção dos dados em trânsito.
- **NFR8 — Idioma e região:** a interface deve estar em pt-BR. Formatos de data, horário e demais convenções regionais precisam ser definidos antes da aprovação dos critérios correspondentes.

As metas numéricas e referências classificadas como propostas não são compromissos aprovados até validação pelas partes interessadas.

## Traceability

| User Story | Requisito funcional | Acceptance Criteria | Requisitos não-funcionais relevantes |
|---|---|---|---|
| US1 — Busca de cidade | FR1 | AC1.1, AC1.2, AC1.3 | NFR1 (uso móvel), NFR2 (acessibilidade), NFR3 (desempenho), NFR7 (privacidade da busca), NFR8 (idioma/região) |
| US2 — Clima atual | FR2 | AC2.1, AC2.2 | NFR1 (uso móvel), NFR2 (acessibilidade), NFR3 (desempenho), NFR5 (frescor dos dados), NFR8 (idioma/região) |
| US3 — Previsão | FR3 | AC3.1, AC3.2, AC3.3 | NFR1 (uso móvel), NFR2 (acessibilidade), NFR3 (desempenho), NFR5 (frescor dos dados), NFR8 (idioma/região) |
| US4 — Unidade de temperatura | FR4 | AC4.1, AC4.2, AC4.3 | NFR1 (uso móvel), NFR2 (acessibilidade), NFR8 (idioma/região) |
| US5 — Atualização dos dados | FR5 | AC5.1, AC5.2 | NFR2 (acessibilidade), NFR3 (desempenho), NFR4 (disponibilidade), NFR5 (frescor dos dados) |
| US6 — Recuperação de falhas | FR6 | AC6.1, AC6.2 | NFR1 (uso móvel), NFR2 (acessibilidade), NFR3 (desempenho), NFR6 (resiliência), NFR7 (privacidade) |

## Edge Cases

- **Input vazio:** após remover espaços em branco das extremidades, se o campo estiver vazio, não enviar uma requisição; orientar a pessoa usuária a informar uma cidade e manter o campo disponível para correção.
- **Cidade inexistente:** quando a consulta não corresponder a uma localidade válida, informar que a cidade não foi encontrada, preservar o termo digitado e permitir nova busca. Não selecionar outra cidade nem solicitar sua previsão.
- **Geocoding sem resultados:** se o serviço de localização retornar uma lista vazia, exibir o estado sem resultados associado à consulta, permitir editar o termo e não chamar o serviço de previsão.
- **Caracteres especiais:** aceitar caracteres válidos em nomes de localidades, incluindo acentos, apóstrofos, hífens e Unicode; tratá-los como texto de busca e não falhar ou alterar indevidamente o termo. Se não houver correspondência, aplicar o estado sem resultados.
- **Localidades homônimas:** quando houver mais de uma cidade com o mesmo nome, exibir contexto geográfico suficiente para diferenciá-las; a seleção deve consultar somente a localidade escolhida.
- **Falha de API:** informar que a busca ou consulta não foi concluída, preservar o termo de busca e permitir nova tentativa. Não apresentar dados antigos como atuais; eventual apresentação de cache depende de decisão explícita.
- **Timeout:** ao ultrapassar o limite de espera definido, encerrar o estado de carregamento, informar que a operação demorou demais e oferecer nova tentativa. Uma resposta atrasada de uma tentativa anterior não deve substituir o resultado de uma tentativa mais recente.
- **Resposta parcial:** exibir campos válidos e identificar cada campo ausente como indisponível, sem inventar valores. Manter identificada cada data da previsão mesmo quando faltarem dados para ela.
- **Dados inválidos ou atrasados:** não apresentá-los como valores atuais válidos; exibir o horário de atualização quando disponível e aplicar o critério de frescor a definir.
- **Datas e fuso:** a janela da previsão atravessa a meia-noite local, mudança de fuso ou transição de horário; datas devem seguir o fuso da cidade, ainda pendente de definição.
- **Alternância de unidade:** Celsius/Fahrenheit é alternado repetidamente ou durante o carregamento; todos os valores disponíveis devem permanecer consistentes, sem alterar cidade, datas ou condições meteorológicas.
- **Falha na nova tentativa:** manter uma mensagem compreensível e continuar oferecendo a ação de nova tentativa.
- **Dispositivo sem suporte:** se navegador ou dispositivo não estiver na matriz aprovada, o comportamento esperado depende da matriz ainda a definir.
- **Capacidades opcionais:** caso geolocalização, cache ou armazenamento local sejam aprovados, definir os comportamentos para permissão negada, dados armazenados desatualizados e remoção dos dados. Essas capacidades ainda não fazem parte do escopo confirmado.

## Assumptions

- A pessoa usuária seleciona uma cidade antes de consultar suas condições meteorológicas.
- A janela da previsão é hoje mais os quatro dias seguintes, conforme decisão D2; a granularidade diária ou horária continua pendente.
- Celsius é a unidade inicial. Fahrenheit também está disponível para temperaturas; as unidades de vento e precipitação ainda não foram definidas.
- A interface será em pt-BR e Open-Meteo será a fonte de dados, conforme decisões D1 e D5.
- Não haverá autenticação nem persistência de dados no servidor, conforme decisão D4. Isso não determina se haverá armazenamento local no navegador.
- A experiência móvel é obrigatória; o formato de distribuição (site responsivo, PWA ou app nativo) ainda não está decidido.
- As personas e a meta de consulta em menos de 30 segundos são hipóteses do discovery, não evidências de pesquisa nem critérios de aceite aprovados.

## Risks

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Open-Meteo não cobrir uma localidade, alterar condições de uso ou limitar o volume de consultas. | Média | Alto: consultas podem falhar ou exigir mudanças no produto. | Confirmar cobertura, limites, licença, atribuição e custos antes de aprovar o contrato de dados; acompanhar falhas e consumo. |
| Busca ambígua levar à seleção da cidade errada. | Alta | Alto: previsões incorretas para a necessidade da pessoa usuária. | Exibir contexto geográfico suficiente e definir como resultados homônimos serão diferenciados. |
| Granularidade, campos ou fuso da previsão permanecerem indefinidos. | Alta | Médio: critérios e telas divergentes podem gerar retrabalho. | Fechar conteúdo, granularidade e regra de data local antes de aprovar os critérios de aceite de FR3. |
| Dados desatualizados ou incompletos parecerem atuais. | Média | Alto: decisões podem ser tomadas com informação inadequada. | Definir frescor máximo, exibir horário de atualização e não apresentar campos ausentes como válidos. |
| Conversão ou apresentação de unidades ser inconsistente. | Baixa | Alto: reduz confiança nos valores meteorológicos. | Definir arredondamento e cobertura da alternância; verificar todos os valores de temperatura apresentados. |
| Desempenho ou disponibilidade do provedor afetar a percepção do produto. | Média | Alto: consultas lentas ou indisponíveis comprometem a função principal. | Definir medições reproduzíveis, acompanhar separadamente aplicação e provedor e especificar estados de recuperação. |
| Coleta ou transmissão de busca/localização não atender às expectativas de privacidade. | Baixa | Alto: perda de confiança e exposição desnecessária de dados. | Minimizar dados, definir tratamento e retenção, e não usar localização sem decisão e comunicação apropriadas. |
| Personas hipotéticas serem tomadas como necessidades comprovadas. | Média | Médio: decisões de produto podem otimizar para casos não representativos. | Validar personas e métricas com usuários antes de usá-las como critério de prioridade ou aceite. |

## Out of Scope

### Excluído da primeira versão

- Autenticação e contas de usuário, conforme decisão D4.
- Persistência de dados no servidor, conforme decisão D4.

### Pendente de decisão de escopo

- Alertas meteorológicos severos, geolocalização automática, histórico/favoritos, cache e funcionamento offline.
- Formato de distribuição (site responsivo, PWA ou app nativo) e matriz de navegadores/dispositivos.

Os itens pendentes não são compromisso nem exclusão definitiva. Cada decisão deve ser aprovada antes de entrar nos critérios de aceite da versão.

## Open Questions

| ID | Pergunta em aberto | Requisitos afetados |
|---|---|---|
| Q1 | Quais campos são obrigatórios/opcionais para clima atual e cada período da previsão, e como representar cada campo ausente? | FR2, FR3 |
| Q2 | A previsão será diária, horária ou ambas? Qual fuso define as cinco datas e qual fallback usar se ele faltar? | FR3 |
| Q3 | Quais entradas e padrão de busca serão aceitos? Quais dados distinguem localidades homônimas e qual o fallback se região/país faltar? | FR1 |
| Q4 | O timestamp representa observação, atualização da fonte ou consulta? Qual defasagem máxima e fallback são aceitáveis? | FR5, NFR5 |
| Q5 | Quais unidades se aplicam a vento/precipitação, qual arredondamento usar e a unidade escolhida persiste entre visitas? | FR4 |
| Q6 | Qual formato de distribuição, matriz de navegadores/dispositivos e larguras suportadas serão aprovados? | NFR1 |
| Q7 | Quais condições reproduzíveis de rede, dispositivo, amostra e janela serão usadas para medir desempenho e disponibilidade? Qual o nível/método de acessibilidade? | NFR2, NFR3, NFR4 |
| Q8 | Qual o limite de timeout e quais mensagens/estados serão usados para input vazio, nenhum resultado, erro de API e timeout? | FR1, FR6 |
| Q9 | Quais dados de busca/localização são enviados ao Open-Meteo? Haverá armazenamento local, com qual finalidade, retenção, consentimento e proteção? | NFR7 |
| Q10 | Alertas, geolocalização automática, cache/offline e histórico/favoritos entram no MVP ou ficam adiados? | Escopo |
| Q11 | Quais métricas de resultado do produto serão aprovadas e as personas hipotéticas serão validadas com usuários? | Overview, User Stories |
| Q12 | Quais cobertura, limites, licença, atribuição e condições de uso do Open-Meteo se aplicam? A integração será direta ou intermediada? | FR1–FR3, NFR4, NFR7 |

**Gate de aprovação:** Q1–Q9 e Q12 precisam ser respondidas ou formalmente aceitas como restrições antes da baseline de aceite e produção. Q10 define o escopo do MVP; Q11 é necessário para avaliar resultado do produto, mas não bloqueia os fluxos funcionais básicos.