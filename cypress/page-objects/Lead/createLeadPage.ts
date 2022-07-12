import { LeadPage } from "./LeadPage";

export class CreateLeadPage{

    SubmitToLead(): LeadPage{
        cy.get('.sbmt_bar .button').click();
        return new LeadPage();
    }

}