export const getFullName = (manager) => {
    if (!manager) {
        return null;
    }

    const { firstName, middleName, lastName } = manager;

    return `${lastName} ${firstName} ${middleName}`;
}