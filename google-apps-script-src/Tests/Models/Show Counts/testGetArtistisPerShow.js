function testGetArtistsPerShowRunAll() {
    const expected = []
    testGetArtistsPerShow1(typeof expected, true)
}

function testGetArtistsPerShow1(expected, verbose) {
    const d = getArtistsPerShow()
    const t = 1
    
    if (verbose) {
        console.log("Test %s: Total Artists Per Show %s ", t, d)
    }

    if (typeof d === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}