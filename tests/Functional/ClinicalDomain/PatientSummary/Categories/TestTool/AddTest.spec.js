//Thayne

const convertExcelToJson = require("../../../../../../config/global-setupOptimized");

const { test, expect } = require("@playwright/test");
const { executeQuery } = require("../../../../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../../../../compareFileOrJson";

import logger from "../../../../../../Pages/BaseClasses/logger";
import LoginPage from "../../../../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../../../../Pages/BaseClasses/Homepage";
import ConfirmExisting from "../../../../../../Pages/PatientDomain/ConfirmExisting";
import ContactHistory from "../../../../../../Pages/ClinicalDomain/PatientSummary/ContactHistory";
import PatientSearch from "../../../../../../Pages/PatientDomain/PatientSearch";
import Environment from "../../../../../../Pages/BaseClasses/Environment";
import Menu from "../../../../../../Pages/BaseClasses/Menu";
import ClinicalSummary from "../../../../../../Pages/ClinicalDomain/PatientSummary/ClinicalSummary";
import TestToolDetails from "../../../../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Test/Tool Category", () => {
  test("Extract Patient Summary Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/PatientSummary.xlsx";
    const jsonFilePath = "./TestDataWithJSON/PatientDomain/PatientSummary.json";

    console.log("excelFilePath:", excelFilePath);
    console.log("jsonFilePath:", jsonFilePath);
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );
    if (conversionSuccess) {
      // jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
      jsonData = require("../../../../../../TestDataWithJSON/PatientDomain/PatientSummary.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("Test and Tool Category", () => {
    test("Add, Edit, Delete Test and Tool", async ({ page }) => {
        if (!jsonData || !jsonData.PatientDetails) {
        throw new Error("JSON data is missing or invalid.");
        }
        let index = 0;
        for (const data of jsonData.DevicePatientDetails) {
            const loginpage = new LoginPage(page);
            const homepage = new Homepage(page);
            const environment = new Environment(page);
            const confirmexisting = new ConfirmExisting(page);
            const contacthistory = new ContactHistory(page);
            const patientsearch = new PatientSearch(page);
            const SummaryPage = new ClinicalSummary(page);
            const TestTool = new TestToolDetails(page);

            const menu = new Menu(page);
            await page.goto(environment.Test);
            await loginpage.enterUsername(jsonData.loginDetails[0].username);
            logger.info("Username enter successfully");
            await loginpage.enter_Password(jsonData.loginDetails[0].password);
            logger.info("Password enter successfully");
            await loginpage.clickOnLogin();
            logger.info("Clicked on Login button successfully");
            await homepage.clickOnHomeDashboardIcon();
            await homepage.clickOnPatientIcon();
            logger.info("Clicked on Patient Icon successfully");
            await patientsearch.clickOnSearchButton();
            logger.info("Clicked on Search button successfully");
            await patientsearch.enterGivenName(data.pat_firstname);
            logger.info("Given Name entered successfully");
            await patientsearch.enterFamilyName(data.pat_surname);
            logger.info("Family Name entered successfully");
            await patientsearch.selectSex(data.pat_sex);
            await patientsearch.selectBornDate(data.pat_dob);
            //await patientsearch.selectBornDate(formattedDate);
            await patientsearch.clickOnSearchButton();
            await patientsearch.clickOnSearchPatientLink();
            //await page.waitForTimeout(4000);
            //page.waitForSelector("xpath=//button[@data-testid='Confirm Existing Details']");
            await confirmexisting.btn_confirmExistingDetails.waitFor();
            await page.waitForTimeout(1000);
            await confirmexisting.clickOnConfirmExistingDetails();

            await contacthistory.selectContactReason("Data Entry");
            await contacthistory.selectContactLocation("Cardio Location");
            await contacthistory.clickOnAddContact();
            await SummaryPage.selectCategoryFromList("Test Tools");
            await page.waitForTimeout(2000);

            ////////REVIEW EXISTING ITEM AND DELETE/////
            // await page.waitForTimeout(8000);
            // if (
            //   await SummaryPage.checkItemOnHistoryTable(
            //     jsonData.AddDevice[index].dev_name
            //   )
            // ) {
            //   //await Medications.clickOnItemReview(jsonData.AddMedication[index].pacr_que_name);
            //   //console.log("Item reviewed before deleting");
            //   await SummaryPage.clickOnDeviceEdit(
            //     jsonData.AddDevice[index].dev_name
            //   );
            //   await page.waitForTimeout(3000);
            //   await Devices.clickOnDeleteDevice();
            //   await Devices.clickOnOkPopup();
            //   await Devices.enterDeleteDeviceReason(jsonData.EditDevice[index].dev_deleted_reason);
            //   await Devices.clickOnSaveDeleteReason();
            //   console.log("\x1bItem was deleted successfully\x1b[0m");
            // }
            // await page.waitForTimeout(2000);


            //////Fetch Patient Details/////////
            var sqlQuery =
              "select * from patient_audit where paa_use_username='" +
              jsonData.loginDetails[0].username +
              "' and paa_type='selected' order by 1 desc limit 1";
            var sqlFilePath = "SQLResults/PatientDomain/PatientAudit.json";
            var results = await executeQuery(sqlQuery, sqlFilePath);
            console.log("\n Patient Details stored into the database: \n", results);
            const patId = results[0].paa_pat_id;
            console.log("Patient Accessed by User:" + patId);

            ///// Add New Test - Pressure Ulcer Test /////
            await SummaryPage.selectTestToolItem(jsonData.AddPressureUlcer[index].pattes_tests_question_que_name);
            await SummaryPage.clickOnAddButton()
            await TestTool.selectSensoryPerception(jsonData.AddPressureUlcer[4].pattes_answer);
            await TestTool.selectMoisture(jsonData.AddPressureUlcer[6].pattes_answer);
            await TestTool.selectActivityTest(jsonData.AddPressureUlcer[2].pattes_answer);
            await TestTool.selectMobility(jsonData.AddPressureUlcer[1].pattes_answer);
            await TestTool.selectNutrition(jsonData.AddPressureUlcer[5].pattes_answer);
            await TestTool.selectFrictionAndShear(jsonData.AddPressureUlcer[3].pattes_answer);
            await TestTool.clickOnCalculateButton();
            await TestTool.enterNotes(jsonData.AddPressureUlcer[index].pattes_notes);
            await TestTool.clickOnSaveTestTool();
            //await expect.soft(page.getByText("Device record added successfully")).toHaveText("Device record added successfully");
            await TestTool.clickOnExtraDetailsView2();

            ////////////////////////// FRONT END COMPARISON OF ENTERED INFORMAION //////////////////////////      
            // var count = 0;
      
            // console.log('\nFRONT END COMPARISON - REGULAR JAVASCRIPT')
            // console.log('Add Device\n')
            
            // var dev_procedure_name = await Devices.deviceProcedureName.isVisible()
            // var dev_name = await Devices.deviceName.isVisible()
            // var ded_laterality = await Devices.deviceLaterality.isVisible()
            // var ded_status = await Devices.deviceStatus.isVisible()
            // var dev_expiry_date = await Devices.deviceExpiryDate.isVisible()
            // var dev_serial_number = await Devices.deviceSerialNumber.isVisible()
            // var ded_notes = await Devices.deviceNotes.isVisible();
      
            // if (dev_procedure_name){
            //   await expect.soft(Devices.deviceProcedureName).toContainText(jsonData.AddDevice[index].dev_procedure_name);
            //   console.log('Displayed procedure matched: ' + jsonData.AddDevice[index].dev_procedure_name)
            // }
            // else {
            //   console.log('Displayed procedure did not match.')
            //   count++
            // }
      
            // if (dev_name){
            //   await expect.soft(Devices.deviceName).toContainText(jsonData.AddDevice[index].dev_name);
            //   console.log('Displayed device matched: ' + jsonData.AddDevice[index].dev_name)
            // }
            // else {
            //   console.log('Displayed device did not match.')
            //   count++
            // }
      
            // if (ded_laterality){
            //   await expect.soft(Devices.deviceLaterality).toContainText(jsonData.AddDevice[index].ded_laterality);
            //   console.log('Displayed device laterality matched: ' + jsonData.AddDevice[index].ded_laterality)
            // }
            // else {
            //   console.log('Displayed device laterality did not match.')
            //   count++
            // }
      
            // if (ded_status){
            //   await expect.soft(Devices.deviceStatus).toContainText(jsonData.AddDevice[index].ded_status);
            //   console.log('Displayed status matched: ' + jsonData.AddDevice[index].ded_status)
            // }
            // else {
            //   console.log('Displayed status did not match.')
            //   count++
            // }
      
            // if (dev_expiry_date){
            //   await expect.soft(Devices.deviceExpiryDate).toContainText(jsonData.AddDevice[index].dev_expiry_date);
            //   console.log('Displayed expiry date matched: ' + jsonData.AddDevice[index].dev_expiry_date)
            // }
            // else {
            //   console.log('Displayed expiry date did not match.')
            //   count++
            // }
      
            // if (dev_serial_number){
            //   await expect.soft(Devices.deviceSerialNumber).toContainText(jsonData.AddDevice[index].dev_serial_number);
            //   console.log('Displayed serial number matched: ' + jsonData.AddDevice[index].dev_serial_number)
            // }
            // else {
            //   console.log('Displayed serial number did not match.')
            //   count++
            // }
      
            // if (ded_notes){
            //   await expect.soft(Devices.deviceNotes).toContainText(jsonData.AddDevice[index].ded_notes);
            //   console.log('Displayed device notes matched: ' + jsonData.AddDevice[index].ded_notes)
            // }
            // else {
            //   console.log('Displayed device notes did not match.')
            //   count++
            // }
            // console.log('\nFailed count: ' + count);

            ///////// Database comparison- Patient Test Records - ADDING NEW TEST /////////
            sqlQuery = 
            "select pacr_id from patient_clinical_records "+
            "where pacr_que_name = '"+ jsonData.AddPressureUlcer[index].pattes_tests_question_que_name +"' "+
            "order by 1 desc limit 1";
            //console.log(sqlQuery);

            sqlFilePath = "SQLResults/ClinicalDomain/PatientClinicalRecord.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            let pacrId = results[0].pacr_id;
            console.log("Patient test clinical record: " + pacrId);
            
            sqlQuery = 
            "select pattes_test_pacr_id, pattes_pat_id, pattes_tests_question_que_name, pattes_answer, pattes_notes "+
            "from patient_tests "+
            "where pattes_test_pacr_id = "+pacrId+" and pattes_record_status = 'approved' "+
            "order by 1 asc;";

            console.log("Add Test:  " + sqlQuery);
            sqlFilePath = "SQLResults/ClinicalDomain/PatientTestTool.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            console.log(
              "\n Patient Test records stored into the database: \n",
              results
            );
            var match = await compareJsons(
              sqlFilePath,
              null,
              jsonData.AddPressureUlcer[index]
            );
            if (match) {
              console.log(
                "\n Patient - Add test: Parameters from additional fields match!\n"
              );
            } else {
              console.log(
                "\n Patient - Add test: Parameters from additional fields do not match!\n"
              );
            }
            await page.waitForTimeout(5000);

            // Edit Test
            await TestTool.clickOnEditIcon();
            await TestTool.enterReviewDate(jsonData.EditPressureUlcer[index].pattes_review_date);
            await TestTool.enterLastReviewedDate(jsonData.EditPressureUlcer[index].pattes_last_reviewed);
            await TestTool.selectSensoryPerception(jsonData.EditPressureUlcer[4].pattes_answer);
            await TestTool.selectMoisture(jsonData.EditPressureUlcer[6].pattes_answer);
            await TestTool.selectActivityTest(jsonData.EditPressureUlcer[2].pattes_answer);
            await TestTool.selectMobility(jsonData.EditPressureUlcer[1].pattes_answer);
            await TestTool.selectNutrition(jsonData.EditPressureUlcer[5].pattes_answer);
            await TestTool.selectFrictionAndShear(jsonData.EditPressureUlcer[3].pattes_answer);
            await TestTool.clickOnCalculateButton();
            await TestTool.enterNotes(jsonData.EditPressureUlcer[index].pattes_notes);
            await TestTool.clickOnSaveTestTool();
            //assert device edited -Device record updated successfully
            //await expect.soft(page.getByText("Device record updated successfully")).toHaveText("Device record updated successfully");

            ///////// Database comparison- Patient Test Records - Editing Test /////////
            sqlQuery = 
            "select pacr_id from patient_clinical_records "+
            "where pacr_que_name = '"+ jsonData.AddPressureUlcer[index].pattes_tests_question_que_name +"' "+
            "order by 1 desc limit 1";

            sqlFilePath = "SQLResults/ClinicalDomain/PatientClinicalRecord.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            pacrId = results[0].pacr_id;
            console.log("Patient test clinical record " + pacrId);
            
            sqlQuery = 
            "select pattes_test_pacr_id, pattes_pat_id, pattes_tests_question_que_name, pattes_answer, pattes_notes, "+
            "pattes_review_date, pattes_last_reviewed "+
            "from patient_tests "+
            "where pattes_test_pacr_id = "+pacrId+" and pattes_record_status = 'approved' "+
            "order by 1 asc;";

            console.log("Edit Test:  " + sqlQuery);
            sqlFilePath = "SQLResults/ClinicalDomain/PatientTestToolEdit.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            console.log(
              "\n Patient Test record stored into the database: \n",
              results
            );
            var match = await compareJsons(
              sqlFilePath,
              null,
              jsonData.EditPressureUlcer[index]
            );
            if (match) {
              console.log(
                "\n Patient - Edit test: Parameters from additional fields match!\n"
              );
            } else {
              console.log(
                "\n Patient - Edit test: Parameters from additional fields do not match!\n"
              );
            }

            await page.waitForTimeout(5000);

            // Delete Test
            await TestTool.clickOnExtraDetailsView2();
            await TestTool.clickOnEditIcon();
            await TestTool.clickOnDeleteDevice();
            await TestTool.clickOnOkPopup();
            await TestTool.enterDeleteDeviceReason(jsonData.EditPressureUlcer[index].pacr_delete_reason);
            await TestTool.clickOnSaveDeleteReason();
            //await page.pause()

            //assert device deleted - Device deleted successfully
            //await expect.soft(page.getByText("Device deleted successfully")).toHaveText("Device deleted successfully");

            ///////// Database comparison- Patient Test Records - Delete Test /////////
            sqlQuery =
            "SELECT pacr_delete_reason, pacr_record_status "+
            "FROM patient_clinical_records "+
            "WHERE pacr_id = " + pacrId +
            " and pacr_record_status = 'wrong'";

            console.log("Delete Test:  " + sqlQuery);
            sqlFilePath = "SQLResults/ClinicalDomain/PatientTestToolDelete.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            console.log(
              "\n Patient Test record stored into the database: \n",
              results
            );
            var match = await compareJsons(
              sqlFilePath,
              null,
              jsonData.EditPressureUlcer[index]
            );
            if (match) {
              console.log(
                "\n Patient - Delete test: Parameters from both JSON files match!\n"
              );
            } else {
              console.log(
                "\n Patient - Delete test: Parameters from both JSON files do not match!\n"
              );
            }
            await page.waitForTimeout(5000);
        }
    });
});