import { FOCUS } from './constants';

export function formatFocus(focus) {
    switch (focus) {
        case FOCUS.CUSTOM:
            return "Custom";
        case FOCUS.AI:
            return "Artificial Intelligence";
        case FOCUS.BIO_INFORMATIC:
            return "Bioinformatics";
        case FOCUS.BUSINESS:
            return "Business & Entrepreneurship";
        case FOCUS.CYBER_SEC:
            return "Cybersecurity";
        case FOCUS.DATA_SCIENCE:
            return "Data Science";
        case FOCUS.HCI:
            return "Human Computer Interaction";
        case FOCUS.ROBOTICS:
            return "Robot Intelligence";
        case FOCUS.GAME_DEV:
            return "Simulation & Game Programming";
        case FOCUS.WEB_DEV:
            return "Web & Mobile Application Development";
        default:
            return "";
    }
}