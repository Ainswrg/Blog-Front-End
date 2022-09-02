type TGetToken = () => string | null;
type TSetToken = (token: string | null) => void;

export const setTokenLocalStorage: TSetToken = (token: string | null) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getTokenLocalStorage: TGetToken = () => {
  const json = localStorage.getItem("token");

  if (!json) {
    return null;
  }

  const token: string = JSON.parse(json);

  return token;
};

export const time = (timeValue: string): string => {
  const arrDate = timeValue.split("T");
  const date = arrDate[0];
  const dateTime = arrDate[1].split(".")[0];
  return `${date} ${dateTime}`;
};
