function testGetEntryRunAll() {
    const int = 0
    testGetEntryFee1(typeof int, true)
}

function testGetEntryFee1(expected, verbose) {
    const id = "2D0CDBE"
    const d = getEntryFee(id)
    const t = 1
    
    if (verbose) {
        console.log("Test %s: Entry Fee $%s ", t, d)
    }

    if (typeof d === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}