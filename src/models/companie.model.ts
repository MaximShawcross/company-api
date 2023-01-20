import { Company } from "src/companies/company.entity";
import { EntitySchema } from "typeorm";

export const CompanieSchema = new EntitySchema<Company>({
	name: "Company",
	target: Company,
	columns: {
		id: {
			type: Number,
			primary: true,			
			generated: true
		},
		adress: {
			type: String
		},
		name: {
			type: String
		},
		serviceOfActivity: {
			type: String
		},
		description: {
			type: String
		},
		type: {
			type: String
		},
		numberOfEmployees: {
			type: Number
		}
		
	}
})