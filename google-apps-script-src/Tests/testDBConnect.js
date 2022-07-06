
function testDBConnectRunAll() {
    testDuesConnect()
    testMembershipConnect()
}

function testMembershipConnect() {
    console.log(`Membership Active Sheet: %s`, MEMBERS_DB.getActiveSheet().getName())
}

function testDuesConnect() {
    console.log(`Dues Active Sheet: %s`, DUES_DB.getActiveSheet().getName())
}
