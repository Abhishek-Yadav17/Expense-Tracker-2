import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts"

const ChartBox = ({ data }) => (
    <div className="border rounded p-4 h-full">
        <h3 className="font-semibold mb-3">Money Flow</h3>

        {data.length === 0 ? (
            <p>No data</p>
        ) : (
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} barGap={6}>
                    <XAxis dataKey="month" />
                    <Tooltip />
                    <Bar dataKey="income" fill="#16a34a" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expense" fill="#dc2626" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        )}
    </div>
)


export default ChartBox
