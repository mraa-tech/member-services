function testGetCurrentCalls1(verbose) {
    let calls = getCurrentCalls()
    let expected = "object" // actual value is unknown but must be an array. Array could be empty.

    if (verbose) {
        console.log("Test %s Number of Current Calls : %s ", "1", calls.length)
        console.log("Current Call For Entries Show Names: %s ", calls)
    }

    return console.log((typeof calls === expected) ? "test %s pass" : "test %s fail", "1")
}

function testGetCurrentCallsRunAll() {
    testGetCurrentCalls1(true)
}