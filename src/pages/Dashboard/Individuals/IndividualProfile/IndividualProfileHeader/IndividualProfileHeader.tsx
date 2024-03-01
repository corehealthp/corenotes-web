import styles from "./individualprofileheader.module.css";
import UserImage from "src/components/ImageComponent/UserImage";
import IconButton from "src/components/Buttons/IconButton";
import {ReactComponent as IconEditProfile} from "src/assets/icons/icon-edit-profile.svg"
import {ReactComponent as IconUploadDoc} from "src/assets/icons/icon-folder-plus.svg"
import { useIndividualStateValue } from "src/features/Individual/state";

export default function IndividualProfileHeader({
	actionType,
	editProfileAction,
	clickAction,
}: {
	actionType?: "edit-profile" | "upload-doc" | "take-assessment";
	editProfileAction?: () => void;
	clickAction?: () => void;
}) {
	const individualState = useIndividualStateValue();

	return (
		<div className={styles.section_identity}>
			<div className={styles.user_info}>
				<UserImage
					imageUrl={individualState?.profile?.personalInformation?.profileImage}
					fullname={individualState?.profile?.personalInformation?.firstName}
					size={"60px"}
				/>
				<div className={styles.info}>
					<div className={styles.fullname}>
						{individualState?.profile?.personalInformation?.firstName},{" "}
						{individualState?.profile?.personalInformation?.lastName}
					</div>
					<div className={styles.last_update}>Updated: 04/04/2023 01:00pm</div>
				</div>
			</div>

			{actionType === "edit-profile" ? (
				<IconButton
					extraStyle={styles.edit_profile_button}
					label="Edit info"
					suffixIcon={<IconEditProfile />}
					onClick={() => editProfileAction?.()}
				/>
			) : actionType === "upload-doc" ? (
				<IconButton
					extraStyle={styles.upload_document_button}
					label="Upload new document"
					prefixIcon={<IconUploadDoc />}
					onClick={() => clickAction?.()}
				/>
			) : actionType === "take-assessment" ? (
				<IconButton
					extraStyle={styles.edit_profile_button}
					label="Take Assessment"
					suffixIcon={<IconEditProfile />}
					onClick={() => clickAction?.()}
				/>
			) : null}
		</div>
	);
}