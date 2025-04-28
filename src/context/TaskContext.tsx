import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, TaskFormData } from '../types/task';

interface TaskState {
    tasks: Task[];
    filter: 'all' | 'active' | 'completed';
    searchQuery: string;
    darkMode: boolean;
}

type TaskAction =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'SET_FILTER'; payload: TaskState['filter'] }
    | { type: 'SET_SEARCH'; payload: string }
    | { type: 'TOGGLE_DARK_MODE' }
    | { type: 'LOAD_TASKS'; payload: Task[] };

const initialState: TaskState = {
    tasks: [],
    filter: 'all',
    searchQuery: '',
    darkMode: false,
};

const TaskContext = createContext<{
    state: TaskState;
    dispatch: React.Dispatch<TaskAction>;
} | null>(null);

const API_URL = `${window.location.protocol}//${window.location.hostname}:3000/api`;

function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_SEARCH':
            return { ...state, searchQuery: action.payload };
        case 'TOGGLE_DARK_MODE':
            return { ...state, darkMode: !state.darkMode };
        case 'LOAD_TASKS':
            return { ...state, tasks: action.payload };
        default:
            return state;
    }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Load tasks from API
    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then(res => res.json())
            .then(tasks => dispatch({ type: 'LOAD_TASKS', payload: tasks }))
            .catch(error => console.error('Error loading tasks:', error));

        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            dispatch({ type: 'TOGGLE_DARK_MODE' });
        }
    }, []);

    // Wrap dispatch to handle API calls
    const wrappedDispatch: typeof dispatch = async (action) => {
        switch (action.type) {
            case 'ADD_TASK': {
                try {
                    const response = await fetch(`${API_URL}/tasks`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(action.payload),
                    });
                    const newTask = await response.json();
                    dispatch({ type: 'ADD_TASK', payload: newTask });
                } catch (error) {
                    console.error('Error adding task:', error);
                }
                break;
            }
            case 'UPDATE_TASK': {
                try {
                    await fetch(`${API_URL}/tasks/${action.payload.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(action.payload),
                    });
                    dispatch(action);
                } catch (error) {
                    console.error('Error updating task:', error);
                }
                break;
            }
            case 'DELETE_TASK': {
                try {
                    await fetch(`${API_URL}/tasks/${action.payload}`, {
                        method: 'DELETE',
                    });
                    dispatch(action);
                } catch (error) {
                    console.error('Error deleting task:', error);
                }
                break;
            }
            default:
                dispatch(action);
        }
    };

    useEffect(() => {
        localStorage.setItem('darkMode', state.darkMode.toString());
        if (state.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [state.darkMode]);

    return (
        <TaskContext.Provider value={{ state, dispatch: wrappedDispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}