// import
export const decodeRole = (key: string) => {
  if (key === process.env.STUDENT) {
    return "STUDENT";
  }
  if (key === process.env.PROFESSOR) {
    return "PROFESSOR";
  }
  if (key === process.env.ADMIN) {
    return "ADMIN";
  }
};
