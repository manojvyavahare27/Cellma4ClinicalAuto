//Sathyanarayan

const {
  clickElement,
  typeText,
  selectFromDropdown,
} = require("../../../UtilFiles/StaticUtility.js");
const {
  selectFromSearchResults,
} = require("../../../UtilFiles/DynamicUtility.js");

class ClinicalExtraDetails {
  constructor(page) {
    this.page = page;
    //Search Medication fields
    this.clinicalItemCollapsable = page.locator("xpath=//div[@data-testid='CommonCellmaPopup']//button[@aria-label='cellmaAccordionIcon']");


    //CarePlan
    this.CarePlanNursingDiagnosis=page.locator("xpath=//input[@name='searchNursingDiagnosis']")
    this.SearchGoals=page.locator("xpath=//input[@name='searchGoals']")
    this.Interventions=page.locator("xpath=//input[@name='searchInterventions']")
    this.searchEvaluations=page.locator("xpath=//input[@name='searchEvaluations']")
    this.updateNotes=page.locator("xpath=//textarea[@id='updatedNotesForExtraDetails']")

    this.searchNursingDiagnosis0=page.locator("xpath=//textarea[@name='searchNursingDiagnosis0.notes']")
    this.searchGoals0=page.locator("xpath=//textarea[@name='searchGoals0.notes']")
    this.searchInterventions0=page.locator("xpath=//textarea[@name='searchInterventions0.notes']")
    this.searchEvaluations0=page.locator("xpath=//textarea[@name='searchEvaluations0.notes']")
    this.updatedNotesForExtraDetails=page.locator("xpath=//textarea[@id='updatedNotesForExtraDetails']")





    //Allergy
    //this.clinicalItemSubcategory = page.locator("xpath=//input[@id='Sub Category']");
    this.clinicalItemSubcategory = page.locator("xpath=//input[@id='Sub Category']");
    this.clinicalItemCollapsableAllergy1 = page.getByTestId("allergies").getByLabel("cellmaAccordionIcon");
    this.clinicalItemCollapsableAllergy2 = page.getByTestId("episodes[0].id").getByLabel("cellmaAccordionIcon");
    this.clinicalSubcategoryAllergy = page.locator("xpath=//input[@name='subCategory']");
    this.buttonSpecificAllergyName = page.locator("xpath=//button[@aria-label='Specific Allergy Name']");
    this.allergyStartDate = page.locator("xpath=//input[@id='episodes[0].startDate']");
    this.allergyEndDate = page.locator("xpath=//input[@id='episodes[0].endDate']");
    this.allergyReaction = page.locator("xpath=//input[@id='episodes[0].reaction']");
    this.ReactionSeverity = page.locator("xpath=//input[@id='episodes[0].reactionSeverity']");
    this.allergyTextArea = page.locator("xpath=//textarea[@id='episodes[0].allergyNotes']");

    //Procedure
    this.dateOfProcedure = page.locator("xpath=//input[@name='dateOfProcedure']");
    this.procedureType = page.locator("xpath=//input[@name='type']");
    this.procedureSite = page.locator("xpath=//input[@name='site']");
    this.performedByHP = page.locator("xpath=//input[@name='performedByHPConsultants']");
    this.procedureLevel = page.locator("xpath=//input[@name='level']");
    this.procedureStatus = page.locator("xpath=//input[@name='status']");
    this.procedureOutcome = page.locator("xpath=//input[@name='outcome']");
    this.linktoClinicLocation = page.locator("xpath=//input[@name='linkToClinicLocation']");
    this.linktoExistingCondition = page.locator("xpath=//input[@name='linkToExistingCondition']");
    this.linktoComplationDate = page.locator("xpath=//input[@name='completionDate']");
    this.procedureCheckboxDeviceRequired = page.locator("xpath=//span[@data-testid='Device Required']");
    this.procedureCheckboxPrivateRecord = page.locator("xpath=//span[@data-testid='Private Record']");
    this.procedureCheckBoxSetAsDefault = page.locator("xpath=//span[@data-testid='Set As Default']");
    this.procedureTextareaNotes = page.locator("xpath=//textarea[@name='notes']");

    //lifestyle

    this.lifeStyleNotes=page.locator("xpath=//textarea[@name='notes']")

    //riskFactor

    this.RfNotes=page.locator("xpath=//textarea[@name='notes']")

    //Social

    this.socialNotes=page.locator("xpath=//textarea[@name='notes']")


    //Diagnosis
    this.onSetDate = page.locator("xpath=//input[@data-testid='Onset Date']");
    this.diagnosedDate = page.locator("xpath=//input[@data-testid='Diagnosed Date']");
    this.diagnosis1stSeenDate = page.locator("xpath=//input[@data-testid='1st Seen Date']");
    this.status = page.locator("xpath=//input[@name='status']");
    this.severity = page.locator("xpath=//input[@name='severity']");
    this.activity = page.locator("xpath=//input[@name='activity']");
    this.countryOfDiagnosis = page.locator("xpath=//input[@name='countryOfDiagnosis']");
    this.underlayingCause = page.locator("xpath=//input[@name='underlyingCause']");
    this.complicationAndDiagnosis = page.locator("xpath=//input[@name='complicationsAndOtherDiagnosis']");
    this.externalCause = page.locator("xpath=//input[@name='externalCause']");
    this.linkToProcedure = page.locator("xpath=//input[@id='Link to Procedure']");

    this.dateOfOutcome = page.locator("xpath=//input[@id='Date of Outcome']");
    this.frequency = page.locator("xpath=//input[@name='frequency']");
    this.diagnosisNotes = page.locator("xpath=//textarea[@name='notes']");
    this.interpretationNotes = page.locator("xpath=//textarea[@name='notes']");
    this.private = page.locator("xpath=//label[@aria-label='Private Record']//input[@class='PrivateSwitchBase-input css-1m9pwf3']");
    this.setAsDefault = page.locator("xpath=//label[@aria-label='Set as Default']//input[@class='PrivateSwitchBase-input css-1m9pwf3']");
    this.addToFavourites = page.locator("xpath=//label[@aria-label='Add to Favourites']//input[@class='PrivateSwitchBase-input css-1m9pwf3']");
    this.addToOrderSets = page.locator("xpath=//label[@aria-label='Add to Order Set']//input[@class='PrivateSwitchBase-input css-1m9pwf3']");
    this.save = page.locator("xpath=//button[@aria-label='Save']");
    this.saveCheckList = page.locator("xpath=//button[@aria-label='saveChecklist']");
    //this.saveExtraDetails = page.locator("xpath=//button[@aria-label='saveCategoryExtraDetails']");
    this.saveExtraDetails = page.locator("xpath=//button[@data-testid='Save']");
    this.delete = page.locator("xpath=//button[@data-testid='Delete']");
    this.deleteCertificate = page.locator("xpath=//button[@aria-label='Delete']");
    this.cancelDelete = page.locator("xpath=//button[@data-testid='Cancel']");
    this.confirmDelete = page.locator("xpath=//button[@data-testid='Ok']");
    this.deleteReason = page.locator("xpath=//textarea[@aria-label='Reason']");
    this.saveDeleteReason = page.locator("xpath=//div[@class='MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-spacing-xs-2 css-5kwuk3']//button[@data-testid='Save']");

    //Medication Certificate
    // this.confirm = page.locator("xpath=//button[@aria-label='Confirm']");
    // this.limitation = page.locator("xpath=//input[@id='limitation']");
    // this.limitationAppliedDate = page.locator("xpath=//input[@id='limitationApplied']");
    // this.limitationValid = page.locator("xpath=//input[@id='limitationValidTo']");
    // this.consultedCAA =page.locator("xpath=//label[@aria-label='consultedCAA']//span//input[@type='radio']")
    // this.reasonForLimitation=page.locator("xpath=//textarea[@id='reasonForLimitations']")
    // this.btnAddLimitation=page.locator("xpath=//button[@aria-label='Add']")
    // this.linkShowLimitation=page.locator("xpath=//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible MuiDataGrid-row--dynamicHeight']//div/a[text()='Show']")
    // this.linkEditLimitation=page.locator("xpath=//div[@class='MuiDataGrid-row MuiDataGrid-row--lastVisible MuiDataGrid-row--dynamicHeight']//div/a[text()='Edit']")
    // this.closeShowLimitationPopup=page.locator("xpath=//button[@aria-label='remove']//*[name()='svg']")
    // this.deleteLimitationButton=page.locator("//button[@aria-label='remove']//*[name()='svg']")
    
    //Medication Certificate
    this.confirm = page.locator("xpath=//button[@aria-label='confirmMedicalCertificate']");
    this.limitation = page.locator("xpath=//input[@id='limitation']");
    this.limitationAppliedDate = page.locator("xpath=//input[@id='limitationApplied']");
    this.limitationValid = page.locator("xpath=//input[@id='limitationValidTo']");
    this.consultedCAA =page.locator("xpath=//label[@aria-label='consultedCAA']//span//input[@type='radio']")
    this.reasonForLimitation=page.locator("xpath=//textarea[@id='reasonForLimitations']")
    this.btnAddLimitation=page.locator("xpath=//button[@aria-label='addLimitations']")
    this.linkShowLimitation=page.locator("xpath=//a[@aria-label='Show']")
    this.linkEditLimitation=page.locator("xpath=//a[@aria-label='Edit']")
    this.textAreaLimitationReason=page.locator("xpath=//textarea[@id='editLimitationReason']")
    this.removereasonForLimitation=page.locator("xpath=//textarea[@id='removalReason']")
    //this.closeShowLimitationPopup=page.locator("xpath=//button[@aria-label='remove']//*[name()='svg']")
    this.medicalCertificateNotes=page.locator("xpath=//textarea[@data-testid='Notes']")
    
    this.closeShowLimitationPopup=page.getByRole('button', { name: 'cancelIcon' })
    this.deleteLimitationButton=page.locator("//button[@aria-label='remove']//*[name()='svg']")
    this.btnSaveEditedMcCertificate=page.locator("xpath=//button[@aria-label='saveLimitationForm']")
    this.reasonForDeletion=page.locator("xpath=//textarea[@aria-label='Reason for Deletion']")
    this.saveRemovedLimitation=page.locator("xpath=//button[@aria-label='saveRemoveLimitation']")
    this.btnSaveReasonforDeletion=page.locator("xpath=//button[@data-testid='Delete']")
    this.editMCNotes=page.locator("xpath=//textarea[@aria-label='medicalCertificateNotes']")
    this.SaveEditedLimitation=page.locator("xpath=//button[@aria-label='saveLimitation']")
    this.showRemovedReasonlink=page.locator("xpath=//div[@data-field='patmcsnLimitationRemovedReason']//a[@class='MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineHover css-1uoks6u'][normalize-space()='Show']")
    this.mcClassReason=page.locator("xpath=//textarea[@id='fitnessReasonNote']")

    this.txtareaAMEDeclaration=page.locator("xpath=//textarea[@id='ameDeclaration']")
     this.btnAcknowledgeDeclaration=page.locator("xpath=//button[@aria-label='Acknowledge Declaration']")
    
 //Examination
    this.dropdownOutcome=page.locator("xpath=//input[@name='outcome']")
     this.textareaNotes=page.locator("xpath=//textarea[@name='notes']")


    //Recommendations
    this.reviewDate = page.locator("xpath=//input[@id='Review Date']");

    //Interpretation
    this.interpretationOutcome = page.locator("xpath=//input[@name='interpretationOutcome']");

    //PresentingProblems
    this.estimatedDate = page.locator("xpath=//input[@name='estimatedDate']");
    this.problemStatus = page.locator("xpath=//input[@name='status']")
    this.problemOnset = page.locator("xpath=//input[@name='onset']")
    this.problemSeverity = page.locator("xpath=//input[@name='severity']")
    this.onsetDate = page.locator("xpath=//input[@name='onsetDate']")
    this.problemSeverity = page.locator("xpath=//input[@name='severity']")
    this.problemRating = page.locator("xpath=//input[@name='rating']")
    this.problemNotes=page.locator("xpath=//textarea[@data-testid='Notes']")


         //Ed popup icons
         this.uploadFile= page.locator("xpath=//button[@aria-label='Upload File']")
         this.addedDocument= page.locator("xpath=//button[@aria-label='Added Documents']")
         this.addToTask= page.locator("xpath=//button[@aria-label='Add To Task']")
         this.addToWorklist= page.locator("xpath=//button[@aria-label='Add To Worklist']")
         this.addPathway= page.locator("xpath=//button[@aria-label='Add Pathway']")
         this.link= page.locator("xpath=//button[@aria-label='Link']")
         this.closePopup= page.locator("xpath=//button[@aria-label='cancelIcon']")


        //Patient Scan
        this.scanType = page.locator("xpath=//input[@name='type']")
        this.scanDate = page.locator("xpath=//input[@name='scanDate']")
        this.scanArea = page.locator("xpath=//input[@name='scanArea']")
        this.bmdScore = page.locator("xpath=//input[@name='bMDScore']")
        this.tScore = page.locator("xpath=//input[@name='tScore']")
        this.zScore = page.locator("xpath=//input[@name='zScore']")
        this.machineName = page.locator("xpath=//input[@name='machineName']")
        this.scanNotes=page.locator("xpath=//textarea[@name='notes']")

        //Investigations
        this.invStatus= page.locator("xpath=//input[@name='status']")
        this.invOutstanding= page.locator("xpath=//input[@name='outstandingInvestigations']")
        this.invReason = page.locator("xpath=//input[@name='reason']")
        this.invResult = page.locator("xpath=//input[@name='results']")
        this.invOutcome = page.locator("xpath=//input[@name='outcome']")
        this.invCritical = page.locator("xpath=//input[@name='critical']")
        this.invLinkToDiagnosis = page.locator("xpath=//input[@name='linkToDiagnosis']")
        this.invDateOfUpload = page.locator("xpath=//input[@name='dateOfUpload']")
        this.invPatCurrentLocation = page.locator("xpath=//input[@name='patientCurrentLocation']")
        this.invCompletedDate = page.locator("xpath=//input[@name='completedDate']")
        this.invReviewDate = page.locator("xpath=//input[@name='reviewDate']")
        this.invPriority = page.locator("xpath=//input[@name='priority']")
        this.invRequestedBy = page.locator("xpath=//input[@name='requestedBy']")
        this.invSendTo = page.locator("xpath=//input[@name='sendTo']")
        this.invExtLocation = page.locator("xpath=//input[@name='externalLocation']")
        this.invCheckImagingRequest = page.locator("xpath=//span[@data-testid='For Imaging Request']//input[@value='false']")
        this.invUncheckImagingRequest = page.locator("xpath=//span[@data-testid='For Imaging Request']//input[@value='true']")
        this.invCheckLabRequest = page.locator("xpath=//span[@data-testid='For Lab Request']//input[@value='false']")
        this.invUncheckLabRequest = page.locator("xpath=//span[@data-testid='For Lab Request']//input[@value='true']")
        this.invCheckShareOnPortal = page.locator("xpath=//span[@data-testid='Share on Portal']//input[@value='false']")
        this.invUncheckShareOnPortal = page.locator("xpath=//span[@data-testid='Share on Portal']//input[@value='true']")
        this.invNotes = page.locator("xpath=//textarea[@name='notes']")
        this.invShowSubtest = page.locator("xpath=//div[contains(text(),'Show Sub-Tests')]")
        this.invCratineValue = page.locator("xpath=//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth Mui-focused MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd css-drv5b2']//input[@id='valueundefinedsubTest']")
        this.invCreatineTarget = page.locator("xpath=//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth Mui-focused MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd css-drv5b2']//input[@id='targetnullsubTest']")
        this.invUreaValue = page.locator("xpath=//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd css-drv5b2']//input[@name='ureaicvValue']")
        this.invUreaTarget = page.locator("xpath=//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd css-drv5b2']//input[@id='targetnullsubTest']")
        this.invSave = page.locator("xpath=//div[contains(text(),'Save')]")
        this.invDelete = page.locator("xpath=//div[contains(text(),'Delete')]")
        this.invRequestedBy = page.locator("xpath=//input[@name='requestedBy']")
        this.invLinks= page.locator("xpath=//button[@aria-label='Links']")
        this.invLabRequestLink = page.locator("xpath=//li[@aria-label='Lab Requests']")
        this.invImagingRequestLink = page.locator("xpath=//li[@aria-label='Imaging Requests']")
        this.invAddLabRequestCheckbox= page.locator("xpath=//input[@type='checkbox']")
        this.invAddCreateLabRequest= page.locator("xpath=//button[@aria-label='Create Lab Request']")
        this.invSelectCheckbox= page.locator("xpath=//span[@data-testid='hideLabel']//input[@type='checkbox']")
        this.invCollectSample= page.locator("xpath=//div[contains(text(),'Collect Sample')]")
        this.invSendSample= page.locator("xpath=//button[@aria-label='Send Sample']")
        this.createImgRequest  = page.locator("xpath=//div[contains(text(),'Create Imaging Request')]")


        //Overview
       // this.addClinicalItem = page.locator("xpath=//button[@aria-label='Add']")
       this.overviewNotes=page.locator("xpath=//textarea[@id='NotesOverview']")

    //Medication
    this.dose = page.locator("xpath=//input[@name='dose']");
    this.form=page.locator("xpath=//input[@data-testid='Form']")
    this.Route = page.locator("xpath=//input[@name='route']");
    this.days = page.locator("xpath=//input[@name='duration']");
    this.site = page.locator("xpath=//input[@name='site']");
    this.prescribeBy = page.locator("xpath=//input[@name='prescribedBy']");
    this.startDate = page.locator("xpath=//input[@name='startDate']");
    this.reviewDate = page.locator("xpath=//input[@name='reviewDate']");
    this.stopDate = page.locator("xpath=//input[@name='stopDate']");
    this.sideEffect = page.locator("xpath=//input[@name='sideEffect']");
    this.medicationStatus = page.locator("xpath=//input[@name='status']");
    this.indication = page.locator("xpath=//input[@name='indication']");
    this.stopReason = page.locator("xpath=//input[@name='stoppedReason']");
    this.PGDPSD = page.locator("xpath=//input[@name='pGDPSD']");
    this.medicationGradeForAdministrator = page.locator("xpath=//input[@name='userGradesThatCanAdministatorMedicationMAED']");
    this.maxReffills = page.locator("xpath=//input[@name='maxRefills']");
    this.quantity = page.locator("xpath=//input[@name='quantity']");
    this.unit = page.locator("xpath=//input[@name='unit']");
    this.units = page.locator("xpath=//input[@name='units']")
    this.currentLocation = page.locator("xpath=//input[@name='currentLocation']");
    this.linkToDiagnosis = page.locator("xpath=//input[@name='linkToDiagnosis']");
    this.adherent = page.locator("xpath=//input[@name='adherent']");
    this.endoserment = page.locator("xpath=//input[@name='endorsement']");
    this.forCondition = page.locator("xpath=//input[@name='forCondition']");
    this.priceCheckQuantity = page.locator("xpath=//input[@name='priceCheckQuantity']");
    this.totalCost = page.locator("xpath=//input[@id='Total Cost']");
    this.medicationNotes = page.locator("xpath=//textarea[@name='notes']");
    
    this.MC1Notes=page.getByTestId('Notes')
    this.MCnotes = page.locator("xpath=//textarea[@data-testid='Notes']")
    this.ClincalNotes= page.locator("xpath=//textarea[@name='notes']")
    //this.notes = page.locator("xpath=//textarea[@aria-label='Notes']");

    //Medication Checkboxes
    this.prescribeAndSupply = page.locator("xpath=//span[@data-testid='Prescription and supply']");
    this.supply = page.locator("xpath=//span[@data-testid='Supply']");
    this.suitableForDelivery = page.locator("xpath=//span[@data-testid='Suitable for Home Delivery']");
    this.addToPrescription = page.locator("xpath=//span[@data-testid='Add to Prescription']");
    this.setAsDefault = page.locator("xpath=//span[@data-testid='Set as Default']");
    this.repeatable = page.locator("xpath=//span[@data-testid='Repeatable']");
    this.addToFavourite = page.locator("xpath=//span[@data-testid='Add to favourites']");
    this.privateRecord = page.locator("xpath=//span[@data-testid='Private Record']");
    this.addToOrderSet = page.locator("xpath=//span[@data-testid='Add to order set']");
    this.saveCategoryExtraDetails = page.locator("xpath=//button[@aria-label='saveCategoryExtraDetails']");
    this.saveCustomizableViewbutton=page.locator("xpath=//button[@aria-label='saveExtraDetails']")
 

  //Patient Alerts
  this.dropdownAlertDaysSelected= this.page.locator("xpath=//input[@id='alertsDaysSelected']")
  this.alertsStartDate=this.page.locator("xpath=//input[@id='alertsStartDate']")
  this.alertsEndDate=this.page.locator("xpath=//input[@id='alertsEndDate']") 
  this.dropdownPriority=this.page.locator("xpath=//input[@id='priority']")
  this.dropdownDisplay=this.page.locator("xpath=//input[@id='display']")
  this.dropdownForUser=this.page.locator("xpath=//input[@id='forUser']")

 
        //Pregnancy
        this.pregGravida= page.locator("xpath=//input[@id='gravida']")
        this.pregFetusNo= page.locator("xpath=//input[@name='noOfFetus']")
        this.pregExpandFirstFetus= page.locator("xpath= //div[contains(text(),'1st Fetus Details')]")
        this.pregExpandSecondFetus= page.locator("xpath=//div[contains(text(),'2nd Fetus Details')]")
        this.pregOutcome= page.locator("xpath=//div[@data-testid='outcome']")
        //input[@data-testid='Birth Place']
        this.pregGestWeek= page.locator("xpath=//input[@data-testid='Gestation Weeks']")
        this.pregGestDays= page.locator("xpath=//input[@data-testid='Gestation Plus Days']")
        this.pregDevliveryMethod= page.locator("xpath=//div[@data-testid='deliveryMethod']")
        this.pregDateOfDelivery= page.locator("xpath=//input[@name='dateOfDelivery']")
        //this.pregTimeOfDelivery= page.locator("xpath=//input[@id=':rre:']")
        this.pregTimeOfDelivery= page.getByPlaceholder('hh:mm')
        this.pregWeight= page.locator("xpath=//input[@data-testid='Weight(kg)']")
        this.pregSex= page.locator("xpath=//div[@data-testid='sex']")
        this.pregBabyName= page.locator("xpath=//input[@data-testid='Baby Name']")
        this.pregBirtPlace= page.locator("xpath=//input[@data-testid='Birth Place']")
        this.pregFeedingMethod= page.locator("xpath=//input[@name='feedingMethod']")
           //label[contains(text(),'No of Fetus')]
        this.pregSocialWorkAssigned= page.locator("xpath=//input[@name='socialWorkerAssigned']")
        this.pregComplications= page.locator("xpath=//input[@name='complications']")
        this.pregNotes= page.locator("xpath=//label[contains(text(),'Notes')]")
        this.pregSave= page.locator("xpath=//div[contains(text(),'Save')]")
}

//Riskfactor
async enterRiskFactorNotes(risk_notes)
{
  await this.RfNotes.clear();
  await this.RfNotes.type(risk_notes);
}
//Lifestyle
async enterLifestyleNotes(life_notes)
{
  await this.lifeStyleNotes.type(life_notes);
}

//Social
async enterSocialNotes(soci_notes)
{
  await this.socialNotes.clear()
  await this.socialNotes.type(soci_notes);
}


