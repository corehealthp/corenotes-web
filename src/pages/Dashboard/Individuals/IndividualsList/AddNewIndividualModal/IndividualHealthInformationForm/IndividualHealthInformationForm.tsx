// import { Suspense } from "react";
import styles from "./individualhealthinformation.module.css"
import IndividualAllergiesInformationForm from "./IndividualAllergiesInformation/IndividualAllergiesInformation";
import IndividualDietInformationForm from "./IndividualDietInformationForm/IndividualDietInformation";
// import IndividualRequestedServicesForm from "./IndividualRequestedServicesForm/IndividualRequestedServicesform";
import IndividualCompartmentForm from "./IndividualCompartmentForm";
// import ComponentLoader from "src/components/Loaders/ComponentLoader";

export default function IndividualHealthInformationForm({userState,setIndividuals}:any) {
	return (
		<div className={styles.health_information}>
			<IndividualCompartmentForm removeLabel={false} userState={userState} setIndividuals={setIndividuals} />
			{/* <Suspense fallback={<ComponentLoader />}>
				<IndividualRequestedServicesForm />
			</Suspense> */}
			<IndividualDietInformationForm userState={userState} setIndividuals={setIndividuals}/>
			<IndividualAllergiesInformationForm userState={userState} setIndividuals={setIndividuals}/>
			
		</div>
	);
}