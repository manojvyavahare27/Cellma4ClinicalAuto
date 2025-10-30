//Saurabh
const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql2");
const convertExcelToJson = require("../../../../../../config/global-setupOptimized");

const { test, expect } = require("@playwright/test");
const connectToDatabase = require("../../../../../../manoj").default;
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
import ClinicalExtraDetails from "../../../../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";
import PatientSummary from "../../../../../../Pages/ClinicalDomain/PatientSummary/PatientSummary";
import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";
import { toggleDivVisibility } from "../../../../../../UtilFiles/DynamicUtility";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion social Category", () => {
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

test.describe("Pathway Category", () => {
    test("Add Pathway", async ({ page }) => { 
  
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
        const problems = new ClinicalSummary(page);
        const worklistExtraDetails = new ClinicalExtraDetails(page);
        const patientsummary = new PatientSummary(page);
  
        const menu = new Menu(page);
        await page.goto(environment.Test);
        await loginpage.enterUsername(jsonData.loginDetails[0].username);
        logger.info("Username enter successfully");
        await loginpage.enter_Password(jsonData.loginDetails[0].password);
        logger.info("Password enter successfully");
        await loginpage.clickOnLogin();
        logger.info("Clicked on Login button successfully");
        //await homepage.redirectsToHomePage()
        //logger.info("Clicked on homepage icon successfully");
  
        await page.waitForTimeout(3000)
        await homepage.clickOnSideIconPatient()
        logger.info("Clicked on Patient Icon successfully");
        await patientsearch.clickOnSearchButton();
        logger.info("Clicked on Search button successfully");
        await patientsearch.enterGivenName(data.pat_firstname);
        logger.info("Given Name entered successfully");
        //await page.pause()
        await patientsearch.enterFamilyName(data.pat_surname);
        logger.info("Family Name entered successfully");
        //await patientsearch.selectSex(data.pat_sex);
  
        await patientsearch.selectBornDate(
          jsonData.PatientDetails[index].pat_dob
        );
      
        //await patientsearch.selectBornDate(formattedDate);
        await patientsearch.clickOnSearchButton();
  
        await patientsearch.clickOnSearchPatientLink();
        await page.waitForTimeout(1500);
        await confirmexisting.clickOnConfirmExistingDetails();
        // await contacthistory.clickOnMenuIcon()
        // await page.waitForTimeout(2000);


         //////Fetch Patient Details/////////
   var sqlQuery =
   "select * from patient_audit where paa_use_username='" + jsonData.loginDetails[0].username + 
   "' and paa_type='selected' order by 1 desc limit 1";
   var sqlFilePath = "SQLResults/PatientDomain/PatientAudit.json";
   var results = await executeQuery(sqlQuery, sqlFilePath);
   console.log("\n Patient Details stored into the database: \n", results);
   const patId = results[0].paa_pat_id;

   console.log("Patient Accessed by User:" + patId);

 

  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'cancelIcon' }).click()

       // await contacthistory.enterContactDate('16/11/2024');
        await contacthistory.selectContactReason('Assessments');
        await contacthistory.selectContactLocation('Cardio Location');
       // await contacthistory.enterContactWith('Dr Saurabh');
        await contacthistory.clickOnAddContact();
        //await problems.clickOnViewContactItemsMenu();
        //await problems.clickOnPinContactItemsMenu();
        await page.waitForTimeout(1000);
         await page.pause()
        await patientsummary.clickOnAddToTask();
        await page.waitForTimeout(1000);
        await patientsummary.selectPathwaylink();
        await page.waitForTimeout(1000);

        await patientsummary.setPathway();
        await page.waitForTimeout(1500);
        await patientsummary.setPathwayPriority();
        await page.waitForTimeout(5000);
        await patientsummary.addpathwayStartDate(jsonData.AddPathway[index].ppt_start_date);
        await patientsummary.addpathwayEndDate(jsonData.AddPathway[index].ppt_end_date);
        //await patientsummary.enterPathwayFirstTaskStartDate(jsonData.AddPathway[index].task_start_date);
        //await patientsummary.enterPathwayFirstTaskEndDate(jsonData.AddPathway[index].task_due_date);
        //await patientsummary.enterPathwaySecondTaskStartDate(jsonData.AddPathway[index].task_start_date1);
        //await patientsummary.enterPathwaySecondTaskEndDate(jsonData.AddPathway[index].task_due_date1);
        await patientsummary.expandFirstPathwayTask();
        await page.waitForTimeout(1000);
        await patientsummary.addworTasDueTime(jsonData.AddWorklist[index].due_time);
       //await patientsummary.addworTasDueTime(jsonData.AddPathway[index].task_due_time); 
       //await patientsummary.enterPathwayTaskDueTime(jsonData.AddPathway[index].task_due_time);
        await patientsummary.enterPathwayTaskNotes(jsonData.AddPathway[index].task_notes);
       // await patientsummary.expandFirstPathwayTask();
        await page.waitForTimeout(1000);
       // await patientsummary.expandSecondPathwayTask();
       // await patientsummary.enterPathwayTaskDueTime(jsonData.AddPathway[index].task_due_time);
       // await patientsummary.enterPathwayTaskNotes(jsonData.AddPathway[index].task_notes);
        //await patientsummary.expandSecondPathwayTask();
       // await patientsummary.enterPathwayTaskDueTime(jsonData.AddPathway[index].task_due_time);
      //  await patientsummary.enterPathwayTaskNotes(jsonData.AddPathway[index].task_notes);
        await patientsummary.selectPatwayCheckboxes();
        await patientsummary.clickSavePathway();
        await page.pause()

        // await patientsummary.addWorklistNotes(jsonData.AddPathway[index].notes);
        // await patientsummary.selectAllWorklistCheckbox()
        // await patientsummary.selectSaveWorklist()



        
        // await page.pause()
        // await patientsummary.selectServiceModule()
        // await patientsummary.selectTaskDropdown()
        // await patientsummary.clickWorklistLink()
        // await patientsummary.enterWorklistName(jsonData.AddWorklist[index].wor_name);
        // await patientsummary.searchForWorklist()
        // await page.waitForTimeout(4000);
        // await patientsummary.clickOnWorklist()
        // await page.waitForTimeout(1000);
        // await patientsummary.enterRename(jsonData.AddWorklist[index].wor_rename);
        // await patientsummary.saveRename()
        // await page.waitForTimeout(1000)
        // await patientsummary.clickViewTemplate()
        // await page.waitForTimeout(2000)
        // await patientsummary.closeTaskTemplate()
        // await page.waitForTimeout(2000)
        // await patientsummary.worklistSelectLink()
        // await page.waitForTimeout(2000)
        // await patientsummary.closeTaskTemplate()
        // await page.waitForTimeout(2000)
        await page.locator("xpath=//img[@alt='Cellma Image Avatar']").click()
        //await homepage.redirectsToHomePage()
        logger.info("Clicked on homepage icon successfully");
  
        await page.waitForTimeout(3000)
        await homepage.clickOnSideIconPatient();
        logger.info("Clicked on Patient Icon successfully");
        await patientsearch.clickOnSearchButton();
        logger.info("Clicked on Search button successfully");
        await patientsearch.enterGivenName(data.pat_firstname);
        logger.info("Given Name entered successfully");
        //await page.pause()
        await patientsearch.enterFamilyName(data.pat_surname);
        logger.info("Family Name entered successfully");
        //await patientsearch.selectSex(data.pat_sex);
  
        await patientsearch.selectBornDate(
          jsonData.PatientDetails[index].pat_dob
        );
      
        //await patientsearch.selectBornDate(formattedDate);
        await patientsearch.clickOnSearchButton();
  
        await patientsearch.clickOnSearchPatientLink();
        await page.waitForTimeout(1500);
        await confirmexisting.clickOnConfirmExistingDetails();
        await page.pause()

        //await contacthistory.enterContactDate('16/10/2024');
        await contacthistory.selectContactReason('Assessments');
        await contacthistory.selectContactLocation('Cardio Location');
        //await contacthistory.enterContactWith('Dr Saurabh');
        await contacthistory.clickOnAddContact();
        await patientsummary.clickTaskIcon();
        await page.waitForTimeout(1500);
        // await patientsummary.allTaskTab()
        // await page.waitForTimeout(1500);
        // await patientsummary.expandIncompleteTask()
        // await page.waitForTimeout(1500);
        // await patientsummary.expandCompleteTask()
        // await page.waitForTimeout(1500);
        // await patientsummary.expandNotToBeCompleted()
        // await page.waitForTimeout(1500);
        // await patientsummary.incompleteTaskTab()
        // await page.waitForTimeout(1500);
        await patientsummary.clickCheckAll();
        await page.waitForTimeout(1000);
        await patientsummary.clickUncheckAll();
        await page.waitForTimeout(1000);
        await patientsummary.clickCheckAll();
        await page.waitForTimeout(1000);
        await patientsummary.clickCompleteTask();
        await page.waitForTimeout(5000);
        await page.getByLabel('cancelIcon').click();

        await page.waitForTimeout(1000);
        await patientsummary.clickOnAddToTask();
        await page.waitForTimeout(1000);
        await patientsummary.selectPathwaylink();
        await page.waitForTimeout(1000);
        await page.getByTestId('CommonCellmaPopup').getByLabel('expandRowIcon');
        await page.getByLabel('expandRowIconundefined');
        await patientsummary.clickDeleteWorklist();
        await worklistExtraDetails.clickOnCancelDelete()
        await page.waitForTimeout(1000);
        await patientsummary.clickDeleteWorklist();
        await worklistExtraDetails.clickOnConfirmDelete()
        await page.locator("xpath=//button[@aria-label='cancelIcon']").nth(0).click()
        await page.locator("xpath=//img[@alt='Cellma Image Avatar']").click()
        await page.getByLabel('profileIcon').click();
        await page.getByText('Logout').click();


// let username = jsonData.loginDetails[0].username;        
//          ////// Database comparison - ADDING NEW TASK/////////
//   sqlQuery =
//   `SELECT task_name,task_due_date,task_due_time,task_status,task_priority,alert_category,taskd_description, task_notes FROM c4_tasks JOIN c4_alerts ON c4_tasks.task_id = c4_alerts.alert_task_id JOIN task_details ON c4_tasks.task_id = task_details.taskd_task_id WHERE c4_tasks.task_pat_id =${patId}  and task_created_by = '${username}' order by task_id desc limit 1`;
//  console.log("Task query"+sqlQuery)       
//  await page.pause()

// sqlFilePath = "SQLResults/ClinicalDomain/addTaskToPatient.json";
// results = await executeQuery(sqlQuery, sqlFilePath);
// const pacrId = results[0].pacr_id;
// console.log("\n Patient Clinical Records stored into the database: \n", results);
// var match = await compareJsons(sqlFilePath, null, jsonData.AddTask[index]);
// if (match) {
//   console.log(
//     "\n Patient Clinical Records Comparision Add Problems: Parameters from both JSON files match!\n"
//   );
// } else {
//   console.log(
//     "\n Patient Clinical Records Comparision: Parameters from both JSON files do not match!\n"
//   );
 } 
      });
    })