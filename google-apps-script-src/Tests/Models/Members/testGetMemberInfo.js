function testGetMemberInfoRunAll() {
    testGetMemberInfo1(true)
}

function testGetMemberInfo1(verbose) {
    let d = getMemberInfo()
    let t = 1
    let expected = d.length > 0
    
    if (verbose) {
        console.log("Test %s: All Member Info %s ", t, d)
    }

    if (expected) {
        console.log("test %s pass", t)
    } else {
        console.error("test %s fail", t)
    }
    return 
}