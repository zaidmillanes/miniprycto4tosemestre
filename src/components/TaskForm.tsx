import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';
import { Task, TaskFormData } from '../types/task';

interface TaskFormProps {
    task?: Task;
    onClose?: () => void;
}

export function TaskForm({ task, onClose }: TaskFormProps) {
    const { dispatch } = useTaskContext();
    const { t } = useLanguage();
    const [formData, setFormData] = useState<TaskFormData>({
        title: task?.title || '',
        description: task?.description || '',
        dueDate: task?.dueDate || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const taskData: Task = {
            id: task?.id || crypto.randomUUID(),
            ...formData,
            completed: task?.completed || false,
            createdAt: task?.createdAt || new Date().toISOString(),
        };

        dispatch({
            type: task ? 'UPDATE_TASK' : 'ADD_TASK',
            payload: taskData,
        });

        if (onClose) onClose();
        else setFormData({ title: '', description: '', dueDate: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-light-text dark:text-dark-text">
                    {t('title')}
                </label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-light-form bg-light-bg shadow-sm focus:border-light-form focus:ring-light-form dark:bg-dark-bg dark:border-dark-form dark:text-dark-text"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-light-text dark:text-dark-text">
                    {t('description')}
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-light-form bg-light-bg shadow-sm focus:border-light-form focus:ring-light-form dark:bg-dark-bg dark:border-dark-form dark:text-dark-text"
                    rows={3}
                />
            </div>
            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-light-text dark:text-dark-text">
                    {t('dueDate')}
                </label>
                <input
                    type="date"
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-light-form bg-light-bg shadow-sm focus:border-light-form focus:ring-light-form dark:bg-dark-bg dark:border-dark-form dark:text-dark-text"
                    required
                />
            </div>
            <div className="flex justify-end space-x-2">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-light-text dark:text-dark-text bg-light-bg border border-light-form rounded-md hover:bg-opacity-80 dark:bg-dark-bg dark:border-dark-form dark:hover:bg-opacity-80"
                    >
                        {t('cancel')}
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-light-text dark:text-dark-text bg-light-form rounded-md hover:bg-opacity-80 dark:bg-dark-form dark:hover:bg-opacity-80"
                >
                    {task ? t('update') : t('add')}
                </button>
            </div>
        </form>
    );
}