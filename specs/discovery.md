# Discovery — Aplicação de Previsão do Tempo

## Contexto

A empresa pretende oferecer uma aplicação de previsão do tempo para usuários que precisam consultar as condições meteorológicas de uma cidade. A experiência deve permitir buscar cidades, visualizar o clima atual e consultar a previsão para cinco dias. O produto também deve oferecer alternância entre Celsius e Fahrenheit e funcionar em dispositivos móveis.

O briefing original não definia a fonte de dados nem a janela da previsão; essas decisões foram registradas abaixo. Ainda faltam detalhes sobre os campos meteorológicos, a granularidade da previsão, os fluxos de busca e critérios mensuráveis de qualidade.

## Requisitos Funcionais

- **RF1 — Buscar cidades:** permitir que o usuário pesquise uma cidade.
- **RF2 — Consultar clima atual:** exibir as condições meteorológicas atuais da cidade selecionada.
- **RF3 — Consultar previsão:** exibir a previsão do tempo para cinco dias.
- **RF4 — Alternar unidades:** permitir alternar entre Celsius e Fahrenheit e apresentar as temperaturas na unidade escolhida.
- **RF5 — Informar atualização:** exibir quando os dados meteorológicos foram atualizados pela última vez.
- **RF6 — Recuperar falhas:** comunicar falhas de busca ou consulta e oferecer uma ação para tentar novamente.

## Requisitos Não-Funcionais

- **RNF1 — Compatibilidade móvel:** a aplicação deve ser utilizável em dispositivos móveis. Os tamanhos de tela e navegadores suportados precisam ser definidos.
- **RNF2 — Responsividade:** conteúdo e controles devem se adaptar a diferentes larguras de tela sem perda de funcionalidades. Como critério inicial, validar os fluxos principais a partir de 320 px, sem rolagem horizontal da página.
- **RNF3 — Usabilidade:** busca, consulta da cidade e alternância de unidade devem ser compreensíveis e fáceis de operar. Definir critérios de sucesso e validá-los com usuários.
- **RNF4 — Acessibilidade:** controles e informações devem ser acessíveis por teclado e tecnologias assistivas. Recomenda-se adotar WCAG 2.2 nível AA como referência, sujeito a acordo.
- **RNF5 — Desempenho:** como meta inicial, 95% das buscas e consultas devem apresentar resultado em até 3 segundos nas condições de rede e dispositivo acordadas. Validar esse limite com as partes interessadas.
- **RNF6 — Resiliência:** falhas temporárias da conexão ou do provedor não devem deixar a aplicação em estado irrecuperável; a interface deve continuar permitindo nova tentativa.
- **RNF7 — Disponibilidade:** definir meta mensal e janela de medição para a aplicação. Uma meta inicial de 99,5% pode ser avaliada; a disponibilidade do provedor externo deve ser acompanhada separadamente.
- **RNF8 — Atualização dos dados:** definir a defasagem máxima aceitável dos dados meteorológicos e como ela será medida.
- **RNF9 — Privacidade e segurança:** definir quais dados são enviados ao provedor, consentimento para eventual localização, retenção e proteção dos dados em trânsito.

### Revisão da classificação

RF1 a RF6 são funcionais, pois descrevem capacidades oferecidas pelo sistema. RNF1 a RNF9 são não-funcionais, pois definem qualidades, restrições ou metas operacionais. Compatibilidade móvel (RNF1) e responsividade (RNF2) são relacionadas, mas distintas: uma define o contexto de uso; a outra, a adaptação da interface. Exibir o horário da atualização e oferecer nova tentativa são comportamentos funcionais; a defasagem dos dados e a resiliência são requisitos não-funcionais.

Riscos, perguntas em aberto e suposições ajudam a análise, mas não são requisitos por si só. As metas numéricas e referências sugeridas nos RNFs devem ser confirmadas antes de se tornarem critérios de aceite.

## Riscos

