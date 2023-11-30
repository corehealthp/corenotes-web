import styles from "./staffprofileheader.module.css";
import UserImage from "src/components/ImageComponent/UserImage";
import IconButton from "src/components/Buttons/IconButton";
import {ReactComponent as IconEditProfile} from "src/assets/icons/icon-edit-profile.svg"
import {ReactComponent as IconUploadDoc} from "src/assets/icons/icon-folder-plus.svg"
import capitalize from "src/utils/capitalize";
import formatDate from "src/utils/formatDate";
import formatTime from "src/utils/formatTime";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useUserStateValue } from "src/features/user/state";
import { useStaffValue } from "src/features/staff/state";

export default function StaffProfileHeader({
    actionType, 
	multipleActions,
    editProfileAction,
    clickAction
}:{ 
    actionType?:'edit-profile'|'upload-doc';
	multipleActions?:string[];
    editProfileAction?: ()=> void;
    clickAction?: (action?:string)=> void;
}) {
	const staffState = useStaffValue();

	return (
		<div className={styles.section_identity}>
			<div className={styles.user_info}>
				<UserImage
					imageUrl={staffState.details.personal.profileImage}
					fullname={staffState.details.personal.firstname}
					size={"60px"}
				/>
				<div className={styles.info}>
					<div className={styles.fullname}>
						{capitalize(staffState.details.personal.firstname)},{" "}
						{capitalize(staffState.details.personal.lastname)}
					</div>
					<div className={styles.last_update}>Last seen: { formatDate(staffState.details.lastSeen) } {formatTime(staffState.details.lastSeen)}</div>
				</div>
			</div>

			<div className={styles.actions}>
				{
					actionType === "edit-profile" 
					?	<IconButton
							extraStyle={styles.edit_profile_button}
							label="Edit info"
							suffixIcon={<IconEditProfile />}
							onClick={() => editProfileAction?.()}
						/>
					: null
				}
				
				{
					actionType === "upload-doc" 
					?	<IconButton
							extraStyle={styles.upload_document_button}
							label="Upload new document"
							prefixIcon={<IconUploadDoc />}
							onClick={() => clickAction?.()}
						/>
					: null
				}

				{
					multipleActions?.includes("set-new-shift")
					?	staffState.details.role.title === "ADMINISTRATOR"
						?	<div className={styles.actions}>
								<AddNewNoBackgroundIconButton 
									label={"Set new shift schedule"} 
									action={()=> clickAction?.('set-new-shift')}
								/>
							</div>
						:	null
					: null
				}
			</div>
		</div>
	);
}