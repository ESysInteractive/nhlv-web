import * as React from "react"
import { styled } from "@mui/material/styles"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

export default () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <React.Fragment key={String(mounted)}>
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>

                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
};