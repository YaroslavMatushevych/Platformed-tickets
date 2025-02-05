import { Box } from "@chakra-ui/react";
import { memo } from "react";

const PageLayout = memo(({ children }: { children?: React.ReactNode }) => {
  return (
    <Box flex="1" overflowY="auto" bg="gray.900">
      {children}
    </Box>
  );
});

export default PageLayout;
