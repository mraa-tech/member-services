const DUES_DB = connect(MEMBER_DUES_ID)
const MD_TABLES = {
    "payments" : "Payments",
    "history" : "Payment History",
    "settings" : "Settings"
}

const PAYMENT_FIELDS_MAP = {
    "email" : 1,
    "data-paid" : 2,
    "amount-paid" : 3,
    "expires-date" : 4,
    "payment-method" : 5,
    "comments" : 6
}

const HISTORY_FIELDS_MAP = {
    "email" : 1,
    "data-paid" : 2,
    "amount-paid" : 3,
    "expires-date" : 4,
    "payment-method" : 5,
    "comments" : 6
}

const MD_SETTINGS_FIELDS_MAP = {
    "payment-method-list" : "a2:a",
    "dues-by-membership" : {
        "exhibiting" : "c2",
        "associate" : "c3",
        "honorary" : "c4"
    },
    "paypal-transaction-fee" : "d2",
    "dues-begin-date" : "e2",
    "dues-ending-date" : "f2"
}

const SETTINGS_TABLE_NAME = MD_TABLES.settings
const SETTINGS_TABLE = DUES_DB.getSheetByName(SETTINGS_TABLE_NAME)

function getPaymentMethodList() {
    let list = SETTINGS_TABLE
        .getRange(MD_SETTINGS_FIELDS_MAP["payment-method-list"]+SETTINGS_TABLE.getLastRow())
        .getDisplayValues()
    return list.map(l => l[0])
}

function getDuesAmountByMembershipType(type = "exhibiting") {
    let amount = SETTINGS_TABLE
        .getRange(MD_SETTINGS_FIELDS_MAP["dues-by-membership"][type])
        .getDisplayValue()
    return amount
}

function getPayPalFee() {
    let fee =  SETTINGS_TABLE
        .getRange(MD_SETTINGS_FIELDS_MAP["paypal-transaction-fee"])
        .getDisplayValue()
    fee = isNaN(fee)?0:fee
    return parseFloat(fee)
}

function getDuesBeginPeriod() {
    let date =  SETTINGS_TABLE
        .getRange(MD_SETTINGS_FIELDS_MAP["dues-begin-date"])
        .getDisplayValue()
    
    return date
}

function getDuesEndingPeriod() {
    let date =  SETTINGS_TABLE
        .getRange(MD_SETTINGS_FIELDS_MAP["dues-ending-date"])
        .getDisplayValue()
    
    return date
}