  //////////////////////////////////TEXTBOX FILLERS//////////////////////////////////////////

  //Patient Alerts
  // async selectAlertsDaysDropdown(eli_text) {
  //   await selectFromDropdown(this.page, this.dropdownAlertDaysSelected, eli_text);
  // }

  async selectAlertsDaysDropdown()
    {
        await this.dropdownAlertDaysSelected.click()
        await this.page.locator("xpath=//li[@id='alertsDaysSelected-option-9']").click()
    }

    //Alert Priority
    async selectAnyPriorityDropdown(Priority_Any_Priority)
    {       
        await selectFromDropdown(this.page, this.dropdownPriority, Priority_Any_Priority);
    }

    async selectAnyHighDropdown(Priority_Very_High)
    {       
        await selectFromDropdown(this.page, this.dropdownPriority, Priority_Very_High);
    }

    //Alerts Display
    async selectAllDisplayDropdown(Display_All)
    {       
        await selectFromDropdown(this.page, this.dropdownDisplay, Display_All);
    }
    async selectMyAlertsDisplayDropdown(Display_My_Alerts)
    {       
        await selectFromDropdown(this.page, this.dropdownDisplay, Display_My_Alerts);
    }
    

  async enterAlertsStartdate(Alert_Start_Date)
  {
    await typeText(this.page, this.alertsStartDate, Alert_Start_Date);
  } 

