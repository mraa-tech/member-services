function testGetSubmissionsById1(id, verbose) {
    let submissions = getSubmissionsById(id) 
    let expected = 'object'
    let t = 1

    if (verbose) {
        console.log("Test %s: %s Submissions found", t, submissions.length)
        console.log(submissions)
    }

    return console.log((typeof submissions === expected) ? "test %s pass" : "test %s fail", t)
}

function testGetSubmissionsByIdRunAll() {
    testGetSubmissionsById1('2D0CDBE', true)
}