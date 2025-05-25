'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { mainNavItems, settingsNavItem } from '@/config/nav';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { UserDropdown } from './user-dropdown';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

export function AppLayout({ children }: { children: React.ReactNode }) {
  // Get cookie for defaultOpen state
  // This useEffect logic should ideally be within SidebarProvider or a custom hook
  // For simplicity, we'll manage defaultOpen here if we can read cookies on client
  const [defaultOpen, setDefaultOpen] = React.useState(true);

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('sidebar_state='))
        ?.split('=')[1];
      if (cookieValue) {
        setDefaultOpen(cookieValue === 'true');
      }
    }
  }, []);


  return (
    <SidebarProvider defaultOpen={defaultOpen} open={defaultOpen} onOpenChange={(open) => setDefaultOpen(open)}>
      <SidebarContainer>
        {children}
      </SidebarContainer>
    </SidebarProvider>
  );
}

function SidebarContainer({ children }: { children: React.ReactNode }) {
    const { state: sidebarState } = useSidebar();
    return (
        <>
            <Sidebar collapsible="icon" variant="sidebar" className="border-r">
            <SidebarHeader className="p-3 justify-between">
                <Logo />
                <div className="group-data-[collapsible=icon]:hidden">
                 <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent className="flex-grow p-2 pt-0">
                <SidebarNav items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter className="p-2 border-t">
              {/* Settings Link - visible in expanded mode */}
               <Link 
                  href={settingsNavItem.href} 
                  className={cn(
                    "flex items-center gap-2 w-full h-8 rounded-md p-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    sidebarState === 'collapsed' && "justify-center aspect-square !p-0"
                  )}
                  title={settingsNavItem.title}
                  aria-label={settingsNavItem.title}
                >
                  <settingsNavItem.icon className={cn(sidebarState === 'collapsed' ? "h-5 w-5" : "h-4 w-4")} />
                  {sidebarState === 'expanded' && <span>{settingsNavItem.title}</span>}
                </Link>
                <Separator className="my-1 bg-sidebar-border" />
                <UserDropdown />
            </SidebarFooter>
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </>
    );
}
