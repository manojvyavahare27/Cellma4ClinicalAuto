//Manoj V.

const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql2");
const convertExcelToJson = require("../../../config/global-setupOptimized");

const { test, expect } = require("@playwright/test");
// const connectToDatabase = require("../../../manoj").default;
// const { executeQuery } = require("../../../databaseFunctions"); // Update the path accordingly
// import compareJsons from "../../../compareFileOrJson";

const connectToDatabase = require("../../../manoj").default;
const { executeQuery } = require("../../../databaseWriteFile"); // Update the path accordingly
//import compareJsons from "../../../../../../../Cellma4Automation/compareFileOrJson";
// import compareJsons from "../../../../Cellma4Automation/compareFileOrJson";
import compareJsons from "../../../compareFileOrJson";

import logger from "../../../Pages/BaseClasses/logger";
import LoginPage from "../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../Pages/BaseClasses/Homepage";
import ConfirmExisting from "../../../Pages/PatientDomain/ConfirmExisting";
import ContactHistory from "../../../Pages/ClinicalDomain/PatientSummary/ContactHistory";
import PatientSearch from "../../../Pages/PatientDomain/PatientSearch";
import Environment from "../../../Pages/BaseClasses/Environment";
import Menu from "../../../Pages/BaseClasses/Menu";
import ClinicalSummary from "../../../Pages/ClinicalDomain/PatientSummary/ClinicalSummary";
import ClinicalExtraDetails from "../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";

// import ClinicalSummary from "../../../../Pages/ClinicalDomain/PatientSummary/ClinicalSummary";
// import ClinicalExtraDetails from "../../..//Pages/ClinicalDomain/MedicalCertificateExtraDetails";


