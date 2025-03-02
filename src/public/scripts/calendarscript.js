document.addEventListener('DOMContentLoaded', function() {
    const dateContainer = document.getElementById('dateContainer');
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    let currentDate = new Date();

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1);
        return new Date(d.setDate(diff));
    }

    function updateCalendar() {
        dateContainer.innerHTML = '';
        let monday = getMonday(currentDate);
        for (let i = 0; i < 7; i++) {
            let date = new Date(monday);
            date.setDate(monday.getDate() + i);
            let dateCell = document.createElement('div');
            dateCell.className = 'date-cell';
            if (date.toDateString() === new Date().toDateString()) {
                dateCell.classList.add('today');
            }
            dateCell.innerHTML = `
                <div class="day">${dayNames[date.getDay()]}</div>
                <div class="date">${date.getDate()}</div>
            `;
            dateContainer.appendChild(dateCell);
        }
    }

    prevWeekBtn.addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() - 7);
        updateCalendar();
    });

    nextWeekBtn.addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() + 7);
        updateCalendar();
    });

    updateCalendar();
});