import { HiddenForm } from './IndividualAccordionItem';
import IndividualRequestedServicesForm from '../AddNewIndividualModal/IndividualHealthInformationForm/IndividualRequestedServicesForm';
import IndividualDietInformationForm from '../AddNewIndividualModal/IndividualHealthInformationForm/IndividualDietInformationForm';
import IndividualAllergiesInformationForm from '../AddNewIndividualModal/IndividualHealthInformationForm/IndividualAllergiesInformation';
import AddAccordionGroup from './AddAccordionGroup';
import IndividualPersonalInformationForm from '../AddNewIndividualModal/IndividualPersonalInformationForm';
// import { useIndividualState } from 'src/features/Individual/state';
import React, { Suspense } from 'react';
import ComponentLoader from 'src/components/Loaders/ComponentLoader';
import MedicallyFrailForm from './MedicallyFrail/MedicallyFrailForm';
import FunctionalLimitationSpecialNeedsForm from './FunctionalLimitationSpecialNeeds/FunctionalLimitationSpecialNeedsForm';
import FrequencyDischargePlanForm from './FrequencyDischargePlan/FrequencyDischargePlanForm';
import IndividualInsuranceForm from './IndividualInsuranceForm/IndividualInsuranceForm';

interface AddNewIndividualModalAccordionProps {
    userState: any
}

const AddNewIndividualModalAccordion:React.FC<AddNewIndividualModalAccordionProps> 
= ({
    userState
}) => 
{
//     const [individualState, setIndividualState] = useIndividualState();
//     const [isFormValid, setIsFormValid] = useState(false);

//     const userState = individualState.newIndividual!;

    
//   useEffect(() => {
//     validateForm();
//   }, [individualState.newIndividual, validateForm]);

//   function validateForm() {
//     if (
//       !individualState.newIndividual.firstname ||
//       !individualState.newIndividual.lastname ||
//       !individualState.newIndividual.dob ||
//       !individualState.newIndividual.gender ||
//       !individualState.newIndividual.ssn ||
//       !individualState.newIndividual.contact.name ||
//       !individualState.newIndividual.contact.email ||
//       !individualState.newIndividual.contact.phoneNumber ||
//       !individualState.newIndividual.weight ||
//       !individualState.newIndividual.compartment ||
//       // !individualState.newIndividual.subCompartmentId ||
//       !individualState.newIndividual.insurance ||
//       !individualState.newIndividual.insurance_no ||
//       !individualState.newIndividual.maritalStatus ||
//       !individualState.newIndividual.codeAlert.length ||
//       !individualState.newIndividual.requestedServices.length ||
//       !individualState.newIndividual.diet.length ||
//       !individualState.newIndividual.allergies.food.length ||
//       !individualState.newIndividual.allergies.med.length ||
//       !individualState.newIndividual.allergies.other.length
//     ) {
//       setIsFormValid(false);
//       return false;
//     } else {
//       setIsFormValid(true);
//       return true;
//     }
//   }

    const hiddenForm: HiddenForm[] = [
        {index: 1, label: 'Personal Information', value: <IndividualPersonalInformationForm userState={userState} /> },
        // {index: 2, label: 'Insurance Information', value: <IndividualInsuranceForm />},
        {index: 2, label: 'Requested Services', value: <Suspense fallback={<ComponentLoader />}>
				<IndividualRequestedServicesForm />
			</Suspense> },
        {index: 3, label: 'Diet', value: <IndividualDietInformationForm /> },
        {index: 4, label: 'Allergies', value: <IndividualAllergiesInformationForm /> },
        {index: 5, label: 'Medically Frail', value: <MedicallyFrailForm />},
        {index: 6, label: 'Functional Limitation or Special Needs', value: <FunctionalLimitationSpecialNeedsForm /> },
        {index: 7, label: 'Service Frequency and Discharge Plan', value: <FrequencyDischargePlanForm /> }
    ];
  return (
    <AddAccordionGroup hiddenForms={hiddenForm} />
  )
}

export default AddNewIndividualModalAccordion