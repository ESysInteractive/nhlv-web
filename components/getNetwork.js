const Networks = {
    ABC: require("../images/networks/abc.png"),
    ATT: require("../images/networks/att.png"),
    BSAZ: require("../images/networks/bsaz.png"),
    BSDET: require("../images/networks/bsdet.png"),
    BSFL: require("../images/networks/bsfl.png"),
    BSMW: require("../images/networks/bsmw.png"),
    BSN: require("../images/networks/bsn.png"),
    BSOH: require("../images/networks/bsoh.png"),
    BSSO: require("../images/networks/bsso.png"),
    BSSUN: require("../images/networks/bssun.png"),
    BSSW: require("../images/networks/bssw.png"),
    BSW: require("../images/networks/bsw.png"),
    ESPN: require("../images/networks/espn.png"),
    MSG: require("../images/networks/msg.png"),
    NBC: require("../images/networks/nbc.png"),
    ROOT: require("../images/networks/root.png"),
    TSN1: require("../images/networks/tsn1.png"),
    TSN2: require("../images/networks/tsn2.png"),
    TSN3: require("../images/networks/tsn3.png"),
    TSN4: require("../images/networks/tsn4.png"),
    TSN5: require("../images/networks/tsn5.png"),
    SN: require("../images/networks/sn.png"),
    DEFAULT: require("../images/networks/default.png")
};

export default (network) => {
    let networkFound = "DEFAULT";

    for (const [key, value] of Object.entries(Networks)) {
        if (network.toUpperCase().includes(key)) {
            networkFound = key;
            break;
        }
    }

    return Networks[networkFound].default.src;
}