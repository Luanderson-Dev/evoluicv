import type { AnalysisInput, AnalysisResponse } from '@/types/analysis';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export class ApiError extends Error {
	readonly status: number;
	readonly details?: string;

	constructor(message: string, status: number, details?: string) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.details = details;
	}
}

interface BackendError {
	timestamp?: string;
	status?: number;
	error?: string;
	message?: string;
}

async function parseError(response: Response): Promise<ApiError> {
	let message = `Falha na análise (HTTP ${response.status})`;
	let details: string | undefined;
	try {
		const body = (await response.json()) as BackendError;
		if (body?.message) {
			message = body.message;
		}
		if (body?.error && body.error !== message) {
			details = body.error;
		}
	} catch {
		// resposta sem JSON — mantém mensagem padrão
	}
	return new ApiError(message, response.status, details);
}

export async function analyzeCv(
	input: AnalysisInput,
	signal?: AbortSignal,
): Promise<AnalysisResponse> {
	const formData = new FormData();
	formData.append('professionalGoal', input.professionalGoal);
	if (input.targetRole) {
		formData.append('targetRole', input.targetRole);
	}
	if (input.file) {
		formData.append('file', input.file);
	} else if (input.cvText) {
		formData.append('cvText', input.cvText);
	}

	const response = await fetch(`${API_BASE_URL}/api/cv/analyze`, {
		method: 'POST',
		body: formData,
		signal,
	});

	if (!response.ok) {
		throw await parseError(response);
	}

	return (await response.json()) as AnalysisResponse;
}

export async function checkHealth(signal?: AbortSignal): Promise<boolean> {
	try {
		const response = await fetch(`${API_BASE_URL}/api/health`, { signal });
		return response.ok;
	} catch {
		return false;
	}
}
