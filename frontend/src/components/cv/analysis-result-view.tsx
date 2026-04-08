import { ScoreGauge } from '@/components/cv/score-gauge';
import { SeverityBadge } from '@/components/cv/severity-badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { CvAnalysis, Severity } from '@/types/analysis';
import {
	Alert02Icon,
	ArrowRight01Icon,
	BulbIcon,
	CheckmarkCircle02Icon,
	IdeaIcon,
	Target02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ReactNode } from 'react';

interface Props {
	data: CvAnalysis | null;
	isLoading: boolean;
}

const SEVERITY_ORDER: Record<Severity, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };

export function AnalysisResultView({ data, isLoading }: Props) {
	return (
		<Card className='flex-1 min-w-0'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2 text-base'>
					<HugeiconsIcon
						icon={Target02Icon}
						className='h-4 w-4 text-primary'
					/>
					Parecer do analisador
				</CardTitle>
				<CardDescription>
					Análise crítica baseada em critérios.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-1'>
				{isLoading ? (
					<LoadingState />
				) : data ? (
					<Content data={data} />
				) : (
					<EmptyState />
				)}
			</CardContent>
		</Card>
	);
}

function Content({ data }: { data: CvAnalysis }) {
	const sortedIssues = [...data.issues].sort(
		(a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
	);

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col items-center gap-4 border-b pb-6'>
				<ScoreGauge score={data.overallScore} />
				<p className='text-center text-sm leading-relaxed text-muted-foreground'>
					{data.summary}
				</p>
				{/* {data.language && (
					<span className='rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground'>
						Idioma detectado: {data.language}
					</span>
				)} */}
			</div>

			{data.strengths.length > 0 && (
				<Section
					title='Pontos fortes'
					icon={
						<HugeiconsIcon
							icon={CheckmarkCircle02Icon}
							className='h-4 w-4 text-emerald-500'
						/>
					}
				>
					<ul className='flex flex-col gap-2'>
						{data.strengths.map((strength, index) => (
							<li
								key={index}
								className='flex items-start gap-2 text-sm leading-relaxed'
							>
								<HugeiconsIcon
									icon={CheckmarkCircle02Icon}
									className='mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500'
								/>
								<span>{strength}</span>
							</li>
						))}
					</ul>
				</Section>
			)}

			{sortedIssues.length > 0 && (
				<Section
					title={`Problemas encontrados (${sortedIssues.length})`}
					icon={
						<HugeiconsIcon
							icon={Alert02Icon}
							className='h-4 w-4 text-amber-500'
						/>
					}
				>
					<ul className='flex flex-col gap-3'>
						{sortedIssues.map((issue, index) => (
							<li
								key={index}
								className='rounded-md border bg-muted/20 p-3'
							>
								<div className='flex items-start justify-between gap-2'>
									<div className='min-w-0 flex-1'>
										<p className='text-[10px] uppercase tracking-wider text-muted-foreground'>
											{issue.section}
										</p>
										<p className='mt-0.5 text-sm font-medium leading-snug'>
											{issue.problem}
										</p>
									</div>
									<SeverityBadge severity={issue.severity} />
								</div>
								<div className='mt-2.5 flex items-start gap-2 border-l-2 border-amber-500/40 pl-2.5'>
									<HugeiconsIcon
										icon={BulbIcon}
										className='mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400'
									/>
									<p className='text-xs leading-relaxed text-muted-foreground'>
										<span className='font-medium text-foreground/80'>
											Por quê:{' '}
										</span>
										{issue.why}
									</p>
								</div>
								<div className='mt-2 flex items-start gap-2 border-l-2 border-emerald-500/40 pl-2.5'>
									<HugeiconsIcon
										icon={IdeaIcon}
										className='mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400'
									/>
									<p className='text-xs leading-relaxed text-muted-foreground'>
										<span className='font-medium text-foreground/80'>
											Sugestão:{' '}
										</span>
										{issue.suggestion}
									</p>
								</div>
							</li>
						))}
					</ul>
				</Section>
			)}

			{data.recommendedActions.length > 0 && (
				<Section
					title='Próximos passos'
					icon={
						<HugeiconsIcon
							icon={ArrowRight01Icon}
							className='h-4 w-4 text-primary'
						/>
					}
				>
					<ol className='flex flex-col gap-2'>
						{data.recommendedActions.map((action, index) => (
							<li
								key={index}
								className='flex items-start gap-2.5 text-sm leading-relaxed'
							>
								<span className='mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground'>
									{index + 1}
								</span>
								<span>{action}</span>
							</li>
						))}
					</ol>
				</Section>
			)}
		</div>
	);
}

function Section({
	title,
	icon,
	children,
}: {
	title: string;
	icon: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className='flex flex-col gap-3'>
			<h4 className='flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wide text-foreground'>
				{icon}
				{title}
			</h4>
			{children}
		</div>
	);
}

function EmptyState() {
	return (
		<div className='flex h-full min-h-[320px] flex-col items-center justify-center gap-3 text-center'>
			<div className='flex h-14 w-14 items-center justify-center rounded-full bg-muted'>
				<HugeiconsIcon
					icon={Target02Icon}
					className='h-7 w-7 text-muted-foreground'
				/>
			</div>
			<div className='flex max-w-xs flex-col gap-1'>
				<p className='text-sm font-medium'>Sem análise ainda</p>
				<p className='text-xs text-muted-foreground'>
					O parecer crítico — score, problemas e próximos passos —
					aparecerá aqui.
				</p>
			</div>
		</div>
	);
}

function LoadingState() {
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col items-center gap-4 border-b pb-6'>
				<Skeleton className='h-[132px] w-[132px] rounded-full' />
				<Skeleton className='h-4 w-full' />
				<Skeleton className='h-4 w-5/6' />
			</div>
			{[0, 1, 2].map((section) => (
				<div
					key={section}
					className='flex flex-col gap-3'
				>
					<Skeleton className='h-4 w-32' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-11/12' />
				</div>
			))}
		</div>
	);
}
