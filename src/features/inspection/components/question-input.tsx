import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Slider } from "@/components/slider";
import { Question } from "@/db";
import S3Image from "@/features/upload/components/s3-image";
import UploadImageInput from "@/features/upload/components/upload-image-input";

export default function QuestionInput({
  question,
  value,
  updateAnswer,
}: {
  question: Question;
  updateAnswer: (answer: { questionId: string; value: string }) => void;
  value: string;
}) {
  console.log(value);
  return (
    <>
      {" "}
      <Label className="flex !flex-row gap-1">
        {question.label}

        {question.required && <span className="text-red-500">*</span>}
      </Label>
      {question.type === "TEXT" && (
        <Input
          type="text"
          required={question.required || false}
          value={value}
          onChange={(e) => {
            updateAnswer({
              questionId: question.id,
              value: e.target.value,
            });
          }}
        />
      )}
      {question.type === "NUMBER" && (
        <Input
          type="number"
          required={question.required || false}
          value={value}
          onChange={(e) => {
            updateAnswer({
              questionId: question.id,
              value: e.target.value,
            });
          }}
        />
      )}
      {question.type === "PERCENTAGE" && (
        <div className="flex items-center gap-5">
          <Slider
            className="bg-gray-100"
            value={[parseInt(value || "0")]}
            onValueChange={(value) => {
              updateAnswer({
                questionId: question.id,
                value: value[0].toString(),
              });
            }}
            step={10}
            min={0}
            max={100}
          />

          <div className="flex items-center gap-3">
            <Input
              required={question.required || false}
              type="number"
              value={value}
              onChange={(e) => {
                updateAnswer({
                  questionId: question.id,
                  value: e.target.value,
                });
              }}
            />
            %
          </div>
        </div>
      )}
      {question.type === "SELECT" && (
        <RadioGroup
          className="flex gap-5 flex-row flex-wrap"
          required={question.required || false}
          onValueChange={(value) => {
            updateAnswer({
              questionId: question.id,
              value: value,
            });
          }}
          name={question.id}
          value={value}
        >
          {question.options.map((option) => (
            <div className="flex items-center space-x-2" key={option}>
              <RadioGroupItem value={option} id={question.id + option} />
              <Label className="cursor-pointer" htmlFor={question.id + option}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
      {question.type === "IMAGE" && (
        <div className="flex flex-col gap-2">
          {!!value?.length && (
            <S3Image
              className="w-auto h-40 object-contain rounded-lg"
              imagePath={value}
            />
          )}

          <UploadImageInput
            required={question.required || false}
            setImagePath={async (key) => {
              updateAnswer({
                questionId: question.id,
                value: key,
              });
            }}
          />
        </div>
      )}
      {question.type === "DATE" && (
        <Input
          type="date"
          value={
            value
              ? new Date(value || "").toISOString().split("T")[0]
              : undefined
          }
          required={question.required || false}
          onChange={(e) => {
            updateAnswer({
              questionId: question.id,
              value: e.target.value,
            });
          }}
        />
      )}
      {question.type === "DATETIME" && (
        <Input
          type="datetime-local"
          value={
            value ? new Date(value || "").toISOString().slice(0, 16) : undefined
          }
          required={question.required || false}
          onChange={(e) => {
            updateAnswer({
              questionId: question.id,
              value: e.target.value,
            });
          }}
        />
      )}
    </>
  );
}