  async enterAlertsEnddate(Alert_End_Date)
  {
    await typeText(this.page, this.alertsEndDate, Alert_End_Date);
  } 

  async selectForUser(For_User)
  {    
    await selectFromDropdown(this.page, this.dropdownForUser, For_User);
  }


  //Fill Outcome Date
  async enterDateOfOutcome(outc_date) {
    await typeText(this.page, this.dateOfOutcome, outc_date);
  }

  //Fill Ouutome Notes
  // async enterClinicalItemNotes(diag_notes) {
  //   //await typeText(this.page, this.diagnosisNotes, diag_notes);
  //   await this.diagnosisNotes.type(diag_notes)
  // }
  async enterMedicalCertificateNotes(patmce_notes)
  {
    //await this.medicalCertificateNotes.type(patmce_notes)
    await typeText(this.page, this.medicalCertificateNotes, patmce_notes);
  }

  async enterDiagnosisNotes(diag_notes) {
   // await this.diagnosisNotes.type(diag_notes)
    await this.diagnosisNotes.type(diag_notes)
  }

  async enterInterpretationNotes(inte_notes) {
    // await this.diagnosisNotes.type(diag_notes)
     await this.interpretationNotes.type(inte_notes)
   }

  async enterDeleteReason(reason) {
    await typeText(this.page, this.deleteReason, reason);
  }

