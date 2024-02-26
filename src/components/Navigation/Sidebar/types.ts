import { NavOptionsType } from "../types";

export interface sideBarNavOptionsType {
    navOptions: NavOptionsType[],
    navigateTo: (navPosition: number)=> void 
}