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
        "dashboard" : {
            "name" : "Dashboard",
            "type" : "pivot",
            "headers" : 1,
            "schema" : {
    
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

    const yearPos = (tables.participants.schema.showyear).toUpperCase().charCodeAt(0) - 65
    // filter and keep only current year
    let currentData = data.filter( d => (parseInt(d[yearPos]) === year))
    return currentData
}
