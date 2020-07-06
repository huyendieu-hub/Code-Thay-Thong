const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/DentalMedicalDB', { useNewUrlParser: true}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

mongoose.connection.on('open', function () {
    mongoose.connection.db.listCollections().toArray(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        data.forEach(function(filter){
            console.log(filter.name);
        })
      }
    });
});

require('./account.model');
require('./user.model');
require('./doctor.model');
require('./patient.model');
require('./patient_adminitration.model');
require('./location.model');
require('./healthcare_service.model');
require('./organization.model');
require('./practitioner.model');

require('./address.model');
require('./activity_definition.model');
require('./connector_request.model');
require('./allergy_intolerance.model');
require ('./appointment.model');
require ('./appointment_response.model');
require ('./attachment.model');
require ('./block_list.model');
require('./friend.model');
require('./friend_list.model');
require('./friend_request.model');

require('./supply_request.model');
require('./record_container.model');
require('./record_conclusion.model');
require('./record.model');
require('./procedure_request.model');
require('./disease_injures.model');
require('./imaging_study.model');
require('./list_diseases.model');
require('./treatment_advises.model');
require('./suggest_organizations.model');
require('./pre_diagnose_requests.model');
require('./pre_diagnose_result.model');
require('./pre_images.model');