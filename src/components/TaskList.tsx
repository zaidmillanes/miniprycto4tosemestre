import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskContext } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';
import { Task } from '../types/task';
import { TaskForm } from './TaskForm';

export function TaskList() {
    const { state, dispatch } = useTaskContext();
    const { t } = useLanguage();
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const filteredTasks = state.tasks.filter((task) => {
        const matchesFilter =
            state.filter === 'all' ||
            (state.filter === 'completed' && task.completed) ||
            (state.filter === 'active' && !task.completed);

        const matchesSearch =
            task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(state.searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const toggleTask = (task: Task) => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: { ...task, completed: !task.completed },
        });
    };

    const deleteTask = (id: string) => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {filteredTasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-dark-form p-4 rounded-lg shadow-md border border-gray-200 dark:border-dark-form"
                    >
                        {editingTask?.id === task.id ? (
                            <TaskForm
                                task={task}
                                onClose={() => setEditingTask(null)}
                            />
                        ) : (
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleTask(task)}
                                        className="mt-1 text-gray-700 dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {task.completed ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <Circle className="w-5 h-5" />
                                        )}
                                    </motion.button>
                                    <div>
                                        <motion.h3
                                            animate={{ opacity: task.completed ? 0.5 : 1 }}
                                            className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-dark-text'
                                                }`}
                                        >
                                            {task.title}
                                        </motion.h3>
                                        <p className="text-sm text-gray-600 dark:text-dark-text dark:opacity-80">
                                            {task.description}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-dark-text dark:opacity-60 mt-1">
                                            {t('due')}: {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setEditingTask(task)}
                                        className="text-gray-600 dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => deleteTask(task.id)}
                                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
            {filteredTasks.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-700 dark:text-dark-text"
                >
                    {t('noTasks')}
                </motion.p>
            )}
        </div>
    );
}