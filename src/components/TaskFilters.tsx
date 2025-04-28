import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTaskContext } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';

export function TaskFilters() {
    const { state, dispatch } = useTaskContext();
    const { t } = useLanguage();

    return (
        <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder={t('searchTasks')}
                    value={state.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    className="pl-10 w-full rounded-md border border-light-form bg-light-bg shadow-sm focus:border-light-form focus:ring-light-form dark:bg-dark-bg dark:border-dark-form dark:text-white"
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex space-x-2"
            >
                {(['all', 'active', 'completed'] as const).map((filter, index) => (
                    <motion.button
                        key={filter}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${state.filter === filter
                                ? 'bg-light-form text-white dark:bg-dark-form'
                                : 'bg-light-bg text-white hover:bg-opacity-80 dark:bg-dark-bg dark:text-white dark:hover:bg-opacity-80'
                            }`}
                    >
                        {t(filter)}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}