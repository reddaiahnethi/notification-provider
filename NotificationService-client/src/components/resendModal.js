// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {Dialog,DialogFooter,DialogType,PrimaryButton,DefaultButton, ProgressIndicator, mergeStyleSets} from 'office-ui-fabric-react';
import {resendEmailService} from "../services";
import React, {useState} from 'react';

const resendStyles = new mergeStyleSets({
    greenText:{
        color:'green'
    },
    redText:{
        color:'red'
    }

});
export default function ResendModal (props) {
    var selectedItems = props.selectedItem?props.selectedItem:[];
    var applicationName = props.applicationName;
    var notificationIds = [];
    const [resendStatus, setResendStatus] = useState("");
    selectedItems.forEach(e=>notificationIds.push(e.notificationId));

    const toggleResendDialog = () => {
        props.toggleHideDialog();
        setResendStatus("");
    };
    
    const resendEmail = (e) => {
        if(notificationIds.length>0)
            resendEmailService(applicationName, notificationIds).then((res)=>{
                setResendStatus("Success");
            }).catch(e=>
                setResendStatus("failed"));
            }
    return (
        <Dialog 
            hidden={props.hideDialog} 
            onDismiss={toggleResendDialog}
            dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Resend Emails',
                    subText: 'The following notification ids will be re-queued for resend:'
            }}>
            {notificationIds?.join(" , ")}
            <br/>
            <br/>
            {resendStatus.length >0 ? resendStatus === 'Success' ? <div className={resendStyles.greenText}>Resend Successful</div> : <div className={resendStyles.redText}>Resend Failed</div> : ""}
            <DialogFooter>
                <PrimaryButton onClick={resendEmail} text="Send" />
                <DefaultButton onClick={toggleResendDialog} text="Don't send" />
            </DialogFooter>
        </Dialog>
    )
}