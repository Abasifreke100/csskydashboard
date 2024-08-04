import { CalendarIcon } from "lucide-react";
import cn from "../../lib/utils";
import { Button } from "../ui/button";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useController, Control, FieldValues, Path } from 'react-hook-form';

interface CustomDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  buttonClassName?: string;
}

const CustomDatePicker = <T extends FieldValues>({ control, name, buttonClassName }: CustomDatePickerProps<T>) => {
  const { field } = useController({ control, name });

  return (
    <Popover >
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              " text-left font-normal hover:bg-gray-200 py-2",
              !field.value && "text-muted-foreground", buttonClassName
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          // disabled={(date) =>
          //   date > new Date() || date < new Date("1900-01-01")
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default CustomDatePicker;
