import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./uploaddocmodal.module.css"
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg"
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useState } from "react";
import InputField from "src/components/FormComponents/InputField";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import DocumentUploader from "src/components/FileComponents/DocumentUploader";
import JSONToFormData from "src/utils/JSONToFormData";
import { uploadStaffDocumentAction } from "src/features/staff/actions";
import { useParams } from "react-router-dom";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useStaffState } from "src/features/staff/state";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function UploadDocModal({closeModal}:{closeModal:()=> void}) {

    const params = useParams()

    const [staffState, setStaffState] = useStaffState()
    const [uploadStaffDocState, setUploadStaffDocState] = useState(staffState);

    const [isFormValid, setIsFormValid] = useState(false);

    const [docTitleModel, setDocTitleModel] = useState<formFieldType>({
        type:'text',
        label:'Document Title',
        placeholder: 'Document Title',
        value:'',
        error:'',
        validated:false
    })

    const [docTypeModel, setDocTypeModel] = useState<DropDownFormData>({
        label:'Document Type',
        options: [
            {
                id: 'pdf',
                label: 'PDF',
                value: '.pdf'
            },
            {
                id: 'word',
                label: 'Word (DOC / DOCX)',
                value: '.doc, .docx'
            },
            {
                id: 'xls',
                label: 'Excel (XLS / XLSX / CSV)',
                value: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            },
            {
                id: 'pptx',
                label: 'Powerpoint (PPT / PPTX)',
                value: '.ppt, .pptx'
            },
            {
                id:'text',
                label: 'TEXT (txt)',
                value: 'text/plain, .txt'
            }
        ],
        value: {
            id: 'pdf',
            label: 'PDF',
            value: '.pdf'
        },
        selected: true,
        selectedOptionIndex: 0,
        error: '',
        name: "document-type"
    })

    const [docDateModel, setDocDateModel] = useState<formFieldType>({
        type:'date',
        label:'Date created',
        placeholder: 'Date created',
        value:'',
        error:'',
        validated:false
    })

    const [docFileNameModel, setDocFileNameModel] = useState<formFieldType>({
        placeholder:'File Name',
        value:'',
        error:'',
        readonly: true,
        validated:false
    })
    
    const [docFileModel, setDocFileModel] = useState<formFieldType>({
        placeholder:'Document File',
        value:'',
        error:'',
        validated:false
    })

    function saveFile(file:File, name:string) {
        if(file) {
            setDocFileModel(state => {
                return {
                    ...state,
                    file: file,
                    validated: true
                }
            })

            setDocFileNameModel(state => {
                return {
                    ...state,
                    value: name,
                    validated: true
                }
            })

            validateForm(file)
        }
    }

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        validateForm()
    }

    const selectOption =(selectedIndex:number, model:DropDownFormData, setModel:setDropDownFormData)=> {
        model.value = model.options[selectedIndex];
        model.selected = true;
        model.selectedOptionIndex = selectedIndex;

        setModel({...model})
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
            return
        }

        updatedInputModel.validated = true;
        updatedInputModel.error = "";
        return
    }

    function validateForm(file?:File) {
        if( !docTitleModel.validated ||
            !docTypeModel.selected ||
            !docDateModel.validated ||
            !docFileModel.validated && !file
        ) {
            setIsFormValid(false)
            return false
        }

        setIsFormValid(true)
        return true
    }

    function uploadDocument() {
        if(validateForm()) {
            const payload = {
                docTitle: docTitleModel.value,
                docType: docTypeModel.value?.label,
                docDate: docDateModel.value,
                staffDocFile: docFileModel.file,
                docFileName: docFileNameModel.value
            }

            setUploadStaffDocState(state => {
                return {
                    ...state,
                    status: 'LOADING'
                }
            })

            JSONToFormData(payload)
            .then((payloadFormData:FormData)=> {
                uploadStaffDocumentAction(params.staffId!, payloadFormData)
                .then((response)=> {
                    setUploadStaffDocState(state => {
                        return {
                            ...state,
                            status: 'SUCCESS',
                            message:"Staff document saved successfully",
                            error: false
                        }
                    })
                    createGlobalFeedback("success", response.message);

                    setStaffState(state => {
                        return {
                            ...state,
                            documents: response.data
                        }
                    })
                })
                .catch(()=> {
                    setUploadStaffDocState(state => {
                        return {
                            ...state,
                            status: 'FAILED',
                            error: true,
                            message:"There was an error uploading staff document"
                        }
                    })
                })
            })
            .catch((error)=> {
                setUploadStaffDocState(state => {
                    return {
                        ...state,
                        status: 'FAILED'
                    }
                })
                console.log(error)
            }).finally(()=>{
                setTimeout(() => {
                    closeModal();
                  },2000);
            })
        }
    }

    return (
        <ModalContainer>
            <div className={styles.upload_doc_container}>
                <FormStateModal 
                    status={staffState.status}
                    error={uploadStaffDocState.error}
                    message={uploadStaffDocState.message}
                    reset={()=> setStaffState(state => ({ ...state, status:'IDLE' }))} 
                />

                <div className={styles.top_section}>
                    <div className={styles.heading}>Upload new document</div>
                    <IconCancelCircle 
                        className={styles.icon_cancel}
                        onClick={()=> staffState.status === 'LOADING' ?()=>({}) :closeModal() }
                    />
                </div>

                <div className={styles.form_section}>
                    <InputField 
                        type={docTitleModel.type}
                        placeholder={docTitleModel.placeholder}
                        value={docTitleModel.value}
                        error={docTitleModel.error} 
                        onInput={(inputValue:string) => setInput(inputValue, docTitleModel, setDocTitleModel)}
                    />

                    <div className={styles.row}>
                        <DropDownField
                            label={""}
                            options={docTypeModel.options}
                            selected={docTypeModel.selected}
                            selectedOptionIndex={docTypeModel.selectedOptionIndex}
                            error={docTypeModel.error}
                            onSelect={(selectedOptionIndex:number)=> selectOption(selectedOptionIndex, docTypeModel, setDocTypeModel)}
                        />

                        <InputField
                            type={docDateModel.type}
                            placeholder={docDateModel.placeholder}
                            value={docDateModel.value}
                            error={docDateModel.error} 
                            onInput={(inputValue:string) => setInput(inputValue, docDateModel, setDocDateModel)}
                        />
                    </div>

                    <DocumentUploader
                        id={"staff-docs"}
                        fileType={docTypeModel.value?.value}
                        saveDoc={({uploadedFile, fileName})=> saveFile(uploadedFile, fileName)}
                    />
                </div>

                <div className={styles.action_buttons}>
                    <FadedBackgroundButton 
                        label={"Cancel"}
                        backgroundColor={"var(--blue-accent-faded-100)"}
                        labelColor={"var(--blue-accent-100)"}
                        width="20%" 
                        action={()=> staffState.status === 'LOADING' ?null :closeModal()}
                    />

                    <PrimaryTextButton
                        isLoading={uploadStaffDocState.status === 'LOADING'}
                        disabled={!isFormValid}
                        width={"20%"}
                        label={"Save"}
                        backgroundColor="green"

                        clickAction={()=> {uploadDocument()}}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}