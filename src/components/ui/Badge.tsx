import { cn } from '@/lib/utils';

type BadgeVariant = 'blue'|'purple'|'green'|'orange'|'red'|'cyan'|'pink'|'gray';

const variants: Record<BadgeVariant, string> = {
  blue:   'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  green:  'bg-green-500/15 text-green-400 border border-green-500/20',
  orange: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
  red:    'bg-red-500/15 text-red-400 border border-red-500/20',
  cyan:   'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20',
  pink:   'bg-pink-500/15 text-pink-400 border border-pink-500/20',
  gray:   'bg-slate-700/30 text-slate-300 border border-slate-700',
};

export function Badge({ children, variant = 'blue', className = '' }:
  { children: React.ReactNode; variant?: BadgeVariant; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold whitespace-nowrap', variants[variant], className)}>
      {children}
    </span>
  );
}