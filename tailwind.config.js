/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                saffron: "#2563EB",
                "india-green": "#138808",
                sand: "#FFFFFF",
                charcoal: "#1F2937",
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
