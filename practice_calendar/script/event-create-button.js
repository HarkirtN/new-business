export function initEventCreateButton() {
    const buttonElement = document.querySelector("[data-event-create-button]")

    if (!buttonElement) {
        console.warn("Could not find event create button element");
        return;
    }

    buttonElement.addEventListener("click",() => {
        buttonElement.dispatchEvent(new CustomEvent("event-create-request", {

            bubbles:true
        }))
    })
}
