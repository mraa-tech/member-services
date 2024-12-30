function testGetCurrentCalls() {
   const calls = getCurrentCalls()
   Logger.log(calls)
}
function testGetAllShows() {
   const shows = getAllShows()
   for (let i = 0; i < shows.length; i++) {
      Logger.log(
         "Exhibit Title: %s, Exhibit Status: %s",
         shows[i].exhibittitle,
         shows[i].status
      )
   }
   Logger.log(shows)
}

function testOpenCalls() {
   const opencalls = getAllOpenShows()
   for (let i = 0; i < opencalls.length; i++) {
      Logger.log(opencalls[i].exhibittitle)
   }
   Logger.log(opencalls)
}

function testGetPivotTables() {
   const cfeID = MRAACommon.getCallForEntriesId()
   const cfeFile = MRAACommon.connect(cfeID)
   const sheet = cfeFile.getSheetByName("Payment Dashboard")
   Logger.log(sheet.getPivotTables()[1].getPivotValues())
}

function testGetExhibitData() {
   const exhibit = MRAACommon.getExhibitConfigById("176BD2A")

   Logger.log(exhibit)
   Logger.log(exhibit.exhibittitle) // replaces getShowName()
   Logger.log(exhibit.maxentriespershow) // replaces getMaxEntriesPerShow()
   Logger.log(exhibit.maxentriesperartist) // replaces getMaxEntriesPerArtist()
   Logger.log(exhibit.payfeeonly) // replaces getPayFeeOnly()
   Logger.log(exhibit.entryfee) // replaces getShowFee()
   Logger.log(exhibit.entryfeecashdiscount)

   Logger.log(
      "Entry Fee (Cash) %s",
      exhibit.entryfee - exhibit.entryfeecashdiscount
   )

   Logger.log(getAllShows())
}
