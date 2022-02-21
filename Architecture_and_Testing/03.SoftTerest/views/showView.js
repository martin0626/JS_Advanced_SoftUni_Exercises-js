import { status } from "../tools/checkStatus.js";
import { clearView } from "../tools/viewOpt.js";
import { addBoards, dashboardView } from "./dashView.js";

export function showView(id) {

    status();
    clearView();


    const section = document.getElementById(id);
    const visibleArea = document.getElementById('visible');
    visibleArea.appendChild(section);

    if (id == 'dashboard-holder') {
        dashboardView()
    }
}