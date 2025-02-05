import { memo } from "react";
import { Box, Text, Badge, HStack } from "@chakra-ui/react";
import { Ticket } from "../../types";
import { Avatar } from "../Avatar/Avatar";

interface TicketCardProps {
  ticket: Ticket;
}

const getPriorityDetails = (priority: string | undefined) => {
  switch (priority) {
    case "high":
      return { color: "red", label: "🔴 High" };
    case "medium":
      return { color: "yellow", label: "🟡 Medium" };
    case "low":
      return { color: "green", label: "🟢 Low" };
    default:
      return { color: "gray", label: "No Priority" };
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "done":
      return "✔️ Done";
    case "in-progress":
      return "⏳ In Progress";
    case "triage":
      return "🛠️ Triage";
    case "backlog":
      return "📋 Backlog";
    default:
      return "Unknown Status";
  }
};

const TicketCard: React.FC<TicketCardProps> = memo(({ ticket }) => {
  const { color: priorityColor, label: priorityLabel } = getPriorityDetails(
    ticket.priority
  );
  const statusLabel = getStatusLabel(ticket.status);

  return (
    <Box w="full" p={4} bg="gray.800" borderRadius="lg" shadow="lg">
      <Text fontSize="lg" fontWeight="bold" color="white">
        {ticket.title}
      </Text>
      <Text color="gray.400" mt={1} fontSize="sm">
        {ticket.description}
      </Text>
      <HStack justify="space-between" mt={4}>
        <Badge colorPalette={priorityColor}>{priorityLabel}</Badge>
        <Badge colorPalette="gray">{statusLabel}</Badge>
      </HStack>

      {ticket.assignee && (
        <HStack mt={4} align="center">
          <Avatar size="sm" src={ticket.assignee.avatarUrl} />
          <Text color="white">{ticket.assignee.name}</Text>
        </HStack>
      )}
    </Box>
  );
});

export default TicketCard;
