import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, PauseCircle } from 'lucide-react';

function StatusBadge({ status }) {
  const isActive = status === 'Active';

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-success-50 text-success-700' 
          : 'bg-warning-50 text-warning-700'
      }`}
    >
      {isActive ? (
        <CheckCircle className="h-3.5 w-3.5" />
      ) : (
        <PauseCircle className="h-3.5 w-3.5" />
      )}
      {status}
    </motion.span>
  );
}

export default StatusBadge;
