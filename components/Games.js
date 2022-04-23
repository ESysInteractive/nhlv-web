import * as React from "react"
import styledComponent from "styled-components"
import { styled } from "@mui/material/styles"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

const ContainerHolder = styledComponent.div`
    margin-top: 50px;
    margin-left: 20px;
`;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    position: "relative",
    zIndex: 1,
    width: "50%",
    "&:before": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0,
        width: "100%",
        height: "25%",
        content: "'Scheduled'",
        backgroundColor: "#222",
        borderRadius: "4px",
        justifyContent: "center",
        textAlign: "center"
    } 
}));

const Content = styledComponent.div`
    margin-top: 30px;
`;

const ContentLeft = styledComponent.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
`;

const ContentRight = styledComponent.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
`;

const Score = styledComponent.span`
    font-weight: bolder;
`;

const Spacer = styledComponent.div`
    background: #ccc;
`;

export default () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <React.Fragment key={String(mounted)}>
            <ContainerHolder>
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Item>
                                    <Content>
                                        <ContentRight>
                                            
                                        </ContentRight>
                                        <ContentLeft>
                                            <div>
                                                <img style={{ height: "20px" }} src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/25.svg" />
                                                <span>Dallas Stars <Score>0</Score></span>
                                            </div>
                                            <div>
                                                <img style={{ height: "20px" }} src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/22.svg" />
                                                <span>Edmonton Oilers <Score>0</Score></span>
                                            </div>
                                        </ContentLeft>
                                    </Content>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ContainerHolder>
        </React.Fragment>
    );
};