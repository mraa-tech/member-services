function testGetUploadsByIdByArtist() {
    const evtTitle = "Test Upload Feedback"
    const evtId = "2F83B9D"
    const email = "jamesgreen.311@gmail.com"

    let uploads = getUploadsByIdByArtist(evtId, email)

    console.log(uploads)
    return 
}