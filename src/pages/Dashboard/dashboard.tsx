import styles from "./dashboard.module.css";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "src/components/Navigation/Sidebar/sidebar";

import { ReactComponent as iconOverview } from "src/assets/icons/icon-home.svg";
import { ReactComponent as iconBriefcase } from "src/assets/icons/icon-briefcase.svg";
import { ReactComponent as iconUsers } from "src/assets/icons/icon-users.svg";
import { ReactComponent as iconFlag } from "src/assets/icons/icon-flag.svg";

import { NavOptionsType } from "src/components/Navigation/types.ts";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import PageHeader from "./components/PageHeader";
import MobileSidebar from "src/components/Navigation/MobileSidebar";
import GlobalFeedback from "src/components/GlobalFeedback";

export default function Dashboard() {

	const location = useLocation();

	const isCurrentNav = (path: string[]) => {
		const allDir = location.pathname.substring(1, location.pathname.length).split("/");
		const firstTwoDirMax = allDir.length > 1 ? `/${allDir[0]}/${allDir[1]}` : `/${allDir[0]}`;

		if (path.includes(firstTwoDirMax)) return true;
		else return false;
	};

	// const [NavOptions, setNavOptions] = useState<NavOptionsType[]>([
	// 	{
	// 		label: "overview",
	// 		pageTitle: "overview",
	// 		pageSubtitle: "",
	// 		path: "/dashboard",
	// 		icon: iconOverview,
	// 		activeIcon: iconOverview,
	// 		active: isCurrentNav(["/dashboard", "/dashboard/"]),
	// 		roles: [
	// 			"HR",
	// 			"DSP",
	// 			"CNA",
	// 			"RN",
	// 			"DDP",
	// 			"SUPRT_COR",
	// 			"TEAM_LEAD_CNA",
	// 			"HOME_MAN",
	// 			"ADMIN_ASS",
	// 			"ADMIN",
	// 		],
	// 	},
	// 	{
	// 		label: "tasks",
	// 		pageTitle: "tasks",
	// 		pageSubtitle: "",
	// 		path: "/dashboard/tasks",
	// 		icon: iconOverview,
	// 		activeIcon: iconOverview,
	// 		active: isCurrentNav(["/dashboard/tasks"]),
	// 		roles: [
	// 			"HR",
	// 			"DSP",
	// 			"CNA",
	// 			"RN",
	// 			"DDP",
	// 			"SUPRT_COR",
	// 			"TEAM_LEAD_CNA",
	// 			"HOME_MAN",
	// 			"ADMIN_ASS",
	// 			"ADMIN",
	// 		],
	// 	},
	// 	{
	// 		label: "staffs",
	// 		pageTitle: "staffs",
	// 		pageSubtitle: "",
	// 		path: "/dashboard/staffs",
	// 		icon: iconBriefcase,
	// 		activeIcon: iconBriefcase,
	// 		active: isCurrentNav(["/dashboard/staffs"]),
	// 		roles: ["HR", "DDP"],
	// 	},
	// 	{
	// 		label: "individuals",
	// 		pageTitle: "individuals",
	// 		pageSubtitle: "",
	// 		path: "/dashboard/individuals",
	// 		icon: iconUsers,
	// 		activeIcon: iconUsers,
	// 		active: isCurrentNav(["/dashboard/individuals"]),
	// 		roles: ["DDP", "ADMIN"],
	// 	},
	// 	{
	// 		label: "Compartments",
	// 		pageTitle: "Compartments",
	// 		pageSubtitle: "",
	// 		path: "/dashboard/compartments",
	// 		icon: iconFlag,
	// 		activeIcon: iconFlag,
	// 		active: isCurrentNav(["/dashboard/compartments"]),
	// 		roles: ["HR", "DDP", "ADMIN"],
	// 	},
	// 	{
	// 		label: "Medications",
	// 		pageTitle: "Medications",
	// 		pageSubtitle: "",
	// 		path: "/dashboard/medications",
	// 		icon: iconFlag,
	// 		activeIcon: iconFlag,
	// 		active: isCurrentNav(["/dashboard/medications"]),
	// 		roles: ["HR", "DDP", "ADMIN"],
	// 	},
	// 	{
	// 		label: "Administration",
	// 		pageTitle: "Administration",
	// 		pageSubtitle: "",
	// 		path: "/dashboard/administration",
	// 		icon: iconAdminUser,
	// 		activeIcon: iconAdminUser,
	// 		active: isCurrentNav(["/dashboard/administration"]),
	// 		roles: ["HR", "DDP", "ADMIN"],
	// 	},
	// 	{
	// 		label: "Settings",
	// 		pageTitle: "settings",
	// 		pageSubtitle: "",
	// 		path: "/dashboard/settings",
	// 		icon: iconSettings,
	// 		activeIcon: iconSettings,
	// 		active: isCurrentNav(["/dashboard/settings"]),
	// 		roles: ["ADMIN"],
	// 	},
	// ]);

	const [NavOptions, setNavOptions] = useState<NavOptionsType[]>([
		// {
		// 	label: "overview",
		// 	pageTitle: "overview",
		// 	pageSubtitle: "",
		// 	path: "/dashboard",
		// 	icon: iconOverview,
		// 	activeIcon: iconOverview,
		// 	active: isCurrentNav(["/dashboard", "/dashboard/"]),
		// 	roles: [
		// 		"HR",
		// 		"DSP",
		// 		"CNA",
		// 		"RN",
		// 		"DDP",
		// 		"SUPRT_COR",
		// 		"TEAM_LEAD_CNA",
		// 		"HOME_MAN",
		// 		"ADMIN_ASS",
		// 		"ADMIN",
		// 	],
		// },
		{
			label: "tasks",
			pageTitle: "tasks",
			pageSubtitle: "",
			path: "/dashboard",
			icon: iconOverview,
			activeIcon: iconOverview,
			active: isCurrentNav(["/dashboard"]),
			roles: [
				"HR",
				"DSP",
				"CNA",
				"RN",
				"DDP",
				"SUPRT_COR",
				"TEAM_LEAD_CNA",
				"HOME_MAN",
				"ADMIN_ASS",
				"ADMINISTRATOR",
			],
		},
		{
			label: "staffs",
			pageTitle: "staffs",
			pageSubtitle: "",
			path: "/dashboard/staffs",
			icon: iconBriefcase,
			activeIcon: iconBriefcase,
			active: isCurrentNav(["/dashboard/staffs"]),
			roles: ["HR", "ADMINISTRATOR"],
		},
		{
			label: "individuals",
			pageTitle: "individuals",
			pageSubtitle: "",
			path: "/dashboard/individuals",
			icon: iconUsers,
			activeIcon: iconUsers,
			active: isCurrentNav(["/dashboard/individuals"]),
			roles: ["RN", "DDP", "ADMINISTRATOR"],
		},
		{
			label: "Compartments",
			pageTitle: "Compartments",
			pageSubtitle: "",
			path: "/dashboard/compartments",
			icon: iconFlag,
			activeIcon: iconFlag,
			active: isCurrentNav(["/dashboard/compartments"]),
			roles: ["HR", "DDP", "ADMINISTRATOR"],
		},
		{
			label: "Med Catalogue",
			pageTitle: "Medications Catalogue",
			pageSubtitle: "",
			path: "/dashboard/medications",
			icon: iconFlag,
			activeIcon: iconFlag,
			active: isCurrentNav(["/dashboard/medications"]),
			roles: ["HR", "DDP", "ADMINISTRATOR"],
		},
		// {
		//     label: "Administration",
		//     pageTitle: "Administration",
		//     pageSubtitle: "",
		//     path: "/dashboard/administration",
		//     icon: iconAdminUser,
		//     activeIcon: iconAdminUser,
		//     active: isCurrentNav(['/dashboard/administration']),
		//     roles: ['HR', 'DDP', 'ADMIN']
		// },
		// {
		//     label: "Settings",
		//     pageTitle: "settings",
		//     pageSubtitle: "",
		//     path: "/dashboard/settings",
		//     icon: iconSettings,
		//     activeIcon: iconSettings,
		//     active: isCurrentNav(['/dashboard/settings']),
		//     roles: ['ADMIN']
		// }
	]);

	const [activeNavPosition, setActiveNavPosition] = useState(0);

	useEffect(() => {
		const setActiveNav = (optionPosition: number) => {
			setNavOptions((navOptions) => {
				return [
					...navOptions.map((navOption: NavOptionsType, index: number) => {
						return optionPosition
							? index === optionPosition
								? { ...navOption, active: true }
								: { ...navOption, active: false }
							: [navOption.path, `${navOption.path}/`].includes(location.pathname) 
								|| navOption.path === `/${location.pathname.split("/")[1]}/${location.pathname.split("/")[2]}`
							? { ...navOption, active: true }
							: { ...navOption, active: false };
					}),
				];
			});
		};

		setActiveNav(activeNavPosition);
		
	}, [activeNavPosition, location]);

	return (
		<div className={styles.body}>

			<GlobalFeedback />

			<Sidebar navOptions={NavOptions} navigateTo={setActiveNavPosition} />

			<MobileSidebar
				navOptions={NavOptions}
				navigateTo={setActiveNavPosition}
			/>

			<div className={styles.main}>
				<PageHeader />
				{/* <SizedBox height="40px" /> */}
				<Suspense fallback={<ComponentLoader />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}
