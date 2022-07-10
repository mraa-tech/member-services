const showId = "3295A61"

function testConfig() {
    let id1 = generateUniqueId();
    console.log(id1);
    let id2 = generateUniqueId();
    console.log(id2);
}

function testShowObj() {
    let show = new Show('KLM');
    show.maxEntriesPerArtist = 3;
    console.log(`Show: ${show.name}, Id: ${show.id}, Max Artist Entries: ${show.maxEntriesPerArtist}`);
}

function testRetrieveShow() {
    console.log(getShow(showId));
}

function testAddShowToSheet() {
    // grab an existing row to test with
    let show = getShow(showId);
    // change the id and name
    show.id = generateUniqueId();
    show.name = "Test Add New Show";
    // save it
    let row = addShowToSheet(show);
    console.log(row);
}

function testGetAllShowIds() {
    console.log(getAllShowIds());
}

function testGetTotalSubmittedByArtist() {
    console.log(`Total submits by artist: ${getTotalSubmittedByArtist("Make It So", "jamesgreen.311@gmail.com")}`);
}

function testIsMember() {
    let member = isMember("jamesgreen.311@gmail.com")?"Yes":"No";
    console.log(`Member: ${member}`);
}