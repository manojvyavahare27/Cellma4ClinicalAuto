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
import DeviceDetails from "../../../../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Device Category", () => {
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

test.describe("Device Category", () => {
    test("Add, Edit, Delete New Device", async ({ page }) => {
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
            const Devices = new DeviceDetails(page);

            await page.pause()
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
            await SummaryPage.selectCategoryFromList("Devices");


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

            // Add New Device
            await SummaryPage.selectandAddClinicalItem(jsonData.AddDevice[index].dev_name);
            await page.waitForTimeout(2000);
            await Devices.selectDeviceProcedure(jsonData.AddDevice[index].dev_procedure_name);
            await Devices.enterDevice(jsonData.AddDevice[index].dev_name);
            await Devices.selectManufacturer(jsonData.AddDevice[index].dev_manufacturer);
            await Devices.selectTypeOfDevice(jsonData.AddDevice[index].ded_type_entry);
            await Devices.selectInternalOrExternal(jsonData.AddDevice[index].ded_internal_external_entry);
            await Devices.selectDeviceStatus(jsonData.AddDevice[index].ded_status_entry);
            await Devices.selectLaterality(jsonData.AddDevice[index].ded_laterality_entry);
            await Devices.enterDeviceExpiryDate(jsonData.AddDevice[index].dev_expiry_date);
            await Devices.enterDeviceNotes(jsonData.AddDevice[index].ded_notes);
            await Devices.clickOnSaveDevice();
            await expect(page.getByText("Device record added successfully")).toHaveText("Device record added successfully");
            //assert device saved

            ///////// Database comparison- Patient Device Records - ADDING NEW Device /////////
            sqlQuery =
            "SELECT ded_id, dev_id, dev_name, dev_type, dev_procedure_name,dev_manufacturer, dev_expiry_date, ded_type, ded_internal_external, ded_laterality, ded_notes, ded_status "+
            "FROM patient_device_details JOIN patient_devices on ded_dev_id = dev_id "+
            "WHERE dev_pat_id = " + patId +
            " and ded_record_status = 'approved' and dev_record_status = 'approved' "+
            "ORDER BY 1 DESC LIMIT 1";

            console.log("Add Device:  " + sqlQuery);
            sqlFilePath = "SQLResults/ClinicalDomain/PatientDevice.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            const devId = results[0].dev_id;
            const dedId = results[0].ded_id;
            console.log(
              "\n Patient Device record stored into the database: \n",
              results
            );
            var match = await compareJsons(
              sqlFilePath,
              null,
              jsonData.AddDevice[index]
            );
            if (match) {
              console.log(
                "\n Patient - Add new device: Parameters from both JSON files match!\n"
              );
            } else {
              console.log(
                "\n Patient - Add new device: Parameters from both JSON files do not match!\n"
              );
            }
            await page.waitForTimeout(5000);

            // Edit Device
            await Devices.clickOnExtraDetailsView3();
            await Devices.clickOnEditDevice();
            await Devices.selectManufacturer(jsonData.EditDevice[index].dev_manufacturer);
            await Devices.selectDeviceSubCategory(jsonData.EditDevice[index].dev_type);
            await Devices.selectTypeOfDevice(jsonData.EditDevice[index].ded_type_entry);
            await Devices.selectInternalOrExternal(jsonData.EditDevice[index].ded_internal_external_entry);
            await Devices.selectDeviceStatus(jsonData.EditDevice[index].ded_status_entry);
            await Devices.selectLaterality(jsonData.EditDevice[index].ded_laterality_entry);
            await Devices.enterDeviceExpiryDate(jsonData.EditDevice[index].dev_expiry_date);
            await Devices.enterDeviceNotes(jsonData.EditDevice[index].ded_notes);
            await Devices.clickOnSaveDevice();
            //assert device edited -Device record updated successfully
            await expect(page.getByText("Device record updated successfully")).toHaveText("Device record updated successfully");

            ///////// Database comparison- Patient Device Records - Editing Device /////////
            sqlQuery =
            "SELECT ded_updated, ded_updated_by, ded_record_status "+
            "FROM patient_device_details "+
            "WHERE ded_id = "+ dedId;

            sqlFilePath = "SQLResults/ClinicalDomain/PatientDeviceEdit.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            console.log(
              "\n Patient Device record updated: \n",
              results
            );

            sqlQuery =
            "SELECT ded_id, dev_id, dev_name, dev_type, dev_procedure_name,dev_manufacturer, dev_expiry_date, ded_type, ded_internal_external, ded_laterality, ded_notes, ded_status "+
            "FROM patient_device_details JOIN patient_devices on ded_dev_id = dev_id "+
            "WHERE dev_pat_id = " + patId +
            " and ded_record_status = 'approved' and dev_record_status = 'approved' "+
            "ORDER BY 1 DESC LIMIT 1";

            console.log("Edit Device:  " + sqlQuery);
            sqlFilePath = "SQLResults/ClinicalDomain/PatientDeviceEdit.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            console.log(
              "\n Patient Device record edited in database: \n",
              results
            );
            var match = await compareJsons(
              sqlFilePath,
              null,
              jsonData.EditDevice[index]
            );
            if (match) {
              console.log(
                "\n Patient - Edit device: Parameters from both JSON files match!\n"
              );
            } else {
              console.log(
                "\n Patient - Edit device: Parameters from both JSON files do not match!\n"
              );
            }
            await page.waitForTimeout(5000);

            // Delete Device
            await Devices.clickOnExtraDetailsView3();
            await Devices.clickOnEditDevice();
            await Devices.clickOnDeleteDevice();
            await Devices.clickOnOkPopup();
            await Devices.enterDeleteDeviceReason(jsonData.EditDevice[index].dev_deleted_reason);
            await Devices.clickOnSaveDeleteReason();

            //assert device deleted - Device deleted successfully
            await expect(page.getByText("Device deleted successfully")).toHaveText("Device deleted successfully");

            ///////// Database comparison- Patient Device Records - Delete Device /////////
            sqlQuery =
            "SELECT dev_deleted_reason, dev_record_status "+
            "FROM patient_devices "+
            "WHERE dev_id = " + devId +
            " and dev_record_status = 'wrong'";

            console.log("Delete Device:  " + sqlQuery);
            sqlFilePath = "SQLResults/ClinicalDomain/PatientDeviceDelete.json";
            results = await executeQuery(sqlQuery, sqlFilePath);
            console.log(
              "\n Patient Device record stored into the database: \n",
              results
            );
            var match = await compareJsons(
              sqlFilePath,
              null,
              jsonData.EditDevice[index]
            );
            if (match) {
              console.log(
                "\n Patient - Delete device: Parameters from both JSON files match!\n"
              );
            } else {
              console.log(
                "\n Patient - Delete device: Parameters from both JSON files do not match!\n"
              );
            }
            await page.waitForTimeout(5000);

            


            await page.pause()
        }
    });
});