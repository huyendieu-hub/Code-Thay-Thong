const mongoose = require('mongoose');
var suggestorganizationsSchema = new mongoose.Schema({
    resourceType: {
        type: String,
        default: "suggest_organizations"
    },
    identifier: [{ 
        type: String
        //Identifier 
    }], // Identifies this organization  across multiple systems
    active: { // Whether the organization's record is still in active use
        type: Number,
    }, 
    name: { // Name used for the organization
        type: String
    },
    telecom: { // A contact detail for the organization
        //ContactPoint 
        type: String
    }, 
    address: { 
        type: String
        //Address 
    } // An address for the organization
});

mongoose.model('SuggestOrganizations', suggestorganizationsSchema);