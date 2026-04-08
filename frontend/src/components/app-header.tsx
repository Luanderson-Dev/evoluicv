'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Moon01Icon, Sun01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'next-themes';

export function AppHeader() {
	const { theme, setTheme } = useTheme();

	return (
		<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
			<SidebarTrigger className='-ml-1' />

			<div className='ml-auto'>
				<Button
					variant='ghost'
					size='icon'
					onClick={() =>
						setTheme(theme === 'dark' ? 'light' : 'dark')
					}
					aria-label='Alternar tema'
				>
					<HugeiconsIcon
						icon={Sun01Icon}
						className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
						strokeWidth={2}
					/>
					<HugeiconsIcon
						icon={Moon01Icon}
						className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
						strokeWidth={2}
					/>
				</Button>
			</div>
		</header>
	);
}
