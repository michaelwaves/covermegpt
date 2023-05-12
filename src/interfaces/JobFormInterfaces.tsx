
export interface jobForm {
    jobTitle: string,
    jobCompany: string,
    jobDescription: string,
}

export interface action {
    type: string,
    payload: {
        name: string,
        value: string,
    }
}