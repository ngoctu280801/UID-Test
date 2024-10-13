import React, { useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Input, Tag } from "antd";
import { FieldWrapper } from "../FieldWrapper";

export const TagContainer = ({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (tags: string[]) => void;
  value?: string[];
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = value?.filter((tag) => tag !== removedTag);
    onChange(newTags as string[]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (inputValue && !value?.includes(inputValue)) {
      onChange([...(value || []), inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  return (
    <FieldWrapper label={label}>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleInputConfirm}
      />
      <div>
        {value?.map((tag) => (
          <Tag
            closable
            onClose={(e) => {
              e.preventDefault();
              handleClose(tag);
            }}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </FieldWrapper>
  );
};
