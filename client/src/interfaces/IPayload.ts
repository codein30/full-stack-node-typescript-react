import { IItem } from "./IItem";

export interface IPayload {
    parentItem: IItem;
    childPayload: any;
    childType: string;
}