import { Styles } from "./styles";
import { Button } from "../button";
import { Entry } from "./entry";
import { useContextHook } from '../../context/hook';
import { useEffect } from "react";
import { InsuranceInformation } from "./insuranceInformation";
import HttpClient from './../../utils/HttpClient'
import { IItem } from "../../interfaces/IItem";
export const MainEntry = () => {
    const { state, createParentItem, loadParentItem } = useContextHook();

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const id = queryParameters.get("id");
        const fetchData = async () => {
            const insuranceInfo = await HttpClient.get(`${process.env.REACT_APP_API_URL}/${id}`) || {} as IItem;
            loadParentItem({id, ...insuranceInfo });
          };

          if(id) {
          fetchData()
            .catch(console.error);
          }
    }, []);
    
    const isDisplay = (item : IItem ) => {
        if(item.isEditing) return false;
        const {
            id, 
            isEditing,
            ...allItem
        } = item;
        if(Object.keys(allItem).length === 0) return false;
        for(const value of Object.values(allItem)) {
            if(!value) return false;
            if(Array.isArray(value) && value.length === 0) return false;
            if(Array.isArray(value)) {
                for(const innerItem of value) {
                    const {
                        id,
                        isEditing,
                        ...allChildItem
                    } = innerItem;
                    if(Object.keys(allChildItem).length === 0) return false;
                    if(Object.values(allChildItem).some(data => !data)) return false;
                }
            }
        }
        return true;
    }
    const item: IItem = state.parentItem as IItem;
    if(isDisplay(item)) return <InsuranceInformation item={item} />;
    return (
        <Styles.WrapperContainer>
            {(!item || Object.keys(item).length === 0) && <Button onClick={createParentItem}>Start Insurance Applicaiton</Button> }
            {
                // Currently only support one insurance application
                // TODO: Expand more insurance per user
                item && Object.keys(item).length !== 0 && <Entry key={item.id} {...item} />
            }
        </Styles.WrapperContainer>
    )
}
