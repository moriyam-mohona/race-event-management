"use client";

import { Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useFieldArray, useFormContext } from "react-hook-form";
import MyFormInput from "../MyFormInput/MyFormInput";
import MyFormTextArea from "../MyFormTextArea/MyFormTextArea";

const FAQFormList = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "frequentlyAskedQuestions",
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-lg p-4 mb-4 relative"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium mb-2">FAQ {index + 1}</h3>

            <Button
              type="text"
              danger
              icon={<MinusCircleOutlined />}
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>

          <MyFormInput name={`faqs.${index}.question`} label="Question" />

          <MyFormTextArea name={`faqs.${index}.answer`} label="Answer" />
        </div>
      ))}

      <Button
        type="dashed"
        onClick={() => append({ question: "", answer: "" })}
        block
        icon={<PlusOutlined />}
        className="!text-primary"
      >
        Add New
      </Button>
    </div>
  );
};

export default FAQFormList;
