import { today, addDays, subtractDays, addMonths, subtractMonths } from "./date.js";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
});

export function initNav() {
    const todayButtonElements = document.querySelectorAll("[data-nav-today-button]");
    const previousButtonElement = document.querySelector("[data-nav-previous-button]");
    const nextButtonElemment = document.querySelector("[data-nav-next-button]");
    const dateButtonElemment = document.querySelector("[data-nav-date]");

    let selectedView = "month";
    let selectedDate = today();

    previousButtonElement.addEventListener("click", () => {
        previousButtonElement.dispatchEvent (new CustomEvent("date-change", {
            detail: {
                date: getPreviousDate(selectedView, selectedDate)
            },
            bubbles: true
            }));
    });

    nextButtonElemment.addEventListener("click", () => {
        nextButtonElemment.dispatchEvent (new CustomEvent("date-change", {
            detail: {
                date: getNextDate(selectedView, selectedDate)
            },
            bubbles: true
            }));
    });

    for (const button of todayButtonElements) {
        button.addEventListener("click", () => {
            console.log("Today button clicked");
            button.dispatchEvent (new CustomEvent("date-change", {
                detail: {
                    date:today()
                },
                bubbles: true
             }));
        }); 
    }

    document.addEventListener("view-change", (event) => {
        selectedView = event.detail.view;
    });
    
    document.addEventListener("date-change", (event) => {
        selectedDate = event.detail.date;
        refreshDateElement(dateButtonElemment, selectedDate);
    });

    refreshDateElement( dateButtonElemment, selectedDate);
}

function refreshDateElement( dateButtonElement, selectedDate) {
    dateButtonElement.textContent = dateFormatter.format(selectedDate);
}

function getPreviousDate(selectedView, selectedDate) {
    if (selectedView === "day") {
        return subtractDays(selectedDate, 1);
    }
    // Add more conditions for other views if needed

    if (selectedView === "week") {
        return subtractDays(selectedDate, 7);
    }

    return subtractMonths(selectedDate, 1);
}

function getNextDate(selectedView, selectedDate) {
    if (selectedView === "day") {
        return addDays(selectedDate, 1);
    }

    if (selectedView === "week") {
        return addDays(selectedDate, 7);
    }

    return addMonths(selectedDate, 1);
}


