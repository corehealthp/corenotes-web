import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./editstaffprofilemodal.module.css";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { staffInitState, useSetStaffState } from "src/features/staff/state";
import { useEffect, useState } from "react";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useFetchStaffRoleSelector } from "src/features/staff/selector";
import { updateStaffProfileAction } from "src/features/staff/actions";
import { useParams } from "react-router-dom";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { staffStateType } from "src/features/staff/types";

export default function EditStaffProfileModal({ staffState, closeModal }:{ 
	staffState:staffStateType;
	closeModal: () => void;
}) {
	const  setStaffState = useSetStaffState();

	const params = useParams();

	const staffRolesResponse = useFetchStaffRoleSelector(staffState.roles.currentPage);

	const [providerRoleModel, setProviderRoleModel] = useState<DropDownFormData>({
		name: "provider-role",
		placeholder: "Provider role",
		options: [],
		selected: false,
		selectedOptionIndex: 0,
		error: "",
	});

	function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
		model.value = model.options[optionIndex];
		model.selected = true;
		model.selectedOptionIndex = optionIndex;

		setModel({ ...model });
	}

	useEffect(() => {
		const currentStaffRole = staffRolesResponse.data.staffRoles.findIndex((role) => role?.title === staffState.details.work.providerRole);
		// console.log(currentStaffRole);

		setStaffState((state) => ({
			...state,
			status: "IDLE",
			error: staffRolesResponse.error,
			roles: {
				list: staffRolesResponse.data.staffRoles,
				currentPage: staffRolesResponse.data.currentPage,
				totalPages: staffRolesResponse.data.totalPages,
			},
		}));

		setProviderRoleModel((state) => ({
			...state,
			options: [
				...staffRolesResponse.data.staffRoles.map((role) => ({
					id: role.id,
					label: role.title,
					value: role.id,
				})),
			],
			selected: currentStaffRole > -1 ? true : false,
			selectedOptionIndex: currentStaffRole > -1 ? currentStaffRole : 0,
		}));
	}, [setStaffState, staffRolesResponse, staffState.details]);

	function submitStaffProfile() {
		const payload = {
			staffId: params.staffId!,
			providerRole: providerRoleModel.value!.value!,
		};

		setStaffState((state) => ({
			...state,
			status: "LOADING",
		}));

		updateStaffProfileAction(payload)
			.then((response) => {
				setStaffState((state) => ({
					...state,
					status: "SUCCESS",
					// details: response.data.staff,
					message: response.message,
					error: false,
				}));
			})
			.catch((error) => {
				setStaffState((state) => ({
					...state,
					status: "FAILED",
					details: staffInitState.details,
					message: error.message,
					error: false,
				}));
			});
	}

	function resetStaffState() {
		setStaffState((state) => ({
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
					status={staffState.status}
					error={staffState.error}
					message={staffState.message}
					reset={() => resetStaffState()}
				/>

				<div className={styles.header}>
					<div className={styles.title}>Edit Profile</div>
					<IconCancelCircle
						className={styles.icon_cancel}
						onClick={() =>
							staffState.status === "LOADING" ? () => ({}) : closeModal()
						}
					/>
				</div>
{/* 
				<div className={styles.registration_form_section}>
					<StaffPersonalInformationForm userState={userState} />
					<StaffWorkInformationForm userState={userState} />
				</div> */}

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
						isLoading={staffState.status === "LOADING"}
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