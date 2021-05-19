/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/ui/serverWidget'],
    /**
     * @param{log} log
     * @param{serverWidget} serverWidget
     */
    (log, serverWidget) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            let record = scriptContext.newRecord;
            if (scriptContext.type == scriptContext.UserEventType.VIEW) {
                if (record.getText('custbody_ordertype') == "Customer Collecting") {
                    let saleschannels = ["4", "5", "101", "7", "8", "6", "111"];
                    if (saleschannels.includes(record.getValue('custbody_itemfulfilment_saleschannel'))) {
                        log.debug(record.getText('custbody_ordertype'));
                        var hideFld = scriptContext.form.addField({
                            id: 'custpage_hide_buttons',
                            label: 'not shown - hidden',
                            type: serverWidget.FieldType.INLINEHTML
                        });
                        var scr = "";
                        scr += 'jQuery("#tbl_markpacked").hide();';
                        scr += 'jQuery("#tbl_secondarymarkpacked").hide();';
                        hideFld.defaultValue = "<script>jQuery(function($){require([], function(){" + scr + ";})})</script>"
                        log.debug("Function fired");
                    }
                }
            }
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
