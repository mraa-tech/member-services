function testAllShowFuncsRunAll() {
/*     testGetAllShows(true)
    testGetShow(true)
    testGetShowName(true)
    testGetAllShowIds(true)
    testGetMaxEntriesPerShow(true)
    testGetMaxEntriesPerArtist(true) 
    testGetAllOpenShows(true)*/
    testgetShowIdByName(true)
}

function testGetAllShows(verbose) {
    const d = getAllShows()
    const t = 0

    if (verbose) {
        console.log("Test %s: All Shows %s ", t, d)
    }
}

function testGetShow(verbose) {
    const d = getShow("2D0CDBE")
    const t = 1
    
    if (verbose) {
        console.log("Test %s: Show Object %s ", t, d)
    }

/*     if ("{condition}") {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    } */
    return 
}

function testGetShowName(verbose) {
    const id = "2D0CDBE"
    const t = 2
    const name = getShowName(id)

    if (verbose) {
        console.log("Test %s: Name for id %s is %s ", t, id, name)
    }
    return 
}

function testGetAllShowIds(verbose) {
    const t = 3
    const ids = getAllShowIds()

    if (verbose) {
        console.log("Test %s: All show ids %s ", t, ids)
    }
    return 
}

function testGetMaxEntriesPerShow(verbose) {
    const id = "2D0CDBE"
    const t = 4
    const max = getMaxEntriesPerShow(id)

    if (verbose) {
        console.log("Test %s: Max Entries Per Show %s ", t, max)
    }
    return  
}

function testGetMaxEntriesPerArtist(verbose) {
    const id = "2D0CDBE"
    const t = 5
    const max = getMaxEntriesPerArtist(id)

    if (verbose) {
        console.log("Test %s: Max Entries Per Artist %s ", t, max)
    }
    return 
}

function testGetAllOpenShows(verbose) {
    const open = getAllOpenShows()
    const t = 6
 
    if (verbose) {
        console.log("Test %s: All Open Shows %s ", t, open)
    }
    return 

}

function testgetShowIdByName(verbose) {
    const name = "KIND OF BLUE at GLEN ALLEN"
    const id = getShowIdByName(name)
    const t = 7

    if (verbose) {
        console.log("Test %s: Show id for %s is %s ", t, name, id)
    }
    return   
}