import { EstimatePage } from "./EstimatePage";

export class CreateEstimatePage{

    SubmitToLead(): EstimatePage{
        cy.get('.sbmt_bar .button').click();
        return new EstimatePage();
    }

}