import { cn } from '@/lib/utils';

export function Card({ children, className = '', accent }: {
  children: React.ReactNode; className?: string;
  accent?: 'blue'|'purple'|'green'|'orange';
}) {
  const accents = {
    blue:   'from-blue-500 to-cyan-500',
    purple: 'from-blue-500 to-purple-600',
    green:  'from-green-500 to-cyan-500',
    orange: 'from-orange-500 to-red-500',
  };
  return (
    <div className={cn('bg-bg-2 border border-border-1 rounded-2xl relative overflow-hidden transition-all duration-200 hover:border-border-2', className)}>
      {accent && <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accents[accent]}`} />}
      {children}
    </div>
  );
}