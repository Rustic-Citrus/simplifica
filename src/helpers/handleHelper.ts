import React, { SetStateAction } from "react";

export const handleChangeHelper = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<SetStateAction<string>>
) => {
  const value = e.target.value;
  setState(value);
};
