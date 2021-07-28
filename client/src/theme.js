// theme.js

export default {
    palette: {
        primary: {
            main: "#ac56d6",
            contrastText: "#E9EFFF",
        }, 
        secondary: {
            main: "#E9EFFF",
            contrastText: "#3C5CA5",
        },
        success: {
            main: '#32CD32',
            contrastText: '#fff',
        },
        danger: {
            main: '#B22222',
            contrastText: '#fff',
        }
    },
    overrides: {
        MuiCardMedia: {
            root: {
                backgroundSize: 'contain'
            }
        }
    }
};