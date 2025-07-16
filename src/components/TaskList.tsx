import { TaskItem } from './TaskItem';
import type { Task } from './TaskManager';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, newTitle: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTask }: TaskListProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TaskItem
            task={task}
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
            onUpdate={(newTitle) => onUpdateTask(task.id, newTitle)}
          />
        </div>
      ))}
    </div>
  );
}