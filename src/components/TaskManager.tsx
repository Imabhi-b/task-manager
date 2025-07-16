import { useState, useEffect } from 'react';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import { TaskFilters } from './TaskFilters';
import { TaskStats } from './TaskStats';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManager-tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Failed to load tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskManager-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTask = (id: string, newTitle: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, title: newTitle.trim() } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-muted-foreground">
            Stay organized and productive with your daily tasks
          </p>
        </div>

        {/* Task Input */}
        <div className="mb-6 animate-slide-in">
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Task Stats */}
        {tasks.length > 0 && (
          <div className="mb-6 animate-fade-in">
            <TaskStats stats={stats} />
          </div>
        )}

        {/* Task Filters */}
        {tasks.length > 0 && (
          <div className="mb-6 animate-slide-in">
            <TaskFilters 
              currentFilter={filter} 
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
              hasCompleted={stats.completed > 0}
            />
          </div>
        )}

        {/* Task List */}
        <div className="animate-bounce-in">
          <TaskList 
            tasks={filteredTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
          />
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tasks yet
            </h3>
            <p className="text-muted-foreground">
              Add your first task above to get started!
            </p>
          </div>
        )}

        {/* No Results State */}
        {tasks.length > 0 && filteredTasks.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">
              {filter === 'completed' ? '🎉' : '⚡'}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {filter === 'completed' 
                ? 'No completed tasks' 
                : filter === 'active'
                  ? 'All tasks completed!'
                  : 'No tasks found'
              }
            </h3>
            <p className="text-muted-foreground">
              {filter === 'completed' 
                ? 'Complete some tasks to see them here'
                : filter === 'active'
                  ? 'Great job! All your tasks are done.'
                  : 'Try changing your filter'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}