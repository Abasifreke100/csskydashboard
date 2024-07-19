export function getStatusColor(status: string): string {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500';
      case 'Approved':
        return 'text-green-500';
      case 'Rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
  
