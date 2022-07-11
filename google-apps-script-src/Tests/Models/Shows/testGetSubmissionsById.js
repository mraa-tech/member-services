function testGetSubmissionsByIdRunAll() {
    const array = []
    testGetSubmissionsById1(typeof array, true)
}

function testGetSubmissionsById1(expected, verbose) {
    const id = "2D0CDBE"
    let submissions = getSubmissionsById(id) 
    let t = 1

    if (verbose) {
        console.log("Test %s: %s Submissions found", t, submissions.length)
        console.log(submissions)
    }


    if (typeof submissions === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return
}

