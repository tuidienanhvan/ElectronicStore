const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-20 h-20">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
        
        {/* Spinning circle */}
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        
        {/* Inner gradient */}
        <div className="absolute inset-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-sm animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 