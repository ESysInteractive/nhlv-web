const Networks = {
    ABC: {
        logo: require("../images/networks/abc.png"),
        height: "30px"
    },
    ATT: {
        logo: require("../images/networks/att.png"),
        height: "30px"
    },
    BSAZ: {
        logo: require("../images/networks/bsaz.png"),
        height: "30px"
    },
    BSDET: {
        logo: require("../images/networks/bsdet.png"),
        height: "30px"
    },
    BSFL: {
        logo: require("../images/networks/bsfl.png"),
        height: "25px"
    },
    BSMW: {
        logo: require("../images/networks/bsmw.png"),
        height: "30px"
    },
    BSN: {
        logo: require("../images/networks/bsn.png"),
        height: "30px"
    },
    BSOH: {
        logo: require("../images/networks/bsoh.png"),
        height: "30px"
    },
    BSSC: {
        logo: require("../images/networks/bssc.png"),
        height: "30px"
    },
    BSSO: {
        logo: require("../images/networks/bsso.png"),
        height: "30px"
    },
    BSSUN: {
        logo: require("../images/networks/bssun.png"),
        height: "30px"
    },
    BSSW: {
        logo: require("../images/networks/bssw.png"),
        height: "30px"
    },
    BSW: {
        logo: require("../images/networks/bsw.png"),
        height: "30px"
    },
    CBC: {
        logo: require("../images/networks/sn.png"),
        height: "25px"
    },
    ESPN: {
        logo: require("../images/networks/espn.png"),
        height: "30px"
    },
    MASN: {
        logo: require("../images/networks/masn.png"),
        height: "20px"
    },
    MSN2: {
        logo: require("../images/networks/masn.png"),
        height: "20px"
    },
    MSG: {
        logo: require("../images/networks/msg.png"),
        height: "20px"
    },
    NBC: {
        logo: require("../images/networks/nbc.png"),
        height: "25px"
    },
    NESN: {
        logo: require("../images/networks/default.png"),
        height: "30px"
    },
    ROOT: {
        logo: require("../images/networks/root.png"),
        height: "30px"
    },
    RSNW: {
        logo: require("../images/networks/root.png"),
        height: "30px"
    },
    TSN1: {
        logo: require("../images/networks/tsn1.png"),
        height: "5px"
    },
    TSN2: {
        logo: require("../images/networks/tsn2.png"),
        height: "5px"
    },
    TSN3: {
        logo: require("../images/networks/tsn3.png"),
        height: "5px"
    },
    TSN4: {
        logo: require("../images/networks/tsn4.png"),
        height: "5px"
    },
    TSN5: {
        logo: require("../images/networks/tsn5.png"),
        height: "5px"
    },
    SNLA: {
        logo: require("../images/networks/snla.png"),
        height: "25px"
    },
    SNY: {
        logo: require("../images/networks/sny.svg"),
        height: "25px"
    },
    SN: {
        logo: require("../images/networks/sn.png"),
        height: "25px"
    },
    DEFAULT: {
        logo: require("../images/networks/default.png"),
        height: "30px"
    }
};

export default (network) => {
    let networkFound = "DEFAULT";

    for (const [key, value] of Object.entries(Networks)) {
        if (network.toUpperCase().includes(key)) {
            networkFound = key;
            break;
        }
    }

    return {
        src: Networks[networkFound].logo.default.src,
        height: Networks[networkFound].height
    };
}