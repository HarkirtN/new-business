export function initViewSelect() {
    const viewSelectElement = document.querySelector("[data-view-select]");
    console.log(viewSelectElement);

    viewSelectElement.addEventListener("change", (event) => {
        // dispatch event for an object create the order as synchroniously 
        //custom event to add cutomised event - by doing view change you can place a 
        //property view - value
        viewSelectElement.dispatchEvent(new CustomEvent("view-change", {
            detail: {
                view: viewSelectElement.value
            },
            bubbles: true // bubbles up the DOM tree so it can be rendered 
        }))
    });
}