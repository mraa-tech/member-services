function getShowHistoryTables() {
    return {
        "participants" : {
            "name" : "Participating Members",
            "type" : "standard",
            "headers" : 1,
            "schema" : {
                "email" : "a",
                "showname" : "b",
                "showyear" : "c",
                "numworks" : "d",
                "phone" : "f",
                "lastname" : "g",
                "firstname" : "h",
                "membership" : "i",
                "fullname" : "j"
            }
        },
        "artistpershow" : {
            "name" : "TotalArtistPerShow",
            "type" : "pivot",
            "headers" : 1,
            "summary" : "none",
            "schema" : {
                "year" : "a",
                "name" : "b",
                "count" : "c"
            }
        }
    }
}

function retrieveCurrentShows() {
    const year = new Date().getFullYear()
    const tables = getShowHistoryTables()
    const tableName = tables.participants.name
    const historyTable = connect(EXHIBITION_HISTORY_ID).getSheetByName(tableName)
    const startRow = tables.participants.headers + 1
    const startCol = 1
    const data = historyTable.getRange(
        startRow, 
        startCol,
        historyTable.getLastRow(),
        historyTable.getLastColumn()
    ).getDisplayValues()

    const yearPos = (tables.participants.schema.showyear).colToIndex()

    // filter and keep only current year
    let currentData = data.filter( d => (parseInt(d[yearPos]) === year))
    return currentData
}

function retrieveArtistsPerShow() {
    const tables = getShowHistoryTables()
    const tableName = tables.artistpershow.name
    const historyTable = connect(EXHIBITION_HISTORY_ID).getSheetByName(tableName)
    const startRow = tables.artistpershow.headers + 1
    const startCol = 1
    const data = historyTable.getRange(
        startRow, 
        startCol,
        historyTable.getLastRow() - 1,
        historyTable.getLastColumn()
    ).getDisplayValues()  
    
    return data
}