  /////////////////////////////////BUTTON CLICKS///////////////////////////////////////////////

  //Click on Collapsable button on Extra Details popup
  async clickOnClincialItemCollapsable() {
    await clickElement(this.page, this.clinicalItemCollapsable);
  }

  async clickOnClincialItemCollapsableAllergy1() {
    await clickElement(this.page, this.clinicalItemCollapsableAllergy1);
  }

  async clickOnClincialItemCollapsableAllergy2() {
    await clickElement(this.page, this.clinicalItemCollapsableAllergy2);
  }

  async clickOnclinicalSubcategoryAllergy() {
    await this.clinicalSubcategoryAllergy.click();
    await this.page.getByRole("option", { name: "Allergy Subsection" }).click();
  }

  async clickOnSpecificAllergyName() {
    await clickElement(this.page, this.buttonSpecificAllergyName);
  }

  async enterAllergyStartDate(date) {
    await typeText(this.page, this.allergyStartDate, date);
  }

  async enterAllergyEndDate(date) {
    await typeText(this.page, this.allergyEndDate, date);
  }
  async selectReaction(eli_text) {
    await selectFromDropdown(this.page, this.allergyReaction, eli_text);
  }
  async selectReactionSevirity(alrg_reaction_severity) {
    await selectFromDropdown(this.page,this.ReactionSeverity,alrg_reaction_severity);
  }
  async enterallergyTextArea(alrg_notes) {
    await typeText(this.page, this.allergyTextArea, alrg_notes);
  }

