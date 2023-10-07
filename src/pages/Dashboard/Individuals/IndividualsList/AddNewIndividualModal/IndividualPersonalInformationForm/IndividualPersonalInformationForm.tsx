import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./individualpersonalinformationform.module.css";
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import {
  formFieldType,
  setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";
import {
  DropDownFormData,
  setDropDownFormData,
} from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { useSetIndividualState } from "src/features/Individual/state";
import MultiSelectDropDownField from "src/components/FormComponents/DropDownField/MultiSelectDropDownField";
import { MultiSelectDropDownFormData } from "src/components/FormComponents/DropDownField/MultiSelectDropDownField/types";
import { emailValid } from "src/utils/emailValidation";
import { phoneNumberValid } from "src/utils/phoneNumberValidation";


export default function IndividualPersonalInformationForm({
	userState,
}: {
	userState: any;
}) {
	const setIndividualState = useSetIndividualState();


	const [firstnameModel, setFirstnameModel] = useState<formFieldType>({
		type: "text",
		label: "First name",
		placeholder: "First name",
		value: userState.firstName,
		error: "",
		validated: false,
	});

	const [middlenameModel, setMiddlenameModel] = useState<formFieldType>({
		type: "text",
		label: "Middle name",
		optional: true,
		placeholder: "Middle name",
		value: userState.middleName,
		error: "",
		validated: false,
	});

	const [lastnameModel, setLastnameModel] = useState<formFieldType>({
		type: "text",
		label: "Last name",
		placeholder: "Last name",
		value: userState.lastName,
		error: "",
		validated: false,
	});

	const [nicknameModel, setNicknameModel] = useState<formFieldType>({
		type: "text",
		label: "Nick name",
		placeholder: "Nick name",
		optional: true,
		value: userState.nickName,
		error: "",
		validated: false,
	});

	const [dobModel, setdobModel] = useState<formFieldType>({
		type: "date",
		label: "Date of birth",
		placeholder: "Date of birth",
		value: userState.dob,
		error: "",
		validated: false,
	});

	const [genderModel, setGenderModel] = useState<DropDownFormData>({
		label: "Gender",
		placeholder: "Gender",
		options: [
			{
				id: "1",
				label: "Male",
				value: "male",
			},
			{
				id: "2",
				label: "Female",
				value: "female",
			},
		],
		error: "",
		selected: false,
		selectedOptionIndex: 0,
		name: "gender",
	});

	const [maritalStatusModel, setMaritalStatusModel] =
		useState<DropDownFormData>({
			label: "Marital Status",
			placeholder: "Marital Status",
			options: [
				{
					id: "1",
					label: "Single",
					value: "single",
				},
				{
					id: "2",
					label: "Married",
					value: "married",
				},
			],
			error: "",
			selected: false,
			selectedOptionIndex: 0,
			name: "marital-status",
		});

	const [religionModel, setReligionModel] = useState<formFieldType>({
		type: "text",
		label: "Religion",
		placeholder: "Religion",
		optional: true,
		value: userState.religion,
		error: "",
		validated: false,
	});

	const [ssnModel, setssnModel] = useState<formFieldType>({
		type: "number",
		name: "ssn",
		label: "SSN",
		placeholder: "SSN",
		value: userState.ssn,
		error: "",
		validated: false,
	});

	const [codeAlertsModel, setCodeAlertsModel] =
		useState<MultiSelectDropDownFormData>({
			label: "Code alerts",
			placeholder: "Code alerts",
			options: ["DNR", "CPR", "Seizure"],
			error: "",
			value: [],
			validated: false,
		});

	const [weightModel, setWeightModel] = useState<formFieldType>({
		type: "number",
		label: "Weight",
		placeholder: "Weight (in pounds)",
		value: "",
		error: "",
		validated: false,
	});

	const [medicaidModel, setMedicaidModel] = useState<formFieldType>({
		type: "number",
		label: "Medicaid",
		placeholder: "Medicaid number",
		value: userState.medicaidNumber.toString(),
		error: "",
		validated: false,
	});

	const [contactFullnameModel, setContactFullnameModel] =
		useState<formFieldType>({
			type: "text",
			label: "",
			placeholder: "Full name",
			value: userState.contact.name,
			error: "",
			validated: false,
		});

	const [contactCellPhoneModel, setContactCellPhoneModel] =
		useState<formFieldType>({
			type: "phone",
			name: "phone-number",
			label: "",
			placeholder: "Cell phone",
			value: userState.contact.phoneNumber,
			error: "",
			validated: false,
		});

	const [contactEmailAddressModel, setContactEmailAddressModel] =
		useState<formFieldType>({
			type: "email",
			label: "",
			placeholder: "Email address",
			value: userState.contact.email,
			error: "",
			validated: false,
		});

	function setInput(
		value: string,
		inputModel: formFieldType,
		setInputModel: setFormFieldType
	) {
		inputModel.value = value;
		validateModel(inputModel);
		setInputModel({ ...inputModel });

		submit();
	}

	function validateModel(updatedInputModel: formFieldType) {
		if (!updatedInputModel.optional && !updatedInputModel.value) {
			updatedInputModel.validated = false;
			updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
			return;
		}

		if (updatedInputModel.type  === "email") {
			if (!emailValid (updatedInputModel.value))  {
				updatedInputModel.validated = false;
				updatedInputModel.error = `Enter a valid email address `;
				return;
			}
		}
		
		if (updatedInputModel.type  === "phone") {
			if (!phoneNumberValid (updatedInputModel.value))  {
				updatedInputModel.validated = false;
				updatedInputModel.error = `Enter a valid phone number `;
				return;
			}
		}
		updatedInputModel.validated = true;
		updatedInputModel.error = "";
		return;
	}

	function selectOption(
		optionIndex: number,
		model: DropDownFormData,
		setModel: setDropDownFormData
	) {
		model.value = model.options[optionIndex];
		model.selectedOptionIndex = optionIndex;
		model.selected = true;

		setModel({ ...model });

		submit();
	}

	function submit() {
		setIndividualState((state) => {
			return {
				...state,
				newIndividual: {
					...state.newIndividual!,
					firstname: firstnameModel.value,
					middlename: middlenameModel.value,
					lastname: lastnameModel.value,
					nickname: nicknameModel.value,
					dob: dobModel.value,
					gender: genderModel.value?.value ?? "",
					maritalStatus: maritalStatusModel.value?.value ?? "",
					religion: religionModel.value,
					ssn: ssnModel.value,
					weight: weightModel.value.toString(),
					medicaidNumber: parseInt(medicaidModel.value),
					codeAlert: codeAlertsModel.value,
					contact: {
						name: contactFullnameModel.value,
						phoneNumber: contactCellPhoneModel.value,
						email: contactEmailAddressModel.value,
					},
				},
			};
		});
	}

	return (
		<FormWrapper extraStyles={styles.staff_personal_information_form}>
			<div className={styles.heading}>
				<div className={styles.number_circle}>1</div>
				<div className={styles.text}>Personal information</div>
			</div>

			<div className={styles.form_content}>
				<div className={styles.row}>
					<InputField
						type={firstnameModel.type}
						placeholder={firstnameModel.placeholder}
						value={firstnameModel.value}
						error={firstnameModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, firstnameModel, setFirstnameModel)
						}
					/>

					<InputField
						type={middlenameModel.type}
						placeholder={middlenameModel.placeholder}
						value={middlenameModel.value}
						error={middlenameModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, middlenameModel, setMiddlenameModel)
						}
					/>

					<InputField
						type={lastnameModel.type}
						placeholder={lastnameModel.placeholder}
						value={lastnameModel.value}
						error={lastnameModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, lastnameModel, setLastnameModel)
						}
					/>
				</div>

				<div className={styles.row}>
					<InputField
						type={nicknameModel.type}
						placeholder={nicknameModel.placeholder}
						value={nicknameModel.value}
						error={nicknameModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, nicknameModel, setNicknameModel)
						}
					/>

					<InputField
						type={dobModel.type}
						placeholder={dobModel.placeholder}
						value={dobModel.value}
						error={dobModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, dobModel, setdobModel)
						}
					/>

					<DropDownField
						placeholder={genderModel.placeholder}
						options={genderModel.options}
						error={genderModel.error}
						selected={genderModel.selected}
						selectedOptionIndex={genderModel.selectedOptionIndex}
						onSelect={(optionIndex: number) =>
							selectOption(optionIndex, genderModel, setGenderModel)
						}
					/>
				</div>

				<div className={styles.row}>
					<DropDownField
						placeholder={maritalStatusModel.placeholder}
						options={maritalStatusModel.options}
						error={maritalStatusModel.error}
						selected={maritalStatusModel.selected}
						selectedOptionIndex={maritalStatusModel.selectedOptionIndex}
						onSelect={(optionIndex: number) =>
							selectOption(
								optionIndex,
								maritalStatusModel,
								setMaritalStatusModel
							)
						}
					/>

					<InputField
						type={religionModel.type}
						placeholder={religionModel.placeholder}
						value={religionModel.value}
						error={religionModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, religionModel, setReligionModel)
						}
					/>

					<InputField
						type={ssnModel.type}
						placeholder={ssnModel.placeholder}
						value={ssnModel.value}
						error={ssnModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, ssnModel, setssnModel)
						}
					/>
				</div>

				<div className={styles.row}>
					<InputField
						type={medicaidModel.type}
						placeholder={medicaidModel.placeholder}
						value={medicaidModel.value}
						error={medicaidModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, medicaidModel, setMedicaidModel)
						}
					/>

					<MultiSelectDropDownField
						placeholder={codeAlertsModel.placeholder}
						options={codeAlertsModel.options}
						error={codeAlertsModel.error}
						label={""}
						onSelect={(selectedValues: Array<string>) => {
							setCodeAlertsModel((state) => ({ ...state, value: selectedValues }))
							submit();
						}}
					/>

					<InputField
						type={weightModel.type}
						placeholder={weightModel.placeholder}
						value={weightModel.value}
						error={weightModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, weightModel, setWeightModel)
						}
					/>
				</div>

				<div className={styles.row_header}>
					Contact information (a guardian or relative)
				</div>
				<div className={styles.row}>
					<InputField
						type={contactFullnameModel.type}
						label={contactFullnameModel.label}
						placeholder={contactFullnameModel.placeholder}
						value={contactFullnameModel.value}
						error={contactFullnameModel.error}
						onInput={(inputValue: string) =>
							setInput(
								inputValue,
								contactFullnameModel,
								setContactFullnameModel
							)
						}
					/>

					<InputField
						type={contactEmailAddressModel.type}
						label={contactEmailAddressModel.label}
						placeholder={contactEmailAddressModel.placeholder}
						value={contactEmailAddressModel.value}
						error={contactEmailAddressModel.error}
						onInput={(inputValue: string) =>
							setInput(
								inputValue,
								contactEmailAddressModel,
								setContactEmailAddressModel
							)
						}
					/>

					<InputField
						type={contactCellPhoneModel.type}
						label={""}
						placeholder={contactCellPhoneModel.placeholder}
						value={contactCellPhoneModel.value}
						error={contactCellPhoneModel.error}
						onInput={(inputValue: string) =>
							setInput(
								inputValue,
								contactCellPhoneModel,
								setContactCellPhoneModel
							)
						}
					/>
				</div>
			</div>
		</FormWrapper>
	);
}
