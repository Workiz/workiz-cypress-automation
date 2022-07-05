export interface Client{
    clientId: string;
}

export class ClientsReportPage {

    public createClient():Client {

        return {clientId: '123'};
    }

}
