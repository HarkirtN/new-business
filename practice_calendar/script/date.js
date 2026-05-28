export function today() {
    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(), 
        12
    );
}

export function addMonths (date, months) {
    const firstDayofMonth = new Date(
        date.getFullYear(),
        date.getMonth() + months,
        1,
        date.getHours()
    );

    const lastDayOfMonth = getLastDayOfMonth(firstDayofMonth);
    
    const dayOfMonth = Math.min(date.getDate(), lastDayOfMonth.getDate());

    return new Date(
        date.getFullYear(),
        date.getMonth() + months,
        dayOfMonth,
        date.getHours()
    );
}

export function subtractMonths (date, months) {
 return addMonths(date, -months);
}

export function addDays (date, days) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours(),
    );
}

export function subtractDays (date, days) {
    return addDays(date, -days);
}

export function generateMonthCalendarDays (currentDate) {
    const calendarDays = [];
    const lastDayOfPreviousMonthDate = getLastDayOfMonth(subtractMonths(currentDate, 1));
    const lastDayOfPreviousMonthWeekday = lastDayOfPreviousMonthDate.getDay();

    if (lastDayOfPreviousMonthWeekday !== 6) {
        for (let i = lastDayOfPreviousMonthWeekday; i >= 0; i -= 1) {
            const calendarDay = subtractDays(lastDayOfPreviousMonthDate, i);
            calendarDays.push(calendarDay); }
        }
    return calendarDays;
}

function getLastDayOfMonth(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        12
    );
}