/**
 * Data source definitions for CFE
 * @returns {object}
 */
function getCFETables() {
   return {
      countsbytitleartist: {
         name: "Counts By Title Artist",
         type: "pivot",
         headers: 1,
         summary: "Grand Total",
         schema: {
            title: "a",
            id: "b",
            email: "c",
            artistname: "d",
            entries: "e",
         },
      },
      countsbyartisttitle: {
         name: "Counts By Artist Title",
         type: "pivot",
         headers: 1,
         summary: "Grand Total",
         schema: {
            email: "a",
            title: "b",
            count: "c",
         },
      },
      countsbyid: {
         name: "Counts By Id",
         type: "pivot",
         headers: 1,
         summary: "Grand Total",
         schema: {
            id: "a",
            title: "b",
            count: "c",
         },
      },
      appsettings: {
         name: "AppSettings",
         type: "standard",
         headers: 1,
         schema: {
            maximagesize: "a2",
            cfecontact: "b2",
            statuslist: "c2:c",
            latestdeploymenturl: "d2",
            applicationversion: "e2",
            latestdeploymentlist: "d2:d",
            applicationversionlist: "e2:e",
            treasurerName: "i2",
            treasurerEmail: "j2",
         },
      },
      opencalls: {
         name: "Open Calls",
         type: "pivot",
         headers: 1,
         summary: "none",
      },
      payments: {
         name: "Payments",
         type: "standard",
         headers: 1,
         schema: {
            exhibitid: "a",
            exhibitname: "b",
            exhibitlocation: "c", // in config file
            artistemail: "d",
            artistlastname: "e",
            artistfirstname: "f",
            qtyentered: "g",
            amountpaid: "h", // blank - entered by treasurer when payment is made
            datereceived: "i", // blank - entered by treasurer when payment is made
            timestamp: "j",
         },
      },
      paymentdashboard: {
         name: "Payment Dashboard",
         type: "dashboard",
         pivottables: {
            exhibittotals: {
               name: "Exhibit Totals",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  exhibitname: "a",
                  totalentries: "b",
                  totalpaid: "c",
               },
            },
            totalsbyemail: {
               name: "Exhibit Totals By Artist Email",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  artistemail: "d",
                  exhibitname: "e",
                  exhibitid: "f",
                  qtyentered: "g",
                  amountpaid: "h",
               },
            },
            totalsbyexhibitname: {
               name: "Exhibit Totals By Exhibit Name",
               type: "pivot",
               headers: 2,
               summary: 1,
               titles: 1,
               schema: {
                  exhibitname: "j",
                  artistlastname: "k",
                  artistfirstname: "l",
                  qtyentered: "m",
                  amountpaid: "n",
               },
            },
         },
      },
   }
}

/**
 * Retrieve a show from the Config tab
 * @param {string} id Unique show identifier
 * @returns {object} Show object
 */
function getShow(id) {
   return MRAACommon.getExhibitConfigById(id)
}

/**
 *
 * @param {string} id Unique show identifier
 * @returns {string} Show name
 */
// function getShowName(id) {
//    return getShow(id).exhibittitle
// }

/**
 * Get all current show identifiers
 * @returns {array} All unique show identifiers
 */
function getAllShowIds() {
   const allShows = getAllShows()
   return allShows.map((s) => s[0])
}

/**
 * Get maximum entries allowed for a show
 * @param {string} id Unique show identifier
 * @returns {number} Max entries
 */
// function getMaxEntriesPerShow(id) {
//    // Ensure a number is returned if missing
//    let max = 0
//    const show = getShow(id)
//    const maxEntriesPerShow = show.maxEntriesPerShow
//    if (maxEntriesPerShow) {
//       max = parseInt(maxEntriesPerShow)
//    }
//    return max
// }

/**
 * Get maximum entries allowed per artist
 * @param {string} id Unique show identifier
 * @returns {number} Max artist entries
 */
// function getMaxEntriesPerArtist(id) {
//    const show = getShow(id)
//    return show.maxEntriesPerArtist
// }

/**
 * Get Pay Fee Only setting for requested show
 * @param {string} id Unique show identifier
 * @returns {boolean} yes/no
 */
// function getPayFeeOnly(id) {
//    return getShow(id).payFeeOnly
// }

/**
 * Get a list of all open shows
 * @returns {array} a list of all open shows
 */
// replaced with MRAACommon.getOpenCalls()
function getAllOpenShows() {
   return MRAACommon.getOpenCalls()
}

/**
 * Get a list of all shows regardless of status
 *
 * @returns {array} a list of all shows objects
 */
function getAllShows() {
   const cfeTableMetadata = MRAACommon.getCFEConfigMetadata()
   const cfeConfigTable = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTableMetadata.name
   )
   const headers = cfeTableMetadata.headers
   const schema = MRAACommon.buildTableSchema(cfeConfigTable, headers)
   const startRow = headers + 1
   const startCol = 1
   const data = cfeConfigTable.getSheetValues(
      startRow,
      startCol,
      cfeConfigTable.getLastRow() - headers,
      cfeConfigTable.getLastColumn()
   )

   // return array of objects
   let exhibits = []
   for (let row = 0; row < data.length; row++) {
      let exhibit = {}
      for (let key in schema) {
         let fldPos = schema[key] - 1
         exhibit[key] = data[row][fldPos]
      }
      exhibits.push(exhibit)
   }

   return exhibits
}

