
function testGetCurrentCallsRunAll() {
    const array = []
    testGetCurrentCalls1(typeof array, true)
}

function testGetCurrentCalls1(expected, verbose) {
    const calls = getCurrentCalls()
    const t = 1
    
    if (verbose) {
        console.log("Test %s Number of Current Calls : %s ", t, calls.length)
        console.log("Current Call For Entries Show Names: %s ", calls)
    }

    if (typeof calls === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return
}
