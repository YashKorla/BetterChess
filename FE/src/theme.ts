import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#171719",
            light: "#222226",
        },
        secondary: {
            main: "#222226",
            light: "#171719",
        }
    },
    typography:{
        subtitle1: {
            color: '#FFF',
            fontSize: '20px',
            fontWeight: 700,
        },
    }
});

export default theme;