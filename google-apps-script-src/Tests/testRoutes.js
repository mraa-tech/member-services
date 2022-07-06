function testRoutesRunAll() {
    testRoutes1(["pending","active","inactive","removed","memoriam"], true)
    testRoutes2(["associate","exhibiting jury","exhibiting","honorary","memoriam"], true) 
    testRoutes3(["Cash","Check","PayPal","Awarded"], true)
    testRoutes4(45, true)
    testRoutes5(45, true)
}

function testRoutes1(expected, verbose) {
    let resp = route('statuslist').join()
    let t = 1
    
    if (verbose) {
        console.log("Test %s: Status List => %s ", t, resp)
    }

    if (resp === expected.join()) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }

    return 
}

function testRoutes2(expected, verbose) {
    let resp = route('membershiptypelist').join()
    let t = 2
    
    if (verbose) {
        console.log("Test %s: Membership Type List => %s ", t, resp)
    }

    if (resp === expected.join()) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }

    return
}

function testRoutes3(expected, verbose) {
    let resp = route('paymentmethodlist').join()
    let respArray = resp.split()
    let t = 3
    
    if (verbose) {
        console.log("Test %s: Payment Method List => %s ", t, resp)
        console.log("  Response Array => %s ", respArray)
    }

    if (resp === expected.join()) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }

    return 
}

function testRoutes4(expected, verbose) {
    let resp = parseInt(route('duesforexhibiting'))
    let t = 4
    
    if (verbose) {
        console.log("Test %s: Dues For Exhibiting => %s ", t, resp)
    }

    if (resp === expected) {
        console.log("Test %s pass", t)
    } else {
        console.error("Test %s fail", t)
    }

    return 
}

function testRoutes5(expected, verbose) {
    let resp = parseInt(route('duesforassociate'))
    let t = 5
    
    if (verbose) {
        console.log("Test %s: Dues For Associate => %s ", t, resp)
    }

    if (resp===expected) {
        console.log("Test %s pass", t)
    } else {
        console.log("Test %s fail", t)
    }

    return 
}