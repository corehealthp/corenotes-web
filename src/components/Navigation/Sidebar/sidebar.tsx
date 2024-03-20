import logo from "src/assets/images/logo-with-name.png";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import { sideBarNavOptionsType } from "./types";
// import ImageComponent from "src/components/ImageComponent";
import {  useUserStateValue } from "src/features/user/state";

import { useState } from "react";
// import { createGlobalFeedback } from "src/features/globalFeedback/atom";
// import { useStaffState } from "src/features/staff/state";
import ClockInModal from "src/components/ClockInModal/ClockInModal";
import UserClockInModal from "src/components/ClockInModal/UserClockInModal";
import {  useStaffValue } from "src/features/staff/state";
// import { useFetchStaffSelector } from "src/features/staff/selector";

export default function Sidebar({
  navOptions,
  navigateTo,
}: sideBarNavOptionsType) {
  let staffState=useStaffValue()
  let userState=useUserStateValue()

  let [isClockInOpen, setIsClockInOpen] = useState(false);
  let [isUserClockInOpen, setIsUserClockInOpen] = useState(false);

  const staffNav = navOptions?.filter((navOption) => {
    return navOption?.label === "tasks";
  });

  function clockUserIn() {
    setIsClockInOpen(true);
  }

  function clockUserOut() {
    setIsClockInOpen(true);
  }



  return (
    <div className={styles.sidebar}>
      <ClockInModal
        isClockInOpen={isClockInOpen}
        setIsClockInOpen={setIsClockInOpen}
        isUserClockInOpen={isUserClockInOpen}
        setIsUserClockInOpen={setIsUserClockInOpen}
      />
      <UserClockInModal
        isUserClockInOpen={isUserClockInOpen}
        setIsUserClockInOpen={setIsUserClockInOpen}
      />

      <div className=" flex items-center justify-center pt-8 mb-0" >

        <img src={logo} className="w-[80px]" alt="" />
      </div>
      {/* <ImageComponent
        src={logo}
        width={"80px"}
        extraStyles={styles.logo_image}
      /> */}

      <div className={userState.details.role.title === "ADMINISTRATOR" ? styles.navigation_section:styles.staff_navigation_section}>
        <div className={styles.navigation_bar}>
          {userState.details.role.title !== "ADMINISTRATOR" ? (
            staffState.details.isClockedIn ? (
              <button
                onClick={() => clockUserOut()}
                className="text-white bg-red-700 p-2  rounded-md font-semibold"
              >
                Clock Out
              </button>
            ) : (
              <button
                onClick={() => clockUserIn()}
                className="text-white bg-green-700 p-2  rounded-md font-semibold"
              >
                Clock In
              </button>
            )
          ) : null}

          {userState.details.role.title === "ADMINISTRATOR"
            ? navOptions.map(
                (navOption, index) => (
                  // ?
                  <Link
                    key={index}
                    to={navOption.path}
                    className={`text-sm ${styles.navigation_item} ${
                      navOption.active ? styles.active : null
                    }`}
                    onClick={() => navigateTo(index)}
                  >
                    {navOption.active ? (
                      <navOption.icon className={styles.nav_icon} />
                    ) : (
                      <navOption.activeIcon className={styles.nav_icon} />
                    )}
                    <div className={styles.nav_label}>
                      {" "}
                      <span className="text-sm">{navOption.label}</span>{" "}
                    </div>
                  </Link>
                )
                // :
              )
            : staffNav?.map(
                (navOption, index) => (
                  // ?
                  <Link
                    key={index}
                    to={navOption.path}
                    className={`${styles.navigation_item} ${
                      navOption.active ? styles.active : null
                    }`}
                    onClick={() => navigateTo(index)}
                  >
                    {navOption.active ? (
                      <navOption.icon className={styles.nav_icon} />
                    ) : (
                      <navOption.activeIcon className={styles.nav_icon} />
                    )}
                    <div className={styles.nav_label}>
                      {" "}
                      <span className="text-sm">{navOption.label}</span>{" "}
                    </div>
                  </Link>
                )
                // :   staffNav
              )}
        </div>
      </div>
    </div>
  );
}
