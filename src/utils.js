export function generateID() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

export const ErrorMessage = {
    TITLE_ERROR: "Курс не может быть без названия",
    TASK_ERROR: "У курса должна быть хотя бы одна задача"
}