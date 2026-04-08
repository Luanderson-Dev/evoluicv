package com.evoluicv.backend.cv.dto;

import com.evoluicv.backend.ai.model.CvAnalysis;
import com.evoluicv.backend.ai.model.ImprovementSuggestions;

public record AnalysisResponse(
        CvAnalysis analysis,
        ImprovementSuggestions improvements
) {
}