/**
 * Get total entries for the event from the pivot table
 * @param {string}  Id
 * @returns {number} Total
 */
function getTotalByEvent(id) {
   const cfeTables = getCFETables()
   const cfeTitleCounts = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTables.countsbytitle.name
   )
   const cfeTitleCountsSchema = cfeTables.countsbytitle.schema
   const startRow = cfeTables.countsbytitle.headers + 1
   const startCol = 1
   const data = cfeTitleCounts
      .getRange(
         startRow,
         startCol,
         cfeTitleCounts.getLastRow() - startRow,
         cfeTitleCounts.getLastColumn()
      )
      .getValues()
   const idPos = cfeTitleCountsSchema.id.colToIndex()
   const countPos = cfeTitleCountsSchema.count.colToIndex()
   const filteredData = data.filter((r) => r[idPos] === id)
   let totalByEvent = 0

   if (filteredData.length > 0) {
      totalByEvent = parseInt(filteredData[0][countPos])
   }
   return totalByEvent
}

/**
 * Get total number of entries for an event for each artist
 * @param {string} Event Title
 * @param {string} Artist email
 * @returns {number} Total
 */
function getTotalByEventArtist(evtTitle, email) {
   const cfeTables = getCFETables()
   const cfeTitleCounts = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTables.countsbytitleartist.name
   )
   const cfeTitleCountsSchema = cfeTables.countsbytitleartist.schema
   const startRow = cfeTables.countsbytitleartist.headers + 1
   const startCol = 1
   const titlePos = cfeTitleCountsSchema.title.colToIndex()
   const emailPos = cfeTitleCountsSchema.email.colToIndex()
   const countPos = cfeTitleCountsSchema.count.colToIndex()
   const data = cfeTitleCounts
      .getRange(
         startRow,
         startCol,
         cfeTitleCounts.getLastRow() - startRow,
         cfeTitleCounts.getLastColumn()
      )
      .getValues()
   let totalByEventArtist = 0
   let evtCount = data.filter(function (r) {
      return (
         r[titlePos].toLowerCase() === evtTitle.toLowerCase() &&
         r[emailPos].toLowerCase() === email.toLowerCase()
      )
   })

   if (evtCount.length > 0) {
      totalByEventArtist = evtCount[0][countPos]
   }
   return totalByEventArtist
}

/**
 * Get exhibits that are currently calling for entries or the call is closed but the show is still open.
 * This reads entries in the Exhibit table which are all the entries made by artists for a show.
 * The entries remain in the Exhibit table until the show is closed.
 *
 * @returns {array} The exhibit titles for all current calls for entries and open shows
 */
function getCurrentCalls() {
   const cfeExhibitsMetadata = MRAACommon.getCFEExhibitsMetadata()
   const headers = cfeExhibitsMetadata.headers
   const cfeExhibits = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeExhibitsMetadata.name
   )
   const cfeExhibitsSchema = MRAACommon.buildTableSchema(cfeExhibits, headers)
   const startRow = headers + 1
   const startCol = cfeExhibitsSchema.exhibittitle
   const endRow = cfeExhibits.getLastRow() - headers
   const endCol = startCol
   const data = cfeExhibits.getSheetValues(startRow, startCol, endRow, endCol)

   const filteredData = data.map((d) => d[0])
   const uniqueEvents = [...new Set(filteredData)]

   return uniqueEvents
}

function getCurrentCallsUploads() {
   const cfeTables = getCFETables()
   const cfeCountsById = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTables.countsbyid.name
   )
   const cfeCountsByIdSchema = cfeTables.countsbyid.schema
   const headers = cfeTables.countsbyid.headers
   const startRow = headers + 1
   const startCol = 1
   const dataRows = cfeCountsById.getLastRow() - startRow
   const isSummary =
      cfeTables.countsbyid.summary && cfeTables.countsbyid.summary !== "none"

   let data = []

   if (dataRows > 0) {
      data = cfeCountsById
         .getRange(
            startRow,
            startCol,
            cfeCountsById.getLastRow() - headers,
            cfeCountsById.getLastColumn()
         )
         .getDisplayValues()

      if (isSummary) {
         // remove summary row, it will always be the last row
         data.pop()
      }
   }

   return data
}
/**
 * Get all submissions for an event
 * @param {string} id Event Id
 * @returns {array} all submissions
 */
function getSubmissionsById(id) {
   const cfeTables = getCFETables()
   const cfeExhibits = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTables.exhibits.name
   )
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const startRow = cfeTables.exhibits.headers + 1
   const startCol = 1
   const idPos = cfeExhibitsSchema.eventid.colToIndex()
   const data = cfeExhibits
      .getRange(
         startRow,
         startCol,
         cfeExhibits.getLastRow() - startRow,
         cfeExhibits.getLastColumn()
      )
      .getDisplayValues()
   let filteredData = data.filter((d) => d[idPos] === id)

   return filteredData
}

