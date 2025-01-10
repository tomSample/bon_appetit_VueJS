<template>
    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
</template>

<script setup>
import { onMounted } from 'vue';

const renderChart = () => {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Statistiques du Restaurant"
        },
        axisY: {
            title: "Nombre de Clients"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Janvier", y: 120 },
                { label: "Février", y: 135 },
                { label: "Mars", y: 144 },
                { label: "Avril", y: 103 },
                { label: "Mai", y: 93 },
                { label: "Juin", y: 129 },
                { label: "Juillet", y: 143 },
                { label: "Août", y: 156 },
                { label: "Septembre", y: 122 },
                { label: "Octobre", y: 106 },
                { label: "Novembre", y: 137 },
                { label: "Décembre", y: 142 }
            ]
        }]
    });
    chart.render();
};

onMounted(() => {
    renderChart();
});
</script>

<style scoped>
#chartContainer {
    height: 370px;
    width: 100%;
}
</style>