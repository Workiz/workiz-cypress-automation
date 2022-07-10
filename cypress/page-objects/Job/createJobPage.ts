import { JobPage } from "./jobPage";

export class CreateJobPage{

    private _jobType: string = '';

    get jobType(){
        return this._jobType;
    }

    set jobType(type: string){
        cy.scrollTo(0,200);
        cy.selectFromDropDown('attr', "name='job_type'", type);
    }

    SubmitToJob(): JobPage{
        cy.get('.sbmt_bar .button').click();
        return new JobPage();
    }

}