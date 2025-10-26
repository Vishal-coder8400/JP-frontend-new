import { toast } from "sonner";

export class ErrorHandler {
  static recentToastCache = new Map();

  static extractErrorMessage(error) {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "An unexpected error occurred";
  }

  static handleApiError(error, customMessage) {
    const message = customMessage || this.extractErrorMessage(error);
    console.error("API Error:", error);
    toast.error(message);
    return message;
  }

  static handleMutationError(error, defaultMessage) {
    const message = this.extractErrorMessage(error);
    toast.error(message || defaultMessage);
    return message;
  }

  static handleMutationSuccess(data, defaultMessage) {
    const message = data?.message || defaultMessage;
    const now = Date.now();

    if (
      !this.recentToastCache.has(message) ||
      now - this.recentToastCache.get(message) > 1000
    ) {
      this.recentToastCache.set(message, now);
      toast.success(message);
    }

    return message;
  }

  static logError(context, error, additionalInfo = {}) {
    console.error(`[${context}]`, {
      error,
      message: this.extractErrorMessage(error),
      ...additionalInfo,
    });
  }
}

export const handleApiError = ErrorHandler.handleApiError.bind(ErrorHandler);
export const handleMutationError =
  ErrorHandler.handleMutationError.bind(ErrorHandler);
export const handleMutationSuccess =
  ErrorHandler.handleMutationSuccess.bind(ErrorHandler);
export const extractErrorMessage =
  ErrorHandler.extractErrorMessage.bind(ErrorHandler);
export const logError = ErrorHandler.logError.bind(ErrorHandler);

export default ErrorHandler;
