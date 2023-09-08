import { createTheme } from "@mui/material";
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; 
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; 
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

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
    },
    breakpoints: {
        values: {
            mobile: 480,
            tablet: 1024,
            laptop: 1400,
            desktop: 1600,
        },
    },
});

export default theme;