import {Controller} from "@tsed/di";
import {Post, Get, Returns, Put } from "@tsed/schema";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {InsuranceService} from "../../services/InsuranceService";
import { InsuranceModel } from "../../models/InsuranceModel";
import { UserEntity } from "../../entities/UserEntity";

@Controller("/insurance_endpoint")
export class InsuranceController {
  constructor(private insuranceServices: InsuranceService) {}

  @Post("/")
  async create(@BodyParams() insurance: InsuranceModel): Promise<string>  {
    console.log('insurance: ', JSON.stringify(insurance));
    const id =  await this.insuranceServices.create(insurance);
    return `${process.env.BASE_URL}?id=${id}`
  }

  @Get("/:id")
  get(@PathParams("id") id: string): Promise<InsuranceModel> {
    return this.insuranceServices.getInsurance(id);
  }

  @Put('/:userId')
  async update(@PathParams('userId') userId: string, @BodyParams() insurance: InsuranceModel): Promise<string> {
    console.log('updating insurance controller...', userId);
    const id =  await this.insuranceServices.update(userId, insurance);
    return `${process.env.BASE_URL}?id=${userId}`;
  }

  @Post("/validate")
  async validate(@BodyParams() insurance: InsuranceModel): Promise<number>  {
    const id =  await this.insuranceServices.create(insurance);
    return this.insuranceServices.validate(insurance);
  }
}
