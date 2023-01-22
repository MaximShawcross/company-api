import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import User from 'src/users/user.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
	constructor(
		@InjectRepository(Company) private companyRepository: Repository<Company>,
		private dataSource: DataSource
	) { }

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

	}

	findOne(id: number) {
		return `This action returns a #${id} company`;
	}

	async update(id: number, companyDto: UpdateCompanyDto, user: User) {
		const company = user.companies.find((company: Company) => company.id === id);

		if( !company ) {
			throw new NotFoundException();
		}	
		// if company exist, find this company in database. Then every value of field
		// existed company overrid by value from same field on dto. 
		let editingCompany = await this.companyRepository.findOneBy({id: company.id});	
		for(let key in editingCompany) {
			for(let keyDto in companyDto) {
				if (key === keyDto) {
					editingCompany[key] = companyDto[keyDto];
				}
			}
		}

		return await this.dataSource.transaction(async (manager: EntityManager) => await manager.save(editingCompany));
	}

	remove(id: number) {
		return `This action removes a #${id} company`;
	}
}
