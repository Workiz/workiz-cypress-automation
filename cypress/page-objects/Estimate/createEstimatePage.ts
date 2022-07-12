import { EstimatePage } from "./EstimatePage";

export class CreateEstimatePage{

    SubmitToEstimate(): EstimatePage{
        cy.get('.sbmt_bar .button').click();
        return new EstimatePage();
    }

}