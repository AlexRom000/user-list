import { ToastTypeEnum } from "../enums/toast-type.enum";

export interface Toast {
    message: string,
    type: ToastTypeEnum,
}