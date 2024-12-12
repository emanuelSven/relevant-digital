import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/v1/data');
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    if (data.length === 0) return <p>Loading...</p>;

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'category10' }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="white"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
        />
    );
};

export default PieChartComponent;