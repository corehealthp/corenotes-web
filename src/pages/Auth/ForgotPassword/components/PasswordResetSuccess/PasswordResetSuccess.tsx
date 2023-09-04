import PrimaryTextButton from "../../../../../components/Buttons/PrimaryTextButton";
import SecondaryTextButton from "../../../../../components/Buttons/PrimaryTextButton";
import { useAuthStateValue } from "../../../../../features/auth/authAtom";
import styles from "./passwordresetsuccess.module.css";

export default function PasswordResetSuccess({
  email,
  editEmail,
  resendLink,
}: {
  email: string;
  editEmail: Function;
  resendLink: Function;
}) {
  const authState = useAuthStateValue();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Check your email</div>
      <div className={styles.sub_title}>
        We've sent a password reset link to
      </div>
      <div className={styles.recovery_email}> {email} </div>

      <div className={styles.recovery_email_set}>
        <PrimaryTextButton label="Change Email" action={() => editEmail()} />

        <div className={styles.resend}>
          <div className={styles.resend_qtn}>Didn't receive the email?</div>
          <SecondaryTextButton
            secondaryStyle={styles.resend_btn}
            loaderColor={"var(--teal-accent-100)"}
            label="Click to Resend"
            isLoading={authState.status === "loading"}
            action={() => resendLink()}
          />
        </div>
      </div>
    </div>
  );
}
