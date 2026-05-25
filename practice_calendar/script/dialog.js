export function initDialog(name) {
    const dialogElement = document.querySelector(`[data-dialog=${name}]`);

    if (!dialogElement) {
        console.log(`Could not find dialog element with name ${name}`);
        return;
    } else { 
        return {
       open() {
        dialogElement.showModal();
    },
        close() {
         dialogElement.close();
    }
    }
    }} 
