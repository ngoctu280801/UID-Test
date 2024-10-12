import React, { useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Input, Tag } from "antd";
import { FieldWrapper } from "../FieldWrapper";

export const TagContainer = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (tags: string[]) => void;
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags && tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  useEffect(() => {
    onChange(tags);
  }, [onChange, tags]);

  return (
    <FieldWrapper label={label}>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
      <div>
        {tags.map((tag) => (
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
