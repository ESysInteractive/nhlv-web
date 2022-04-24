const Networks = {
    BSAZ: require("../images/networks/bsaz.png"),
    BSMW: require("../images/networks/bsmw.png"),
    BSSO: require("../images/networks/bsso.png"),
    BSSUN: require("../images/networks/bssun.png"),
    BSSW: require("../images/networks/bssw.png"),
    NBC: require("../images/networks/nbc.png"),
    ROOT: require("../images/networks/root.png"),
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