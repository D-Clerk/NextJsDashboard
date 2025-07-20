import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }) {
  let statusText = '';
  let icon = null;

  if (status === 'pending') {
    statusText = 'Pending';
    icon = <ClockIcon className="ml-1 w-4 text-gray-500" />;
  } else if (status === 'paid') {
    statusText = 'Paid';
    icon = <CheckIcon className="ml-1 w-4 text-white" />;
  } else if (status === 'late') {
    statusText = 'Late';
    icon = <ClockIcon className="ml-1 w-4 text-white" />;
  } else {
    
    statusText = 'Unknown';
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending' || status == null,
          'bg-green-500 text-white': status === 'paid',
          'bg-red-500 text-white': status === 'late',
        }
      )}
    >
      {statusText}
      {icon}
    </span>
  );
}
