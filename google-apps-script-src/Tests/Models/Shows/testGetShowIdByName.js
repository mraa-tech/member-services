
function testGetShowIdByNameRunAll() {
    testGetShowIdByName1('KIND OF BLUE at GLEN ALLEN', true)
    //testGetShowIdByName2('KIND OF BLUE at GLEN ALLEN')
}

function testGetShowIdByName1(name, verbose) {
    let showId = getShowIdByName(name)
    let expected = 'string' 
    let t = 1
    
    if (verbose) {
        console.log("Test %s: The Show Id for %s is %s", t, name, showId)
    }

    return
    //return console.log((typeof showId === expected) ? "test %s pass" : "test %s fail", t)
}

function testGetShowIdByName2(name, verbose) {
    let showId = getShowIdByName(name)
    let expected = '2D0CDBE' 
    let t = 2
    
    if (verbose) {
        console.log("Test %s: The Show Id for %s is %s", t, name, showId)
    }
    return
    //return console.log((showId === expected) ? "test %s pass" : "test %s fail", t)
}

