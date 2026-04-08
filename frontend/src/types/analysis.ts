export type Severity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface CvIssue {
	section: string;
	problem: string;
	why: string;
	suggestion: string;
	severity: Severity;
}

export interface CvAnalysis {
	language: string;
	overallScore: number;
	summary: string;
	strengths: string[];
	issues: CvIssue[];
	recommendedActions: string[];
}

export type ImprovementAction = 'ADD' | 'REMOVE' | 'REWRITE' | 'IMPROVE';

export interface ImprovementSuggestion {
	action: ImprovementAction;
	section: string;
	current?: string | null;
	proposed?: string | null;
	rationale: string;
	impact: Severity;
}

export interface ImprovementSuggestions {
	items: ImprovementSuggestion[];
}

export interface AnalysisResponse {
	analysis: CvAnalysis;
	improvements: ImprovementSuggestions;
}

export interface AnalysisInput {
	file?: File;
	cvText?: string;
	professionalGoal: string;
	targetRole?: string;
}
