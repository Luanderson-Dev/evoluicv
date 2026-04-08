package com.evoluicv.backend.ai.model;

import dev.langchain4j.model.output.structured.Description;

public record CvIssue(
        @Description("Seção do CV onde o problema ocorre (ex.: 'Resumo', 'Experiência — Empresa X', 'Ausente')")
        String section,

        @Description("Descrição concreta do problema encontrado")
        String problem,

        @Description("Por que isso é um problema específico para atingir o objetivo profissional informado")
        String why,

        @Description("Sugestão prática e acionável, com exemplo curto quando aplicável")
        String suggestion,

        @Description("Impacto do problema na competitividade para o objetivo: LOW, MEDIUM ou HIGH")
        Severity severity
) {
}
