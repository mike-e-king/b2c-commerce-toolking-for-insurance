let today = new Date();
let currentMonth = today.getMonth(),
    currentYear = today.getFullYear(),
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    selectedMonth = "",
    bookedDate = "",
    bookedTime = "";

function displayDatePicker(textColour, datePassedColour, bgColour, dateColour,selectedBgColour,selectedTextColour, daysTextColour){
    var styleSheets = document.styleSheets,
        apptCss = '';
    for(var k=0; k< styleSheets.length; k++){
        if(styleSheets[k].href.includes('appointmentBooker.css')){
            apptCss = styleSheets[k];
            break;
        }
    }

    // Update CSS with user defined colours
    apptCss.insertRule(".dp-date,.timepicker-time{background-color:"+dateColour+";}",0); 
    apptCss.insertRule(".datepicker-container,.time-confirmation-info{background-color:"+bgColour+";}",0);
    apptCss.insertRule(".booker-container{color: "+textColour+";}",0);
    apptCss.insertRule(".month-arrows{color: "+textColour+" !Important;}",0);
    apptCss.insertRule(".dp-date{border: 1rem solid "+bgColour+";}",0);
    apptCss.insertRule(".arrow-up:after{border-bottom: 1.5rem solid "+bgColour+";}",0);
    apptCss.insertRule(".dp-date-selected,.tp-time-selected{background-color: "+selectedBgColour+";color:"+selectedTextColour+";}",10);
    apptCss.insertRule(".dp-date-passed{color: "+datePassedColour+";}",0);
    apptCss.insertRule(".datepicker-head{color: "+daysTextColour+";}",0);
    
    showCalendar(currentMonth, currentYear, dateColour);
    document.getElementById('datepicker-container').style.display = 'block';
    document.getElementById('booking-btn').style.display = 'none';
}

function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function lastMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    var firstDay = (new Date(year, month)).getDay(),
        daysInMonth = 32 - new Date(year, month, 32).getDate(),
        tbl = document.getElementById('datepicker-body'),
        date = 1; 

    tbl.innerHTML = '';

    document.getElementById('monthAndYear').innerHTML = months[month] + " " + year;

    selectedMonth = months[month];

    for (var i = 0; i < 6; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                var cell = document.createElement('td'),
                    cellText = document.createTextNode('');
                cell.appendChild(cellText);
                cell.classList.add('dp-no-date');
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                var cell = document.createElement('td'),
                    cellText = document.createTextNode(date);
                cell.classList.add('dp-date');

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.onclick= function(){
                        selectDate(this);
                    }
                } else if((date < today.getDate() && year === today.getFullYear() && month === today.getMonth())||( year === today.getFullYear() && month < today.getMonth())|| year < today.getFullYear()) {
                    cell.classList.add('dp-date-passed');
                } else{
                    cell.onclick= function(){
                        selectDate(this);
                    }
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                
                date++;
            }
        }
        tbl.appendChild(row);
    }
}

function selectDate(tableCell) {
    var oldSelected = document.getElementsByClassName('dp-date-selected'),
        times = [["9am","10am","12pm","4pm","5pm"],["11am"],["10am", "1pm", "3pm", "4pm"],["9am","5pm"],["2pm","3pm","4pm"],["10am","11am","12pm","2pm","5pm"]],
        timepickerBody = document.getElementById("timepicker-body"),
        timeList= times[Math.floor(Math.random() * 6)],
        timeDiv;

    // clear previous selections
    if(oldSelected.length > 0){
        oldSelected[0].classList.remove('dp-date-selected');
    }
    while (timepickerBody.firstChild) {
        timepickerBody.removeChild(timepickerBody.firstChild);
    }

    // make new selection
    tableCell.classList.add('dp-date-selected');

    for(var i = 0; i < timeList.length; i++){
        timeDiv = document.createElement('div');
        timeDiv.classList.add('timepicker-time');
        timeDiv.innerHTML = timeList[i];

        timeDiv.onclick= function(){
            selectTime(this,tableCell);
        }
        timepickerBody.appendChild(timeDiv);
    } 

    document.getElementById('timepicker').style.display= 'block';
}

function selectTime(timeDiv, dateCell) {
    var oldSelected = document.getElementsByClassName('tp-time-selected');

    // clear previous selections
    if(oldSelected.length > 0){
        oldSelected[0].classList.remove('tp-time-selected');
    }
    // make new selection
    timeDiv.classList.add('tp-time-selected');

    // display time confirmation message
    bookedTime = timeDiv.innerHTML;
    document.getElementById('book-time').innerHTML = bookedTime;
    bookedDate = dateNth(dateCell.innerHTML) + ' ' + selectedMonth;
    document.getElementById('book-date').innerHTML = bookedDate;
    document.getElementById('time-confirmation').style.display = 'block';
}

function dateNth(date) {
    if(date>3 && date<21) return date+'th';
    switch (date % 10) {
        case 1:  return date+"st";
        case 2:  return date+"nd";
        case 3:  return date+"rd";
        default: return date+"th";
    }
} 

function confirmBooking(){
    document.getElementById('booker-container').setAttribute('style','display:none');
    document.getElementById('booked-time').innerHTML = bookedTime;
    document.getElementById('booked-date').innerHTML = bookedDate;
    document.getElementById('booking-confirmation').style.display = 'block';
}

function closePopup(){
    var timeSelected = document.getElementsByClassName('tp-time-selected'),
        dateSelected = document.getElementsByClassName('dp-date-selected');

    document.getElementById('time-confirmation').style.display = 'none';

    // clear previous selections
    if(timeSelected.length > 0){
        timeSelected[0].classList.remove('tp-time-selected');
    }
    if(dateSelected.length > 0){
        dateSelected[0].classList.remove('dp-date-selected');
    }
}