package com.evoluicv.backend.ai.model;

import dev.langchain4j.model.output.structured.Description;

import java.util.List;

public record CvAnalysis(
        @Description("Código ISO 639-1 do idioma detectado no CV (ex.: 'pt', 'en', 'es'). A análise inteira deve estar nesse idioma.")
        String language,

        @Description("Nota geral de 0 a 100 refletindo competitividade real do CV para o objetivo profissional informado")
        int overallScore,

        @Description("Parecer executivo em 2 a 3 frases, direto e sem clichês")
        String summary,

        @Description("Pontos fortes reais do CV relevantes para o objetivo profissional informado")
        List<String> strengths,

        @Description("Problemas encontrados no CV, cada um com seção, descrição, justificativa crítica e sugestão acionável")
        List<CvIssue> issues,

        @Description("Ações recomendadas priorizadas da mais impactante para a menos impactante")
        List<String> recommendedActions
) {
}
