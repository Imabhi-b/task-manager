import { Button } from '@/components/ui/button';
import type { FilterType } from './TaskManager';

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export function TaskFilters({ 
  currentFilter, 
  onFilterChange, 
  onClearCompleted, 
  hasCompleted 
}: TaskFiltersProps) {
  const filters: { key: FilterType; label: string; emoji: string }[] = [
    { key: 'all', label: 'All Tasks', emoji: '📋' },
    { key: 'active', label: 'Active', emoji: '⚡' },
    { key: 'completed', label: 'Completed', emoji: '✅' },
  ];

  return (
    <div className="bg-gradient-card border border-card-border rounded-lg p-4 shadow-task backdrop-blur-sm">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={currentFilter === filter.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className="text-xs font-medium"
            >
              <span className="mr-1">{filter.emoji}</span>
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Clear Completed Button */}
        {hasCompleted && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onClearCompleted}
            className="text-xs"
          >
            Clear Completed
          </Button>
        )}
      </div>
    </div>
  );
}