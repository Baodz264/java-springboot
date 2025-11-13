import React from "react";
import { QuantityWrapper, Label, ControlGroup, Button, QuantityDisplay } from "./style";
import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity = 1, onChange }) => {
  const handleDecrease = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const handleIncrease = () => {
    onChange(quantity + 1);
  };

  return (
    <QuantityWrapper>
      <Label>Số lượng:</Label>
      <ControlGroup>
        <Button onClick={handleDecrease} disabled={quantity <= 1}>
          <Minus size={18} />
        </Button>
        <QuantityDisplay>{quantity}</QuantityDisplay>
        <Button onClick={handleIncrease}>
          <Plus size={18} />
        </Button>
      </ControlGroup>
    </QuantityWrapper>
  );
};

export default QuantitySelector;
