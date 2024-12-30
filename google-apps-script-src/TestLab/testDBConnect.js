function testDBConnectRunAll() {
   Logger.log(MRAACommon.getMasterMemberId())
   Logger.log(MRAACommon.getCallForEntriesId())
   testDuesConnect()
   testMembershipConnect()
}

function testGetFileIDs() {
   Logger.log(MRAACommon.getMasterMemberId())
   Logger.log(MRAACommon.getCallForEntriesId())
}

function testMembershipConnect() {
   const conn = MRAACommon.connect(MRAACommon.getMasterMemberId())

   if (!MRAACommon.isEmptyObject(conn)) {
      const members = conn.getSheetByName("Member Directory")
      const headerRows = MRAACommon.getMemberMetadata().headers
      const schema = MRAACommon.buildTableSchema(members, headerRows)
      Logger.log(schema)
   }
}

function testDuesConnect() {
   Logger.log(`Dues Active Sheet: %s`, DUES_DB.getActiveSheet().getName())
}
