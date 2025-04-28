import React from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskContext } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
    const { state, dispatch } = useTaskContext();
    const { language, setLanguage, t } = useLanguage();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-light-form dark:bg-dark-form shadow-lg"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold text-light-text dark:text-dark-text"
                    >
                        {t('taskManager')}
                    </motion.h1>
                    <div className="flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                            className="p-2 rounded-lg bg-light-bg hover:bg-opacity-80 dark:bg-dark-bg dark:hover:bg-opacity-80"
                            title={language === 'en' ? t('switchToSpanish') : t('switchToEnglish')}
                        >
                            <Languages className="w-5 h-5 text-light-text dark:text-dark-text" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
                            className="p-2 rounded-lg bg-light-bg hover:bg-opacity-80 dark:bg-dark-bg dark:hover:bg-opacity-80"
                            title={state.darkMode ? t('switchToLight') : t('switchToDark')}
                        >
                            <AnimatePresence mode="wait">
                                {!state.darkMode ? (
                                    <motion.div
                                        key="moon"
                                        initial={{ opacity: 0, rotate: -180 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Moon className="w-5 h-5 text-yellow-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sun"
                                        initial={{ opacity: 0, rotate: 180 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Sun className="w-5 h-5 text-yellow-400" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}