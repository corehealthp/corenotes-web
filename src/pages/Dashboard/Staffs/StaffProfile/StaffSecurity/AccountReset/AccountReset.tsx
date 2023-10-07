import styles from "./accountreset.module.css";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useState } from "react";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { updateStaffPasswordAction } from "src/features/staff/actions";
import { useStaffState } from "src/features/staff/state";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import { InitState } from "src/features/state";
import { successResponseType } from "src/lib/types";
import { useParams } from "react-router-dom";

export default function AccountReset() {

    const params = useParams();

    const [staffState] = useStaffState()
    const [updatePasswordState, setUpdatePasswordState] = useState(staffState)

    const [newStaffPassword, setNewStaffPassword] = useState<formFieldType>({
        type:'password',
        label:'Enter new password',
        placeholder: 'Enter new Password',
        value: '',
        error: '',
        validated: false
    })

    const [confirmNewStaffPassword, setConfirmNewStaffPassword] = useState<formFieldType>({
        type:'password',
        label:'Confirm new password',
        placeholder: 'Confirm new Password',
        name: 'confirm-password',
        value: '',
        error: '',
        validated: false
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        validateForm()
    }
    
    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
            return
        }

        if(updatedInputModel.name === 'confirm-password') {
            if(updatedInputModel.value !== newStaffPassword.value) {
                updatedInputModel.validated = false;
                updatedInputModel.error = "Password doesn't match"
                return false
            }
        }

        updatedInputModel.validated = true;
        updatedInputModel.error = "";
        return
    }   

    const [isFormValid, setIsFormValid] = useState(false);

    function validateForm() {
        if(!newStaffPassword.validated) {
            setIsFormValid(false)
            return false
        }
        if(!confirmNewStaffPassword.validated) {
            setIsFormValid(false)
            return false
        }

        setIsFormValid(true)
        return true
    }

    function saveNewPassword() {
        const payload = {
            newPassword: newStaffPassword.value!
        }

        setUpdatePasswordState(state => {
            return {
                ...state,
                error: false,
                status: 'LOADING',
                message: ''
            }
        })

        updateStaffPasswordAction(params.staffId!, payload)
        .then((response:successResponseType)=> {
            setUpdatePasswordState(state => {
                return {
                    ...state,
                    error: false,
                    status: 'SUCCESS',
                    message: response.message
                }
            })
        })
        .catch((error)=> {
            setUpdatePasswordState(state => {
                return {
                    ...state,
                    error: true,
                    status: 'FAILED',
                    message: error.message
                }
            })
        })
    }

    return (
        <div className={styles.account_reset}>
            <div className={styles.left}>
                <div className={styles.heading}>Account reset</div>
                <div className={styles.sub_heading}>Manage staff accounts</div>
            </div>
            <FormWrapper 
                state={updatePasswordState}
                resetState={()=> setUpdatePasswordState({...updatePasswordState, ...InitState})}
                extraStyles={styles.right}
            >
                <PasswordInputField 
                    placeholder={newStaffPassword.placeholder}
                    error={newStaffPassword.error}
                    onInput={(value: string) => setInput(value, newStaffPassword, setNewStaffPassword)} 
                />

                <PasswordInputField 
                    placeholder={confirmNewStaffPassword.placeholder}
                    error={confirmNewStaffPassword.error}
                    onInput={(value:string)=> setInput(value, confirmNewStaffPassword, setConfirmNewStaffPassword)}
                />

                <PrimaryTextButton 
                    label="Save"
                    isLoading={updatePasswordState.status === 'LOADING'}
                    disabled={!isFormValid}
                    clickAction={()=> saveNewPassword()}
                />
            </FormWrapper>
        </div>
    )
}