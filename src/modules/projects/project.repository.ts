import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectStatus } from './project.enum';
import { PageParams, PageResult, Project, ProjectDocument, handlePageFacet, handlePageResult } from './project.schema';

@Injectable()
export class ProjectRepository {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  public create(project: Project): Promise<Project> {
    project.userId = new Types.ObjectId(project.userId)
    return this.projectModel.create(project);
  }

  public async updateOne(_id: string, project: Partial<Project>): Promise<void> {
    delete project._id;
    await this.projectModel.updateOne({ _id: new Types.ObjectId(_id)},project);
  }

  public async findOne(project: Partial<Project>): Promise<Project> {
    if (project._id) project._id = new Types.ObjectId(project._id);
    return await this.projectModel.findOne(project);
  }

  public async findFilter(project: Partial<Project>, fullSearch:Boolean): Promise<Project[]> {
    if(project.userId) project.userId = new Types.ObjectId(project.userId);
    if(project.title && !fullSearch){
      const title = project.title.split(" ");
      delete project.title;
      for (let i in title){
        let query:Project[]; 
        if(project.skills){
          const skills:String[] = project.skills;
          delete project.skills;
          query = await this.projectModel.find({"$and":[project, {status:ProjectStatus.BIDDING_OPEN}, {title: {"$regex":title[i], "$options":"i"}}, {skills: { $in: skills }}]});
        }else{
          query = await this.projectModel.find({"$and":[project, {status:ProjectStatus.BIDDING_OPEN}, {title: {"$regex":title[i], "$options":"i"}}]});
        }
        if(query){
          return query;
        }
      }
    }
    if(project.skills){
      let query:Project[]; 
      const skills = project.skills.map(skill => new RegExp(skill as any, 'i'));
      delete project.skills;
      query = await this.projectModel.find({"$and":[project, {status:ProjectStatus.BIDDING_OPEN}, {skills: { $in: skills }}]});
      if(query){
        return query;
      }
    }
    return await this.projectModel.find({"$and":[project, {status:ProjectStatus.BIDDING_OPEN}]});
  }

  public async find(project: Partial<Project>): Promise<Project[]> {
    if(project.userId) project.userId = new Types.ObjectId(project.userId);
    return await this.projectModel.find(project);
  }

  public async delete(_id: string): Promise<void> {
    await this.projectModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

  // public async page(page: PageParams): Promise<PageResult<Project>> {
  //   let query = {
  //     $match: {},
  //   } as any;

  //   if (page.keyword) {
  //     query.$match.$and = query.$match.$and || [];
  //     query.$match.$and.push({
  //       $or: [
  //         {
  //           name: new RegExp(`^${page.keyword}`, "i"),
  //         },
  //       ],
  //     });
  //   }

  //   return this.projectModel.aggregate([
  //     query,
  //     { $sort: { createdAt: -1 } },
  //     { ...handlePageFacet(page) },
  //   ])
  //   .then(handlePageResult)
  //   .then((rs) => {
  //     return rs;
  //   });
  // }

  public async page(project: Partial<Project>, fullSearch:Boolean, page: PageParams): Promise<PageResult<Project>> {
    if(project.userId) project.userId = new Types.ObjectId(project.userId);
    if(project.title && !fullSearch){
      const title = project.title.split(" ");
      delete project.title;
      for (let i in title){
        let query:any; 
        if(project.skills){
          const skills:String[] = project.skills;
          delete project.skills;
          query = await this.projectModel.aggregate([
            {$match: {"$and":[project, {status:ProjectStatus.BIDDING_OPEN}, {title: {"$regex":title[i], "$options":"i"}}, {skills: { $in: skills }}]}},
            { $sort: { createdAt: -1 } },
            { ...handlePageFacet(page) },
          ]);
        }else{
          query = await this.projectModel.aggregate([
            {$match: {"$and":[project, {status:ProjectStatus.BIDDING_OPEN}, {title: {"$regex":title[i], "$options":"i"}}]}},
            { $sort: { createdAt: -1 } },
            { ...handlePageFacet(page) },
          ]);
        }
        if(query){
          return handlePageResult(query);
        }
      }
    }
    if(project.skills){
      let query:any; 
      const skills = project.skills.map(skill => new RegExp(skill as any, 'i'));
      delete project.skills;
      query = await this.projectModel.aggregate([
        {$match: {"$and":[project, {status:ProjectStatus.BIDDING_OPEN}, {skills: { $in: skills }}]}},
        { $sort: { createdAt: -1 } },
        { ...handlePageFacet(page) },
      ]);
      if(query){
        return handlePageResult(query);
      }
    }

    return this.projectModel.aggregate([
      {$match: {"$and":[project, {status:ProjectStatus.BIDDING_OPEN}]}},
      { $sort: { createdAt: -1 } },
      { ...handlePageFacet(page) },
    ])
    .then(handlePageResult)
    .then((rs) => {
      return rs;
    });
  }

}
