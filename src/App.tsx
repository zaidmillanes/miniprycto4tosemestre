import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskProvider } from './context/TaskContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { useTaskContext } from './context/TaskContext';
import { useLanguage } from './context/LanguageContext';

function TaskManager() {
    const { state } = useTaskContext();
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
        >
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-light-form dark:bg-dark-form p-6 rounded-lg shadow-sm"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
                            {t('addNewTask')}
                        </h2>
                        <TaskForm />
                    </motion.div>
                    <div className="space-y-6">
                        <TaskFilters />
                        <TaskList />
                    </div>
                </div>
            </main>
        </motion.div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <TaskProvider>
                <TaskManager />
            </TaskProvider>
        </LanguageProvider>
    );
}

export default App;