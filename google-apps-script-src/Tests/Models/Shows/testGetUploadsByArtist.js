function testGetUploadsByArtist() {
    const evtTitle = "Test Upload Feedback"
    const email = "jamesgreen.311@gmail.com"

    let uploads = getUploadsByArtist(evtTitle, email)

    console.log(uploads)
    //console.log(uploads.map(r => r[11])) 
    return 
}