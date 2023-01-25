import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put, Req } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './company.entity';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import User from '../users/user.entity';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/decorators/roles/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { IUserPayload } from '../users/interfaces/user.payload.interface';


@Controller('companies')
export class CompaniesController {
	constructor(
		private readonly companiesService: CompaniesService,
		private userService: UsersService
	) { }

	// create method company
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

		return await this.companiesService.findUserCompanies(user);
	}

	// update company method
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Request() req,
		@Param('id') id: string,
		@Body() updateCompanyDto: UpdateCompanyDto,
	) {
		const user: User = await this.userService.findOne(req.user.id);

		return await this.companiesService.update(+id, updateCompanyDto, user);
	}

	//// update company method -- admin role --
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@Patch('/admin/:id')
	async updateAdmin(
		@Request() req,
		@Param('id') id: string,
		@Body() updateCompanyDto: UpdateCompanyDto,
	) {
		const user: User = await this.userService.findOne(req.user.id);

		return await this.companiesService.update(+id, updateCompanyDto, user);
	}

	// remove companie
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@Delete('/admin/:id')
	async removeAdmin(
		@Param('id') id: string,
		@Request() req
	) {
		const user: User = await this.userService.findOne(req.user.id);

		return this.companiesService.remove(+id, user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(
		@Param('id') id: string,
		@Request() req
	) {
		const user: User = await this.userService.findOne(req.user.id);

		return this.companiesService.remove(+id, user);
	}
}
