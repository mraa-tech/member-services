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
ROUTES.path("totalassociatemembers", getTotalAssociateMembersResponse)
ROUTES.path("totalpendingmembers", getTotalPendingMembersResponse)
ROUTES.path("totalduespaid", getTotalDuesPaidResponse)
ROUTES.path("currentexhibitions", getCurrentCallsResponse)
ROUTES.path("currentcallsuploads", getCurrentCallsUploadsResponse)
ROUTES.path("artistspershowhistory", retrieveArtistsPerShowResponse)

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

function getTotalAssociateMembersResponse() {
    return getTotalMembers("associate")
}

function getTotalPendingMembersResponse() {
    return getTotalMembers("pending")
}

function getTotalDuesPaidResponse() {
    return getDuesPaid()
}

function getCurrentCallsResponse() {
    return getCurrentCalls()
}

function getCurrentCallsUploadsResponse() {
    return getCurrentCallsUploads()
}

function retrieveArtistsPerShowResponse() {
    return retrieveArtistsPerShow()
}