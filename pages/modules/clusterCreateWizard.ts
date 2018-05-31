import { $, browser, by, element, protractor } from 'protractor';
import { async } from 'q';

export class ClusterCreateWizard {
    public templateSwitch = $('app-basic-advanced-toggler i');
    public credentialSelector = $('[placeholder="Please select credential"]');
    public clusterNameField = $('#clusterName');
    public imageTypeSelect = $('[data-qa="imagetype-select"]');
    public baseImageOption = $('[data-qa="image-base"]');
    public userField = $('input[formcontrolname="username"]');
    public passwordField = $('input[formcontrolname="password"]');
    public confirmPasswordField = $('input[formcontrolname="passwordConfirmation"]');
    public sshTextarea = $('[formcontrolname="publicKey"]');
    public sshSelector = $('#cb-cluster-create-security-ssh-key-name-select');
    public createButton = $('.btn.btn-primary.text-uppercase');
    public nextButton = $('.action-container .btn.btn-primary');

    async setAdvancedTemplate() {
        return await this.templateSwitch.click();
    }

    async selectCredential(name: string) {
        await this.credentialSelector.click();
        return await element(by.cssContainingText('mat-option', name)).click();
    }

    async selectSSHKey(name: string) {
        const EC = protractor.ExpectedConditions;
        const desiredSSHKeyName = element(by.cssContainingText('.mat-option', name));

        await this.sshSelector.click();
        await browser.wait(EC.elementToBeClickable(desiredSSHKeyName), 5000, name + ' SSH Key is not present in the DOM');
        return await desiredSSHKeyName.click();
    }

    async setNewSSHKey(sshKey: string) {
        const createNewSSHKeyTab = $("app-security mat-radio-button[id='cb-cluster-create-new-ssh-key']");
        const sshTextarea = $("textarea[formcontrolname='publicKey']");

        await createNewSSHKeyTab.click();
        await sshTextarea.clear().then(() => {
            return sshTextarea.sendKeys(sshKey);
        });
    }

    async generalConfiguration(credentialName: string, clusterName: string) {
        await this.selectCredential(credentialName);
        await this.clusterNameField.sendKeys(clusterName);
    }

    async selectBaseImage() {
        const EC = protractor.ExpectedConditions;

        await browser.wait(EC.elementToBeClickable(this.imageTypeSelect), 10000, 'Base image selector is not present in the DOM');
        await this.imageTypeSelect.click();
        await browser.wait(EC.elementToBeClickable(this.baseImageOption), 10000, 'Base image option is not present in the DOM');
        await this.baseImageOption.click();
    }

    async clickNextOnPage(pageAppName: string) {
        const EC = protractor.ExpectedConditions;
        let app = $(pageAppName);

        await browser.wait(EC.presenceOf(app), 10000, pageAppName + ' does not present in the DOM');
        await browser.wait(EC.elementToBeClickable(this.nextButton), 10000, 'Next button is not present in the DOM');
        await this.nextButton.click();
    }

    async disableGatewayTopology() {
        const gatewaySlider = $('app-gateway-configuration mat-slide-toggle');

        await gatewaySlider.getAttribute('class').then(elementClass => {
            if (elementClass.includes('mat-checked')) {
                return gatewaySlider.click();
            } else {
                return console.log('Gateway Topology is already disabled.');
            }
        });
    }

    async security(user: string, password: string, ssh: string, isSSHName = true) {
        await this.userField.clear().then(() => {
            return this.userField.sendKeys(user);
        });
        await this.passwordField.clear().then(() => {
            return this.passwordField.sendKeys(password);
        });
        await this.confirmPasswordField.clear().then(() => {
            return this.confirmPasswordField.sendKeys(password);
        });
        isSSHName ? await this.selectSSHKey(ssh) : await this.setNewSSHKey(ssh);
    }

    async createOpenStackCluster(credentialName: string, clusterName: string, user: string, password: string, sshKeyName: string, network?: string, subnet?: string, securityGroupMaster?: string, securityGroupWorker?: string, securityGroupCompute?: string) {
        await this.setAdvancedTemplate();
        await this.generalConfiguration(credentialName, clusterName);
        await this.clickNextOnPage('app-general-configuration');
        await this.selectBaseImage();
        await this.clickNextOnPage('app-image-catalog');
        await this.clickNextOnPage('app-hardware-and-storage');
        await this.clickNextOnPage('app-config-cluster-extensions');
        await this.clickNextOnPage('app-config-external-sources');
        await this.disableGatewayTopology();
        await this.clickNextOnPage('app-gateway-configuration');
        await this.clickNextOnPage('app-network');
        await this.security(user, password, sshKeyName);

        return await this.createButton.click();
    }
}
