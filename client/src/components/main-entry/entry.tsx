import { Styles } from "./styles";
import { Button } from "../button";

import { PencilIcon } from "../icons/pencil";
import { ItemForm } from "./form";
import { useContextHook } from '../../context/hook';
import { IItem } from "../../interfaces/IItem";
import { ListItems } from "../list-items";
import { SubTitle } from "../subtitle";
import { useEffect, useState } from "react";
import { SaveIcon } from "../icons/save";
import { CloseIcon } from "../icons/close";
import { ValidateIcon } from "../icons/validate";
import HttpClient from "../../utils/HttpClient";
import { timestampToDate } from "../../utils/helpers";
import moment from 'moment';

interface IProps extends IItem {
}

export const Entry = ({ 
    userId,
    id,
    type,
    firstName,
    lastName,
    birthDate,
    addresses = [], 
    vehicles = [],
    dependents = [],
    isEditing = false
    }: IProps) => {
    const { deleteParentItem, toggleIsEditing } = useContextHook();
    const [formData, setFormData] = useState({
        type,
        firstName,
        lastName,
        birthDate,
        addresses,
        vehicles,
        dependents
    });
    useEffect(() => {
        localStorage.setItem("userInsuranceApplication", JSON.stringify(formData));
      },
      [formData]);
    
    // update children if deleted
    useEffect(() => {
        const newFormData = formData;
        newFormData.addresses = addresses;
        newFormData.vehicles = vehicles;
        newFormData.dependents = dependents;
        setFormData((old: any) => ({ ...old, ...newFormData } as any));
    }, [addresses, vehicles, dependents])

    const updateForm = async (key: any, value: any, nestedKey: any = null, id: any = null) => {
        if(nestedKey && id) {
            let nestedChild = formData[nestedKey as keyof typeof formData] as any[];
            nestedChild = nestedChild.length ? nestedChild : [{id}];
            nestedChild = nestedChild.map((child) => {
                if(child.id === id) return {
                    ...child, ...{[key]: value}
                }
            })
            setFormData((old: any) => ({ ...old, [nestedKey]: nestedChild } as any));
        } else {
            setFormData((old: any) => ({ ...old, [key]: value } as any));
        }
    }
    
    const isDate = (date: any) => {
        // if single numeric, dont process since could be a false positive
        if (!Number.isNaN(parseFloat(date)) && isFinite(date)) return false;
        const m = moment(date);
        return m.isValid();
    }
    const transformRequestData = (data: object, rtObj: any = {}): object => {
        for(const entries of Object.entries(data)){
            const [key, value] = entries;
            if(isDate(value)) {
                rtObj[key] = timestampToDate(value);
            } else if (Array.isArray(value)) {
                rtObj[key] = [];
                for(const obj of value) {
                    for(const innerEntries of Object.entries(obj)){ 
                        const [innerKey, innerValue] = innerEntries;
                        if(isDate(innerValue)) {
                            obj[innerKey] = timestampToDate(innerValue);
                        } else {
                            obj[innerKey] = innerValue;
                        }
                    }
                    rtObj[key].push(obj);
                }
            } else {
                rtObj[key] = value;
            }
        };
        return rtObj;
    }

    const validateFields = () => {
        for(const [key, value] of Object.entries(formData)){
            if(!value) {
                alert(`Enter a ${key} for your ${formData}`);
                return false;
            }
        }
        return true;
    }

    const createInsuranceApiCall = async () => {
        try {
            if(!validateFields()) return;
            const httpData = transformRequestData(formData);
            const resumeUrl = await HttpClient.post(process.env.REACT_APP_API_URL, httpData, {header: {}}) || {} as IItem;
            window.location.href = resumeUrl;

          } catch (error) {
            console.error("Error:", error);
          }
    }

    const updateInsuranceApiCall = async () => {
        try {
            if(!validateFields()) return;
            const httpData = transformRequestData(formData);
            const resumeUrl = await HttpClient.put(`${process.env.REACT_APP_API_URL}/${userId}`, httpData, {header: {}}) || {} as IItem;
            window.location.href = resumeUrl;
            
          } catch (error) {
            console.error("Error:", error);
          }
    }

    const deleteInsuranceApiCall = async () => {
        try {
            await HttpClient.delete(`${process.env.REACT_APP_API_URL}/${userId}`) || {} as IItem;
            window.location.href = '/';
          } catch (error) {
            console.error("Error:", error);
          }
    }

    const validateInsuranceApiCall = async () => {
        try {
            if(!validateFields()) return;
            const validateItem = await HttpClient.validate(process.env.REACT_APP_API_URL, formData) || {} as IItem;
            alert(`Validated item ${validateItem}`);
          } catch (error) {
            console.error("Error:", error);
          }
    }

    return (
        <>
        <Styles.Container>
            {/* <strong>{insuranceType}</strong> */}
            {
                        <>
                         <ItemForm
                            updateForm={updateForm}
                            item={{
                                id,
                                type: formData.type,
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                birthDate: new Date(formData.birthDate),
                                dependents: formData.dependents,
                                vehicles: formData.vehicles,
                                addresses: formData.addresses,
                                isEditing,
                            } as IItem}
                        />
            
                        </>
            }
            <Styles.GroupButtons>
                <Button onClick={createInsuranceApiCall}>
                    <SaveIcon />
                </Button>
                <Button onClick={() => updateInsuranceApiCall()}>
                    <PencilIcon />
                </Button>
                <Button onClick={() => deleteInsuranceApiCall()}>
                    <CloseIcon />
                </Button>
                <Button onClick={validateInsuranceApiCall}>
                    <ValidateIcon />
                </Button>
            </Styles.GroupButtons>
        </Styles.Container>
        {/* {addresses} */}
        {addresses.length !== 0 && <SubTitle heading={"Addresses"} /> }
        <ListItems
            updateForm={updateForm}
            insuranceItem={
               {
                id,
                type: formData.type,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: new Date(formData.birthDate),
                dependents: formData.dependents,
                vehicles: formData.vehicles,
                addresses: formData.addresses,
                isEditing
                } as IItem
            } 
            itemType={"Address"} 
            items={formData.addresses} 
        />
        {/* {vehicles} */}
        {vehicles.length !== 0 && <SubTitle heading={"Vehicles"} /> }
        <ListItems 
            updateForm={updateForm}
            insuranceItem={
               {
                id,
                type: formData.type,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: new Date(formData.birthDate),
                dependents: formData.dependents,
                vehicles: formData.vehicles,
                addresses: formData.addresses,
                isEditing
                }
            } 
            itemType={"Vehicle"} 
            items={formData.vehicles} 
        />
        {/* {dependents} */}
        {dependents.length !== 0 && <SubTitle heading={"Dependents"} /> }
        <ListItems 
            updateForm={updateForm}
            insuranceItem={
               {
                id,
                type: formData.type,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: new Date(formData.birthDate),
                dependents: formData.dependents,
                vehicles: formData.vehicles,
                addresses: formData.addresses,
                isEditing
                }
            } 
            itemType={"Dependent"} 
            items={formData.dependents} 
        />
        </>

    )
}
