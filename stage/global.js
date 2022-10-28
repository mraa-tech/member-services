const appsettings = {
  membershipChairpersonName: "",
  membershipChairpersonEmail: "",
  techContact: "",
  imageFolderId: "",
  maxImageSize: "",
};

const messagesrepo = {
  maxentriesreached:
    "<div class='banner bg-warning text-dark'>" +
    "You have reached the max entries for this event. If you feel this is inaccurate please contact the " +
    "**contactmailto**" +
    "</div>",
  membershipType : {
    associate : "Non-exhibiting artist membership is also encouraged.",
    exhibiting : "Artists wishing to join and exhibit are juried. "
  }
};

function displayUploads(uploads) {
  const uploadHistoryFound = document.getElementById("upload-history-found");
  const uploadHistoryNotFound = document.getElementById(
    "upload-history-notfound"
  );
  const uploadHistoryTable = document.getElementById("upload-history-table");
  const uhtBody = uploadHistoryTable.getElementsByTagName("tbody")[0];

  if (uploads.length > 0) {
    // build table body
    for (let i = 0; i < uploads.length; i++) {
      let row = document.createElement("tr");
      let col1 = document.createElement("td");
      let col2 = document.createElement("td");
      let col3 = document.createElement("td");
      col1.innerText = uploads[i][0];
      col2.innerText = uploads[i][1];
      col3.innerText = `\$${cfe.entryfee}`;
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      uhtBody.appendChild(row);
    }
    uploadHistoryFound.classList.remove("d-none");
  } else {
    uploadHistoryNotFound.classList.remove("d-none");
  }
  //uploadsRemaining(cfe.maxentries - applicant.uploadcount)
}

function fetchingApplicant(toggle) {
  const fetchingBlock = document.getElementById("fetching-applicant");
  if (toggle) {
    fetchingBlock.classList.remove("d-none");
  } else {
    fetchingBlock.classList.add("d-none");
  }
}

function fetchingUploads(toggle) {
  const fetchingBlock = document.getElementById("fetching-uploads");
  if (toggle) {
    fetchingBlock.classList.remove("d-none");
  } else {
    fetchingBlock.classList.add("d-none");
  }
}

function applicantDetailBlock(toggle) {
  // toggle true is on/show, false is off/hide
  const applicantDetailBlock = document.getElementById("applicant-detail");
  if (toggle) {
    applicantDetailBlock.classList.remove("d-none");
  } else {
    applicantDetailBlock.classList.add("d-none");
  }
}

function uploadHistoryBlock(toggle) {
  // toggle true is on/show, false is off/hide
  const uploadHistoryBlock = document.getElementById("upload-history");
  if (toggle) {
    uploadHistoryBlock.classList.remove("d-none");
  } else {
    uploadHistoryBlock.classList.add("d-none");
  }
}

function uploadWaiting(toggle) {
  const uploadWaiting = document.getElementById("uploadWaiting");
  if (toggle) {
    uploadWaiting.classList.remove("d-none");
  } else {
    uploadWaiting.classList.add("d-none");
  }
}

function imageSaved(num = 0) {
  const galleryCollection = document.getElementById("gallery");
  const galleryItems = galleryCollection.getElementsByTagName("li");
  const imageSaved = galleryCollection.getElementsByClassName("saved");
  const galleryContainer = galleryCollection.parentElement;
  const wasEmpty = galleryCollection.getElementsByClassName("empty")[0];

  wasEmpty.classList.remove("empty");
  galleryItems[num].classList.remove("d-none");
  galleryContainer.classList.remove("d-none");
  imageSaved[num].classList.remove("d-none");
}

function allowAccess() {
  const applicantAccess = document.getElementsByClassName("applicant-access");

  // show all hidden elements
  let allApplicantAccess = applicantAccess.length;
  for (i = allApplicantAccess - 1; i >= 0; i--) {
    applicantAccess[i].classList.remove("d-none");
  }
}

function disallowAccess() {
  const applicantAccess = document.getElementsByClassName("applicant-access");

  // show all hidden elements
  let allApplicantAccess = applicantAccess.length;
  for (i = allApplicantAccess - 1; i >= 0; i--) {
    applicantAccess[i].classList.add("d-none");
  }
}

