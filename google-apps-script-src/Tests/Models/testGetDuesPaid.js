function testGetDuesPaidRunAll() {
    testGetDuesPaid1(61, true)
}

function testGetDuesPaid1(expected, verbose) {
    let d = getDuesPaid()
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Dues Paid Count %s ", t, d)
    }

    if (d === expected) {
        console.log("test %s pass", t)
    } else {
        console.error("test %s fail", t)
    }

    return 
}