import { cn } from '@/lib/utils';

interface Props {
	score: number;
	size?: number;
}

function scoreTone(score: number) {
	if (score >= 80) return 'text-emerald-500';
	if (score >= 60) return 'text-amber-500';
	return 'text-destructive';
}

function scoreLabel(score: number) {
	if (score >= 85) return 'Excelente';
	if (score >= 70) return 'Competitivo';
	if (score >= 50) return 'Precisa ajustes';
	return 'Requer revisão';
}

export function ScoreGauge({ score, size = 132 }: Props) {
	const clamped = Math.max(0, Math.min(100, score));
	const strokeWidth = 10;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (clamped / 100) * circumference;
	const tone = scoreTone(clamped);

	return (
		<div
			className='relative flex items-center justify-center'
			style={{ width: size, height: size }}
		>
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				className='-rotate-90'
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					className='stroke-muted fill-none'
					strokeWidth={strokeWidth}
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					className={cn('fill-none transition-all duration-700', tone)}
					stroke='currentColor'
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeDasharray={circumference}
					strokeDashoffset={offset}
				/>
			</svg>
			<div className='absolute inset-0 flex flex-col items-center justify-center'>
				<span className={cn('text-3xl font-semibold tabular-nums', tone)}>
					{clamped}
				</span>
				<span className='text-[10px] uppercase tracking-wider text-muted-foreground'>
					{scoreLabel(clamped)}
				</span>
			</div>
		</div>
	);
}
