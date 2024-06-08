import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../hooks/useAuth'
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import useAuth from '../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const COLORS = ['#0088FE', '#FF8042'];

const ChartComponent = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: chartData = {} } = useQuery({
        queryKey: ['userchart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userchart/${user?.email}`)
            return res.data;
           

        }
    });
    console.log('Chart data response:', chartData);

      const data = Array.isArray(chartData) ? chartData : [];
      const total = data.length;
      const winnerCount = data.filter(item => item.review_status === 'Winner').length;
      const unsuccessfulCount = total - winnerCount;

      const pieChartData = [
        { name: 'Winner', value: winnerCount },
        { name: 'unsuccessfulCount', value: unsuccessfulCount }
      ]

 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

   

    return (
        <div>
           

            
          <div className="">
        {/* <h1 className='text-center text-2xl font-bold'>Statistics of your Participation </h1> */}
                <div className="w-full mx-auto flex justify-center">
                    <PieChart width={400} height={400}>

                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                       <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;