  ///////////Procedure Functions////////////////////

  async enterDateOfProcedure(date) {
    await typeText(this.page, this.dateOfProcedure, date);
  }

  async selectProcedureType(proc_type) {
    await selectFromDropdown(this.page, this.procedureType, proc_type);
  }

  async selectProcedureSite(proc_site) {
    await selectFromDropdown(this.page, this.procedureSite, proc_site);
  }

  async selectProcedureLevel(proc_procedure_level) {
    await selectFromDropdown(this.page,this.procedureLevel,proc_procedure_level);
  }

  async selectProcedureStatus(pacr_status) 
  {
    await selectFromDropdown(this.page, this.procedureStatus, pacr_status);
  }

  async selectProcedureOutcome(proc_outcome) {
    await selectFromDropdown(this.page, this.procedureOutcome, proc_outcome);
  }

  async selectandAddPerformedByGP(HPName) {
    this.itemName = clinicalItemName;
    await selectFromSearchResults(this.page,this.performedByHP,HPName,this.addClinicalItem);
  }

  async selectLinkToClinicLocation(HPName) {
    this.itemName = clinicalItemName;
    await selectFromSearchResults(this.page,this.performedByHP,HPName,this.addClinicalItem);
  }

  async selectProcedureCheckboxSetAsDefault() {
    await this.procedureCheckBoxSetAsDefault.click();
  }

  async selectProcedureCheckboxPrivateRecord() {
    await this.procedureCheckboxPrivateRecord.click();
  }
  async enterProcedureNotes(proc_notes)
  {
    await this.procedureTextareaNotes.clear()
    await this.procedureTextareaNotes.type(proc_notes)
  }

  //Click on Save Medication button on Extra Details popup
  async clickOnSave() {
    await clickElement(this.page, this.save);
  }

  async clickOnSaveCheckList() {
    await clickElement(this.page, this.saveCheckList);
  }

  async clickOnSaveExtraDetails() {
    await clickElement(this.page, this.saveExtraDetails);
  }

  async clickOnDelete() {
    await clickElement(this.page, this.delete);
  }

  async clickOnDeleteCertificate() {
    await clickElement(this.page, this.deleteCertificate);
  }

  async clickOnCancelDelete() {
    await clickElement(this.page, this.cancelDelete);
  }

  async clickOnConfirmDelete() {
    await clickElement(this.page, this.confirmDelete);
  }

  async clickOnSaveDeleteReason() {
    await clickElement(this.page, this.saveDeleteReason);
  }

   //Care Plan


   async searchAndSelectNursingDiagnosis(carpd_que_name) {
    await selectFromSearchResults(this.page,this.CarePlanNursingDiagnosis,carpd_que_name);
  }

  async EntersearchNursingDiagnosis0(carpd_notes_nursingDiagnosis)
  {
    await typeText(this.page, this.searchNursingDiagnosis0,carpd_notes_nursingDiagnosis)
  }

  async searchAndSelectSearchGoals(carpd_eli_text_goals) {
    await selectFromSearchResults(this.page,this.SearchGoals,carpd_eli_text_goals);
  }
  

  async EntersearchGoals0(carpd_notes_goals) {
    await typeText(this.page, this.searchGoals0,carpd_notes_goals)
    //await selectFromSearchResults(this.page,this.searchGoals0,carpd_notes_goals);
  }

  async EntersearchNursingDiagnosis0(carpd_notes_nursingDiagnosis)
  {
    await typeText(this.page, this.searchNursingDiagnosis0,carpd_notes_nursingDiagnosis)
  }

  async searchAndSelectInterventions(carpd_eli_text_interventions) {
    await selectFromSearchResults(this.page,this.Interventions,carpd_eli_text_interventions);
  }

