/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#FF7E1B',
                'secondary': '#1D2026',
            },
            screens: {
                'phone': '360px',
                'tablet': '990px',
                'laptop': '1024px',
            },
        },
    },
    plugins: [],
}