function disableSubmissions(ele, msg) {
  const container = document.getElementById(ele);
  container.innerHTML = msg;
}

function imageGalleryToggle(toggle) {
  const imageGallery = document.getElementById("upload-gallery");
  if (toggle) {
    imageGallery.classList.remove("d-none");
  } else {
    imageGallery.classList.add("d-none");
  }
}

function resetErrorMessages() {}

function resetDisplay() {}

function showComplete() {
  uploadWaiting(false);
  // reset the form
  formUploadImages.reset();
  applicant.uploadcount = applicant.uploadcount + 1;

  // mark current image as saved
  imageSaved(applicant.sessioncount);
  applicant.sessioncount = applicant.sessioncount + 1;

  // increase upload count
  uploadsRemaining(cfe.maxentries - applicant.uploadcount);
}

function uploadsRemaining(count) {
  const msgMaxEntriesReached = messagesrepo.maxentriesreached;
  let maxEntries = document.getElementById("max-entries");

  if (maxEntries) {
    if (count > 0) {
      maxEntries.innerText = count;
    } else {
      // disable additional uploads
      maxEntries.innerText = 0;
      const exhibitmailto = msgMaxEntriesReached.replace(
        "**contactmailto**",
        "<a href='mailto:" +
          appsettings.techContact +
          "'>Exhibit Coordinator</a>"
      );

      disableSubmissions("entryInfo", exhibitmailto);
    }
  }
}

function showThumbnail(e) {
  const file = this.files[0];
  const maxImageSize = appsettings.maxImageSize;
  const uploadImageSize = (file.size / (1024 * 1024)).toFixed(1); // convert bytes to mb
  const imageGallery = document.getElementById("gallery");
  const galleryFirstEmpty = imageGallery.getElementsByClassName("empty")[0];
  const imageContainer = galleryFirstEmpty.parentElement;
  const submissionMessages = document.getElementById("submission-messages");
  imageGalleryToggle(true);

  const maxFileSizeMsg = `<p class="mt-2 mb-0">Your file size is <span class='text-danger'>** ${uploadImageSize} MB **</span> and it exceeds maximum allowed size of <span class="text-warning">${maxImageSize} MB</span>. Please select a smaller image.</p>`;

  // check file size before showing image
  if (uploadImageSize > maxImageSize) {
    submissionMessages.innerHTML = maxFileSizeMsg;
    e.stopImmediatePropagation();
    galleryFirstEmpty.innerHTML = "";
    submitWork.disabled = true;
    return false;
  } else {
    submissionMessages.innerHTML = "";
    galleryFirstEmpty.innerHTML = "<img class='crop' />";
    const thumbnail = galleryFirstEmpty.getElementsByTagName("img")[0];
    thumbnail.src = URL.createObjectURL(file);
    imageContainer.classList.remove("d-none");
    submitWork.disabled = false;
    return true;
  }
}

function displayMaxImageSize() {
  maxImageSize.innerText = appsettings.maxImageSize;
}

function setCopyrightYear() {
  const year = document.getElementById("year");
  year.innerText = moment().format("YYYY");
}

function displaySupportContact(contact) {
  const supportcontact = document.getElementById("supportcontact");
  supportcontact.innerHTML = ` > <a href='mailto:${contact}'>Support Contact</a>`;
}

// I/O Methods
function fetchAppSettings() {
  google.script.run.withSuccessHandler(processAppSettings).getAppSettings();
}

function processAppSettings(resp) {
  const r = JSON.parse(resp);
  appsettings.membershipChairpersonEmail = r.membershipChairpersonEmail;
  appsettings.membershipChairpersonName = r.membershipChairpersonName;
  appsettings.maxImageSize = r.maxImageSize;
  appsettings.techContact = r.techContact;
  appsettings.imageFolderId = r.imageFolderId;
}

function fetchApplicant(id) {
  resetErrorMessages();
  google.script.run
    .withSuccessHandler(processApplicant)
    .getApplicantByEmail(id);
}

