import React, { useState, useEffect, useCallback } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar los componentes de Chart.js necesarios
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartValue {
    company: string;
    value: number;
}

interface HourlyItem {
    hour: string;
    values: ChartValue[];
}

const generateColor = (index: number): string => {
    const hue = (index * 360) / 10;
    return `hsla(${hue}, 70%, 50%, 0.6)`;
};

export default function ApiStackedBarChart() {
    const today: string = new Date().toISOString().split('T')[0];

    const [chartData, setChartData] = useState<ChartData<'bar', number[], string> | null>(null);
    const [selectedId, setSelectedId] = useState<string>('3');
    const [startDate, setStartDate] = useState<string>(today);
    const [endDate, setEndDate] = useState<string>(today);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchChartData = useCallback(async () => {
        setLoading(true);
        setChartData(null);
        try {
            const baseUrl = `http://localhost:13000/api/graficos/${selectedId}`;
            const url = new URL(baseUrl);
            if (startDate) url.searchParams.append('start', startDate);
            if (endDate) url.searchParams.append('end', endDate);

            const res = await fetch(url.toString());
            const resp = (await res.json()) as { body: HourlyItem[] };
            const dataArray = Array.isArray(resp.body) ? resp.body : [];

            const companiesSet = new Set<string>();
            dataArray.forEach(item =>
                item.values.forEach(v => companiesSet.add(v.company))
            );

            const companies = Array.from(companiesSet);
            const totals: Record<string, number> = {};
            companies.forEach(company => {
                totals[company] = dataArray.reduce((sum, hourItem) => {
                    const found = hourItem.values.find(x => x.company === company);
                    return sum + (found ? found.value : 0);
                }, 0);
            });

            companies.sort((a, b) => totals[b] - totals[a]);

            const labels = dataArray.map(item => item.hour);
            const datasets = companies.map((company, idx) => ({
                label: company,
                data: dataArray.map(item => {
                    const found = item.values.find(v => v.company === company);
                    return found ? found.value : 0;
                }),
                backgroundColor: generateColor(idx),
                stack: 'stack1',
            }));

            setChartData({ labels, datasets });
        } catch (err) {
            console.error('Error cargando datos del gráfico:', err);
        } finally {
            setLoading(false);
        }
    }, [selectedId, startDate, endDate]);

    useEffect(() => {
        fetchChartData();
    }, [fetchChartData]);

    const getName = (): string => {
        switch (selectedId) {
            case '1':
                return 'A Planta';
            case '2':
                return 'Colecta';
            case '3':
                return 'Asignaciones';
            default:
                return '';
        }
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Gráfico de ${getName()}`,
            },
            tooltip: {
                mode: 'nearest' as const,
                intersect: true,
            },
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
    };

    if (loading) return <div>Cargando datos…</div>;
    if (!chartData) return <div>No hay datos para mostrar.</div>;

    return (
        <div>
            <div style={{ marginBottom: 16, marginTop: 60, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label htmlFor="start-date">Desde:</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                />

                <label htmlFor="end-date">Hasta:</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                />

                <label htmlFor="chart-select">Seleccionar gráfico:</label>
                <select
                    id="chart-select"
                    value={selectedId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value)}
                >
                    <option value="1">A Planta</option>
                    <option value="2">Colecta</option>
                    <option value="3">Asignaciones</option>
                </select>
            </div>

            <div style={{ width: '100%', height: 'calc(100vh - 140px)' }}>
                <Bar
                    key={`${selectedId}-${startDate}-${endDate}`}
                    redraw
                    data={chartData}
                    options={options}
                />
            </div>
        </div>
    );
}