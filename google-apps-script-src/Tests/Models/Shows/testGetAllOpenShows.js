function testGetAllOpenShowsRunAll() {
    testRunnerTemplate1(1, true)
}

function testRunnerTemplate1(expected, verbose) {
    let d = getAllOpenShows()
    let numOfShows = d.length
    let t = 1
    
    if (verbose) {
        console.log("Test %s: All Open Shows %s ", t, d)
        console.log("  Number of open shows: %s ", numOfShows)
    }

    if (d.length === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}