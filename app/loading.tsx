export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh] flex flex-col justify-center">
            <div className="animate-pulse space-y-8">
                <div className="h-10 bg-gray-200 rounded-xl w-1/3 mx-auto mb-16"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-[400px]">
                            <div className="h-64 bg-gray-200 w-full shrink-0"></div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="flex gap-2 mb-6">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                                <div className="mt-auto h-12 bg-gray-200 rounded-xl w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
