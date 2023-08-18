import { Styles } from "./styles";
import { Button } from "../button";
import { useContextHook } from '../../context/hook';
import { Grid } from "../grid";
import { PencilIcon } from "../icons/pencil";
import { IItem } from "../../interfaces/IItem";

interface IProps {
    item: IItem;
}

export const InsuranceInformation = ({item}: IProps) => {
    const { toggleIsEditing } = useContextHook();

    return <Styles.SecondaryContainer>
    <Grid>
        <Styles.Title>My Account Page</Styles.Title>
        <Styles.GroupButtons>
            <Button  onClick={() => toggleIsEditing(item.id)}>
                <PencilIcon />
            </Button>
        </Styles.GroupButtons>

        
    </Grid>
    <hr/>
    <hr/>
    <Grid >
        <Styles.ColumnWrapper>
            <Styles.ContentTitle>
                Fist Name
            </Styles.ContentTitle>
            <Styles.ContentItem>
                {item.firstName}
            </Styles.ContentItem>
        </Styles.ColumnWrapper>
        <Styles.ColumnWrapper>
            <Styles.ContentTitle>
                Last Name
            </Styles.ContentTitle>
            <Styles.ContentItem>
                {item.lastName}
            </Styles.ContentItem>
        </Styles.ColumnWrapper>
    </Grid>
    <Grid >
        <Styles.ColumnWrapper>
            <Styles.ContentTitle>
                Birth day
            </Styles.ContentTitle>
            <Styles.ContentItem>
                {new Date(item.birthDate).toString()}
            </Styles.ContentItem>
        </Styles.ColumnWrapper>
        <Styles.ColumnWrapper>
            <Styles.ContentTitle>
                Insurance type
            </Styles.ContentTitle>
            <Styles.ContentItem>
                {item.type}
            </Styles.ContentItem>
        </Styles.ColumnWrapper>
    </Grid>
    <hr />
    <Styles.SubTitle>Addresses</Styles.SubTitle>
    {item && item.addresses.map((addrr: any, index: number) => {
        return <>
            <Styles.SubTitle><i>Address {index + 1}: </i></Styles.SubTitle>
        <Grid >
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Address Type
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {addrr.type}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    street
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {addrr.street}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </Grid>
        <Grid >
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    City
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {addrr.city}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    State
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {addrr.state}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </Grid>
        <div>
        <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Zip Code
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {addrr.zipCode}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </div>
            </>
    })}
    <hr />
    <Styles.SubTitle>Vehicles</Styles.SubTitle>
    {item && item.vehicles.map((vehicle: any, index: number) => {
        return <>
            <Styles.SubTitle><i>Vehicle {index + 1}: </i></Styles.SubTitle>
        <Grid >
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Vehicle Type
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {vehicle.type}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Vin Number
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {vehicle.vin}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </Grid>
        <Grid >
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Year
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {vehicle.year}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Make
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {vehicle.make}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </Grid>
        <Grid >
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Model
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {vehicle.model}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </Grid>
            </>
    })}
    <hr />
    <Styles.SubTitle>Dependents</Styles.SubTitle>
    {item && item.dependents.map((dependent: any, index: number) => {
        return <>
            <Styles.SubTitle><i>Dependent {index + 1}: </i></Styles.SubTitle>
        <Grid >
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    First Name
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {dependent.firstName}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Last Name
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {dependent.lastName}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </Grid>
        <Grid >
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Birth Date
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {new Date(dependent.birthDate).toString()}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
            <Styles.ColumnWrapper>
                <Styles.ContentTitle>
                    Relationship
                </Styles.ContentTitle>
                <Styles.ContentItem>
                    {dependent.relationship}
                </Styles.ContentItem>
            </Styles.ColumnWrapper>
        </Grid>
            </>
    })}
    </Styles.SecondaryContainer>
}
