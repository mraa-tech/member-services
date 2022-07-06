const ROUTES = {
    path : function (r, callback) {
        ROUTES[r] = callback
    }
}
ROUTES.path("statuslist", getStatusListResponse)
ROUTES.path("membershiptypelist", getMembershipTypeListResponse)
ROUTES.path("paymentmethodlist", getPaymentMethodListResponse)
ROUTES.path("duesforexhibiting", getDuesForExhibitingResponse)
ROUTES.path("duesforassociate", getDuesForAssociateResponse)
ROUTES.path("duesforexhibiting", getDuesForExhibitingResponse)
ROUTES.path("totalmembers", getTotalMembersResponse)
ROUTES.path("totalexhibitingmembers", getTotalExhibitingMembersResponse)

function doGet(e) {
    let result = route(e.parameter['q'])
    let response = JSON.stringify(result)
    
    return ContentService
        .createTextOutput(response)
        .setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
    let result = route('post', e.parameter['q'])
}

function route(path) {
    let result = ROUTES[path]()
    return result
}

function getStatusListResponse() {
    return getStatusList()
}

function getMembershipTypeListResponse() {
    return getMembershipTypeList()
}

function getPaymentMethodListResponse(){
    return getPaymentMethodList()
}

function getDuesForExhibitingResponse() {
    return getDuesAmountByMembershipType('exhibiting')
}

function getDuesForAssociateResponse() {
    return getDuesAmountByMembershipType('associate')
}

function getTotalMembersResponse() {
    return getTotalMembers("all")
}

function getTotalExhibitingMembersResponse() {
    return getTotalMembers("exhibiting")
}