export const validateEmail = (email: string): boolean => {
    console.log(email)
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.(com|org|net|edu|gov|io|dev|info|biz|co|us|uk|br)$/i;;
    return emailRegex.test(email);
};