const { clickElement, typeText, selectFromDropdown} = require('../../../UtilFiles/StaticUtility.js');
const { selectFromSearchResults, selectRadioButton, locateFieldById, toggleDivVisibility, clickOnRemoveCustomizableQuestion, clickOnRestoreCustomizableQuestion, showClinicalItemByStatus, showExtraDetailLevel, clickHistoryTableIconsBeforeItemName, clickHistoryTableIconsUsingItemName, replaceLocator, assertElementExists } = require('../../../UtilFiles/DynamicUtility.js');

class ClinicalMedicationAdministration {
    constructor(page) {
        this.page = page;
        this.expandMedication = page.getByLabel('expandRowIconAspirin 25mg')
        this.givenMedication = page.getByTestId('Not Given')
        this.dropdownBatch = page.getByLabel('Open')
        this.selectBatch = page.getByRole('option', { name: 'Aspirin 25mg capsules' })
        this.btnSelect = page.getByTestId('Select')
        this.btnSave = page.getByTestId('Save')
        this.btnLogout = page.getByTestId('logout')
        this.btnPageBack = page.getByLabel('Back-Button')

        //Front End Display Locators

        this.lastDateField = page.locator('div').filter({ hasText: /^22\/01\/2025$/ }).nth(1)
        this.timeSlotOneNotGiven = page.locator('div:nth-child(9) > .MuiGrid-root > .MuiSvgIcon-root').first()
        this.timeSlotOne = page.locator('div:nth-child(3) > div:nth-child(9) > .MuiGrid2-root').getByTestId('DoneIcon')
        this.timeSlotTwo = page.locator('div:nth-child(4) > div:nth-child(9) > .MuiGrid2-root').getByTestId('DoneIcon')
        this.medicationName = page.getByRole('heading', { name: 'Aspirin 25mg capsules' })
        this.medicationDose = page.getByRole('heading', { name: '2', exact: true })
        this.medicationRoute = page.getByRole('heading', { name: 'Oral' })
        this.medicationFrequency = page.getByRole('heading', { name: 'Hours' })
        this.medicationDuration = page.getByRole('heading', { name: 'Days' })
        this.medicationStartDate = page.getByRole('cell', { name: '16/06/2024', exact: true }).getByRole('heading')
        this.username = page.getByRole('heading', { name: 'Thayne.auto' })
    }

    async clickOnMedicationToggle() {
        await clickElement(this.page, this.expandMedication);
    }
    async clickOnNotGivenLink() {
        await clickElement(this.page, this.givenMedication);
    }
    async clickOnBatchDropdown() {
        await clickElement(this.page, this.dropdownBatch);
    }
    async selectBatchMedication(){
        await selectFromDropdown(this.page, this.dropdownBatch, 'Aspirin 25mg capsules');
    }
    async clickOnSelectButton() {
        await clickElement(this.page, this.btnSelect);
    }
    async clickOnSaveButton() {
        await clickElement(this.page, this.btnSave);
    }
    async clickOnBackButton() {
        await clickElement(this.page, this.btnPageBack);
    }
}

module.exports = ClinicalMedicationAdministration;