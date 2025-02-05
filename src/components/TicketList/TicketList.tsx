import { memo } from "react";
import { VStack, Text, StackProps, Box } from "@chakra-ui/react";
import TicketCard from "../TicketCard/TicketCard";
import { Ticket } from "../../types";

interface TicketListProps extends StackProps {
  tickets: Ticket[];
  isLoading: boolean;
}

const TicketSkeleton: React.FC = () => (
  <Box h={"156px"} w="full" p={4} bg="gray.800" borderRadius="md" shadow="sm" />
);

const TicketList: React.FC<TicketListProps> = memo(
  ({ tickets, isLoading, ...stackProps }) => {
    if (isLoading) {
      return (
        <VStack gap={4} mt={6} {...stackProps}>
          {[...Array(5)].map((_, index) => (
            <TicketSkeleton key={index} />
          ))}
        </VStack>
      );
    }

    return (
      <VStack gap={4} mt={6} {...stackProps}>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <Text color="gray.400">No tickets found</Text>
        )}
      </VStack>
    );
  }
);

export default TicketList;