  async EnterInterventions(carpd_notes_interventions) {
    //await selectFromSearchResults(this.page,this.searchInterventions0,carpd_notes_interventions);
    await typeText(this.page, this.searchInterventions0,carpd_notes_interventions)
  }


//searchEvaluations
async searchAndSelectsearchEvaluations(carpd_eli_text_evaluations) {
  await selectFromSearchResults(this.page,this.searchEvaluations,carpd_eli_text_evaluations);
}

async EnterEvaluations(carpd_notes_evaluations) {
 // await selectFromSearchResults(this.page,this.searchEvaluations0,carpd_notes_evaluations);
 await typeText(this.page, this.searchEvaluations0,carpd_notes_evaluations)
}

async EnterUpdateNotes(carpd_type_notes) {
 // await selectFromSearchResults(this.page,this.updatedNotesForExtraDetails,carpd_type_notes);
 await typeText(this.page, this.updatedNotesForExtraDetails,carpd_type_notes)
}


  ///////////////////////////////CHOOSE STATIC DROPDOWN ITEM//////////////////////////////////

  async selectClinicalItemSubcategory(subcategory) {
    await selectFromDropdown(this.page,this.clinicalItemSubcategory,subcategory);
  }

  async selectFrequency(outc_frequency) {
    await selectFromDropdown(this.page, this.frequency, outc_frequency);
  }

  async enterOnSetDate(date) {
    await typeText(this.page, this.onSetDate, date);
  }

  //Presenting Problems

  async clickOnestimatedDate() {
    await clickElement(this.page, this.estimatedDate);
  }
  async clickOnactualDate(){
    await clickElement(this.page, this.actualDate)
  }

  async selectProblemStatus(prp_status) {
    await selectFromDropdown(this.page, this.problemStatus, prp_status);
  }
  async selectProblemOnset(prp_onset) {
    await selectFromDropdown(this.page, this.problemOnset, prp_onset);
  }
  async selectProblemSeverity(prp_severity) {
    await selectFromDropdown(this.page, this.problemSeverity, prp_severity);
  }

  async enterOnsetDate(prp_date_of_onset)
    {
        await typeText(this.page, this.onsetDate, prp_date_of_onset);
    }
    async enterRating(prp_rating)
    {
        await typeText(this.page, this.problemRating,prp_rating );
    }
    async enterProblemNotes(prp_notes)
    {
      await this.problemNotes.type(prp_notes)
    }

    async clickPopup()
    {
      await this.closePopup.click()
    }

    async clickOnEdPopup(){
      await this.uploadFile.click()
      await this.closePopup.click()
      await this.addedDocument.click()
      await this.closePopup.click()
      await this.addToTask.click()
      await this.closePopup.click()
      await this.addToWorklist.click()
      await this.closePopup.click()
      await this.addPathway.click()
      await this.closePopup.click()
      await this.link.click()
      await this.closePopup.click()

  }
  
  //Overview

  async enterOverviewNotes(over_notes)
  {
    await this.overviewNotes.clear()
    await this.overviewNotes.type(over_notes)
  }
  async selectandAddOverview() {
    //this.itemName=clinicalItemName;
    await clickElement(this.page, this.addClinicalItem)
   // await this.addClinicalItem.click() 
}
 

    //Patient Scans

    async selectScanType(type)
    {
        await selectFromDropdown(this.page, this.scanType, type);
    }

    async selectScanArea(area)
    {
        await selectFromDropdown(this.page, this.scanArea, area );
    }

    async enterScanDate(date) {
      await typeText(this.page, this.scanDate, date);
  }
  async enterBmdScore(BMD) {
    await typeText(this.page, this.bmdScore,BMD );
}

async enterTScore(T) {
    await typeText(this.page, this.tScore,T );
}
async enterZScore(Z) {
    await typeText(this.page, this.zScore, Z);
}
async selectMachineName(mname)
{
    await selectFromDropdown(this.page, this.machineName, mname );
}
async enterPatientScanNotes(pascn_notes)
{
  await this.scanNotes.clear()
  await this.scanNotes.type(pascn_notes);
}
  //Medical Certificate
  // async clickOnConfirm() {
  //   await clickElement(this.page, this.confirm);
  // }

  // async selectLimitations(Limitation) {
  //   await selectFromDropdown(this.page, this.limitation, Limitation);
  // }

  // async enterLimitationAppliedDate(Date) {
  //   await typeText(this.page, this.limitationAppliedDate, Date);
  // }

  // async enterLimitationValidToDate(Date) {
  //   await typeText(this.page, this.limitationValid, Date);
  // }

  // async clickOnConsultedCAA()
  // {
  //   await clickElement(this.page, this.consultedCAA)
  // }
  // async enterReasonForLimitation(reasonForLimitation)
  // {
  //   await typeText(this.page, this.reasonForLimitation,reasonForLimitation)
  // }
  // async clickOnAddLimitationButton()
  // {
  //   await clickElement(this.page, this.btnAddLimitation)
  // }
  // async clickOnShowLimitationLink()
  // {
  //   await clickElement(this.page,this.linkShowLimitation)
  // }
  // async closeOnClosePopupButton()
  // {
  //   await clickElement(this.page,this.closeShowLimitationPopup)
  // }
  // async clickOnEditLimitationLink()
  // {
  //   await clickElement(this.page,this.linkEditLimitation)
  // }
  //Medical Certificate
  async enterReasonForDeletion(deletionReason)
  {
    await typeText(this.page, this.reasonForDeletion, deletionReason)
  }

  async clickOnConfirm() {
    await clickElement(this.page, this.confirm);
  }

  async selectLimitations(Limitation) {
    await selectFromDropdown(this.page, this.limitation, Limitation);
  }

  async enterLimitationAppliedDate(Date) {
    await typeText(this.page, this.limitationAppliedDate, Date);
  }

  async enterLimitationValidToDate(Date) {
    await typeText(this.page, this.limitationValid, Date);
  }

