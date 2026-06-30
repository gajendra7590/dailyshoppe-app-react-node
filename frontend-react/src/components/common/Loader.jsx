function Loader({ loadingTest = 'Loading...' }) {
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center pointer-events-auto z-[9999]">
            <div className="px-0 py-0 flex flex-col items-center">
                <div className="h-12 w-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}

export default Loader;