'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
	Calendar01Icon,
	Home01Icon,
	InboxIcon,
	Search01Icon,
	Settings01Icon,
	UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

const mainNavItems = [
	{
		title: 'Início',
		url: '/',
		icon: Home01Icon,
	},
	{
		title: 'Pesquisar',
		url: '/search',
		icon: Search01Icon,
	},
	{
		title: 'Caixa de Entrada',
		url: '/inbox',
		icon: InboxIcon,
	},
	{
		title: 'Calendário',
		url: '/calendar',
		icon: Calendar01Icon,
	},
];

export function AppSidebar() {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size='lg'
							asChild
						>
							<Link href='/'>
								<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
									<span className='text-sm font-bold'>R</span>
								</div>
								<div className='flex flex-col gap-0.5 leading-none'>
									<span className='font-semibold'>
										Radix Mira
									</span>
									<span className='text-xs text-muted-foreground'>
										Dashboard
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{mainNavItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										tooltip={item.title}
									>
										<Link href={item.url}>
											<HugeiconsIcon
												icon={item.icon}
												strokeWidth={2}
											/>
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							tooltip='Configurações'
						>
							<Link href='/settings'>
								<HugeiconsIcon
									icon={Settings01Icon}
									strokeWidth={2}
								/>
								<span>Configurações</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							tooltip='Perfil'
						>
							<Link href='/profile'>
								<HugeiconsIcon
									icon={UserIcon}
									strokeWidth={2}
								/>
								<span>Meu Perfil</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
