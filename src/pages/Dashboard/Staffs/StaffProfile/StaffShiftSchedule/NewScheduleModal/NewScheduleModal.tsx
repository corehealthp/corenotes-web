import styles from "./newschedulemodal.module.css"
import ModalContainer from "src/components/Modal/ModalContainer"
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import RowContainer from "src/components/Layout/RowContainer";
import { convertDateTimeToUTC } from "src/utils/convertDateTimeToDateUTC";
import { useStaffState } from "src/features/staff/state";
import { addNewShiftScheduleAction } from "src/features/staff/actions";
import { useParams } from "react-router-dom";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function NewScheduleModal({close}:{close:()=> void}) {
    
    const params = useParams();

    const [staffState, setStaffState] = useStaffState();

    const [scheduleDate, setScheduleDate] = useState<formFieldType>({
        type:"date",
        label:"Shift Date",
        value:"",
        error: "",
        validated: false
    });

    const [scheduleStartTime, setScheduleStartTime] = useState<formFieldType>({
        type:"time",
        label:"Shift time start",
        value:"",
        error: "",
        validated: false
    });

    const [scheduleEndTime, setScheduleEndTime] = useState<formFieldType>({
        type:"time",
        label:"Shift time end",
        value:"",
        error: "",
        validated: false
    });
    

    function setInput (inputValue:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = inputValue;
        validateModel(model);
        setModel({ ...model });

        validateForm();
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            return
        }

        updatedInputModel.validated = true;
        return
    }

    const [isFormValidated, setIsFormValidated] = useState(false);

    function validateForm() {
        if(!scheduleDate.validated) {
            setIsFormValidated(false);
            return false;
        }
        if(!scheduleStartTime.validated) {
            setIsFormValidated(false);
            return false;
        }
        if(!scheduleEndTime.validated) {
            setIsFormValidated(false);
            return false;
        }

        setIsFormValidated(true);
        return true;
    }

    function setScheduleForm() {
        if(validateForm()) {
            const payload = {
                startAt: convertDateTimeToUTC(scheduleDate.value, scheduleStartTime.value),
                endAt: convertDateTimeToUTC(scheduleDate.value, scheduleEndTime.value)
            }

            setStaffState(state => ({
                ...state,
                status: "LOADING"
            }))

            addNewShiftScheduleAction(params.staffId!, payload)
            .then((response)=> createGlobalFeedback("success", response.message))
            .catch((error)=> createGlobalFeedback("error", error.message))
            .finally(()=> setStaffState(state => ({ ...state, status: "IDLE" })))

        }
    }

    return (
        <ModalContainer>
            <div className={styles.new_schedule_modal}>
            
            <div className={styles.header}>
                <div className={styles.titiel}>Set new shift schedule</div>
                    <IconCancelCircle onClick={close} />
                </div>

                <div className={styles.body}>
                    <InputField 
                        type={scheduleDate.type}
                        label={scheduleDate.label}
                        error={scheduleDate.error}
                        onInput={(inputValue:string)=> setInput(inputValue, scheduleDate, setScheduleDate)}
                    />

                    <RowContainer alignment="top">
                        <InputField
                            type={scheduleStartTime.type}
                            label={scheduleStartTime.label}
                            error={scheduleStartTime.error}
                            onInput={(inputValue:string)=> setInput(inputValue, scheduleStartTime, setScheduleStartTime)}
                        />

                        <InputField 
                            type={scheduleEndTime.type}
                            label={scheduleEndTime.label}
                            error={scheduleEndTime.error}
                            onInput={(inputValue:string)=> setInput(inputValue, scheduleEndTime, setScheduleEndTime)}
                        />
                    </RowContainer>
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={staffState.status === "LOADING"}
                        disabled={!isFormValidated}
                        width={"20%"}
                        label="Submit"
                        backgroundColor="green"

                        clickAction={() => setScheduleForm()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}