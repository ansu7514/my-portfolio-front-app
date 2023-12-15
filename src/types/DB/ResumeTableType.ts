export interface ResumeEducationTableType {
    user_id: string,
    school_id: number,
    school: string,
    school_from: string,
    school_to: string,
}

export interface ResumeExperienceTableType {
    user_id: string,
    experience_id: number,
    company: string,
    address: string,
    job: string,
    experience_from: string,
    experience_to: string,
}

export interface ResumeCodingSkillTableType {
    user_id: string,
    skill_name: string,
    skill_percent: number,
}

export interface ResumeCertificateTableType {
    user_id: string,
    name: string,
    authority: string,
    date: string,
}