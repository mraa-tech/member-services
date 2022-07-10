function testGetTotalByEventArtistRunAll() {
    const int = 1
    testGetTotalByEventArtist1(typeof int, true)
}

function testGetTotalByEventArtist1(expected, verbose) {
    const event = "KIND OF BLUE at GLEN ALLEN"
    const artist = "appletreestudio@yahoo.com"
    let d = getTotalByEventArtist(event, artist)
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Total Uploads for %s by %s ", t, event, artist, d)
    }

    if (typeof d === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}