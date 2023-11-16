import { ToastPosition } from "react-hot-toast";

export interface AlertPropsType {
    toast: boolean;
    confirm: boolean;
    error: boolean;
    title: string;
    desc: string;
    position: ToastPosition;
    checkClick?: () => void;
    closeClick?: () => void;
}