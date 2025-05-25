'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/config/nav';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import * as React from 'react';

interface SidebarNavProps {
  items: NavItem[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className={cn('flex flex-col w-full', className)}>
      <SidebarMenu>
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
          
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <Link href={item.href} aria-disabled={item.disabled}>
                  <Icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.children && item.children.length > 0 && (
                <SidebarMenuSub>
                  {item.children.map((childItem, childIndex) => {
                    const ChildIcon = childItem.icon;
                    const isChildActive = childItem.href === '/' ? pathname === childItem.href : pathname.startsWith(childItem.href);
                    return (
                      <SidebarMenuSubItem key={childIndex}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isChildActive}
                        >
                          <Link href={childItem.href} aria-disabled={childItem.disabled}>
                            {/* Sub-items usually don't have icons in this style, but can be added */}
                            {/* <ChildIcon /> */}
                            <span>{childItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </nav>
  );
}
