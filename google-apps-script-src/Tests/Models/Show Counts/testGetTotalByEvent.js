function testGetTotalByEventRunAll() {
    let int = 1
    testGetTotalByEvent1(typeof int, true)
}

function testGetTotalByEvent1(expected, verbose) {
    let d = getTotalByEvent("2D0CDBE")
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Total Uploads by Event Id %s ", t, d)
    }

    if (typeof d === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}