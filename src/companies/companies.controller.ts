import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './company.entity';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import User from 'src/users/user.entity';

@Controller('companies')
export class CompaniesController {
	constructor(
		private readonly companiesService: CompaniesService,
		private userService: UsersService
	) { }

	@UseGuards(JwtAuthGuard)
	@Post("/create")
	async create(@Body() createCompanyDto: CreateCompanyDto, @Request() req): Promise<Company> {
		const user: User = await this.userService.findOne(req.user.id);

		return await this.companiesService.create(createCompanyDto, user);
	}

	//find current user companies 
	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(@Request() req): Promise<Company[]> {
		const user: User = await this.userService.findOne(req.user.id);

		return await this.companiesService.findAll(user);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.companiesService.findOne(+id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Request() req,
		@Param('id') id: string, 
		@Body() updateCompanyDto: UpdateCompanyDto,
	) {
		const user: User = await this.userService.findOne(req.user.id);		

		return this.companiesService.update(+id, updateCompanyDto, user);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.companiesService.remove(+id);
	}
}