import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";
import { toggleDivVisibility } from "../../../UtilFiles/DynamicUtility";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Medical Certificate Excel File", () => {
  test("Extract Medical Certificate Details", async ({}) => {
    const excelFilePath = process.env.EXCEL_FILE_PATH || "./ExcelFiles/MedicalCertificate.xlsx";
    const jsonFilePath = "./TestDataWithJSON/PatientDomain/MedicalCertificate.json";

    console.log("excelFilePath:", excelFilePath);
    console.log("jsonFilePath:", jsonFilePath);
    const conversionSuccess = await convertExcelToJson(excelFilePath, jsonFilePath);
    if (conversionSuccess) {
      // jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
      jsonData = require("../../../TestDataWithJSON/PatientDomain/MedicalCertificate.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } 
    else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("Medical Certificate", () => {
  test("Add Class 2 Medical Certificate", async ({ page }) => {
    if (!jsonData || !jsonData.PatientDetails) {
      throw new Error("JSON data is missing or invalid.");
    }
    let index = 0;
    for (const data of jsonData.PatientDetails) {
      const loginpage = new LoginPage(page);
      const homepage = new Homepage(page);
      const environment = new Environment(page);
      const confirmexisting = new ConfirmExisting(page);
      const contacthistory = new ContactHistory(page);
      const patientsearch = new PatientSearch(page);
      const MedicalCertificate = new ClinicalSummary(page);
      const MCExtraDetails = new ClinicalExtraDetails(page);

      const LimitationTypeTML="TML   Limited period of validity of the medical certificate ";
      const LimitationTypeVML="VML   Valid only with correction for defective distant, intermediate and near vision";
      
      const menu = new Menu(page);
      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await page.waitForTimeout(500)
      await loginpage.clickOnLogin();      
      logger.info("Clicked on Login button successfully");
      await homepage.clickOnSideIconPatient()
      logger.info("Clicked on Patient Icon successfully");
      await patientsearch.clickOnSearchButton();
      logger.info("Clicked on Search button successfully");
      await patientsearch.enterGivenName(data.pat_firstname);
      logger.info("Given Name entered successfully");
      
      await patientsearch.enterFamilyName(data.pat_surname);
      logger.info("Family Name entered successfully");
      //await patientsearch.selectSex(data.pat_sex);
      await patientsearch.selectBornDate(jsonData.PatientDetails[index].pat_dob);
      //await patientsearch.selectBornDate(formattedDate);
      await patientsearch.clickOnSearchButton();
      
      await patientsearch.clickOnSearchPatientLink();
      //await page.pause()//wait 1.5 second     
      await page.waitForTimeout(7000)
      await confirmexisting.clickOnConfirmExistingDetails();   
      
       await page.waitForTimeout(4000);
      const alertPopup = page.locator("xpath=//h2[text()='Alerts']");
      if (await alertPopup.isVisible()) {
         const cancelButton = page.locator("xpath=//button[@aria-label='cancelIcon']");
          await cancelButton.waitFor({ state: 'visible', timeout: 5000 });
          await cancelButton.click();
        }
      await page.waitForTimeout(2000); 
      
       await contacthistory.clickOnShowFilter()
      await contacthistory.selectServiceFilter("General Medicine Automation");
      await contacthistory.selectContactReasonFilter("Assessments");
      await contacthistory.enterContactDate("26/04/2024");
      await contacthistory.selectContactReason("Assessments");
      await contacthistory.selectContactLocation("Cardio Location");
     // await contacthistory.enterContactWith("Dr Sathya");
      await contacthistory.clickOnAddContact();
      await MedicalCertificate.clickOnViewContactItemsMenu();
      await MedicalCertificate.clickOnPinContactItemsMenu();
      await MedicalCertificate.selectCategoryFromList("Medical Certificates");
     await page.pause()
      //Removed Existing Certificate
      await page.waitForTimeout(1000)
      //await page.pause() 
      if(await MedicalCertificate.checkItemOnMedicationCertificateHistoryTable("Class 1 Pilots"))
      {      
      await MCExtraDetails.clickOnDeleteCertificate()           
      await page.waitForTimeout(1000)
      await MCExtraDetails.clickOnConfirmDelete();

      
      await page.waitForTimeout(1000)
      await MCExtraDetails.enterReasonForDeletion("Added Deletion Reason")   
      await page.waitForTimeout(1000)  
      await MCExtraDetails.clickOnSaveDeleteForReason()
      await page.waitForTimeout(500)
      await expect(page.getByText("Medical certificate deleted successfully")).toHaveText("Medical certificate deleted successfully");
      await page.waitForTimeout(1000)
    }        
      await page.waitForTimeout(1000)
      await MedicalCertificate.ClickOnAddMedicalCertificateButton()
      await page.waitForTimeout(1000)
      //await page.pause()
     // await MedicalCertificate.selectClass("Class 1 Pilots")
      await MedicalCertificate.selectClass(jsonData.MedicalCertificate[index].patmce_class)
      await page.waitForTimeout(1000)
      await MedicalCertificate.selectLicCategory(jsonData.MedicalCertificate[index].patmce_sub_class)
      //await MedicalCertificate.selectLicCategory("Other Commercial Operations")
      await page.waitForTimeout(1000)
     
     //Add New Certificate
      await MedicalCertificate.selectValidityCategory("Set Validity Dates")
      await page.waitForTimeout(1000)      
      await MCExtraDetails.clickOnSave(); 
      await page.waitForTimeout(2000)
      //await page.pause()
      //await MCExtraDetails.enterMedicalCertificateNotes(jsonData.MedicalCertificate[index].patmce_notes);
      await MCExtraDetails.enterMedicalCertificateNotes1("Added for testing");
      await MCExtraDetails.clickOnConfirm()
      await page.waitForTimeout(1000)
      await expect(page.getByText("Medical certificate dates are successfully saved")).toHaveText("Medical certificate dates are successfully saved");     
      //await page.pause()
//////// Get Medical certificate details/////////
var sqlQuery =  "SELECT * FROM patient_medical_certificates order by patmce_id desc limit 1;";
console.log(sqlQuery)

var sqlFilePath = "SQLResults/MedicalCertificate/MedicalCertificateDetails.json";
var results = await executeQuery(sqlQuery, sqlFilePath);
//console.log("\n Patient Details stored into the database: \n", results);
const patmce_id = results[0].patmce_id;
const patmce_pat_id = results[0].patmce_pat_id;
// const patEgpId=results[0].pat_egp_Id
console.log(results);

console.log("Patient id is:"+patmce_id);
console.log("Patient Address id is:"+patmce_pat_id);
// console.log("Patient EGP id is:"+patEgpId );   

var match = await compareJsons(sqlFilePath, null, jsonData.MedicalCertificate[index]);
if (match) {
console.log("\n certificate Details Comparision: Parameters from both JSON files match!\n");
} else {
console.log("\n certificate Details Comparision: Parameters from both JSON files do not match!\n");
}
await page.waitForTimeout(1000)
       //Add Limitations
       //await page.pause()
      await MCExtraDetails.selectLimitations("TML   Limited period of validity of the medical certificate ")
     
     //await MCExtraDetails.selectLimitations("OML   Valid only as or with qualified co-pilot (Applies only to Class 1 Privileges) ")
      const inputValue = await page.locator("xpath=//input[@id='limitation']").inputValue();
      await page.waitForTimeout(1000)     
      if(LimitationTypeTML === inputValue)
      {
        // await MCExtraDetails.enterLimitationAppliedDate("01/01/2025")
        // await MCExtraDetails.enterLimitationValidToDate("30/01/2025")
        
        //await MCExtraDetails.enterLimitationAppliedDate((jsonData.Limitation[index].patmcsn_from)toString())
        await MCExtraDetails.enterLimitationAppliedDate(jsonData.Limitation[index].patmcsn_from.toString());

        await MCExtraDetails.enterLimitationValidToDate(jsonData.Limitation[index].patmcsn_to.toString())
        await MCExtraDetails.clickOnConsultedCAA()
        await MCExtraDetails.enterReasonForLimitation(jsonData.Limitation[index].patmcsn_reason)
        await page.waitForTimeout(1000)
        await MCExtraDetails.clickOnAddLimitationButton()
        await page.waitForTimeout(1000)
        await expect(page.getByText('Limitation added successfully.')).toHaveText('Limitation added successfully.')        
      }    
      else{
        await MCExtraDetails.clickOnConsultedCAA()
        await MCExtraDetails.enterReasonForLimitation(jsonData.Limitation[index].patmcsn_reason)
        await page.waitForTimeout(1000)
        await MCExtraDetails.clickOnAddLimitationButton()
        await page.waitForTimeout(1000)
        await expect(page.getByText('Limitation added successfully.')).toHaveText('Limitation added successfully.') 
      }
      await page.waitForTimeout(1000)
       //////// Limitations details/////////
    var sqlQuery =  "SELECT * FROM patient_medical_certificate_limitations where patmcsn_pat_id='"+patmce_pat_id+"' and patmcsn_type='limitation' order by patmcsn_id desc limit 1;";
    console.log("Limitation Query is:  "+sqlQuery) 
  var sqlFilePath = "SQLResults/MedicalCertificate/Limitations.json";
  var results = await executeQuery(sqlQuery, sqlFilePath);
  console.log(results);  
  var match = await compareJsons(sqlFilePath, null, jsonData.Limitation[index]);
  if (match) {
    console.log("\n Limitations Details Comparision: Parameters from both JSON files match!\n");
  } else {
    console.log("\n Limitations Details Comparision: Parameters from both JSON files do not match!\n");
  }

  await page.waitForTimeout(1000)
      await MCExtraDetails.clickOnShowLimitationLink()
      await MCExtraDetails.closeOnClosePopupButton()     
      await MCExtraDetails.clickOnEditLimitationLink()     
      await MCExtraDetails.enterLimitationReason("Added reason for testing")
      await MCExtraDetails.clickOnSaveEditedLimitation()
      await expect(page.getByText('Limitation updated successfully.')).toHaveText('Limitation updated successfully.')
      await page.waitForTimeout(1000)
      //Check Delete Added Limitation
      await MCExtraDetails.deleteLimitation()
      await MCExtraDetails.enterLimicationRemoveReason("Remove for testing")
      await MCExtraDetails.clickOnSaveRemovedLimitation()      
      await expect(page.getByText('Limitation deleted successfully')).toHaveText('Limitation deleted successfully')
      await page.waitForTimeout(1000)
      //await page.pause()
      // await MCExtraDetails.clickOnshowRemovedReasonlink()
      // await MCExtraDetails.closeOnClosePopupButton()    
      
      //Add Limitation again      
      await MCExtraDetails.selectLimitations("TML   Limited period of validity of the medical certificate ")
      const inputValue1 = await page.locator("xpath=//input[@id='limitation']").inputValue();
      await page.waitForTimeout(1000)     
      if(LimitationTypeTML === inputValue1)
      {
        await MCExtraDetails.enterLimitationAppliedDate(jsonData.Limitation[index].patmcsn_from.toString())
        await MCExtraDetails.enterLimitationValidToDate(jsonData.Limitation[index].patmcsn_to.toString())     
        await MCExtraDetails.clickOnConsultedCAA()
        await MCExtraDetails.enterReasonForLimitation(jsonData.Limitation[index].patmcsn_reason)
        await MCExtraDetails.clickOnAddLimitationButton()
        await expect(page.getByText('Limitation added successfully.')).toHaveText('Limitation added successfully.')
     }      

    
     await page.waitForTimeout(1000)
     //await page.pause()
     
     await MedicalCertificate.clickOnCertificateFitnessforFit("Class 1 Pilots Single pilot commercial operations carrying passengers","fit")
      await MCExtraDetails.enterMedicalCertificateReason(jsonData.MedicalCertificate[index].patmcsn_reason)
      await MCExtraDetails.clickOnSaveMedicalCertificate()
      await MCExtraDetails.enterAMEDeclaration(jsonData.MedicalCertificate[index].patmce_ame_declaration_text)
      await MCExtraDetails.clickOnbtnAcknowledgeDeclaration()
      await page.waitForTimeout(500)
      await expect(page.getByText('Medical certificate is generated')).toHaveText('Medical certificate is generated')
      await MedicalCertificate.toggleSearchSection();//Close the search section 
      await page.waitForTimeout(1000)     
     
      //Edit Medical certificate
      await MedicalCertificate.clickOnMCItemEdit(jsonData.MedicalCertificate[index].cert_certificate_class_eli_text);
      console.log("Already click on Edit button");      
      await MCExtraDetails.enterEditedMCNotes(jsonData.EditMedicalCertificate[index].patmce_notes);
      await MCExtraDetails.clickOnSaveEditedMedicalCertificate()
      await expect(page.getByText('Medical certificate updated successfully')).toHaveText('Medical certificate updated successfully')
      await MCExtraDetails.enterAMEDeclaration(jsonData.EditMedicalCertificate[index].patmce_ame_declaration_text)
      await MCExtraDetails.clickOnbtnAcknowledgeDeclaration()
      await expect(page.getByText('Medical certificate is generated')).toHaveText('Medical certificate is generated')
      await MedicalCertificate.clickOnMCItemDiv(jsonData.EditMedicalCertificate[index].cert_certificate_class_eli_text)
          
      await page.waitForTimeout(1000)
//////////////////////////////////////////////////////////////////////////////////////////
       await MedicalCertificate.clickOnMCItemHistory();
      // await MedicalCertificate.clickOnMCHistoryItemDiv()
      await page.getByLabel('expandRowIconundefined').nth(1).click()
      await page.waitForTimeout(1000)
      await MedicalCertificate.closeWindow();
      await page.waitForTimeout(2000)
      

       //Click on Show link//
       await page.waitForTimeout(1000)
       //await MedicalCertificate.clickOnMCItemShow()
       await page.waitForTimeout(2000)
      // await MedicalCertificate.closeWindow();
      await page.waitForTimeout(1000)
     // await page.pause()
///////////////////////////////////////////////////////////////////////////////////////////
     
      await MedicalCertificate.clickOnLevelTwoExtraDetails();
      await MedicalCertificate.clickOnLevelOneExtraDetails();
      await MedicalCertificate.clickOnMCItemDelete()    
      await MCExtraDetails.clickOnConfirmDelete();
      await MCExtraDetails.enterReasonForDeletion(jsonData.DeleteMedicalCertificate[index].patmch_reason)     
      await MCExtraDetails.clickOnSaveDeleteForReason()
      await page.waitForTimeout(1000)
      await expect(page.getByText("Medical certificate deleted successfully")).toHaveText("Medical certificate deleted successfully");                
    }
    
  });
});
