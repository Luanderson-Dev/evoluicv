/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const backendUrl =
			process.env.BACKEND_INTERNAL_URL || 'http://localhost:8080';

		const formData = await request.formData();

		const response = await fetch(`${backendUrl}/api/cv/analyze`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return NextResponse.json(errorData, { status: response.status });
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error: any) {
		console.error('Erro no proxy manual do Next.js:', error);
		return NextResponse.json(
			{
				message: 'Erro de comunicação entre Frontend e Backend.',
				error: error.message,
			},
			{ status: 500 },
		);
	}
}
