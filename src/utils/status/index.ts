export function getStatusColor(status: string): string {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Approved":
      return "text-green-500";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export function getInboxStatusStyle(status: string): string {
  switch (status) {
    case "closed":
      return "bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500";
    case "open":
      return "bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500";
    default:
      return "bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500";
  }
}
