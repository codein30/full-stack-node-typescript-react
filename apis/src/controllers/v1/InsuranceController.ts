import {Controller} from "@tsed/di";
import {Post, Get, Returns, Put, Delete } from "@tsed/schema";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {InsuranceService} from "../../services/InsuranceService";
import { InsuranceModel } from "../../models/InsuranceModel";

@Controller("/insurance_endpoint")
export class InsuranceController {
  constructor(private insuranceServices: InsuranceService) {}

  @Post("/")
  async create(@BodyParams() insurance: InsuranceModel): Promise<string>  {
    const id = await this.insuranceServices.create(insurance);
    return `${process.env.RESUME_URL}?id=${id}`;
  }

  @Get()
  getAll(): Promise<InsuranceModel[]> {
    return this.insuranceServices.getAllInsurances();
  }

  @Get("/:id")
  get(@PathParams("id") id: string): Promise<InsuranceModel> {
    return this.insuranceServices.getInsurance(id);
  }

  @Put('/:id')
  async update(@PathParams('id') id: string, @BodyParams() insurance: InsuranceModel): Promise<string> {
    console.log("update form: ", insurance)
    const resumeID =  await this.insuranceServices.update(id, insurance);
    return `${process.env.RESUME_URL}?id=${resumeID}`;
  }

  @Post("/validate")
  async validate(@BodyParams() insurance: InsuranceModel): Promise<number>  {
    const id =  await this.insuranceServices.create(insurance);
    return this.insuranceServices.validate(insurance);
  }

  @Delete("/:id")
  delete(@PathParams("id") id: string): void {
     this.insuranceServices.deleteInsurance(id);
  }
}
