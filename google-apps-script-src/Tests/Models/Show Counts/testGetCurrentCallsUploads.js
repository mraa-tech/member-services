function testGetCurrentCallsUploadsRunAll() {
    const expected = []
    testGetCurrentCallsUploads1(typeof expected, true)
}

function testGetCurrentCallsUploads1(expected, verbose) {
    let d = getCurrentCallsUploads()
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Current Calls Uploads By Show:  %s ", t, d)
    }

    if (typeof d === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}