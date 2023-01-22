import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { DataSource, Repository } from 'typeorm';
import User from 'src/users/user.entity';
// 
@Injectable()
export class CompaniesService {
	constructor(
		@InjectRepository(Company) private companyRepository: Repository<Company>,
		private dataSource: DataSource
	) {

	}

	async create(companyDto: CreateCompanyDto, user: User) {
		const newCompany = await this.companyRepository.save({
			name: companyDto.name,
			description: companyDto.description,
			numberOfEmployees: companyDto.numberOfEmployees,
			serviceOfActivity: companyDto.serviceOfActivity,
			type: companyDto.type,
			adress: companyDto.adress
		})

		user.companies = [...user.companies, newCompany];

		await this.dataSource.transaction(async manager => await manager.save(user));
		return newCompany;
	}


	async findAll(user: User): Promise<Company[]> {
		return user.companies;

		// return this.companyRepository.find();
	}

	findOne(id: number) {
		return `This action returns a #${id} company`;
	}

	// update(id: number, updateCompanyDto: UpdateCompanyDto) {
	// 	return `This action updates a #${id} company`;
	// }

	remove(id: number) {
		return `This action removes a #${id} company`;
	}
}
