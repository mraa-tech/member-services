function testGetStatusListRunAll() {
    testGetStatusList1('object', true)
    testGetStatusList2(['pending', 'active', 'inactive', 'removed', 'memoriam'], true)
}

function testGetStatusList1(expected, verbose) {
    let d = getStatusList()
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Status List: %s", t, typeof d)
    }

    return console.log((typeof d === expected) ? "test %s pass" : "test %s fail", t)
}

function testGetStatusList2(expected, verbose) {
    let list = getStatusList()
    let t = 2

    if (verbose) {
        console.log("Test %s: List contains %s items. List values are %s ", t, list.length, list)
        console.log("Test %s: Expected contains %s items. Expected values are %s ", t, expected.length, expected)
    }

    let result = list.length === expected.length 
    let compare = list.every( ele => expected.includes(ele))

    return console.log((result && compare) ? "test %s pass" : "test %s fail", t)
}

