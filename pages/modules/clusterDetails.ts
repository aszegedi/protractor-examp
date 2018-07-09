import { $ } from 'protractor';

export class ClusterDetails {
    public static terminateButton = $('.btn.btn-secondary.btn-terminate');

    static async forceTerminateCluster() {
        const confirmationYesButton = $('.modal-window-footer.clear-right button.btn.btn-primary.pull-right.text-uppercase');
        const forceTermination = $('app-delete-stack-dialog mat-checkbox');
        const forceTerminationLabel = forceTermination.$('label');

        await this.terminateButton.click();
        await forceTerminationLabel.click();
        await confirmationYesButton.click();
    }
}