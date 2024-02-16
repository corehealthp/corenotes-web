import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffpersonalinformationform.module.css"
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import SizedBox from "src/components/SizedBox";
import { INewStaffPersonalInformation } from "src/features/staff/types";
import { emailValid } from "src/utils/emailValidation";
import { phoneNumberValid } from "src/utils/phoneNumberValidation";

export default function StaffPersonalInformationForm({userState, onModified }:{userState?:any, onModified:(newStaffDetails:INewStaffPersonalInformation)=> void }) {

	console.log("userState",userState)
	const [firstnameModel, setFirstnameModel] = useState<formFieldType>({
		type: "text",
		label: "First name",
		placeholder: "First name",
		value: userState?.firstname,
		error: "",
		validated: false,
	});

	const [lastnameModel, setLastnameModel] = useState<formFieldType>({
		type: "text",
		label: "Last name",
		placeholder: "Last name",
		value: userState?.lastname,
		error: "",
		validated: false,
	});

	const [nicknameModel, setNicknameModel] = useState<formFieldType>({
		type: "text",
		label: "Nick name",
		placeholder: "Nick name",
		value: userState?.nickname,
		error: "",
		validated: false,
	});

	const [dobModel, setdobModel] = useState<formFieldType>({
		type: "date",
		label: "Date of birth",
		placeholder: "Date of birth",
		value: userState?.dob,
		error: "",
		validated: false,
	});

	const [genderModel, setGenderModel] = useState<formFieldType>({
		type: "text",
		label: "Gender",
		placeholder: "Gender",
		value: userState?.gender,
		error: "",
		validated: false,
	});

	const [homeAddressModel, setHomeAddressModel] = useState<formFieldType>({
		type: "text",
		label: "Home address",
		placeholder: "Home address",
		value: userState?.address,
		error: "",
		validated: false,
	});

	const [cityModel, setCityModel] = useState<formFieldType>({
		type: "text",
		label: "City",
		placeholder: "City",
		value: userState?.city,
		error: "",
		validated: false,
	});

	const [stateModel, setStateModel] = useState<formFieldType>({
		type: "text",
		label: "State",
		placeholder: "State",
		value: userState?.state,
		error: "",
		validated: false,
	});

	const [zipCodeModel, setZipCodeModel] = useState<formFieldType>({
		type: "text",
		label: "Zip code",
		placeholder: "Zip code",
		value: userState?.zipCode,
		error: "",
		validated: false,
	});

	const [workPhoneModel, setWorkPhoneModel] = useState<formFieldType>({
		type: "phone",
		label: "Work phone",
		placeholder: "Work phone",
		value: userState?.phoneNumber?.work,
		error: "",
		validated: false,
	});

	const [cellPhoneModel, setCellPhoneModel] = useState<formFieldType>({
		type: "phone",
		name: "cell-phone",
		label: "Cell phone",
		placeholder: "Cell phone",
		value: userState?.phoneNumber?.cell,
		error: "",
		validated: false,
	});

	const [emailAddressModel, setEmailAddressModel] = useState<formFieldType>({
		type: "email",
		label: "Email Address",
		placeholder: "Email Address",
		value: userState?.email,
		error: "",
		validated: false,
	});

	const [emergencyContactNameModel, setEmergencyContactNameModel] = useState<formFieldType>({
		type: "text",
		label: "Contact name",
		placeholder: "Contact name",
		value: userState?.emergencyContact?.name,
		error: "",
		validated: false,
	});

	const [relWithContactModel, setRelWithContactModel] = useState<formFieldType>({
		type: "text",
		label: "Relationship with contact",
		placeholder: "Relationship with contact",
		value: userState?.emergencyContact?.relationship,
		error: "",
		validated: false,
	});

	const [contactCellPhoneModel, setContactCellPhoneModel] = useState<formFieldType>({
		type: "phone",
		label: "Contact cell phone",
		placeholder: "Contact cell phone",
		value: userState?.emergencyContact?.phoneNumber,
		error: "",
		validated: false,
	});

	function setInput(value: string, inputModel: formFieldType, setInputModel: setFormFieldType) {
		inputModel.value = value;
		validateModel(inputModel);
		setInputModel({ ...inputModel });

		submitStaffDetails()
	}

	function validateModel(updatedInputModel: formFieldType) {
		if (!["cell-phone", "other-phone"].includes(updatedInputModel.name!)) {
			if (!updatedInputModel.value) {
				updatedInputModel.validated = false;
				updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
				return;
			}
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

	function submitStaffDetails() {
		const staffPersonalInfo:INewStaffPersonalInformation = {
			firstname: firstnameModel.value,
			lastname: lastnameModel.value,
			nickname: nicknameModel.value,
			initials: firstnameModel.value[0] + lastnameModel.value[0],
			dob: dobModel.value,
			gender: genderModel.value,
			address: homeAddressModel.value,
			city: cityModel.value,
			state: stateModel.value,
			zipCode: stateModel.value,
			phoneNumber: {
				work: workPhoneModel.value,
				cell: cellPhoneModel.value,
			},
			emergencyContact: {
				name: emergencyContactNameModel.value,
				relationship: relWithContactModel.value,
				phoneNumber: contactCellPhoneModel.value,
			},
			email: emailAddressModel.value,
		}

		onModified(staffPersonalInfo);
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
						onInput={(inputValue: string) => setInput(inputValue, firstnameModel, setFirstnameModel)}
					/>

					<InputField
						type={lastnameModel.type}
						placeholder={lastnameModel.placeholder}
						value={lastnameModel.value}
						error={lastnameModel.error}
						onInput={(inputValue: string) => setInput(inputValue, lastnameModel, setLastnameModel)}
					/>

					<InputField
						type={nicknameModel.type}
						placeholder={nicknameModel.placeholder}
						value={nicknameModel.value}
						error={nicknameModel.error}
						onInput={(inputValue: string) => setInput(inputValue, nicknameModel, setNicknameModel)}
					/>
				</div>

				<div className={styles.row}>

					<InputField
						type={dobModel.type}
						placeholder={dobModel.placeholder}
						value={dobModel.value}
						error={dobModel.error}
						onInput={(inputValue: string) => setInput(inputValue, dobModel, setdobModel)}
					/>

					<InputField
						type={genderModel.type}
						placeholder={genderModel.placeholder}
						error={genderModel.error}
						value={genderModel.value}

						onInput={(inputValue: string) => setInput(inputValue, genderModel, setGenderModel)}
					/>
				</div>

				<InputField
					type={homeAddressModel.type}
					placeholder={homeAddressModel.placeholder}
					value={homeAddressModel.value}
					error={homeAddressModel.error}
					onInput={(inputValue: string) => setInput(inputValue, homeAddressModel, setHomeAddressModel)}
				/>

				<div className={styles.row}>
					<InputField
						type={cityModel.type}
						placeholder={cityModel.placeholder}
						value={cityModel.value}
						error={cityModel.error}
						onInput={(inputValue: string) => setInput(inputValue, cityModel, setCityModel)}
					/>

					<InputField
						type={stateModel.type}
						placeholder={stateModel.placeholder}
						value={stateModel.value}
						error={stateModel.error}
						onInput={(inputValue: string) => setInput(inputValue, stateModel, setStateModel)}
					/>

					<InputField
						type={zipCodeModel.type}
						placeholder={zipCodeModel.placeholder}
						value={zipCodeModel.value}
						error={zipCodeModel.error}
						onInput={(inputValue: string) => setInput(inputValue, zipCodeModel, setZipCodeModel)}
					/>
				</div>

				<div className={styles.row}>
					<InputField
						type={workPhoneModel.type}
						placeholder={workPhoneModel.placeholder}
						value={workPhoneModel.value}
						error={workPhoneModel.error}
						onInput={(inputValue: string) => setInput(inputValue, workPhoneModel, setWorkPhoneModel)}
					/>

					<InputField
						type={cellPhoneModel.type}
						placeholder={cellPhoneModel.placeholder}
						value={cellPhoneModel.value}
						error={cellPhoneModel.error}
						onInput={(inputValue: string) => setInput(inputValue, cellPhoneModel, setCellPhoneModel)}
					/>

					<InputField
						type={emailAddressModel.type}
						placeholder={emailAddressModel.placeholder}
						value={emailAddressModel.value}
						error={emailAddressModel.error}
						onInput={(inputValue: string) => setInput(inputValue, emailAddressModel, setEmailAddressModel)}
					/>
				</div>
				
				<SizedBox height="1px" />

				<div className={styles.sub_heading}>Emergency Contact</div>
				<div className={styles.row}>
					<InputField
						type={emergencyContactNameModel.type}
						placeholder={emergencyContactNameModel.placeholder}
						value={emergencyContactNameModel.value}
						error={emergencyContactNameModel.error}
						onInput={(inputValue: string) => setInput(inputValue, emergencyContactNameModel, setEmergencyContactNameModel)}
					/>

					<InputField
						type={relWithContactModel.type}
						placeholder={relWithContactModel.placeholder}
						value={relWithContactModel.value}
						error={relWithContactModel.error}
						onInput={(inputValue: string) => setInput(inputValue, relWithContactModel, setRelWithContactModel)}
					/>

					<InputField
						type={contactCellPhoneModel.type}
						placeholder={contactCellPhoneModel.placeholder}
						value={contactCellPhoneModel.value}
						error={contactCellPhoneModel.error}
						onInput={(inputValue: string) => setInput(inputValue, contactCellPhoneModel, setContactCellPhoneModel)}
					/>
				</div>
			</div>
		</FormWrapper>
	);
}