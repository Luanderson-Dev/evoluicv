import type { AnalysisInput, AnalysisResponse } from '@/types/analysis';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL !== undefined
		? process.env.NEXT_PUBLIC_API_URL
		: process.env.NODE_ENV === 'production'
			? ''
			: 'http://localhost:8080';

export class ApiError extends Error {
	readonly status: number;
	readonly details?: string;
	readonly errorCode?: string;
	readonly retryAfterSeconds?: number;

	constructor(
		message: string,
		status: number,
		options: { details?: string; errorCode?: string; retryAfterSeconds?: number } = {},
	) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.details = options.details;
		this.errorCode = options.errorCode;
		this.retryAfterSeconds = options.retryAfterSeconds;
	}

	get isRateLimited(): boolean {
		return this.status === 429 || this.errorCode === 'rate_limit_exceeded';
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
	let errorCode: string | undefined;
	try {
		const body = (await response.json()) as BackendError;
		if (body?.message) {
			message = body.message;
		}
		if (body?.error) {
			errorCode = body.error;
			if (body.error !== message) {
				details = body.error;
			}
		}
	} catch {
		// resposta sem JSON — mantém mensagem padrão
	}

	let retryAfterSeconds: number | undefined;
	const retryAfter = response.headers.get('Retry-After');
	if (retryAfter) {
		const parsed = Number.parseInt(retryAfter, 10);
		if (Number.isFinite(parsed) && parsed > 0) {
			retryAfterSeconds = parsed;
		}
	}

	return new ApiError(message, response.status, { details, errorCode, retryAfterSeconds });
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
