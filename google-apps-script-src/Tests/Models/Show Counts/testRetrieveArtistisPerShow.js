function testRetrieveArtistsPerShowRunAll() {
    let expected = []
    testRetrieveArtistsPerShow1(typeof expected, true)
}

function testRetrieveArtistsPerShow1(expected, verbose) {
    let d = retrieveArtistsPerShow()
    let t = 1
    
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