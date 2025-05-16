// src/components/ApiStackedBarChart.jsx

import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 1) Registramos los módulos que usaremos de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// 2) Generador sencillo de colores HSL para cada empresa
const generateColor = (index) => {
    const hue = (index * 360) / 10;
    return `hsla(${hue}, 70%, 50%, 0.6)`;
};

export default function ApiStackedBarChart() {
    const [chartData, setChartData] = useState(null);
    const [selectedId, setSelectedId] = useState('3');  // valor por defecto
    const [loading, setLoading] = useState(false);

    // 3) Función que carga los datos según el ID seleccionado
    // 3) Función que carga los datos según el ID seleccionado
    const fetchChartData = async (id) => {
        setLoading(true);
        setChartData(null);
        try {
            const res = await fetch(`http://localhost:13000/api/graficos/${id}`);
            const resp = await res.json();
            const json = Array.isArray(resp.body) ? resp.body : [];

            // 3.1) Sacamos el set de empresas
            const companiesSet = new Set();
            json.forEach(item =>
                item.values.forEach(v => companiesSet.add(v.company))
            );

            // 3.2) Lo convertimos a array y calculamos totales
            const companies = Array.from(companiesSet);
            const totals = {};
            companies.forEach(company => {
                totals[company] = json.reduce((sum, hourItem) => {
                    const v = hourItem.values.find(x => x.company === company);
                    return sum + (v ? v.value : 0);
                }, 0);
            });

            // 3.3) Lo ordenamos de mayor a menor según el total
            companies.sort((a, b) => totals[b] - totals[a]);

            // 3.4) Generamos labels y datasets ya con el orden deseado
            const labels = json.map(item => item.hour);
            const datasets = companies.map((company, idx) => ({
                label: company,
                data: json.map(item => {
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
    };



    // 6) Al montar, y cada vez que cambie selectedId, recargamos
    useEffect(() => {
        fetchChartData(selectedId);
    }, [selectedId]);
    function getName() {
        if (selectedId === '1') return 'A Planta';
        if (selectedId === '2') return 'Colecta';
        if (selectedId === '3') return 'Asignaciones';
        return '';
    }
    // 7) Opciones del gráfico
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Gráfico de ${getName()}`,
            },
            tooltip: {
                mode: 'nearest',
                intersect: true,
            },
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
    };

    // 8) Renderizado según estado
    if (loading) return <div>Cargando datos…</div>;
    if (!chartData) return <div>No hay datos para mostrar.</div>;

    return (
        <div>
            {/* Controles */}

            <div style={{ marginBottom: 16, marginTop: 60, display: 'flex', alignItems: 'center' }}>
                <label htmlFor="chart-select" style={{ marginRight: 8 }}>
                    Seleccionar gráfico:
                </label>
                <select
                    id="chart-select"
                    value={selectedId}
                    onChange={e => setSelectedId(e.target.value)}
                >
                    <option value="1">A Planta</option>
                    <option value="2">Colecta</option>
                    <option value="3">Asignaciones</option>
                </select>
            </div>

            {/* Gráfico */}
            <div style={{ width: '100%', height: 'calc(100vh - 140px)' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
