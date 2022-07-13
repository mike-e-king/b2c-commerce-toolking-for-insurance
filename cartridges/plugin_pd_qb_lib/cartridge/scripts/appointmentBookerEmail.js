'use strict';

module.exports = {
    sendAppointmentBookerMail: function () {
        var mail = new dw.net.Mail();
        mail.addTo('hashbrownsteve@gmail.com');
        mail.setFrom('hashbrownsteve@gmail.com');
        mail.setSubject('Example Email');
        // sets the content of the mail as plain string
        mail.setContent('plain string');
        mail.send();
    }
};
