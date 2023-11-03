import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "../individualhealthinformation.module.css"
import { useEffect, useState } from "react";
import { useSetIndividualState } from "src/features/Individual/state";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { useFetchCompartmentList } from "src/features/compartment/selector";
import { useCompartmentState } from "src/features/compartment/state";
import { getCompartmentDetails } from "src/features/compartment/action";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function IndividualCompartmentForm({ removeLabel }: { removeLabel: boolean }) {

	const setIndividualState = useSetIndividualState();

	const [compartmentState, setCompartmentState] = useCompartmentState();

	const fetchCompartmentListReponse = useFetchCompartmentList(compartmentState.currentListPage);

	useEffect(() => {
		setCompartmentState((state) => ({
			...state,
			compartmentsList: fetchCompartmentListReponse.list.compartments,
			currentListPage: fetchCompartmentListReponse.list.currentListPage,
			totalListPages: fetchCompartmentListReponse.list.totalListPages,
		}));

		setCompartmentModel((state) => ({
			...state,
			options: compartmentState.compartmentsList.map((compartment) => ({
				id: compartment.id,
				label: `${compartment.title} (${compartment.subCompartmentsCount} - subcompartments)`,
				value: compartment.compartmentId.toString(),
			})),
		}));
	}, [compartmentState.compartmentsList, fetchCompartmentListReponse, setCompartmentState]);

	const [compartmentModel, setCompartmentModel] = useState<DropDownFormData>({
		label: "",
		name: "compartment",
		placeholder: "Select compartment",
		relative: true,
		error: "",
		options: [],
		selected: false,
		selectedOptionIndex: 0,
	});

	const [subCompartmentModel, setSubCompartmentModel] = useState<DropDownFormData>({
		label: "",
		name: "sub-compartment",
		placeholder: "Select sub compartment",
		relative: true,
		error: "",
		options: [],
		selected: false,
		selectedOptionIndex: 0,
	});

	function selectOption(optionIndex: number, model: DropDownFormData, setModel: setDropDownFormData) {

		model.value = model.options[optionIndex];
		model.selected = true; 					 
		model.selectedOptionIndex = optionIndex;
		setModel({ ...model });

		if(model.name === "compartment") {
			setIndividualState((state) => ({
				...state,
				newIndividual: {
					...state.newIndividual,
					compartment: model.value!.id,
					compartmentId: parseInt(model.value!.value!),
				},
			}));

			const compartment = compartmentState.compartmentsList.filter((compartment) => compartment.id === model.value!.id);
			
			if(compartment[0]) { 
				getCompartmentDetails(compartment[0].compartmentId)
				.then((response)=> {
					setSubCompartmentModel(state => ({
						...state,
						selected: false,
						options: response.data.compartment.subCompartments.map((subCompartment)=> ({
							id: subCompartment.id,
							label: subCompartment.title,
							value: subCompartment.id
						}))
					}));
				})
				.catch((error)=> createGlobalFeedback("error", error.message))
			}
		}

		if(model.name === "sub-compartment") {
			setIndividualState((state) => ({
				...state,
				newIndividual: {
					...state.newIndividual,
					subCompartmentId: model.value!.id
				},
			}));
		}
	}

	return (
		<FormWrapper extraStyles={styles.staff_personal_information_form}>
			{	removeLabel 
				? 	<div></div>
				: 	<div className={styles.heading}>
						<div className={styles.number_circle}>2</div>
						<div className={styles.text}>Compartment</div>
					</div>
			}

			<div className={removeLabel ? "" : styles.form_content}>
				<div className={styles.row}>
					<DropDownField
						width={"100%"}
						label={compartmentModel.label!}
						placeholder={compartmentModel.placeholder}
						options={compartmentModel.options}
						error={compartmentModel.error}
						selected={compartmentModel.selected}
						selectedOptionIndex={compartmentModel.selectedOptionIndex}
						onSelect={(optionIndex: number) => selectOption(optionIndex, compartmentModel, setCompartmentModel)}
					/>

					{
						<DropDownField
							width={"100%"}
							label={subCompartmentModel.label!}
							placeholder={subCompartmentModel.placeholder}
							options={subCompartmentModel.options}
							error={subCompartmentModel.error}
							selected={subCompartmentModel.selected}
							selectedOptionIndex={subCompartmentModel.selectedOptionIndex}
							onSelect={(optionIndex: number) => selectOption(optionIndex, subCompartmentModel, setSubCompartmentModel)}
						/>
					}
				</div>
			</div>
		</FormWrapper>
	);
}