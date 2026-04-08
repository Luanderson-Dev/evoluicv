import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/analysis';

const SEVERITY_LABEL: Record<Severity, string> = {
	LOW: 'Baixo impacto',
	MEDIUM: 'Impacto médio',
	HIGH: 'Alto impacto',
};

const SEVERITY_CLASS: Record<Severity, string> = {
	LOW: 'bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300 dark:ring-emerald-400/20',
	MEDIUM: 'bg-amber-500/10 text-amber-700 ring-amber-600/30 dark:text-amber-300 dark:ring-amber-400/20',
	HIGH: 'bg-destructive/10 text-destructive ring-destructive/30',
};

export function SeverityBadge({ severity }: { severity: Severity }) {
	return (
		<Badge
			variant='outline'
			className={cn(
				'shrink-0 ring-1 ring-inset font-medium',
				SEVERITY_CLASS[severity],
			)}
		>
			{SEVERITY_LABEL[severity]}
		</Badge>
	);
}
