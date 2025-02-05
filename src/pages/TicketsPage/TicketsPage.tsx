import { useState, useCallback, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import TicketList from "../../components/TicketList/TicketList";
import FilterBar from "../../components/FilterBar/FilterBar";
import { Ticket } from "../../types";
import { TICKETS } from "../../data/data";

const TicketsPage: React.FC = () => {
  const [tickets] = useState(() => TICKETS);
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  // change value from true to false to see immediate render(skip skeleton)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handlePriorityChange = useCallback(
    (value: string | undefined) => setPriorityFilter(value),
    []
  );
  const handleStatusChange = useCallback(
    (value: string | undefined) => setStatusFilter(value),
    []
  );

  // comment out useEffect to see immediate render(skip skeleton)
  useEffect(() => {
    setIsLoading(true); // Simulate loading state
    const timeout = setTimeout(() => {
      const filtered = tickets.filter((ticket: Ticket) => {
        return (
          (!priorityFilter || ticket.priority === priorityFilter) &&
          (!statusFilter || ticket.status === statusFilter)
        );
      });
      setFilteredTickets(filtered);
      setIsLoading(false);
    }, 500); // Simulated async delay

    return () => clearTimeout(timeout);
  }, [tickets, priorityFilter, statusFilter]);

  // uncomment filteredTickets to see immediate render(skip skeleton)
  //   const filteredTickets = useMemo(
  //     () =>
  //       tickets.filter((ticket: Ticket) => {
  //         return (
  //           (!priorityFilter || ticket.priority === priorityFilter) &&
  //           (!statusFilter || ticket.status === statusFilter)
  //         );
  //       }),
  //     [tickets, priorityFilter, statusFilter]
  //   );

  return (
    <Box p={8} bg="gray.900" minH="100vh">
      <FilterBar
        priorityFilter={priorityFilter}
        setPriorityFilter={handlePriorityChange}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusChange}
      />
      <TicketList tickets={filteredTickets} isLoading={isLoading} />
    </Box>
  );
};

export default TicketsPage;