| Risco | Tipo | Probabilidade | Impacto | Estratégia de mitigação |
|---|---|---|---|---|
| Indisponibilidade, limite de requisições ou mudança nas condições da API meteorológica. | Técnico | Média | Alto: consultas podem falhar ou gerar custos e retrabalho. | Verificar cobertura, limites, licenças, atribuição e custos do Open-Meteo; decidir como a aplicação consumirá os endpoints e monitorar falhas e consumo. |
| Dados meteorológicos desatualizados ou imprecisos para a localidade escolhida. | Produto | Média | Alto: usuários podem tomar decisões com informações pouco confiáveis. | Avaliar cobertura e frequência de atualização do provedor; exibir o horário da última atualização e definir uma defasagem máxima aceitável. |
| Busca retornar cidades homônimas ou resultados incorretos. | Produto | Alta | Alto: o usuário pode consultar a previsão de outra localidade. | Exibir contexto como estado, região e país; permitir que o usuário confirme a cidade selecionada. |
| Granularidade e conteúdo da previsão ainda não estarem definidos. | Produto | Alta | Médio: entregas podem divergir e gerar retrabalho ou expectativas frustradas. | Definir previsão diária ou horária, campos exibidos e tratamento de datas por fuso antes dos critérios de aceite. |
| Datas da previsão ficarem incorretas por fuso horário ou mudança de horário. | Técnico | Média | Médio: previsões podem aparecer associadas ao dia errado. | Usar o fuso horário da cidade retornado pela fonte de dados e validar limites entre dias e transições de horário. |
| Alternância Celsius/Fahrenheit não atualizar todos os valores corretamente. | Técnico | Baixa | Alto: temperaturas inconsistentes reduzem a confiança no produto. | Centralizar a conversão e a unidade selecionada; cobrir conversões e atualização da interface com testes. |
| Aplicação ficar difícil de usar em celulares ou com tecnologia assistiva. | Produto/Técnico | Média | Alto: usuários podem não conseguir completar a busca ou consultar a previsão. | Definir dispositivos e larguras suportados; testar fluxos em telas pequenas, teclado e leitor de tela; acordar critérios de acessibilidade. |
| Lentidão ou falhas de rede interromperem a busca e a consulta. | Técnico | Média | Alto: o app pode parecer indisponível mesmo quando a falha é temporária. | Definir metas de desempenho e disponibilidade; oferecer estados de carregamento e erro, opção de tentar novamente e, se aprovado, cache com indicação da idade dos dados. |
| Coleta de localização ou histórico sem regras claras de privacidade. | Produto/Técnico | Baixa | Alto: pode haver perda de confiança e exposição desnecessária de dados. | Minimizar dados coletados; definir consentimento, retenção e proteção; oferecer busca manual sem exigir geolocalização. |
| Alertas meteorológicos importantes serem esperados pelos usuários, mas não fazerem parte do escopo. | Produto | Média | Médio a alto: usuários podem considerar o app incompleto para situações de risco. | Confirmar explicitamente se alertas fazem parte da primeira versão; se não fizerem, deixar o escopo claro e avaliar essa capacidade separadamente. |

## Perguntas em Aberto

1. **Quem são os usuários prioritários e em quais situações consultarão o app?**  
   *Impacto:* a experiência pode ser otimizada para o fluxo errado, como planejamento semanal em vez de consulta rápida.

2. **O produto será um site responsivo, um app instalável (PWA) ou também um app nativo?**  
   *Impacto:* muda distribuição, capacidades do dispositivo, arquitetura e esforço de desenvolvimento.

3. **Como a busca deve funcionar: ao enviar, com sugestões enquanto digita ou ambos?**  
   *Impacto:* afeta a experiência, a latência percebida e os requisitos de geocodificação.

4. **Quais entradas de busca serão aceitas, como nome, código postal ou coordenadas?**  
   *Impacto:* usuários podem não encontrar localidades usando o formato que esperam.

5. **Como distinguir cidades homônimas: quais dados de localização serão exibidos nos resultados?**  
   *Impacto:* o usuário pode selecionar uma localidade incorreta e receber dados meteorológicos irrelevantes.

6. **O app deve sugerir uma localização automaticamente ou funcionar apenas com busca manual?**  
   *Impacto:* geolocalização exige permissões, alternativa em caso de recusa e decisões de privacidade.

7. **Quais campos compõem o clima atual, como temperatura, sensação térmica, condição, vento e umidade?**  
   *Impacto:* sem escopo definido, a interface e os dados entregues podem variar entre implementações.

8. **A previsão será diária, horária ou ambas?**  
    *Impacto:* afeta quantidade de períodos, layout e interpretação das datas. **Status:** a janela foi definida pela decisão D2 como hoje mais os quatro dias seguintes; a granularidade continua em aberto.

9. **Quais informações cada período da previsão deve apresentar?**  
   *Impacto:* não há critério claro para avaliar se a previsão está completa.

10. **O app deve mostrar alertas meteorológicos severos?**  
    *Impacto:* a ausência pode omitir informações importantes; a inclusão altera escopo e responsabilidades do produto.

11. **Qual fuso horário determina o dia da previsão para cada cidade?**  
    *Impacto:* datas e períodos diários podem ser exibidos incorretamente, especialmente para usuários em outro fuso ou em mudanças de horário.

