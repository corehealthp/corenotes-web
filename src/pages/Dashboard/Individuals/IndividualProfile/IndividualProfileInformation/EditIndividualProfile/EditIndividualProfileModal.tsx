import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./editstaffprofilemodal.module.css";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { staffInitState } from "src/features/staff/state";
import { useState } from "react";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { updateStaffProfileAction } from "src/features/staff/actions";
import { useParams } from "react-router-dom";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import IndividualPersonalInformationForm from "../../../IndividualsList/AddNewIndividualModal/IndividualPersonalInformationForm";
import IndividualHealthInformationForm from "../../../IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm";
import { useIndividualState } from "src/features/Individual/state";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";

export default function EditStaffProfileModal({
	closeModal,
}: // userState,
{
	closeModal: () => void;
	// userState: object;
}) {
	const [individualState, setIndividualState] = useIndividualState();

	const params = useParams();

	// const staffRolesResponse = useFetchStaffRoleSelector(
	// 	staffState.roles.currentPage
	// );

	const [providerRoleModel, setProviderRoleModel] = useState<DropDownFormData>({
		name: "provider-role",
		placeholder: "Provider role",
		options: [],
		selected: false,
		selectedOptionIndex: 0,
		error: "",
	});

	function selectOption(optionIndex: number, model: DropDownFormData, setModel:setDropDownFormData) {
		model.value = model.options[optionIndex];
		model.selected = true;
		model.selectedOptionIndex = optionIndex;

		setModel({ ...model });
	}

	// useEffect(() => {
	// 	const currentStaffRole = staffRolesResponse.data.staffRoles.findIndex(
	// 		(role) => role?.title === individualState.profile.work.providerRole
	// 	);
	// 	// console.log(currentStaffRole);

	// 	setIndvidualState((state) => ({
	// 		...state,
	// 		status: "IDLE",
	// 		error: staffRolesResponse.error,
	// 		roles: {
	// 			list: staffRolesResponse.data.staffRoles,
	// 			currentPage: staffRolesResponse.data.currentPage,
	// 			totalPages: staffRolesResponse.data.totalPages,
	// 		},
	// 	}));

	// 	setProviderRoleModel((state) => ({
	// 		...state,
	// 		options: [
	// 			...staffRolesResponse.data.staffRoles.map((role) => ({
	// 				id: role.id,
	// 				label: role.title,
	// 				value: role.id,
	// 			})),
	// 		],
	// 		selected: currentStaffRole > -1 ? true : false,
	// 		selectedOptionIndex: currentStaffRole > -1 ? currentStaffRole : 0,
	// 	}));
	// }, [setIndividualState, staffRolesResponse, individualState.profile]);

	const userState = individualState.profile.personalInformation;

	function submitStaffProfile() {
		const payload = {
			staffId: params.staffId!,
			providerRole: providerRoleModel.value!.value!,
		};

		setIndividualState((state) => ({
			...state,
			status: "LOADING",
		}));

		updateStaffProfileAction(payload)
			.then((response) => {
				setIndividualState((state) => ({
					...state,
					status: "SUCCESS",
					// details: response.data.staff,
					message: response.message,
					error: false,
				}));
			})
			.catch((error) => {
				setIndividualState((state) => ({
					...state,
					status: "FAILED",
					details: staffInitState.details,
					message: error.message,
					error: false,
				}));
			});
	}

	function resetStaffState() {
		setIndividualState((state) => ({
			...state,
			status: "IDLE",
			message: "",
			error: false,
		}));
	}

	return (
		<ModalContainer>
			<div className={styles.edit_staff_profile}>
				<FormStateModal
					status={individualState.status}
					error={individualState.error}
					message={individualState.message}
					reset={() => resetStaffState()}
				/>

				<div className={styles.header}>
					<div className={styles.title}>Edit Profile</div>
					<IconCancelCircle
						className={styles.icon_cancel}
						onClick={() =>
							individualState.status === "LOADING" ? () => ({}) : closeModal()
						}
					/>
				</div>

				<div className={styles.registration_form_section}>
					<IndividualPersonalInformationForm userState={userState} />
					<IndividualHealthInformationForm />
				</div>

				<div className={styles.body}>
					<DropDownField
						placeholder={providerRoleModel.placeholder}
						options={providerRoleModel.options}
						selected={providerRoleModel.selected}
						selectedOptionIndex={providerRoleModel.selectedOptionIndex}
						error={providerRoleModel.error}
						onSelect={(optionIndex:number) => selectOption(optionIndex, providerRoleModel, setProviderRoleModel)}
					/>
				</div>

				<div className={styles.buttons}>
					<PrimaryTextButton
						isLoading={individualState.status === "LOADING"}
						disabled={!providerRoleModel.selected}
						width={"20%"}
						label="Submit"
						clickAction={() => submitStaffProfile()}
					/>
				</div>
			</div>
		</ModalContainer>
	);
}
