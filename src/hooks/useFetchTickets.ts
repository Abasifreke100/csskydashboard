import { useState, useEffect } from "react";
import { errorToast, successToast } from "../utils/toast";
import { TicketService } from "../service/ticket";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../models/query";
import { ViewOneTaskDataResponse } from "../types/task";
import { Message, Ticket } from "../types/ticket";

interface UseFetchTicketsProps {
  userIds: string[];
}

type AllTickets = Ticket[];

const BATCH_SIZE = 10;

const retryRequest = async (userId: string, retries = 3) => {
  while (retries > 0) {
    try {
      return await TicketService.getTickets(userId);
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
    }
  }
};

export const useFetchTickets = ({ userIds }: UseFetchTicketsProps) => {
  const [tickets, setTickets] = useState<AllTickets>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [failedRequests, setFailedRequests] = useState<string[]>([]); // Track failed requests

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        const totalBatches = Math.ceil(userIds.length / BATCH_SIZE);

        let isFirstBatch = true; // Flag to check if it's the first batch

        for (let i = 0; i < totalBatches; i++) {
          const batch = userIds.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
          const ticketPromises = batch.map((userId) =>
            retryRequest(userId).catch(() => userId)
          );

          const batchResults = await Promise.allSettled(ticketPromises);

          const newTickets: AllTickets = [];
          batchResults.forEach((result) => {
            if (result.status === "fulfilled") {
              const responseData = result.value;
              const ticketsFromResult = Array.isArray(responseData?.data?.data)
                ? responseData.data.data
                : [];

              if (ticketsFromResult.length > 0) {
                const tickets = ticketsFromResult.map(
                  (item: { Ticket: Ticket }) => item?.Ticket
                );
                newTickets.push(...tickets); // Accumulate tickets for this batch
              } else {
                console.warn("No tickets found for this user.");
              }
            } else if (result.status === "rejected") {
              const failedUserId = result.reason;
              setFailedRequests((prev) => [...prev, failedUserId]);
              console.error(
                `Error fetching tickets for user ID ${failedUserId}`
              );
            }
          });

          // Update the state with tickets from this batch
          if (newTickets.length > 0) {
            setTickets((prevTickets) => [...prevTickets, ...newTickets]);
          }

          // Set isLoading to false after the first batch
          if (isFirstBatch) {
            setIsLoading(false);
            isFirstBatch = false; // Ensure isLoading is set to false only once
          }
        }

        successToast({
          title: "Tickets Loaded",
          message: `All successful tickets have been loaded. Failed for: ${failedRequests.join(
            ", "
          )}`,
        });
      } catch (err) {
        setError(err as Error);
        errorToast({
          title: "Fetch Error",
          message: "An error occurred while fetching tickets.",
        });
        console.log("error", err);
      } finally {
        // Ensure isLoading is set to false if all batches are processed
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    if (userIds.length > 0) {
      fetchTickets();
    }
  }, [userIds]);

  return {
    tickets,
    isLoading,
    error,
    failedRequests, // expose failed requests to UI if needed
  };
};




type FetchResponse = {
  task: ViewOneTaskDataResponse; // Allow empty object as a fallback
  ticket: Message; // Allow empty object as a fallback
};



export const useFetchSingleTicket = (ticketId: string | null) => {
  const { data, isLoading, isSuccess, isError, error } =
    useQuery<FetchResponse>({
      queryKey: QueryKeys.GetSingleTicket(ticketId ?? ""),
      queryFn: async () => {
        if (!ticketId) {
          throw new Error("Ticket ID is required");
        }

        // Call the getTicketAndTask function to fetch both ticket and task details
        const response = await TicketService.getTicketAndTask(ticketId);
        const ticketDetails = response?.ticket?.data?.message ?? {}; // Use empty object as fallback
        const taskDetails = response?.task ?? {}; // Use empty object as fallback
        console.log("ticket details:", ticketDetails);

        // Structure the response to include both ticket and task data
        return {
          ticket: ticketDetails,
          task: taskDetails,
        };
      },
      enabled: !!ticketId, // Only run the query if ticketId is not null
      meta: {
        errCode: "SINGLE_TICKET_FETCH_ERROR",
      },
    });

  // Effect to handle toasts based on success or error
  useEffect(() => {
    if (isSuccess) {
      if (!data?.ticket && !data?.task) {
        errorToast({
          title: "Fetch Error",
          message: "Both ticket and task data failed to load.",
        });
      } else {
        successToast({
          title: "Ticket and Task Loaded",
          message: "The ticket and task details have been successfully loaded.",
        });
      }
    }

    if (isError) {
      errorToast({
        title: "Fetch Error",
        message: `An error occurred while fetching the ticket or task: ${
          error?.message || "Unknown error"
        }`,
      });
    }
  }, [isSuccess, isError, error, data]);


  return {
    data, // Contains both ticket and task data
    isLoading,
    isError,
    isSuccess,
    error,
  };
};