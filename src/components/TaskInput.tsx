import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-12 text-base bg-card border-card-border shadow-task focus:shadow-task-hover transition-all duration-200"
        />
      </div>
      <Button 
        type="submit" 
        size="lg"
        disabled={!inputValue.trim()}
        className="px-6"
      >
        <Plus className="w-5 h-5" />
        Add Task
      </Button>
    </form>
  );
}