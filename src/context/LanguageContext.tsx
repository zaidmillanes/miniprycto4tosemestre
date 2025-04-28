import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface Translations {
    [key: string]: {
        en: string;
        es: string;
    };
}

export const translations: Translations = {
    taskManager: {
        en: 'Task Manager',
        es: 'Administrador de Tareas'
    },
    addNewTask: {
        en: 'Add New Task',
        es: 'Agregar Nueva Tarea'
    },
    title: {
        en: 'Title',
        es: 'Título'
    },
    description: {
        en: 'Description',
        es: 'Descripción'
    },
    dueDate: {
        en: 'Due Date',
        es: 'Fecha de Vencimiento'
    },
    cancel: {
        en: 'Cancel',
        es: 'Cancelar'
    },
    update: {
        en: 'Update Task',
        es: 'Actualizar Tarea'
    },
    add: {
        en: 'Add Task',
        es: 'Agregar Tarea'
    },
    searchTasks: {
        en: 'Search tasks...',
        es: 'Buscar tareas...'
    },
    all: {
        en: 'All',
        es: 'Todas'
    },
    active: {
        en: 'Active',
        es: 'Activas'
    },
    completed: {
        en: 'Completed',
        es: 'Completadas'
    },
    noTasks: {
        en: 'No tasks found',
        es: 'No se encontraron tareas'
    },
    due: {
        en: 'Due',
        es: 'Vence'
    },
    switchToDark: {
        en: 'Switch to dark mode',
        es: 'Cambiar a modo oscuro'
    },
    switchToLight: {
        en: 'Switch to light mode',
        es: 'Cambiar a modo claro'
    },
    switchToSpanish: {
        en: 'Switch to Spanish',
        es: 'Cambiar a Español'
    },
    switchToEnglish: {
        en: 'Switch to English',
        es: 'Cambiar a Inglés'
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}