function processApplicant(resp) {
  const validApplicant = resp.length > 0;
  if (validApplicant) {
    applicant.email = resp[0];
    applicant.firstname = resp[1];
    applicant.lastname = resp[2];
    applicant.phone = resp[10];
    applicant.status = resp[4];
    applicant.type = resp[12];

    applicantDetailBlock(true);
    fetchingApplicant(false);

    // attempt to fetch any uploads for this applicant
    /*       fetchingUploads(true) 
      fetchUploads(cfe, applicant)  */
  } else {
    applicant.email = id;
    applicant.firstname = "n/a";
    applicant.lastname = "n/a";
    applicant.phone = "n/a";
    applicant.status = "notvalid";
    applicant.type = "n/a";
  }
  displayApplicant(applicant);
  displaySupportContact(appsettings.techContact);
  //uploadsRemaining(cfe.maxentries - applicant.uploadcount)
}

/*   function fetchUploads(cfe, applicant) {
    const p = {
      artist: applicant.email,
      event: cfe.id,
      key: "id",
    } 
    google.script.run
      .withSuccessHandler(processUploads)
      .getArtistUploads(JSON.stringify(p)) 
  }

  function processUploads(resp) {
    fetchingUploads(false) 
    applicant.uploads = [...resp] 
    applicant.uploadcount = resp.length 
    displayUploads(applicant.uploads) 
  } */

function addApplicantImages(e) {
  e.preventDefault();
  uploadWaiting(true);
  const formfile = document.querySelector("#form-file");
  const formdata = new FormData(this);
  const fr = new FileReader();
  file = formfile.files[0];

  const payload = [
    ["eventid", cfe.id],
    ["eventtitle", cfe.name],
    ["firstname", applicant.firstname],
    ["lastname", applicant.lastname],
    ["email", applicant.email],
    ["phone", applicant.phone],
    ["imagefolder", cfe.imagefolderid],
    ...formdata,
  ];
  let _data = {};
  for (const [key, value] of payload) {
    _data[key] = value;
  }
  _data.filename = `${_data.lastname}-${_data.firstname}-${_data.worktitle}-${_data.medium}-${_data.width}x${_data.height}-${_data.price}`;
  _data.fileid = "";
  _data.applicant = "YES";
  _data.availability = "";
  _data.hidden = "";
  _data.fullname = applicant.firstname + " " + applicant.lastname;
  _data.timestamp = moment().format("MMMM Do YYYY, h:mm:ss a");

  fr.onload = function (e) {
    const img = {
      filename: _data.filename,
      mimetype: file.type,
      bytes: [...new Int8Array(e.target.result)],
    };
    _data.bytes = img.bytes;
    _data.mimetype = file.type;
    //upload.push(img)

    google.script.run
      .withSuccessHandler(showComplete)
      .withUserObject(this)
      .addApplicantImages(_data);
  };
  fr.readAsArrayBuffer(file);

  return _data;
}

/*   function isApplicant(applicant, status, type) {
    return applicant.status === status && type.includes(applicant.type) 
  } */

function emailValidate() {
  const emailAddress = document.getElementById("applicant-email").value;
  const form = document.getElementById("form-applicant-info");

  if (form.checkValidity()) {
    // fetch applicant
    fetchingApplicant(true);
    fetchApplicant(emailAddress);
  } else {
    // error handling by Bootstrap
  }
}

// Start up
function loadPageElements() {
  fetchAppSettings();
  setCopyrightYear();
}

function setMembershipTypeMsg(e) {
  const type = this.value
  const associateMsg = document.getElementById("associateMembership")
  const exhibitingMsg = document.getElementById("exhibitingMembership")

  if (type==="associate") {
    associateMsg.classList.remove("d-none")
    exhibitingMsg.classList.add("d-none")
  } else {
    associateMsg.classList.add("d-none")
    exhibitingMsg.classList.remove("d-none")
  }
}

document.addEventListener("DOMContentLoaded", loadPageElements);
//document.getElementById("form-file").addEventListener("change", showThumbnail);
/* document
  .getElementById("login-button")
  .addEventListener("click", emailValidate);
document
  .getElementById("artist-email")
  .addEventListener("change", resetDisplay);
document
  .getElementById("form-artist-info")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });
document
  .getElementById("formUploadImages")
  .addEventListener("submit", addApplicantImages); */
document.getElementById("membershipType1").addEventListener("click", setMembershipTypeMsg)
document.getElementById("membershipType2").addEventListener("click", setMembershipTypeMsg)