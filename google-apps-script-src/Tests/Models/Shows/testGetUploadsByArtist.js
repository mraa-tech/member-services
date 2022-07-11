function testGetUploadsByArtist() {
    const evtTitle = "KIND OF BLUE at GLEN ALLEN"
    const email = "bowles3@gmail.com"

    let uploads = getUploadsByArtist(evtTitle, email)

    console.log(uploads)
    //console.log(uploads.map(r => r[11])) 
    return 
}