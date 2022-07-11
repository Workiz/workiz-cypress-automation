import { LeadPage } from "./LeadPage";

export class CreateLeadPage{

    private _leadType: string = '';

    get leadType(){
        return this._leadType;
    }

    set leadType(type: string){
        cy.scrollTo(0,200);
        cy.selectFromDropDown('attr', "name='job_type'", type);
    }

    SubmitToJob(): LeadPage{
        cy.get('.sbmt_bar .button').click();
        return new LeadPage();
    }

}