function testGetTotalMembersRunAll() {
    let number = 1
    testGetTotalMembers1((typeof number), true)
    testGetTotalMembers2((typeof number), true)
}

function testGetTotalMembers1(expected, verbose) {
    let d = getTotalMembers()
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Total Members (default) %s ", t, d)
    }

    return console.log((typeof d === expected) ? "test %s pass" : "test %s fail", t)
}

function testGetTotalMembers2(expected, verbose) {
    let d = getTotalMembers("all")
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Total Members (implicit) %s ", t, d)
    }

    return console.log((typeof d === expected) ? "test %s pass" : "test %s fail", t)
}