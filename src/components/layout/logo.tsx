import { Bot } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2 text-lg font-semibold", className)}>
      <Bot className="h-7 w-7 shrink-0 text-primary" />
      {!iconOnly && <span className="text-foreground group-data-[collapsible=icon]:hidden">AgentVerse</span>}
    </Link>
  );
}
