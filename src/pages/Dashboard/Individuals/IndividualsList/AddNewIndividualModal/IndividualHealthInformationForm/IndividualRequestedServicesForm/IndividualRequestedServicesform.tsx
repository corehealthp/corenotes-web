import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./individualrequestedservicesform.module.css";
import { useEffect, useState } from "react";
import { DropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
// import InputField from "src/components/FormComponents/InputField";
// import { formFieldType } from "src/components/FormComponents/FormWrapper/types";
// import { ReactComponent as IconAdd } from "src/assets/icons/icon-plus-circle.svg"
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel-circle.svg"
import { useIndividualState } from "src/features/Individual/state";
import { useFetchCompartmentList } from "src/features/compartment/selector";

export default function IndividualRequestedServicesForm() {

    const [, setIndividualState] = useIndividualState();

    const compartmentServicesResponse = useFetchCompartmentList(1);

    

    const [serviceTemplate, setServiceTemplate] = useState<{
        id:number, 
        service:DropDownFormData, 
        // startDate:formFieldType
    }>({
        id: 1,
        service: {
            name:'all-services',
            label: '',
            placeholder: 'Select a service',
            error:'',
            selected: false,
            selectedOptionIndex: 0,
            options:[]
        },
        // startDate: {
        //     type: 'date',
        //     placeholder:'Start date',
        //     value: '',
        //     error: '',
        //     validated: false
        // }
    })

    useEffect(()=> {
        setServiceTemplate(state => ({
            ...state,
            service: {
                ...state.service,
                options: compartmentServicesResponse.list.compartments.map( service => ({
                    id:service.id,
                    label:service.title,
                    value:service.id
                }))
            }
        }))

        setRequestedServices(()=> ([
            {
                id: 1,
                service: {
                    name:'all-services',
                    label: '',
                    placeholder: 'Select a service',
                    error:'',
                    selected: false,
                    selectedOptionIndex: 0,
                    options: compartmentServicesResponse.list.compartments.map(service => ({
                        id:service.id,
                        label:service.title,
                        value:service.id
                    }))
                },
                startDate: {
                    type: 'date',
                    placeholder:'Start date',
                    value: '',
                    error: '',
                    validated: false
                }
            }
        ]))

    }, [compartmentServicesResponse.list.compartments])

    const [requestedServices, setRequestedServices] = useState<Array<{
        id:number, 
        service:DropDownFormData, 
        // startDate:formFieldType
    }>>([
        {
            id: 1,
            service: {
                name:'all-services',
                label: '',
                placeholder: 'Select a service',
                error:'',
                selected: false,
                selectedOptionIndex: 0,
                options:[]
            },
            // startDate: {
            //     type: 'date',
            //     placeholder:'Start date',
            //     value: '',
            //     error: '',
            //     validated: false
            // }
        }
    ])

    function selectOption(optionIndex:number, requestedServiceId:number) {
        const currentRequestedService = requestedServices.filter(requestedService => requestedService.id === requestedServiceId)[0];
        currentRequestedService.service.selectedOptionIndex = optionIndex;
        currentRequestedService.service.selected = true;
        currentRequestedService.service.value = currentRequestedService.service.options[optionIndex];

        const currentRequestedServiceIndex = requestedServices.findIndex(requestedService => requestedService.id === requestedServiceId )
        requestedServices[currentRequestedServiceIndex] = currentRequestedService;
        setRequestedServices([...requestedServices])

        submitRequestedService()
    }

    // function setDate(selectedDate:string, requestedServiceId:number) {
    //     const currentRequestedService = requestedServices.filter(requestedService => requestedService.id === requestedServiceId)[0];
    //     currentRequestedService.startDate.value = selectedDate;

    //     if(!currentRequestedService.startDate.value) {
    //         currentRequestedService.startDate.error = 'Field cannot be empty';
    //     } else {
    //         currentRequestedService.startDate.validated = true;
    //     }

    //     const currentRequestedServiceIndex = requestedServices.findIndex(requestedService => requestedService.id === requestedServiceId )
    //     requestedServices[currentRequestedServiceIndex] = currentRequestedService;
    //     setRequestedServices([...requestedServices])

    //     submitRequestedService()
    // }

    // function addNewRequestedService() {
    //     if(serviceTemplate.service.options.length && requestedServices.length < compartmentServicesResponse.list.compartments.length) {
    //         serviceTemplate.id = requestedServices.length + 1;

    //         // remove option[optionIndex] from serviceTemplate
    //         const newOptions:DropDownOption[] = [];

    //         serviceTemplate.service.options.forEach(option => {
    //             requestedServices.forEach(requestedService => {
    //                 if(requestedService.service.value?.value !== option.value) {
    //                     newOptions.push(option)
    //                 }
    //             })
    //         })

    //         // reset all existing service fields that haven't been selected with new options

    //         setRequestedServices([...requestedServices, serviceTemplate])
    //     }
    // }

    function removeRequestedService(id:number) {
        const currentRequestedServiceIndex:number = requestedServices.findIndex(requestedService => requestedService.id === id)
        const currentRequestedServiceOptions = requestedServices[currentRequestedServiceIndex].service.options;

        setServiceTemplate({
            ...serviceTemplate,
            service: {
                ...serviceTemplate.service,
                options: [...currentRequestedServiceOptions]
            }
        })

        requestedServices.forEach(service => {
            service.service.options = currentRequestedServiceOptions  
        })
        requestedServices.splice(currentRequestedServiceIndex, 1);
        setRequestedServices([...requestedServices])
    }

    function submitRequestedService() {
        const selectedServices:{
            service:string,
            // startDate:string
        }[] = requestedServices
        .filter(
            service => service.service.selected 
            // && service.startDate.validated
            )
        .map((requestedService)=> {
            return {
                service: requestedService.service.value?.value ?? "",
                // startDate: requestedService.startDate.value
            }
        })

        setIndividualState(state => {
            return {
                ...state,
                newIndividual: {
                    ...state.newIndividual,
                    requestedServices: selectedServices,
                    // compartment: null,
                    // subCompartmentId: null
                }
            }
        })
        
        console.log(selectedServices)
    }



    return (
        <FormWrapper extraStyles={styles.individual_requested_services_form}>
            {/* <div className={styles.heading}>
                <div className={styles.number_circle}>3</div>
                <div className={styles.text}>Requested Services</div>

                {
                    serviceTemplate.service.options.length
                    && requestedServices.length < compartmentServicesResponse.compartmentServices.length
                    ?   <div 
                            className={styles.add_new_service} 
                            onClick={()=> addNewRequestedService()}
                        >
                            <IconAdd className={styles.icon_add} />
                            <div className={styles.text}>Add a service</div>
                        </div>
                    :   null
                }
            </div> */}

            <div className={styles.form_content}>
                {
                    requestedServices?.map(({ 
                        id, 
                        service, 
                        // startDate 
                    }, index)=> {
                        return (
                            <div 
                                key={id}
                                className={styles.requested_service}
                            >
                                <DropDownField
                                    width={"65%"}
                                    height={"60px"}
                                    label={service.label}
                                    placeholder={service.placeholder}
                                    options={service.options}
                                    error={service.error}
                                    selected={service.selected}
                                    selectedOptionIndex={service.selectedOptionIndex}
                                    onSelect={(optionIndex: number) => selectOption(optionIndex, id)} 
                                />

                                {/* <InputField
                                    inputContainer={"30%"}
                                    type={startDate.type}
                                    placeholder={startDate.placeholder}
                                    value={startDate.value}
                                    error={startDate.error}
                                    onInput={(value:string)=> setDate(value, id)}
                                /> */}
                                
                                {
                                    index === 0 
                                    ?   <div className={styles.cancel_icon} />
                                    :   <IconCancel 
                                            className={styles.cancel_icon} 
                                            onClick={()=> removeRequestedService(id)}
                                        />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </FormWrapper>
    )
}