import { useState } from "react";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import Button from "./Button";
import { ICONS } from "@/constants/icons";

interface SearchInputProps {
  placeholder: string;
  handleValueChange: (value: string) => void;
}

export default function SearchInput({ placeholder, handleValueChange }: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    setInputValue(newValue);
    handleValueChange(newValue);
  };

  const handleDeleteClick = () => {
    setInputValue("");
    handleValueChange("");
  };

  return (
    <Container>
      <StyledInput type="search" value={inputValue} placeholder={placeholder} onChange={handleInputChange} />
      <ButtonContainer>
        {inputValue && <Button icon={ICONS.deleted} type="button" onClick={handleDeleteClick} />}
        <Button icon={ICONS.search} type="submit" />
      </ButtonContainer>
    </Container>
  );
}

const {
  color,
  mediaQueries: { tablet, mobile },
} = DESIGN_TOKEN;

const Container = styled.div`
  position: relative;
  width: 36rem;

  ${tablet} {
    width: 32rem;
  }
  ${mobile} {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  font-size: 1.4rem;
  line-height: normal;
  font-weight: 500;
  background-color: ${color.gray[3]};
  border-radius: 9.8rem;
  border: none;
  color: ${color.black[1]};
  padding: 1.5rem 8rem 1.6rem 2.4rem;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${color.gray[1]};
  }

  &[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }
`;

const ButtonContainer = styled.span`
  display: flex;
  gap: 1.2rem;
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translate(0, -50%);
`;
