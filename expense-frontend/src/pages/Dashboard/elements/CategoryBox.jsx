const icons = {
  Food: "ri-restaurant-line",
  Transport: "ri-taxi-line",
  Salary: "ri-wallet-3-line",
  Shopping: "ri-shopping-bag-3-line",
  Bills: "ri-receipt-line",
  General: "ri-folder-line",
}

const CategoryBox = ({ categories }) => {
  const entries = Object.entries(categories)

  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold mb-3">Categories</h3>

      {entries.length === 0 && <p>No data</p>}

      <div className="space-y-2">
        {entries.map(([category, amount]) => (
          <div
            key={category}
            className="flex justify-between items-center"
          >
            <span className="flex items-center gap-2">
              <i
                className={`${
                  icons[category] || "ri-folder-line"
                } text-lg`}
              />
              {category}
            </span>

            <span className="font-medium">
              ₹{amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryBox
