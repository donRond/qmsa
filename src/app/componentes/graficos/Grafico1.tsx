// "use client"; // This is a client-side file

// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import React, { useEffect, useState } from 'react';
// import exporting from 'highcharts/modules/exporting';
// import exportData from 'highcharts/modules/export-data';
// import accessibility from 'highcharts/modules/accessibility';
// import { access } from 'fs';
// import { BiAccessibility } from 'react-icons/bi';
// import { exibeRelatorio } from '@/app/actions/ActionsRelatorios';
// import moment from 'moment';

// // Load Highcharts modules
// exporting(Highcharts);
// exportData(Highcharts);
// accessibility(Highcharts);

// const Grafico1 = () => {
//     const [clientId, setclientId] = useState('');
//   const [faturamento, setFaturamento] = useState<number>();
//   const [cliente, setCliente]= useState('');
//   const [loading, setLoading] = useState(true);


//   const initDate = moment().startOf('month').toISOString();
//   const endDate = moment().endOf('month').toISOString();
//   const [data, setData]= useState([]);

//   const handleExibir = async () => {

//     try{
//       const response = await exibeRelatorio(clientId ||"", initDate, endDate);
//      console.log(response.cliente.map( cliente => cliente.company_name));
//      console.log(response.valorTotal);
// const decimal = parseFloat(response.valorTotal)
     
//       setCliente(response.cliente.map( cliente => cliente.company_name));
//       setFaturamento(decimal);

//     }catch(error){
//       console.error("Erro ao exibir relatório:", error);
//         throw error;
//     }

  

//   }

//   useEffect(() => {
//     handleExibir();
//   }, [clientId]);

  
    
//     const chartData = [
//         ['Janeiro', 30.0],
//         ['Fevereiro', 28.0],
//         ['Março', 32.0],
//         ['Abril', 35.0],
//         ['Maio', 40.0],
//         ['Junho', 45.0],
//         ['Julho', 50.0],
//         ['Agosto', 55.0],
//         ['Setembro', 50.0],
//         ['Outubro', 45.0],
//         ['Novembro', 40.0],
//         ['Dezembro', 35.0]
//     ]
    
   

//     const options = {
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: 'Faturamento Anual'
//         },
//         subtitle: {
//             text: 'Fonte: QMSA Consultoria'
//         },
//         xAxis: {
//             type: 'category',
//             labels: {
//                 autoRotation: [-45, -90],
//                 style: {
//                     fontSize: '13px',
//                     fontFamily: 'Verdana, sans-serif'
//                 }
//             }
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: 'Faturamento '
//             }
//         },
//         legend: {
//             enabled: false
//         },
//         tooltip: {
//             pointFormat: 'Faturamento mensal: R$ <b>{point.y:.1f} </b>'
//         },
//         series: [{
//             name: 'Fatuamento',
//             colors: [
//                 '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
//                 '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
//                 '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
//                 '#03c69b', '#00f194'
//             ],
//             colorByPoint: true,
//             groupPadding: 0,
//             data: chartData,
//             dataLabels: {
//                 enabled: true,
//                 rotation: -90,
//                 color: '#FFFFFF',
//                 inside: true,
//                 verticalAlign: 'top',
//                 format: '{point.y:.1f}', // one decimal
//                 y: 10, // 10 pixels down from the top
//                 style: {
//                     fontSize: '13px',
//                     fontFamily: 'Verdana, sans-serif'
//                 }
//             }
//         }]
//     };

//     return (
//         <div>
//             <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default Grafico1;