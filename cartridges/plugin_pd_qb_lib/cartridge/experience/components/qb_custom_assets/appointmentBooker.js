/* eslint-disable valid-jsdoc */
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'appt-booker-' + context.component.getID();
    model.textFont = (content.text_font == null || content.text_font === '') ? 'Raleway' : content.text_font;
    model.textColour = (content.text_colour == null || content.text_colour === '') ? 'black' : content.text_colour;

    model.datePassedColour = (content.date_passed_colour == null || content.date_passed_colour === '') ? '#c9c9c9' : content.date_passed_colour;

    model.bgColour = (content.bg_colour == null || content.bg_colour === '') ? 'white' : content.bg_colour;
    model.headColour = (content.head_colour == null || content.head_colour === '') ? 'rgba(0,0,0,.03)' : content.head_colour;
    model.daysTextColour = (content.days_text_colour == null || content.days_text_colour === '') ? '#777777' : content.days_text_colour;
    model.dateColour = (content.date_colour == null || content.date_colour === '') ? 'rgba(0,0,0,.03)' : content.date_colour;

    model.selectedDateColour = (content.selected_date_colour == null || content.selected_date_colour === '') ? '#b9b7b7' : content.selected_date_colour;
    model.selectedDateTextColour = (content.selected_date_text_colour == null || content.selected_date_text_colour === '') ? 'white' : content.selected_date_text_colour;

    model.btnColour = (content.button_colour == null || content.button_colour === '') ? 'rgba(0,0,0,.03)' : content.button_colour;

    model.openCalButtonText = (content.open_cal_button_text == null || content.open_cal_button_text === '') ? 'Book Appointment' : content.open_cal_button_text;
    model.confirmText1 = (content.confirm_text_1 == null || content.confirm_text_1 === '') ? 'Thank you, your appointment has been booked for ' : content.confirm_text_1;
    model.confirmText2 = (content.confirm_text_2 == null || content.confirm_text_2 === '') ? 'We will send you a confirmation email shortly. We look forward to seeing you.' : content.confirm_text_2;

    return new Template('experience/components/qb_custom_assets/appointmentBooker').render(model).text;
};
