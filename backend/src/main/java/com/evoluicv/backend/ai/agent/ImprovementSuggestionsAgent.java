package com.evoluicv.backend.ai.agent;

import com.evoluicv.backend.ai.model.ImprovementSuggestions;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface ImprovementSuggestionsAgent {

    @SystemMessage(fromResource = "/prompts/improvement-suggestions-persona.txt")
    @UserMessage("""
            Idioma alvo (mesmo do CV original): {{language}}
            Objetivo profissional do candidato: {{goal}}
            Cargo alvo (opcional): {{role}}

            Parecer do recrutador (use como base para derivar edições concretas):
            {{analysis}}

            --- CV ORIGINAL ---
            {{cv}}
            --- FIM DO CV ORIGINAL ---

            Gere entre 5 e 12 sugestões pontuais de melhoria, priorizadas por impacto, no idioma informado. Cada sugestão deve ser cirúrgica e acionável, sem inventar informações.
            """)
    ImprovementSuggestions suggest(
            @V("language") String language,
            @V("goal") String professionalGoal,
            @V("role") String targetRole,
            @V("analysis") String analysisJson,
            @V("cv") String cvText
    );
}
