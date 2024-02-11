import DateRangeField from "src/components/FormComponents/DateRangeField/DateRangeField";
import StaffProfileHeader from "../StaffProfileHeader";
import styles from "./staffreports.module.css";
import { useState } from "react";
import { RadioButtonFormFieldType } from "src/components/FormComponents/RadioButtonField/types";
import RadioButtonField from "src/components/FormComponents/RadioButtonField";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useStaffState } from "src/features/staff/state";
import FormWrapper from "src/components/FormComponents/FormWrapper";

export default function StaffReports() {
    
    const [staffState] = useStaffState()
    const [printReportStaffState, setPrintReportStaffState] = useState(staffState)

    const [dateRange, setDateRange] = useState({
        start:'',
        end: '',
        validated: false
    })

    const [resultFileFormatModel, setResultFileFormatModel] = useState<RadioButtonFormFieldType>({
        label: '',
        options: [
            {
                label: 'PDF',
                value:'pdf',
            }
        ],
        value: 'pdf',
        selected: true,
        selectedIndex: 0,
        error: ''
    })

    function setOptionValue(optionIndex:number) {
        setResultFileFormatModel(state => {
            return {
                ...state,
                value: resultFileFormatModel.options[optionIndex].value,
                selected: true,
                selectedIndex: optionIndex
            }
        })

        validateForm()
    }

    const [reportTitleModel, setReportTitleModel] = useState<DropDownFormData>({
        placeholder: 'Report Title',
        options: [
            {
                id: 'report',
                label: 'Report',
                value: 'report'
            }
        ],
        selected: false,
        selectedOptionIndex: 0,
        error: '',
        name: "report-title"
    }) 

    function selectOption (optionIndex:number, dropDownModel:DropDownFormData, setDropDownModel:setDropDownFormData) {
        const selectedOption = dropDownModel.options[optionIndex];
        dropDownModel.value = selectedOption;
        dropDownModel.selected = true;
        dropDownModel.selectedOptionIndex = optionIndex;
        
        setDropDownModel({...dropDownModel});

        validateForm()
    }

    const [isFormValidated, setIsFormValidated] = useState(false)

    function validateForm() {
        if(!dateRange.validated) {
            setIsFormValidated(false)
            return false;
        }
        if(!resultFileFormatModel.selected) {
            setIsFormValidated(false)
            return false;
        }
        if(!reportTitleModel.selected) {
            setIsFormValidated(false)
            return false;
        }

        setIsFormValidated(true)
        return true;
    }

    function createReport() {
        if(validateForm()) {
            const payload = {
                dateRange: {
                    start: dateRange.start,
                    end: dateRange.end
                },
                resultFileFormat: resultFileFormatModel.value,
                reportTitle: reportTitleModel.value?.value
            }

            setPrintReportStaffState(state => {
                return {
                    ...state,
                    error: true,
                    message: 'There was an error',
                    status: 'FAILED'
                }
            })

            console.log(payload)
        }
    }

    return (
        <div className={styles.staff_reports}>
            <StaffProfileHeader />

            <FormWrapper 
                extraStyles={styles.reports_body}
                state={printReportStaffState}
                dontShowSuccess={true}
                resetState={()=> setPrintReportStaffState({...printReportStaffState, error:false, status:'IDLE'})}
            >
                <div className={styles.results_filter}>
                    <DateRangeField
                        onSelect={(dateRange)=> setDateRange({...dateRange, validated: true})}
                    />

                    <RadioButtonField
                        label={resultFileFormatModel.label}
                        options={resultFileFormatModel.options}
                        selected={resultFileFormatModel.selected}
                        selectedIndex={resultFileFormatModel.selectedIndex}
                        selectOption={(optionIndex:number)=> setOptionValue(optionIndex)}
                    />
                
                </div>

                <div className={styles.report_category}>
                    <div className={styles.label}>Staff activities</div>
                </div>

                <DropDownField 
                    extraStyle={styles.report_title_field}
                    placeholder={reportTitleModel.placeholder}
                    options={reportTitleModel.options}
                    error={reportTitleModel.error}
                    selected={reportTitleModel.selected}
                    selectedOptionIndex={reportTitleModel.selectedOptionIndex}
                    onSelect={(optionIndex:number)=> selectOption(optionIndex, reportTitleModel, setReportTitleModel)}
                />

                <div className={styles.buttons_section}>
                    <PrimaryTextButton 
                        disabled={true}
                        label="Send as email"
                        width="25%"
                        backgroundColor={"var(--dark-blue-accent-200)"}
                        clickAction={()=> console.log('')}
                    />

                    <PrimaryTextButton 
                        disabled={!isFormValidated}
                        isLoading={printReportStaffState.status === 'LOADING'}
                        width="25%"
                        label="Print report"
                        backgroundColor="green"

                        clickAction={()=> createReport()}
                    />
                </div>
            </FormWrapper>
        </div>
    )
}