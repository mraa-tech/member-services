function testGetCurrentShowsRunAll() {
    testGetCurrentShows1(null, true)
}

function testGetCurrentShows1(expected, verbose) {
    let d = getCurrentShows()
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Current Shows %s ", t, d)
    }

    for (let _d=0; _d<d.length; _d++) {
        console.log(d[_d])
    }

    if (typeof d === 'object') {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}