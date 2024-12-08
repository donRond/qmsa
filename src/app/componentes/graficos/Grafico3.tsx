// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import React, { useEffect, useState } from 'react';
// import HighchartsMore from 'highcharts/highcharts-more';

// // Carrega o módulo Highcharts More, que inclui o tipo de gráfico de bolhas
// HighchartsMore(Highcharts);

// const Grafico3 = () => {
//   // Variáveis fictícias
//   const [data, setData] = useState([
//     { x: 10, y: 10000, z: 5, name: 'Cliente A' },
//     { x: 20, y: 15000, z: 10, name: 'Cliente B' },
//     { x: 30, y: 20000, z: 15, name: 'Cliente C' },
//     { x: 40, y: 25000, z: 20, name: 'Cliente D' },
//     { x: 50, y: 30000, z: 25, name: 'Cliente XYZ' },
//   ]);

//   // Descomente e ajuste esta parte para buscar dados do banco de dados
//   /*
//   useEffect(() => {
//     fetch('/api/receitas-clientes') // Ajuste a URL da API conforme necessário
//       .then(response => response.json())
//       .then(data => {
//         setData(data.map(item => ({
//           x: item.horas,
//           y: item.receita,
//           z: item.atividades,
//           name: item.cliente
//         })));
//       })
//       .catch(error => console.error('Erro ao buscar dados:', error));
//   }, []);
//   */

//   const options = {
//     chart: {
//       type: 'bubble',
//       plotBorderWidth: 1,
//       zooming: {
//         type: 'xy'
//       }
//     },
//     legend: {
//       enabled: false
//     },
//     title: {
//       text: 'Receita, Horas e Atividade por Cliente'
//     },
//     xAxis: {
//       gridLineWidth: 1,
//       title: {
//         text: 'Horas por Cliente'
//       },
//       labels: {
//         format: '{value} h'
//       }
//     },
//     yAxis: {
//       startOnTick: false,
//       endOnTick: false,
//       title: {
//         text: 'Receita (R$)'
//       },
//       labels: {
//         format: 'R${value}'
//       }
//     },
//     tooltip: {
//       useHTML: true,
//       headerFormat: '<table>',
//       pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
//         '<tr><th>Horas:</th><td>{point.x}h</td></tr>' +
//         '<tr><th>Receita:</th><td>R${point.y}</td></tr>' +
//         '<tr><th>Atividades:</th><td>{point.z}</td></tr>',
//       footerFormat: '</table>',
//       followPointer: true
//     },
//     plotOptions: {
//       series: {
//         dataLabels: {
//           enabled: true,
//           format: '{point.name}'
//         }
//       }
//     },
//     series: [{
//       data: data,
//       colorByPoint: true
//     }]
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default Grafico3;