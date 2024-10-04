/**
 * Data source definitions for CFE
 * @returns {object}
 */
function getCFETables() {
   return {
      exhibits: {
         name: "Exhibits",
         type: "standard",
         headers: 1,
         schema: {
            eventid: "a",
            eventtitle: "b",
            firstname: "c",
            lastname: "d",
            email: "e",
            phone: "f",
            worktitle: "g",
            medium: "h",
            width: "i",
            height: "j",
            price: "k",
            filename: "l",
            fileid: "m",
            member: "n",
            availablity: "o", // not currently used
            hidden: "p", // not currently used
            fullname: "q", // not currently used
            timestamp: "r", // not currently used
         },
      },
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
      config: {
         name: "Config",
         type: "standard",
         headers: 1,
         schema: {
            showid: "a",
            exhibitname: "b",
            cfeopendate: "c",
            cfeclosedate: "d",
            maxentriesperartist: "e",
            maxentriespershow: "f",
            imagefolderid: "g",
            allownfs: "h",
            status: "i",
            payfeeonly: "j",
            purchaselimit: "k",
            showopendate: "l",
            showclosedate: "m",
            entryfee: "n",
            registrationlink: "o",
            applicationversion: "p",
            feestructure: "q",
            maxprice: "r",
            showfee: "s",
            location: "t",
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
         schema: {
            cfeclosedate: "a",
            id: "b",
            name: "c",
            maxentries: "d",
            entryfee: "e",
            imagefolderid: "f",
         },
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
               schema: {
                  artistemail: "e",
                  exhibitname: "f",
                  qtyentered: "g",
                  amountpaid: "h",
               },
            },
            totalsbyexhibitname: {
               name: "Exhibit Totals By Exhibit Name",
               type: "pivot",
               headers: 2,
               summary: 1,
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
   // connect to file and open sheet
   const cfeTables = getCFETables()
   const data = getAllShows()
   const cfeConfigSchema = cfeTables.config.schema
   let show = {}

   for (let d of data) {
      if (d[cfeConfigSchema.showid.colToIndex()] === id) {
         show.id = d[cfeConfigSchema.showid.colToIndex()]
         show.name = d[cfeConfigSchema.exhibitname.colToIndex()]
         show.openDate = d[cfeConfigSchema.cfeopendate.colToIndex()]
         show.closeDate = d[cfeConfigSchema.cfeclosedate.colToIndex()]
         show.maxEntriesPerArtist =
            d[cfeConfigSchema.maxentriesperartist.colToIndex()]
         show.maxEntriesPerShow =
            d[cfeConfigSchema.maxentriespershow.colToIndex()]
         show.imageFolderId = d[cfeConfigSchema.imagefolderid.colToIndex()]
         show.allowNFS = d[cfeConfigSchema.allownfs.colToIndex()]
         show.payFeeOnly = d[cfeConfigSchema.payfeeonly.colToIndex()]
         show.purchaseLimit = d[cfeConfigSchema.purchaselimit.colToIndex()]
         show.showopen = d[cfeConfigSchema.showopendate.colToIndex()]
         show.showclose = d[cfeConfigSchema.showclosedate.colToIndex()]
         show.entryfee = d[cfeConfigSchema.entryfee.colToIndex()]
         show.registrationLink =
            d[cfeConfigSchema.registrationlink.colToIndex()]
         show.showfee = d[cfeConfigSchema.showfee.colToIndex()]
      }
   }
   return show
}

/**
 *
 * @param {string} id Unique show identifier
 * @returns {string} Show name
 */
function getShowName(id) {
   return getShow(id).name
}

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
function getMaxEntriesPerShow(id) {
   // Ensure a number is returned if missing
   let max = 0
   const show = getShow(id)
   const maxEntriesPerShow = show.maxEntriesPerShow
   if (maxEntriesPerShow) {
      max = parseInt(maxEntriesPerShow)
   }
   return max
}

/**
 * Get maximum entries allowed per artist
 * @param {string} id Unique show identifier
 * @returns {number} Max artist entries
 */
function getMaxEntriesPerArtist(id) {
   const show = getShow(id)
   return show.maxEntriesPerArtist
}

/**
 * Get Pay Fee Only setting for requested show
 * @param {string} id Unique show identifier
 * @returns {boolean} yes/no
 */
function getPayFeeOnly(id) {
   return getShow(id).payFeeOnly
}

/**
 * Get a list of all open shows
 * @returns {array} a list of all open shows
 */
function getAllOpenShows() {
   const cfeTables = getCFETables()
   const cfeConfigSchema = cfeTables.config.schema
   // schema defines fields by column letter, need to convert to a zero based integer for array access
   const statusPos = cfeConfigSchema.status.colToIndex()
   const data = getAllShows()
   return data.filter((d) => d[statusPos] === "OPEN")
}

function getAllShows() {
   const cfeTables = getCFETables()
   const cfeConfig = connect(CFE_ID).getSheetByName(cfeTables.config.name)
   const headers = cfeTables.config.headers
   const startRow = headers + 1
   const startCol = 1
   const data = cfeConfig
      .getRange(
         startRow,
         startCol,
         cfeConfig.getLastRow() - headers,
         cfeConfig.getLastColumn()
      )
      .getDisplayValues()

   return data
}

/**
 *
 * @param {string} name the name of a show
 * @returns {string} show id
 */
function getShowIdByName(name) {
   const cfeTables = getCFETables()
   const cfeConfigSchema = cfeTables.config.schema
   // schema defines fields by column letter, need to convert to a zero based integer for array access
   const namePos = cfeConfigSchema.exhibitname.colToIndex()
   const idPos = cfeConfigSchema.showid.colToIndex()
   const data = getAllShows()
   const showId = data.filter((d) => d[namePos] === name)

   return showId[0][idPos]
}

/**
 * Get total entries for the event from the pivot table
 * @param {string}  Id
 * @returns {number} Total
 */
function getTotalByEvent(id) {
   const cfeTables = getCFETables()
   const cfeTitleCounts = connect(CFE_ID).getSheetByName(
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
   const cfeTitleCounts = connect(CFE_ID).getSheetByName(
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
 * Get shows that are currently calling for entries
 */
function getCurrentCalls() {
   const cfeTables = getCFETables()
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
   const cfeExhibitsSchema = cfeTables.exhibits.schema
   const headers = cfeTables.exhibits.headers
   const startRow = headers + 1
   const startCol = cfeExhibitsSchema.eventtitle.colToIndex() + 1
   const data = cfeExhibits
      .getRange(startRow, startCol, cfeExhibits.getLastRow() - headers, 1)
      .getDisplayValues()

   const filteredData = data.map((d) => d[0])
   const uniqueEvents = [...new Set(filteredData)]

   return uniqueEvents
}

function getCurrentCallsUploads() {
   const cfeTables = getCFETables()
   const cfeCountsById = connect(CFE_ID).getSheetByName(
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
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
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
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
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
   const cfeExhibits = connect(CFE_ID).getSheetByName(cfeTables.exhibits.name)
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
   const cfeEntries = connect(CFE_ID).getSheetByName(
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

function getExhibitPaymentsDashboard() {
   const cfeTables = getCFETables()
   const cfePaymentDashboard = connect(CFE_ID).getSheetByName(
      cfeTables.paymentdashboard.name
   )
   const cfePDPivotTables = cfeTables.paymentdashboard.pivottables
   const cfeTBENPivotTable = cfePDPivotTables.totalsbyexhibitname
   const cfeTBENSchema = cfePDPivotTables.totalsbyexhibitname.schema // schema for totalsbyexhibitname pivot table
   const startRow = 1 // include headers and summary rows
   const cols = Object.keys(cfeTBENSchema).length
   const startCol = cfeTBENSchema.exhibitname.colToIndex() + 1
   const headers = cfeTBENPivotTable.headers
   // const summary = cfeTBENPivotTable.summary
   const dataRows = cfePaymentDashboard.getLastRow() // include headers and summary rows

   let data = []

   if (dataRows > 0) {
      data = cfePaymentDashboard
         .getRange(startRow, startCol, dataRows, cols)
         .getDisplayValues()
   }
   return data
}
