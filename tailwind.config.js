module.exports = {
    purge: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    important: true,
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                xs: "480px",
            },
            minWidth: {
                360: "360px",
            },
            colors: {
                "custom-light-gray": "#8e8e8e",
                "custom-dark-gray": "#5f5f5f",
                "custom-blue": "#0095f6",
                "custom-light-gray-100": "#fafafa",

                "insta-black": "#262626",
                "insta-gray": "#fafafa",
                "insta-blue": "#0095f6",
                "insta-blue-light": "#c0e0fd",
                "insta-border-gray": "#dbdbdb",
                "insta-text-gray": "#8e8e8e",
                "insta-gray-light": "#cacaca",
                "insta-blue-facebook": "#385185",
                "insta-redheart": "#ed4956",
                "insta-pink": "#c72e8f",
                "insta-yellow": "#f99b4a",
                "insta-story": '#1b1b1b'
            },
            spacing: {
                default: "1px",
                90: "22rem",
                0.1: "0.10rem",
                5.5: "1.35rem",
                6.5: "1.65rem",
                7.5: "1.90rem",
                13: "3.25rem",
                13.5: "3.4rem",
                17: "4.5rem",
                34: "8.75rem",
                46: "11.5rem",
                68: "17rem",
                82: "21rem",
                84: "22rem",
                storyHeight: "49.26rem",
                storyWidth: "27.7rem",
                "9.5/10": "95%",
            },
            maxWidth: {
                xl: "38rem",
                "2xl": "36rem",
                "3xl": "48rem",
                "4xl": "56rem",
                "4.5xl": "58rem",
            },
            outline: {
                0: "0",
            },
            variants: {
                alignItems: ["responsive", "focus"],
            },
            boxShadow: {
                custom: '1px 0px 4px 0 rgba(0, 0, 0, 0.4)'
            }
        },
        
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