12. **Celsius/Fahrenheit se aplica a todas as temperaturas? Quais unidades serão usadas para vento e precipitação?**  
    *Impacto:* a tela pode misturar sistemas de medida ou apresentar valores ambíguos.

13. **Qual será a unidade inicial e a escolha será mantida entre visitas?**  
    *Impacto:* a primeira consulta pode usar uma unidade inesperada; persistir a escolha requer definir onde e por quanto tempo armazená-la. **Status:** a unidade inicial foi resolvida pela decisão D3; persistência local continua em aberto.

14. **Quais idiomas, formatos de data e convenções regionais serão atendidos?**  
    *Impacto:* textos, datas e resultados de busca podem não corresponder às expectativas da região do usuário. **Status:** o idioma da interface foi resolvido pela decisão D5; formatos de data e outras convenções regionais continuam em aberto.

15. **Quais são a cobertura, os limites, as condições de uso e a atribuição exigida pelo Open-Meteo? A aplicação chamará os endpoints diretamente do navegador ou por um intermediário?**  
    *Impacto:* pode haver localidades sem dados, restrições de uso ou mudanças de arquitetura. **Status:** a fonte e a ausência de chave foram resolvidas pela decisão D1; os demais pontos continuam em aberto.

16. **Qual frequência de atualização é aceitável e como a idade dos dados será indicada?**  
    *Impacto:* dados desatualizados podem ser interpretados como condições atuais, reduzindo confiança e utilidade.

17. **Quais mensagens e estados serão apresentados quando não há resultados, a cidade não é encontrada ou a API falha?**  
    *Impacto:* sem critérios definidos, o usuário pode ficar sem explicação ou sem caminho para continuar; RF6 estabelece nova tentativa, mas não define todos esses estados.

18. **O app deve funcionar parcialmente sem conexão ou manter dados recentes em cache?**  
    *Impacto:* altera armazenamento, tratamento de dados desatualizados e comportamento offline.

19. **Quais tamanhos de tela, orientações, navegadores e dispositivos devem ser suportados?**  
    *Impacto:* “funcionar em dispositivos móveis” não pode ser testado objetivamente sem uma matriz de suporte.

20. **Quais requisitos de acessibilidade serão adotados para teclado, leitores de tela e contraste?**  
    *Impacto:* pessoas com deficiência podem não conseguir usar os fluxos principais, e não haverá critério verificável de conformidade.

21. **Quais condições de rede, dispositivo e ponto inicial/final serão usados para medir o desempenho de busca e consulta?**  
    *Impacto:* sem condições e limites definidos, a meta inicial de 3 segundos no RNF5 não pode ser testada de forma reproduzível.

22. **Qual disponibilidade é esperada para a aplicação, como será medida e como falhas do provedor externo serão contabilizadas?**  
    *Impacto:* sem separar a disponibilidade da aplicação daquela do provedor, a meta inicial de 99,5% não terá atribuição nem medição claras.

23. **O app armazenará buscas recentes, cidades favoritas ou preferências? Por quanto tempo?**  
    *Impacto:* afeta persistência, experiência entre sessões, privacidade e possivelmente autenticação. **Status:** persistência no servidor foi descartada pela decisão D4; armazenamento local e funcionalidades de histórico/favoritos continuam em aberto.

24. **Haverá contas de usuário ou o produto será anônimo?**  
    *Impacto:* contas podem exigir cadastro, recuperação, sincronização e requisitos adicionais de segurança e privacidade. **Status:** resolvida pela decisão D4: não haverá autenticação.

25. **Quais dados serão enviados ao Open-Meteo ou coletados no cliente, especialmente buscas de cidades, geolocalização ou histórico?**  
    *Impacto:* buscas podem revelar localização; sem definir fluxo, consentimento, retenção e proteção, pode haver tratamento incompatível com as expectativas dos usuários.

26. **Quais métricas definirão o sucesso do produto e os critérios para considerar a primeira versão pronta?**  
    *Impacto:* o time pode concluir a implementação sem saber se ela atende ao objetivo de negócio ou ao mínimo esperado pelos usuários.

## Decisões

1. **D1 — Fonte de dados: Open-Meteo, sem API key.**  
    *Justificativa:* evita a emissão e o gerenciamento de uma chave de API.  
    *Resolve:* a escolha da fonte e a necessidade de chave na pergunta 15. Cobertura, limites e condições de uso ainda precisam ser verificados.

