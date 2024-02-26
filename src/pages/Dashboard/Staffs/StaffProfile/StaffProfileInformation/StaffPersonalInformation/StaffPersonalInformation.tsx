import styles from "./staffpersonalinformation.module.css";
import { useStaffValue } from "src/features/staff/state";

export default function StaffPersonalInformation() {
	const staffState = useStaffValue();

	const personalInfo = [
		{
			label: "First name",
			value: staffState.details.personal.firstname,
		},
		{
			label: "Last name",
			value: staffState.details.personal.lastname,
		},
		{
			label: "Username",
			value: staffState.details.work.username,
		},
		{
			label: "Initials",
			value: staffState.details.personal.initials,
		},
		{
			label: "Date of Birth",
			value: staffState.details.personal.dob,
		},
		{
			label: "Gender",
			value: staffState.details.personal.gender,
		},
		{
			label: "Home address",
			value: staffState.details.personal.address,
		},
		{
			label: "Work phone",
			value: staffState.details.personal.phoneNumber.work,
		},
		{
			label: "Cell phone",
			value: staffState.details.personal.phoneNumber.cell,
		},
		{
			label: "Emergency contact",
			value: staffState.details.personal.emergencyContact.name,
		},
		{
			label: "Relationship with contact",
			value: staffState.details.personal.emergencyContact.relationship,
		},
		{
			label: "Cell phone",
			value: staffState.details.personal.emergencyContact.phoneNumber,
		},
		{
			label: "Email address",
			value: staffState.details.personal.email,
		},
	];

	return (
		<div className={styles.staff_personal_information}>
			<div className={styles.heading}>Personal Information</div>

			<div className={styles.info_section}>
				{personalInfo.map((info, index) => {
					return (
						<InfoField
							key={info.label + index}
							label={info.label}
							value={info.value}
						/>
					);
				})}
			</div>
		</div>
	);
}

export function InfoField({
    label, 
    value
}:{label:string, value:string}) {
    return (
        <div className={styles.info_field}>
            <div className={styles.label}>{ label }</div>
            <div className={styles.value}>{ value }</div>
        </div>
    )
}