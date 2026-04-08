package com.evoluicv.backend.ai.agent;

import com.evoluicv.backend.ai.model.CvAnalysis;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface RecruiterAnalystAgent {

    @SystemMessage(fromResource = "/prompts/recruiter-persona.txt")
    @UserMessage("""
            Objetivo profissional do candidato: {{goal}}
            Cargo alvo (opcional): {{role}}

            Detecte o idioma do CV abaixo e responda TODA a análise nesse mesmo idioma,
            preenchendo o campo `language` com o código ISO 639-1 correspondente.

            --- CV ---
            {{cv}}
            --- FIM DO CV ---
            """)
    CvAnalysis analyze(
            @V("goal") String professionalGoal,
            @V("role") String targetRole,
            @V("cv") String cvText
    );
}