2. **D2 — “Cinco dias” significa hoje mais os quatro dias seguintes.**  
    *Justificativa:* define uma janela previsível que inclui o dia da consulta.  
    *Resolve:* se hoje faz parte da previsão, na pergunta 8. A granularidade diária ou horária permanece em aberto.

3. **D3 — Unidade padrão: Celsius.**  
    *Justificativa:* estabelece uma unidade inicial alinhada ao público e ao idioma pt-BR definidos para a primeira versão.  
    *Resolve:* a unidade inicial na pergunta 13. A persistência da preferência entre visitas permanece em aberto.

4. **D4 — Sem autenticação e sem persistência de dados no servidor.**  
    *Justificativa:* reduz o escopo da primeira versão, evitando contas e armazenamento de dados de usuário no servidor.  
    *Resolve:* a necessidade de contas na pergunta 24 e descarta persistência no servidor na pergunta 23. Armazenamento local, histórico e favoritos continuam em aberto.

5. **D5 — Idioma da interface: pt-BR.**  
    *Justificativa:* oferece uma experiência consistente para o público brasileiro.  
    *Resolve:* o idioma da interface na pergunta 14. Formatos de data e outras convenções regionais ainda devem ser definidos.

## Condições para iniciar a especificação

As decisões D1 a D5 permitem avançar, desde que as lacunas abaixo sejam resolvidas ou registradas explicitamente como pendências, com responsável e impacto:

- **Limites do MVP:** confirmar plataforma, campos meteorológicos e inclusão ou exclusão de alertas, geolocalização, funcionamento offline e favoritos.
- **Contrato de dados:** definir granularidade e campos da previsão, fuso horário, unidades além da temperatura, frequência de atualização e convenções de data pt-BR.
- **Integração com o provedor:** verificar cobertura, limites, licença, atribuição e estratégia de consumo dos endpoints Open-Meteo.
- **Fluxos e exceções:** definir comportamento para busca ambígua, nenhum resultado, falha do provedor, carregamento e nova tentativa.
- **Dados e privacidade:** decidir se haverá armazenamento local e documentar os dados enviados ao provedor, incluindo eventual localização.
- **Critérios de aceite:** confirmar metas mensuráveis de desempenho, disponibilidade, acessibilidade e compatibilidade; separar a disponibilidade da aplicação daquela do provedor.
- **Rastreabilidade:** não tratar metas sugeridas ou personas hipotéticas como compromissos aprovados sem validação das partes interessadas.

## Personas

As personas abaixo são hipóteses iniciais baseadas no briefing e devem ser validadas com usuários.

| Persona | Objetivo principal | Contexto de uso | Métrica de sucesso do ponto de vista da pessoa |
|---|---|---|---|
| **Decisora do dia a dia:** consulta o tempo antes de sair de casa. | Saber rapidamente como está o clima na cidade e decidir o que vestir ou levar. | Principalmente no celular, em consultas rápidas pela manhã ou antes de sair. | Consulta a cidade correta e toma uma decisão em menos de 30 segundos. |
| **Planejadora de viagem:** organiza uma viagem com alguns dias de antecedência. | Consultar os cinco dias da cidade de destino para planejar datas e bagagem. | Desktop durante o planejamento e celular durante a viagem. | Encontra e compreende a previsão de todos os dias relevantes sem repetir a busca ou converter temperaturas manualmente. |
| **Profissional de atividade externa:** organiza tarefas que dependem das condições do tempo. | Verificar as condições da cidade onde trabalhará e decidir quando realizar atividades ao ar livre. | Principalmente no celular, antes do expediente e durante o dia; desktop para planejamento. | Consulta a localidade correta e obtém informações atuais o bastante para decidir se mantém ou ajusta os planos. |

A métrica da terceira persona pressupõe que a fonte de dados ofereça atualização e detalhamento adequados para esse uso; isso ainda precisa ser confirmado.

A meta de consulta em menos de 30 segundos da primeira persona é uma hipótese inicial, não um critério de aceite aprovado.

## Suposições

- O usuário escolhe uma cidade por meio da busca antes de consultar seu clima.
- A previsão cobre o dia atual e os quatro dias seguintes; a granularidade diária ou horária ainda será definida.
- Celsius e Fahrenheit são as únicas unidades de temperatura necessárias.
- O uso em dispositivos móveis inclui acesso às funcionalidades principais, não apenas visualização.
- Open-Meteo será a fonte de dados, a interface será em pt-BR e Celsius será a unidade inicial.
- Não haverá autenticação nem persistência de dados no servidor; persistência local e uso de geolocalização ainda não foram decididos.
- Os critérios de desempenho, disponibilidade e acessibilidade serão definidos antes de serem tratados como requisitos de aceite.
