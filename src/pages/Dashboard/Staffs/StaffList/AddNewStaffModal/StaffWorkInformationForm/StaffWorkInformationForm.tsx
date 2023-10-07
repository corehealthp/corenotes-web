import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffworkinformationform.module.css"
import InputField from "src/components/FormComponents/InputField";
import { Suspense, useEffect, useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useStaffState } from "src/features/staff/state";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useFetchStaffRoleSelector } from "src/features/staff/selector";
import { INewStaffWorkInformation } from "src/features/staff/types";
import ComponentLoader from "src/components/Loaders/ComponentLoader";

export default function StaffWorkInformationForm({ onModified }:{ onModified:(newStaffDetails:INewStaffWorkInformation)=> void }) {
	
	const [staffState, setStaffState] = useStaffState();

	const staffRolesResponse = useFetchStaffRoleSelector(staffState.roles.currentPage);

	useEffect(() => {
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
		}));

	}, [setStaffState, staffRolesResponse]);

	const [providerRoleModel, setProviderRoleModel] = useState<DropDownFormData>({
		name: "provider-role",
		placeholder: "Provider role",
		options: [],
		selected: false,
		selectedOptionIndex: 0,
		error: "",
	});

	const [usernameModel, setUsernameModel] = useState<formFieldType>({
		type: "text",
		label: "Username",
		placeholder: "Username",
		value: "",
		error: "",
		validated: false,
	});

	const [scheduleTypeModel, setScheduleTypeModel] = useState<DropDownFormData>({
		name:"schedule-type",
		label: "Schedule Type",
		placeholder: "Schedule Type",
		options: [
			{
				id: "1",
				label: "Fulltime",
				value: "fulltime"
			}
		],
		selected: false,
		selectedOptionIndex: 0,
		error: "",
	});

	const [hireDateModel, setHireDateModel] = useState<formFieldType>({
		type: "date",
		label: "Hire date",
		placeholder: "Hire date",
		value: "",
		error: "",
		validated: false,
	});

	const [passwordModel, setPasswordModel] = useState<formFieldType>({
		type: "password",
		label: "Password",
		placeholder: "Password",
		value: "",
		error: "",
		validated: false,
	});

	function setInput(value: string, inputModel: formFieldType, setInputModel: setFormFieldType) {
		inputModel.value = value;
		validateModel(inputModel);
		setInputModel({ ...inputModel });

		submitStaffDetails();
	}

	function validateModel(updatedInputModel: formFieldType) {
		if (!updatedInputModel.value) {
			updatedInputModel.validated = false;
			updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
			return;
		}

		updatedInputModel.validated = true;
		updatedInputModel.error = "";
		return;
	}

	function selectOption(optionIndex: number, model: DropDownFormData, setModel: setDropDownFormData) {
		model.value = model.options[optionIndex];
		model.selected = true;
		model.selectedOptionIndex = optionIndex;

		setModel({ ...model });
		submitStaffDetails();
	}

	function submitStaffDetails() {
		const staffWorkInfo:INewStaffWorkInformation = {
			providerRole: providerRoleModel.value?.value ?? "",
			hiredAt: hireDateModel.value,
			jobSchedule: scheduleTypeModel.value?.value ?? "",
			username: usernameModel.value,
			password: passwordModel.value,
		}

		onModified(staffWorkInfo);
	}

	return (
		<FormWrapper extraStyles={styles.staff_personal_information_form}>
			<div className={styles.heading}>
				<div className={styles.number_circle}>2</div>
				<div className={styles.text}>Work information</div>
			</div>

			<div className={styles.form_content}>
				<div className={styles.row}>
					<DropDownField
						placeholder={scheduleTypeModel.placeholder}
						value={scheduleTypeModel.value}
						error={scheduleTypeModel.error}
						options={scheduleTypeModel.options} 
						selected={scheduleTypeModel.selected} 
						selectedOptionIndex={scheduleTypeModel.selectedOptionIndex}
						onSelect={(optionIndex: number) => selectOption(optionIndex, scheduleTypeModel, setScheduleTypeModel)} 
					/>

					<Suspense fallback={<ComponentLoader />} >
						<DropDownField
							placeholder={providerRoleModel.placeholder}
							options={providerRoleModel.options}
							selected={providerRoleModel.selected}
							selectedOptionIndex={providerRoleModel.selectedOptionIndex}
							error={providerRoleModel.error}
							onSelect={(optionIndex: number) => selectOption(optionIndex, providerRoleModel, setProviderRoleModel)}
						/>
					</Suspense>

					<InputField
						type={hireDateModel.type}
						placeholder={hireDateModel.placeholder}
						value={hireDateModel.value}
						error={hireDateModel.error}
						onInput={(inputValue: string) => setInput(inputValue, hireDateModel, setHireDateModel)}
					/>
				</div>

				<div className={styles.row}>
					<InputField
						type={usernameModel.type}
						placeholder={usernameModel.placeholder}
						value={usernameModel.value}
						error={usernameModel.error}
						onInput={(inputValue: string) => setInput(inputValue, usernameModel, setUsernameModel)}
					/>
					
					<PasswordInputField
						placeholder={passwordModel.placeholder}
						error={passwordModel.error}
						showPrefixIcon={false}
						onInput={(inputValue: string) => setInput(inputValue, passwordModel, setPasswordModel)}
					/>
				</div>
			</div>
		</FormWrapper>
	);
}