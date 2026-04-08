package com.evoluicv.backend.cv.dto;

import jakarta.validation.constraints.NotBlank;

public record AnalysisRequest(
        @NotBlank(message = "cvText é obrigatório quando não há arquivo") String cvText,
        @NotBlank(message = "professionalGoal é obrigatório") String professionalGoal,
        String targetRole
) {
}
