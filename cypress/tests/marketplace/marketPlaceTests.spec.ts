import { LogInPage } from "../../page-objects/logInPage";
import { PageRouter } from "../../page-objects/router";
import { MarketPlaceLabels } from "../../infrastructure/marketPlaceLabels";

describe('MarketPlace tests', () => {
    let pageRouter: PageRouter;
    let logInPage: LogInPage;

    beforeEach(() => {
        pageRouter = new PageRouter;
        logInPage = new LogInPage;
        logInPage.logInWithAccount6();
    })

    it('Validate the number of pressed and  unpressed filters in MarketPlacePage',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        const unPressedButtonElements = marketPlacePage.getUnpressedButtonElements;
        unPressedButtonElements.its('length').should('eq', 4);
        const pressedButtonElements = marketPlacePage.pressedButtonElements;
        pressedButtonElements.its('length').should('eq', 1);

    });

    it('Validate the number of widgets in marketPlace page',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        const allWidgetElements = marketPlacePage.getAllWidgetsElements;
        allWidgetElements.its('length').should('eq', 36);
    });

    it('Search values in search bar and validate the results',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.searchForValueInSearchBar('quickBooks');
        marketPlacePage.getAllActiveWidgetsList.first().then(($el) => {
            expect($el.text()).to.equal('QuickBooks Online');
        });

        marketPlacePage.clearSearchBar();
        marketPlacePage.searchForValueInSearchBar('Online Booking');
        marketPlacePage.getAllActiveWidgetsList.first().then(($el) => {
            expect($el.text()).to.equal('Online Booking');
        });
    });

    it('Validate that only add-ons types widgets appear when clicking on add-ons filter',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let adoonsWidgets = marketPlacePage.getOnlyAddOnsType;
        adoonsWidgets.each((item,index,list) => {
            expect(item.text()).to.be.oneOf(MarketPlaceLabels.allAddOnsLabelsList);
        });
    });

    it('Validate that only integrations types widgets appear when clicking on integrations filter',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        let integrationsWidgets = marketPlacePage.getOnlyIntegrationType;
        integrationsWidgets.each((item,index,list) => {
            expect(item.text()).to.be.oneOf(MarketPlaceLabels.allIntegrationsLabelsList);
        });
    });

    //Custom fields
    it('Using custom fields link works properly in custom fields',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('customFields_feature_card', 'How to create custom fields for jobs and clients');
        cy.url().should('include', '2246776-how-to-create-custom-fields-for-jobs-and-clients');
    });

    it('Using custom fields link works properly in custom fields',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('customFields_feature_card', 'Custom fields by job type');
        cy.url().should('include', '3092163-setting-up-custom-fields-by-job-type');
    });
    //QuickBooks Online widget links
    it('Using Connecting to QuickBooks Online link Works properly in QuickBooks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('quickbooks_feature_card', 'Connecting to QuickBooks Online');
        cy.url().should('include', 'how-to-sync-your-quickbooks-online-account-with-workiz');
    });

    it('Using matching Your QuickBooks Tax Rates Link Works Properly in QuickBooks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('quickbooks_feature_card', 'Matching your QuickBooks tax rates');
        cy.url().should('include', 'match-up-your-workiz-tax-rates-with-your-quickbooks-account');
    });
    //Online Booking widget links
    it('Using Setting Up Online-Booking Link works properly in QuickBooks Online-Booking',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('booking_feature_card', 'Setting up online booking');
        cy.url().should('include', 'how-to-enable-and-use-online-booking');
    });

    it('Using Tracking online booking sources Link works properly in Online-Booking',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('booking_feature_card', 'Tracking online booking sources');
        cy.url().should('include', 'tracking-multiple-ad-sources-for-online-booking');
    });

    //workiz phone system widget links
    it('Validate Workiz service phone link works properly after clicking the phone widget',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToWorkizServicePhonePage();
        cy.url().should('include', '/billing/phone');
    });    

    //Franchises widget Links
    it('Using view set up guide link works properly in franchises',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('franchises_feature_card', 'View Setup Guide');
        cy.url().should('include', 'help.workiz');
    });  

    //Commission widget Links
    it('Using Setting auto tech commissions link works properly in commissions',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('commissions_feature_card', 'Setting auto tech commissions');
        cy.url().should('include', 'setting-commission-rates-for-techs');
    });  

    //Custom report widget Links
    it('Using custom reports link from marketplace works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToCustomReportsLinkPage();
        cy.url().should('include', 'customReports');
    });  

    // Map/GPS Tracking your field team's location Link
    it('Using Tracking your field teams location link from marketplace works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('map_feature_card', 'Tracking your field team');
        cy.url().should('include', 'tracking-your-team-s-location-in-workiz');
    });  

    // Custom Documents widgets links
    it('Using Creating Custom Documents Link Works Properly In Custom Documents',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('customdoc_feature_card', 'Creating custom documents');
        cy.url().should('include', 'how-to-create-a-custom-document-from-scratch');
    });  

    // Leads widgets links
    it('Using leads widget link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToLedasWidget();
        cy.url().should('include', 'name=leads');
    });
    
    // Tasks widgets links
    it('Using tasks link works properly in tasks',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('tasks_feature_card', 'Using Tasks');
        cy.url().should('include', 'how-to-use-the-tasks-add-on-to-manage-complex-jobs');
    });  

    //Metro Areas Links
    it('Using Setting up service areas link works properly in Metro Areas',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('metros_feature_card', 'Setting up service areas');
        cy.url().should('include', 'how-to-manage-multiple-service-areas');
    });  

    it('Using Assigning a team by service area link works properly in Metro Areas',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('metros_feature_card', 'Assigning a team by service area');
        cy.url().should('include', 'filtering-field-techs-for-jobs-using-skills-and-service-areas');
    });  

    //External Companies Link
    it('Using Automatically creating leads from messages link works properly in External Company',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('external_feature_card', 'Automatically creating leads from messages');
        cy.url().should('include', 'automatically-create-leads-from-your-lead-sources');
    });  

    //Inventory Links
    it('Using Managing your Inventory link works properly in Inventory',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('inventory_feature_card', 'Managing your inventory');
        cy.url().should('include', 'managing-your-stock-with-workiz-s-inventory-add-on');
    }); 

    it('Using Inventory locations link works properly in Inventory',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('inventory_feature_card', 'Inventory locations');
        cy.url().should('include', 'how-to-create-and-manage-inventory-containers');
    }); 

    //Chatbot Links
    it('Using Chatbot link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToChatBot();
        cy.url().should('include', 'name=chatbot');
    }); 

    //Subconstractor Links
    it('Using ProU sers Vs Subcontractors link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('subcontractors_feature_card', 'Pro users VS subcontractors');
        cy.url().should('include', 'paid-users-vs-free-subcontractors');
    }); 

    //Developer for api Links
    it('Using Developer documentation link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('developer_feature_card', 'Developer documentation');
        cy.url().should('include', 'developer.workiz.com');
    }); 

    //Googles Local Services Ads Links
    it('Using Connecting your schedule to Googles Local Services Ads link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('googleLocal_feature_card', 'Connecting your schedule to Google');
        cy.url().should('include', 'how-to-highlight-your-business-on-google-and-get-more-jobs');
    }); 

    //Mailchimp Links
    it('Using Mailchamp widget link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.goToMaliChamp();
        cy.url().should('include', 'name=mailchimp');
    });

    //Thumbteck Links
    it('Using Connecting to Thumbtack link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('thumbtack_feature_card', 'Connecting to Thumbtack');
        cy.url().should('include', 'how-to-respond-faster-to-thumbtack-leads-and-close-more-jobs');
    });

    //Gusto Links
    it('Using Connecting to Gusto link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('gusto_feature_card', 'Connecting to Gusto');
        cy.url().should('include', 'how-to-sync-your-gusto-payroll-account-with-workiz');
    });

    // CompanyCam
    it('Using Connecting to CompanyCam link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('companyCam_feature_card', 'Connecting to CompanyCam');
        cy.url().should('include', 'integrate-companycam-workiz');
    });

    // Zoom integration page
    it('Using Zoom and Workiz link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('zoom_feature_card', 'Using Zoom and Workiz');
        cy.url().should('include', 'workiz-zoom-video-meetings');
    });

    //CalenderSync Link
    it('Using Subscribing to your Workiz schedule link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('calSync_feature_card', 'Subscribing to your Workiz schedule');
        cy.url().should('include', 'how-to-sync-workiz-schedule-with-your-personal-calendar');
    });
    
    //Zapier Links Link
    it('Using Workiz and Zapier link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('zapier_feature_card', 'Using Workiz and Zapier');
        cy.url().should('include', 'how-to-connect-workiz-to-other-apps-with-zapier-integration');
    });   
    
    it('Using Creating a Zap link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.GoToMarketPlaceLink('zapier_feature_card', 'Creating a Zap');
        cy.url().should('include', 'zapier-quick-start-guide/quick-start-create-zap/');
    });  

    //searchkings
    it('Using Creating a Zap link works properly',() =>{
        let marketPlacePage = pageRouter.goToMarketPlacePage();
        const searchKingsModal = marketPlacePage.OpenSearchKingModal();
        searchKingsModal.should('contain.text', 'Grow Your Service Business and Reach More Clients With SearchKings').click().then(() =>{
        cy.get('button.PartnerModal-module__ml10___15YK9').should('be.enabled');
        });        
    }); 

    //Activation Tests
    
    it('Validate Custom Document activation',() =>{
        const customDocumentTestIdSelector = 'customdoc_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(customDocumentTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(customDocumentTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        cy.go('back');
        marketPlacePageSecondTime.disableFeature(customDocumentTestIdSelector);
        const settingsPlacePage = pageRouter.goToSettingsPage();
        settingsPlacePage.goToCustomDocumentsPage();
        cy.get('.mid-margin-bottom button').should('not.exist');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageThirdTime.TurnOnWidget(customDocumentTestIdSelector);
        const marketPlacePageFourthTime = pageRouter.goToMarketPlacePage();
        marketPlacePageFourthTime.getWidgewtStatus(customDocumentTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');

        const settingsPlacePageSecondTime = pageRouter.goToSettingsPage();
        settingsPlacePageSecondTime.goToCustomDocumentsPage();
        cy.url().should('include', 'root/documents');
        cy.get('.mid-margin-bottom button').should('exist');
        });  
        
    it('Validate Custom Fields activation',() =>{
        const customFieldsTestIdSelector = 'customFields_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(customFieldsTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(customFieldsTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        const settingsPage = pageRouter.goToSettingsPage();
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'Custom Fields');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(customFieldsTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(customFieldsTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        pageRouter.goToSettingsPage();
        cy.validateTextIsNotAppearInElements(settingsPage.widgetsSelector, 'Custom Fields');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(customFieldsTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'root/custom_fields');
        cy.get('h2.thin').should('have.text', 'Custom Fields');
        });  

    it('Validate Online Booking activation',() =>{
        const onlineBookingTestIdSelector = 'booking_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(onlineBookingTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(onlineBookingTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        const settingsPage = pageRouter.goToSettingsPage();
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'Online Booking');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(onlineBookingTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(onlineBookingTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        pageRouter.goToSettingsPage();
        cy.validateTextIsNotAppearInElements(settingsPage.widgetsSelector, 'Online Booking');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(onlineBookingTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'root/booking_settings');
        cy.get('.BookingSettingsCards__preview___1laod').should('be.visible');
    }); 
    
    it('Validate Franchise activation',() =>{
        const franchiseTestIdSelector = 'franchises_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(franchiseTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(franchiseTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        const settingsPage = pageRouter.goToSettingsPage();
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'Franchises Management');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(franchiseTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(franchiseTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        const settingsPageAfterDisabled = pageRouter.goToSettingsPage();
        cy.validateTextIsNotAppearInElements(settingsPageAfterDisabled.widgetsSelector, 'Franchises Management');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(franchiseTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'root/franchise');
        cy.get('h2.thin').should('have.text', 'Franchise');
    }); 

    it('Validate Map/GPS activation',() =>{
        const mapTestIdSelector = 'map_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(mapTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(mapTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        cy.validateTextAppearInElements('#big-menu li', 'Map');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(mapTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(mapTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        cy.reload();
        cy.validateTextIsNotAppearInElements('#big-menu li', 'Map');
        
        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(mapTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'map');
        cy.get('#mapid').should('be.visible');
    }); 

    it('Validate Leads activation',() =>{
        const leadsTestIdSelector = 'leads_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(leadsTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(leadsTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        const settingsPage = pageRouter.goToSettingsPage();
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'Lead Status');
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'Auto Leads');
        cy.validateTextAppearInElements('#big-menu li', 'Leads');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(leadsTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(leadsTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        const settingsPageAfterDisabled = pageRouter.goToSettingsPage();
        cy.validateTextIsNotAppearInElements(settingsPage.widgetsSelector, 'Lead Status');
        cy.validateTextIsNotAppearInElements(settingsPage.widgetsSelector, 'Auto Leads');
        cy.validateTextIsNotAppearInElements('#big-menu li', 'Leads');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(leadsTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'root/leads');
    }); 

    it('Validate task activation',() =>{
        const tasksTestIdSelector = 'tasks_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(tasksTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(tasksTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(tasksTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(tasksTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(tasksTestIdSelector);
    }); 

    it('Validate Metro Area activation',() =>{
        const metroAreaTestIdSelector = 'metros_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(metroAreaTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(metroAreaTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        const settingsPage = pageRouter.goToSettingsPage();
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'Metro Areas');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(metroAreaTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(metroAreaTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        const settingsPageAfterDisabled = pageRouter.goToSettingsPage();
        cy.validateTextIsNotAppearInElements(settingsPageAfterDisabled.widgetsSelector, 'Metro Areas');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(metroAreaTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'root/metro_areas');
        cy.get('h2.thin').should('have.text', 'Metro Areas');
    }); 

    it('Validate External Companies activation',() =>{
        const externalCompanyTestIdSelector = 'external_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(externalCompanyTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(externalCompanyTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        const settingsPage = pageRouter.goToSettingsPage();
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'External Companies');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(externalCompanyTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(externalCompanyTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        const settingsPageAfterDisabled = pageRouter.goToSettingsPage();
        cy.validateTextIsNotAppearInElements(settingsPageAfterDisabled.widgetsSelector, 'External Companies');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(externalCompanyTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'companies');
        cy.get('#comanies_tbl_wrapper', {timeout: 10000}).should('be.visible');
    }); 

    it.only('Validate Inventory activation',() =>{
        const inventoryTestIdSelector = 'inventory_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(inventoryTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(inventoryTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        cy.validateTextAppearInElements('#big-menu li', 'Inventory');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(inventoryTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(inventoryTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        cy.reload();
        cy.validateTextIsNotAppearInElements('#big-menu li', 'Inventory');

        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(inventoryTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'root/inventory');
        cy.get('._title').should('have.text', 'Inventory');
    }); 

    it.only('Validate Chatbot activation',() =>{
        const chatBotTestIdSelector = 'chatbot_feature_card';
        const marketPlacePage = pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(chatBotTestIdSelector);
        const marketPlacePageSecondTime = pageRouter.goToMarketPlacePage();
        const widgetStatus = marketPlacePageSecondTime.getWidgewtStatus(chatBotTestIdSelector);
        widgetStatus.should('have.text', 'Feature active');
        const settingsPage = pageRouter.goToSettingsPage();
        cy.validateTextAppearInElements(settingsPage.widgetsSelector, 'Chatbot Settings');

        const marketPlacePageThirdTime = pageRouter.goToMarketPlacePage();
        marketPlacePageSecondTime.disableFeature(chatBotTestIdSelector);
        cy.go('back');
        const widgetStatusAfterDisabled = marketPlacePageThirdTime.getWidgewtStatus(chatBotTestIdSelector);
        widgetStatusAfterDisabled.should('have.text', 'Feature not active');
        const settingsPageAfterDisabled = pageRouter.goToSettingsPage();
        cy.validateTextIsNotAppearInElements(settingsPageAfterDisabled.widgetsSelector, 'Chatbot Settings');
      
        pageRouter.goToMarketPlacePage();
        marketPlacePage.TurnOnWidget(chatBotTestIdSelector);
        marketPlacePage.clickOnLinkToPage();
        cy.url().should('include', 'root/chatbotSettings');
        cy.get('h2.thin').should('have.text', 'Chatbot');
    }); 
}); 
    