  async clickOnConsultedCAA()
  {
    await clickElement(this.page, this.consultedCAA)
  }
  async enterReasonForLimitation(reasonForLimitation)
  {
    await typeText(this.page, this.reasonForLimitation,reasonForLimitation)
  }
  async enterMedicalCertificateNotes(notes)
  {
    await typeText(this.page, this.notes, notes )
  }
  async enterMedicalCertificateNotes1(notes)
  {
    await typeText(this.page, this.MC1Notes, notes )
  }
  async clickOnAddLimitationButton()
  {
    await clickElement(this.page, this.btnAddLimitation)
  }
  async clickOnShowLimitationLink()
  {
    await clickElement(this.page,this.linkShowLimitation)
  }
  async closeOnClosePopupButton()
  {
    await clickElement(this.page,this.closeShowLimitationPopup)
  }
  async clickOnEditLimitationLink()
  {
    await clickElement(this.page,this.linkEditLimitation)
  }
  async enterLimitationReason(EditReason)
  {
    await typeText(this.page, this.textAreaLimitationReason,EditReason)
  }
  async enterLimicationRemoveReason(removalReason)
  {
    await typeText(this.page, this.removereasonForLimitation, removalReason)
  }
  async clickOnSaveDeleteForReason()
  {
    await clickElement(this.page, this.btnSaveReasonforDeletion)
  }
  async clickOnSaveEditedLimitation()
  {
    await clickElement(this.page, this.SaveEditedLimitation)
  }
  async deleteLimitation()
  {
    await clickElement(this.page, this.deleteLimitationButton)
  }
  async clickOnSaveMedicalCertificate()
  {
    await clickElement(this.page, this.btnSaveEditedMcCertificate)
  }
  async clickOnSaveRemovedLimitation()
  {
    await clickElement(this.page, this.saveRemovedLimitation)
  }
  async clickOnshowRemovedReasonlink()
  {
    await clickElement(this.page, this.showRemovedReasonlink)
  }
 
  async enterMedicalCertificateReason(reason)
  {
    await typeText(this.page, this.mcClassReason,reason)
  }

  async enterAMEDeclaration(declaration)
  {
    await typeText(this.page, this.txtareaAMEDeclaration, declaration)
  }

  async clickOnbtnAcknowledgeDeclaration()
  {
    await clickElement(this.page, this.btnAcknowledgeDeclaration)
  }

  async enterEditedMCNotes(editNotes)
  {
    await typeText(this.page, this.editMCNotes, editNotes)
  }

  async clickOnSaveEditedMedicalCertificate()
  {
    await clickElement(this.page, this.btnSaveEditedMcCertificate)
  }




  //Medication Extra Details
  async enterOnDose(dose) {
    await this.dose.clear();
    await typeText(this.page, this.dose, dose);
  }

  async selectRoute(Route) {
    await selectFromDropdown(this.page, this.Route, Route);
  }
  async enterForm(form)
  {
   await typeText(this.page, this.form, form);
  }

  async enterDays(days) {
    await typeText(this.page, this.days, days);
  }

  async selectSite(site) {
    await selectFromDropdown(this.page, this.site, site);
  }

  async selectPrescribeBy(prescribeBy) {
    await selectFromDropdown(this.page, this.prescribeBy, prescribeBy);
  }

  async enterStartDate(startDate) {
    await typeText(this.page, this.startDate, startDate);
  }
  async enterReviewDate(reviewDate) {
    await typeText(this.page, this.reviewDate, reviewDate);
  }

  async enterStopDate(medi_stop_date) {
    await typeText(this.page, this.stopDate, medi_stop_date);
  }

  async selectSideEffects(mse_text) {
    await selectFromDropdown(this.page, this.sideEffect, mse_text);
  }
  async selectStatus(pacr_status) {
    await selectFromDropdown(this.page, this.medicationStatus, pacr_status);
  }
  async selectIndication(meded_value) {
    await selectFromDropdown(this.page, this.indication, meded_value);
  }
  async selectStoppedReason(medi_stopped_reason_eli_text) {
    await selectFromDropdown(
      this.page,
      this.stopReason,
      medi_stopped_reason_eli_text
    );
  }
  async selectPGDPSD(meded_value_PGD) {
    await selectFromDropdown(this.page, this.PGDPSD, meded_value_PGD);
  }
  async enterMedicationGradeForAdministrator(medicationGradeForAdministrator) {
    await typeText(
      this.page,
      this.medicationGradeForAdministrator,
      medicationGradeForAdministrator
    );
  }
  async selectMaxReffills(maxReffills) {
    await selectFromDropdown(this.page, this.maxReffills, maxReffills);
  }
  async selectQuantity(meded_value_Quantity) {
    await this.quantity.clear();
    await typeText(this.page, this.quantity, meded_value_Quantity);
  }
  async enterUnit(unit) {
     await selectFromDropdown(this.page, this.units,'Days');
  }
  //  async enterUnit(unit) {
  //    await typeText(this.page, this.unit,'Days');
  // }

  async selectCurrentLocation(currentLocation) {
    await selectFromDropdown(this.page, this.currentLocation, currentLocation);
  }
  async enterLinkTiDiagnosis(pacr_que_name_Diagnosis) {
    await selectFromDropdown(this.page,this.linkToDiagnosis,pacr_que_name_Diagnosis);
  }
  async selectAdherent(meded_value_Adherent) {
    await selectFromDropdown(this.page, this.adherent, meded_value_Adherent);
  }
  async selectEndoserment(paprd_endorsement) {
    await selectFromDropdown(this.page, this.endoserment, paprd_endorsement);
  }

  async enterMedicationNotes(medi_notes)
  {
    await this.medicationNotes.type(medi_notes)
  }
  async selectForCondition(que_display_text) {
    // await this.forCondition.click()
    // await this.forCondition.type(que_display_text)
    // await this.page.getByRole('option', { name: que_display_text }).click()
    await selectFromDropdown(this.page, this.forCondition, que_display_text);

    //await selectFromDropdown(this.page, this.forCondition, que_display_text)
  }
  async enterPriceCheckQuantity(meded_value_Price_check_quantity) {
    await typeText(
      this.page,
      this.priceCheckQuantity,
      meded_value_Price_check_quantity
    );
  }
  async enterNotes(medi_notes) {
    await typeText(this.page, this.notes, medi_notes);
  }

  //Methods for Medication Checkboxes
  async clickOnPrescribeAndSupply() {
    await this.prescribeAndSupply.click();
  }
  async clickOnSupply() {
    await this.supply.click();
  }
  async clickOnSuitableForDelivery() {
    await this.suitableForDelivery.click();
  }
  async clickOnAddToPrescribe() {
    await this.addToPrescription.click();
  }
  async clickOnSetAsDefault() {
    await this.setAsDefault.click();
  }
  async clickOnRepeatable() {
    await this.repeatable.click();
  }
  async clickOPrivateRecord() {
    await this.privateRecord.click();
  }

  async enterDiagnosedDate(date) {
    await typeText(this.page, this.diagnosedDate, date);
  }
  async enterDiagnosis1stSeenDate(date) {
    await typeText(this.page, this.diagnosis1stSeenDate, date);
  }
  async selectStatus(statusName) {
    await selectFromDropdown(this.page, this.status, statusName);
  }

