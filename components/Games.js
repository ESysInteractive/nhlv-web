import * as React from "react"
import styledComponent from "styled-components"
import { styled } from "@mui/material/styles"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

import TextField from "@mui/material/TextField"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import moment from "moment-timezone"
import StatusMap from "./StatusMap"
import getNetwork from "./getNetwork"

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

const ScoreLight = styledComponent.span`
    position: absolute;
    font-weight: bolder;
    left: 95%;
    margin-top: 5px;
`;

const ScoreDark = styledComponent.span`
    position: absolute;
    font-weight: bolder;
    left: 95%;
    margin-top: 5px;
    opacity: .5;
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
    height: ${props => props.logoHeight};
`;

const NetworkType = styledComponent.img`
    position: absolute;
    height: 30px;
    top: -10px;
    left: 35px;
    opacity: .25;
`;

const SeriesHolder = styledComponent.div`
    text-align: center;
    margin-bottom: 5px;
`;

const SeriesSummary = styledComponent.span`
    color: #fff;
    font-weight: bold;
`;

export default () => {
    const [mounted, setMounted] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    let defaultDate = moment();

    if (typeof window === undefined) defaultDate = moment(localStorage.getItem("savedDate"));

    const [date, setDate] = React.useState(defaultDate);
    const [formatDate, setFormatDate] = React.useState("");

    // Checks if mounted (loaded)
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Stores the formatted date from the date object
    React.useEffect(() => {
        setFormatDate(date.tz("America/Edmonton").format("YYYY-MM-DD"));
    }, [date]);

    // Fetches game data with formatted date
    React.useEffect(() => {
        if (formatDate != "")
        {
            fetch(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=&startDate=${formatDate}&endDate=${formatDate}&expand=schedule.broadcasts.all,schedule.teams,schedule.linescore,schedule.game.seriesSummary,schedule.game.content.media.epg`)
                .then(res => res.json())
                .then(ret => {
                    setData(ret);
                    setLoading(false);
                });
        }
    }, [formatDate]);
    
    if (!data) return <h1>Loading...</h1>;

    return (
        <React.Fragment key={String(mounted)}>
            <ContainerHolder>
                <Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={newDate => {
                                    setDate(newDate);
                                    localStorage.setItem("savedDate", moment(newDate))
                                }}
                                renderInput={params => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <Grid container spacing={2}>
                            {(data.dates[0] && data.dates[0].games) && data.dates[0].games.map(game => (
                                <Grid item md={4}>
                                    <Item>
                                        <Status bgColor={StatusMap[game.status.statusCode].color}>
                                            <span style={{ color: "#fff" }}>
                                                {StatusMap[game.status.statusCode].detailedState} {game.status.statusCode === "1" && `(${moment(game.gameDate).tz("America/Edmonton").format("h:mm A [MT]")})`}
                                            </span>
                                        </Status>
                                        <Content>
                                            {StatusMap[game.status.statusCode].live &&
                                                <ContentRight>
                                                    <div>{game.linescore.currentPeriodOrdinal}</div>
                                                    <div>{game.linescore.currentPeriodTimeRemaining}</div>
                                                </ContentRight>
                                            }
                                            {game.seriesSummary &&
                                                <SeriesHolder>
                                                    <SeriesSummary>{game.seriesSummary.gameLabel.toUpperCase()} ({game.seriesSummary.seriesStatusShort.toUpperCase()})</SeriesSummary>
                                                </SeriesHolder>
                                            }
                                            <ContentLeft>
                                                <div>
                                                    <img style={{ height: "20px" }} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${game.teams.away.team.id}.svg`} />
                                                    <span>{game.teams.away.team.name} ({game.teams.away.leagueRecord.wins}-{game.teams.away.leagueRecord.losses}{game.teams.away.leagueRecord.ot !== undefined && `-` + game.teams.away.leagueRecord.ot}) {(game.status.statusCode !== "1" && game.status.statusCode !== "2") && (game.teams.away.score >= game.teams.home.score ? <ScoreLight>{game.teams.away.score}</ScoreLight> : <ScoreDark>{game.teams.away.score}</ScoreDark>)}</span>
                                                </div>
                                                <div>
                                                    <img style={{ height: "20px" }} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${game.teams.home.team.id}.svg`} />
                                                    <span>{game.teams.home.team.name} ({game.teams.home.leagueRecord.wins}-{game.teams.home.leagueRecord.losses}{game.teams.home.leagueRecord.ot !== undefined && `-` + game.teams.home.leagueRecord.ot}) {(game.status.statusCode !== "1" && game.status.statusCode !== "2") && (game.teams.home.score >= game.teams.away.score ? <ScoreLight>{game.teams.home.score}</ScoreLight> : <ScoreDark>{game.teams.home.score}</ScoreDark>)}</span>
                                                </div>
                                            </ContentLeft>
                                            <Spacer />
                                            <NetworkHolder>
                                                {game.content.media.epg.filter(med => med.title === "NHLTV")[0].items.filter(feed => feed.mediaState === "MEDIA_ON" || feed.mediaState === "MEDIA_ARCHIVE").length > 0 ? game.content.media.epg.filter(med => med.title === "NHLTV")[0].items.filter(feed => feed.mediaState === "MEDIA_ON" || feed.mediaState === "MEDIA_ARCHIVE").map((item, key) => {
                                                    return <a>
                                                        <NetworkContainer>
                                                            <Network src={getNetwork(item.callLetters).src} title={`${item.mediaFeedType} - ${item.callLetters}`} logoHeight={getNetwork(item.callLetters).height} />
                                                        </NetworkContainer>
                                                    </a>
                                                }) : <span>Streams available at game time</span>}
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