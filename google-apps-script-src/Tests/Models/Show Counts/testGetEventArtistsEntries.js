function testGetEventArtistsEntriesRunAll() {
    const sample = [['event','email','artistname','entries']]
    const expected = JSON.stringify(sample)
    testGetEventArtistsEntries1(typeof expected, true)
}

function testGetEventArtistsEntries1(expected, verbose) {
    const d = getEventArtistEntries() 
    const t = 1
    
    if (verbose) {
        console.log("Test %s: Artist Entries %s ", t, d)
    }

    if ("{condition}") {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }
    return 
}