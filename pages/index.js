import * as React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Global from "../styles/global"
import CssBaseline from "@mui/material/CssBaseline"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default () => {
    const [isDarkMode, setDarkMode] = React.useState(true);

    const theme = React.useMemo(() => createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light"
        }
    }));

    return (
        <ThemeProvider theme={theme}>
            <Global />
            <CssBaseline />
            <Header />
            <Footer />
        </ThemeProvider>
    );
}