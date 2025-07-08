"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface TopicSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function TopicSelector({
  value,
  onChange,
  options,
}: TopicSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : "Select a topic"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md p-0">
        <Command>
          <CommandInput placeholder="Search topic…" />
          <CommandList>
            <CommandEmpty>No topic found.</CommandEmpty>
            {options.map((topicName) => (
              <CommandItem
                key={topicName}
                value={topicName}
                onSelect={() => {
                  onChange(topicName);
                  setOpen(false);
                }}
              >
                {topicName.charAt(0).toUpperCase() + topicName.slice(1)}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