  async selectSeverity(severityName) {
    await selectFromDropdown(this.page, this.severity, severityName);
  }
  async selectActivity(activityName) {
    await selectFromDropdown(this.page, this.activity, activityName);
  }
  async selectCountryOfDiagnosis(countryName) {
    await selectFromDropdown(this.page, this.countryOfDiagnosis, countryName);
  }

  async searchAndSelectUnderlayingCause(UnderlyingName) {
    await selectFromSearchResults(this.page,this.underlayingCause,UnderlyingName);
  }

  async searchAndSelectComplicationsAndDiagnosis(complicationsAndDagnosisName) {
    await selectFromSearchResults(
      this.page,
      this.complicationAndDiagnosis,
      complicationsAndDagnosisName
    );
  }
  async searchAndSelectExternalCause(externalCauseName) {
    await selectFromSearchResults(
      this.page,
      this.externalCause,
      externalCauseName
    );
  }
  async searchAndSelectLinktoProcedure(linkToProcedureName) {
    await selectFromSearchResults(
      this.page,
      this.linkToProcedure,
      linkToProcedureName
    );
  }

  //Recommendations
  async enterReviewDate(date) {
    await typeText(this.page, this.reviewDate, date);
  }

  //Interpretation
  async enterInterpretationOutcome(inte_outcome_eli_text) {
    await selectFromDropdown(
      this.page,
      this.interpretationOutcome,
      inte_outcome_eli_text
    );
  }

  //Investigation
  async selectInvStatus(status) {
    await selectFromDropdown(this.page,this.invStatus,status);
  }

  async selectInvOutstanding(outstanding)
  {
    await selectFromDropdown(this.page,this.invOutstanding,outstanding);
  }

  async selectInvReason(reason)
  {
    await selectFromDropdown(this.page,this.invReason,reason)
  }

  async enterInvResult(result)
  {
    await typeText(this.page, this.invResult, result);
  }

  async selectInvOutcome(outcome)
  {
    await selectFromDropdown(this.page,this.invOutcome,outcome)
  }

  async selectInvCritical(critical)
  {
    await selectFromDropdown(this.page,this.invCritical, critical)
  }
 
  async selectInvDiagnosisLink(diagnosis)
  {
    await selectFromDropdown(this.page,this.invLinkToDiagnosis, diagnosis)
  }

  async enterInvDateOfUpload(date)
  {
    await typeText(this.page,this.invDateOfUpload, date)
  }

  async enterInvCompletedDate(dateCompleted)
  {
    await typeText(this.page,this.invCompletedDate, dateCompleted)
  }

  async enterInvReviewDate(dateReview)
  {
    await typeText(this.page,this.invReviewDate, dateReview)
  }

  async selectInvPatLocation(location)
  {
    await selectFromDropdown(this.page,this.invPatCurrentLocation, location)
  }

  async selectInvPriority(priority)
  {
    await selectFromDropdown(this.page,this.invPriority, priority)
  }
  async selectRequestedBy(requested_by)
  {
  
  await selectFromSearchResults(this.page,this.invRequestedBy,requested_by);
  }

  async selectInvSendTo(sendTo)
  {
    await selectFromDropdown(this.page,this.invSendTo, sendTo)
  }

  async selectInvExtLocation(extLocation)
  {
    await selectFromDropdown(this.page,this.invExtLocation, extLocation)
  }

  async enterInvNotes(notes)
  {
    await typeText(this.page, this.invNotes, notes);
  }

  async clickShowSubtest()
  {
    await clickElement(this.page, this.invShowSubtest);
  }
  async enterCreatineValue(value1)
  {
    await typeText(this.page, this.invCratineValue, value1);
  }
  async enterUreaValue(value2)
  {
    await typeText(this.page, this.invUreaValue, value2);
  }

  async enterCreatineTarget(target1)
  {
    await typeText(this.page, this.invCreatineTarget, target1);
  }

  async enterUreaTarget(target2)
  {
    await typeText(this.page, this.invUreaTarget, target2);
  }

  async saveInvestigation()
  {
     await clickElement(this.page, this.invSave)
  }

  async selectForLabRequest()
  {
    await clickElement(this.page, this.invCheckLabRequest)
  }

  async deselectForLabRequest()
  {
    await clickElement(this.page, this.invUncheckLabRequest)
  }

  async selectForImagingRequest()
  {
    await clickElement(this.page, this.invCheckImagingRequest)
  }

  async deselectForImagingRequest()
  {
    await clickElement(this.page, this.invUncheckImagingRequest)
  }

  async selectShareOnPortal()
  {
    await clickElement(this.page, this.invUncheckShareOnPortal)
  }

  async deselectShareOnPortal()
  {
    await clickElement(this.page, this.invUncheckShareOnPortal)
  }
  async clickOnSaveCustomizableButton()
  {
    await clickElement(this.page,this.saveCategoryExtraDetails)
     // this.saveCustomizableViewbutton)
  }

  async selectlinks()
  {
    await clickElement(this.page, this.invLinks)
  }
  
  async ImagingRequestLink()
  {
    await clickElement(this.page,this.invImagingRequestLink)
  }
      
  async LabRequestLink()
  {
    await clickElement(this.page, this.invLabRequestLink)
  }
       async selectLabRequestCheckbox()
  {
    await clickElement(this.page, this.invAddLabRequestCheckbox)
  }
       async selectAddCreateLabRequest()
  {
    await clickElement(this.page, this.invAddCreateLabRequest)
  }
  
     async select()
      {
//div[contains(text(),'Create Imaging Request')]
      }
  async collectSampleCheckbox()
  {
    await clickElement(this.page, this.invSelectCheckbox)
  }
  async selectCollectSample()
  {
    await clickElement(this.page, this.invCollectSample)
  }
  async selectSendSample()
  {
    await clickElement(this.page, this.invSendSample)
  }
  async createImagingRequest()
  {
    await clickElement(this.page, this.createImgRequest)
  }
  async selectRequestedBy(requested_by)
  {
  
  await selectFromSearchResults(this.page,this.invRequestedBy,requested_by);
  }

  //Examination
  async SelectOutcome(exam_outcome)
    {
        await this.dropdownOutcome.click()
        await this.page.getByRole('option', { name: exam_outcome, exact: true }).click()
    }

 async EnterNotes(exam_notes)
    {
        await this.textareaNotes.fill(exam_notes)
    }

}



module.exports = ClinicalExtraDetails;
