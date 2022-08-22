const MIN_CHARACTERS = 7;
const regex = /\S+@\S+\.\S+/;

export const emailVerification = (email) => regex.test(email);

export const passwordVerification = (password) => password.length >= MIN_CHARACTERS;
