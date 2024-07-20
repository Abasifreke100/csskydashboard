import { ChevronLeft, Send, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import { IoMdAttach } from "react-icons/io";
import { Button } from "../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { useState } from "react";
import { truncateText } from "../../../utils/text";

const InboxDetailsPage = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPopoverOpen(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const sampleData = [
    {
      text: "Pen auto auto rectangle resizing arrow move. Mask editor star blur draft. Effect fill team ipsum asset vector editor overflow mask variant. Rotate editor layer distribute italic boolean export underline. Rotate align subtract text object text",
      name: "Alan Ifiok (Customer)",
      time: "Today 11:30 PM",
    },
    {
      text: "Pen auto auto rectangle reesizing arrow move. Mask editor star blur draft. Effect fill team ipsum asset vector",
      name: "James",
      time: "Today 11:30 PM",
    },
  ];

  return (
    <div>
      <button
        className="flex items-center"
        onClick={() => window.history.back()}
      >
        <ChevronLeft size={18} />
        <p className="font-medium mt-0.5">
          {" "}
          Network Problem{" "}
          <span className="text-xs font-medium text-gray-400">#101</span>
        </p>
      </button>
      <div className="py-8 w-full">
        <Card className="w-full md:w-[80%] lg:w-[70%]">
          <CardHeader className="" />
          <CardContent className="p-4 space-y-6">
            {sampleData.map((message, index) => (
              <div
                key={message.name}
                className={`flex ${
                  index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                } items-start gap-1.5`}
              >
                <Avatar
                  className={`h-10 w-10 ${index % 2 === 0 ? "mr-2" : "ml-2"}`}
                >
                  <AvatarImage src="https://github.com/max-programming.png" />
                  <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`${
                    index % 2 === 0
                      ? "bg-orange-50 text-orange-950 rounded-tr-none rounded-tl-xl rounded-bl-xl rounded-br-xl"
                      : "bg-gray-50 text-gray-950 rounded-tl-none rounded-tr-xl rounded-bl-xl rounded-br-xl"
                  } p-3`}
                >
                  <p className="text-xs">{message.text}</p>
                  <div className="text-xs font-medium mt-2 flex items-center justify-between">
                    <p>{message.name}</p>
                    <p className="text-gray-400">{message.time}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 mt-6">
              <div
                className={`flex-1 flex-col bg-gray-100 border relative flex rounded-xl p-2 ${
                  selectedFile && "gap-2"
                }`}
              >
                <div>
                  {selectedFile && (
                    <div className="mt-2 flex items-center gap-2 relative">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt={selectedFile.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <p className="text-xs">
                        {truncateText(selectedFile.name, 30)}
                      </p>
                      <X
                        className="absolute right-2 top-1 cursor-pointer"
                        size={16}
                        onClick={handleClearFile}
                      />
                    </div>
                  )}
                </div>
                <div className="w-full flex">
                  <Input
                    className="flex-1 bg-transparent border-0 text-xs focus:ring-0"
                    placeholder="Start Typing..."
                  />
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger>
                      <div className="bg-white h-9 w-9 flex rounded-full items-center justify-center">
                        <IoMdAttach />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-[150px] text-sm h-9 p-0 px-3 py-0  flex items-center"
                      sideOffset={-200}
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <p className="text-gray-500 font-medium hover:text-gray-400">
                          Upload
                        </p>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button className="text-white text-xs h-8 rounded-xl flex items-center gap-1.5 font-medium">
                Send <Send size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InboxDetailsPage;
