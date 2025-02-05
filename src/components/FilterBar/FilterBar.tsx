import { memo } from "react";
import {
  HStack,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  SelectLabel,
  createListCollection,
  ListCollection,
  SelectValueChangeDetails,
} from "@chakra-ui/react";

interface FilterBarProps {
  priorityFilter: string | undefined;
  setPriorityFilter: (value: string | undefined) => void;
  statusFilter: string | undefined;
  setStatusFilter: (value: string | undefined) => void;
}

interface FilterProps {
  label: string;
  filterValue: string | undefined;
  setFilterValue: (value: string | undefined) => void;
  options: Array<[string, string]>; // Options as [Label, Value]
}

const Filter: React.FC<FilterProps> = memo(
  ({ label, filterValue, setFilterValue, options }) => {
    // Add "All" as the first option
    const collection: ListCollection<string[]> = createListCollection({
      items: [["All", ""], ...options],
    });

    return (
      <SelectRoot
        style={{
          position: "relative",
        }}
        value={filterValue ? [filterValue] : [""]} // Treat empty value as "All"
        onValueChange={(details: SelectValueChangeDetails<string[]>) =>
          setFilterValue(details.value[0] || undefined)
        }
        collection={collection}
        colorPalette="blue"
        variant="outline"
        size="md"
      >
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger
          style={{
            cursor: "pointer",
          }}
        >
          <SelectValueText>
            {
              collection.items.find(
                ([, value]) => value === (filterValue || "")
              )?.[0]
            }
          </SelectValueText>
        </SelectTrigger>
        <SelectContent
          style={{
            position: "absolute",
            zIndex: 10,
            top: "66px",
            minWidth: "200px",
          }}
        >
          {collection.items.map(([itemLabel, itemValue]) => (
            <SelectItem key={itemValue} item={itemValue}>
              {itemLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    );
  }
);

const FilterBar: React.FC<FilterBarProps> = memo(
  ({ priorityFilter, setPriorityFilter, statusFilter, setStatusFilter }) => {
    const priorityOptions: Array<[string, string]> = [
      ["Low", "low"],
      ["Medium", "medium"],
      ["High", "high"],
    ];

    const statusOptions: Array<[string, string]> = [
      ["Backlog", "backlog"],
      ["Triage", "triage"],
      ["In Progress", "in-progress"],
      ["Done", "done"],
    ];

    return (
      <HStack
        gap={4}
        mb={4}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        justify={{ base: "center", md: "space-between" }}
      >
        <Filter
          label="Select Priority"
          filterValue={priorityFilter}
          setFilterValue={setPriorityFilter}
          options={priorityOptions}
        />
        <Filter
          label="Select Status"
          filterValue={statusFilter}
          setFilterValue={setStatusFilter}
          options={statusOptions}
        />
      </HStack>
    );
  }
);

export default FilterBar;
