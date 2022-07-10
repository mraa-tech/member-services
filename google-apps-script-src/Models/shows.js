function getCFETables() {
    return {
        "exhibits" : {
            "name" : "Exhibits",
            "type" : "standard",
            "headers" : 1,
            "schema" : {
                "eventid" : "a",
                "eventtitle" : "b",
                "firstname" : "c",
                "lastname" : "d",
                "email" : "e",
                "phone" : "f",
                "worktitle" : "g",
                "medium" : "h",
                "width" : "i",
                "height" : "j",
                "price" : "k",
                "filename" : "l",
                "fileid" : "m",
                "member" : "n",
                "availablity" : "o", // not currently used
                "hidden" : "p", // not currently used
                "timestamp" : "q"
            },
        },
        "countsbytitleartist" : {
            "name" : "Counts By Title Artist",
            "type" : "pivot",
            "headers" : 1,
            "summary" : "Grand Total",
            "schema" : {
                "title" : "a",
                "email" : "b",
                "count" : "c",
            },
        },
        "countsbyartisttitle" : {
            "name" : "Counts By Artist Title",
            "type" : "pivot",
            "headers" : 1,
            "summary" : "Grand Total",
            "schema" : {
                "email" : "a",
                "title" : "b",
                "count" : "c",
            },
        },
        "countsbytitle" : {
            "name" : "Counts By Id",
            "type" : "pivot",
            "headers" : 1,
            "summary" : "Grand Total",
            "schema" : {
                "id" : "a",
                "count" : "b",
            },
        },
        "config" : {
            "name" : "Config",
            "type" : "standard",
            "headers" : 1,
            "schema" : {
                "showid": "a",
                "exhibitname": "b",
                "cfeopendate": "c",
                "cfeclosedate": "d",
                "maxentriesperartist": "e",
                "maxentriespershow": "f",
                "imagefolderid": "g",
                "allownfs": "h",
                "status": "i",
                "payfeeonly": "j",
                "purchaselimit": "k",
                "showopendate" : "l",
                "showclosedate" : "m",
                "registrationlink": "n"
            },
        }
    
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
        //let i = cfeConfigSchema.showid.colToIndex()
        if (d[cfeConfigSchema.showid.colToIndex()] === id) {
            show.id = d[cfeConfigSchema.showid.colToIndex()]
            show.name = d[cfeConfigSchema.exhibitname.colToIndex()]
            show.openDate = d[cfeConfigSchema.cfeopendate.colToIndex()]
            show.closeDate = d[cfeConfigSchema.cfeclosedate.colToIndex()]
            show.maxEntriesPerArtist = d[cfeConfigSchema.maxentriesperartist.colToIndex()]
            show.maxEntriesPerShow = d[cfeConfigSchema.maxentriespershow.colToIndex()]
            show.imageFolderId = d[cfeConfigSchema.imagefolderid.colToIndex()]
            show.allowNFS = d[cfeConfigSchema.allownfs.colToIndex()]
            show.payFeeOnly = d[cfeConfigSchema.payfeeonly.colToIndex()]
            show.purchaseLimit = d[cfeConfigSchema.purchaselimit.colToIndex()]
            show.showopen = d[cfeConfigSchema.showopendate.colToIndex()]
            show.showclose = d[cfeConfigSchema.showclosedate.colToIndex()]
            show.registrationLink = d[cfeConfigSchema.registrationlink.colToIndex()]
        } 
    }
    return show;
}

/**
 * 
 * @param {string} id Unique show identifier
 * @returns {string} Show name
 */
function getShowName(id) {
    return getShow(id).name;
}

/**
 * Get all current show identifiers
 * @returns {array} All unique show identifiers
 */
function getAllShowIds() {
    const allShows = getAllShows()
    return allShows.map(s => s[0]);

}

/**
 * Get maximum entries allowed for a show
 * @param {string} id Unique show identifier
 * @returns {number} Max entries
 */
function getMaxEntriesPerShow(id) {
    // Ensure a number is returned if missing
    let max = 0;
    const show = getShow(id)
    const maxEntriesPerShow = show.maxEntriesPerShow;
    if (maxEntriesPerShow) {
        max = parseInt(maxEntriesPerShow);
    }
    return max;
}

/**
 * Get maximum entries allowed per artist
 * @param {string} id Unique show identifier
 * @returns {number} Max artist entries
 */
function getMaxEntriesPerArtist(id) {
    const show = getShow(id) 
    return show.maxEntriesPerArtist;
}

/** 
 * Get Pay Fee Only setting for requested show
 * @param {string} id Unique show identifier
 * @returns {boolean} yes/no
 */
function getPayFeeOnly(id) {
    return getShow(id).payFeeOnly;
}

/**
 * Get a list of all open shows
 * @returns {array} a list of all open shows
 */
function getAllOpenShows() {
    const cfeTables = getCFETables()
    const cfeConfigSchema = cfeTables.config.schema
    // schema defines fields by column letter, need to convert to a zero based integer for array access
    const statusPos = (cfeConfigSchema.status).toUpperCase().charCodeAt(0) - 65 // ascii code for uppercase A
    const data = getAllShows()
    return data.filter(d  => d[statusPos] === "OPEN" )

}

function getAllShows() {
    const cfeTables = getCFETables()
    const cfeConfig = connect(CFE_ID).getSheetByName(cfeTables.config.name)
    const startRow = cfeTables.config.headers + 1
    const startCol = 1
    const data = cfeConfig
        .getRange(startRow, 
                startCol, 
                cfeConfig.getLastRow() - startRow, 
                cfeConfig.getLastColumn())
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
    const namePos = (cfeConfigSchema.exhibitname).toUpperCase().charCodeAt(0) - 65 // ascii code for uppercase A
    const idPos = (cfeConfigSchema.showid).toUpperCase().charCodeAt(0) - 65
    const data = getAllShows()
    const showId = data.filter( d => d[namePos] === name)

    return showId[0][idPos]
}