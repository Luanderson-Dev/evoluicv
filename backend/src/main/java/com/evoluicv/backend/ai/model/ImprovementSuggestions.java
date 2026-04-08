package com.evoluicv.backend.ai.model;

import dev.langchain4j.model.output.structured.Description;

import java.util.List;

public record ImprovementSuggestions(
        @Description("Lista de sugestões pontuais de melhoria, priorizadas por impacto")
        List<ImprovementSuggestion> items
) {
}
