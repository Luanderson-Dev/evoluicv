import { SeverityBadge } from '@/components/cv/severity-badge';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type {
	ImprovementAction,
	ImprovementSuggestion,
	ImprovementSuggestions,
	Severity,
} from '@/types/analysis';
import {
	Add01Icon,
	Delete02Icon,
	Edit02Icon,
	MagicWand01Icon,
	SparklesIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface Props {
	data: ImprovementSuggestions | null;
	isLoading: boolean;
}

const IMPACT_ORDER: Record<Severity, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };

const ACTION_META: Record<
	ImprovementAction,
	{ label: string; icon: typeof Add01Icon; className: string }
> = {
	ADD: {
		label: 'Adicionar',
		icon: Add01Icon,
		className:
			'bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300 dark:ring-emerald-400/20',
	},
	REMOVE: {
		label: 'Remover',
		icon: Delete02Icon,
		className:
			'bg-destructive/10 text-destructive ring-destructive/30',
	},
	REWRITE: {
		label: 'Reescrever',
		icon: Edit02Icon,
		className:
			'bg-sky-500/10 text-sky-700 ring-sky-600/20 dark:text-sky-300 dark:ring-sky-400/20',
	},
	IMPROVE: {
		label: 'Refinar',
		icon: MagicWand01Icon,
		className:
			'bg-amber-500/10 text-amber-700 ring-amber-600/30 dark:text-amber-300 dark:ring-amber-400/20',
	},
};

export function ImprovementSuggestionsView({ data, isLoading }: Props) {
	return (
		<Card className='min-w-0'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2 text-base'>
					<HugeiconsIcon
						icon={SparklesIcon}
						className='h-4 w-4 text-primary'
					/>
					Sugestões de melhorias pontuais
				</CardTitle>
				<CardDescription>
					Edições concretas para aplicar diretamente no seu CV. O que incluir,
					remover, reescrever ou refinar.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<LoadingState />
				) : data && data.items.length > 0 ? (
					<Content data={data} />
				) : (
					<EmptyState />
				)}
			</CardContent>
		</Card>
	);
}

function Content({ data }: { data: ImprovementSuggestions }) {
	const sorted = [...data.items].sort(
		(a, b) => IMPACT_ORDER[a.impact] - IMPACT_ORDER[b.impact],
	);

	return (
		<ul className='flex flex-col gap-3'>
			{sorted.map((item, index) => (
				<SuggestionCard key={index} item={item} />
			))}
		</ul>
	);
}

function SuggestionCard({ item }: { item: ImprovementSuggestion }) {
	const meta = ACTION_META[item.action];
	const hasCurrent = item.current && item.current.trim().length > 0;
	const hasProposed = item.proposed && item.proposed.trim().length > 0;

	return (
		<li className='rounded-md border bg-muted/20 p-3'>
			<div className='flex flex-wrap items-center justify-between gap-2'>
				<div className='flex items-center gap-2 min-w-0'>
					<Badge
						variant='outline'
						className={cn(
							'shrink-0 ring-1 ring-inset font-medium gap-1',
							meta.className,
						)}
					>
						<HugeiconsIcon icon={meta.icon} className='h-3 w-3' />
						{meta.label}
					</Badge>
					<p className='truncate text-[11px] uppercase tracking-wider text-muted-foreground'>
						{item.section}
					</p>
				</div>
				<SeverityBadge severity={item.impact} />
			</div>

			{hasCurrent && (
				<div className='mt-2.5 flex flex-col gap-1 rounded-sm border border-destructive/20 bg-destructive/5 p-2'>
					<p className='text-[10px] uppercase tracking-wider text-destructive/80'>
						Trecho atual
					</p>
					<p className='text-xs leading-relaxed text-foreground/80 line-through decoration-destructive/50'>
						{item.current}
					</p>
				</div>
			)}

			{hasProposed && (
				<div className='mt-2 flex flex-col gap-1 rounded-sm border border-emerald-500/30 bg-emerald-500/5 p-2'>
					<p className='text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400'>
						{item.action === 'ADD' ? 'Incluir' : 'Nova versão'}
					</p>
					<p className='text-sm leading-relaxed text-foreground'>
						{item.proposed}
					</p>
				</div>
			)}

			<p className='mt-2 text-xs leading-relaxed text-muted-foreground'>
				<span className='font-medium text-foreground/80'>Por quê: </span>
				{item.rationale}
			</p>
		</li>
	);
}

function EmptyState() {
	return (
		<div className='flex min-h-[240px] flex-col items-center justify-center gap-3 text-center'>
			<div className='flex h-14 w-14 items-center justify-center rounded-full bg-muted'>
				<HugeiconsIcon
					icon={SparklesIcon}
					className='h-7 w-7 text-muted-foreground'
				/>
			</div>
			<div className='flex max-w-xs flex-col gap-1'>
				<p className='text-sm font-medium'>Sem sugestões ainda</p>
				<p className='text-xs text-muted-foreground'>
					Envie seu currículo para receber edições pontuais — o que incluir,
					remover, reescrever ou refinar.
				</p>
			</div>
		</div>
	);
}

function LoadingState() {
	return (
		<div className='flex flex-col gap-3'>
			{[0, 1, 2, 3].map((i) => (
				<div key={i} className='rounded-md border bg-muted/20 p-3'>
					<div className='flex items-center justify-between gap-2'>
						<Skeleton className='h-5 w-24' />
						<Skeleton className='h-5 w-20' />
					</div>
					<Skeleton className='mt-3 h-4 w-full' />
					<Skeleton className='mt-2 h-4 w-11/12' />
					<Skeleton className='mt-2 h-3 w-10/12' />
				</div>
			))}
		</div>
	);
}
