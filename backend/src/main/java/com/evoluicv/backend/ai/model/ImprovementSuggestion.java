package com.evoluicv.backend.ai.model;

import dev.langchain4j.model.output.structured.Description;

public record ImprovementSuggestion(
        @Description("Tipo de ação: ADD (incluir algo novo), REMOVE (remover), REWRITE (reescrever/ajustar um trecho existente), IMPROVE (refinar mantendo a ideia)")
        ImprovementAction action,

        @Description("Seção do CV afetada (ex.: 'Resumo', 'Experiência — Empresa X', 'Habilidades', 'Formação')")
        String section,

        @Description("Trecho atual do CV que será alterado ou removido. Deve ser null/vazio quando action=ADD.")
        String current,

        @Description("Texto concreto sugerido (o que deve ficar no lugar, ou o que deve ser adicionado). Deve ser null/vazio quando action=REMOVE.")
        String proposed,

        @Description("Motivo objetivo — por que essa mudança melhora o CV para o objetivo profissional do candidato")
        String rationale,

        @Description("Impacto esperado da mudança: HIGH, MEDIUM ou LOW")
        Severity impact
) {
}
