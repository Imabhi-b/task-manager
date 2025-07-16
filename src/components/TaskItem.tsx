import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import type { Task } from './TaskManager';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (newTitle: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(task.title);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue.trim() !== task.title) {
      onUpdate(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group bg-gradient-card border border-card-border rounded-lg p-4 shadow-task hover:shadow-task-hover transition-all duration-200 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <div className="flex-shrink-0">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggle}
            className="w-5 h-5 border-2 data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 h-8 text-sm"
                autoFocus
              />
              <Button
                size="icon-sm"
                variant="success"
                onClick={handleSave}
                disabled={!editValue.trim()}
              >
                <Check className="w-3 h-3" />
              </Button>
              <Button
                size="icon-sm"
                variant="outline"
                onClick={handleCancel}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium transition-all duration-200 ${
                  task.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground'
                }`}
                onDoubleClick={handleEdit}
              >
                {task.title}
              </span>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={handleEdit}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={onDelete}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Meta */}
      {!isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          Created {task.createdAt.toLocaleDateString()} at {task.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
}