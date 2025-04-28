/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                light: {
                    bg: '#f3f4f6',
                    form: '#e5e7eb',
                    text: '#111827'
                },
                dark: {
                    bg: '#1f2937',
                    form: '#111827',
                    text: '#f3f4f6'
                }
            }
        },
    },
    plugins: [],
};