function testGetTotalExhibitingMembersRunAll() {
    let number = 1    
    testGetTotalExhibitingMembers1(typeof number, true)
}

function testGetTotalExhibitingMembers1(expected, verbose) {
    let d = getTotalMembers("exhibiting")
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Total Exhibiting Members %s ", t, d)
    }

    return console.log((typeof d === expected) ? "test %s pass" : "test %s fail", t)
}