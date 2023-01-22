import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './company.entity';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('companies')
export class CompaniesController {
	constructor(
		private readonly companiesService: CompaniesService,
		private userService: UsersService
	) { }

	@UseGuards(JwtAuthGuard)
	@Post("/create")
	async create(@Body() createCompanyDto: CreateCompanyDto, @Request() req): Promise<Company> {
		const user = await this.userService.findOne(req.user.nick_name);

		return await this.companiesService.create(createCompanyDto, user);
	}

	@Get()
	async findAll(): Promise<Company[]> {
		return await this.companiesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.companiesService.findOne(+id);
	}

	//   @Patch(':id')
	//   update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
	//     return this.companiesService.update(+id, updateCompanyDto);
	//   }

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.companiesService.remove(+id);
	}
}
