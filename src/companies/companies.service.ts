import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

	// find all curent user companies method
	async findAll(user: User): Promise<Company[]> {
		return user.companies;
	}

	// update company method
	async update(id: number, companyDto: UpdateCompanyDto, user?: User): Promise<Company | undefined> {
		let editingCompany: Company;

		if (user) {
			const company = user.companies.find((company: Company) => company.id === id);
			editingCompany = company ? await this.companyRepository.findOneBy({ id: company.id }) : undefined;
		} else {
			editingCompany = await this.companyRepository.findOneBy({ id });
		}

		if (!editingCompany) {
			throw new NotFoundException();
		}

		// if company exist, find this company in database. Then every value of field
		// existed company overrid by value from same field on dto. 
		for (let key in editingCompany) {
			for (let keyDto in companyDto) {
				if (key === keyDto) {
					editingCompany[key] = companyDto[keyDto];
				}
			}
		}

		return await this.dataSource.transaction(async (manager: EntityManager) => await manager.save(editingCompany));
	}

	//remove company method
	async remove(id: number, user: User,) {
		const company = user.companies.find((company: Company) => company.id === id);

		if (!company) {
			///Write custom exeption
			throw new BadRequestException();
		}

		return this.dataSource.transaction(async (manager: EntityManager) => await manager.remove(company))
	}
}
