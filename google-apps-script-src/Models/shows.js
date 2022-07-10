//const CFE_DB = connect(CFE_ID)

const CFE_TABLES = {
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

/**
 * Retrieve a show from the Config tab
 * @param {string} id Unique show identifier 
 * @returns {object} Show object
 */
function getShow(id) {
    // connect to file and open sheet
    let cfeConfig = connect(CFE_ID).getSheetByName(CFE_TABLES.config.name)
    let startRow = CFE_TABLES.config.headers + 1
    let startCol = 1
    let data = cfeConfig.getRange(startRow, startCol, cfeConfig.getLastRow() - startRow, cfeConfig.getLastColumn()).getDisplayValues()
    let show = {}

    for (let d of data) {
        if (d[CFE_TABLES.config.schema.showid] === id) {
            show.id = d[CFE_TABLES.config.schema.showid]
            show.name = d[CFE_TABLES.config.schema.exhibitname]
            show.openDate = d[CFE_TABLES.config.schema.cfeopendate]
            show.closeDate = d[CFE_TABLES.config.schema.cfeclosedate]
            show.maxEntriesPerArtist = d[CFE_TABLES.config.schema.maxentrieseerartist]
            show.maxEntriesPerShow = d[CFE_TABLES.config.schema.maxentriespershow]
            show.imageFolderId = d[CFE_TABLES.config.schema.imagefolderid]
            show.allowNFS = d[CFE_TABLES.config.schema.allownfs]
            show.payFeeOnly = d[CFE_TABLES.config.schema.payfeeonly]
            show.purchaseLimit = d[CFE_TABLES.config.schema.purchaselimit]
            show.showopen = d[CFE_TABLES.config.schema.showopendate]
            show.showclose = d[CFE_TABLES.config.schema.showclosedate]
            show.registrationLink = d[CFE_TABLES.config.schema.registrationlink]
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
    let allShows = getAllShows()
    let showids = allShows.map(s => s[0]);

    return showids;
}

/**
 * Get maximum entries allowed for a show
 * @param {string} id Unique show identifier
 * @returns {number} Max entries
 */
function getMaxEntriesPerShow(id) {
    let max = 0;
    let maxEntriesPerShow = getShow(id).maxEntriesPerShow;
    if (maxEntriesPerShow) {
        max = maxEntriesPerShow;
    }
    return max;
}

/**
 * Get maximum entries allowed per artist
 * @param {string} id Unique show identifier
 * @returns {number} Max artist entries
 */
function getMaxEntriesPerArtist(id) {
    let max = getShow(id).maxEntriesPerArtist;
    return max;
}

/** 
 * Get Pay Fee Only setting for requested show
 * @param {string} id Unique show identifier
 * @returns {boolean} yes/no
 */
function getPayFeeOnly(id) {
    let pfo = getShow(id).payFeeOnly;
    return pfo;

}

/**
 * Get a list of all open shows
 * @returns {array} a list of all open shows
 */
function getAllOpenShows() {
    let data = getAllShows()
    // schema defines fields by column letter, need to convert to a zero based integer for array access
    let statusPos = (CFE_TABLES.config.schema.status).toUpperCase().charCodeAt(0) - 65 // ascii code for uppercase A
    let openShows = data.filter(d  => d[statusPos] === "OPEN" )

    return openShows
}

function getAllShows() {
    let cfeConfig = CFE_DB.getSheetByName(CFE_TABLES.config.name)
    let startRow = CFE_TABLES.config.headers + 1
    let startCol = 1
    let data = cfeConfig
        .getRange(startRow, startCol, cfeConfig.getLastRow() - CFE_TABLES.config.headers, cfeConfig.getLastColumn())
        .getDisplayValues()

    return data
}

/**
 * 
 * @param {string} name the name of a show
 * @returns {string} show id
 */
function getShowIdByName(name) {
    let data = getAllShows()
    let showId = data.filter( d => d[1] === name)

    return showId[0][0]
}