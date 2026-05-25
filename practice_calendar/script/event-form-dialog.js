import { initDialog } from "./dialog.js";

export function initEventFormDialog() {
    const dialog = initDialog("event-form");

    document.addEventListener("event-create-request", () => {
        console.log("Received event create request");
    })
}