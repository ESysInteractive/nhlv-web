import * as React from "react"
import styledComponent from "styled-components"
import { styled } from "@mui/material/styles"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

import TextField from "@mui/material/TextField"

import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import moment from "moment-timezone"
import StatusMap from "./StatusMap"
import getNetwork from "./getNetwork"
import NetworkTypeMap from "./NetworkTypeMap"

const ContainerHolder = styledComponent.div`
    margin-top: 50px;
    margin-left: 20px;
`;

/*
    "&:before": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0,
        width: "100%",
        height: "20%",
        content: "'Scheduled'",
        backgroundColor: "#222",
        borderRadius: "4px",
        justifyContent: "center",
        textAlign: "center"
    }
*/

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    position: "relative",
    zIndex: 1,
    width: "100%"
}));

const Status = styledComponent.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background-color: ${props => props.bgColor};
    border-radius: 4px;
    justify-content: center;
    text-align: center;
`;

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
    position: absolute;
    font-weight: bolder;
    left: 95%;
    margin-top: 5px;
`;

const Spacer = styledComponent.div`
    background: #fff;
    opacity: .1;
    height: 1px;
    width: 100%;
    line-height: 0;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Body = styledComponent.span`
    display: block;
    margin-left: 22%;
`;

const NetworkHolder = styledComponent.div`
    display: flex;
    column-gap: 5px;
`;

const NetworkContainer = styledComponent.div`
    position: relative;
`;

const Network = styledComponent.img`
    height: 30px;
`;

const NetworkType = styledComponent.img`
    position: absolute;
    height: 30px;
    top: -10px;
    left: 35px;
    opacity: .25;
`;

/* 
    <Grid item md={4}>
        <Item>
            <Content>
                <ContentRight>
                    <div>1st</div>
                    <div>20:00</div>
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
                    <Spacer />
                    <Body>Streams available at game time</Body>
                </ContentLeft>
            </Content>
        </Item>
    </Grid>
*/
/* 
    margin-left: 10px;
    {NetworkTypeMap[item.mediaFeedType] && <NetworkType src={NetworkTypeMap[item.mediaFeedType]} />}
*/
export default () => {
    const [mounted, setMounted] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const [date, setDate] = React.useState(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (mounted) {
            fetch("https://statsapi.web.nhl.com/api/v1/schedule?teamId=&expand=schedule.teams,schedule.linescore,schedule.game.content.media.epg")
                .then(res => res.json())
                .then(ret => {
                    setData(ret);
                    setLoading(false);
                });
        }
    }, [mounted]);

    /* React.useEffect(() => {
        if (mounted) {
            const int = setInterval(() => {
                setData(null);
                fetch("https://statsapi.web.nhl.com/api/v1/schedule?teamId=&expand=schedule.teams,schedule.linescore,schedule.game.content.media.epg")
                    .then(res => res.json())
                    .then(ret => {
                        setData(ret);
                        setLoading(false);
                    });
            }, 30000);

            return () => clearInterval(int);
        }
    }, [mounted]); */
    
    if (!data) return <h1>Loading...</h1>;

    return (
        <React.Fragment key={String(mounted)}>
            <ContainerHolder>
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {data.dates[0].games.map(game => (
                                <Grid item md={4}>
                                    <Item>
                                        <Status bgColor={StatusMap[game.status.statusCode].color}>
                                            <span style={{ color: "#fff" }}>
                                                {StatusMap[game.status.statusCode].detailedState} {game.status.statusCode === "1" && `(${moment(game.gameDate).tz("America/Edmonton").format("h:mm A")})`}
                                            </span>
                                        </Status>
                                        <Content>
                                            {StatusMap[game.status.statusCode].live &&
                                                <ContentRight>
                                                    <div>{game.linescore.currentPeriodOrdinal}</div>
                                                    <div>{game.linescore.currentPeriodTimeRemaining}</div>
                                                </ContentRight>
                                            }
                                            <ContentLeft>
                                                <div>
                                                    <img style={{ height: "20px" }} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${game.teams.away.team.id}.svg`} />
                                                    <span>{game.teams.away.team.name} ({game.teams.away.leagueRecord.wins}-{game.teams.away.leagueRecord.losses}-{game.teams.away.leagueRecord.ot}) <Score>{game.teams.away.score}</Score></span>
                                                </div>
                                                <div>
                                                    <img style={{ height: "20px" }} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${game.teams.home.team.id}.svg`} />
                                                    <span>{game.teams.home.team.name} ({game.teams.home.leagueRecord.wins}-{game.teams.home.leagueRecord.losses}-{game.teams.home.leagueRecord.ot}) <Score>{game.teams.home.score}</Score></span>
                                                </div>
                                            </ContentLeft>
                                            <Spacer />
                                            <NetworkHolder>
                                                {game.content.media.epg.filter(med => med.title === "NHLTV")[0].items.map((item, key) => {
                                                    if (item.mediaState === "MEDIA_ON" || item.mediaState === "MEDIA_ARCHIVE") {
                                                        return <a>
                                                            <NetworkContainer>
                                                                <Network src={getNetwork(item.callLetters)} title={`${item.mediaFeedType} - ${item.callLetters}`} />
                                                            </NetworkContainer>
                                                        </a>
                                                    }
                                                })}
                                            </NetworkHolder>
                                        </Content>
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </ContainerHolder>
        </React.Fragment>
    );
};