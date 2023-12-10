import { schoolApiType } from "../ResumeType";

export interface ResumeEducationTableType {
    user_id: string,
    school_id: number,
    school: schoolApiType,
    school_from: string,
    school_to: string,
}