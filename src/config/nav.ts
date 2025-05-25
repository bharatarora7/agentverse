import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, TestTube2, Puzzle, ListChecks, DollarSign, Settings } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
  isChidren?: boolean;
  children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Agent Tester',
    href: '/agent-tester',
    icon: TestTube2,
  },
  {
    title: 'Tool Integrator',
    href: '/tool-integrator',
    icon: Puzzle,
  },
  {
    title: 'Scenario Editor',
    href: '/scenario-editor',
    icon: ListChecks,
  },
  {
    title: 'Cost Analysis',
    href: '/cost-analysis',
    icon: DollarSign,
  },
];

export const settingsNavItem: NavItem = {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
};
