'use client';

const CancellationPolicyTooltip = () => {
  return (
    <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg p-3 sm:p-4 text-sm sm:text-base text-gray-700 max-w-xs w-64 mt-1">
      <p className="mb-1 break-words">✅ Free cancellation up to 48 hours before check-in.</p>
      <p className="break-words">❌ 1-night fee for late cancellation or no-show.</p>
    </div>
  );
};

export default CancellationPolicyTooltip;