/**
 * Get all uploads for an event (by title) for an artist
 * @param {string} evtTitle Event Title
 * @param {string} email Artist Email
 * @returns {string}
 */
function getUploadsByArtist(evtTitle, email) {
   const cfeTables = getCFETables()
   const cfeExhibits = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTables.exhibits.name
   )
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const startRow = cfeTables.exhibits.headers + 1
   const startCol = 1
   const titlePos = cfeExhibitsSchema.eventtitle.colToIndex()
   const emailPos = cfeExhibitsSchema.email.colToIndex()
   const filenamePos = cfeExhibitsSchema.filename.colToIndex()
   const data = cfeExhibits
      .getRange(
         startRow,
         startCol,
         cfeExhibits.getLastRow() - startRow,
         cfeExhibits.getLastColumn()
      )
      .getDisplayValues()
   const uploads = data.filter(
      (r) =>
         r[titlePos].toLowerCase() === evtTitle.toLowerCase() &&
         r[emailPos].toLowerCase() === email.toLowerCase()
   )

   return uploads.map((r) => r[filenamePos]).join()

   // stringify not working as intended when passed back to the client
   //return JSON.stringify(uploads.map(r => r[DataColMap.fileName-1]))
}

/**
 * Get uploads for an event (by id) for an artist
 * @param {string} id Event Id
 * @param {string} email Artist Email
 * @returns {string}
 */
function getUploadsByIdByArtist(id, email) {
   const cfeTables = getCFETables()
   const cfeExhibits = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTables.exhibits.name
   )
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const startRow = cfeTables.exhibits.headers + 1
   const startCol = 1
   const idPos = cfeExhibitsSchema.eventid.colToIndex()
   const emailPos = cfeExhibitsSchema.email.colToIndex()
   const filenamePos = cfeExhibitsSchema.filename.colToIndex()
   const data = cfeExhibits
      .getRange(
         startRow,
         startCol,
         cfeExhibits.getLastRow() - startRow,
         cfeExhibits.getLastColumn()
      )
      .getDisplayValues()
   const uploads = data.filter(
      (r) =>
         r[idPos].toLowerCase() === id.toLowerCase() &&
         r[emailPos].toLowerCase() === email.toLowerCase()
   )
   return JSON.stringify(uploads.map((r) => r[filenamePos]))
}

function getEventArtistEntries() {
   const cfeTables = getCFETables()
   const cfeEntries = MRAACommon.connect(CFE_ID).getSheetByName(
      cfeTables.countsbytitleartist.name
   )
   const cfeCountsSchema = cfeTables.countsbytitleartist.schema
   const idPos = cfeCountsSchema.id.colToIndex()
   const headers = cfeTables.countsbytitleartist.headers
   const startRow = headers + 1
   const startCol = 1
   const summary = cfeTables.countsbytitleartist.summary
   const footers = cfeTables.countsbytitleartist.footers
   const dataRows = cfeEntries.getLastRow() - headers - footers

   let data = []
   let fee = 0
   let newData = []
   if (dataRows > 0) {
      data = cfeEntries
         .getRange(startRow, startCol, dataRows, cfeEntries.getLastColumn())
         .getDisplayValues()

      for (let row = 0; row < data.length; row++) {
         fee = getFee(data[row][idPos])
         if (fee > 0) {
            newData.push([...data[row], data[row][4] * fee])
         } else {
            newData.push([...data[row], Math.abs(fee)])
         }
      }
   }

   return newData
}

function getFee(id) {
   const show = getShow(id)
   const fee =
      parseInt(show.entryfee) === 0
         ? parseInt(show.showfee) * -1
         : parseInt(show.entryfee)
   // return show fee as negative as indicator that it's not an entry fee
   // TODO: refactor show fee indicator
   return fee
}

// TODO: refactor to account for blank rows
/**
 * This currently assumes that the Exhibit Totals by Exhibit Name is the longest in the sheet.
 * It does not account for blank rows if it is not the longest.
 *
 * @returns {array}
 */
function getExhibitPaymentsDashboard() {
   const cfeTables = getCFETables()
   const cfePaymentDashboard = MRAACommon.MRAACommon.connect(
      CFE_ID
   ).getSheetByName(cfeTables.paymentdashboard.name)
   const cfePDPivotTables = cfeTables.paymentdashboard.pivottables
   const cfeTBENPivotTable = cfePDPivotTables.totalsbyexhibitname
   const cfeTBENSchema = cfePDPivotTables.totalsbyexhibitname.schema // schema for totalsbyexhibitname pivot table
   const startRow = 1 + cfeTBENPivotTable.titles // include headers and summary rows, exclude title
   const cols = Object.keys(cfeTBENSchema).length // determine number of columns in pivot table
   const startCol = cfeTBENSchema.exhibitname.colToIndex() + 1 // determine starting column for this pivot table
   const dataRows = cfePaymentDashboard.getLastRow() // include headers and summary rows

   let data = []

   if (dataRows > 0) {
      data = cfePaymentDashboard
         .getRange(startRow, startCol, dataRows, cols)
         .getDisplayValues()
   }
   return data
}
