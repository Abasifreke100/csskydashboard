import { useState, useEffect } from "react";
import { errorToast, successToast } from "../utils/toast";
import { TicketService } from "../service/ticket";

interface UseFetchTicketsProps {
  userIds: string[];
}

export interface Ticket {
  id: string;
  account_id: string;
  user_id: string;
  subject: string;
  type: string;
  priority: string;
  due: string;
  status: string;
  assigned_to: string | null;
  group_name: string;
  created: string;
  opened_by: string | null;
  involved_by: string | null;
  rating: string | null;
  closed_time: string | null;
  closed_by: string | null;
  label: string;
  resolution_type: string | null;
  resolution_subject: string | null;
  created_by: string;
  created_from: string;
  public_number: string;
  nas_port_id: string;
  source: string;
  preferred_time: string;
  time_interval: string;
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
      const allTickets: AllTickets = [];
      const totalBatches = Math.ceil(userIds.length / BATCH_SIZE);

      for (let i = 0; i < totalBatches; i++) {
        const batch = userIds.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
        const ticketPromises = batch.map((userId) =>
          retryRequest(userId).catch(() => userId)
        );

        const batchResults = await Promise.allSettled(ticketPromises);

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
              allTickets.push(...tickets); // Accumulate tickets
            } else {
              console.warn("No tickets found for this user.");
            }
          } else if (result.status === "rejected") {
            const failedUserId = result.reason;
            setFailedRequests((prev) => [...prev, failedUserId]);
            console.error(`Error fetching tickets for user ID ${failedUserId}`);
          }
        });
      }

      // Only update tickets state after all batches are processed
      if (allTickets.length > 0) {
        setTickets(allTickets);
      } else {
        console.warn("No tickets fetched after processing all batches.");
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
      setIsLoading(false);
      
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
