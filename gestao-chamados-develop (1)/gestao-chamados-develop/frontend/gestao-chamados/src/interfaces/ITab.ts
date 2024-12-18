import { TabTypeEnum } from "../enums/TabEnum";

export interface ITab{
 _id:string;
 name:string;
 type:TabTypeEnum
 content?:string;
 file?:IFile;
 active?:boolean;
 factorySector:string; 
}
export interface ITabDTO{
 _id:string;
 name:string;
 type:TabTypeEnum
 content?:string;
 file?:File | IFile;
 factorySector:string;
 [key: string]: string | TabTypeEnum | File | boolean | undefined | IFile;
}

export interface IFile{
destination: string;
encoding: string;
mimetype: string;
path: string;
size: number;
}