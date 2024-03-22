import { routerType } from "src/routes/types";
import Dashboard from "src/pages/Dashboard";
import Individuals from "src/pages/Dashboard/Individuals";
import IndividualsList from "src/pages/Dashboard/Individuals/IndividualsList";
import IndividualProfile from "src/pages/Dashboard/Individuals/IndividualProfile";
import IndividualProfileInformation from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualProfileInformation";
import IndividualAssessments from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualAssesments";
import CreateAssessment from "src/pages/Dashboard/Assessments/CreateAssessment/CreateAssessment";
import Compartments from "src/pages/Dashboard/Compartments/Compartments";
import CompartmentsList from "src/pages/Dashboard/Compartments/CompartmentsList";
import Services from "src/pages/Dashboard/Services/Services";
import ServiceDetails from "src/pages/Dashboard/Services/ServiceDetails";
import CompartmentDetails from "src/pages/Dashboard/Compartments/CompartmentDetails";
import IndividualServices from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualServices/IndividualServices";
import AdministrationOutlet from "src/pages/Dashboard/Administration/AdministrationOutlet";
import StaffRolesList from "src/pages/Dashboard/Administration/StaffRolesList";
import StaffRoleDetails from "src/pages/Dashboard/Administration/StaffRoleDetails";
import ServiceIndividuals from "src/pages/Dashboard/Services/ServiceDetails/ServiceIndividuals/ServiceIndividuals";
import AssessmentsOutlet from "src/pages/Dashboard/Assessments/AssessmentsOutlet";
import AssessmentsList from "src/pages/Dashboard/Assessments/AssessmentsList";
import AssessmentDetails from "src/pages/Dashboard/Assessments/AssessmentDetails";
import MedicationsOutlet from "src/pages/Dashboard/Medications/MedicationsOutlet";
import MedicationsList from "src/pages/Dashboard/Medications/MedicationsList";
import MedicationDetails from "src/pages/Dashboard/Medications/MedicationDetails";
import IndividualMedications from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualMedications";
import TasksOutlet from "src/pages/Dashboard/Tasks";
import TasksList from "src/pages/Dashboard/Tasks/TasksList";
import TaskDetails from "src/pages/Dashboard/Tasks/TaskDetails";
import { Outlet } from "react-router-dom";
import GoalTrackingService from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualServices/GoalTrackingService";
import DailyLivingActivitiesService from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualServices/DailyLivingActivitiesService/DailyLivingActivitiesService";
import BehaviorManagementService from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualServices/BehaviorManagementService/BehaviorManagementService";
import ChoreService from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualServices/ChoreService";
import IndividualDocuments from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualDocuments";
import IndividualReports from "src/pages/Dashboard/Individuals/IndividualReports";
import staffRoutes from "../staffs/staffsRoutes";
// import MedicationServiceIndividualsModal from "src/pages/Dashboard/Medications/MedicationDetails/MedicationServiceIndividualsModal";

const DashboardRoutes:routerType[] = [
    {
        path:'/dashboard',
        title: 'Dashboard',
        protected: true,
        element: <Dashboard />,
        children: [
            {
                path:'',
                element: <TasksOutlet />,
                children: [
                    {
                        path:'',
                        title: 'Tasks',
                        element: <TasksList />,
                    },
                    {
                        path: ':taskId',
                        title: 'Task Details',
                        element: <TaskDetails />
                    }
                ]
            },
            staffRoutes,
            {
                path:'individuals',
                element: <Individuals />,
                allowedRoles:["RN", 'DDP', 'ADMINISTRATOR'],
                children: [
                    {
                        path:'',
                        title: 'Individual List',
                        element: <IndividualsList />,
                    },
                    {
                        path:':individualId',
                        title: 'Individual profile',
                        element: <IndividualProfile />,
                        children: [
                            {
                                path:'',
                                title: 'Profile Information',
                                element: <IndividualProfileInformation />,
                            },
                            {
                                path:'services',
                                title: '',
                                element: <Outlet />,
                                children: [
                                    {
                                        path:'',
                                        title: 'Individual Services',
                                        element: <IndividualServices />,
                                    },
                                    {
                                        path:'medication-administration',
                                        title: 'Medication Administration Service',
                                        element: <IndividualMedications />,
                                    },
                                    {
                                        path:'goal-tracking',
                                        title: 'Goal Tracking Service',
                                        element: <GoalTrackingService />,
                                    },
                                    {
                                        path:'daily-living-activity',
                                        title: 'Daily Living Activity',
                                        element: <DailyLivingActivitiesService />,
                                    },
                                    {
                                        path:'behavior-management',
                                        title: 'Behavior Management',
                                        element: <BehaviorManagementService />,
                                    },
                                    {
                                        path:'chore',
                                        title: 'Chore',
                                        element: <ChoreService />,
                                    }
                                ]
                            },
                            {
                                path:'medications',
                                title: 'Medications',
                                element: <IndividualMedications />
                            },
                            {
                                path:'assessments',
                                title: 'Assessments',
                                element: <IndividualAssessments />,
                            },
                            {
                                path:'documents',
                                title: 'Documents',
                                element: <IndividualDocuments />,
                            },
                            {
                                path:'reports',
                                title: 'Reports',
                                element: <IndividualReports/>,
                            },
                        ]
                    },
                    {
                        path:'assessments',
                        title: 'Assessments',
                        element: <AssessmentsOutlet />,
                        children: [
                            {
                                path:'',
                                title: 'Assessments',
                                element: <AssessmentsList />
                            },
                            {
                                path:':assessment/:id',
                                title: 'Assessment Details',
                                element: <AssessmentDetails />,
                            },
                            {
                                path:'create',
                                title: 'Create Assessment',
                                element: <CreateAssessment />,
                            },
                        ]
                    },
                ]
            },
            {
                path:'compartments',
                element: <Compartments />,
                children: [
                    {
                        path:'',
                        title: 'Compartment list',
                        element: <CompartmentsList />,
                    },
                    {
                        path:':compartmentId',
                        title: 'Compartment Details',
                        element: <CompartmentDetails />
                    }
                ]
            },
            {
                path:'services',
                element: <Services />,
                children: [
                    {
                        path:':serviceId',
                        title: 'Service Details',
                        element: <ServiceDetails />,
                        children: [
                            {
                                path:'',
                                title: 'Service Individuals',
                                element: <ServiceIndividuals />,
                            },
                            {
                                path:'individuals',
                                title: 'Service Individuals',
                                element: <ServiceIndividuals />,
                            },
                            {
                                path:'staffs',
                                title: 'Service Staffs',
                                element: <div />,
                            },
                            {
                                path:'assessments',
                                title: 'Service Assessments',
                                element: <div />,
                            },
                        ]
                    },
                ]
            },
            {
                path:'medications',
                element: <MedicationsOutlet />,
                allowedRoles:['HR', 'DDP', 'ADMINISTRATOR'],
                children: [
                    {
                        path:'',
                        title: 'Medications List',
                        element: <MedicationsList />,
                    },
                    {
                        path: ':medicationId',
                        title: 'Medication Details',
                        element: <MedicationDetails />
                    }
                ]
            },
            {
                path:'administration',
                element: <AdministrationOutlet />,
                allowedRoles:['HR', 'DDP', "ADMINISTRATOR"],
                children: [
                    {
                        path:'',
                        title: 'Administration Roles',
                        element: <StaffRolesList />,
                    },
                    {
                        path: ':roleId',
                        title: 'Role Details',
                        element: <StaffRoleDetails />
                    }
                ]
            },
        ]
    },
]

export default DashboardRoutes;