interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export function TaskStats({ stats }: TaskStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-gradient-card border border-card-border rounded-lg p-4 shadow-task backdrop-blur-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Tasks */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-xs text-muted-foreground">Total Tasks</div>
        </div>

        {/* Active Tasks */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{stats.active}</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>

        {/* Completed Tasks */}
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{stats.completed}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>

        {/* Completion Rate */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{completionRate}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{stats.completed} of {stats.total}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}