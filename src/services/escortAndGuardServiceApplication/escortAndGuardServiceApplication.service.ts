import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { In } from "typeorm";
import { CreateEscortAndGuardServiceDto } from '@dtos/escortAndGuardService/escortAndGuardService.dto';
import { EscortAndGuardServiceApplicationEntity } from '@entities/EscortAndGuardService/EscortAndGuardServiceApplication.entity';
import { HttpException } from '@exceptions/HttpException';
import { EscortAndGuardServiceApplication } from '@interfaces/EscortAndGuardServiceApplication/EscortAndGuardServiceApplication.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class EscortAndGuardServiceApplicationService extends Repository<EscortAndGuardServiceApplicationEntity> {
  public async findAllEAG(eagUnit: string, officer: any): Promise<EscortAndGuardServiceApplication[]> {
    let records = []
    const tactical = officer.officerSubSection
    const tacticalCommandAccess = officer.commandAccess.map(e => e.officerSubSection)
    const tacticalArray = [tactical, ...tacticalCommandAccess]

    const conventional = officer.officerSection
    const conventionalCommandAccess = officer.commandAccess.map(e => e.officerSection)
    const conventionalArray = [conventional, ...conventionalCommandAccess]
    if(eagUnit.toLowerCase() === "tactical"){
      records = await EscortAndGuardServiceApplicationEntity.find({
        where: { commandFormation: In (tacticalArray) } 
      });
    } else {
      records = await EscortAndGuardServiceApplicationEntity.find({
        where: { commandFormation: In (conventionalArray) } 
      });
    }
    
    return records;
  }

  public async findAll(officer: any): Promise<EscortAndGuardServiceApplication[]> {
    const tactical = officer.officerSubSection
    const tacticalCommandAccess = officer.commandAccess.map(e => e.officerSubSection)
    const tacticalArray = [tactical, ...tacticalCommandAccess]

    const conventional = officer.officerSection
    const conventionalCommandAccess = officer.commandAccess.map(e => e.officerSection)
    const conventionalArray = [conventional, ...conventionalCommandAccess]

    const records = await EscortAndGuardServiceApplicationEntity.find({
        where: [
          { commandFormation: In (conventionalArray) },
          { commandFormation: In (tacticalArray) },
        ] 
      });

    return records;
  }

  public async findByEAGId(eagId: number): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(eagId)) throw new HttpException(400, "Id required");

    const findEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.findOne({ where: { id: eagId } });
    if (!findEAG) throw new HttpException(409, "This record was not found");

    return findEAG;
  }

  public async createEAG(payload: CreateEscortAndGuardServiceDto): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(payload)) throw new HttpException(400, "Payload required");
    const createEAG = await EscortAndGuardServiceApplicationEntity.create(payload);
    await EscortAndGuardServiceApplicationEntity.save(createEAG)
    return createEAG;
  }

  public async deleteUser(eagId: number): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(eagId)) throw new HttpException(400, 'PD required');

    const findEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.findOne({ where: { id: eagId } });
    if (!findEAG) throw new HttpException(404, 'No record found');

    await EscortAndGuardServiceApplicationEntity.delete({ id: eagId });
    return findEAG;
  }
}

export default EscortAndGuardServiceApplicationService;
