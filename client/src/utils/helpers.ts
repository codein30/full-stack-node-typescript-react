import { ADDRESSES, DEPENDENTS, VEHICLES } from "./Constants";

export const childConvertType = (type: string): string => {
    if(ADDRESSES.toLocaleUpperCase().includes(type.toLocaleUpperCase())) return ADDRESSES;
    if(VEHICLES.toLocaleUpperCase().includes(type.toLocaleUpperCase())) return VEHICLES;
    if(DEPENDENTS.toLocaleUpperCase().includes(type.toLocaleUpperCase())) return DEPENDENTS;
    return ""
}

export const timestampToDate = (date: any) => {
    return new Date(date).toISOString().split("T")[0];
}