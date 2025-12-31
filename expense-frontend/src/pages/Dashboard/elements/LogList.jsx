const LogsList = ({ logs, onDelete }) => {
    return (
        <div className="border rounded">
            <div className="grid grid-cols-5 font-medium p-3 border-b bg-gray-50">
                <span>Category</span>
                <span>Type</span>
                <span>Date</span>
                <span>Amount</span>
            </div>

            {logs.map((log) => (
                <div
                    key={log._id}
                    className="grid grid-cols-5 p-3 border-b items-center"
                >
                    <span>{log.category}</span>

                    <span
                        className={
                            log.type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                        }
                    >
                        {log.type}
                    </span>

                    <span>{log.date.slice(0, 10)}</span>

                    <span>₹{log.amount}</span>

                    <button
                        onClick={() => onDelete(log._id)}
                        className="text-red-500"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default LogsList
