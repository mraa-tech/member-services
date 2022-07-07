const MEMBERS_DB = connect(MEMBERSHIP_ID)
const M_TABLES = {
    "directory" : "Member Directory",
    "settings" : "Configuration",
    "dashboard" : "Dashboard"
}

const DIRECTORY_FIELDS_MAP = {
    "email" : 1,
    "first-name" : 2,
    "last-name" : 3,
    "preferred-name" : 4,
    "status" : 5,
    "street-address" : 6,
    "street-address-2" : 7,
    "city" : 8,
    "state" : 9,
    "zip" : 10,
    "contact-number-1" : 11,
    "contact-number-2" : 12,
    "membership-type" : 13,
    "jury-date" : 14,
    "medium" : 15,
    "artist-signature" : 16,
    "business-name" : 17,
    "comments" : 18
}

const M_SETTINGS_FIELDS_MAP = {
    "status-list" : "a2:a",
    "membership-type-list" : "c2:c",
    "medium" : "f2:f"
}

const M_DASHBOARD_FIELDS_MAP = {
    "counts" : {
        "membership-type" : "a2:b",
        "status" : "d2:e", 
        "city" : "g2:h",
        "pay-method" : "j2:k",
        "members" : "n1",
        "unpaid-members" : "n3",
        "pending-members" : "n4",
        "dues-paid" : "n5"
    }
}

const M_SETTINGS_TABLE_NAME = M_TABLES.settings
const M_SETTINGS_TABLE = MEMBERS_DB.getSheetByName(M_SETTINGS_TABLE_NAME)
const M_MEMBERS_TABLE_NAME = M_TABLES.directory
const M_MEMBERS_TABLE = MEMBERS_DB.getSheetByName(M_MEMBERS_TABLE_NAME)
const M_MEMBERS_TABLE_HDRS = 2
const M_DASHBOARD_TABLE_NAME = M_TABLES.dashboard
const M_DASHBOARD_TABLE = MEMBERS_DB.getSheetByName(M_DASHBOARD_TABLE_NAME)

function getStatusList() {
    let list = M_SETTINGS_TABLE
        .getRange(M_SETTINGS_FIELDS_MAP["status-list"]+M_SETTINGS_TABLE.getLastRow())
        .getDisplayValues()
    list = list.map(l => l[0]) // convert from [][] to []
    return list.filter(l => l!=="") // remove empty array elements
}

function getMembershipTypeList() {
    let list = M_SETTINGS_TABLE
        .getRange(M_SETTINGS_FIELDS_MAP["membership-type-list"]+M_SETTINGS_TABLE.getLastRow())
        .getDisplayValues()
    list = list.map(l => l[0]) // convert from [][] to []
    return list.filter(l => l!=="") // remove empty array elements
}

/**
 * Gets six columns from the membership spreadsheet. All columns are combined
 * into one array for each member
 *
 * @returns {array} member email, first name, last name, status, phone, membership type
 */
 function getMemberInfo() {
    let lastRow = M_MEMBERS_TABLE.getLastRow();
    let firstRow = M_MEMBERS_TABLE_HDRS + 1; 
    let memberInfoList = M_MEMBERS_TABLE.getRangeList([
        'A'+firstRow+':C'+lastRow, 
        'E'+firstRow+':E'+lastRow, 
        'K'+firstRow+':K'+lastRow, 
        'M'+firstRow+':M'+lastRow
    ]); 
    let ranges = memberInfoList.getRanges();
    let colEmailName = ranges[0].getValues();
    let colStatus = ranges[1].getValues();
    let colPhone = ranges[2].getValues();
    let colMembership = ranges[3].getValues();
    let colCombined = [];

    for (x=0; x<ranges[0].getValues().length; x++) {
      colCombined.push([...colEmailName[x], ...colStatus[x], ...colPhone[x], ...colMembership[x]]);
    }
    return colCombined; 
}

function getTotalMembers(type) {
    var count = 0
    switch (type) {
        case "all" :
            count = M_DASHBOARD_TABLE.getRange(M_DASHBOARD_FIELDS_MAP["counts"]["members"]).getDisplayValue()
            count = parseInt(count)
            break

        case "pending" :
            count = M_DASHBOARD_TABLE.getRange(M_DASHBOARD_FIELDS_MAP["counts"]["pending-members"]).getDisplayValue()
            count = parseInt(count)
            break

        case "exhibiting" :
            var list = M_DASHBOARD_TABLE.getRange(M_DASHBOARD_FIELDS_MAP["counts"]["membership-type"]).getDisplayValues()
            list = list.filter(l => l[0] !== "")
            let exhibiting = list.filter( function(l) {
                let _l = l[0]
                return _l.toLowerCase() === "exhibiting"
            })
            count = parseInt(exhibiting[0][1])
            break
        
        case "associate" :
            var list = M_DASHBOARD_TABLE.getRange(M_DASHBOARD_FIELDS_MAP["counts"]["membership-type"]).getDisplayValues()
            list = list.filter(l => l[0] !== "")
            let associate = list.filter( function(l) {
                let _l = l[0]
                return _l.toLowerCase() === "associate"
            })
            count = parseInt(associate[0][1])
            break

        default :
            count = M_DASHBOARD_TABLE.getRange(M_DASHBOARD_FIELDS_MAP["counts"]["members"]).getDisplayValue()
            count = parseInt(count)
            break
    }

    return count
}

function getDuesPaid() {
    let d =  M_DASHBOARD_TABLE
        .getRange(M_DASHBOARD_FIELDS_MAP["counts"]["dues-paid"])
        .getDisplayValue()
    
    return parseInt(d)
}
