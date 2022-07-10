function testRunnerTemplateRunAll() {
    testRunnerTemplate1("{replace me}", true)
}

function testRunnerTemplate1(expected, verbose) {
    let d = "{replace me}"
    let t = 1
    
    if (verbose) {
        console.log("Test %s: {replace me} %s ", t, d)
    }

    if ("{condition}") {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}