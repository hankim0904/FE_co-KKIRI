import React from "react";
import StudyProjectRadioButton from "./StudyProjectRadioButton";
import { Controller } from "react-hook-form";

export default function RHFRadioButton({ formFieldName, control }) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <StudyProjectRadioButton selectedValue={field.value} onChange={field.onChange} />}
    />
  );
}
