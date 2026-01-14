import { useQuery } from "@tanstack/react-query";
import { getAllSectoralOptions } from "../../api/recruiter/sectoralOption";

export const useSectorOptions = () => {
  return useQuery({
    queryKey: ["sector-options"],
    queryFn: ({ signal }) => getAllSectoralOptions({ signal }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
